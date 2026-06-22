using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BaoHiemSucKhoe.Server.Migrations
{
    /// <inheritdoc />
    public partial class initialization : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InsuranceTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InsuranceTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdentityDocumentId = table.Column<string>(type: "character varying(12)", maxLength: 12, nullable: false),
                    DateIssued = table.Column<DateOnly>(type: "date", nullable: false),
                    ValidUntil = table.Column<DateOnly>(type: "date", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Gender = table.Column<int>(type: "integer", nullable: false),
                    DateOfBirth = table.Column<DateOnly>(type: "date", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "character varying(13)", maxLength: 13, nullable: false),
                    UserAccountId = table.Column<int>(type: "integer", nullable: true),
                    Discriminator = table.Column<string>(type: "character varying(34)", maxLength: 34, nullable: false),
                    Nationality = table.Column<string>(type: "text", nullable: true),
                    Job = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Insurances",
                columns: table => new
                {
                    InsuranceId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InsuranceName = table.Column<string>(type: "text", nullable: false),
                    CoveragePeriodInYears = table.Column<int>(type: "integer", nullable: false),
                    SummaryDescription = table.Column<string>(type: "text", nullable: false),
                    DetailDescription = table.Column<string>(type: "text", nullable: false),
                    PriceAmount = table.Column<decimal>(type: "numeric", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: true),
                    InsuranceTypeId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Insurances", x => x.InsuranceId);
                    table.ForeignKey(
                        name: "FK_Insurances_InsuranceTypes_InsuranceTypeId",
                        column: x => x.InsuranceTypeId,
                        principalTable: "InsuranceTypes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "HealthInformation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Height = table.Column<double>(type: "double precision", nullable: false),
                    Weight = table.Column<double>(type: "double precision", nullable: false),
                    Smoking = table.Column<bool>(type: "boolean", nullable: false),
                    CigarettesPerDay = table.Column<int>(type: "integer", nullable: false),
                    AlcoholConsumption = table.Column<bool>(type: "boolean", nullable: false),
                    DaysPerWeekAlcohol = table.Column<int>(type: "integer", nullable: false),
                    DrugUse = table.Column<bool>(type: "boolean", nullable: false),
                    EngagesInDangerousSports = table.Column<bool>(type: "boolean", nullable: false),
                    DangerousSportsDetails = table.Column<string>(type: "text", nullable: false),
                    DiagnosedWithHealthConditions = table.Column<bool>(type: "boolean", nullable: false),
                    HasSpecificHealthConditions = table.Column<bool>(type: "boolean", nullable: false),
                    ExperiencedDiseasesInLast5Years = table.Column<bool>(type: "boolean", nullable: false),
                    ExperiencedDiseasesDetails = table.Column<string>(type: "text", nullable: false),
                    UnexplainedWeightLoss = table.Column<bool>(type: "boolean", nullable: false),
                    UnexplainedWeightLossDetails = table.Column<string>(type: "text", nullable: false),
                    LastUpdate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CustomerId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HealthInformation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HealthInformation_Users_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserAccounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "bytea", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "bytea", nullable: false),
                    VerificationToken = table.Column<string>(type: "text", nullable: false),
                    VerifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    PasswordResetToken = table.Column<string>(type: "text", nullable: true),
                    RestTokenExpires = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActivated = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAccounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserAccounts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ApprovalStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CustomerId = table.Column<int>(type: "integer", nullable: false),
                    InsuranceId = table.Column<int>(type: "integer", nullable: false),
                    ValidationDepartmentId = table.Column<int>(type: "integer", nullable: false),
                    ProfileStatus = table.Column<int>(type: "integer", nullable: false),
                    ApprovalDate = table.Column<DateOnly>(type: "date", nullable: false),
                    ApprovalComment = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApprovalStatuses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApprovalStatuses_Insurances_InsuranceId",
                        column: x => x.InsuranceId,
                        principalTable: "Insurances",
                        principalColumn: "InsuranceId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApprovalStatuses_Users_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApprovalStatuses_Users_ValidationDepartmentId",
                        column: x => x.ValidationDepartmentId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InsuranceContracts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CustomerId = table.Column<int>(type: "integer", nullable: false),
                    InsuranceId = table.Column<int>(type: "integer", nullable: false),
                    ProfileStatus = table.Column<int>(type: "integer", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InsuranceContracts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InsuranceContracts_Insurances_InsuranceId",
                        column: x => x.InsuranceId,
                        principalTable: "Insurances",
                        principalColumn: "InsuranceId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InsuranceContracts_Users_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserAccountId = table.Column<int>(type: "integer", nullable: false),
                    RoleId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_UserAccounts_UserAccountId",
                        column: x => x.UserAccountId,
                        principalTable: "UserAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "InsuranceTypes",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "Giải pháp bảo vệ tài chính tối ưu cho bạn và gia đình trước rủi ro về tai nạn, tử vong và thương tật do tai nạn", "Bảo hiểm tai nạn" },
                    { 2, "Giải pháp gia tăng bảo vệ tài chính và hỗ trợ đóng phí cho bạn và gia đình trước những rủi ro tử vong và thương tật", "Bảo hiểm tử vong và thương tật" },
                    { 3, "Giải pháp hỗ trợ đóng phí và bảo vệ tài chính cho bạn và gia đình trước những rủi ro mắc bệnh hiểm nghèo", "Bảo hiểm hiểm nghèo" }
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Customer" },
                    { 2, "Admin" },
                    { 3, "FinancialDepartment" },
                    { 4, "ValidationDepartment" },
                    { 5, "CustomerCareDepartment" }
                });

            migrationBuilder.InsertData(
                table: "Insurances",
                columns: new[] { "InsuranceId", "CoveragePeriodInYears", "DetailDescription", "ImageUrl", "InsuranceName", "InsuranceTypeId", "PriceAmount", "SummaryDescription" },
                values: new object[,]
                {
                    { 1, 5, "Lựa chọn bảo hiểm tai nạn dành cho trẻ em nhằm mang lại sự đảm bảo vững chắc cho quá trình phát triển của trẻ cũng như giảm gánh nặng chi phí trước rủi ro bất ngờ xảy đến.", "", "Bảo hiểm Tai nạn dành cho trẻ em", 1, 1000000m, "Giải pháp bảo vệ trước rủi ro tai nạn dành cho trẻ em." },
                    { 2, 7, "Bảo hiểm chết do tai nạn của Prudential sẽ là giải pháp san sẻ gánh nặng tài chính kịp thời. Nhờ đó, góp phần tạo điều kiện giúp gia đình người tham gia bảo hiểm nhanh chóng vượt qua những khó khăn để sớm ổn định cuộc sống sau này. Không chỉ vậy, số tiền bảo hiểm được chi trả nhanh chóng, theo quy trình rõ ràng. Hiện tại, sản phẩm được thiết kế có thể đính kèm cùng nhiều gói bảo hiểm chính của Prudential, khách hàng có thể dễ dàng lựa chọn tích hợp để bảo vệ tài chính toàn diện và tối ưu hơn.", "", "Bảo hiểm Chết do tai nạn", 1, 1000000m, "Giải pháp tối ưu cung cấp quyền lợi bảo vệ tài chính trước rủi ro tử vong do tai nạn." },
                    { 3, 4, "Điểm nổi bật của sản phẩm Bảo hiểm Miễn đóng phí chết và thương tật toàn bộ vĩnh viễn thể hiện ở khả năng hỗ trợ tài chính, gia tăng quyền lợi bảo vệ tối đa cho người được bảo hiểm. Chỉ với một khoản phí hợp lý cho sản phẩm này, người tham gia được miễn đóng phí, không phải lo lắng về rủi ro phải dừng đóng phí bảo hiểm của hợp đồng bảo hiểm. Trong trường hợp bên mua bảo hiểm chẳng may tử vong hoặc thương tật toàn bộ vĩnh viễn, hợp đồng bảo hiểm vẫn có thể được duy trì, quyền lợi của sản phẩm bảo hiểm vẫn được đảm bảo.", "", "Bảo hiểm Miễn đóng phí chết và thương tật toàn bộ vĩnh viễn", 2, 2000000m, "Giải pháp miễn đóng phí nếu không may gặp rủi ro tử vong hoặc thương tật toàn bộ vĩnh viễn" },
                    { 4, 3, "KHÔNG PHỤ THUỘC DANH SÁCH BỆNH TRUYỀN THỐNG, bảo hiểm theo tình trạng tổn thương của hệ cơ quan và chức năng", "", "Sản phẩm bảo hiểm tử kỳ với quyền lợi bảo hiểm tình trạng tổn thương theo mức độ", 3, 1500000m, "Bảo vệ “các hệ điều hành cơ thể” theo tình trạng tổn thương" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalStatuses_CustomerId",
                table: "ApprovalStatuses",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalStatuses_InsuranceId",
                table: "ApprovalStatuses",
                column: "InsuranceId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalStatuses_ValidationDepartmentId",
                table: "ApprovalStatuses",
                column: "ValidationDepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_HealthInformation_CustomerId",
                table: "HealthInformation",
                column: "CustomerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_InsuranceContracts_CustomerId",
                table: "InsuranceContracts",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_InsuranceContracts_InsuranceId",
                table: "InsuranceContracts",
                column: "InsuranceId");

            migrationBuilder.CreateIndex(
                name: "IX_Insurances_InsuranceTypeId",
                table: "Insurances",
                column: "InsuranceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAccounts_UserId",
                table: "UserAccounts",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_UserAccountId",
                table: "UserRoles",
                column: "UserAccountId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApprovalStatuses");

            migrationBuilder.DropTable(
                name: "HealthInformation");

            migrationBuilder.DropTable(
                name: "InsuranceContracts");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Insurances");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "UserAccounts");

            migrationBuilder.DropTable(
                name: "InsuranceTypes");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
