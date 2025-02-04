using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class RoundPatterns: BaseEntity
{
    public required int RoundId { get; set; }
    public required int PatternId { get; set; }
    
    [ForeignKey(nameof(RoundId))]
    public Round? Round { get; set; }
    [ForeignKey(nameof(PatternId))]
    public Pattern? Pattern { get; set; }

    public double TargetPrice { get; set; }
    public bool Active { get; set; }
}