import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import AddProduct from "./addProduct";
import UpdateProduct from "./updateProduct";
import DeleteProduct from "./deleteProduct";
import axios from 'axios';

export function Products() {

  const [selectedProduct, setSelectedProduct] = useState("");

  const [idDelete, setIDDelete] = useState("");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  
  const drawerRef = useRef(null);
  const updateRef = useRef(null);
  const deleteRef = useRef(null);

  // các giá trị khi thêm sản phẩm
  const [nameAdd, setNameAdd] = useState('');
  const [priceAdd, setPriceAdd] = useState('');
  const [descAdd, setDescAdd] = useState('');
  const [discountAdd, setDiscountAdd] = useState('');

  // các giá trị khi update sản phẩm
  const [nameUpdate, setNameUpdate] = useState('');
  const [priceUpdate, setPriceUpdate] = useState('');
  const [descUpdate, setDescUpdate] = useState('');
  const [discountUpdate, setDiscountUpdate] = useState('');

  /* useEffect(() => {
    setDiscountAdd("0");
  }, []); */

  const addNew = {
    "Name": nameAdd,
    "Price": priceAdd,
    "Description": descAdd,
    "Discount": discountAdd
  };

  const update_pd = {
    "ID": selectedProduct.id,
    "Name": nameUpdate,
    "Price": priceUpdate,
    "Description": descUpdate,
    "Discount": discountUpdate
  };


  // mở cửa sổ thêm mới sản phẩm
  const showDrawer = () => {
    setIsDrawerOpen(true);
    setDiscountAdd("0");
  };

  const hideDrawer = () => {
    setIsDrawerOpen(false);
    setNameAdd("");
    setPriceAdd("");
    setDescAdd("");
    setDiscountAdd("");
  };

  // mở cửa sổ cập nhật thông tin sản phẩm
  const showUpdate = (id) => {
    const product = insuranceType.find((item) => item.id === id);
    setSelectedProduct(product);
    setNameUpdate(product.name);
    setPriceUpdate(product.price);
    setDescUpdate(product.description);
    setDiscountUpdate(product.discount);
    setIsOpenUpdate(true);
  };

  const hideUpdate = () => {
    setIsOpenUpdate(false);
    setNameUpdate("");
    setPriceUpdate("");
    setDescUpdate("");
    setDiscountUpdate("");
  };

  // mở cửa sổ xóa sản phẩm
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
      drawerRef.current &&
      !drawerRef.current.contains(event.target) &&
      isDrawerOpen
    ) {
      hideDrawer();
    }
    if (
      updateRef.current &&
      !updateRef.current.contains(event.target) &&
      isOpenUpdate
    ) {
      hideUpdate();
    }
    if (
      deleteRef.current &&
      !deleteRef.current.contains(event.target) &&
      isOpenDelete
    ) {
      hideDelete();
    }
  };

  const [insuranceType, setInsuranceType] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7267/api/Insurance/get-insurance`);
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
    // Thêm sự kiện mousedown toàn cầu khi cửa sổ mở
    if (isDrawerOpen || isOpenUpdate || isOpenDelete) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup sự kiện khi component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDrawerOpen, isOpenUpdate, isOpenDelete]);

  // thực hiện thêm sản phẩm
  const handleAddProduct = (event) => {
    event.preventDefault();
    alert("Thêm sản phẩm thành công!");
    console.log(addNew);
    hideDrawer();
  }

  // thực hiện sửa thông tin sản phẩm
  const handleUpdateProduct = (event) => {
    event.preventDefault();
    alert("Cập nhật sản phẩm thành công!");
    console.log(update_pd);
    hideUpdate();
  }

  // thực hiện xóa sản phẩm
  const handleDeleteProduct = () => {
    alert("Xóa sản phẩm thành công!");
    console.log(idDelete);
    hideDelete();
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            All Products
          </Typography>
        </CardHeader>
        <div className="items-center justify-end mx-4 mb-4 block sm:flex md:divide-x md:divide-gray-100">
          <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none" 
                  type="button"
                  onClick={showDrawer}>
            Add new product
          </button>
        </div>
        <CardBody className="overflow-x-scroll max-h-[600px] px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead className="relative">
              <tr className="sticky top-[-5px] z-100 bg-white">
                {["id", "product name", "price", "Coverage Year", "actions"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-14 text-left"
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
                ({ insuranceId, insuranceName, priceAmount, coveragePeriodInYears}, key) => {
                  const className = `py-3 px-14 ${
                    key === insuranceType.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={insuranceId}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              #{insuranceId}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-gray-600">
                          {insuranceName}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                            variant="small"
                            className="text-xs font-medium text-gray-600"
                        >
                            {priceAmount}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                            variant="small"
                            className="text-xs font-medium text-gray-600"
                        >
                            {coveragePeriodInYears}
                        </Typography>
                      </td>
                      <td className="py-3 px-8 border-b border-blue-gray-50 space-x-2 whitespace-nowrap">
                        <button type="button" id="updateProductButton" data-drawer-target="drawer-update-product-default" data-drawer-show="drawer-update-product-default" aria-controls="drawer-update-product-default" data-drawer-placement="right" 
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
                            onClick={() => showUpdate(insuranceId)}>
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                            Update
                        </button>
                        <button type="button" id="deleteProductButton" data-drawer-target="drawer-delete-product-default" data-drawer-show="drawer-delete-product-default" aria-controls="drawer-delete-product-default" data-drawer-placement="right" 
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300"
                            onClick={() => showDelete(insuranceId)}>
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                            Delete item
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
      {/* truyền props cần thiết qua addProduct.jsx */}
      <AddProduct isOpen= {isDrawerOpen}
                   handleClose = {hideDrawer}
                   handleSubmit = {handleAddProduct}
                   drawerRef={drawerRef}
                   name = {nameAdd}
                   setName= {setNameAdd}
                   price = {priceAdd}
                   setPrice= {setPriceAdd}
                   desc = {descAdd}
                   setDesc= {setDescAdd}
                   discount= {discountAdd}
                   setDiscount= {setDiscountAdd}
                   />
      {/* truyền props cần thiết qua updateProduct.jsx */}
      <UpdateProduct isOpen= {isOpenUpdate}
                   handleClose = {hideUpdate}
                   handleSubmit = {handleUpdateProduct}
                   updateRef={updateRef}
                   id = {selectedProduct.id}
                   name = {nameUpdate}
                   setName= {setNameUpdate}
                   price = {priceUpdate}
                   setPrice= {setPriceUpdate}
                   desc = {descUpdate}
                   setDesc= {setDescUpdate}
                   discount= {discountUpdate}
                   setDiscount= {setDiscountUpdate}
                   />
      {/* truyền props cần thiết qua deleteProduct.jsx */}
      <DeleteProduct isOpen= {isOpenDelete}
                   handleClose = {hideDelete}
                   handleSubmit = {handleDeleteProduct}
                   deleteRef={deleteRef}
                   id= {idDelete}
                   />
    </div>
  );
}

export default Products;
