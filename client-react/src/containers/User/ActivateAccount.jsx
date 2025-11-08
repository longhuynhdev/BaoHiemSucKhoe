//TODO: Hiện pop-up kích hoạt tài khoản thành công
//TODO: Chuyển hướng về trang chủ sau khi kích hoạt tài khoản thành công

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ActivateAccount = () => {
  const { userAccountId } = useParams();
  const [activationResult, setActivationResult] = useState(null);

  useEffect(() => {
    // Gọi API khi component được mount
    activateAccount(userAccountId);
  }, [userAccountId]);

  const activateAccount = async (accountId) => {
    try {
      // Gọi API của bạn với accountId
      const response = await fetch(`https://localhost:7267/api/Validate/validate-user-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAccountId: accountId,
          accountStatus: 1,
        }),
      });

      // Kiểm tra kết quả từ API và cập nhật state
      if (response.ok) {        
        setActivationResult('Tài khoản đã được kích hoạt thành công.');
      } else {
        setActivationResult('Không thể kích hoạt tài khoản.');
      }
    } catch (error) {
      console.error('Lỗi khi gọi API kích hoạt tài khoản', error);
      setActivationResult('Đã xảy ra lỗi khi kích hoạt tài khoản.');
    }
  };

  return (
    <div>
      <h2>Trang Kích Hoạt Tài Khoản</h2>
      <p>{activationResult}</p>
    </div>
  );
};

export default ActivateAccount;
