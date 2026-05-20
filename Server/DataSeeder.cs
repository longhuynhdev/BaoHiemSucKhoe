using ISD_Project.Server.Models;
using ISD_Project.Server.Models.DTOs;
using ISD_Project.Server.Services.Interfaces;
using Microsoft.Extensions.Logging;

namespace ISD_Project.Server;

public class DataSeeder
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<DataSeeder> _logger;

    public DataSeeder(IServiceProvider serviceProvider, ILogger<DataSeeder> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    public async Task SeedAsync()
    {
        using var scope = _serviceProvider.CreateScope();
        var userAccountService = scope.ServiceProvider.GetRequiredService<IUserAccountService>();

        var users = new List<UserAccountRegisterRequest>
        {
            new() { Email = "admin@isd.com", Password = "Demo123@", ConfirmPassword = "Demo123@", Role = RoleType.Admin },
            new() { Email = "findep@isd.com", Password = "Demo123@", ConfirmPassword = "Demo123@", Role = RoleType.FinancialDepartment },
            new() { Email = "validdep@isd.com", Password = "Demo123@", ConfirmPassword = "Demo123@", Role = RoleType.ValidationDepartment },
            new() { Email = "customercaredep@isd.com", Password = "Demo123@", ConfirmPassword = "Demo123@", Role = RoleType.CustomerCareDepartment }
        };

        foreach (var user in users)
        {
            try
            {
                // Check if user already exists (assuming IUserAccountService has a method like UserExistsAsync)
                if (!await userAccountService.UserExistsAsync(user.Email))
                {
                    await userAccountService.Register(user);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to seed user {user.Email}");
            }
        }
    }
}