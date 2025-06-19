import React from "react";
import { useSelector } from "react-redux";
import {
  FaShoppingCart,
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const DashboardCards = () => {
  const cardStats = useSelector((state) => state.dashboard);

  const stats = [
    {
      title: "Total Orders",
      value: cardStats.totalOrders,
      icon: <FaShoppingCart size={24} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Products",
      value: cardStats.totalProducts,
      icon: <FaBoxOpen size={24} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Active Orders",
      value: cardStats.activeOrders,
      icon: <FaClock size={24} />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Completed Orders",
      value: cardStats.completedOrders,
      icon: <FaCheckCircle size={24} />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-2 ml-16">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between"
        >
          <div className="flex items-center gap-3">
            <div className={`${item.color} p-2 rounded-full`}>
              {item.icon}
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">{item.value}</p>
            <p className="text-sm text-gray-500">This Month</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
