using System.ComponentModel.DataAnnotations;

namespace API.PostDTOs;

public class PostPatternDTO
{
    [Required]
    public List<bool> PatternMatrix { get; set; }
    [Required]
    public string PatternName { get; set; }
}