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
