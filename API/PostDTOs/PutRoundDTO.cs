namespace API.PostDTOs;

public class PutRoundDTO
{
    public required string RoundName { get; set; }
    public required int GameId { get; set; }
    public required bool Active { get; set; }
    public List<int> RaffleNumbers { get; set; } = new List<int>();
}