namespace Core.Entities;

public class Pattern: BaseEntity
{
    public required List<bool> PatternMatrix { get; set; }
    public required string PatternName { get; set; }
    
    public List<RoundPatterns> RoundPatterns { get; set; } = new List<RoundPatterns>();
    public List<Prize> Prizes { get; set; } = new List<Prize>();
}