import { useState } from 'react';
import axios from 'axios';
import { useLocation, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../services/auth.jsx';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { isLoggedIn, login, logout } = useAuth();

    const handleLogin = () => {
        axios.post('https://localhost:7267/api/UserAccount/login', {
            email: email,
            password: password
        })
            .then(response => {
                if (response.status === 200) {
                    const userAccountId = response.data.userAccountId;
                    const token = response.data.token;
                    const role = response.data.role;
                    const isActivated = response.data.isActivated;
                    const userId = response.data.userId;
                    if(isActivated === 1) {
                        console.log(response.data);
                        // Lưu token vào localStorage
                        localStorage.setItem('userAccountId', userAccountId);
                        localStorage.setItem('token', token);
                        localStorage.setItem('role', role);
                        localStorage.setItem('userId', userId);

                        // Chuyển hướng đến trang chủ
                        navigate('/');
                        login();
                    }
                    else {
                        //TODO: Xử lý tài khoản chưa được kích hoạt
                        alert("Tài khoản chưa được kích hoạt!");
                    }
                } else {
                    console.error(response.data); // Thông báo lỗi từ server
                    // Thực hiện xử lý khi đăng nhập không thành công
                }
            })
            .catch(error => {
                if (error.response) {
                    console.error('Request failed with status code:', error.response.status);
                    console.error('Response data:', error.response.data);
                } else if (error.request) {
                    console.error('No response received from server:', error.request);
                } else {
                    console.error('Error:', error.message);
                }
            });
    };

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <NavLink to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Trang chủ
                </NavLink>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                                    Your email
                                </label>
                                <input type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                                    Password
                                </label>
                                <input type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                
                        </form>
                        <button type="submit"
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                            onClick={handleLogin}
                        >
                            Sign in
                        </button>
                        <p className="text-sm font-light text-gray-500 text-gray-400">
                            Don’t have an account yet?
                            <NavLink to="/signup" className="font-medium text-primary-600 hover:underline text-primary-500">
                                Sign up
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )

}
export default LoginForm;