using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bingo75Cards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Numbers = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Serial = table.Column<int>(type: "int", nullable: false),
                    NickName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Color1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Color2 = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bingo75Cards", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bingo75Cards");
        }
    }
}
