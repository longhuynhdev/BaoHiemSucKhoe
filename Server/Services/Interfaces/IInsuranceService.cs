using ISD_Project.Server.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace ISD_Project.Server.Services.Interfaces
{
    public interface IInsuranceService
    {
        Task<IActionResult> GetInsurancesAsync();
        Task<IActionResult> GetInsuranceTypesAsync();
        Task<IActionResult> GetInsuranceByTypesAsync(int insuranceTypeId);
        Task<IActionResult> GetInsuranceDetailAsync(int id);
    }
}
