import React, { useState, useEffect, useRef } from "react";

export function AddEmployee(
    {isOpen, handleClose, handleSubmit, addRef,
     fname, setFName, lname, setLName, email, setEmail, position, setPosition, username, setUsername, password, setPassword}) 
{
    return (
        <div className={`${isOpen ? "block" : "hidden"}`}>
            <div className= "fixed top-0 left-0 w-full h-full bg-overLay opacity-50 z-[200]"></div>
            <div className="fixed flex left-0 right-0 z-[250] items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full">
                <div ref={addRef} className="relative w-full h-full max-w-2xl px-4 md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-start justify-between p-5 border-b rounded-t">
                            <h3 className="text-xl font-semibold">
                                Add new user
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" 
                                    data-modal-toggle="add-user-modal"
                                    onClick={handleClose}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="p-6 space-y-6">
                            <form action="#" onSubmit={(e) => handleSubmit(e)}>
                                <div className="grid grid-cols-6 gap-6 mb-7">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                                        <input type="text" name="first-name" id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" 
                                                placeholder="First Name"
                                                value={fname}
                                                onChange={(e) => setFName(e.target.value)} 
                                                required />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                                        <input type="text" name="last-name" id="last-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" 
                                                placeholder="Last Name" 
                                                value={lname}
                                                onChange={(e) => setLName(e.target.value)} 
                                                required />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                        <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" 
                                                placeholder="example@company.com" 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} 
                                                required />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900">Position</label>
                                        <input type="text" name="position" id="position" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" 
                                                placeholder="VD: Bộ phận kiểm duyệt,..." 
                                                value={position}
                                                onChange={(e) => setPosition(e.target.value)} 
                                                required />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                        <input type="text" name="position" id="position" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" 
                                                placeholder="Username" 
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)} 
                                                required />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                        <input type="text" name="position" id="position" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" 
                                                placeholder="Password" 
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)} 
                                                required />
                                    </div>
                                </div> 
                                {/* <!-- Modal footer --> */}
                                <div className="items-center pt-4 px-4 border-t border-gray-200 rounded-b">
                                    <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" 
                                            type="submit"
                                            /* onClick={handleSubmit} */>
                                            Add user
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee;