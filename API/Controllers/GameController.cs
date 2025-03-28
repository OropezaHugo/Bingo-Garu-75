using API.PostDTOs;
using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GameController
    (
        IGenericRepository<Game> repository,
        IRoundPatternsRepository roundPatternsRepository,
        IGenericRepository<Round> roundsRepository,
        IMapper mapper
        ): ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<GameResponseDTO>>> GetGames()
    {
        var games = await repository.ListAllAsync();
        return Ok(games.AsEnumerable().Select(game => mapper.Map<GameResponseDTO>(game)));
    }
    
    
    [HttpGet("finished")]
    public async Task<ActionResult<List<GameResponseDTO>>> GetFinishedGames()
    {
        var games = await repository.ListAllAsync();
        return Ok(games.Where(game => game.Finished).Select(game => mapper.Map<GameResponseDTO>(game)));
    }
    
    
    [HttpGet("unstarted")]
    public async Task<ActionResult<List<GameResponseDTO>>> GetUnStartedGames()
    {
        var games = await repository.ListAllAsync();
        return Ok(games.Where(game => !game.Finished && !game.InProgress).Select(game => mapper.Map<GameResponseDTO>(game)));
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<GameResponseDTO>> GetGameById(int id)
    {
        return Ok(mapper.Map<GameResponseDTO>(await repository.GetByIdAsync(id)));
    }
    [HttpPost]
    public async Task<ActionResult<GameResponseDTO>> PostGame(PostGameDTO game)
    {
        var newGame = repository.AddAsync(mapper.Map<Game>(game));
        if (await repository.SaveChangesAsync())
        {
            return Ok(mapper.Map<GameResponseDTO>(newGame));
        }
        return Conflict("hubo un problema al crear un nuevo juego");
    }
    
    [HttpPut("{id}")]
    public async Task<ActionResult<GameResponseDTO>> UpdateGame(int id, PostGameDTO gameDto)
    {
        var game = await repository.GetByIdAsync(id);
        if (game == null) return NotFound();
        var newGame = repository.UpdateAsync(mapper.Map<Game>((gameDto, id)));
        if (await repository.SaveChangesAsync())
        {
            return Ok(mapper.Map<GameResponseDTO>(newGame));
        }
        return Conflict("hubo un problema al editar la informacion del juego");
    }
    
    
    [HttpGet("{id}/patterns")]
    public async Task<ActionResult<bool>> HasPatterns(int id)
    {
        var game = await repository.GetByIdAsync(id);
        if (game == null) return NotFound();
        var rounds = await roundsRepository.ListAllAsync();
        rounds = rounds.Where(round => round.GameId == id).ToList();
        bool hasPatterns = rounds
            .All(round => roundPatternsRepository
                .GetRoundPatternRelationsByRoundId(round.Id).Result.Count > 0);
        return Ok(hasPatterns);
    }
    
}