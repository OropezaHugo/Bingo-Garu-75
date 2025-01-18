namespace API.ResponseDTOs;

public class PatternInfoResponseDTO
{
    
    public required int Id { get; set; }
    public required List<bool> PatternMatrix { get; set; }
    public required string PatternName { get; set; }
    public required double TargetPrice { get; set; }
    public required bool Active { get; set; }
}