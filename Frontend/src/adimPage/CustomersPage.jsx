import React from "react";
import Sidebar from "../components/dashbord/Sidebar";
import Header from "../components/dashbord/Header";

const CustomersPage = () => {
  return (
    <div className="flex bg-[#F4F4F2]">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        <main className="flex-grow p-8 bg-white rounded-tl-3xl shadow-inner">
          <div className="mb-8 border-b pb-4">
            <h1 className="text-4xl font-semibold text-gray-800">Customers</h1>
            <p className="text-gray-600 mt-2">Manage and view your customer list</p>
          </div>

          {/* Sample card layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((id) => (
              <div
                key={id}
                className="p-6 bg-[#F9FAFB] rounded-xl shadow hover:shadow-md transition-shadow duration-300"
              >
                <h2 className="text-lg font-bold text-gray-700">Customer Name</h2>
                <p className="text-sm text-gray-500">email@example.com</p>
                <p className="mt-2 text-xs text-gray-400">Joined: 2025-06-17</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomersPage;
