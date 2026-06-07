namespace Core
{
    public class CustomerCareDepartment : User
    {
        public CustomerCareDepartment() : base()
        {

        }

        public CustomerCareDepartment(string email, int userAccountId, UserAccount userAccount) : base(email, userAccountId, userAccount)
        {

        }
    }
}
