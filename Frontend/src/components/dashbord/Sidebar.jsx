
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
=======
import React, { useEffect } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { IoAlbumsOutline, IoDocumentTextSharp, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout, getAuth } from "../../redux/slice/authSlice";
import axios from "axios";
import { base_url } from "../../base_url";
import { useState } from "react";
import LogoutModal from "./components/LogoutModal";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(getAuth);

  const [showLogout, setShowLogout] = useState(false);

  //  Dynamically set document title
  useEffect(() => {
    const routeTitleMap = {
      "/": "Dashboard",
      "/all-products": "All Products",
      "/order-list": "Order List",
    };
    document.title = routeTitleMap[location.pathname] || "Admin Panel";
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${base_url}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(logout());
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const menuItems = [
    { icon: <MdOutlineDashboard className="text-2xl" />, label: "Dashboard", redirectTo: "/" },
    { icon: <IoAlbumsOutline className="text-2xl" />, label: "All Products", redirectTo: "/all-products" },
    { icon: <IoDocumentTextSharp className="text-2xl" />, label: "Order List", redirectTo: "/order-list" },
  ];

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 shadow-lg p-4 bg-white flex flex-col">
      <h2 className="text-xl font-bold mb-2">Admin Sidebar</h2>
      <p className="text-sm text-gray-500 mb-4">Welcome, {user?.username || "Admin"}</p>

      <ul className="space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.redirectTo;
          return (
            <li
              key={index}
              onClick={() => navigate(item.redirectTo)}
              className={`p-2 flex items-center gap-2 rounded-md cursor-pointer 
                ${isActive ? "bg-[#003F62] text-white" : "hover:bg-[#003F62] hover:text-white"}`}
            >
              {item.icon}
              {item.label}
            </li>
          );
        })}

        <li
          onClick={()=> setShowLogout(true)}
          className="p-2 flex items-center gap-2 hover:text-white rounded-md hover:bg-red-600 cursor-pointer"
        >
          <IoLogOut className="text-2xl" />
          Log out
        </li>
      </ul>
      
      <LogoutModal isOpen={showLogout} onClose={() => setShowLogout(false)} onConfirm={handleLogout} />

    </aside>

    
  );
};

export default Sidebar;
