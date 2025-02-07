using API.PostDTOs;
using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoundController
    (
        IGenericRepository<Round> repository,
        IGenericRepository<Game> gameRepository,
        IGenericRepository<Pattern> patternRepository,
        IGenericRepository<Prize> prizeRepository,
        IGameCardsRepository gameCardsRepository,
        IMapper mapper
    ) :  ControllerBase
{
    [HttpGet("game/{gameId}")]
    public async Task<ActionResult<List<RoundResponseDTO>>> GetRoundsByGameId(int gameId)
    {
        var rounds = await repository.ListAllAsync();
        return Ok(rounds.Where(round => round.GameId == gameId).Select(round => mapper.Map<RoundResponseDTO>(round)).ToList());   
    }
    [HttpGet("{roundId}")]
    public async Task<ActionResult<List<RoundResponseDTO>>> GetRoundsByRoundId(int roundId)
    {
        var round = await repository.GetByIdAsync(roundId);
        if (round == null) return NotFound();
        return Ok(mapper.Map<RoundResponseDTO>(round));
    }

    [HttpPost("game/{gameId}")]
    public async Task<ActionResult<bool>> PostRound(int gameId, PostGameRoundsDTO roundsDto)
    {
        var rounds = await repository.ListAllAsync();
        if (rounds.Any(round => round.GameId == gameId)) return Conflict("este juego ya genero sus rondas");
        int roundQuantity = roundsDto.RoundQuantity;
        
        int i = 1;
        while (i <= roundQuantity)
        {
            repository.AddAsync(new Round()
            {
                GameId = gameId,
                RoundName = "Round " + i,
            });
            i += 1;
        }

        if (roundsDto.HasBonusRound)
        {
            repository.AddAsync(new Round()
            {
                GameId = gameId,
                RoundName = "Bonus Round",
            });
        }
        return Ok(await repository.SaveChangesAsync());
    }

    [HttpPut("{roundId}")]
    public async Task<ActionResult<RoundResponseDTO>> UpdateRound(int roundId, PutRoundDTO roundDto)
    {
        var game = await gameRepository.GetByIdAsync(roundDto.GameId);
        if (game == null) return NotFound();
        var newRound = repository.UpdateAsync(mapper.Map<Round>((roundDto, roundId)));
        await repository.SaveChangesAsync();
        return Ok(mapper.Map<RoundResponseDTO>(newRound));
    }

    [HttpGet("{roundId}/pattern/{patternId}/winner")]
    public async Task<ActionResult<bool>> ExistWinner(int roundId, int patternId)
    {
        var round = await repository.GetByIdAsync(roundId);
        if (round == null) return NotFound();
        var pattern = await patternRepository.GetByIdAsync(patternId);
        if (pattern == null) return NotFound();
        var cards = await gameCardsRepository.ListCardsByGameId(round.GameId);
        var prizes = await prizeRepository.ListAllAsync();
        prizes = prizes.Where(prize => prize.RoundId == roundId && prize.PatternId == patternId).ToList();
        foreach (Card card in cards)
        {
            if (prizes.Any(prize => prize.CardId == card.Id))
            {
                continue;
            }
            var asserts = pattern.PatternMatrix.Count(p => p);
            bool withLastNumber = false;
            for (int i = 0; i < pattern.PatternMatrix.Count; i++)
            {
                if (pattern.PatternMatrix[i])
                {
                    if (round.RaffleNumbers.Contains(card.ContentMatrix[i]) || i == 12)
                    {
                        if (round.RaffleNumbers.Count > 0 && card.ContentMatrix[i] == round.RaffleNumbers[^1])
                        {
                            withLastNumber = true;
                        }
                        asserts--;
                    }
                }
            }
            if (asserts <= 0 && withLastNumber)
            {
                return Ok(true);
            }
        }
        return Ok(false);
    }
}