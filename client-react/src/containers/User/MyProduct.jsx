
import React, { useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Header from '../HomePage/Header.jsx';
import Footer from '../HomePage/Footer.jsx';


const MyProduct = () => {
    const [insuranceData, setInsuranceData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7267/api/Insurance/get-insurance/1`);
                if (response.status === 200) {
                    setInsuranceData(response.data);
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
    <>
        <Header />
        <section className="h-auto my-12 max-w-screen-xl mx-auto px-6">
            <div className="inline-flex w-full">
                <h1 className="w-3/4 text-2xl font-bold inline-block"> 
                    Các gói bảo hiểm của bạn 
                </h1>
                <div className="w-1/4 text-right">
                    <NavLink to="/me">
                        
                        <h5 className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded inline-block" >
                            Trở về
                        </h5>
                    </NavLink>
                </div>
            </div>


            <hr className="my-2 h-[1.5px] bg-gray-400 " />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-12">
                {insuranceData.map(item => (
                    <div 
                        key={item.insuranceId} 
                        className="text-bold bg-white border border-gray-250 transition transform duration-700 hover:shadow-xl hover:scale-105 px-5 py-2 rounded-lg relative">
                        
                        <div className="my-3 space-y-2">
                            <div className="inline-flex w-full">
                                <h1 className="font-bold py-1 text-gray-900 poppins text-lg inline-block">{item.insuranceName}</h1>
                                
                                    

                                
                                
                            </div>
                            <div className= "w-11/12 border-b-2"></div>
                            <div className='bg-slate-200 p-1 px-3 inline-block rounded-2xl '>

                                {/* Option trạng thái gói bảo hiểm */}
                                {/* <div className="flex flex-row justify-center items-center">
                                    <div className="rounded-2xl bg-red-100 p-[1px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="19" height="19" viewBox="0 0 48 48">
                                            <path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"></path>
                                            <path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"></path>
                                        </svg>
                                    </div>
                                    
                                        <p className="pl-2 text-red-600">
                                            Đã hết hạn
                                        </p>
                                    
                                </div> */}

                                <div className="flex flex-row justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                                        <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z" />
                                        <path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z" />
                                    </svg>
                                    <p className="pl-2 text-green-600">
                                        Đã thanh toán
                                    </p>
                                    
                                </div>
                            </div>

                            <div className="flex flex-row space-x-[100px]">
                                <p>Ngày đăng ký: <br /> <b> 1/1/2002 </b></p>
                                <p>Ngày hết hạn: <br /> <b> 1/1/2002 </b></p>
                            </div>
                            
                            <div className="space-y-4 pt-4">
                                <p> Nhân viên phụ trách: <b> Nguyễn Văn A </b></p>
                                <p> Trường thông tin:  <b> Thông tin </b></p>
                            </div>

                            <p className="py-3 text-gray-500 poppins text-sm text-center">{item.summaryDescription}</p>
                            
                            <div className="grid grid-cols-2 item-center" >
                                <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mx-1" >
                                    Thanh toán
                                </button>
                                <button className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded mx-1" >
                                    gì đó
                                </button>
                            </div>

                            
                        </div>
                    </div>
                ))}
            </div>
        </section>
        <Footer />
    </>
  );
};

export default MyProduct;
