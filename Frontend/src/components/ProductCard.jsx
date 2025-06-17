import React from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addWishList, removeWishList, getWishList } from "../redux/slice/WishlistSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(getWishList);
  const navigate = useNavigate();

  const isWishProduct = wishlist.some((item) => item._id === product._id);

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    console.log(product._id);
    isWishProduct
      ? dispatch(removeWishList(product._id))
      : dispatch(addWishList(product));
  };

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-[#1F2430] shadow-lg rounded-2xl w-60 h-[370px]  cursor-pointer hover:scale-105 transition-transform duration-200"
    >
      {/* Product Image */}
      <div className="w-full h-[16rem] overflow-hidden rounded-t-2xl bg-white">
        <div className="w-full h-full flex items-center justify-center">
          <img
          src={product.image_path}
          alt={product.title}
          className="h-full object-cover"
        />
        </div>
      </div>

      <div className="relative p-4 flex flex-col justify-between  ">
        {/* Product Details */}
        <div className="mb-3">
          <h2 className="text-white text-md font-semibold truncate">
            {product.title || "Untitled"}
          </h2>
          <p className="text-gray-400 text-sm truncate">{product.model || "Unknown model"}</p>
          <p className="text-white text-lg font-bold mt-1">${product.price ?? "0.00"}</p>
        </div>

        {/* Bookmark */}
        <div className="absolute right-4 bottom-4">
          <button
            onClick={handleBookmarkClick}
            className="focus:outline-none"
            title={isWishProduct ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isWishProduct ? (
              <FaBookmark className="text-blue-500 text-xl" />
            ) : (
              <FaRegBookmark className="text-white hover:text-blue-400 text-xl" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
