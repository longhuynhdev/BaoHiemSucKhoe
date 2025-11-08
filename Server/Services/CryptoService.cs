using ISD_Project.Server.DataAccess;
using ISD_Project.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using ISD_Project.Server.Services.Interfaces;
namespace ISD_Project.Server.Services
{
    public class CryptoService : ICryptoService
    {
        private readonly ApplicationDbContext _dbContext;
        protected readonly IConfiguration _configuration;
        public CryptoService(ApplicationDbContext dbContext, IConfiguration configuration)
        {
            this._dbContext = dbContext;
            this._configuration = configuration;
        }
        public async Task<(byte[] passwordHash, byte[] passwordSalt)> CreatePasswordHashAsync(string password)
        {
            return await Task.Run(() =>
            {
                using (var hmac = new HMACSHA256())
                {
                    return (
                        passwordHash: hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
                        passwordSalt: hmac.Key
                    );
                }
            });
        }
        public async Task<string> CreateRandomTokenAsync()
        {
            string token = Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
            if (await _dbContext.UserAccounts.AnyAsync(u => u.VerificationToken == token))
            {
                await CreateRandomTokenAsync();
            }
            return token;
        }

        public async Task<string> CreateTokenAsync(UserAccount userAccount, string role)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, userAccount.Email)
            };
            if (!string.IsNullOrEmpty(role))
                claims.Add(new Claim(ClaimTypes.Role, $"{role}"));

            string tokenValue = _configuration.GetSection("Authentication:Schemes:Bearer:SigningKeys:0:Value").Value ?? string.Empty;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenValue));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(7),
                    signingCredentials: cred
            );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return await Task.FromResult(jwt);
        }

        public async Task<bool> VerifyPasswordHashAsync(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            return await Task.Run(() =>
            {
                using (var hmac = new HMACSHA256(passwordSalt))
                {
                    var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                    //Phai su dung SequenceEqual vi day la byte[] array
                    return computedHash.SequenceEqual(passwordHash);
                }
            });
        }
    }
}
