import React, { useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../HomePage/Header.jsx';
import Footer from '../HomePage/Footer.jsx';

const MyHealth = () => {
    
    const UserInfo = () => {
        

        // thực hiện các hành động khác với id, token, role ở đây
        //console.log('User Info:', { id, token, role });
    }

    const navigate = useNavigate();

    const mee = () => {
        navigate('/me')
    }

    const myHealthInfo = () => {
        navigate('/my-product')
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
                const response = await axios.get(`https://localhost:7267/api/HealthInformation/get-health-information/${userId}`);
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

                <div className="px-4 py-5 px-6 w-full inline-flex">
                    <h3 className="md:w-3/4 text-lg leading-6 font-medium text-gray-900 pt-2">
                        Tình trạng sức khỏe
                    </h3>
                    
                    <div className="md:w-2/4 text-right">
                        <button className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded mx-1" onClick={mee}>
                            Trở về
                        </button>
                    </div>

                </div>
                <div className="border-t border-gray-200 px-4 py-5 p-0">
                    <dl className="divide-y divide-gray-200">
                        <div className="py-3 py-5 grid grid-cols-6 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Cân nặng
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 mt-0 col-span-2">
                                {userData.Height}
                            </dd>
                        
                            <dt className="text-sm font-medium text-gray-500">
                                Chiều cao
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 mt-0 col-span-2">
                                {userData.Weight}
                            </dd>
                        </div>
                        <div className="py-3 py-5 grid grid-cols-3 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Hút thuốc
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 mt-0 col-span-2">
                                {/* data here */}
                            </dd>
                        </div>
                        <div className="py-3 py-5 grid grid-cols-3 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Rượu bia
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 mt-0 col-span-2">
                                {/* data here */}
                            </dd>
                        </div>
                        <div className="py-3 py-5 grid grid-cols-3 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Chất kích thích
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 mt-0 col-span-2">
                                 {userData.email}
                            </dd>
                        </div>
                        <div className="py-3 py-5 grid grid-cols-3 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Các môn thể thao nguy hiểm
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 mt-0 col-span-2">
                                {userData.phoneNumber}
                            </dd>
                        </div>
                        <div className="py-3 py-5 grid grid-cols-3 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Bệnh tim mạch
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 mt-0 col-span-2">
                                {/* data here */}
                            </dd>
                        </div>
                        <div className="py-3 py-5 grid grid-cols-3 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Disease
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 mt-0 col-span-2">
                                {/* data here */}
                            </dd>
                        </div>
                        <div className="py-3 py-5 grid grid-cols-3 gap-4 px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Bệnh bẩm sinh
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 mt-0 col-span-2">
                                {/* data here */}
                            </dd>
                        </div>
                    </dl>
                </div>

            </div>

            
            
            <Footer />
        </section>
    )
}

export default MyHealth;