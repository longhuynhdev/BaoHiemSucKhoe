import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { employeesTableData } from "../../../data";

import AddEmployee from "./addEmployee";
import EditEmployee from "./editEmployee";
import DeleteEmployee from "./deleteEmployee";
import axios from 'axios';

export function Employees() {

    const [selectedEmployee, setSelectedEmployee] = useState("");

    const [idDelete, setIDDelete] = useState("");

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const addRef = useRef(null);
    const editRef = useRef(null);
    const deleteRef = useRef(null);

    // các giá trị khi thêm tài khoản nhân viên
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // các giá trị khi cập nhật tài khoản nhân viên
    const [firstName_Update, setFirstNameUpdate] = useState('');
    const [lastName_Update, setLastNameUpdate] = useState('');
    const [email_Update, setEmailUpdate] = useState('');
    const [position_Update, setPositionUpdate] = useState('');
    const [username_Update, setUsernameUpdate] = useState('');
    const [password_Update, setPasswordUpdate] = useState('');

    const addNew = {
        "First Name": firstName,
        "Last Name": lastName,
        "Email": email,
        "Position": position,
        "Username": username,
        "Password": password
    };

    const edit_Emp = {
        "First Name": firstName_Update,
        "Last Name": lastName_Update,
        "Email": email_Update,
        "Position": position_Update,
        "Username": username_Update,
        "Password": password_Update
    };

    // mở cửa sổ thêm mới nhân viên
    const showAdd = () => {
        setIsOpenAdd(true);
    };

    const hideAdd = () => {
        setIsOpenAdd(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPosition("");
        setUsername("");
        setPassword("");
    };

    // mở cửa sổ cập nhật thông tin tài khoản nhân viên
    const showEdit = (id) => {
        const employee = employeesTableData.find((item) => item.id === id);
        const [fn, ln] = employee.name.split(' ');
        setSelectedEmployee(employee);
        setFirstNameUpdate(fn);
        setLastNameUpdate(ln);
        setEmailUpdate(employee.email);
        setPositionUpdate(employee.position);
        setUsernameUpdate(employee.username);
        setIsOpenEdit(true);
    };

    const hideEdit = () => {
        setIsOpenEdit(false);
        setFirstNameUpdate("");
        setLastNameUpdate("");
        setEmailUpdate("");
        setPositionUpdate("");
        setUsernameUpdate("");
        setPasswordUpdate("");
    };

    // mở cửa sổ xóa tài khoản nhân viên
    const showDelete = (id) => {
        setIDDelete(id);
        setIsOpenDelete(true);
    };

    const hideDelete = () => {
        setIsOpenDelete(false);
        setIDDelete("");
    };

    const handleOutsideClick = (event) => {
        // Kiểm tra xem có phải click bên ngoài cửa sổ không
        if (
            addRef.current &&
            !addRef.current.contains(event.target) &&
            isOpenAdd
        ) {
            hideAdd();
        }
        if (
            editRef.current &&
            !editRef.current.contains(event.target) &&
            isOpenEdit
        ) {
            hideEdit();
        }
        if (
            deleteRef.current &&
            !deleteRef.current.contains(event.target) &&
            isOpenDelete
        ) {
            hideDelete();
        }
    };

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7267/api/User/get-user`);
                if (response.status === 200) {
                    
                    setUserList(response.data);
                    
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
        // Thêm sự kiện mousedown toàn cầu khi cửa sổ mở
        if (isOpenAdd || isOpenEdit || isOpenDelete) {
          document.addEventListener("mousedown", handleOutsideClick);
        }
    
        // Cleanup sự kiện khi component unmount
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpenAdd, isOpenEdit, isOpenDelete]);

    // thực hiện thêm tài khoản nhân viên
    const handleAddEmployee = (event) => {
        event.preventDefault();
        alert("Thêm nhân viên thành công!");
        console.log(addNew);
        hideAdd();
    }

    // thực hiện cập nhật tài khoản nhân viên
    const handleEditEmployee = (event) => {
        event.preventDefault();
        alert("Cập nhật tài khoản nhân viên thành công!");
        console.log(edit_Emp)
        hideEdit();
    }

    // thực hiện xóa tài khoản nhân viên
    const handleDeleteEmployee = () => {
        alert("Xóa tài khoản nhân viên thành công!");
        console.log(idDelete);
        hideDelete();
    }

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                <Typography variant="h6" color="white">
                    All Users
                </Typography>
                </CardHeader>
                <div className="items-center justify-end mx-4 mb-4 block sm:flex md:divide-x md:divide-gray-100">
                <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none" 
                        type="button"
                        onClick={showAdd}>
                    Add new employee
                </button>
                </div>
                <CardBody className="overflow-x-scroll max-h-[600px] px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                    <thead className="relative">
                    <tr className="sticky top-[-5px] z-300 bg-white">
                        {["id", "name", "email", "position", "actions"].map((el) => (
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
                    {userList.map(
                        ({ id, name, email, discriminator}, key) => {
                        const className = `py-3 px-10 ${
                            key === employeesTableData.length - 1
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
                                    {discriminator}
                                </Typography>
                            </td>
                            <td className="py-3 px-10 border-b border-blue-gray-50 space-x-2 whitespace-nowrap">
                                <button type="button" id="updateEmployeeButton" data-drawer-target="drawer-update-employee-default" data-drawer-show="drawer-update-employee-default" aria-controls="drawer-update-employee-default" data-drawer-placement="right" 
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
                                    onClick={() => showEdit(id)}>
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                    Edit
                                </button>
                                <button type="button" id="deleteEmployeeButton" data-drawer-target="drawer-delete-employee-default" data-drawer-show="drawer-delete-employee-default" aria-controls="drawer-delete-employee-default" data-drawer-placement="right" 
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
            {/*  truyền các props cần thiết qua addEmployee.jsx */}
            <AddEmployee isOpen= {isOpenAdd}
                        handleClose = {hideAdd}
                        handleSubmit = {handleAddEmployee}
                        addRef={addRef}
                        fname = {firstName}
                        setFName= {setFirstName}
                        lname = {lastName}
                        setLName= {setLastName}
                        email = {email}
                        setEmail= {setEmail}
                        position= {position}
                        setPosition= {setPosition}
                        username= {username}
                        setUsername= {setUsername}
                        password= {password}
                        setPassword= {setPassword}
                        />
            {/*  truyền các props cần thiết qua editEmployee.jsx */}
            <EditEmployee isOpen= {isOpenEdit}
                        handleClose = {hideEdit}
                        handleSubmit = {handleEditEmployee}
                        editRef={editRef}
                        id = {selectedEmployee.id}
                        fname = {firstName_Update}
                        setFName= {setFirstNameUpdate}
                        lname = {lastName_Update}
                        setLName= {setLastNameUpdate}
                        email = {email_Update}
                        setEmail= {setEmailUpdate}
                        position= {position_Update}
                        setPosition= {setPositionUpdate}
                        username= {username_Update}
                        setUsername= {setUsernameUpdate}
                        password= {password_Update}
                        setPassword= {setPasswordUpdate}
                        />
            {/*  truyền các props cần thiết qua deleteEmployee.jsx */}
            <DeleteEmployee isOpen= {isOpenDelete}
                        handleClose = {hideDelete}
                        handleSubmit = {handleDeleteEmployee}
                        deleteRef={deleteRef}
                        id= {idDelete}
                        />
        </div>
    );
}

export default Employees;