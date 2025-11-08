import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from "../HomePage/Header";
import Footer from "../HomePage/Footer";

const ApprovalHistory = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]); // State for additional data

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://localhost:7267/api/ApprovalStatus/get-approval-status/2');
            setData(response.data);
            const response1 = await axios.get('https://localhost:7267/api/ApprovalStatus/get-approval-status/1');
            setData1(response1.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
       
        fetchData();
      }, []); 
    
    return (
        <div>
            <Header />

            <section className="mx-auto w-4/5  h-auto my-10">
               
                <div>
                    <h3 className="md:w-3/4 text-2xl my-5 leading-6 font-medium pt-2 text-green-600">
                        Đơn đã duyệt
                    </h3>
                    <table className="w-full select-none">
                        <thead>
                            <tr className="bg-gray-400 border-2">
                                <th className="p-2">Tên khách hàng</th>
                                <th className="p-2">Email khách hàng</th>
                                <th className="p-2">Bảo hiểm đăng ký</th>
                                <th className="p-2">Ngày đăng ký</th>
                                <th className="p-2">Người duyệt</th>
                            </tr>
                        </thead>
                        <tbody >
                        {data1.map((item,index) => (
                            <tr key={index} className="border hover:bg-slate-100">
                                <td className="p-3 text-center">{item.customerName}</td>
                                <td className="p-3 text-center">{item.customerEmail}</td>
                                <td className="p-3 text-center">{item.insuranceName}</td>
                                <td className="p-3 text-center">{item.approvalDate}</td>
                                <td className="p-3 text-center font-bold">{item.validationDepartmentName}</td>
                            </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

                <div>
                    <h3 className="md:w-3/4 text-2xl my-5 leading-6 pt-2 font-bold text-red-600">
                        Đơn từ chối duyệt
                    </h3>
                    <table className="w-full select-none">
                        <thead>
                            <tr className="bg-gray-400 border-2">
                                <th className="p-2">Tên khách hàng</th>
                                <th className="p-2">Email khách hàng</th>
                                <th className="p-2">Bảo hiểm đăng ký</th>
                                <th className="p-2">Ngày đăng ký</th>
                                <th className="p-2">Người duyệt</th>
                                <th className="p-2">Lý do từ chối</th>
                            </tr>
                        </thead>
                        <tbody >
                        {data.map((item,index) => (
                            <tr key={index} className="border hover:bg-slate-100">
                                <td className="p-3 text-center">{item.customerName}</td>
                                <td className="p-3 text-center">{item.customerEmail}</td>
                                <td className="p-3 text-center">{item.insuranceName}</td>
                                <td className="p-3 text-center">{item.approvalDate}</td>
                                <td className="p-3 text-center font-bold">{item.validationDepartmentName}</td>
                                <td className="p-3 text-center text-red-500">{item.approvalComment}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default ApprovalHistory