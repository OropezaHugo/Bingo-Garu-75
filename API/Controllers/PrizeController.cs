using API.PostDTOs;
using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class PrizeController
    (
        IGenericRepository<Prize> repository,
        IMapper mapper,
        IGenericRepository<Round> roundRepository,
        IGameCardsRepository gameCardsRepository,
        IGamePatternsRepository gamePatternsRepository
        ): ControllerBase
{
    [HttpGet("round/{roundId}")]
    public async Task<ActionResult<List<PrizeResponseDTO>>> GetPrizesByRoundId(int roundId)
    {
        var prizes = await repository.ListAllAsync();
        return Ok(mapper.Map<List<PrizeResponseDTO>>(prizes));
    }

    [HttpPost("game/{gameId}")]
    public async Task<ActionResult<bool>> CreatePrize(int gameId, PostPrizeDTO prizeDto)
    {
        var round = await roundRepository.GetByIdAsync(prizeDto.RoundId);
        if (!gameCardsRepository.ExistsGameCardRelation(gameId, prizeDto.CardId))
            return Conflict("carton no registrado en la partida actual");
        if (!gamePatternsRepository.ExistsPatternGameRelation(gameId, prizeDto.PatternId))
            return Conflict("patron no registrado en la partida actual");
        if (round == null) return NotFound();
        if (round.GameId != gameId) return Conflict("la ronda no existe en la partida actual");
        
        repository.AddAsync(mapper.Map<Prize>(prizeDto));
        return Ok(await repository.SaveChangesAsync());
    }
}