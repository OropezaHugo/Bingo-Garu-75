using Core.Entities;

namespace Core.Interfaces;

public interface IGamePatternsRepository
{
    bool ExistsPatternInAnyGame(int patternId);
    bool ExistsPatternGameRelation(int gameId, int patternId);
    void CreatePatternGameRelation(GamePatterns gamePatterns);
    Task<bool> SaveChangesAsync();
    Task<List<Pattern>> ListPatternsByGameId(int gameId);
    void DeleteGamePatternRelation(GamePatterns gamePatterns);
    Task<List<GamePatterns>> ListGamePatternsByGameId(int gameId);
    void UpdateGamePattern(GamePatterns gamePatterns);
}