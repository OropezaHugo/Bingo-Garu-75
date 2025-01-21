namespace API.ResponseDTOs;

public class PrizeResponseDTO
{
    
    public int Id {get; set;}
    public double PrizeAmount { get; set; }
    public required string UserName { get; set; }
    public int PatternId { get; set; }
    public int RoundId { get; set; }
    public int CardId { get; set; }
}