using Core.Enums;

namespace Core.DTOs
{
    public class CustomerValidateRequest
    {
        public int CustomerId { get; set; }
        public ProfileStatus ProfileStatus { get; set; }
    }
}
