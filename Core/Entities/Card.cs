using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class Card: BaseEntity
{
    public required List<int> ContentMatrix { get; set; }
    public required int SerialId { get; set; }
    
    [ForeignKey(nameof(SerialId))]
    public Serial? Serial { get; set; }
    public List<GameCards> GameCards { get; set; } = new List<GameCards>();
    public List<Prize> Prizes { get; set; } = new List<Prize>();

}