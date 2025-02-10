import React from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { addWishList, removeWishList, getWishList } from "../redux/slice/WishlistSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(getWishList);
  const navigate = useNavigate(); // Initialize useNavigate

  // Check if the product is already in wish list
  const isWishProduct = wishlist.some((item) => item.id === product.id);

  const handleBookmarkClick = (e) => {
    e.stopPropagation(); // Prevent triggering navigation when clicking the bookmark
    if (isWishProduct) {
      dispatch(removeWishList(product.id));
    } else {
      dispatch(addWishList(product));
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`); // Navigate to the single product detail page
  };

  return (
    <div
      onClick={handleCardClick} // Make the entire card clickable
      className="bg-[#272B3B] shadow-md rounded-lg w-56 h-[350px] cursor-pointer"
    >
      {/* Product Image */}
      <img src={product.img} alt={product.title} className="w-full mb-4" />

      <div className="p-2">
        {/* Product Details */}
        <div className="flex flex-col gap-1">
          <h2 className="text-white text-lg font-bold mb-1">{product.title}</h2>
          <p className="text-sm text-gray-500 mb-1">{product.model}</p>
          <p className="text-lg font-semibold text-white">${product.price}</p>
        </div>

        {/* Bookmark Icon */}
        <div className="text-lg flex justify-end -mt-5 px-2">
          <button
            onClick={handleBookmarkClick} // Only trigger this function
            className="focus:outline-none"
          >
            {isWishProduct ? (
              <FaBookmark className="text-blue-500 cursor-pointer" />
            ) : (
              <FaRegBookmark className="text-white hover:text-blue-500 cursor-pointer" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
