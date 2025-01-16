using System.ComponentModel.DataAnnotations;

namespace API.PostDTOs;

public class PostSerialCardsDTO
{
    public string SerialName { get; set; } = new DateOnly(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day).ToString();
    
    [Required]
    public required int CardNumber { get; set; }
}