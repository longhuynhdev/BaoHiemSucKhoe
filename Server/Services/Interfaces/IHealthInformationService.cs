using ISD_Project.Server.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace ISD_Project.Server.Services.Interfaces
{
    public interface IHealthInformationService
    {
        public Task<IActionResult> AddHealthInformationAsync(HealthInformationDto request);
        public Task<IActionResult> GetHealthInformationAsync(int userId);
    }
}
