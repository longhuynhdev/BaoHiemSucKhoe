using Core;
using Core.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace BaoHiemSucKhoe.Server.Services.Interfaces
{
    public interface IValidationService
    {
        Task CreateAndAssignUserAccountForCustomerAsync(Customer customer);
        Task<IActionResult> ValidateUserAccountAsync(UserAccountValidateRequest request);
        Task<IActionResult> ValidateInsuranceContractAsync(InsuranceContractRegisterRequest request);

    }
}
