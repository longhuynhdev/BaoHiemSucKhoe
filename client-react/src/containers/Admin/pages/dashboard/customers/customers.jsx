import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { customersTableData } from "../../../data";
import axios from 'axios';

import EditCustomer from "./editCustomer";
import DeleteCustomer from "./deleteCustomer";

export function Customers() {

    const [selectedCustomer, setSelectedCustomer] = useState("");

    const [idDelete, setIDDelete] = useState("");

    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const editRef = useRef(null);
    const deleteRef = useRef(null);

    // các giá trị khi sửa thông tin khách hàng
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const edit_Customer = {
        "First Name": firstName,
        "Last Name": lastName,
        "Email": email,
        "Status": status
    };

    // mở cửa sổ cập nhật thông tin tài khoản khách hàng
    const showEdit = (id) => {
        const customer = insuranceType.find((item) => item.id === id);
        const [fn, ln] = customer.name.split(' ');
        setSelectedCustomer(customer);
        setFirstName(fn);
        setLastName(ln);
        setEmail(customer.email);
        setStatus(customer.status);
        setIsOpenEdit(true);
    };

    const hideEdit = () => {
        setIsOpenEdit(false);
        setFirstName("");
        setLastName("ln");
        setEmail("");
        setStatus("");
    };

    // mở cửa sổ xóa tài khoản khách hàng
    const showDelete = (id) => {
        setIDDelete(id);
        console.log("id ne", idDelete)
        setIsOpenDelete(true);
    };

    const hideDelete = () => {
        setIsOpenDelete(false);
        // setIDDelete("");
    };

    const handleOutsideClick = (event) => {
        // Kiểm tra xem có phải click bên ngoài cửa sổ không
        if (
            isOpenEdit &&
            editRef.current &&
            !editRef.current.contains(event.target)
        ) {
            hideEdit();
        }
        if (
            isOpenDelete &&
            deleteRef.current &&
            !deleteRef.current.contains(event.target)
          ) {
            hideDelete();
          }
    };

    useEffect(() => {
        // Thêm sự kiện mousedown toàn cầu khi cửa sổ mở
        if (isOpenEdit || isOpenDelete) {
          document.addEventListener("mousedown", handleOutsideClick);
        }
        // Cleanup sự kiện khi component unmount
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpenEdit, isOpenDelete]);

    const [insuranceType, setInsuranceType] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7267/api/Customer/get-customer');
               
                if (response.status === 200) {
                    
                    setInsuranceType(response.data);
                    console.log("Tess",insuranceType);
                    
                } else {
                    console.error("Error fetching user data");
                }
            } catch (error) {
                console.error("Error during API request:", error);
            }
        };
        fetchData();
    }, []);

    // thực hiện cập nhật thông tin tài khoản khách hàng
    const handleEditCustomer = (event) => {
        event.preventDefault();
        alert("Cập nhật tài khoản khách hàng thành công!");
        console.log(edit_Customer);
        hideEdit();
    }
    
    // thực hiện xóa tài khoản khách hàng
    const handleDeleteCustomer = async () => {
        console.log("id delete:", idDelete);
        try {
            const response = await axios.delete(`https://localhost:7267/api/Customer/delete-customer/${idDelete}`);
            console.log("id delete:", response);
            
            if(response.status === 200) {
                alert("Xóa tài khoản khách hàng thành công!");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert('Có lỗi, hãy thử lại sau.');
                console.error('Axios error:', error.response );
            } 
        }
        hideDelete();
    }

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                <Typography variant="h6" color="white">
                    All Customers
                </Typography>
                </CardHeader>
                {/* <div className="items-center justify-end mx-4 mb-4 block sm:flex md:divide-x md:divide-gray-100">
                <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none" 
                        type="button"
                        onClick={showDrawer}>
                    Add new product
                </button>
                </div> */}
                <CardBody className="overflow-x-scroll max-h-[600px] px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                    <thead className="relative">
                    <tr className="sticky top-[-5px] z-300 bg-white">
                        {["id", "name", "email", "country", "CCCD", "actions"].map((el) => (
                        <th
                            key={el}
                            className="border-b border-blue-gray-50 py-3 px-10 text-left"
                        >
                            <Typography
                            variant="small"
                            className="text-[11px] font-bold uppercase text-gray-400"
                            >
                            {el}
                            </Typography>
                        </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>

                    {insuranceType.map(
                        ({ id, name, email, nationality, identityDocumentId}, key) => {
                        const className = `py-3 px-10 ${
                            key === customersTableData.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                            <tr key={id}>
                            <td className={className}>
                                <div className="flex items-center gap-4">
                                <div>
                                    <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-semibold"
                                    >
                                    #{id}
                                    </Typography>
                                </div>
                                </div>
                            </td>
                            <td className={className}>
                                <Typography className="text-xs font-semibold text-gray-600">
                                {name}
                                </Typography>
                            </td>
                            <td className={className}>
                                <Typography
                                    className="text-xs font-medium text-gray-600"
                                >
                                    {email}
                                </Typography>
                            </td>
                            <td className={className}>
                                <Typography
                                    className="text-xs font-medium text-gray-600"
                                >
                                    {nationality}
                                </Typography>
                            </td>

                            <td className={className}>
                                <Typography
                                    className="text-xs font-medium text-gray-600"
                                >
                                    {identityDocumentId}
                                </Typography>
                            </td>


                            <td className="py-3 px-10 border-b border-blue-gray-50 space-x-2 whitespace-nowrap">
                                <button type="button" id="updateProductButton" data-drawer-target="drawer-update-product-default" data-drawer-show="drawer-update-product-default" aria-controls="drawer-update-product-default" data-drawer-placement="right" 
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
                                    onClick={() => showEdit(id)}>
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                    Edit
                                </button>
                                <button type="button" id="deleteProductButton" data-drawer-target="drawer-delete-product-default" data-drawer-show="drawer-delete-product-default" aria-controls="drawer-delete-product-default" data-drawer-placement="right" 
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300"
                                    onClick={() => showDelete(id)}>
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                    Delete
                                </button>
                            </td>
                            </tr>
                        );
                        }
                    )}
                    </tbody>
                </table>
                </CardBody>
            </Card>

            {/* truyền các props cần thiết qua editCustomer.jsx */}
            <EditCustomer isOpen= {isOpenEdit}
                   handleClose = {hideEdit}
                   handleSubmit = {handleEditCustomer}
                   editRef={editRef}
                   id = {insuranceType.id}
                   fname = {firstName}
                   setFName= {setFirstName}
                   lname = {lastName}
                   setLName= {setLastName}
                   email = {email}
                   setEmail= {setEmail}
                   status= {status}
                   setStatus= {setStatus}
                   />

            {/* truyền các props cần thiết qua deleteCustomer.jsx */}
            <DeleteCustomer isOpen= {isOpenDelete}
                   handleClose = {hideDelete}
                   handleSubmit = {handleDeleteCustomer}
                   deleteRef={deleteRef}
                   id= {idDelete}
                   />
        </div>
    );
}

export default Customers;