import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 shadow-lg bg-white flex flex-col p-6 justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-8 text-[#003F62] border-b pb-2">
          Admin Sidebar
        </h2>
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors
                ${isActive("/admin/dashboard") ? "bg-[#003F62] text-white" : "text-gray-700 hover:bg-[#003F62] hover:text-white"}`}
            >
              <i className="bi bi-speedometer2 text-xl"></i>
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/product"
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors
                ${isActive("/admin/product") ? "bg-[#003F62] text-white" : "text-gray-700 hover:bg-[#003F62] hover:text-white"}`}
            >
              <i className="bi bi-box-seam text-xl"></i>
              All Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors
                ${isActive("/admin/orders") ? "bg-[#003F62] text-white" : "text-gray-700 hover:bg-[#003F62] hover:text-white"}`}
            >
              <i className="bi bi-card-checklist text-xl"></i>
              Order List
            </Link>
          </li>
          <li>
            <Link
              to="/admin/customers"
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors
                ${isActive("/admin/customers") ? "bg-[#003F62] text-white" : "text-gray-700 hover:bg-[#003F62] hover:text-white"}`}
            >
              <i className="bi bi-people text-xl"></i>
              Customers
            </Link>
          </li>
          <li>
            <Link
              to="/admin/reports"
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors
                ${isActive("/admin/reports") ? "bg-[#003F62] text-white" : "text-gray-700 hover:bg-[#003F62] hover:text-white"}`}
            >
              <i className="bi bi-file-earmark-text text-xl"></i>
              Reports
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings"
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors
                ${isActive("/admin/settings") ? "bg-[#003F62] text-white" : "text-gray-700 hover:bg-[#003F62] hover:text-white"}`}
            >
              <i className="bi bi-gear text-xl"></i>
              Settings
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <button
          onClick={() => {
            // Add logout logic here or navigate to logout page
            alert("Logging out...");
            // Example: window.location.href = '/logout';
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-gray-700 hover:bg-[#003F62] hover:text-white w-full"
        >
          <i className="bi bi-box-arrow-right text-xl"></i>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
