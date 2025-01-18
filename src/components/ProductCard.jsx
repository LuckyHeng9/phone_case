import React from "react";
import { FaRegBookmark } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-[#272B3B] shadow-md rounded-lg w-56 h-[350px] ">
      {/* Product Image */}
      <img
        src={product.img}
        alt={product.title}
        className="w-full  mb-4"
      />
      
      <div className="p-2 ">
        {/* Product Details */}
      <div className="flex flex-col gap-1">
        <h2 className="text-white text-lg font-bold mb-1">{product.title}</h2>
        <p className="text-sm text-gray-500 mb-1">{product.model}</p>
        <p className="text-lg font-semibold text-white">{product.price}</p>
      </div>

      {/* Bookmark Icon */}
      <div className=" text-lg flex justify-end -mt-5 px-2">
        <FaRegBookmark className="text-white hover:text-blue-500 cursor-pointer" />
      </div>
      </div>
    </div>
  );
};

export default ProductCard;
