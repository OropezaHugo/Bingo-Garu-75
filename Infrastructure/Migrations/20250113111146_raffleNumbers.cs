using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class raffleNumbers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Serials_SerialId",
                table: "Games");

            migrationBuilder.DropIndex(
                name: "IX_Games_SerialId",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "SerialId",
                table: "Games");

            migrationBuilder.AddColumn<string>(
                name: "RaffleNumbers",
                table: "Games",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RaffleNumbers",
                table: "Games");

            migrationBuilder.AddColumn<int>(
                name: "SerialId",
                table: "Games",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Games_SerialId",
                table: "Games",
                column: "SerialId");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Serials_SerialId",
                table: "Games",
                column: "SerialId",
                principalTable: "Serials",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
