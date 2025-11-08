import {
  HomeIcon,
  UserCircleIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ArchiveBoxIcon,
  UserIcon, 
  BuildingOfficeIcon,
  ArrowUturnLeftIcon
} from "@heroicons/react/24/solid";
import { Home, Products, Customers, Employees } from "./pages/dashboard";
import HomePage from "../HomePage/HomePage";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <ArchiveBoxIcon {...icon} />,
        name: "products",
        path: "/products",
        element: <Products />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "customers",
        path: "/customers",
        element: <Customers />,
      },
      {
        icon: <BuildingOfficeIcon {...icon} />,
        name: "users",
        path: "/employees",
        element: <Employees />,
      },
    ],
  },
  {
    title: "Chuyển hướng",
    pages: [
      {
        icon: <ArrowUturnLeftIcon {...icon} />,
        name: "Trang chủ",
        path: "/",
        element: <HomePage />,
      }
    ],
  },
];

export default routes;
