using System.ComponentModel.DataAnnotations;

namespace API.PostDTOs;

public class PostGameSerialDTO
{
    [Required]
    public int GameId { get; set; }
    [Required]
    public int SerialId { get; set; }
}