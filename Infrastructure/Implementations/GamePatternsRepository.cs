using Core.Interfaces;
using Infrastructure.BingoContext;

namespace Infrastructure.Implementations;

public class GamePatternsRepository(Bingo75Context context): IGamePatternsRepository
{
    public bool ExistsPatternInAnyGame(int id)
    {
        return context.GamePatterns.Any(pattern => pattern.PatternId == id);
    }
}