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
        IMapper mapper
    ) :  ControllerBase
{
    [HttpGet("game/{gameId}")]
    public async Task<ActionResult<List<RoundResponseDTO>>> GetRoundsByGameId(int gameId)
    {
        var rounds = await repository.ListAllAsync();
        return Ok(rounds.Where(round => round.GameId == gameId).Select(round => mapper.Map<RoundResponseDTO>(round)).ToList());   
    }

    [HttpPost("game/{gameId}")]
    public async Task<ActionResult<bool>> PostRound(int gameId, PostGameRoundsDTO roundsDto)
    {
        int roundQuantity = roundsDto.RoundQuantity;
        
        int i = 0;
        while (i < roundQuantity)
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
        var newRound = repository.UpdateAsync(mapper.Map<Round>((roundDto, roundId)));
        await repository.SaveChangesAsync();
        return Ok(mapper.Map<RoundResponseDTO>(newRound));
    }
}