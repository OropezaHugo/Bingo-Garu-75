namespace API.PostDTOs;

public class PostRoundPatternDTO
{
    public required int RoundId { get; set; }
    public required int PatternId { get; set; }
    public double TargetPrice { get; set; }
    public bool Active { get; set; }

}