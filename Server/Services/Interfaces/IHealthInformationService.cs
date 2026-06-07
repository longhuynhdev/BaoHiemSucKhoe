using Core.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace BaoHiemSucKhoe.Server.Services.Interfaces
{
    public interface IHealthInformationService
    {
        public Task<IActionResult> AddHealthInformationAsync(HealthInformationDto request);
        public Task<IActionResult> GetHealthInformationAsync(int userId);
    }
}
