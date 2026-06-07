using Core.DTOs;
using Core.Enums;
using Microsoft.AspNetCore.Mvc;

namespace BaoHiemSucKhoe.Server.Services.Interfaces;

public interface IApprovalStatusService
{
    Task<IActionResult> GetApprovalStatusAsync();
    Task<IActionResult> GetApprovalStatusAsync(ProfileStatus profileStatus);
    Task<IActionResult> AddApprovalStatusAsync(ApprovalStatusDto approvalStatusDto);
    Task<IActionResult> GetInsuranceContractsPendingApproval();
}
