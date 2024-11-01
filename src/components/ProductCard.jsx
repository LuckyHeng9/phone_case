// src/components/ProductCard.js
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64 ">
      <img 
        src={product.img} 
        alt={product.title} 
        className=" w-full object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-bold mb-1">{product.title}</h2>
      <p className="text-sm text-gray-500 mb-2">{product.model}</p>
      <p className="text-sm text-gray-500 mb-4">{product.type}</p>
      <p className="text-lg font-semibold text-blue-500">{product.price}</p>
      <button className="bg-blue-500 text-white rounded-lg mt-4 py-2 px-4 w-full hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
  
};

export default ProductCard;
