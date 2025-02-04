namespace API.ResponseDTOs;

public class SerialResponseDTO
{
    public int Id { get; set; }
    public required string SerialName { get; set; }
    public DateOnly CreationDate { get; set; }
    public int CardQuantity { get; set; }
    public string StrokeColor { get; set; } = "#000000";
    public string BoxFillColor { get; set; } = "#ffffff";
    public string CardFillColor { get; set; } = "#7b2cbf";
    public string CardNameColor { get; set; } = "#fca311";
    public string BoxNumberColor { get; set; } = "#7b2cbf";
    public string CardNumberColor { get; set; } = "#7b2cbf";
}