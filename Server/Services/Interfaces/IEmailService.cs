namespace ISD_Project.Server.Services.Interfaces;

public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string body);

}
