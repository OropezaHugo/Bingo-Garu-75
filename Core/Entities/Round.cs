using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class Round: BaseEntity
{
    public required string RoundName { get; set; }
    public required int GameId { get; set; }
    
    [ForeignKey(nameof(GameId))]
    public Game? Game { get; set; }
    
    public List<Prize> Prizes { get; set; } = new List<Prize>();
}