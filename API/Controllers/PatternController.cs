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
    IRoundPatternsRepository roundPatternsRepository,
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
        if (roundPatternsRepository.ExistsPatternInAnyRound(id)) return Conflict("Patrones yá usados no pueden ser editados");
        var newPattern = mapper.Map<Pattern>((patternDto, id));
        patternRepository.UpdateAsync(newPattern);
        return Ok(await patternRepository.SaveChangesAsync());
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeletePattern(int id)
    {
        var pattern = await patternRepository.GetByIdAsync(id);
        if (pattern == null) return NotFound();
        if (roundPatternsRepository.ExistsPatternInAnyRound(id)) return Conflict("Patrones yá usados no pueden ser eliminados");
        patternRepository.DeleteAsync(pattern);
        return Ok(await patternRepository.SaveChangesAsync());
    }

    [HttpGet("round/{roundId}")]
    public async Task<ActionResult<IList<PatternResponseDTO>>> GetPatternsByRoundId([FromRoute]int roundId)
    {
        var patterns = await roundPatternsRepository.GetPatternsByRoundId(roundId);
        return Ok(patterns.AsEnumerable().Select(pattern => mapper.Map<PatternResponseDTO>(pattern)));
    }
    
    [HttpPost("round")]
    public async Task<ActionResult<bool>> AddPatternToRound(PostRoundPatternDTO patternDto)
    {
        if (roundPatternsRepository.ExistsRoundPatternRelation(patternDto.RoundId, patternDto.PatternId)) return Conflict("patron ya adjuntado en esta ronda");
        roundPatternsRepository.CreateRoundPatternRelation(mapper.Map<RoundPatterns>(patternDto));
        return Ok(await roundPatternsRepository.SaveChangesAsync());
    }
    
    [HttpDelete("{patternId}/round/{roundId}")]
    public async Task<ActionResult<bool>> RemovePatternFromRound([FromRoute] PostRoundPatternDTO patternDto)
    {
        if (!roundPatternsRepository.ExistsRoundPatternRelation(patternDto.RoundId, patternDto.PatternId)) return Conflict("patron no existe en esta ronda");
        roundPatternsRepository.DeleteRoundPatternRelation(mapper.Map<RoundPatterns>(patternDto));
        return Ok(await roundPatternsRepository.SaveChangesAsync());
    }
    
    
    [HttpPut("round")]
    public async Task<ActionResult<bool>> UpdatePatternInRound(PostRoundPatternDTO patternDto)
    {
        if (!roundPatternsRepository.ExistsRoundPatternRelation(patternDto.RoundId, patternDto.PatternId)) return Conflict("patron no existe en esta ronda");
        roundPatternsRepository.UpdateRoundPatternRelation(mapper.Map<RoundPatterns>(patternDto));
        return Ok(await roundPatternsRepository.SaveChangesAsync());
    }
    
    [HttpGet("round/{roundId}/info")]
    public async Task<ActionResult<IList<PatternInfoResponseDTO>>> GetRoundPatternsByRoundId(int roundId)
    {
        var roundPatternsList = await roundPatternsRepository.GetRoundPatternRelationsByRoundId(roundId);
        return Ok(roundPatternsList.AsEnumerable()
            .Select(roundPatterns =>
            {
                var pattern = patternRepository.GetByIdAsync(roundPatterns.PatternId).Result;
                return mapper.Map<PatternInfoResponseDTO>((roundPatterns, pattern));
            }));
    }
}