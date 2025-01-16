namespace API.ResponseDTOs;

public class CardResponseDTO
{
    public int Id { get; set; }
    public required List<int> ContentMatrix { get; set; }
    public required int SerialId { get; set; }
}