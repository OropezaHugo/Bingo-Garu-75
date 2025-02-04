namespace Core.Entities;

public class Game: BaseEntity
{
    public bool AutomaticRaffle { get; set; }
    public bool RandomPatterns { get; set; }
    public bool SharePrizes { get; set; }
    public bool InProgress { get; set; }
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? TargetStartDate { get; set; } = DateTime.UtcNow;
    public bool Finished { get; set; }
    
    public List<GameCards> GameCards { get; set; } = new List<GameCards>();
}