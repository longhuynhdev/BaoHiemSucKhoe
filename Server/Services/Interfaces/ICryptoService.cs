using ISD_Project.Server.Models;

namespace ISD_Project.Server.Services.Interfaces
{
    public interface ICryptoService
    {

        Task<(byte[] passwordHash, byte[] passwordSalt)> CreatePasswordHashAsync(string password);
        Task<string> CreateRandomTokenAsync();
        Task<string> CreateTokenAsync(UserAccount userAccount, string role);
        Task<bool> VerifyPasswordHashAsync(string password, byte[] storedHash, byte[] storedSalt);

    }
}
