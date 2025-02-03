using Core.Entities;

namespace Core.Interfaces;

public interface IRoundPatternsRepository
{
    bool ExistsPatternInAnyRound(int patternId);
    bool ExistsRoundPatternRelation(int roundId, int patternId);
    void CreateRoundPatternRelation(RoundPatterns roundPatterns);
    void DeleteRoundPatternRelation(RoundPatterns roundPatterns);
    void UpdateRoundPatternRelation(RoundPatterns roundPatterns);
    Task<bool> SaveChangesAsync();
    Task<List<Pattern>> GetPatternsByRoundId(int roundId);
    Task<List<RoundPatterns>> GetRoundPatternRelationsByRoundId(int roundId);
    

}