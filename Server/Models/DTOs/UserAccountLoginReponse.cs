namespace ISD_Project.Server.Models.DTOs
{
    public class UserAccountLoginResponse
    {
        public int UserAccountId { get; set; }
        public string? Token { get; set; } = String.Empty;
        public string Role { get; set; } = String.Empty;
        public int IsActivated { get; set; }
        public int UserId { get; set; }
    }
}
