using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

public class GameCards
{
    public required int GameId { get; set; }
    public required int CardId { get; set; }
    
    [ForeignKey(nameof(GameId))]
    public Game? Game { get; set; }
    [ForeignKey(nameof(CardId))]
    public Card? Card { get; set; }
    
    public bool Sold { get; set; }
    public string UserName { get; set; } = string.Empty;
    
    
}