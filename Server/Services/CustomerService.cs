using AutoMapper;
using ISD_Project.Server.DataAccess;
using ISD_Project.Server.Models.DTOs;
using ISD_Project.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ISD_Project.Server.Services.Interfaces;

namespace ISD_Project.Server.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public CustomerService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<(IActionResult result, int customerId)> AddCustomerAsync(CustomerRegisterRequest request)
        {
            using (var transaction = await _dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    if (request is null)
                    {
                        return (new BadRequestObjectResult("Request is null"), 0);
                    }
                    if (await _dbContext.Users.AnyAsync(u => u.Email == request.Email))
                    {
                        return (new BadRequestObjectResult("Email đã tồn tại, hãy nhập email khác!"), 0);
                    }
                    var customer = _mapper.Map<Customer>(request);

                    _dbContext.Customers.Add(customer);
                    await _dbContext.SaveChangesAsync();
                    await transaction.CommitAsync();

                    var response = new { customerId = customer.Id, message = "Customer successfully created" };
                    return (new OkObjectResult(response), customer.Id);
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    return (new ObjectResult(ex.Message)
                    {
                        StatusCode = 500 // Internal Server Error
                    }, 0);
                }
            }
        }

        public async Task<IActionResult> DeleteCustomerForceAsync(int userId)
        {
            using (var transaction = await _dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var customer = await _dbContext.Customers.FindAsync(userId);

                    if (customer is null)
                    {
                        return new BadRequestObjectResult("Customer doesn't exist");
                    }

                    // var healthInformation = await _dbContext.HealthInformation.FirstOrDefaultAsync(c => c.CustomerId == userId);
                    // if (healthInformation is not null)
                    // {
                    //     _dbContext.HealthInformation.Remove(healthInformation);
                    //     await _dbContext.SaveChangesAsync();
                    // }

                    var userAccount = await _dbContext.UserAccounts.FirstOrDefaultAsync(ua => ua.UserId == userId);
                    if (userAccount is not null)
                    {
                        _dbContext.UserAccounts.Remove(userAccount);
                        await _dbContext.SaveChangesAsync();
                    }

                    _dbContext.Customers.Remove(customer);
                    await _dbContext.SaveChangesAsync();
                    await transaction.CommitAsync();
                    return new OkObjectResult($"Customer: {customer.Id} successfully removed");
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    return new ObjectResult(ex.Message)
                    {
                        StatusCode = 500 // Internal Server Error
                    };
                }
            }
        }

        public async Task<IActionResult> GetCustomerAsync()
        {
            try
            {
                var listCustomer = await _dbContext.Customers.ToListAsync();
                if (listCustomer is null || listCustomer.Count == 0)
                {
                    return new NotFoundObjectResult("Customers not found");
                }
                List<CustomerDto> listCustomerDto = _mapper.Map<List<CustomerDto>>(listCustomer);
                return new OkObjectResult(listCustomerDto);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message)
                {
                    StatusCode = 500 // Internal Server Error
                };
            }
        }

        public async Task<IActionResult> GetCustomerAsync(int id)
        {
            try
            {
                var customer = await _dbContext.Customers.FirstOrDefaultAsync(c => c.Id == id);
                if (customer is null)
                {
                    return new NotFoundObjectResult("Customer not found");
                }
                else
                {
                    var customerDto = _mapper.Map<UserDto>(customer);
                    return new OkObjectResult(customerDto);
                }

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
