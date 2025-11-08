using AutoMapper;
using ISD_Project.Server.DataAccess;
using ISD_Project.Server.Models;
using ISD_Project.Server.Models.DTOs;
using ISD_Project.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ISD_Project.Server.Services;

public class ApprovalStatusService : IApprovalStatusService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IValidationService _validationService;
    private readonly IInsuranceContractService _insuranceContractService;
    private readonly IUserAccountService _userAccount;
    private readonly IEmailService _emailService;
    private readonly IMapper _mapper;
    public ApprovalStatusService(ApplicationDbContext dbContext, IValidationService validationService, IInsuranceContractService insuranceContractService, IMapper mapper, IEmailService emailService, IUserAccountService userAccountService)
    {
        _dbContext = dbContext;
        _mapper = mapper;
        _validationService = validationService;
        _insuranceContractService = insuranceContractService;
        _emailService = emailService;
        _userAccount = userAccountService;
    }

    public async Task<IActionResult> AddApprovalStatusAsync(ApprovalStatusDto approvalStatusDto)
    {
        try
        {
            // Validation
            if (approvalStatusDto is null)
            {
                return new BadRequestObjectResult("Approval status is null");
            }
            if (approvalStatusDto.CustomerId == 0 || approvalStatusDto.InsuranceId == 0 || approvalStatusDto.ValidationDepartmentId == 0)
            {
                return new BadRequestObjectResult("Customer id or insurance id or validation department id is null");
            }

            var customer = await _dbContext.Customers.FindAsync(approvalStatusDto.CustomerId);
            if (customer is null)
            {
                return new NotFoundObjectResult("Customer not found");
            }
            var insurance = await _dbContext.Insurances.FindAsync(approvalStatusDto.InsuranceId);
            if (insurance is null)
            {
                return new NotFoundObjectResult("Insurance not found");
            }
            var validationDepartment = await _dbContext.ValidationDepartments.FindAsync(approvalStatusDto.ValidationDepartmentId);
            if (validationDepartment is null)
            {
                return new NotFoundObjectResult("Validation department not found");
            }
            // Create approval status
            var approvalStatus = _mapper.Map<ApprovalStatus>(approvalStatusDto);
            approvalStatus.Customer = customer;
            approvalStatus.Insurance = insurance;
            approvalStatus.ValidationDepartment = validationDepartment;
            await _dbContext.ApprovalStatuses.AddAsync(approvalStatus);
            await _dbContext.SaveChangesAsync();
            // Validate customer
            // Update insurance contract
            var insuranceContract = await _dbContext.InsuranceContracts.FirstOrDefaultAsync(i => i.CustomerId == approvalStatusDto.CustomerId && i.InsuranceId == approvalStatusDto.InsuranceId);
            if (insuranceContract is null)
            {
                return new NotFoundObjectResult("Insurance contract not found");
            }
            insuranceContract.ProfileStatus = approvalStatusDto.ProfileStatus;
            _dbContext.Update(insuranceContract);
            await _dbContext.SaveChangesAsync();
            if (approvalStatusDto.ProfileStatus == ProfileStatus.Approved)
            {
                //Create new account for customer after approval
                if (insuranceContract.Customer.UserAccount is null)
                {
                    await CreateAndAssignUserAccountForCustomerAsync(insuranceContract.Customer);
                    if (customer.UserAccount is not null)
                    {
                        await _emailService.SendEmailAsync(customer.Email, "Account created", EmailMessageBody.ProfileApproved(customer.UserAccount.Email, "Demo123", $"https://localhost:5173/activate/{customer.UserAccount.Id}"));
                    }
                }


                // After updating insurance contract, send email to customer
                await _emailService.SendEmailAsync(approvalStatus.Customer.Email, "Hồ sơ đăng ký bảo hiểm được duyệt trong hệ thống", EmailMessageBody.ProfileApproved(approvalStatus.Customer.Email, "Demo123", $"https://localhost:5173/activate/{customer.UserAccount.Id}"));

                var response = new { approvalStatusId = approvalStatus.Id, message = "Approval status successfully created", value = approvalStatusDto };
                return new OkObjectResult(response);
            } else
            {
                throw new NotImplementedException();
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

    public async Task CreateAndAssignUserAccountForCustomerAsync(Customer customer)
    {
        var existingUserAccount = await _dbContext.UserAccounts.FirstOrDefaultAsync(u => u.Email == customer.Email);
        if (existingUserAccount is null)
        {
            var userRegisterRequest = new UserAccountRegisterRequest(customer.Email, "Demo123", "Demo123", RoleType.Customer);
            await _userAccount.Register(userRegisterRequest);

            customer.UserAccount = await _dbContext.UserAccounts.FirstOrDefaultAsync(u => u.Email == customer.Email);

            if (customer.UserAccount is not null)
            {
                customer.UserAccountId = customer.UserAccount.Id;
                _dbContext.Update(customer);
                await _dbContext.SaveChangesAsync();
            }
        }
        else
        {
            customer.UserAccount = existingUserAccount;
            customer.UserAccountId = existingUserAccount.Id;
            _dbContext.Update(customer);
            await _dbContext.SaveChangesAsync();
        }

    }

    public async Task<IActionResult> GetApprovalStatusAsync()
    {
        var approvalStatuses = await _dbContext.ApprovalStatuses.ToListAsync();
        if (approvalStatuses is null)
        {
            return new NotFoundObjectResult("No approval status found");
        }
        var approvalStatusesDto = _mapper.Map<List<ApprovalStatusDto>>(approvalStatuses);
        return new OkObjectResult(approvalStatusesDto);
    }

    public async Task<IActionResult> GetApprovalStatusAsync(ProfileStatus profileStatus)
    {
        var approvalStatuses = await _dbContext.ApprovalStatuses.Where(a => a.ProfileStatus == profileStatus).ToListAsync();
        if (approvalStatuses is null)
        {
            return new NotFoundObjectResult("No approval status found");
        }

        var result = new List<ApprovalStatusResponse>();
        foreach (var item in approvalStatuses)
        {
            var approvalStatusResponse = new ApprovalStatusResponse();
            var customer = await _dbContext.Customers.FindAsync(item.CustomerId);
            if (customer is null)
            {
                return new NotFoundObjectResult("Customer not found");
            }
            var insurance = await _dbContext.Insurances.FindAsync(item.InsuranceId);
            if (insurance is null)
            {
                return new NotFoundObjectResult("Insurance not found");
            }
            var validationDepartment = await _dbContext.ValidationDepartments.FindAsync(item.ValidationDepartmentId);
            if (validationDepartment is null)
            {
                return new NotFoundObjectResult("Validation department not found");
            }
            approvalStatusResponse.CustomerName = item.Customer.Name;
            approvalStatusResponse.CustomerEmail = item.Customer.Email;
            approvalStatusResponse.ValidationDepartmentName = item.ValidationDepartment.Name;
            approvalStatusResponse.InsuranceName = item.Insurance.InsuranceName;
            approvalStatusResponse.ProfileStatus = item.ProfileStatus.ToString();
            approvalStatusResponse.ApprovalDate = item.ApprovalDate;
            approvalStatusResponse.ApprovalComment = item.ApprovalComment;
            result.Add(approvalStatusResponse);
        }
        return new OkObjectResult(result);
    }

    public Task<IActionResult> GetInsuranceContractsPendingApproval()
    {
        var listInsuranceContract = _insuranceContractService.GetInsuranceContractsAsync();
        throw new NotImplementedException();
    }
}
