import React, { useState, useEffect, useRef } from "react";

export function UpdateProduct(
    {isOpen, handleClose, handleSubmit, updateRef,
     id, name, setName, price, setPrice, desc, setDesc, discount, setDiscount}) 
{
    return (
        <div ref={updateRef}
            className={`fixed top-0 right-0 z-40 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform ${
            isOpen ? "" : "translate-x-full"
            } bg-white`}
            tabIndex="-1" 
            aria-labelledby="drawer-label" 
            aria-hidden={!isOpen}>
        <h5 id="drawer-label" className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase">Update Product</h5>
        <button type="button" data-drawer-dismiss="drawer-update-product-default" aria-controls="drawer-update-product-default" 
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
                onClick={handleClose}>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Close menu</span>
        </button>
        <form action="#" onSubmit={(e) => handleSubmit(e)}>
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">ID</label>
                    <input type="text" name="title" id="ID" className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                            value= {id} 
                            /* placeholder="Tên sản phẩm bảo hiểm"  */
                            disabled />
                </div>

                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                    <input type="text" name="title" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                            placeholder="Tên sản phẩm bảo hiểm" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required />
                </div>
                
                <div>
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                    <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                            placeholder="$149" 
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required />
                </div>
                <div>
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                    <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" 
                        placeholder="Enter event description here"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}>
                    </textarea>
                </div>
                <div>
                    <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900">Discount</label>
                    <select id="discount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                    >
                        <option value="0">No</option>
                        <option value="5">5%</option>
                        <option value="10">10%</option>
                        <option value="20">20%</option>
                        <option value="30">30%</option>
                        <option value="40">40%</option>
                        <option value="50">50%</option>
                    </select>
                </div>
            </div>
            <div className="bottom-0 left-0 flex justify-center w-full pb-4 mt-4 space-x-4 sm:absolute sm:px-4 sm:mt-0">
                <button type="submit" className="w-full justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        /* onClick={handleSubmit} */>
                    Update
                </button>
                <button type="button" className="inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                        onClick={handleClose}>
                    <svg aria-hidden="true" className="w-5 h-5 -ml-1 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    Cancel
                </button>
            </div>
        </form>
    </div>
    )
}

export default UpdateProduct;