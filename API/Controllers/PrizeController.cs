using API.PostDTOs;
using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PrizeController
    (
        IGenericRepository<Prize> repository,
        IMapper mapper,
        IGenericRepository<Round> roundRepository,
        IGenericRepository<Game> gameRepository,
        IGameCardsRepository gameCardsRepository,
        IGenericRepository<Card> cardRepository): ControllerBase
{
    [HttpGet("round/{roundId}")]
    public async Task<ActionResult<List<PrizeResponseDTO>>> GetPrizesByRoundId(int roundId)
    {
        var prizes = await repository.ListAllAsync();
        return Ok(prizes.Where(prize => prize.RoundId == roundId).Select(prize =>
        {
            var card = cardRepository.GetByIdAsync(prize.CardId).Result;
            return mapper.Map<PrizeResponseDTO>((prize, card));
        }));
    }

    [HttpGet("game/{gameId}")]
    public async Task<ActionResult<List<PrizeResponseDTO>>> GetPrizesByGameId(int gameId)
    {
        var prizes = await repository.ListAllAsync();
        var rounds = await roundRepository.ListAllAsync();
        var gameRounds = rounds.Where(round => round.GameId == gameId);
        var gamePrizes = prizes
            .Where(prize => gameRounds.Any(round => round.Id == prize.RoundId));
        return Ok(gamePrizes.Select(prize => 
        {
            var card = cardRepository.GetByIdAsync(prize.CardId).Result;
            return mapper.Map<PrizeResponseDTO>((prize, card));
        }));
    }

    [HttpPost("game/{gameId}")]
    public async Task<ActionResult<bool>> CreatePrize(int gameId, PostPrizeDTO prizeDto)
    {
        var game = await gameRepository.GetByIdAsync(gameId);
        if (game == null) return NotFound();
        if (game.Finished) return Conflict("una partida ya en progreso o terminada no se puede actualizar");
        var round = await roundRepository.GetByIdAsync(prizeDto.RoundId);
        if (!gameCardsRepository.ExistsGameCardRelation(gameId, prizeDto.CardId))
            return Conflict("carton no registrado en la partida actual");
//TODO: verify pattern is in game
        if (round == null) return NotFound();
        if (round.GameId != gameId) return Conflict("la ronda no existe en la partida actual");
        
        repository.AddAsync(mapper.Map<Prize>(prizeDto));
        return Ok(await repository.SaveChangesAsync());
    }
}