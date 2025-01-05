namespace Core.Entities;

public class Bingo75Card
{
    public int Id { get; set; }
    public required string Numbers { get; set; }
    public required int Serial { get; set; }
    public string NickName { get; set; } = string.Empty;
    public string Color1 { get; set; } = "000000";
    public string Color2 { get; set; } = "ffffff";
}