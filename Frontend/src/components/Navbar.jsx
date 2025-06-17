import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AiOutlineMenu } from "react-icons/ai";
import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeWishList, getWishList } from "../redux/slice/WishlistSlice";
import WishList from "./wishlist";
import { getCart, removeCartItem } from "../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import { logout } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { base_url } from "../base_url";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [showWishList, setShowWishList] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { user, loading } = useSelector((state) => state.auth);
const navigate = useNavigate();
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

const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    await axios.post(
      `${base_url}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login"); // use navigate here, not useNavigate
  } catch (err) {
    console.error("Logout failed", err);
  }
};

  return (
    <header className="fixed w-full p-4 z-50 bg-[#2F3448] h-16 flex items-center shadow-md">
      <nav className="flex items-center justify-between w-full mx-auto  ">
        <a href="/" className="p-4">
          <h1 className="text-white text-2xl shadow-md hover:text-white/45">
            Case
          </h1>
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
              <Link to={"/cart"}>
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
              </Link>

              {/* Wish List Button */}
              <button
                onClick={toggleWishList}
                className=" text-white text-2xl hover:text-white/45 relative "
              >
                <MdFavoriteBorder
                  className={`${
                    wishListItems.length > 0 ? "text-blue-400" : "text-white"
                  }`}
                />
              </button>

              {!user && !loading ? (
                <Link to={"/login"}>
                  <button className=" w-full h-10 px-12  rounded-md bg-slate-800 text-lg text-white font-bold  hover:bg-slate-400 border-2 ">
                    Login
                  </button>
                </Link>
              ) : (
                <button onClick={handleLogout} className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1">
                  <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                    <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>
                  <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    Logout
                  </div>
                </button>
              )}

              {/* {showCart && (
                <Cart
                  addCartItem={cartItems} // Pass the correct Redux state
                  handleRomoveCart={handleRomoveCart}
                  closeCart={closeCart}
                />
              )} */}

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
                onClick={() => setIsOpen(false)}
                className="text-white text-2xl hover:text-white/45"
              >
                <IoCartOutline />
              </button>
          {!user && !loading ? (
            <>
             
              <Link to="/register">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-[10rem] h-12 px-16 rounded-md bg-slate-800 text-lg hover:bg-slate-400"
                >
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-[10rem] h-12 px-16 rounded-md bg-slate-800 text-lg hover:bg-slate-400"
                >
                  Login
                </button>
              </Link>
            </>
          ) : null}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
