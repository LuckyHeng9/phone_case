// src/adimPage/OrderList.jsx
import React from "react";
import Sidebar from "../components/dashbord/Sidebar";

const OrderList = () => {
  // For demo, static orders data
  const orders = [
    { id: "1", customer: "John Doe", total: 120, status: "Pending" },
    { id: "2", customer: "Jane Smith", total: 240, status: "Completed" },
    { id: "3", customer: "Alex Johnson", total: 60, status: "Canceled" },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full min-h-screen bg-[#E7E7E3]">
        <h1 className="text-2xl font-bold mb-4">Order List</h1>
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-[#003F62] text-white">
              <th className="py-2 px-4 text-left">Order ID</th>
              <th className="py-2 px-4 text-left">Customer</th>
              <th className="py-2 px-4 text-left">Total ($)</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-100 cursor-pointer">
                <td className="py-2 px-4">{order.id}</td>
                <td className="py-2 px-4">{order.customer}</td>
                <td className="py-2 px-4">{order.total}</td>
                <td className="py-2 px-4">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default OrderList;
