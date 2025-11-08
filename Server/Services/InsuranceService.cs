using AutoMapper;
using ISD_Project.Server.DataAccess;
using ISD_Project.Server.Models;
using ISD_Project.Server.Models.DTOs;
using ISD_Project.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ISD_Project.Server.Services
{
    public class InsuranceService : IInsuranceService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        public InsuranceService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<IActionResult> GetInsuranceByTypesAsync(int insuranceTypeId)
        {
            try
            {
                var listInsurances = await _dbContext.Insurances
                .Where(i => i.InsuranceTypeId == insuranceTypeId)
                .ToListAsync();
                if (listInsurances == null)
                {
                    return new BadRequestObjectResult("Insurance Type does not exist");
                }

                var listInsuranceDto = _mapper.Map<List<Insurance>, List<InsuranceDto>>(listInsurances);
                return new OkObjectResult(listInsuranceDto);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message)
                {
                    StatusCode = 500 // Internal Server Error
                };
            }
        }

        public async Task<IActionResult> GetInsuranceTypesAsync()
        {
            try
            {
                var insuranceType = await _dbContext.InsuranceTypes.ToListAsync();
                if (insuranceType == null)
                {
                    return new NotFoundResult();
                }
                var listInsuranceDto = _mapper.Map<List<InsuranceType>>(insuranceType);
                return new OkObjectResult(listInsuranceDto);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message)
                {
                    StatusCode = 500 // Internal Server Error
                };
            }
        }

        public async Task<IActionResult> GetInsuranceDetailAsync(int id)
        {
            try
            {
                var listInsurances = await _dbContext.Insurances.FirstOrDefaultAsync(u => u.InsuranceId == id);
                if (listInsurances == null)
                {
                    return new NotFoundResult();
                }
                // var listInsuranceDto = _mapper.Map<List<Insurance>, List<InsuranceDto>>(listInsurances);
                return new OkObjectResult(listInsurances);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message)
                {
                    StatusCode = 500
                };
            }
        }

        public async Task<IActionResult> GetInsurancesAsync()
        {
            try
            {
                var listInsurances = await _dbContext.Insurances.ToListAsync();
                if (listInsurances == null)
                {
                    return new BadRequestObjectResult("Insurance does not exist");
                }

                var listInsuranceDto = _mapper.Map<List<Insurance>, List<InsuranceDto>>(listInsurances);
                return new OkObjectResult(listInsuranceDto);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message)
                {
                    StatusCode = 500
                };
            }
        }
    }
}
