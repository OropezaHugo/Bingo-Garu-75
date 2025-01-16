using Core.Entities;
using Core.Interfaces;
using Infrastructure.BingoContext;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Implementations;

public class GamePatternsRepository(Bingo75Context context): IGamePatternsRepository
{
    public bool ExistsPatternInAnyGame(int patternId)
    {
        return context.GamePatterns.Any(pattern => pattern.PatternId == patternId);
    }

    public bool ExistsPatternGameRelation(int gameId, int patternId)
    {
        return context.GamePatterns.Any(game => game.GameId == gameId && game.PatternId == patternId);
    }

    public void CreatePatternGameRelation(GamePatterns gamePatterns)
    {
        context.GamePatterns.Add(gamePatterns);
    }
    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public async Task<List<Pattern>> ListPatternsByGameId(int gameId)
    {
        return await context.Patterns.Where(
            pattern => 
                context.GamePatterns.Any(
                    gamePatterns => gamePatterns.PatternId == pattern.Id
                    && gamePatterns.GameId == gameId
                    )
                ).ToListAsync();
    }

    public void DeleteGamePatternRelation(GamePatterns gamePatterns)
    {
        context.GamePatterns.Remove(gamePatterns);
    }
}