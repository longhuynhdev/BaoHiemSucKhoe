using ISD_Project.Server.DataAccess;
using ISD_Project.Server.Models;
using ISD_Project.Server.Models.DTOs;
using ISD_Project.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ISD_Project.Server.Services
{
    public class ValidationService : IValidationService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ICustomerService _customerService;
        private readonly IHealthInformationService _healthInformationService;
        private readonly IInsuranceContractService _insuranceContractService;
        private readonly IApprovalStatusService _approvalStatusService;
        private readonly IUserAccountService _userAccount;
        private readonly IEmailService _emailService;
        public ValidationService(ApplicationDbContext dbContext, ICustomerService customerService, IHealthInformationService healthInformationService, IInsuranceContractService insuranceContractService,
            IUserAccountService userAccount, IEmailService emailService)
        {
            _dbContext = dbContext;
            _customerService = customerService;
            _healthInformationService = healthInformationService;
            _insuranceContractService = insuranceContractService;
            _userAccount = userAccount;
            _emailService = emailService;
        }

        public async Task<IActionResult> ValidateUserAccountAsync(UserAccountValidateRequest request)
        {
            try
            {
                var userAccount = await _dbContext.UserAccounts.FirstOrDefaultAsync(u => u.Id == request.UserAccountId);
                if (userAccount is null)
                {
                    return new NotFoundObjectResult("User account not found");
                }
                userAccount.IsActivated = (int)request.AccountStatus;
                _dbContext.Update(userAccount);
                await _dbContext.SaveChangesAsync();
                return new OkObjectResult($"User Account information updated successfully: {request.AccountStatus}");
            }
            catch (Exception)
            {
                return new StatusCodeResult(500);
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

        public async Task<IActionResult> ValidateInsuranceContractAsync(InsuranceContractRegisterRequest request)
        {
            bool flagRollback = false;
            int customerIdForRollback = 0;
            try
            {

                var customerServiceResponse = await _customerService.AddCustomerAsync(request.CustomerRegisterRequest);
                if (customerServiceResponse.result is not OkObjectResult)
                {
                    return new BadRequestObjectResult("Failed to add customer.");
                }
                var customerId = customerServiceResponse.customerId;
                customerIdForRollback = customerId;
                var insuranceId = request.InsuranceId;
                request.HealthInformationDto.CustomerId = customerId;
                var healthInformationServiceResponse = await _healthInformationService.AddHealthInformationAsync(request.HealthInformationDto);
                if (healthInformationServiceResponse is not OkObjectResult)
                {
                    flagRollback = true;
                    return new BadRequestObjectResult("Failed to add health information.");
                }
                var insurance = await _dbContext.Insurances.FirstOrDefaultAsync(i => i.InsuranceId == request.InsuranceId);
                if (insurance is null)
                {
                    flagRollback = true;

                    return new BadRequestObjectResult("Insurance not found.");
                }

                var insuranceContractDto = new InsuranceContractDto(customerId, insuranceId);
                var insuranceContractServiceResponse = await _insuranceContractService.AddInsuranceContractAsync(insuranceContractDto);
                if (insuranceContractServiceResponse is not OkObjectResult)
                {
                    flagRollback = true;
                    return new BadRequestObjectResult("Failed to add insurance contract.");
                }
                var response = new { customerId = customerId, insuranceId = insuranceId, message = $"The insurance contract has been successfully created, for the customer: {customerId} , the insurance id the customer has registered is: {insuranceId}" };
                return (new OkObjectResult(response));


            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message)
                {
                    StatusCode = 500 // Internal Server Error
                };
            }
            finally
            {
                if (flagRollback)
                {
                    await _customerService.DeleteCustomerForceAsync(customerIdForRollback);
                }
            }
        }
    }
}
