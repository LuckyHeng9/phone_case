import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="fixed w-full p-4 z-10 bg-[#2F3448] h-16 flex items-center shadow-md">
            <nav className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
                <a href="#" className="p-4">
                    <h1 className="text-white text-2xl shadow-md hover:text-white/45">Case</h1>
                </a>
                <button onClick={toggleMenu} className="md:hidden text-white absolute right-4 text-2xl z-20">
                    {isOpen ? <MdOutlineClose /> : <AiOutlineMenu />}
                </button>
                <ul className="flex items-center space-x-4">
                    <li className="hidden lg:flex items-center">
                        <div className="flex items-center">
                            <input
                                type="text"
                                className="bg-gray-100 text-black rounded p-1 outline-none"
                                placeholder="Search..."
                            />
                            <CiSearch className="mr-5 text-white text-xl" />
                        </div>
                        <button className="text-white text-2xl hover:text-white/45">
                            <IoCartOutline />
                        </button>
                    </li>
                </ul>
                <button className="mr-7 lg:hidden text-white text-2xl hover:text-white/45"><CiSearch /></button>
            </nav>

            {/* Side Menu (Mobile) */}
            <div className={`absolute top-0 right-0 w-2/3 h-screen bg-[#3e3e55] transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                <ul className="flex flex-col items-center py-16 px-3 relative top-6 text-white gap-4">
                    <button className="text-white text-2xl hover:text-white/45">
                        <IoCartOutline />
                    </button>
                    <button className="w-full h-12 rounded-md bg-slate-800 text-lg hover:bg-slate-400">Register</button>
                    <button className="w-full h-12 rounded-md bg-slate-800 text-lg hover:bg-slate-400">Login</button>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
