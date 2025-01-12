namespace Core.Entities;

public class Pattern: BaseEntity
{
    public required string PatternMatrix { get; set; }
    public required string PatternName { get; set; }
    
    public List<GamePatterns> GamePatterns { get; set; } = new List<GamePatterns>();
    public List<Prize> Prizes { get; set; } = new List<Prize>();
}