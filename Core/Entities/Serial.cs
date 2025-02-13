
namespace Core.Entities;

public class Serial: BaseEntity
{
    public string? SerialName { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow).ToString();
    public DateOnly? CreationDate { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public string StrokeColor { get; set; } = "#000000";
    public string BoxFillColor { get; set; } = "#ffffff";
    public string CardFillColor { get; set; } = "#7b2cbf";
    public string CardNameColor { get; set; } = "#fca311";
    public string BoxNumberColor { get; set; } = "#7b2cbf";
    public string CardNumberColor { get; set; } = "#7b2cbf";
}