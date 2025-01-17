namespace API.ResponseDTOs;

public class GameCardResponseDTO
{
    public required int CardId { get; set; }
    public required int CardNumber { get; set; }
    public required int GameId { get; set; }
    public required List<int> ContentMatrix { get; set; }
    public required int SerialId { get; set; }
    public required bool Sold { get; set; } = true;
    public required string UserName { get; set; }
}