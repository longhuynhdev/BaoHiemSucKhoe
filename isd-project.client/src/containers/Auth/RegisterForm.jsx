import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, NavLink, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (success) {
            // Thực hiện các hành động sau khi success thay đổi
            console.log('Registration successful:', success);
        }
    }, [success]);


    const handleRegister = () => {
        axios.post('https://localhost:7267/api/UserAccount/register', {
            email : email,
            password: password,
            confirmPassword: confirmPassword,
            role: 1
        }).then(response => {
            setSuccess(true);
            console.log(response.data, success);
        }).catch(error => {
            if (error.response) {
                console.error('Request failed with status code:', error.response.status);
                console.error('Response data:', error.response.data);
            } else if (error.request) {
                console.error('No response received from server:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        })
    }

    const closeModal = () => {
        setSuccess(false);
    }

    const navigate_Login = () => {
        navigate('/login');
    }

    /*return (
    <div>
        <h1>Register Form</h1>
        <form>
            <label>
                Email
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </label>
            <br/>
            <label>
                Password
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </label>
            <br/>
            <label>
                Confirm Password
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
            </label>
            <br/>
            <button type="button" onClick={handleRegister}>Register</button>
        </form>
    </div>
    );*/
    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <NavLink to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 text-black">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Trang chủ
                </NavLink>
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
                            Create and account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 text-black">
                                    Your email
                                </label>
                                <input type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="name@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 text-black">
                                    Password
                                </label>
                                <input type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 text-black">
                                    Confirm password
                                </label>
                                <input type="password"
                                    name="confirm-password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                                        required />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 text-gray-300">
                                        I accept the
                                        <a className="font-medium text-primary-600 hover:underline text-primary-500" href="#">
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                         
                        </form>
                        <button
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                            onClick={handleRegister}
                        >
                            Create an account
                        </button>
                        <p className="text-sm font-light text-gray-500 text-gray-400">
                            Already have an account?
                            <NavLink to="/login" className="font-medium text-primary-600 hover:underline text-primary-500">
                                Login here
                            </NavLink>
                        </p>
                    </div>
                </div>
                {success && (
                    <div id="successModal" tabIndex="-1" aria-hidden="true"
                        className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
                        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div className="relative p-4 text-center bg-white border-4 border-slate-400 rounded-lg shadow sm:p-5">
                                <button type="button"
                                    className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                    data-modal-toggle="successModal"
                                    onClick={closeModal}
                                >
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="w-12 h-12 rounded-full bg-green-200 p-2 flex items-center justify-center mx-auto mb-3.5">
                                    <svg aria-hidden="true" className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Success</span>
                                </div>
                                <p className="mb-4 text-lg font-semibold text-gray-900">Đăng ký thành công!</p>
                                <button data-modal-toggle="successModal"
                                    type="button"
                                    className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
                                    onClick={navigate_Login}
                                >
                                    Đăng nhập ngay
                                </button>
                            </div>
                        </div>
                    </div>)}
            </div>
        </section>
    )
}

export default RegisterForm;