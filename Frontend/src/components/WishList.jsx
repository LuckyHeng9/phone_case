import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteOutline, MdOutlineCancel } from "react-icons/md";

const WishList = ({ wishListItems, handleRemoveWishList, closeWishList }) => {
  const navigate = useNavigate();

  const handleToCart = (product) => {
    closeWishList();
    
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="absolute -top-5 -right-4 w-[30rem] h-screen overflow-scroll bg-white shadow-lg rounded-md p-4 z-50">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold mb-3 text-gray-800">Wish List</h3>
        <button
          onClick={closeWishList}
          className="text-3xl hover:text-gray-400"
        >
          <MdOutlineCancel />
        </button>
      </div>

      {wishListItems.length > 0 ? (
        <ul className="space-y-3">
          {wishListItems.map((product) => (
            <li
              key={product._id}
              onClick={() => handleToCart(product)}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
            >
              <img
                src={product.image_path}
                alt={product.title}
                className="w-[5rem] h-[5rem] object-cover rounded"
              />
              <div className="flex flex-col gap-1">
                <p className="text-gray-700 text-lg">{product.title}</p>
                <p className="text-gray-500 text-md">${product.price}</p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent <li> onClick from firing
                    handleRemoveWishList(product._id);
                  }}
                  className="text-2xl text-red-600 hover:text-red-800"
                >
                  <MdOutlineDeleteOutline />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">No items in your wish list.</p>
      )}
    </div>
  );
};

export default WishList;
