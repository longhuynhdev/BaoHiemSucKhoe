using AutoMapper;
using ISD_Project.Server.DataAccess;
using ISD_Project.Server.Models.DTOs;
using ISD_Project.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ISD_Project.Server.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public UserService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IActionResult> GetUserAsync()
        {
            try
            {
                var listUser = await _dbContext.Users.ToListAsync();
                var listUserDto = _mapper.Map<List<UserDto>>(listUser);
                return new OkObjectResult(listUserDto);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message)
                {
                    StatusCode = 500 // Internal Server Error
                };
            }
        }

        public async Task<IActionResult> GetUserByIdAsync(int id)
        {
            try
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
                var UserDto = _mapper.Map<UserDto>(user);
                if (user == null)
                {
                    return new NotFoundObjectResult("User not found");
                }
                return new OkObjectResult(UserDto);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message)
                {
                    StatusCode = 500 // Internal Server Error
                };
            }
        }


    }
}
