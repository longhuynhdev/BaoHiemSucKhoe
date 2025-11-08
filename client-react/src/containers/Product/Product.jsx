import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../HomePage/Header";
import Footer from "../HomePage/Footer";
import axios from 'axios';

const Product = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    const [selectedId, setSelectedId] = useState(1);
      
    const handleMenuTabs = (id) => {
          setSelectedId(id);
    };

    //item thay bằng mã sản phẩm bảo hiểm
    const handleDetail = (item) => { 
        console.log(item);
        navigate(`/san-pham-bao-hiem/${item}`);
    }

    const [insuranceData, setInsuranceData] = useState([]);
    const [insuranceType, setInsuranceType] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7267/api/Insurance/get-insurance-type`);
                if (response.status === 200) {
                    
                    setInsuranceType(response.data);
                    
                } else {
                    console.error("Error fetching user data");
                }
            } catch (error) {
                console.error("Error during API request:", error);
            }
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7267/api/Insurance/get-insurance/${selectedId}`);
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
    }, [selectedId]);

    //console.log("ID", selectedId);
   
    return (
        <React.Fragment>
            <Header />
            <section className="h-auto my-12 max-w-screen-xl mx-auto px-6">
                <div  className="flex items-center justify-center space-x-6">
                    {insuranceType.map(type  => (
                        <p key={type.id} className={selectedId === (type.id) ? "active_menu_tab poppins bg-gray-500" : "menu_tab poppins"}
                            onClick={() => handleMenuTabs(type.id)}>
                            {type.name}
                        </p>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-12">
                    {insuranceData.map(item => (
                        <div key={item.insuranceId} className="bg-white border border-gray-250 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative">
                            {/* <span className="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4 ">
                                Loại bảo hiểm
                            </span> */}

                            <img className="w-64 mx-auto transform transition duration-300 hover:scale-105" src="https://www.prudential.com.vn/export/sites/prudential-vn/vi/.thu-vien/hinh-anh/san-pham-bao-hiem-nhan-tho/ke-hoach-bao-ve/sp-phu-bao-an-thumb-366x206.jpg" alt="" />
                            
                            <div className="flex flex-col items-center my-3 space-y-2">
                            <h1 className="py-3 text-gray-900 poppins text-lg">{item.insuranceName}</h1>
                                <div className= "w-11/12 border-b-2"></div>
                                <p className="py-3 text-gray-500 poppins text-sm text-center">{item.summaryDescription}</p>
                                <button type="button"
                                    className="focus:outline-none text-white bg-buttonProduct hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-20 py-3 mb-2"
                                    onClick={() => handleDetail(item.insuranceId)}
                                >
                                    Tìm hiểu thêm
                                </button>
                                
                            </div>
                    </div>
                    ))}
                </div>
            </section>
            <Footer />
        </React.Fragment>
    )
}

export default Product