using AutoMapper;
using ISD_Project.Server.DataAccess;
using ISD_Project.Server.Models;
using ISD_Project.Server.Models.DTOs;
using ISD_Project.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ISD_Project.Server.Services
{
    public class HealthInformationService : IHealthInformationService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        public HealthInformationService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }


        public async Task<IActionResult> AddHealthInformationAsync(HealthInformationDto request)
        {
            using (var transaction = await _dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    //Validate request
                    if (request is null)
                    {
                        return new BadRequestObjectResult("Request is null");
                    }
                    if (request.CustomerId == 0)
                    {
                        return new BadRequestObjectResult("Customer Id is null");
                    }

                    var customer = await _dbContext.Customers.FindAsync(request.CustomerId);
                    if (customer is null)
                    {
                        return new BadRequestObjectResult("Customer not found");
                    }
                    if (customer.HealthInformation != null)
                    {
                        return new BadRequestObjectResult("Customer already has health information");
                    }
                    //Validate input data
                    if (!request.Smoking)
                    {
                        request.CigarettesPerDay = 0;
                    }
                    if (!request.AlcoholConsumption)
                    {
                        request.DaysPerWeekAlcohol = 0;
                    }
                    if (!request.EngagesInDangerousSports)
                    {
                        request.DangerousSportsDetails = String.Empty;
                    }
                    if (!request.ExperiencedDiseasesInLast5Years)
                    {
                        request.ExperiencedDiseasesDetails = String.Empty;
                    }
                    if (!request.UnexplainedWeightLoss)
                    {
                        request.UnexplainedWeightLossDetails = String.Empty;
                    }
                    var healthInformation = _mapper.Map<HealthInformation>(request);
                    healthInformation.LastUpdate = DateTime.UtcNow;

                    await _dbContext.HealthInformation.AddAsync(healthInformation);
                    await _dbContext.SaveChangesAsync();

                    //After adding health information, update customer's health information id
                    customer.HealthInformation = healthInformation;
                    _dbContext.Customers.Update(customer);
                    await _dbContext.SaveChangesAsync();

                    var response = new { healthInformationId = customer.HealthInformation.Id, customerId = customer.Id, message = "Health information successfully created" };
                    await transaction.CommitAsync();
                    return new OkObjectResult(response);
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

        public async Task<IActionResult> GetHealthInformationAsync(int userId)
        {
            var healthInformation = await _dbContext.HealthInformation.Where(h => h.CustomerId == userId).FirstOrDefaultAsync();
            if (healthInformation is null)
            {
                return new NotFoundObjectResult("Health information not found");
            }
            var response = _mapper.Map<HealthInformationDto>(healthInformation);
            return new OkObjectResult(response);
        }
    }
}

