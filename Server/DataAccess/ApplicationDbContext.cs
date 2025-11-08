using ISD_Project.Server.Models;
using ISD_Project.Server.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace ISD_Project.Server.DataAccess
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {

        //Constructor


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Email of User must be unique
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
            // One User has one UserAccount
            modelBuilder.Entity<User>()
                .HasOne(u => u.UserAccount)
                .WithOne(ua => ua.User)
                .HasForeignKey<UserAccount>(ua => ua.UserId)
                .IsRequired(false);
            // One Customer has one HealthInformation
            modelBuilder.Entity<Customer>()
                .HasOne(c => c.HealthInformation)
                .WithOne(hi => hi.Customer)
                .HasForeignKey<HealthInformation>(hi => hi.CustomerId)
                .IsRequired(false);

            // Child classes of User
            modelBuilder.Entity<Customer>()
                .HasBaseType<User>();

            modelBuilder.Entity<Admin>()
                .HasBaseType<User>();

            modelBuilder.Entity<FinancialDepartment>()
                .HasBaseType<User>();

            modelBuilder.Entity<ValidationDepartment>()
                .HasBaseType<User>();

            modelBuilder.Entity<CustomerCareDepartment>()
                .HasBaseType<User>();
            //

            modelBuilder.Entity<Role>().HasData(
                 new Role { Id = 1, Name = "Customer" },
                 new Role { Id = 2, Name = "Admin" },
                 new Role { Id = 3, Name = "FinancialDepartment" },
                 new Role { Id = 4, Name = "ValidationDepartment" },
                 new Role { Id = 5, Name = "CustomerCareDepartment" }
                );

            modelBuilder.Entity<InsuranceType>().HasData(
                new InsuranceType { Id = 1, Name = "Bảo hiểm tai nạn", Description = "Giải pháp bảo vệ tài chính tối ưu cho bạn và gia đình trước rủi ro về tai nạn, tử vong và thương tật do tai nạn" },
                new InsuranceType { Id = 2, Name = "Bảo hiểm tử vong và thương tật", Description = "Giải pháp gia tăng bảo vệ tài chính và hỗ trợ đóng phí cho bạn và gia đình trước những rủi ro tử vong và thương tật" },
                new InsuranceType { Id = 3, Name = "Bảo hiểm hiểm nghèo", Description = "Giải pháp hỗ trợ đóng phí và bảo vệ tài chính cho bạn và gia đình trước những rủi ro mắc bệnh hiểm nghèo" }
                );

            modelBuilder.Entity<Insurance>().HasData(
                new Insurance { InsuranceId = 1, InsuranceTypeId = 1, InsuranceName = "Bảo hiểm Tai nạn dành cho trẻ em", CoveragePeriodInYears = 5, SummaryDescription = "Giải pháp bảo vệ trước rủi ro tai nạn dành cho trẻ em.", DetailDescription = "Lựa chọn bảo hiểm tai nạn dành cho trẻ em nhằm mang lại sự đảm bảo vững chắc cho quá trình phát triển của trẻ cũng như giảm gánh nặng chi phí trước rủi ro bất ngờ xảy đến.", PriceAmount = 1000000 },
                new Insurance { InsuranceId = 2, InsuranceTypeId = 1, InsuranceName = "Bảo hiểm Chết do tai nạn", CoveragePeriodInYears = 7, SummaryDescription = "Giải pháp tối ưu cung cấp quyền lợi bảo vệ tài chính trước rủi ro tử vong do tai nạn.", DetailDescription = "Bảo hiểm chết do tai nạn của Prudential sẽ là giải pháp san sẻ gánh nặng tài chính kịp thời. Nhờ đó, góp phần tạo điều kiện giúp gia đình người tham gia bảo hiểm nhanh chóng vượt qua những khó khăn để sớm ổn định cuộc sống sau này. Không chỉ vậy, số tiền bảo hiểm được chi trả nhanh chóng, theo quy trình rõ ràng. Hiện tại, sản phẩm được thiết kế có thể đính kèm cùng nhiều gói bảo hiểm chính của Prudential, khách hàng có thể dễ dàng lựa chọn tích hợp để bảo vệ tài chính toàn diện và tối ưu hơn.", PriceAmount = 1000000 },
                new Insurance { InsuranceId = 3, InsuranceTypeId = 2, InsuranceName = "Bảo hiểm Miễn đóng phí chết và thương tật toàn bộ vĩnh viễn", CoveragePeriodInYears = 4, SummaryDescription = "Giải pháp miễn đóng phí nếu không may gặp rủi ro tử vong hoặc thương tật toàn bộ vĩnh viễn", DetailDescription = "Điểm nổi bật của sản phẩm Bảo hiểm Miễn đóng phí chết và thương tật toàn bộ vĩnh viễn thể hiện ở khả năng hỗ trợ tài chính, gia tăng quyền lợi bảo vệ tối đa cho người được bảo hiểm. Chỉ với một khoản phí hợp lý cho sản phẩm này, người tham gia được miễn đóng phí, không phải lo lắng về rủi ro phải dừng đóng phí bảo hiểm của hợp đồng bảo hiểm. Trong trường hợp bên mua bảo hiểm chẳng may tử vong hoặc thương tật toàn bộ vĩnh viễn, hợp đồng bảo hiểm vẫn có thể được duy trì, quyền lợi của sản phẩm bảo hiểm vẫn được đảm bảo.", PriceAmount = 2000000 },
                new Insurance { InsuranceId = 4, InsuranceTypeId = 3, InsuranceName = "Sản phẩm bảo hiểm tử kỳ với quyền lợi bảo hiểm tình trạng tổn thương theo mức độ", CoveragePeriodInYears = 3, SummaryDescription = "Bảo vệ “các hệ điều hành cơ thể” theo tình trạng tổn thương", DetailDescription = "KHÔNG PHỤ THUỘC DANH SÁCH BỆNH TRUYỀN THỐNG, bảo hiểm theo tình trạng tổn thương của hệ cơ quan và chức năng", PriceAmount = 1500000 }
            );
        }
        //DB Sets
        public DbSet<User> Users { get; set; }
        // ----  Child classes of User
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<FinancialDepartment> FinancialDepartments { get; set; }
        public DbSet<ValidationDepartment> ValidationDepartments { get; set; }
        public DbSet<CustomerCareDepartment> CustomerCareDepartments { get; set; }
        // ----  Child classes of User

        public DbSet<HealthInformation> HealthInformation { get; set; }
        public DbSet<UserAccount> UserAccounts { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Insurance> Insurances { get; set; }
        public DbSet<InsuranceType> InsuranceTypes { get; set; }
        public DbSet<ApprovalStatus> ApprovalStatuses { get; set; }
        public DbSet<InsuranceContract> InsuranceContracts { get; set; }
    }
}
