import React, { useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../HomePage/Header.jsx';
import Footer from '../HomePage/Footer.jsx';

const UserProfile = () => {
    
    const UserInfo = () => {
        

        // thực hiện các hành động khác với id, token, role ở đây
        //console.log('User Info:', { id, token, role });
    }

    const navigate = useNavigate();

    const editt = () => {
        navigate('/edit')
    }

    const myHealthInfo = () => {
        navigate('/my-health')
    }
    //này để lúc bấm vào avatar là nó tự chạy cái hàm UserInfo
    useEffect(() => {
        UserInfo();
    }, []);

    //Nap du lieu tu backend
    const userAccountId = localStorage.getItem('userAccountId');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    
    const [userData, setUserData] = useState('');
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from localStorage
                const response = await axios.get(`https://localhost:7267/api/User/get-user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                    }
                });
                if (response.status === 200) {
                    setUserData(response.data);
                    console.log(response.data);
                } else {
                    console.error("Error fetching user data");
                }
            } catch (error) {
                console.error("Error during API request:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <section className="bg-gray-100bg-opacity-50 h-auto">
            <Header />
            <div className="mx-auto container md:w-3/4 shadow-md mt-5 overflow-hidden shadow rounded-lg border mb-10">

                <div className="px-4 py-5 sm:px-6 w-full inline-flex">
                    <h3 className="md:w-3/4 text-lg leading-6 font-medium text-gray-900 pt-2">
                        Thông tin người dùng
                    </h3>
                    <div className="md:w-2/4 text-right">
                        <button className="bg-primary-500 hover:bg-sky-600 text-white py-2 px-4 rounded mx-1" onClick={myHealthInfo}>
                            Thông tin sức khỏe
                        </button>
                        <button className="bg-primary-500 hover:bg-sky-600 text-white py-2 px-4 rounded mx-1" onClick={editt}>
                            Chỉnh sửa
                        </button>
                    </div>

                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Họ và tên
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {userData.name}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Giới tính
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {userData.gender === 0 ? 'Nam' : 'Nữ'}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Ngày sinh
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {userData.dateOfBirth}
                            </dd>
                        </div>
                        
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Email
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                 {userData.email}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Số điện thoại
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {userData.phoneNumber}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                CCCD/CMND
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {userData.identityDocumentId}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Địa chỉ
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {userData.address}
                            </dd>
                        </div>
                    </dl>
                </div>

            </div>

            {/* <div className="mx-auto container md:w-3/4 shadow-md mt-5 overflow-hidden shadow rounded-lg border mb-10">

                <div className="px-4 py-5 sm:px-6 w-full inline-flex">
                    <h3 className="md:w-3/4 text-lg leading-6 font-medium text-gray-900 pt-2">
                        Tinh trang suc khoe
                    </h3>
                    <div className="md:w-1/4" align="right">
                        <button class="bg-slate-400 hover:bg-slate-500 text-white py-2 px-4 rounded" onClick={editt}>
                            Chỉnh sửa
                        </button>
                    </div>

                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Height
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                1m70    
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Weight
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                60kg
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Blood group
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                A
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Phone number
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                (123) 456-7890
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                123 Main St<br/>
                                Anytown, USA 12345
                            </dd>
                        </div>
                    </dl>
                </div>

            </div> */}

            {/* <div className="mx-auto container md:w-3/4 shadow-md mt-5 overflow-hidden shadow rounded-lg border mb-10">

                <div className="px-4 py-5 sm:px-6 w-full inline-flex">
                    <h3 className="md:w-3/4 text-lg leading-6 font-medium text-gray-900 pt-2">
                        Danh sách gói bảo hiểm
                    </h3>
                     <div className="md:w-1/4" align="right">
                        <button class="bg-slate-400 hover:bg-slate-500 text-white py-2 px-4 rounded" onClick={editt}>

                        </button>
                    </div>
                </div>

                <table className="w-full select-none">
                    <thead>
                        <tr className="bg-gray-400 border-2">
                            <th className="p-2">Tên gói bảo hiểm</th>
                            <th className="p-2">Ngày đăng kí</th>
                            <th className="p-2">Ngày hết hạn</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr className="border hover:bg-slate-100">
                            <td className="p-3 text-center ">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                            <td className="p-3 text-center">1/1/1970</td>
                            <td className="p-3 text-center">1/1/2024</td>
                        </tr>
                        <tr className="border hover:bg-slate-100">
                            <td className="p-3 text-center">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                            <td className="p-3 text-center">1/1/1970</td>
                            <td className="p-3 text-center">1/1/2024</td>
                        </tr>
                        <tr className="border hover:bg-slate-100">
                            <td className="p-3 text-center">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                            <td className="p-3 text-center">1/1/1970</td>
                            <td className="p-3 text-center">1/1/2024</td>
                        </tr>
                    </tbody>
                </table>
            </div> */}
            
            <Footer />
        </section>
    )
}

export default UserProfile;