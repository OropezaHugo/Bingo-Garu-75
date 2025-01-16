using System.ComponentModel.DataAnnotations;

namespace API.PostDTOs;

public class PostGameCardsDTO
{
    [Required]
    public required int GameId { get; set; }
    [Required]
    public required int CardId { get; set; }
    public bool Sold { get; set; }
    public string UserName { get; set; } = string.Empty;
}