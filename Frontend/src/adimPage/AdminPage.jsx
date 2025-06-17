import React, { useEffect } from "react";
import Header from "../components/dashbord/Header";
import Sidebar from "../components/dashbord/Sidebar";
import { MdDateRange } from "react-icons/md";
import Chart from "../components/dashbord/Chart";

const AdminPage = ({ title = "Dashboard", component = null }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="flex ">
      <Sidebar />

      {/* Main content section with margin-left to prevent overlap */}
      <div className="flex-1 ml-64 min-h-screen bg-[#E7E7E3]">

      <div className="flex-1 ml-64 min-h-screen bg-[#E7E7E3] overflow-hidden">
        <Header />

        <main className="p-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-1">
              <p>Home</p>
              <p>{">"}</p>
              <p>{title}</p>
            </div>
            {/* <p className="flex items-center gap-2">
              <MdDateRange className="text-2xl" /> Oct 11, 2023 - Nov 11, 2023
            </p> */}
          </div>

          {/* If component is passed, render it */}
          {component || (
            <>
              {/* Default Dashboard content */}
              <section className="p-2 mt-5 flex flex-wrap gap-4">
                {/* Card content here */}
              </section>
              <section className="y-6">
                <Chart className="-z-50" />
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
