using AutoMapper;
using ISD_Project.Server.DataAccess;
using ISD_Project.Server.Models;
using ISD_Project.Server.Models.DTOs;
using ISD_Project.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ISD_Project.Server.Services
{
    public class UserAccountService : IUserAccountService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ICryptoService _cryptoService;
        private readonly IMapper _mapper;
        public UserAccountService(ApplicationDbContext dbContext, ICryptoService cryptoService, IMapper mapper)
        {
            this._dbContext = dbContext;
            this._cryptoService = cryptoService;
            this._mapper = mapper;
        }
        public async Task<IActionResult> Register(UserAccountRegisterRequest request)
        {
            using (var transaction = await _dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    // Validate request
                    if (request is null)
                    {
                        return new BadRequestObjectResult("Request is null");
                    }

                    if (await _dbContext.UserAccounts.AnyAsync(u => u.Email == request.Email))
                    {
                        return new BadRequestObjectResult("User already exists");
                    }

                    var (passwordHash, passwordSalt) = await _cryptoService.CreatePasswordHashAsync(request.Password);

                    var userAccount = new UserAccount
                    {
                        Email = request.Email,
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                    };
                    // If not customer then activate userAccount by default
                    userAccount.IsActivated = request.Role == RoleType.Customer ? (int)AccountStatus.Inactive : (int)AccountStatus.Active;
                    var token = await _cryptoService.CreateTokenAsync(userAccount, request.Role.ToString());
                    if (token != null)
                    {
                        userAccount.VerificationToken = token;
                    }
                    else
                    {
                        return new BadRequestObjectResult("Token is null");
                    }
                    var userAccountResult = await _dbContext.UserAccounts.AddAsync(userAccount);
                    await _dbContext.SaveChangesAsync();


                    int userId = 0;
                    if (request.Role != RoleType.Customer)
                    {
                        var role = request.Role;
                        switch (role)
                        {
                            case RoleType.Admin:
                                var admin = new Admin(request.Email, userAccountResult.Entity.Id, userAccountResult.Entity);
                                var v1 = await _dbContext.Admins.AddAsync(admin);
                                await _dbContext.SaveChangesAsync();
                                userId = v1.Entity.Id;
                                break;
                            case RoleType.FinancialDepartment:
                                var financialDepartment = new FinancialDepartment(request.Email, userAccountResult.Entity.Id, userAccountResult.Entity);
                                var v2 = await _dbContext.FinancialDepartments.AddAsync(financialDepartment);
                                await _dbContext.SaveChangesAsync();
                                userId = v2.Entity.Id;
                                break;
                            case RoleType.ValidationDepartment:
                                var validationDepartment = new ValidationDepartment(request.Email, userAccountResult.Entity.Id, userAccountResult.Entity);
                                var v3 = await _dbContext.ValidationDepartments.AddAsync(validationDepartment);
                                await _dbContext.SaveChangesAsync();
                                userId = v3.Entity.Id;
                                break;
                            case RoleType.CustomerCareDepartment:
                                var customerCareDepartment = new CustomerCareDepartment(request.Email, userAccountResult.Entity.Id, userAccountResult.Entity);
                                var v4 = await _dbContext.CustomerCareDepartments.AddAsync(customerCareDepartment);
                                await _dbContext.SaveChangesAsync();
                                userId = v4.Entity.Id;
                                break;
                            default:
                                throw new Exception("Role is not valid");
                        }
                        //Update UserId for UserAccount
                        userAccountResult.Entity.UserId = userId;
                        _dbContext.UserAccounts.Update(userAccountResult.Entity);
                        await _dbContext.SaveChangesAsync();
                    }

                    var userRole = new UserRole
                    {
                        UserAccountId = userAccount.Id,
                        RoleId = (int)request.Role
                    };

                    await _dbContext.UserRoles.AddAsync(userRole);
                    await _dbContext.SaveChangesAsync();

                    await transaction.CommitAsync(); // Commit transaction if all commands succeed
                    var response = new { userAccountId = userAccountResult.Entity.Id, RoleType = request.Role.ToString(), message = "UserAccount successfully created" };
                    return new OkObjectResult(response);
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync(); // Rollback transaction if exception occurs
                    return new ObjectResult(ex.Message)
                    {
                        StatusCode = 500 // Internal Server Error
                    };
                }
            }
        }
        public async Task<IActionResult> Login(UserAccountLoginRequest request)
        {
            var user = await _dbContext.UserAccounts.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
            {
                return new BadRequestObjectResult("User does not exist");
            }

            if (!await _cryptoService.VerifyPasswordHashAsync(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return new BadRequestObjectResult("Password is incorrect");
            }

            if (user.VerificationToken != null)
            {
                await Verify(user.VerificationToken);
            }

            if (user.VerifiedAt == null)
            {
                return new BadRequestObjectResult("User does not verified");
            }

            var userDto = new UserAccountLoginResponse
            {
                UserAccountId = user.Id,
                Token = user.VerificationToken,
                Role = await GetUserRoleAsync(user.Id),
                UserId = user.UserId ?? 0,
                IsActivated = user.IsActivated
            };
            return new OkObjectResult(userDto);
        }
        public async Task<IActionResult> Verify(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                return new BadRequestObjectResult("Token is null or empty");
            }

            var user = await _dbContext.UserAccounts.FirstOrDefaultAsync(u => u.VerificationToken == token);
            if (user == null)
            {
                return new BadRequestObjectResult("Invalid token");
            }

            user.VerifiedAt = System.DateTime.UtcNow;
            await _dbContext.SaveChangesAsync();
            return new OkObjectResult("User Verified");
        }

        public async Task<IActionResult> GetUserAccountAsync()
        {
            try
            {
                var userAccounts = await _dbContext.UserAccounts.ToListAsync();
                if (userAccounts is null || userAccounts.Count == 0)
                {
                    return new BadRequestObjectResult("User Accounts does not exist");
                }
                var userAccountsDto = _mapper.Map<List<UserAccountDto>>(userAccounts);
                return new OkObjectResult(userAccountsDto);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message)
                {
                    StatusCode = 500 // Internal Server Error
                };
            }
        }

        public async Task<IActionResult> GetUserAccountAsync(int id)
        {
            try
            {
                var userAccount = await _dbContext.UserAccounts.FirstOrDefaultAsync(u => u.Id == id);
                if (userAccount is null)
                {
                    return new BadRequestObjectResult("User Account does not exist");
                }
                var userAccountDto = _mapper.Map<UserAccountDto>(userAccount);
                return new OkObjectResult(userAccountDto);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message)
                {
                    StatusCode = 500
                };
            }
        }

        public async Task<String> GetUserRoleAsync(int userAccountId)
        {
            var userRole = _dbContext.UserRoles.FirstOrDefault(ur => ur.UserAccountId == userAccountId);
            if (userRole == null)
            {
                return "User does not have any role";
            }
            var role = await _dbContext.Roles.FirstOrDefaultAsync(r => r.Id == userRole.RoleId);
            if (role == null)
            {
                return "Role does not exist";
            }
            return role.Name;

        }
        public async Task<IActionResult> ForgotPassword(UserForgotPasswordRequest request)
        {
            try
            {
                var user = await _dbContext.UserAccounts.FirstOrDefaultAsync(u => u.Email == request.Email);
                if (user == null)
                {
                    return new BadRequestObjectResult("User does not exist");
                }
                user.PasswordResetToken = await _cryptoService.CreateRandomTokenAsync();
                user.RestTokenExpires = System.DateTime.UtcNow.AddHours(1);
                await _dbContext.SaveChangesAsync();
                return new OkObjectResult(user.PasswordResetToken);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message)
                {
                    StatusCode = 500
                };
            }

        }
        public async Task<IActionResult> ResetPassword(UserResetPasswordRequest request)
        {
            try
            {
                var user = await _dbContext.UserAccounts.FirstOrDefaultAsync(u => u.PasswordResetToken == request.Token);
                if (user == null)
                {
                    return new BadRequestObjectResult("Invalid token");
                }
                if (user.RestTokenExpires < System.DateTime.UtcNow)
                {
                    return new BadRequestObjectResult("Token has expired");
                }
                var (passwordHash, passwordSalt) = await _cryptoService.CreatePasswordHashAsync(request.Password);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.PasswordResetToken = null;
                user.RestTokenExpires = null;

                await _dbContext.SaveChangesAsync();
                return new OkObjectResult("Password successfully reset");
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message)
                {
                    StatusCode = 500 // Internal Server Error
                };
            }

        }

        public async Task<IActionResult> EditInfoUserAsync(UserUpdateModel model)
        {
            try
            {
                if (model.Id <= 0)
                {
                    return new BadRequestObjectResult("Invalid user Id");
                }

                var existingUser = await _dbContext.Users.FindAsync(model.Id);
                if (existingUser == null)
                {
                    return new NotFoundObjectResult("User not found");
                }

                bool isDataChanged = false;

                if (!string.IsNullOrEmpty(model.Name) && existingUser.Name != model.Name)
                {
                    existingUser.Name = model.Name;
                    isDataChanged = true;
                }

                if (!string.IsNullOrEmpty(model.Phone) && existingUser.PhoneNumber != model.Phone)
                {
                    existingUser.PhoneNumber = model.Phone;
                    isDataChanged = true;
                }

                if (model.Gender.HasValue && model.Gender >= 0 && model.Gender <= 1 && existingUser.Gender != model.Gender)
                {
                    existingUser.Gender = model.Gender.Value;
                    isDataChanged = true;
                }

                if (!string.IsNullOrEmpty(model.Address) && existingUser.Address != model.Address)
                {
                    existingUser.Address = model.Address;
                    isDataChanged = true;
                }

                if (!string.IsNullOrEmpty(model.Email) && existingUser.Email != model.Email)
                {
                    existingUser.Email = model.Email;
                    isDataChanged = true;
                }

                if (!string.IsNullOrEmpty(model.IdentityDocumentId) && existingUser.IdentityDocumentId != model.IdentityDocumentId)
                {
                    existingUser.IdentityDocumentId = model.IdentityDocumentId;
                    isDataChanged = true;
                }

                if (model.DateIssued != null && model.DateIssued != DateOnly.FromDateTime(DateTime.Today) && existingUser.DateIssued != model.DateIssued)
                {
                    existingUser.DateIssued = (DateOnly)model.DateIssued;
                    isDataChanged = true;
                }

                if (model.DateIssued != null && model.ValidUntil != DateOnly.FromDateTime(DateTime.Today) && existingUser.ValidUntil != model.ValidUntil)
                {
                    existingUser.ValidUntil = (DateOnly)model.ValidUntil;
                    isDataChanged = true;
                }

                if (model.DateIssued != null && model.DateOfBirth != DateOnly.FromDateTime(DateTime.Today) && existingUser.DateOfBirth != model.DateOfBirth)
                {
                    existingUser.DateOfBirth = (DateOnly)model.DateOfBirth;
                    isDataChanged = true;
                }

                // If no data changes, return message
                if (!isDataChanged)
                {
                    return new OkObjectResult("Updated user information successfully, but nothing changed");
                }

                // Update and save changes
                _dbContext.Update(existingUser);
                _dbContext.SaveChanges();
                return new OkObjectResult(existingUser);
            }
            catch (Exception ex)
            {

                return new ObjectResult(ex.Message)
                {
                    StatusCode = 500
                };
            }
        }

        public async Task<bool> UserExistsAsync(string email)
        {
            return await _dbContext.UserAccounts.AnyAsync(u => u.Email == email);
        }
    }
}
