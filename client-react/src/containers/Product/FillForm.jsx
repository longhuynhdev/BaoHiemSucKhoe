import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from "../HomePage/Header";
import Footer from "../HomePage/Footer";

const FillForm = () => {
    const location = useLocation();
    const item = location.pathname.split('/')[2];
    const [flag, setFlag] = useState();
    const [success, setSuccess] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const navigate = useNavigate();
    
    //biến thông tin lỗi
    const [errorMessage, setErrorMessage] = useState('');
    //biến thông tin cá nhân
    const [cccd, setCccd] = useState('');
    const [day_start, setDayStart] = useState('');
    const [day_end, setDayEnd] = useState('');
    const [fullname, setFullName] = useState('');
    const [birthday, setBirthDay] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [job, setJob] = useState('');

    useEffect(() => {
        setGender('Nam');
    }, []);


    //biến thông tin địa chỉ
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [street, setStreet] = useState('');


    //biến khai báo sức khỏe
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [smoking, setSmoking] = useState('');
    const [smoking_frequency, setSmokingFrequency] = useState('');
    const [alcohol, setAlcohol] = useState('');
    const [alcohol_frequency, setAlcoholFrequency] = useState('');
    const [sport, setSport] = useState('');
    const [sport_detail, setSportDetail] = useState('');
    const [cancer, setCancer] = useState('');
    const [dengue, setDengue] = useState('');
    const [drug, setDrug] = useState('');
    const [congenital_disease, setCongenitalDisease] = useState('');
    const [congenital_disease_detail, setCongenitalDiseaseDetail] = useState('');
    const [weight_loss, setWeightLoss] = useState('');
    const [weight_loss_detail, setWeightLossDetail] = useState('');
    


    //object thông tin cá nhân
    const information = {
        "Bảo hiểm": item,
        "CCCD": cccd,
        "Ngày cấp": day_start,
        "Có giá trị đến": day_end,
        "Họ tên": fullname,
        "Ngày sinh": birthday,
        "Giới tính": gender,
        "Số điện thoại": phoneNumber,
        "Email": email,
        "Quốc tịch": country,
        "Nghề nghiệp": job,
    };


    //object thông tin địa chỉ
    const address = {
        "Thành phố / Tỉnh": city,
        "Quận / Huyện": district,
        "Phường / Xã": ward,
        "Đường / Ấp": street,
    };


    //object khai báo sức khỏe
    const healthDeclare = {
        "Chiều cao": height,
        "Cân nặng": weight,
        "Hút thuốc": smoking,
        "Tần suất hút thuốc": smoking_frequency,
        "Rượu bia": alcohol,
        "Tần suất rượu bia": alcohol_frequency,
        "Ma túy": drug,
        "Thể thao nguy hiểm": sport,
        "Chi tiết môn thể thao": sport_detail,
        "Ung thư": cancer,
        "Sốt xuất huyết": dengue,
        "Bệnh bẩm sinh": congenital_disease,
        "Chi tiết bệnh bẩm sinh": congenital_disease_detail,
        "Sụt cân": weight_loss,
        "Chi tiết sụt cân": weight_loss_detail,
    };

    const [errorCCCD, setErrorCCCD] = useState('');
    const [errorDate, setErrorDate] = useState('');
    const [errorFullName, setErrorFullname] = useState('');
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorCountry, setErrorCountry] = useState('');
    const [errorJob, setErrorJob] = useState('');
    const [errorHeight, setErrorHeight] = useState('');
    const [errorWeight, setErrorWeight] = useState('');
    const [errorAlcoholFrequency, setErrorAlcoholFrequency] = useState('');
    const [errorSmokingFrequency, setErrorSmokingFrequency] = useState('');
    const [errorSportDetail, setErrorSportDetail] = useState('');
    const [errorCongenitalDisease, setErrorCongenitalDisease] = useState('');
    const [errorWeightLoss, setErrorWeightLoss] = useState('');

    const handleSmokingChange = (value) => {
        setSmoking(value);
        // Nếu giá trị là 'No', đặt giá trị smoking_frequency về rỗng
        if (value === 'No') {
            setSmokingFrequency('');
        }
    };

    const handleAlcoholChange = (value) => {
        setAlcohol(value);
        if (value === 'No') {
            setAlcoholFrequency('');
        }
    };

    const handleSportChange = (value) => {
        setSport(value);
        if (value === 'No') {
            setSportDetail('');
        }
    };

    const handleCongenitalDiseaseChange = (value) => {
        setCongenitalDisease(value);
        if (value === 'No') {
            setCongenitalDiseaseDetail('');
        }
    };

    const handleWeightLossChange = (value) => {
        setWeightLoss(value);
        if (value === 'No') {
            setWeightLossDetail('');
        }
    };

    // Hàm chuyển đổi dữ liệu để match với backend
    const convertGenderToInt = (genderString) => {
        if (genderString === 'Nam') return 0;
        else if (genderString === 'Nữ') return 1;
    }

    const convertPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace('0', '+84');
    }

    const convertToBoolean = (value) => {
        if (value === 'Yes') return true;
        else if (value === 'No') return false;
    }

    const handleSendForm = async () => {
        try {
            const genderInt = convertGenderToInt(gender);
            const formattedPhoneNumber = convertPhoneNumber(phoneNumber);
            // InsuranceId
            const insuranceId = item;

            // Customer information
            const customerInfo = {
                identityDocumentId: cccd,
                dateIssued: day_start,
                validUntil: day_end,
                email: email,
                name: fullname,
                gender: genderInt,
                dateOfBirth: birthday,
                address: street + ", " + ward + ", " + district + ", " + city,
                phoneNumber: formattedPhoneNumber,
                nationality: country,
                job: job
            };
            // Health information
            const healthInfo = {
                height: Number(height),
                weight: Number(weight),
                smoking: convertToBoolean(smoking),
                cigarettesPerDay: Number(smoking_frequency),
                alcoholConsumption: convertToBoolean(alcohol),
                daysPerWeekAlcohol: Number(alcohol_frequency),
                drugUse: convertToBoolean(drug),
                engagesInDangerousSports: convertToBoolean(sport),
                dangerousSportsDetails: sport_detail,
                diagnosedWithHealthConditions: convertToBoolean(cancer),
                hasSpecificHealthConditions: convertToBoolean(congenital_disease),
                experiencedDiseasesInLast5Years: convertToBoolean(dengue),
                experiencedDiseasesDetails: congenital_disease_detail,
                unexplainedWeightLoss: convertToBoolean(weight_loss),
                unexplainedWeightLossDetails: weight_loss_detail,
            };

            // Gửi POST API request để tạo InsuranceContract
            const requestData = {
                insuranceId: insuranceId,
                customerRegisterRequest: customerInfo,
                healthInformationDto: healthInfo
            };
            console.log('Request:', requestData);
            const apiUrl = 'https://localhost:7267/api/Validate/validate-insurance-contract';
            const response = await axios.post(apiUrl, requestData);
            console.log('Response:', response.data);
            if(response.status === 200) {
                //TODO: Hiện thông báo thành công
                alert('Đã gửi đơn đăng ký bảo hiểm của bạn. Xin hãy đợi kết quả duyệt hồ sơ của chúng tôi');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // TODO: Nếu có lỗi, hiên thông báo lỗi
                alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
                setErrorMessage(error.response.data);
                console.error('Axios error:', error.response );
            } 
        }
    };

    const handleSubmit = () => {
        setFlag(1);
        setErrorCCCD('');
        setErrorDate('');
        setErrorFullname('');
        setErrorPhoneNumber('');
        setErrorEmail('');
        setErrorCountry('');
        setErrorJob('');
        setErrorHeight('');
        setErrorWeight('');
        setErrorSmokingFrequency('');
        setErrorAlcoholFrequency('');
        // Kiểm tra nếu độ dài là 9 hoặc 12 và toàn bộ là số
        if ((cccd.length === 9 || cccd.length === 12) && /^\d+$/.test(cccd)) {
            // Điều kiện thỏa mãn, thực hiện các hành động cần thiết ở đây
            setErrorCCCD('');
            //console.log('Đã nhập đúng định dạng CCCD');
        } else {
            // Hiển thị thông báo lỗi và không thực hiện hành động
            setErrorCCCD('Định dạng không đúng. Vui lòng nhập 9 hoặc 12 ký tự số.');
            setFlag(0);
        }
        if (day_end > day_start) {
            setErrorDate('');
            //console.log('Đã nhập đúng định dạng ngày cấp và ngày hết hạn CCCD');
        } else {
            setErrorDate('Ngày "Có giá trị đến" phải lớn hơn ngày "Ngày cấp".');
            setFlag(0);
        }
        // Kiểm tra nếu tên chỉ chứa kí tự chữ
        if (/^[a-zA-ZÀ-ỹ\s]+$/.test(fullname)) {
            setErrorFullname('');
            //console.log('Đã nhập đúng định dạng họ tên');
        } else {
            setErrorFullname('Tên chỉ được chứa kí tự chữ.');
            setFlag(0);
        }
        // kiểm tra sđt chỉ toàn số
        if (/^\d+$/.test(phoneNumber)) {
            // Điều kiện thỏa mãn, thực hiện các hành động cần thiết ở đây
            setErrorPhoneNumber('');
            //console.log('Đã nhập đúng định dạng SĐT');
        } else {
            // Hiển thị thông báo lỗi và không thực hiện hành động
            setErrorPhoneNumber('Định dạng không đúng. Vui lòng chỉ điền ký tự số.');
            setFlag(0);
        }
        // Kiểm tra xem địa chỉ email có chứa ký tự @ hay không
        if (email.includes('@')) {
            setErrorEmail('');
            //console.log('Đã nhập đúng định dạng email');
        } else {
            setErrorEmail('Vui lòng điền đúng định dạng email.');
            setFlag(0);
        }
        // Kiểm tra nếu quốc tịch chỉ chứa kí tự chữ
        if (/^[a-zA-ZÀ-ỹ\s]+$/.test(country)) {
            setErrorCountry('');
            //console.log('Đã nhập đúng định dạng quốc tịch');
        } else {
            setErrorCountry('Quốc tịch chỉ được chứa kí tự chữ.');
            setFlag(0);
        }
        // Kiểm tra nếu nghề nghiệp chỉ chứa kí tự chữ
        if (/^[a-zA-ZÀ-ỹ\s]+$/.test(job)) {
            setErrorJob('');
            //console.log('Đã nhập đúng định dạng nghề nghiệp');
        } else {
            setErrorJob('Nghề nghiệp chỉ được chứa kí tự chữ.');
            setFlag(0);
        }
        // Kiểm tra chiều cao toàn bộ là số
        if (/^\d+$/.test(height)) {
            // Điều kiện thỏa mãn, thực hiện các hành động cần thiết ở đây
            setErrorHeight('');
            //console.log('Đã nhập đúng định dạng chiều cao');
        } else {
            // Hiển thị thông báo lỗi và không thực hiện hành động
            setErrorHeight('Vui lòng nhập chiều cao chỉ toàn số.');
            setFlag(0);
        }
        if (/^\d+$/.test(weight)) {
            // Điều kiện thỏa mãn, thực hiện các hành động cần thiết ở đây
            setErrorWeight('');
            //console.log('Đã nhập đúng định dạng cân nặng');
        } else {
            // Hiển thị thông báo lỗi và không thực hiện hành động
            setErrorWeight('Vui lòng nhập cân nặng chỉ toàn số.');
            setFlag(0);
        }
        if (smoking === 'No') {
            setErrorSmokingFrequency('');
        }
        else if (smoking === 'Yes' && smoking_frequency === '') {
            setErrorSmokingFrequency('Hãy điền vào đây');
            setFlag(0);
        }
        else
        {
             if (/^\d+$/.test(smoking_frequency)) {
                setErrorSmokingFrequency('');
             } else {
                setErrorSmokingFrequency('Chỉ được nhập toàn số');
                setFlag(0);
             }
        }
        //kiểm tra điều kiện rượu / bia
        if (alcohol === 'No') {
            setErrorAlcoholFrequency('');
        }
        else if (alcohol === 'Yes' && alcohol_frequency === '') {
            setErrorAlcoholFrequency('Hãy điền vào đây');
            setFlag(0);
        }
        else { 
             if (/^\d+$/.test(alcohol_frequency) && alcohol_frequency > 0 && alcohol_frequency < 8) {
                setErrorAlcoholFrequency('');
             } else {
                setErrorAlcoholFrequency('Chỉ được nhập toàn số (Tối đa: 7)');
                setFlag(0);
             }
        }
        //kiểm tra điều kiện thể thao mạo hiểm
        if (sport === 'No') {
            setErrorSportDetail('');
        }
        else if (sport === 'Yes' && sport_detail === '') {
            setErrorSportDetail('Hãy điền vào đây');
            setFlag(0);
        }
        else {
            setErrorSportDetail('')
        }
        //kiểm tra điều kiện bệnh bẩm sinh
        if (congenital_disease === 'No') {
            setErrorCongenitalDisease('');
        }
        else if (congenital_disease === 'Yes' && congenital_disease_detail === '') {
            setErrorCongenitalDisease('Hãy điền vào đây');
            setFlag(0);
        }
        else {
            setErrorCongenitalDisease('');
        }
        //kiểm tra điều kiện sụt cân
        if (weight_loss === 'No') {
            setErrorWeightLoss('');
        }
        else if (weight_loss === 'Yes' && weight_loss_detail === '') {
            setErrorWeightLoss('Hãy điền vào đây');
            setFlag(0);
        }
        else {
            setErrorWeightLoss('');
        }
        // Kiểm tra nếu flag = 1 thì gửi form
        if (flag === 1) {
            handleSendForm();
        }

    };


    // useEffect(() => {
    //     if (flag === 1) {
    //         console.log("flag: ", flag);
    //         //handleSendForm();
    //         //setSuccess(true);
    //     }
    // }, [flag]);

    // useEffect(() => {
    //     if (flag === 0) {
    //         console.log("flag: ", flag);
            // setOpenToast(true);
    //     }
    // }, [flag]);


    useEffect(() => {
        // Kiểm tra thay đổi của success và thực hiện hành động nếu success là true
        if (success) {
            setOpenModal(true);
        }
    }, [success]);

    // mở modal thông báo gửi form thành công
    /*const handleOpenModal = () => {
        setOpenModal(true);
    }*/

    const handleCloseModal = () => {
        setOpenModal(false);
        //navigate('/san-pham-bao-hiem');
    }

    useEffect(() => {
        if (openToast) {
          const timeoutId = setTimeout(() => {
            setOpenToast(false);
          }, 4000);
          return () => clearTimeout(timeoutId);
        }
      }, [openToast]);


    return (
        <React.Fragment>
            <Header />
            <section className="h-auto px-6 py-2 rounded-xl mx-auto max-w-screen-xl bg-white border-2 border-gray-150 my-6">
                <div className="m-auto max-w-[725px] md:mb-0 sm:mt-3 sm:mb-3 md:px-[0px] xs:px-5 xs:mt-2 xs:mb-2 bg-white md:rounded-t-xl sm:rounded-t-xl xs:rounded-none py-[24px] leading-[28px]">
                    <p className="text-[#1C1D1F] text-[15px]">
                        Bên Mua Bảo Hiểm (đồng thời là Người được bảo hiểm)
                    </p>
                    <p className="text-[#F2A916] font-[15px]">
                        Lưu ý: Sản phẩm này chỉ dành cho Khách hàng có Quốc tịch Việt Nam và đang sinh sống tại Việt Nam.
                    </p>
                </div>
                <form className="mx-auto m-auto max-w-[790px] mt-5">

                    {/* Câu hỏi thông tin cá nhân */}
                    <p className="text-md font-bold text-[#1C1D1F] md:my-8 xs:my-4">Thông tin cá nhân</p>
                    <div className= "flex flex-wrap justify-between border-box">
                        <div className="w-[48%] flex flex-row justify-between z-0 pt-6 pl-8 mb-5 group">
                            <div className="w-[48%] mr-2">
                                <div className="inline-flex flex-col relative w-full">
                                    <input type="text" name="product" id="product"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        value={item}
                                        required
                                        disabled
                                    />
                                    <label htmlFor="product"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Bảo hiểm đã chọn
                                        <span className="text-require font-bold mt-[5px]"> *</span>
                                    </label>
                                </div>
                            </div>
                            <div className="w-[48%]">
                                <div className="inline-flex flex-col relative w-full">
                                    <input type="text" name="CCCD" id="CCCD"
                                        value={cccd}
                                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer 
                                        ${errorCCCD && 'border-red-500' // Thêm lớp CSS đỏ khi có lỗi
                                        }`}
                                        placeholder=" "
                                        onChange={(e) => setCccd(e.target.value)}
                                        required />
                                    <label htmlFor="CCCD"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Số CMND/CCCD
                                        <span className="text-require font-bold mt-[5px]"> *</span>
                                    </label>
                                    {errorCCCD && <div className="text-red-500 text-sm mt-1">{errorCCCD}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="w-[48%] flex flex-row justify-between z-0 pt-6 pl-8 mb-5 group">
                            <div className="w-[48%] mr-2">
                                <div className="inline-flex flex-col relative w-full">
                                    <input type="date" name="dayStart" id="dayStart"
                                        value={day_start}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        onChange={(e) => setDayStart(e.target.value)}
                                        required />
                                    <label htmlFor="dayStart"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Ngày cấp
                                        <span className="text-require font-bold mt-[5px]"> *</span>
                                    </label>
                                </div>
                            </div>
                            <div className="w-[48%]">
                                <div className="inline-flex flex-col relative w-full">
                                    <input type="date" name="dayEnd" id="dayEnd"
                                        value={day_end}
                                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer
                                        ${errorDate && 'border-red-500'
                                        }`}
                                        placeholder=" "
                                        onChange={(e) => setDayEnd(e.target.value)}
                                        required />
                                    <label htmlFor="dayEnd"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Có giá trị đến
                                        <span className="text-require font-bold mt-[5px]"> *</span>
                                    </label>
                                    {errorDate && <div className="text-red-500 text-sm mt-1">{errorDate}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="w-[48%] z-0 pt-6 pl-8 mb-5 group">
                            <div className="inline-flex flex-col relative w-full">
                                <input type="text" name="name" id="name"
                                    value={fullname}
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer
                                    ${errorFullName && 'border-red-500'
                                        }`}
                                    placeholder=" "
                                    onChange={(e) => setFullName(e.target.value)}
                                    required />
                                <label htmlFor="name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Họ tên
                                    <span className="text-require font-bold mt-[5px]"> *</span>
                                </label>
                                {errorFullName && <div className="text-red-500 text-sm mt-1">{errorFullName}</div>}
                            </div>
                        </div>
                        <div className="w-[48%] flex flex-row justify-between z-0 pt-6 pl-8 mb-5 group">
                            <div className="w-[48%] mr-2">
                                <div className="inline-flex flex-col relative w-full">
                                    <input type="date" name="birthDay" id="birthDay"
                                        value={birthday}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        onChange={(e) => setBirthDay(e.target.value)}
                                        required />
                                    <label htmlFor="birthDay"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Ngày sinh
                                        <span className="text-require font-bold mt-[5px]"> *</span>
                                    </label>
                                </div>
                            </div>
                            <div className="w-[48%]">
                                <div className="inline-flex flex-col relative w-full">
                                    <label htmlFor="gender"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Giới tính
                                        <span className="text-require font-bold mt-[5px]"> *</span>
                                    </label>
                                    <select id="gender"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        
                                    >
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="w-[48%] z-0 pt-6 pl-8 mb-5 group">
                            <div className="inline-flex flex-col relative w-full">
                                <input type="text" name="phone" id="phone"
                                    value={phoneNumber}
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer
                                    ${errorPhoneNumber && 'border-red-500'
                                        }`}
                                    placeholder=" "
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required />
                                <label htmlFor="phone"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Số điện thoại
                                    <span className="text-require font-bold mt-[5px]"> *</span>
                                </label>
                                {errorPhoneNumber && <div className="text-red-500 text-sm mt-1">{errorPhoneNumber}</div>}
                            </div>
                        </div>
                        <div className="w-[48%] z-0 pt-6 pl-8 mb-5 group">
                            <div className="inline-flex flex-col relative w-full">
                                <input type="email" name="email" id="email"
                                    value={email}
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer
                                    ${errorEmail && 'border-red-500'
                                        }`}
                                    placeholder=" "
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                                <label htmlFor="email"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Email
                                    <span className="text-require font-bold mt-[5px]"> *</span>
                                </label>
                                {errorEmail && <div className="text-red-500 text-sm mt-1">{errorEmail}</div>}
                            </div>
                        </div>
                        <div className="w-[48%] z-0 pt-6 pl-8 mb-5 group">
                            <div className="inline-flex flex-col relative w-full">
                                <input type="text" name="country" id="country"
                                    value={country}
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer
                                    ${errorCountry && 'border-red-500'
                                        }`}
                                    placeholder=" "
                                    onChange={(e) => setCountry(e.target.value)}
                                    required />
                                <label htmlFor="country"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Quốc tịch
                                    <span className="text-require font-bold mt-[5px]"> *</span>
                                </label>
                                {errorCountry && <div className="text-red-500 text-sm mt-1">{errorCountry}</div>}
                            </div>
                        </div>
                        <div className="w-[48%] z-0 pt-6 pl-8 mb-5 group">
                            <div className="inline-flex flex-col relative w-full">
                                <input type="text" name="job" id="job"
                                    value={job}
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer
                                    ${errorJob && 'border-red-500'
                                        }`}
                                    placeholder=" "
                                    onChange={(e) => setJob(e.target.value)}
                                    required />
                                <label htmlFor="job"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Nghề nghiệp
                                    <span className="text-require font-bold mt-[5px]"> *</span>
                                </label>
                                {errorJob && <div className="text-red-500 text-sm mt-1">{errorJob}</div>}
                            </div>
                        </div>
                    </div>

                    {/* Câu hỏi địa chỉ */}
                    <p className="text-md font-bold text-[#1C1D1F] md:my-8 xs:my-4">Địa chỉ</p>
                    <div className="flex flex-wrap justify-between border-box">
                        <div className="w-[48%] z-0 pt-6 pl-8 mb-5 group">
                            <div className="inline-flex flex-col relative w-full">
                                <input type="text" name="city" id="city"
                                    value={city}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    onChange={(e) => setCity(e.target.value)}
                                    required />
                                <label htmlFor="city"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Thành phố / Tỉnh
                                    <span className="text-require font-bold mt-[5px]"> *</span>
                                </label>
                            </div>
                        </div>
                        <div className="w-[48%] z-0 pt-6 pl-8 mb-5 group">
                            <div className="inline-flex flex-col relative w-full">
                                <input type="text" name="district" id="district"
                                    value={district}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    onChange={(e) => setDistrict(e.target.value)}
                                    required />
                                <label htmlFor="district"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Quận / Huyện
                                    <span className="text-require font-bold mt-[5px]"> *</span>
                                </label>
                            </div>
                        </div>
                        <div className="w-[48%] z-0 pt-6 pl-8 mb-5 group">
                            <div className="inline-flex flex-col relative w-full">
                                <input type="text" name="ward" id="ward"
                                    value={ward}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    onChange={(e) => setWard(e.target.value)}
                                    required />
                                <label htmlFor="ward"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Phường / Xã
                                    <span className="text-require font-bold mt-[5px]"> *</span>
                                </label>
                            </div>
                        </div>
                        <div className="w-[48%] z-0 pt-6 pl-8 mb-5 group">
                            <div className="inline-flex flex-col relative w-full">
                                <input type="text" name="street" id="street"
                                    value={street}
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    onChange={(e) => setStreet(e.target.value)}
                                    required />
                                <label htmlFor="street"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Đường / Ấp
                                    <span className="text-require font-bold mt-[5px]"> *</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Khai báo sức khỏe */}
                    <p className="text-md font-bold text-[#1C1D1F] md:my-8 xs:my-4">Khai báo sức khỏe</p>
                    <div className="flex flex-wrap justify-between border-box">
                        <div className="w-[48%] z-0 pt-6 pl-8 mb-5 group">
                            <div className="inline-flex flex-col relative w-full">
                                <input type="number" name="height" id="height"
                                    value={height}
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer
                                    ${errorHeight && 'border-red-500'
                                        }`}
                                    placeholder=" "
                                    onChange={(e) => setHeight(e.target.value)}
                                    required />
                                <label htmlFor="height"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Chiều cao (cm)
                                    <span className="text-require font-bold mt-[5px]"> *</span>
                                </label>
                                {errorHeight && <div className="text-red-500 text-sm mt-1">{errorHeight}</div>}
                            </div>
                        </div>
                        <div className="w-[48%] z-0 pt-6 pl-8 mb-5 group">
                            <div className="inline-flex flex-col relative w-full">
                                <input type="number" name="weight" id="weight"
                                    value={weight}
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer
                                    ${errorWeight && 'border-red-500'
                                        }`}
                                    placeholder=" "
                                    onChange={(e) => setWeight(e.target.value)}
                                    required />
                                <label htmlFor="weight"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Cân nặng (kg)
                                    <span className="text-require font-bold mt-[5px]"> *</span>
                                </label>
                                {errorWeight && <div className="text-red-500 text-sm mt-1">{errorWeight}</div>}
                            </div>
                        </div>
                     
                    </div>

                    {/* Câu hỏi hút thuốc */}
                    <p className="pt-6 pl-8 text-[#1C1D1F]">1. NĐBH có hút thuốc trong vòng 12 tháng gần đây không?</p>
                    <fieldset className= "flex flex-wrap justify-between">
                        <div className="flex items-center w-[48%] mb-4 pt-6 pl-8">
                            <input id="smoke-option-1" type="radio"
                                name="smoke"
                                value="Yes"
                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                checked={smoking === 'Yes'}
                                onChange={(e) => handleSmokingChange(e.target.value)}
                                required
                            />

                            <label htmlFor="smoke-option-1" className="block ms-2 text-sm font-medium text-gray-900">
                                Có
                            </label>
                        </div>
                        <div className="flex items-center w-[48%] mb-4 pt-6 pl-8">
                            <input id="smoke-option-2" type="radio"
                                name="smoke"
                                value="No"
                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                checked={smoking === 'No'}
                                onChange={(e) => handleSmokingChange(e.target.value)}
                                required
                            />
                            <label htmlFor="smoke-option-2" className="block ms-2 text-sm font-medium text-gray-900">
                                Không
                            </label>
                        </div>
                    </fieldset>
                    <fieldset className="flex flex-wrap justify-between">
                        <p className="pt-6 pl-8 text-[#1C1D1F]">Nếu có, vui lòng cho biết số điếu hút bình quân trong 1 ngày?</p>
                        <div className="w-[48%] z-0 pt-6 pl-8 mb-5 group">
                            <div className="inline-flex flex-col relative w-full">
                                <input type="number" name="smoking-frequency" id="smoking-frequency"
                                    value={smoking_frequency}
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer
                                    ${errorSmokingFrequency && 'border-red-500'
                                        }`}
                                    placeholder=" "
                                    onChange={(e) => setSmokingFrequency(e.target.value)}
                                    disabled={smoking === 'No'}
                                    />
                                <label htmlFor="smoking-frequency"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Số điếu / Ngày
                                </label>
                                {errorSmokingFrequency && <div className="text-red-500 text-sm mt-1">{errorSmokingFrequency}</div>}
                            </div>
                        </div>
                    </fieldset>

                    {/* Câu hỏi rượu bia */}
                    <p className="pt-6 pl-8 text-[#1C1D1F]">2. NĐBH có thường xuyên sử dụng rượu/bia không?</p>
                    <fieldset className="flex flex-wrap justify-between">
                        <div className="flex items-center w-[48%] mb-4 pt-6 pl-8">
                            <input id="alcohol-option-1" type="radio"
                                name="alcohol"
                                value="Yes"
                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                checked={alcohol === 'Yes'}
                                onChange={(e) => handleAlcoholChange(e.target.value)}
                                required />
                            <label htmlFor="alcohol-option-1" className="block ms-2 text-sm font-medium text-gray-900">
                                Có
                            </label>
                        </div>
                        <div className="flex items-center w-[48%] mb-4 pt-6 pl-8">
                            <input id="alcohol-option-2" type="radio"
                                name="alcohol"
                                value="No"
                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                checked={alcohol === 'No'}
                                onChange={(e) => handleAlcoholChange(e.target.value)}
                                required />
                            <label htmlFor="alcohol-option-2" className="block ms-2 text-sm font-medium text-gray-900">
                                Không
                            </label>
                        </div>
                    </fieldset>
                    <fieldset className="flex flex-col justify-between">
                        <p className="pt-6 pl-8 text-[#1C1D1F]">Trung bình số ngày uống rượu/bia trong 1 tuần?</p>
                        <div className="w-[48%] z-0 pt-6 pl-8 mb-5 group">
                            <div className="inline-flex flex-col relative w-full">
                                <input type="number" name="alcohol-frequency" id="alcohol-frequency"
                                    value={alcohol_frequency}
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer
                                    ${errorAlcoholFrequency && 'border-red-500'
                                        }`}
                                    placeholder=" "
                                    onChange={(e) => setAlcoholFrequency(e.target.value)}
                                    disabled={alcohol === 'No'}
                                    />
                                <label htmlFor="alcohol-frequency"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Ngày / Tuần
                                </label>
                                {errorAlcoholFrequency && <div className="text-red-500 text-sm mt-1">{errorAlcoholFrequency}</div>}
                            </div>
                        </div>
                    </fieldset>

                    {/* Câu hỏi ma túy */}
                    <p className="pt-6 pl-8 text-[#1C1D1F]">3. NĐBH đã từng hoặc đang sử dụng cần sa, ma
                        túy, thuốc phiện, cocain, heroin, morphin, thuốc
                        lắc, hoặc các chất gây nghiện khác mà không có chỉ định của bác sỹ không?</p>
                    <fieldset className="flex flex-wrap justify-between">
                        <div className="flex items-center w-[48%] mb-4 pt-6 pl-8">
                            <input id="drug-option-1" type="radio"
                                name="drug"
                                value="Yes"
                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                checked={drug === 'Yes'}
                                onChange={(e) => setDrug(e.target.value)}
                                required />
                            <label htmlFor="drug-option-1" className="block ms-2 text-sm font-medium text-gray-900">
                                Có
                            </label>
                        </div>
                        <div className="flex items-center w-[48%] mb-4 pt-6 pl-8">
                            <input id="drug-option-2" type="radio"
                                name="drug"
                                value="No"
                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                checked={drug === 'No'}
                                onChange={(e) => setDrug(e.target.value)}
                                required />
                            <label htmlFor="drug-option-2" className="block ms-2 text-sm font-medium text-gray-900">
                                Không
                            </label>
                        </div>
                    </fieldset>

                    {/* Câu hỏi thể thao nguy hiểm */}
                    <p className="pt-6 pl-8 text-[#1C1D1F]">4. NĐBH có tham gia hoặc dự định tham gia bất kỳ
                        môn thể thao nguy hiểm nào sau đây không:
                        lặn, leo núi, nhảy dù, đua xe, lướt ván hoặc
                        những môn thể thao nguy hiểm khác?</p>
                    <fieldset className="flex flex-wrap justify-between">
                        <div className="flex items-center w-[48%] mb-4 pt-6 pl-8">
                            <input id="sport-option-1" type="radio"
                                name="sport"
                                value="Yes"
                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                checked={sport === 'Yes'}
                                onChange={(e) => handleSportChange(e.target.value)}
                                required />
                            <label htmlFor="sport-option-1" className="block ms-2 text-sm font-medium text-gray-900">
                                Có
                            </label>
                        </div>
                        <div className="flex items-center w-[48%] mb-4 pt-6 pl-8">
                            <input id="sport-option-2" type="radio"
                                name="sport"
                                value="No"
                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                checked={sport === 'No'}
                                onChange={(e) => handleSportChange(e.target.value)}
                                required />
                            <label htmlFor="sport-option-2" className="block ms-2 text-sm font-medium text-gray-900">
                                Không
                            </label>
                        </div>
                    </fieldset>
                    <fieldset className="flex flex-col justify-between">
                        <p className="pt-6 pl-8 text-[#1C1D1F]">Nếu CÓ, vui lòng kê khai chi tiết.</p>
                        <div className="w-[48%] z-0 pt-6 pl-8 mb-5 group">
                            <div className="inline-flex flex-col relative w-full">
                                <input type="text" name="sport-detail" id="sport-detail"
                                    value={sport_detail}
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer
                                    ${errorSportDetail && 'border-red-500'
                                        }`}
                                    placeholder=" "
                                    onChange={(e) => setSportDetail(e.target.value)}
                                    disabled={sport === 'No'}
                                    />
                                <label htmlFor="sport-detail"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Chi tiết
                                </label>
                                {errorSportDetail && <div className="text-red-500 text-sm mt-1">{errorSportDetail}</div>}
                            </div>
                        </div>
                    </fieldset>

                    {/* Câu hỏi chẩn đoán ung thư */}
                    <p className="pt-6 pl-8 text-[#1C1D1F]">5. NĐBH đã từng được chẩn đoán: Ung thư, dị sản
                        (ung thư tại chỗ), suy thận, đái tháo đường,
                        HIV/AIDS, đột quỵ, cơn thiếu máu não thoáng
                        qua hoặc bất kỳ bệnh nào liên quan đến tim?</p>
                    <fieldset className="flex flex-wrap justify-between">
                        <div className="flex items-center w-[48%] mb-4 pt-6 pl-8">
                            <input id="cancer-option-1" type="radio"
                                name="cancer"
                                value="Yes"
                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                checked={cancer === 'Yes'}
                                onChange={(e) => setCancer(e.target.value)}
                                required />
                            <label htmlFor="cancer-option-1" className="block ms-2 text-sm font-medium text-gray-900">
                                Có
                            </label>
                        </div>
                        <div className="flex items-center w-[48%] mb-4 pt-6 pl-8">
                            <input id="cancer-option-2" type="radio"
                                name="cancer"
                                value="No"
                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                checked={cancer === 'No'}
                                onChange={(e) => setCancer(e.target.value)}
                                required />
                            <label htmlFor="cancer-option-2" className="block ms-2 text-sm font-medium text-gray-900">
                                Không
                            </label>
                        </div>
                    </fieldset>

                    {/* Câu hỏi chẩn đoán sốt xuất huyết */}
                    <p className="pt-6 pl-8 text-[#1C1D1F]">6. Trong vòng 5 năm vừa qua, NĐBH có mắc bất kỳ
                        bệnh nào sau đây không: Dengue (sốt xuất
                        huyết), thương hàn, viêm ruột do amip, sốt rét?</p>
                    <fieldset className="flex flex-wrap justify-between">
                        <div className="flex items-center w-[48%] mb-4 pt-6 pl-8">
                            <input id="dengue-option-1" type="radio"
                                name="dengue"
                                value="Yes"
                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                checked={dengue === 'Yes'}
                                onChange={(e) => setDengue(e.target.value)}
                                required />
                            <label htmlFor="dengue-option-1" className="block ms-2 text-sm font-medium text-gray-900">
                                Có
                            </label>
                        </div>
                        <div className="flex items-center w-[48%] mb-4 pt-6 pl-8">
                            <input id="dengue-option-2" type="radio"
                                name="dengue"
                                value="No"
                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                checked={dengue === 'No'}
                                onChange={(e) => setDengue(e.target.value)}
                                required />
                            <label htmlFor="dengue-option-2" className="block ms-2 text-sm font-medium text-gray-900">
                                Không
                            </label>
                        </div>
                    </fieldset>

                    {/* Câu hỏi bệnh bẩm sinh */}
                    <p className="pt-6 pl-8 text-[#1C1D1F]">7. Ngoài các bệnh kể trên, NĐBH có bất kỳ thương
                        tật hoặc bệnh/thương tật bẩm sinh nào không:
                        bệnh xơ nang, mù, điếc, bại não, bất thường tâm
                        thần (ví dụ bệnh Down)?</p>
                    <fieldset className="flex flex-wrap justify-between">
                        <div className="flex items-center w-[48%] mb-4 pt-6 pl-8">
                            <input id="congenital-disease-option-1" type="radio"
                                name="congenital-disease"
                                value="Yes"
                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                checked={congenital_disease === 'Yes'}
                                onChange={(e) => handleCongenitalDiseaseChange(e.target.value)}
                                required />
                            <label htmlFor="congenital-disease-option-1" className="block ms-2 text-sm font-medium text-gray-900">
                                Có
                            </label>
                        </div>
                        <div className="flex items-center w-[48%] mb-4 pt-6 pl-8">
                            <input id="congenital-disease-option-2" type="radio"
                                name="congenital-disease"
                                value="No"
                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                checked={congenital_disease === 'No'}
                                onChange={(e) => handleCongenitalDiseaseChange(e.target.value)}
                                required />
                            <label htmlFor="congenital-disease-option-2" className="block ms-2 text-sm font-medium text-gray-900">
                                Không
                            </label>
                        </div>
                    </fieldset>
                    <fieldset className="flex flex-col justify-between">
                        <p className="pt-6 pl-8 text-[#1C1D1F]">Nếu CÓ, vui lòng kê khai chi tiết.</p>
                        <div className="w-[48%] z-0 pt-6 pl-8 mb-5 group">
                            <div className="inline-flex flex-col relative w-full">
                                <input type="text" name="congenital-disease-detail" id="congenital-disease-detail"
                                    value={congenital_disease_detail}
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer
                                    ${errorCongenitalDisease && 'border-red-500'
                                        }`}
                                    placeholder=" "
                                    onChange={(e) => setCongenitalDiseaseDetail(e.target.value)}
                                    disabled={congenital_disease === 'No'}
                                    />
                                <label htmlFor="congenital-disease-detail"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Chi tiết
                                </label>
                                {errorCongenitalDisease && <div className="text-red-500 text-sm mt-1">{errorCongenitalDisease}</div>}
                            </div>
                        </div>
                    </fieldset>

                    {/* Câu hỏi sụt cân */}
                    <p className="pt-6 pl-8 text-[#1C1D1F]">8. Ngoài các bệnh kể trên, NĐBH có bất kỳ dấu
                        hiệu, triệu chứng bất thường nào bao gồm sụt
                        cân không rõ nguyên nhân mà chưa đi khám
                        không?</p>
                    <fieldset className="flex flex-wrap justify-between">
                        <div className="flex items-center w-[48%] mb-4 pt-6 pl-8">
                            <input id="weight-loss-option-1" type="radio"
                                name="weight-loss"
                                value="Yes"
                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                checked={weight_loss === 'Yes'}
                                onChange={(e) => handleWeightLossChange(e.target.value)}
                                required />
                            <label htmlFor="weight-loss-option-1" className="block ms-2 text-sm font-medium text-gray-900">
                                Có
                            </label>
                        </div>
                        <div className="flex items-center w-[48%] mb-4 pt-6 pl-8">
                            <input id="weight-loss-option-2" type="radio"
                                name="weight-loss"
                                value="No"
                                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                                checked={weight_loss === 'No'}
                                onChange={(e) => handleWeightLossChange(e.target.value)}
                                required />
                            <label htmlFor="weight-loss-option-2" className="block ms-2 text-sm font-medium text-gray-900">
                                Không
                            </label>
                        </div>
                    </fieldset>
                    <fieldset className="flex flex-col justify-between">
                        <p className="pt-6 pl-8 text-[#1C1D1F]">Nếu CÓ, vui lòng kê khai chi tiết.</p>
                        <div className="w-[48%] z-0 pt-6 pl-8 mb-5 group">
                            <div className="inline-flex flex-col relative w-full">
                                <input type="text" name="weight-loss-detail" id="weight-loss-detail"
                                    value={weight_loss_detail}
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer
                                    ${errorWeightLoss && 'border-red-500'
                                        }`}
                                    placeholder=" "
                                    onChange={(e) => setWeightLossDetail(e.target.value)}
                                    disabled={weight_loss === 'No'}
                                    />
                                <label htmlFor="weight-loss-detail"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Chi tiết
                                </label>
                                {errorWeightLoss && <div className="text-red-500 text-sm mt-1">{errorWeightLoss}</div>}
                            </div>
                        </div>
                    </fieldset>

                    <div className="flex justify-center my-8">
                        <button type="button"
                            className="focus:outline-none text-white bg-buttonProduct hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-3xl text-sm px-20 py-3 mb-2"
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Gửi phiếu thông tin
                        </button>
                    </div>
                </form>
                {openToast && (
                    <div id="toast-danger" className="flex fixed top-5 right-5 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow" role="alert">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                            </svg>
                            <span className="sr-only">Error icon</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">{errorMessage}</div>
                    </div>
                )}
                {openModal && (
                    <div>
                        <div className="fixed top-0 left-0 w-full h-full bg-overLay opacity-70 z-[200]"></div>
                        <div id="successModal" tabIndex="-1" aria-hidden="true"
                            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[300] justify-center items-center w-full md:inset-0 h-modal md:h-full">
                            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                                <div className="relative p-4 text-center bg-white border-2 border-slate-400 rounded-lg shadow sm:p-5">
                                    <button type="button"
                                        className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                        data-modal-toggle="successModal"
                                        onClick={handleCloseModal}
                                    >
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <div className="w-12 h-12 rounded-full bg-green-200 p-2 flex items-center justify-center mx-auto mb-3.5">
                                        <svg aria-hidden="true" className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Success</span>
                                    </div>
                                    <p className="mb-4 text-lg font-semibold text-gray-900"> Đã gửi thành công!
                                    </p>
                                    <p className="mb-4 text-lg font-semibold text-gray-900"> Vui lòng chờ email phản hồi của chúng tôi.
                                    </p>
                                    <button data-modal-toggle="successModal"
                                        type="button"
                                        className="w-32 py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300"
                                        onClick={handleCloseModal}
                                    >
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
            <Footer />
        </React.Fragment>
    )
}

export default FillForm