using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class GamePatterns
{
    
    public required int GameId { get; set; }
    public required int PatternId { get; set; }
    
    [ForeignKey(nameof(GameId))]
    public Game? Game { get; set; }
    [ForeignKey(nameof(PatternId))]
    public Pattern? Pattern { get; set; }

    public double TargetPrice { get; set; }
    public bool Active { get; set; }

}