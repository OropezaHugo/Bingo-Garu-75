using API.PostDTOs;
using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class RoundController
    (
        IGenericRepository<Round> repository,
        IGenericRepository<Game> gameRepository,
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
}