using System.ComponentModel.DataAnnotations;

namespace API.PostDTOs;

public class SellCardDTO
{
    [Required]
    public required int GameId { get; set; }
    [Required]
    public required int CardId { get; set; }
    
    public bool Sold { get; set; }
    public required string UserName { get; set; }
}