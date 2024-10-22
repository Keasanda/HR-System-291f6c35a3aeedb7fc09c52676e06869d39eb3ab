using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class newtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BankingDetails_AspNetUsers_AppUserId",
                table: "BankingDetails");

            migrationBuilder.DropIndex(
                name: "IX_BankingDetails_AppUserId",
                table: "BankingDetails");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "192f2156-4365-490e-b831-c812c8318efb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fb617dea-f8f8-4219-ab96-616ae4470b9e");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "BankingDetails");

            migrationBuilder.AddColumn<int>(
                name: "BankingDetailId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b4c7e7c6-c3a5-42f8-86da-531c443b1b70", null, "User", "USER" },
                    { "bdc2c940-d773-45b2-9b5c-e6ed7163e2ee", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_BankingDetailId",
                table: "Employees",
                column: "BankingDetailId",
                unique: true,
                filter: "[BankingDetailId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_BankingDetails_BankingDetailId",
                table: "Employees",
                column: "BankingDetailId",
                principalTable: "BankingDetails",
                principalColumn: "BankingDetailId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_BankingDetails_BankingDetailId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_BankingDetailId",
                table: "Employees");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b4c7e7c6-c3a5-42f8-86da-531c443b1b70");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bdc2c940-d773-45b2-9b5c-e6ed7163e2ee");

            migrationBuilder.DropColumn(
                name: "BankingDetailId",
                table: "Employees");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "BankingDetails",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "192f2156-4365-490e-b831-c812c8318efb", null, "Admin", "ADMIN" },
                    { "fb617dea-f8f8-4219-ab96-616ae4470b9e", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_BankingDetails_AppUserId",
                table: "BankingDetails",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_BankingDetails_AspNetUsers_AppUserId",
                table: "BankingDetails",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "AppUserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
