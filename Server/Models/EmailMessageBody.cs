namespace ISD_Project.Server.Models;

public class EmailMessageBody
{
    //TODO: Tạo các EmailMessageBody cho các trường hợp cần thiết
    // Hồ sơ Customer được duyệt -> Email có button gọi API để kích hoạt UserAccount

    public static string ProfileApproved(string userName, string passWord, string urlAPI)
    {
        string body = @$"
        <div style=""font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"">
            <h2 style=""color: #3498db;"">Hồ sơ đăng ký bảo hiểm của bạn đã được duyệt - Your insurance registration has been approved</h2>
            <p>Thông tin tài khoản của bạn - Your account information</p>
            <ul>
                <li>Username: {userName}</li>
                <li>Password: {passWord}</li>
            </ul>
            <div style=""text-align: center; margin-top: 20px;"">
                <a href=""{urlAPI}"" style=""text-decoration: none;"">
                    <button style=""background-color: #3498db; color: #ffffff; padding: 10px; border: none; cursor: pointer; display: inline-block;"">
                        Click vào đây để kích hoạt tài khoản - Click here to activate your account
                    </button>
                </a>
            </div>
        </div>
    ";
        return body;
    }



    // Hồ sơ Customer bị từ chối -> Email thông báo cho Customer với lý do từ chối
    // Hoá đơn đến hạn -> Email thông báo cho Customer về việc thanh toán
    // Hoá đơn quá hạn -> Email thông báo cho Customer về việc thanh toán

}
