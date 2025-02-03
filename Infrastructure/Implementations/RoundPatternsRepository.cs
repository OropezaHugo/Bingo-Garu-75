using Core.Entities;
using Core.Interfaces;
using Infrastructure.BingoContext;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Implementations;

public class RoundPatternsRepository(Bingo75Context context): IRoundPatternsRepository
{
    public bool ExistsPatternInAnyRound(int patternId)
    {
        return context.RoundPatterns.Any(pattern => pattern.PatternId == patternId);
 
    }

    public bool ExistsRoundPatternRelation(int roundId, int patternId)
    {
        return context.RoundPatterns.Any(roundPatterns => roundPatterns.RoundId == roundId && roundPatterns.PatternId == patternId);
    }

    public void CreateRoundPatternRelation(RoundPatterns roundPatterns)
    {
        context.RoundPatterns.Add(roundPatterns);
    }

    public void DeleteRoundPatternRelation(RoundPatterns roundPatterns)
    {
        context.RoundPatterns.Remove(roundPatterns);
    }

    public void UpdateRoundPatternRelation(RoundPatterns roundPatterns)
    {
        context.RoundPatterns.Update(roundPatterns);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public async Task<List<Pattern>> GetPatternsByRoundId(int roundId)
    {
        return await context.Patterns.Where(
            pattern => 
                context.RoundPatterns.Any(
                    roundPatterns => roundPatterns.PatternId == pattern.Id
                                    && roundPatterns.RoundId == roundId
                )
        ).ToListAsync();
    }

    public async Task<List<RoundPatterns>> GetRoundPatternRelationsByRoundId(int roundId)
    {
        return await context.RoundPatterns.Where(roundPatterns => roundPatterns.RoundId == roundId).ToListAsync();

    }
}