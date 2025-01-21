using API.PostDTOs;
using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class PatternController(
    IGenericRepository<Pattern> patternRepository,
    IGenericRepository<Game> gameRepository,
    IGamePatternsRepository gamePatternsRepository,
    IMapper mapper): ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IList<PatternResponseDTO>>> GetPatterns([FromQuery] string? name)
    {
        var patterns = await patternRepository.ListAllAsync();
        return Ok( patterns.AsEnumerable().Where(pattern => pattern.PatternName.ToLower().Contains(name?.ToLower() ?? string.Empty)).Select(pattern => mapper.Map<PatternResponseDTO>(pattern)));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PatternResponseDTO>> GetPattern(int id)
    {
        var pattern = await patternRepository.GetByIdAsync(id);
        if (pattern == null) return NotFound();
        return Ok(mapper.Map<PatternResponseDTO>(pattern));
    }

    [HttpPost]
    public async Task<ActionResult<bool>> PostPattern(PostPatternDTO patternDto)
    {
        patternRepository.AddAsync(mapper.Map<Pattern>(patternDto));
        return Ok(await patternRepository.SaveChangesAsync());
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<bool>> PutPattern(int id, PostPatternDTO patternDto)
    {
        var pattern = await patternRepository.GetByIdAsync(id);
        if (pattern == null) return NotFound();
        if (gamePatternsRepository.ExistsPatternInAnyGame(id)) return Conflict("Patrones yá usados no pueden ser editados");
        var newPattern = mapper.Map<Pattern>((patternDto, id));
        patternRepository.UpdateAsync(newPattern);
        return Ok(await patternRepository.SaveChangesAsync());
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeletePattern(int id)
    {
        var pattern = await patternRepository.GetByIdAsync(id);
        if (pattern == null) return NotFound();
        if (gamePatternsRepository.ExistsPatternInAnyGame(id)) return Conflict("Patrones yá usados no pueden ser eliminados");
        patternRepository.DeleteAsync(pattern);
        return Ok(await patternRepository.SaveChangesAsync());
    }

    [HttpPost("game")]
    public async Task<ActionResult<bool>> AddPatternToGame(PostGamePatternsDTO gamePatternsDto)
    {
        var pattern = await patternRepository.GetByIdAsync(gamePatternsDto.PatternId);
        if (pattern == null) return NotFound("pattern not found");
        var game = await gameRepository.GetByIdAsync(gamePatternsDto.GameId);
        if (game == null) return NotFound("game not found");
        if (game.Finished || game.InProgress) return Conflict("una partida ya en progreso o terminada no se puede actualizar");
        if (gamePatternsRepository.ExistsPatternGameRelation(gamePatternsDto.GameId, gamePatternsDto.PatternId)) return Conflict("el patron ya existe en la partida");
        gamePatternsRepository.CreatePatternGameRelation(mapper.Map<GamePatterns>(gamePatternsDto));
        return Ok(await gamePatternsRepository.SaveChangesAsync());
    }
    
    
    [HttpDelete("{patternId}/game/{gameId}")]
    public async Task<ActionResult<bool>> DeletePatternFromGame([FromRoute] PostGamePatternsDTO gamePatternsDto)
    {
        var game = await gameRepository.GetByIdAsync(gamePatternsDto.GameId);
        if (game == null) return NotFound();
        if (game.Finished || game.InProgress) return Conflict("una partida ya en progreso o terminada no se puede actualizar");
        gamePatternsRepository.DeleteGamePatternRelation(mapper.Map<GamePatterns>(gamePatternsDto));
        return Ok(await gamePatternsRepository.SaveChangesAsync());
    }
    
    [HttpGet("{id}/game")]
    public async Task<ActionResult<PatternResponseDTO>> GetGamePatternsByGameId(int id)
    {
        var patterns = await gamePatternsRepository.ListPatternsByGameId(id);
        return Ok(patterns.Select(pattern => mapper.Map<PatternResponseDTO>(pattern)));
    }
    
    [HttpGet("game/{id}/prizes")]
    public async Task<ActionResult<PatternResponseDTO>> GetGamePatternsInfoByGameId(int id)
    {
        var patterns = await gamePatternsRepository.ListPatternsByGameId(id);
        var gamePatterns = await gamePatternsRepository.ListGamePatternsByGameId(id);
        var response = patterns
            .Join(gamePatterns, pattern => pattern.Id,
                gamePattern => gamePattern.PatternId,
                (pattern, gamePattern) => mapper.Map<PatternInfoResponseDTO>((gamePattern, pattern)));
        return Ok(response.ToList());
    }

    [HttpPut("game/prizes")]
    public async Task<ActionResult<bool>> UpdateGamePatternsInfoByGameId(PostGamePatternsDTO gamePatternsDto)
    {
        var game = await gameRepository.GetByIdAsync(gamePatternsDto.GameId);
        if (game == null) return NotFound();
        gamePatternsRepository.UpdateGamePattern(mapper.Map<GamePatterns>(gamePatternsDto));
        return Ok(await gamePatternsRepository.SaveChangesAsync());
    }
}