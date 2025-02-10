import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";

const Header = () => {
  return (
    <header className="py-4 px-8 shadow-lg bg-white flex justify-end items-center border-l border-gray-500">
      <nav>
        <ul className="flex items-center gap-8 text-2xl">
          <li className="hover:text-blue-600 cursor-pointer"><CiSearch/></li>
          <li className="hover:text-blue-600 cursor-pointer"><IoMdNotifications/></li>
          <li className="hover:text-blue-600 cursor-pointer border-2 border-gray px-4 py-2">admin</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
