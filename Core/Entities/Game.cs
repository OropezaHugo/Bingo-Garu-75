using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class Game: BaseEntity
{
    public bool AutomaticRaffle { get; set; }
    public bool RandomPatterns { get; set; }
    public bool SharePrizes { get; set; }
    public required int SerialId { get; set; }
    [ForeignKey(nameof(SerialId))]
    public Serial? Serial { get; set; }
    
    public List<GameCards> GameCards { get; set; } = new List<GameCards>();
    public List<GamePatterns> GamePatterns { get; set; } = new List<GamePatterns>();
}