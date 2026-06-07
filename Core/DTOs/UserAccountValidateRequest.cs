using Core.Enums;

namespace Core.DTOs
{
    public class UserAccountValidateRequest
    {
        public int UserAccountId { get; set; }
        public AccountStatus AccountStatus { get; set; }    
    }
}
