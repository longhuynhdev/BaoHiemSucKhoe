using ISD_Project.Server.Models;
using ISD_Project.Server.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace ISD_Project.Server.Services.Interfaces;

public interface IApprovalStatusService
{
    Task<IActionResult> GetApprovalStatusAsync();
    Task<IActionResult> GetApprovalStatusAsync(ProfileStatus profileStatus);
    Task<IActionResult> AddApprovalStatusAsync(ApprovalStatusDto approvalStatusDto);
    Task<IActionResult> GetInsuranceContractsPendingApproval();
}
