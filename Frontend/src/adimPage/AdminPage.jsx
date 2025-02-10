import React from "react";
import Header from "../components/dashbord/Header";
import Sidebar from "../components/dashbord/Sidebar";
import { MdDateRange } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoIosArrowRoundUp } from "react-icons/io";
import Chart from "../components/dashbord/Chart";


const AdminPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      {/* Main content section with margin-left to prevent overlap */}
      <div className="flex-1 ml-64 min-h-screen bg-[#E7E7E3]">
        <Header />
        <main className="p-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="cursor-pointer">
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center gap-1">
                <p>Home </p>
                <p>{">"}</p>
                <p>Dashboard</p>
              </div>
              <p className="flex items-center gap-2">
                <MdDateRange className="text-2xl" /> Oct 11, 2023 - Nov 11, 2023
              </p>
            </div>
          </div>

          {/* Dashboard Cards Section */}
          <section className="p-2 mt-5 flex items-center gap-12">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-[267px] h-[140px] shadow-md p-4 bg-white rounded-md">
                <div className="flex items-center justify-between">
                  <h1 className="font-bold">Total Orders</h1>
                  <HiOutlineDotsVertical className="cursor-pointer text-xl" />
                </div>
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#003F62] w-10 h-10 flex items-center justify-center">
                      <IoBagHandleOutline className="text-2xl text-white" />
                    </div>
                    <p className="font-semibold text-[1rem]">$1600</p>
                  </div>
                  <div className="flex items-center">
                    <IoIosArrowRoundUp className="text-2xl" />
                    <p>34.3%</p>
                  </div>
                </div>
                <div className="mt-1 flex justify-end">
                  <p className="text-[13px]">Compared to Oct 2023</p>
                </div>
              </div>
            ))}
          </section>

          {/* Sales Chart Section */}
          <section className="py-6">
            <Chart />
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;

