using System.ComponentModel.DataAnnotations;

namespace API.PostDTOs;

public class PostSerialCardsDTO
{
    public string? SerialName { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow).ToShortDateString();
    
    [Required]
    public required int CardNumber { get; set; }
}