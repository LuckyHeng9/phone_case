import React from "react";
import { products } from "../constance/index.js";
import img8 from "../assets/img8.png"; // Adjust path as needed
import ProductList from "./ProductList.jsx";

const Store = () => {
  return (
    <div className="bg-white w-full absolute top-0">
      <div className="relative top-24 w-full lg:w-[90%] h-screen flex items-center shadow-md lg:mx-[70px] p-4 gap-10 lg:gap-72">
        <div>
          <img src={img8} alt="Product Display" className="w-80" />
        
        </div>
        <div>
          <h1 className="text-lg font-bold lg:text-3xl">
            BUY ANY PRODUCT ABOUT <br />
            CASE PHONE
          </h1>
          <button className="w-[140px] h-8 lg:w-[200px] lg:h-10 rounded-lg mt-14 lg:mt-32 bg-[#272B3B] text-white hover:bg-slate-400 transition-all">
            SHOP NOW
          </button>
        </div>
      </div>
      <div className="mx-auto mt-28">
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default Store;
