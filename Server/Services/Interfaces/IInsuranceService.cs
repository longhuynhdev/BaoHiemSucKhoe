using Microsoft.AspNetCore.Mvc;

namespace BaoHiemSucKhoe.Server.Services.Interfaces
{
    public interface IInsuranceService
    {
        Task<IActionResult> GetInsurancesAsync();
        Task<IActionResult> GetInsuranceTypesAsync();
        Task<IActionResult> GetInsuranceByTypesAsync(int insuranceTypeId);
        Task<IActionResult> GetInsuranceDetailAsync(int id);
    }
}
