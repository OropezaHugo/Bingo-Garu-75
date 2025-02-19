namespace API.ResponseDTOs;

public class RoundResponseDTO
{
    public int Id { get; set; }
    
    public required string RoundName { get; set; }
    public required int GameId { get; set; }
    public required bool Active { get; set; }
    public List<int> RaffleNumbers { get; set; } = new List<int>();
}