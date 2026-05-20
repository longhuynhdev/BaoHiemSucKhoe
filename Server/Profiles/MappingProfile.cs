using AutoMapper;
using ISD_Project.Server.Models;
using ISD_Project.Server.Models.DTOs;

namespace ISD_Project.Server.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //CreateMap<Source, Destination>();
            //Using AutoMapper library to map between Model and DTO and vice versa
            //Model -> DTO
            CreateMap<User, UserDto>();
            CreateMap<Customer, CustomerDto>();
            CreateMap<Customer, CustomerRegisterRequest>();
            CreateMap<ValidationDepartment, UserDto>();
            CreateMap<CustomerCareDepartment, UserDto>();
            CreateMap<FinancialDepartment, UserDto>();
            CreateMap<Admin, UserDto>();
            CreateMap<HealthInformation, HealthInformationDto>();
            CreateMap<Insurance, InsuranceDto>();
            CreateMap<UserAccount, UserAccountDto>();
            CreateMap<ApprovalStatus, ApprovalStatusDto>();
            CreateMap<InsuranceContract, InsuranceContractDto>();
            //DTO -> Model
            CreateMap<UserDto, User>();
            CreateMap<CustomerDto, Customer>();
            CreateMap<CustomerRegisterRequest, Customer>();
            CreateMap<UserDto, ValidationDepartment>();
            CreateMap<UserDto, CustomerCareDepartment>();
            CreateMap<UserDto, FinancialDepartment>();
            CreateMap<UserDto, Admin>();
            CreateMap<HealthInformationDto, HealthInformation>();
            CreateMap<InsuranceDto, Insurance>();
            CreateMap<UserAccountDto, UserAccount>();
            CreateMap<ApprovalStatusDto, ApprovalStatus>();
            CreateMap<InsuranceContractDto, InsuranceContract>();
        }
    }
}
