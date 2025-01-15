using API.PostDTOs;
using API.ResponseDTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class PatternController(
    IGenericRepository<Pattern> repository,
    IGamePatternsRepository gamePatternsRepository,
    IMapper mapper): ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IList<PatternResponseDTO>>> GetPatterns([FromQuery] string? name)
    {
        var patterns = await repository.ListAllAsync();
        return Ok( patterns.AsEnumerable().Where(pattern => pattern.PatternName.Contains(name ?? string.Empty)).Select(pattern => mapper.Map<PatternResponseDTO>(pattern)));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PatternResponseDTO>> GetPattern(int id)
    {
        var pattern = await repository.GetByIdAsync(id);
        if (pattern == null) return NotFound();
        return Ok(mapper.Map<PatternResponseDTO>(pattern));
    }

    [HttpPost]
    public async Task<ActionResult<bool>> PostPattern(PostPatternDTO patternDto)
    {
        repository.AddAsync(mapper.Map<Pattern>(patternDto));
        return Ok(await repository.SaveChangesAsync());
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<bool>> PutPattern(int id, PostPatternDTO patternDto)
    {
        var pattern = await repository.GetByIdAsync(id);
        if (pattern == null) return NotFound();
        if (gamePatternsRepository.ExistsPatternInAnyGame(id)) return Conflict("patterns used can not be updated");
        var newPattern = mapper.Map<Pattern>((patternDto, id));
        repository.UpdateAsync(newPattern);
        return Ok(await repository.SaveChangesAsync());
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeletePattern(int id)
    {
        var pattern = await repository.GetByIdAsync(id);
        if (pattern == null) return NotFound();
        repository.DeleteAsync(pattern);
        return Ok(await repository.SaveChangesAsync());
    }
}