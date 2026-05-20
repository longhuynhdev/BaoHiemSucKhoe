using ISD_Project.Server.Models.DTOs;
using ISD_Project.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ISD_Project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthInformationController : ControllerBase
    {
        private readonly IHealthInformationService _healthInformation;
        public HealthInformationController(IHealthInformationService healthInformationService)
        {
            this._healthInformation = healthInformationService;
        }

        [HttpPost("add-health-information")]
        public async Task<IActionResult> AddHealthInformation(HealthInformationDto request)
        {
            return await _healthInformation.AddHealthInformationAsync(request);
        }

        [HttpGet("get-health-information/{userId}")]
        public async Task<IActionResult> GetHealthInformation(int userId)
        {
            return await _healthInformation.GetHealthInformationAsync(userId);
        }

    }
}
