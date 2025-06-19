import React, { useState, } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getCart, getTotalPrice } from "../redux/slice/cartSlice";
import { clearCart } from "../redux/slice/cartSlice";
import img0 from "../assets/img0.jpeg";
import { Navigate, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { base_url } from "../base_url";
import { use } from "react";

const stripePromise = loadStripe("pk_test_51RarniQcrHes9YPOQsI0mGzKgxh0vV4rWnNwTofhMzHY5H5VyqXl4WxWpwcN0dEq4v8Kgw4md3OHqnvSPXtwnv1o003emjrmA0");

const CheckoutPage = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);
  const { user, loading } = useSelector((state) => state.auth);

  const handlePayment = async () => {
    if (!cartItems.length) {
      setErrorMessage("Your cart is empty.");
      return;
    }

    try {
      setLoadingPayment(true);
      const stripe = await stripePromise;
      const token = localStorage.getItem("token");

      const productsPayload = cartItems.map((item) => ({
        id: item._id || item.id,
        name: item.name || item.title,
        price: Number(item.price),
        quantity: Number(item.quantity),
        image: item.image_path || "",
        type: item.type || "product",
        typeRef: item.typeRef || "Product",
      }));

      const response = await axios.post(
        `${base_url}/payment/create-checkout-session`,
        {
          products: productsPayload,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/checkout`,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { sessionId } = response.data;
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        setErrorMessage(result.error.message);
      }
    } catch (error) {
      console.error("Stripe payment error:", error);
      setErrorMessage(error.response?.data?.message || "Payment failed.");
    } finally {
      setLoadingPayment(false);
    }
  };

  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }


  return (
    <div className="w-full min-h-screen p-6 flex flex-col items-center bg-white">
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl">
        {/* Contact Info Form */}
        {!showPayment && (
          <div className="w-full lg:w-2/3 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-xl font-bold mb-4 text-[#272B3B]">
              Contact Information
            </h1>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Your email"
                defaultValue={user?.email}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex flex-col gap-4">
                <h1 className="text-lg font-bold text-[#272B3B]">
                  Shipping Address
                </h1>
                <input
                  type="text"
                  placeholder="Full name"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Province"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>
          </div>
        )}

        {/* Order Summary */}
        <div className="w-full lg:w-1/3 p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-xl font-bold mb-4 text-[#272B3B]">
            Order Summary
          </h1>
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.id || item._id}
                  className="flex items-center justify-between gap-4 border-b pb-4 mb-4"
                >
                  <img
                    src={item.image_path || img0}
                    alt={item.name || item.title}
                    className="h-20 object-cover rounded-lg"
                  />
                  <div className="flex flex-col gap-1 flex-1">
                    <p className="text-[1rem] font-semibold">
                      {item.name || item.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-semibold flex-shrink-0">
                    ${Number(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center text-lg font-semibold mt-4">
                <span>Total Price:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center">
              <p className="text-gray-500 text-xl">Your cart is empty.</p>
            </div>
          )}

          {errorMessage && (
            <p className="text-red-500 text-center mt-2">{errorMessage}</p>
          )}

          {!showPayment ? (
            <button
              className="w-full mt-8 bg-[#272B3B] text-white py-2 rounded-lg hover:bg-[#3e445e]"
              onClick={() => setShowPayment(true)}
              disabled={loadingPayment}
            >
              Continue to Payment
            </button>
          ) : (
            <button
              className="w-full mt-8 bg-[#272B3B] text-white py-2 rounded-lg hover:bg-[#3e445e] disabled:opacity-60"
              onClick={handlePayment}
              disabled={loadingPayment}
            >
              {loadingPayment ? "Processing..." : "Pay Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
