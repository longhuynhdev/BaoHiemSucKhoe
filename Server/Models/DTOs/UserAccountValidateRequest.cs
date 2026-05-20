namespace ISD_Project.Server.Models.DTOs
{
    public class UserAccountValidateRequest
    {
        public int UserAccountId { get; set; }
        public AccountStatus AccountStatus { get; set; }    
    }
}
