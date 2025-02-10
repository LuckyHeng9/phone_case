import React from "react";
import { useParams } from "react-router-dom";
import img0 from "../assets/img0.jpeg"; // Import the image if it's in src/assets
import { useDispatch } from "react-redux";
import { addCartItem } from "../redux/slice/cartSlice"; // Import the action to add to cart

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = {
    id,
    title: "Red Flame Case",
    model: "iPhone 16 Pro",
    price: 10,
    img: img0, // Use the imported image
  };

  // Function to handle adding product to the cart
  const handleAddToCart = () => {
    dispatch(addCartItem(product)); // Dispatch action to add item to cart
  };

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {/* Product Image */}
        <div className="flex items-center justify-center mb-6">
          <img
            src={product.img}
            onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
            alt={product.title}
            className="rounded-lg object-cover w-full"
          />
        </div>

        {/* Product Details */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
        <p className="text-gray-500 text-sm mb-4">{product.model}</p>
        <p className="text-xl font-semibold text-gray-700 mb-6">${product.price}</p>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleAddToCart} // Call the function when clicked
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
