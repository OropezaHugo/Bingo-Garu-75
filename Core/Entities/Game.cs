using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class Game: BaseEntity
{
    public bool AutomaticRaffle { get; set; }
    public bool RandomPatterns { get; set; }
    public bool SharePrizes { get; set; }
    public string RaffleNumbers { get; set; } = string.Empty;
    
    public List<GameCards> GameCards { get; set; } = new List<GameCards>();
    public List<GamePatterns> GamePatterns { get; set; } = new List<GamePatterns>();
}