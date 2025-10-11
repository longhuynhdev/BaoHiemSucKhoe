import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import bhsk from "../../assets/bhsk.jpg";
import axios from "axios";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const [selectedId, setSelectedId] = useState(1);

  const handleMenuTabs = (id) => {
    setSelectedId(id);
  };

  //item thay bằng mã sản phẩm bảo hiểm
  const handleDetail = (item) => {
    console.log(item);
    navigate(`/san-pham-bao-hiem/${item}`);
  };

  const [insuranceData, setInsuranceData] = useState([]);
  const [insuranceType, setInsuranceType] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7267/api/Insurance/get-insurance-type`
        );
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
        const response = await axios.get(
          `https://localhost:7267/api/Insurance/get-insurance/${selectedId}`
        );
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

  return (
    <div className="bg-slate-100">
      <Header />
      <section className="font-[Raleway]">
        <div className="w-full h-650 mb-10 grid grid-cols-2">
          <div className="m-auto bg-white p-5 rounded shadow-xl shadow-slate-300 max-w-full">
            <div className="flex item-center justify-center">
              <h1 className="text-3xl font-bold">Bảo hiểm sức khỏe PGR2</h1>
            </div>

            <p className="w-[500px]">
              <br />
              Sức khỏe là tài sản quý giá nhất, chúng tôi không chỉ bảo vệ nó,
              mà còn đồng hành trong mọi chặng đường của bạn - Vì cuộc sống
              không đợi chờ
            </p>

            <div className="flex item-center justify-center">
              <div className="py-2 px-4 bg-red-500 inline-block text-white mt-10 rounded hover:bg-red-600 cursor-pointer">
                Xem thêm
              </div>
            </div>
          </div>
          <img
            src={bhsk}
            className="m-auto w-3/4 rounded shadow-2xl shadow-slate-300"
          />
        </div>

        <hr className="my-2 h-[1.5px] bg-gray-400 w-1/2 m-auto" />

        <h1 className="flex items-center justify-center w-full h-full text-5xl py-10">
          Các sản phẩm nổi bật
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {insuranceData.map((item) => (
            <div
              key={item.insuranceId}
              className="bg-white border border-gray-250 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative"
            >
              <img
                className="w-64 mx-auto transform transition duration-300 hover:scale-105"
                src="https://www.prudential.com.vn/export/sites/prudential-vn/vi/.thu-vien/hinh-anh/san-pham-bao-hiem-nhan-tho/ke-hoach-bao-ve/sp-phu-bao-an-thumb-366x206.jpg"
                alt=""
              />

              <div className="flex flex-col items-center my-3 space-y-2">
                <h1 className="py-3 text-gray-900 poppins text-lg">
                  {item.insuranceName}
                </h1>
                <div className="w-11/12 border-b-2"></div>
                <p className="py-3 text-gray-500 poppins text-sm text-center">
                  {item.summaryDescription}
                </p>
                <button
                  type="button"
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
    </div>
  );
};

export default HomePage;
