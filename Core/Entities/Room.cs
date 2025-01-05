using System.Runtime.CompilerServices;

namespace Core.Entities;

public class Room
{
    public int Id { get; set; }
    public string RoomName { get; set; } = "Room";
    public string RoomCallLink { get; set; } = string.Empty;
    public GameMode RoomGameMode { get; set; }
    public bool AutoRollBalls { get; set; }
    public Announcer GameAnnouncer { get; set; }
    public uint GameMinutesDuration { get; set; }
    public required uint RoomSerial { get; set; }
    public string RoomRolledNumbers { get; set; } = string.Empty;
}

public enum GameMode
{
    Online = 0,
    Offline = 1,
}

public enum Announcer
{
    None = 0,
    Male = 1,
    Female = 2,
}