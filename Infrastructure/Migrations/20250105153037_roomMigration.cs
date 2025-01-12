using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class roomMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoomName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RoomCallLink = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RoomGameMode = table.Column<int>(type: "int", nullable: false),
                    AutoRollBalls = table.Column<bool>(type: "bit", nullable: false),
                    GameAnnouncer = table.Column<int>(type: "int", nullable: false),
                    GameMinutesDuration = table.Column<long>(type: "bigint", nullable: false),
                    RoomSerial = table.Column<long>(type: "bigint", nullable: false),
                    RoomRolledNumbers = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rooms");
        }
    }
}
