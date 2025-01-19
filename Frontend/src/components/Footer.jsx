import React from "react";
import { MdFacebook } from "react-icons/md";
import { FaSquareInstagram } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="w-full h-24 flex items-center justify-between p-2 lg:p-6 bg-[#2F3448] text-white">
      <div>
        <h4 className="font-bold">Need Help ?</h4>
        <p>Copyright @</p>
      </div>
      <div className="flex flex-col">
        <h3 className="text-center font-bold">Contact us</h3>
        <div className="flex flex-col text-sm">
          <div className="flex items-center">
            <CiMail />
            <p>Leomhengnotsingle@gmail.com</p>
          </div>
          <div className="flex items-center">
            <CiMail />
            <p>Menglysadksk@gmail.com</p>
          </div>
        </div>
      </div>

      <div className=" cursor-pointer">
        <h3 className="text-sm font-bold">Social media</h3>
        <div className="flex space-x-3 px-5 py-4 text-lg">
          <MdFacebook />
          <FaSquareInstagram />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
