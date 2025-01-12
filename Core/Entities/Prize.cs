using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class Prize: BaseEntity
{
    public double PrizeAmount { get; set; }
    public required string UserName { get; set; }
    
    public int PatternId { get; set; }
    public int RoundId { get; set; }
    public int CardId { get; set; }
    
    [ForeignKey(nameof(CardId))]
    public Card? Card { get; set; }
    [ForeignKey(nameof(RoundId))]
    public Round? Round { get; set; }
    [ForeignKey(nameof(PatternId))]
    public Pattern? Pattern { get; set; }
}