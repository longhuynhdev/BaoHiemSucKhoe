import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import Header from "../HomePage/Header";
import Footer from "../HomePage/Footer";

const WaitApproval = () => {
    const application_List = Array.from({ length: 4 }, (_, index) => index + 1);
    const [, forceUpdate] = useState();
    const [openRefuse, setOpenRefuse] = useState(false);
    const [openAccept, setOpenAccept] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [reason, setReason] = useState('');
    const [applicationID, setApplicationID] = useState('');
    const [selectedItem, setSelectedItem] = useState(''); // Add state to store selected item

    //test
    const [bh, setBh] = useState("");
    const [cccd, setCccd] = useState("");
    const [day_start, setDayStart] = useState("");
    const [day_end, setDayEnd] = useState("");
    const [fullname, setFullname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [job, setJob] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");
    const [street, setStreet] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [smoking, setSmoking] = useState(""); //hút thuốc
    const [smoking_frequency, setSmokingFrequency] = useState(""); //tần suất hút thuốc
    const [alcohol, setAlcohol] = useState(""); //rượu bia
    const [alcohol_frequency, setAlcoholFrequency] = useState(""); //tần suất rượu bia
    const [sport, setSport] = useState(""); //thể thao 
    const [sport_detail, setSportDetail] = useState("");
    const [cancer, setCancer] = useState(""); //ung thư :v
    const [dengue, setDengue] = useState(""); //sốt xuất huyết :V
    const [drug, setDrug] = useState(""); //ma túy :V
    const [congenital_disease, setCongenitalDisease] = useState(""); //bệnh bẩm sinh
    const [congenital_disease_detail, setCongenitalDiseaseDetail] = useState("");
    const [weight_loss, setWeightLoss] = useState(""); //sụt cân


    //TODO: refactor
    //code bẩn
    const[insuranceId, setInsuranceId] = useState("");
    const[customerId, setCustomerId] = useState("");

    /*const weight_loss_detail = "";*/


    //mở modal từ chối 
    const handleOpenRefuse = (item) => {
        setOpenRefuse(true);
        setSelectedItem(item);
        setApplicationID(item.id);
    }

    const handleCloseRefuse = () => {
        setOpenRefuse(false);
        setApplicationID('');
    }
 
    const handleSendReason = () => {
        console.log("Đơn đăng ký: ", applicationID,
                    "Lý do: ", reason);
        setOpenRefuse(false);
        setApplicationID('');
        if (selectedItem) 
        {   
            const validationDepartmentId = parseInt(localStorage.getItem('userId'));
            const data = {
                customerId : customerId,
                insuranceId : insuranceId, 
                validationDepartmentId : validationDepartmentId,
                profileStatus : 2, 
                approvalDate : new Date().toISOString().split('T')[0],
                approvalComment : reason
            }
            console.log(data);
            axios.post('https://localhost:7267/api/ApprovalStatus/add-approval-status', data)
            .then(response => {
                // Xử lý dữ liệu trả về khi gọi API thành công
                console.log(response.data);
                alert("Từ chối thành công!");
            })
            .catch(error => {
                console.error('Error during API call:', error);
            });
        }
        
        //window.location.reload();
    }

    useEffect(() => {
        setReason('');
    }, []);


    // mở modal thông báo duyệt đơn
    const handleSendAccept = (item) => {
        setOpenAccept(true);
        const validationDepartmentId = parseInt(localStorage.getItem('userId'));
        const data = {
            customerId : item.customerDto.id,
            insuranceId : item.insuranceDto.insuranceId, 
            validationDepartmentId : validationDepartmentId,
            profileStatus : 1, 
            approvalDate : new Date().toISOString().split('T')[0],
            approvalComment : ''
        }
        axios.post('https://localhost:7267/api/ApprovalStatus/add-approval-status', data)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error during API call:', error);
        })
    }

    const handleCloseAccept = () => {
        setOpenAccept(false);
        setApplicationID('');
        window.location.reload();
    }

    const convertBooleanToString = (value) => {
        if (value === true) return 'Có';
        else if (value === false) return 'Không';
    }


    // mở modal xem chi tiết đơn đăng kí
    const handleOpenDetail = (item) => {
        setOpenDetail(true);
        console.log(item);  
        setApplicationID(item.id);
        axios.get(`https://localhost:7267/api/HealthInformation/get-health-information/${item.customerDto.id}`)
        .then(response => {
            const data = response.data;
            console.log(data);
            setCccd(item.customerDto.identityDocumentId); // 1. Căn cước công dân
            setDayStart(item.customerDto.dateIssued);// 2. Ngày cấp
            setDayEnd(item.customerDto.validUntil); // 3. Ngày hết hạn
            setFullname(item.customerDto.name); // 4. Họ tên
            setBirthday(item.customerDto.dateOfBirth); // Ngày sinh  
            //Address
            const address = item.customerDto.address; // 5. Địa chỉ
            const parts = address.split(', ');
            const street = parts[0];
            const ward = parts[1].replace('phường ', '');
            const district = parts[2].replace('quận ', '');
            const city = parts[3];
            setStreet(street);
            setWard(ward);
            setDistrict(district);
            setCity(city);
            setGender(item.customerDto.gender === 0 ? 'Nam' : 'Nữ'); // 6. Giới tính
            setPhoneNumber(item.customerDto.phoneNumber); // 7. Số điện thoại
            setEmail(item.customerDto.email); // 8. Email
            setCountry(item.customerDto.nationality); // 9. Quốc tịch
            setJob(item.customerDto.job); // 10. Nghề nghiệp
            setHeight(data.height); // 11. Chiều cao
            setWeight(data.weight); // 12. Cân nặng
            setSmoking(convertBooleanToString(data.smoking)); // 13. Hút thuốc
            setSmokingFrequency(data.cigarettesPerDay); // 14. Tần suất hút thuốc
            setAlcohol(convertBooleanToString(data.alcoholConsumption)); // 15. Uống rượu bia
            setAlcoholFrequency(data.daysPerWeekAlcohol); // 16. Tần suất uống rượu bia
            setSport(convertBooleanToString(data.engagesInDangerousSports)); // 17. Thể thao nguy hiểm
            setSportDetail(data.dangerousSportsDetails); // 18. Chi tiết thể thao nguy hiểm
            setDrug(convertBooleanToString(data.drugUse)); // 19. Sử dụng ma túy
            setWeightLoss(convertBooleanToString(data.unexplainedWeightLoss)); // 20. Sụt cân
            setDengue(convertBooleanToString(data.experiencedDiseasesInLast5Years)); // 21. Sốt xuất huyết
            setCongenitalDisease(convertBooleanToString(data.hasSpecificHealthConditions)); // 22. Bệnh bẩm sinh
            setCongenitalDiseaseDetail(data.experiencedDiseasesDetails); // 23. Chi tiết bệnh bẩm sinh
            setCancer(convertBooleanToString(data.diagnosedWithHealthConditions)); // 24. Ung thư
            setBh(item.insuranceDto.insuranceName); // 25. Bảo hiểm đã chọn
            
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    const handleCloseDetail = () => {
        setOpenDetail(false);
        setApplicationID('');
    }

    const handleAcceptDetail = () => {
        setOpenDetail(false);
        setApplicationID('');
    }
    
    const [applicationList, setApplicationList] = useState([]);
    useEffect(() => {
        axios.get('https://localhost:7267/api/InsuranceContract/pending-contracts')
            .then(response => {
                setCustomerId(response.data[0].customerDto.id)
                setInsuranceId(response.data[0].insuranceDto.insuranceId)
                setApplicationList(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);


    return (
        <React.Fragment>
            <Header />
            <div className="h-auto my-12 max-w-screen-xl mx-auto">
                <section className="block pb-40">
                    <div className="bg-bgColor pt-[3rem] pb-[4rem] text-center">
                        <div className="container px-[17px]">
                            <h1 className= "text-3xl leading-[3rem] mt-[1rem] lg:text-4xl lg:leading-[3.5rem] font-bold">
                                Danh sách đơn đăng ký bảo hiểm
                            </h1>
                        </div>
                    </div>
                </section>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6 mt-[-12rem]">
                    {applicationList.map((item,index) => (
                        <div key={index} className="bg-white border border-gray-250 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative">
                            <span className="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4 ">
                                Đăng ký bảo hiểm
                            </span>
                            <div className="flex flex-col my-3 space-y-2">
                                <h1 className="py-1 text-gray-900 poppins text-base">Họ tên: {item.customerDto.name}</h1>
                                <h1 className="py-1 text-gray-900 poppins text-base">Email: {item.customerDto.email}</h1>
                                <h1 className="py-1 text-gray-900 poppins text-base">Giới tính: {item.customerDto.gender === 0 ? 'Nam' : 'Nữ'}</h1>
                                <h1 className="py-1 text-gray-900 poppins text-base">Số điện thoại: {item.customerDto.phoneNumber}</h1>
                                <h1 className="py-1 text-gray-900 poppins text-base">CCCD: {item.customerDto.identityDocumentId}</h1>
                                <h1 className="py-1 text-gray-900 poppins text-base">Địa chỉ: {item.customerDto.address}</h1>
                                <div className="w-11/12 border-b-2"></div>
                                <p className="py-3 text-red-500 poppins text-base text-center font-bold">{item.insuranceDto.insuranceName}</p>
                                <div className="w-11/12 border-b-2"></div>
                                <div className="flex justify-between">
                                    <button type="button"
                                        className="w-28 focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-3 my-2"
                                        onClick={() => handleSendAccept(item)}
                                    >
                                        Duyệt đơn
                                    </button>
                                    <button type="button"
                                        className="w-28 focus:outline-none text-white bg-buttonProduct hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-3 my-2"
                                        onClick={() => handleOpenRefuse(item)}
                                    >
                                        Từ chối
                                    </button>
                                </div>
                                <button type="button"
                                    className="focus:outline-none text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-20 py-3 mb-2"
                                    onClick={() => handleOpenDetail(item)}
                                >
                                    Xem thông tin
                                </button>
                                
                            </div>   
                        </div>  
                    ))}
                </section>
                {openRefuse && (
                    <div>
                        <div className= "fixed top-0 left-0 w-full h-full bg-overLay opacity-70 z-[200]"></div>
                        <div id="authentication-modal" tabIndex="-1" aria-hidden="true"
                            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[300] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div className="relative p-4 w-full max-w-md max-h-full">
                                <div className="relative bg-white rounded-lg shadow">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            Từ chối đơn đăng ký
                                            <span className = "text-red-600 mx-2 font-bold">#{applicationID }</span>
                                        </h3>
                                        <button type="button"
                                            className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                            data-modal-hide="authentication-modal"
                                            onClick={ handleCloseRefuse }
                                        >
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className="p-4 md:p-5">
                                        <form className="space-y-6" action="#">
                                            <div>
                                                <label htmlFor="message" className="block mb-4 text-sm font-medium text-gray-900">
                                                    Lý do từ chối
                                                </label>
                                                <textarea id="message" rows="4"
                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Leave a comment..."
                                                    
                                                    onChange={(e) => setReason(e.target.value)}
                                                    required>
                                                </textarea>
                                            </div>
                                            
                                            <button type="submit"
                                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                                onClick={ handleSendReason }
                                            >
                                                Xác nhận
                                            
                                            </button>
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {openAccept && (
                    <div>
                        <div className= "fixed top-0 left-0 w-full h-full bg-overLay opacity-70 z-[200]"></div>
                        <div id="successModal" tabIndex="-1" aria-hidden="true"
                            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[300] justify-center items-center w-full md:inset-0 h-modal md:h-full">
                            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                                <div className="relative p-4 text-center bg-white border-2 border-slate-400 rounded-lg shadow sm:p-5">

                                    <div className="w-12 h-12 rounded-full bg-green-200 p-2 flex items-center justify-center mx-auto mb-3.5">
                                        <svg aria-hidden="true" className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Success</span>
                                    </div>
                                    
                                    <p className="mb-4 text-lg font-semibold text-gray-900"> Đã duyệt đơn
                                        <span className="text-red-600 mx-2 font-bold">#{applicationID}</span>
                                        !</p>
                                    <button data-modal-toggle="successModal"
                                        type="button"
                                        className="w-32 py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300"
                                        onClick={handleCloseAccept}
                                    >
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {openDetail && (
                    <div>
                        <div className="fixed top-0 left-0 w-full h-full bg-overLay opacity-70 z-[200]"></div>
                        <div id="authentication-modal" tabIndex="-1" aria-hidden="true"
                            className="flex fixed top-0 right-0 left-0 z-[300] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div className="relative p-4 w-full max-w-3xl max-h-full">
                                <div className="relative bg-white rounded-lg shadow">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            Chi tiết đơn đăng ký
                                            <span className="text-red-600 mx-2 font-bold">#{applicationID}</span>
                                        </h3>
                                        <button type="button"
                                            className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                            data-modal-hide="authentication-modal"
                                            onClick={handleCloseDetail}
                                        >
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className="p-4 md:p-5 max-h-[550px] overflow-y-auto">
                                        <div className="flex flex-wrap justify-between border-box">
                                            <div className="w-[48%] flex flex-row justify-between z-0 pt-6 px-4 mb-5 group">
                                                <div className="w-[48%] mr-2">
                                                    <div className="inline-flex flex-col relative w-full">
                                                        <input type="text" name="product" id="product"
                                                            className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                            value={ bh }
                                                            disabled
                                                        />
                                                        <label htmlFor="product"
                                                            className="peer-focus:font-medium absolute text-base text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                            Bảo hiểm đã chọn:
                                                        </label>
                                                    </div>
                                                </div>
                                                {/*Số CMND/CCCD*/}
                                                <div className="w-[48%]">
                                                    <div className="inline-flex flex-col relative w-full">
                                                        <input type="text" name="CCCD" id="CCCD"
                                                            className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                            value={cccd}
                                                            disabled
                                                        />
                                                        <label htmlFor="CCCD"
                                                            className="peer-focus:font-medium absolute text-base text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                            Số CMND/CCCD: 
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*Ngày cấp cccd*/}
                                            <div className="w-[48%] flex flex-row justify-between z-0 pt-6 px-4 mb-5 group">
                                                <div className="w-[48%] mr-2">
                                                    <div className="inline-flex flex-col relative w-full">
                                                        <input type="text" name="product" id="product"
                                                            className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                            value={day_start}
                                                            disabled
                                                        />
                                                        <label htmlFor="product"
                                                            className="peer-focus:font-medium absolute text-base text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                            Ngày cấp:
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="w-[48%]">
                                                    <div className="inline-flex flex-col relative w-full">
                                                        <input type="text" name="CCCD" id="CCCD"
                                                            className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                            value={day_end}
                                                            disabled
                                                        />
                                                        <label htmlFor="CCCD"
                                                            className="peer-focus:font-medium absolute text-base text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                            Có giá trị đến:
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*Họ tên*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={fullname}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Họ tên:
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="w-[48%] flex flex-row justify-between z-0 pt-6 px-4 mb-5 group">
                                                {/*Ngày sinh*/}
                                                <div className="w-[48%] mr-2">
                                                    <div className="inline-flex flex-col relative w-full">
                                                        <input type="text" name="product" id="product"
                                                            className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                            value={birthday}
                                                            disabled
                                                        />
                                                        <label htmlFor="product"
                                                            className="peer-focus:font-medium absolute text-base text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                            Ngày sinh:
                                                        </label>
                                                    </div>
                                                </div>
                                                {/*Giới tính*/}
                                                <div className="w-[48%]">
                                                    <div className="inline-flex flex-col relative w-full">
                                                        <input type="text" name="CCCD" id="CCCD"
                                                            className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                            value={gender}
                                                            disabled
                                                        />
                                                        <label htmlFor="CCCD"
                                                            className="peer-focus:font-medium absolute text-base text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                            Giới tính:
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*Số điện thoại*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={phoneNumber}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Số điện thoại:
                                                    </label>
                                                </div>
                                            </div>
                                            {/*Email*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={email}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Email:
                                                    </label>
                                                </div>
                                            </div>
                                            {/*Quốc tịch*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={country}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Quốc tịch:
                                                    </label>
                                                </div>
                                            </div>
                                            {/*Nghề nghiệp*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={job}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Nghề nghiệp:
                                                    </label>
                                                </div>
                                            </div>
                                            {/*Thành phố / Tỉnh*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={city}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Thành phố / Tỉnh:
                                                    </label>
                                                </div>
                                            </div>
                                            {/* Quận / Huyện */}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={district}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Quận / Huyện:
                                                    </label>
                                                </div>
                                            </div>
                                            {/*Phường / Xã*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={ward}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Phường / Xã:
                                                    </label>
                                                </div>
                                            </div>
                                            {/*Đường / Ấp*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={street}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Đường / Ấp:
                                                    </label>
                                                </div>
                                            </div>
                                            {/*Chiều cao*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={height}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Chiều cao (cm):
                                                    </label>
                                                </div>
                                            </div>
                                            {/*Cân nặng*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={weight}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Cân nặng (kg):
                                                    </label>
                                                </div>
                                            </div>
                                            {/*hút thuốc*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={smoking}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Hút thuốc:
                                                    </label>
                                                </div>
                                            </div>
                                            {/*tần suất hút thuốc*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    {smoking_frequency === '' ? (
                                                        <input type="text" name="name" id="name"
                                                            className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                            placeholder=" "
                                                            value={'Không rõ'}
                                                            disabled />
                                                    ) : (
                                                        <input type="text" name="name" id="name"
                                                            className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                            placeholder=" "
                                                            value={smoking_frequency}
                                                            disabled />
                                                    )}
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Số điếu / Ngày:
                                                    </label>
                                                </div>
                                            </div>
                                            {/*rượu bia*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={alcohol}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Rượu / Bia:
                                                    </label>
                                                </div>
                                            </div>
                                            {/*tần suất dùng rượu bia*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    {alcohol_frequency === '' ? (
                                                        <input type="text" name="name" id="name"
                                                            className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                            placeholder=" "
                                                            value={'Không rõ'}
                                                            disabled />
                                                    ) : (
                                                        <input type="text" name="name" id="name"
                                                            className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                            placeholder=" "
                                                            value={alcohol_frequency}
                                                            disabled />
                                                    )}
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Ngày / Tuần:
                                                    </label>
                                                </div>
                                            </div>
                                            {/*ma túy*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={drug}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Ma túy / Chất gây nghiện:
                                                    </label>
                                                </div>
                                            </div>
                                            {/*ung thư*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={cancer}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Ung thư / HIV:
                                                    </label>
                                                </div>
                                            </div>
                                            {/*thể thao mạo hiểm*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={sport}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Tham gia thể thao mạo hiểm:
                                                    </label>
                                                </div>
                                            </div>
                                            {/*thể thao mạo hiểm đang tham gia*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    {sport_detail === '' ? (
                                                        <input type="text" name="name" id="name"
                                                            className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                            placeholder=" "
                                                            value={'Không có'}
                                                            disabled />
                                                    ) : (
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={sport_detail}
                                                        disabled />
                                                    )}
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Môn thể thao mạo hiểm cụ thể:
                                                    </label>
                                                </div>
                                            </div>
                                            {/*sốt xuất huyết*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={dengue}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Sốt xuất huyết (5 năm qua):
                                                    </label>
                                                </div>
                                            </div>
                                            {/*sụt cân*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={weight_loss}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Sụt cân không rõ nguyên nhân:
                                                    </label>
                                                </div>
                                            </div>
                                            {/*bệnh bẩm sinh*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    <input type="text" name="name" id="name"
                                                        className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={congenital_disease}
                                                        disabled />
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Bệnh / Tật bẩm sinh:
                                                    </label>
                                                </div>
                                            </div>
                                            {/*cụ thể bệnh bẩm sinh*/}
                                            <div className="w-[48%] z-0 pt-6 px-4 mb-5 group">
                                                <div className="inline-flex flex-col relative w-full">
                                                    {congenital_disease_detail === '' ? (
                                                        <input type="text" name="name" id="name"
                                                            className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                            placeholder=" "
                                                            value={'Không có'}
                                                            disabled />
                                                    ) : (
                                                        <input type="text" name="name" id="name"
                                                            className="block my-2 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                            placeholder=" "
                                                            value={congenital_disease_detail}
                                                            disabled />
                                                    )}
                                                    <label htmlFor="name"
                                                        className="peer-focus:font-medium absolute text-lg text-blue-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                        Bênh / Tật bẩm sinh cụ thể:
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div
                                        className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4">
                                        <button
                                            type="button"
                                            className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                            data-te-modal-dismiss
                                            data-te-ripple-init
                                            data-te-ripple-color="light"
                                            onClick={handleCloseDetail}>
                                            Đóng
                                        </button>
                                        <button
                                            type="button"
                                            className="bg-blue-500 ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                                            data-te-ripple-init
                                            data-te-ripple-color="light"
                                            onClick={ handleAcceptDetail }
                                        >
                                            Duyệt
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                )}
                
            </div>
            <Footer />
        </React.Fragment>
    )

}

export default WaitApproval