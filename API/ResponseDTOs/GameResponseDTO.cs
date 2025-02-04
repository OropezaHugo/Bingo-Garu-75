namespace API.ResponseDTOs;

public class GameResponseDTO
{
    public int Id { get; set; }
    public bool AutomaticRaffle { get; set; }
    public bool RandomPatterns { get; set; }
    public bool SharePrizes { get; set; }
    public bool InProgress { get; set; }
    public bool Finished { get; set; }
    public DateTime? TargetStartDate { get; set; }
    public DateTime? CreatedAt { get; set; }
}