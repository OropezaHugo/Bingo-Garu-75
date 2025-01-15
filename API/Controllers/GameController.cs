using API.PostDTOs;
using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class GameController
    (
        IGenericRepository<Game> repository,
        IMapper mapper,
        IGamePatternsRepository gamePatternsRepository
        ): ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<GameResponseDTO>>> GetGames()
    {
        var games = await repository.ListAllAsync();
        return Ok(games.AsEnumerable().Select(game => mapper.Map<GameResponseDTO>(game)));
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<GameResponseDTO>> GetGameById(int id)
    {
        return Ok(mapper.Map<GameResponseDTO>(await repository.GetByIdAsync(id)));
    }

    [HttpPost]
    public async Task<ActionResult<bool>> PostGame(PostGameDTO game)
    {
        repository.AddAsync(mapper.Map<Game>(game));    
        return Ok(await repository.SaveChangesAsync());
    }
}