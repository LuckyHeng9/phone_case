import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { IoAlbumsOutline } from "react-icons/io5";
import { IoDocumentTextSharp } from "react-icons/io5";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen fixed top-0 left-0 shadow-lg p-4 bg-white flex flex-col">
      <h2 className="text-lg font-bold">Admin Sidebar</h2>
      <ul className="mt-4 space-y-2">
        <li className="p-2 flex items-center gap-2 hover:text-white rounded-md hover:bg-[#003F62] cursor-pointer">
          <MdOutlineDashboard />
          Dashboard
        </li>
        <li className="p-2 flex items-center gap-2 hover:text-white rounded-md hover:bg-[#003F62] cursor-pointer">
          <IoAlbumsOutline />
          All products
        </li>
        <li className="p-2 flex items-center gap-2 hover:text-white rounded-md hover:bg-[#003F62] cursor-pointer">
          <IoDocumentTextSharp />
          Order list
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
