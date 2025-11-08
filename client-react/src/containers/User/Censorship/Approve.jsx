import Header from '../../HomePage/Header.jsx';
import Footer from '../../HomePage/Footer.jsx';

const Approve = () => {
    return(
        <div>
            <Header />

            <section className="mx-auto w-4/5  h-auto my-10">
                <div>
                    <h3 className="md:w-3/4 text-2xl mb-5 leading-6 font-medium pt-2 font-bold text-blue-700">
                        Đơn đăng kí cần phê duyệt
                    </h3>
                    <table className="w-full select-none">
                        <thead>
                            <tr className="bg-gray-400 border-2">
                                <th className="p-2">Họ và tên</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Số điện thoại</th>
                                <th className="p-2">Ngày đăng ký</th>
                                <th className="p-2">Lựa chọn</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr className="border hover:bg-slate-100">
                                <td className="p-3 text-center ">Nguyen Van A</td>
                                <td className="p-3 text-center">nguyenvana@gmail.com</td>
                                <td className="p-3 text-center">0123456789</td>
                                <td className="p-3 text-center">1/1/2024</td>
                                <td className="p-3 grid grid-cols-2">
                                    <svg className="fill-green-600 cursor-pointer hover:bg-green-200 mx-auto" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="30" 
                                        height="30" 
                                        viewBox="0 0 50 50">
                                            <path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z"></path>
                                    </svg>

                                    <svg className="fill-red-600 cursor-pointer hover:bg-red-200 mx-auto" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="30" 
                                        height="30" 
                                        viewBox="0 0 50 50">
                                            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                                    </svg>
                                </td>
                            </tr>

                            <tr className="border hover:bg-slate-100">
                                <td className="p-3 text-center ">Nguyen Van A</td>
                                <td className="p-3 text-center">nguyenvana@gmail.com</td>
                                <td className="p-3 text-center">0123456789</td>
                                <td className="p-3 text-center">1/1/2024</td>
                                <td className="p-3 grid grid-cols-2">
                                    <svg className="fill-green-600 cursor-pointer hover:bg-green-200 mx-auto" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="30" 
                                        height="30" 
                                        viewBox="0 0 50 50">
                                            <path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z"></path>
                                    </svg>

                                    <svg className="fill-red-600 cursor-pointer hover:bg-red-200 mx-auto" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="30" 
                                        height="30" 
                                        viewBox="0 0 50 50">
                                            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                                    </svg>
                                </td>
                            </tr>

                            <tr className="border hover:bg-slate-100">
                                <td className="p-3 text-center ">Nguyen Van A</td>
                                <td className="p-3 text-center">nguyenvana@gmail.com</td>
                                <td className="p-3 text-center">0123456789</td>
                                <td className="p-3 text-center">1/1/2024</td>
                                <td className="p-3 grid grid-cols-2 ">
                                    <svg className="fill-green-600 cursor-pointer hover:bg-green-200 mx-auto"  
                                        xmlns="http://www.w3.org/2000/svg"    
                                        width="30" 
                                        height="30" 
                                        viewBox="0 0 50 50">
                                            <path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z"></path>
                                    </svg>

                                    <svg className="fill-red-600 cursor-pointer hover:bg-red-200 mx-auto" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="30" 
                                        height="30" 
                                        viewBox="0 0 50 50">
                                            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                                    </svg>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3 className="md:w-3/4 text-2xl my-5 leading-6 font-medium pt-2 font-bold text-green-600">
                        Đơn đã duyệt
                    </h3>
                    <table className="w-full select-none">
                        <thead>
                            <tr className="bg-gray-400 border-2">
                                <th className="p-2">Họ và tên</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Số điện thoại</th>
                                <th className="p-2">Ngày đăng ký</th>
                                <th className="p-2">Người duyệt</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr className="border hover:bg-slate-100">
                                <td className="p-3 text-center ">Nguyen Van A</td>
                                <td className="p-3 text-center">nguyenvana@gmail.com</td>
                                <td className="p-3 text-center">0123456789</td>
                                <td className="p-3 text-center">1/1/2024</td>
                                <td className="p-3 text-center font-bold">Le Van B</td>
                            </tr>

                            <tr className="border hover:bg-slate-100">
                                <td className="p-3 text-center ">Nguyen Van A</td>
                                <td className="p-3 text-center">nguyenvana@gmail.com</td>
                                <td className="p-3 text-center">0123456789</td>
                                <td className="p-3 text-center">1/1/2024</td>
                                <td className="p-3 text-center font-bold">Le Van B</td>
                            </tr>

                            <tr className="border hover:bg-slate-100">
                                <td className="p-3 text-center ">Nguyen Van A</td>
                                <td className="p-3 text-center">nguyenvana@gmail.com</td>
                                <td className="p-3 text-center">0123456789</td>
                                <td className="p-3 text-center">1/1/2024</td>
                                <td className="p-3 text-center font-bold">Le Van B</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3 className="md:w-3/4 text-2xl my-5 leading-6 font-medium pt-2 font-bold text-red-600">
                        Đơn từ chối duyệt
                    </h3>
                    <table className="w-full select-none">
                        <thead>
                            <tr className="bg-gray-400 border-2">
                                <th className="p-2">Họ và tên</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Số điện thoại</th>
                                <th className="p-2">Ngày đăng ký</th>
                                <th className="p-2">Người duyệt</th>
                                <th className="p-2">Lý do</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr className="border hover:bg-slate-100">
                                <td className="p-3 text-center ">Nguyen Van A</td>
                                <td className="p-3 text-center">nguyenvana@gmail.com</td>
                                <td className="p-3 text-center">0123456789</td>
                                <td className="p-3 text-center">1/1/2024</td>
                                <td className="p-3 text-center font-bold">Le Van B</td>
                                <td className="p-3 text-center text-red-500">Ly do ABCXYZ</td>
                            </tr>

                            <tr className="border hover:bg-slate-100">
                                <td className="p-3 text-center ">Nguyen Van A</td>
                                <td className="p-3 text-center">nguyenvana@gmail.com</td>
                                <td className="p-3 text-center">0123456789</td>
                                <td className="p-3 text-center">1/1/2024</td>
                                <td className="p-3 text-center font-bold">Le Van B</td>
                                <td className="p-3 text-center text-red-500">Ly do ABCXYZ</td>
                            </tr>

                            <tr className="border hover:bg-slate-100">
                                <td className="p-3 text-center ">Nguyen Van A</td>
                                <td className="p-3 text-center">nguyenvana@gmail.com</td>
                                <td className="p-3 text-center">0123456789</td>
                                <td className="p-3 text-center">1/1/2024</td>
                                <td className="p-3 text-center font-bold">Le Van B</td>
                                <td className="p-3 text-center text-red-500">Ly do ABCXYZ</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Approve;