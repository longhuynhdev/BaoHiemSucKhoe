import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import Header from "../HomePage/Header";
import Footer from "../HomePage/Footer";

import Circle from '../../assets/circle.png';
import axios from 'axios';

const ProductDetail = () => {

    const location = useLocation();
    const item = location.pathname.split('/').pop();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); //Thêm loading state in  component. This loading state will initially be set to true and will be set to false once the data has been fetched from the API
    const array = Array.from({ length: 5 }, (_, index) => index + 1); //test

    const [insuranceData, setInsuranceData] = useState([]);

    const pathSegments = window.location.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];

    console.log( insuranceData[0]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://localhost:7267/api/Insurance/get-insurance-detail/${id}`);
                if (response.status === 200) {
                    const newData = Array.isArray(response.data) ? response.data : [response.data];
                    setInsuranceData(newData);
                } else {
                    console.error("Error fetching user data");
                    // Check if error response status is 404
                    if (response.status === 404) {
                        navigate('/404');
                    }
                    
                }
                setLoading(false);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    navigate('/404');
                } else {
                    console.error("Error during API request:", error);
                }
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
    }

    const handleForm = () => {
        // Truy cập thông tin sản phẩm (item) tại đây và thực hiện công việc cần thiết
        console.log('Item in ProductDetail:', item);

        navigate(`/san-pham-bao-hiem/${item}/dang-ky-bao-hiem`);
    };

    return (
        <React.Fragment>
            <Header />
            <section className= "h-auto px-6 py-2 rounded-xl mx-auto max-w-screen-xl bg-white border-2 border-gray-150 my-6">
            {insuranceData.map(type => (
                <div key={type.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                    <div className= "flex flex-col justify-center">
                        <img className="w-11/12 h-3/4 mx-auto rounded-xl"
                            src="https://www.prudential.com.vn/export/sites/prudential-vn/vi/.thu-vien/hinh-anh/san-pham-bao-hiem-bo-tro/sp-bao-hiem-tai-nan-danh-cho-tre-em-hero-766x432.jpg"
                            alt="" />
                    </div>
                    <div className="flex flex-col mt-7">
                        <p className= "text-xl font-bold md:leading-[30px]">
                            {type.insuranceName} 
                        </p>
                        <div className= "flex items-center mt-[8px] md:mt-[4px]">
                            <span className="text-xl font-bold text-textPrice md:leading-[30px]">
                                {type.priceAmount} VND
                            </span>
                        </div>
                    </div>
                </div>
           ))}
            </section>
          
            <div className="h-auto mx-auto max-w-screen-xl">
                <p className="text-lg font-bold text-[#1C1D1F]">Chính sách bảo hiểm</p>
                <section className="h-auto px-6 py-2 rounded-xl bg-white border-2 border-gray-150 my-6">
                
                    <div  className="flex flex-wrap flex-row justify-between box-border">
                        
                            <div className="md:border-1 md:rounded-none md:border-b md:border-solid md:border-[#EBEDF0]">
                                <div className="flex justify-start items-start flex-row px-5 py-5 cursor-pointer">
                                    <div className="text-center ml-1">
                                        <div className="mb-3 mt-1 w-[30px] h-[30px]">
                                            <span className= "border-box inline-block overflow-hidden">
                                                <img className="border-box"
                                                    src={Circle }
                                                        alt="" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-left ml-5 mb-3">
                                        <p className="font-bold sm:text-lg text-[#1C1D1F]">Quyền lợi bảo hiểm Tử vong</p>
                                        <p className="text-[#1C1D1F] font-normal sm:text-[15px] mt-1">
                                            Chi trả tối đa 01 lần.
                                            <br />
                                            Hợp đồng chấm dứt hiệu lực khi Người được bảo hiểm tử vong.
                                        </p>
                                        <p className="font-bold text-[#ED1B2D] sm:text-lg mt-1">500.000 đ</p>
                                    </div>
                                </div>
                            </div>

                        
                        
                    </div>
                </section>
            </div>
            

            <div className="h-auto mx-auto max-w-screen-xl">
                <p className="text-lg font-bold text-[#1C1D1F]">Điều kiện tham gia</p>
                <section className="h-auto px-6 py-2 rounded-xl bg-white border-2 border-gray-150 my-6">
                    <div className="md:overflow-visible text-[15px] leading-[40px] text-justify">
                        <ul className= "list-disc pl-6 leading-8">
                            <li className = "my-3">
                                Khách hàng có độ tuổi:
                                <span className="text-[#ED1B2D] font-bold ml-2">Từ 18 - 45 tuổi
                                </span>
                            </li>
                            <li className="my-3"> Thời hạn hợp đồng: 01 năm </li>
                            <li className="my-3"> Gia hạn hợp đồng: Hàng năm, tối đa 9 lần hoặc cho đến hết ngày liền trước Ngày kỷ niệm năm hợp đồng ngay sau khi Người được bảo hiểm đạt 50 tuổi, tùy điều kiện nào đến trước.</li>
                            <li className="my-3"> Tuổi tối đa khi kết thúc hợp đồng: 50 tuổi.</li>
                            <li className="my-3"> Thời hạn đóng phí: Bằng thời hạn hợp đồng.</li>
                            <li className="my-3"> Người được bảo hiểm chưa từng được chẩn đoán bệnh ung thư, ung thư biểu mô tại chỗ, u, bướu, nhân, khối, cục, nốt, nang nốt hoặc mảng (vú), bệnh tim mạch, bệnh huyết học, bệnh gan, bệnh mạch máu, tiểu đường, thiếu máu não thoáng qua hoặc đột quỵ, cao huyết áp hoặc tăng sinh hạch bạch huyết.</li>
                            <li className="my-3">Trong vòng 5 năm vừa qua, Người được bảo hiểm chưa từng được chẩn đoán hoặc bị nhiễm HIV/AIDS  hoặc đã từng có bất kỳ tình trạng y khoa nào liên quan não, huyết học, tim mạch, phổi, gan, thận, hệ thần kinh, hệ tiêu hóa, hệ niệu sinh dục, hệ cơ xương khớp mà được yêu cầu theo dõi, điều trị.</li>
                            <li className="my-3"> Trong vòng 12 tháng vừa qua, Người được bảo hiểm chưa mắc bất kỳ triệu chứng hoặc các vấn đề sức khỏe mà được yêu cầu theo dõi hoặc vẫn chưa đi khám hoặc đã nhập viện điều trị liên tục trên 3 ngày hoặc có khám điều trị thuốc liên tục trong 7 ngày</li>
                            <li className="my-3"> Ngoài ra, Người được bảo hiểm cần thuộc Nhóm nghề nghiệp 01, 02 và 03 theo quy định của Prudential và thỏa các điều kiện khác theo đúng quy trình Thẩm định nội bộ của Prudential tại từng thời điểm.</li>
                        </ul>
                    </div>
                </section>
            </div>

            <div className= "flex justify-center my-8">
                <button type="button"
                    className="focus:outline-none text-white bg-buttonProduct hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-3xl text-sm px-20 py-3 mb-2"
                    onClick={ handleForm }
                >
                    Đăng ký bảo hiểm này
                </button>
            </div>
       
            <Footer />
        </React.Fragment>
    )
}

export default ProductDetail