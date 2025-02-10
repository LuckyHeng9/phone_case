import React, { useEffect } from "react";
import img0 from "../assets/img0.jpeg";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCartItemQuantity,
  calculateTotalPrice,
  getTotalPrice,
} from "../redux/slice/cartSlice";
import { Link } from "react-router-dom";

const CartPage = ({ addCartItem, handleRomoveCart }) => {
  const dispatch = useDispatch();
  const totalPrice = useSelector(getTotalPrice);

  // Function to increase the quantity
  const increaseQuantity = (id) => {
    dispatch(updateCartItemQuantity({ id, quantity: 1 }));
    dispatch(calculateTotalPrice()); // Recalculate total price
  };

  // Function to decrease the quantity
  const decreaseQuantity = (id) => {
    dispatch(updateCartItemQuantity({ id, quantity: -1 }));
    dispatch(calculateTotalPrice()); // Recalculate total price
  };

  // Recalculate total price when the cart changes
  useEffect(() => {
    dispatch(calculateTotalPrice());
  }, [addCartItem, dispatch]);

  return (
    <div className="relative w-full h-[100vh] bg-gray-100 pt-10 overflow-auto">
      {/* Header Section */}

      {/* Product Cart Section */}
      {addCartItem.length > 0 ? (
        <div className="w-full flex flex-wrap  overflow-auto gap-8">
          <div className="flex items-center justify-center w-full h-16 bg-white shadow-md">
            <h1 className="text-black text-2xl font-semibold">
              Add to Cart
              <span className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#272B3B] text-white text-sm">
                {addCartItem.length}
              </span>
            </h1>
          </div>
          {/* Map through cart items */}
          {addCartItem.map((item) => (
            <div
              key={item.id}
              className="w-[55%] flex items-center justify-between bg-white p-5 shadow-lg rounded-lg"
            >
              {/* Product List */}
              <div className="flex space-x-4 border-b pb-4">
                <img
                  src={item.image || img0} // Use item.image or a default image
                  alt={item.name}
                  className="h-56 object-cover rounded-lg"
                />
                <div className="flex flex-col gap-y-4 mt-5">
                  <p className="text-xl font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.model}</p>
                  <p className="text-sm text-gray-500">Color: {item.color}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center gap-x-2 border-2 border-gray-400 rounded-lg">
                    <button
                      className="px-4 py-2 rounded-lg hover:bg-gray-300"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      className="px-4 py-2 rounded-lg hover:bg-gray-300"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              {/* Container for Delete Icon and Price */}
              <div className="flex flex-col items-end justify-between gap-y-36 flex-grow">
                {/* Delete Icon */}
                <button onClick={() => handleRomoveCart(item.id)}>
                  <MdOutlineDeleteOutline className="text-2xl hover:text-red-800" />
                </button>
                {/* Price */}
                <p className="text-sm text-gray-500 font-semibold">
                  ${item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center p-10">
          <p className="text-gray-500 text-xl">Your cart is empty.</p>
        </div>
      )}

      {/* Total Price Section */}
      {addCartItem.length > 0 && (
        <div className="absolute top-36 right-28 w-[25rem] flex flex-col gap-5 bg-white p-6 shadow-lg">
          {/* Map through cart items to show individual prices */}
          <ul>
            {addCartItem.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center text-sm py-2"
              >
                <span>{item.title}</span>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>

          <hr className="border border-gray-300" />
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total Price</h2>
            <p className="text-xl font-semibold">${totalPrice}</p>
          </div>
          <Link to={"/checkout"}>
            <button className="w-full mt-4 bg-[#272B3B] text-white py-2 rounded-lg hover:bg-[#3e445e]">
              Continue to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
