using AutoMapper;
using ISD_Project.Server.DataAccess;
using ISD_Project.Server.Models;
using ISD_Project.Server.Models.DTOs;
using ISD_Project.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ISD_Project.Server.Services;

public class InsuranceContractService : IInsuranceContractService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IMapper _mapper;
    public InsuranceContractService(ApplicationDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }
    public async Task<IActionResult> AddInsuranceContractAsync(InsuranceContractDto insuranceContractDto)
    {
        if (insuranceContractDto is null)
        {
            return new BadRequestObjectResult("Request is null");
        }

        try
        {
            if (insuranceContractDto.CustomerId == 0 || insuranceContractDto.InsuranceId == 0)
            {
                return new BadRequestObjectResult("CustomerId or InsuranceId is null");
            }
            var customer = await _dbContext.Customers.FirstOrDefaultAsync(c => c.Id == insuranceContractDto.CustomerId);
            if (customer is null)
            {
                return new BadRequestObjectResult("Customer not found");
            }
            var insurance = await _dbContext.Insurances.FirstOrDefaultAsync(i => i.InsuranceId == insuranceContractDto.InsuranceId);
            if (insurance is null)
            {
                return new BadRequestObjectResult("Insurance not found");
            }
            InsuranceContract? insuranceContract = _mapper.Map<InsuranceContract>(insuranceContractDto);
            insuranceContract.CustomerId = insuranceContractDto.CustomerId;
            insuranceContract.Customer = customer;
            insuranceContract.InsuranceId = insuranceContractDto.InsuranceId;
            insuranceContract.Insurance = insurance;
            await _dbContext.InsuranceContracts.AddAsync(insuranceContract);
            await _dbContext.SaveChangesAsync();
            var response = new { customerId = insuranceContractDto.CustomerId, insuranceId = insuranceContractDto.InsuranceId, message = "Insurance Contract successfully created" };
            return new OkObjectResult(response);
        }
        catch (Exception ex)
        {
            return new ObjectResult(ex.Message)
            {
                StatusCode = 500 // Internal Server Error
            };
        }
    }

    public Task<IActionResult> DeleteInsuranceContractAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<IActionResult> GetInsuranceContractAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<List<InsuranceContract>> GetInsuranceContractsAsync()
    {
        var InsuranceContracts = await _dbContext.InsuranceContracts.ToListAsync();
        return (InsuranceContracts);
    }
    public async Task<List<InsuranceContract>> GetInsuranceContractsPendingApproval()
    {
        var InsuranceContracts = await _dbContext.InsuranceContracts.Where(ic => ic.ProfileStatus == ProfileStatus.Pending).ToListAsync();
        return (InsuranceContracts);
    }

    public async Task<IActionResult> GetInsuranceApproval()
    {
        var pendingContracts = await _dbContext.InsuranceContracts
        .Where(ic => ic.ProfileStatus == ProfileStatus.Pending)
        .ToListAsync();

        var listCustomerId = pendingContracts.Select(ic => ic.CustomerId).ToList();
        var customers = await _dbContext.Customers.Where(c => listCustomerId.Contains(c.Id)).ToListAsync();

        var listInsuranceId = pendingContracts.Select(ic => ic.InsuranceId).ToList();
        var insurances = await _dbContext.Insurances.Where(i => listInsuranceId.Contains(i.InsuranceId)).ToListAsync();

        // Tạo danh sách DTOs
        var customerInsuranceDtos = new List<CustomerInsuranceDto>();

        foreach (var contract in pendingContracts)
        {
            var customer = customers.FirstOrDefault(c => c.Id == contract.CustomerId);
            var insurance = insurances.FirstOrDefault(i => i.InsuranceId == contract.InsuranceId);
            var customerDto = new CustomerInsuranceDto
            {
                CustomerDto = _mapper.Map<CustomerDto>(customer),
                InsuranceDto = _mapper.Map<InsuranceDto>(insurance),
            };
            customerInsuranceDtos.Add(customerDto);
        }

        return new OkObjectResult(customerInsuranceDtos);
    }
    

    public Task<IActionResult> UpdateInsuranceContractAsync(InsuranceContract insuranceContract)
    {
        throw new NotImplementedException();
    }
}
