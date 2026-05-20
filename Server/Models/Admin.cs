namespace ISD_Project.Server.Models
{
    public class Admin : User
    {
        public Admin() : base()
        {

        }

        public Admin(string email, int userAccountId, UserAccount userAccount) : base(email, userAccountId, userAccount)
        {

        }
    }
}
