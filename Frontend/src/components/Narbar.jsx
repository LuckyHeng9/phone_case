import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeWishList, getWishList } from "../redux/slice/WishlistSlice";
import WishList from "./wishlist";
import { getCart, removeCartItem } from "../redux/slice/cartSlice";
import Cart from "./Cart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [showWishList, setShowWishList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const dispatch = useDispatch();
  const wishListItems = useSelector(getWishList);
  const cartItems = useSelector(getCart); // Ensure this works and matches your Redux state

  // Calculate total quantity of items in the cart based on each product's quantity
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Handle remove wish item
  const handleRemoveWishList = (id) => {
    dispatch(removeWishList(id));
  };

  // Handle remove cart item
  const handleRomoveCart = (id) => {
    dispatch(removeCartItem(id));
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleWishList = () => {
    setShowWishList(!showWishList);
  };

  const toggleCartList = () => {
    setShowCart(!showCart);
  };

  const closeWishList = () => {
    setShowWishList(false);
  };

  const closeCart = () => {
    setShowCart(false);
  };

  return (
    <header className="fixed w-full p-4 z-50 bg-[#2F3448] h-16 flex items-center shadow-md">
      <nav className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        <a href="#" className="p-4">
          <h1 className="text-white text-2xl shadow-md hover:text-white/45">Case</h1>
        </a>
        <button
          onClick={toggleMenu}
          className="md:hidden text-white absolute right-4 text-2xl z-20"
        >
          {isOpen ? <MdOutlineClose /> : <AiOutlineMenu />}
        </button>
        <ul className="flex items-center space-x-4">
          <li className="hidden lg:flex items-center gap-4">
            <div className="relative flex items-center">
              <input
                type="text"
                className="bg-gray-100 text-black rounded p-1 outline-none"
                placeholder="Search..."
              />
              <CiSearch className="absolute right-0 text-black text-xl" />
            </div>
            <div className="relative flex items-center gap-6">
              <button
                onClick={toggleCartList}
                className="text-white text-2xl hover:text-white/45"
              >
                <IoCartOutline />
                {/* Display quantity if greater than 0 */}
                {totalQuantity > 0 && (
                  <span className="absolute -top-4 left-6 text-blue-100 text-[1rem] font-semibold">
                    {totalQuantity}
                  </span>
                )}
              </button>

              {/* Wish List Button */}
              <button
                onClick={toggleWishList}
                className=" text-white text-2xl hover:text-white/45 relative "
              >
                <MdFavoriteBorder className={`${wishListItems.length > 0 ? 'text-blue-400' : 'text-white'}`}/>
              </button>

              {showCart && (
                <Cart
                  addCartItem={cartItems} // Pass the correct Redux state
                  handleRomoveCart={handleRomoveCart}
                  closeCart={closeCart}
                />
              )}

              {/* Wish List Dropdown */}
              {showWishList && (
                <WishList
                  wishListItems={wishListItems}
                  handleRemoveWishList={handleRemoveWishList}
                  closeWishList={closeWishList}
                />
              )}
            </div>
          </li>
        </ul>
        <button className="mr-7 lg:hidden text-white text-2xl hover:text-white/45">
          <CiSearch />
        </button>
      </nav>

      {/* Side Menu (Mobile) */}
      <div
        className={`absolute top-0 right-0 w-2/3 h-screen bg-[#3e3e55] transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <ul className="flex flex-col items-center py-16 px-3 relative top-6 text-white gap-4">
          <button
            onClick={() => setIsOpen(false)} // Close the mobile menu
            className="text-white text-2xl hover:text-white/45"
          >
            <IoCartOutline />
          </button>
          <button
            onClick={() => setIsOpen(false)} // Close the menu on Register click
            className="w-full h-12 rounded-md bg-slate-800 text-lg hover:bg-slate-400"
          >
            Register
          </button>
          <button
            onClick={() => setIsOpen(false)} // Close the menu on Login click
            className="w-full h-12 rounded-md bg-slate-800 text-lg hover:bg-slate-400"
          >
            Login
          </button>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
