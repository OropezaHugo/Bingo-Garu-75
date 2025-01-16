namespace API.ResponseDTOs;

public class PatternResponseDTO
{
    public int Id { get; set; }
    public required List<bool> PatternMatrix { get; set; }
    public required string PatternName { get; set; }
}