namespace API.PostDTOs;

public class PostGamePatternsDTO
{
    public required int GameId { get; set; }
    public required int PatternId { get; set; }
    public double TargetPrice { get; set; }
    public bool Active { get; set; }

}