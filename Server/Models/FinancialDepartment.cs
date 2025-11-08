namespace ISD_Project.Server.Models
{
    public class FinancialDepartment : User
    {
        public FinancialDepartment() : base()
        {

        }

       public FinancialDepartment(string email, int userAccountId, UserAccount userAccount) : base(email, userAccountId, userAccount)
        {

        }
    }
}
