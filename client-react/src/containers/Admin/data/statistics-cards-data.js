import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
  ListBulletIcon
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: UsersIcon,
    title: "Customer Accounts",
    value: "1200",
    footer: {
      color: "text-red-500",
      value: "*",
      label: "(Number of customer accounts)",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Employee accounts",
    value: "500",
    footer: {
      color: "text-red-500",
      value: "*",
      label: "(Number of Employee accounts",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "New Customers",
    value: "53",
    footer: {
      color: "text-red-500",
      value: "*",
      label: "(Number of new customer accounts registered today)",
    },
  },
  {
    color: "gray",
    icon: ListBulletIcon,
    title: "Insurance products",
    value: "20",
    footer: {
      color: "text-red-500",
      value: "*",
      label: "(Number of insurance products)",
    },
  },
];

export default statisticsCardsData;
