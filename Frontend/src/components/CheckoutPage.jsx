import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getCart, getTotalPrice } from "../redux/slice/cartSlice";
import img0 from "../assets/img0.jpeg";
import SuccesPage from "./SuccesPage";

const CheckoutPage = () => {
  const [showPayment, setShowPayment] = useState(false); // State to toggle views
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // Track the selected payment method
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Track if payment was successful
  const cartItems = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);

  const handleContinueToPayment = () => {
    setShowPayment(true); // Toggle to show payment section
  };

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value); // Update selected payment method
  };

  // Define the button label based on the selected payment method
  const getPaymentButtonLabel = () => {
    if (selectedPaymentMethod === "Credit Card") {
      return "Pay with Credit Card";
    }
    if (selectedPaymentMethod === "PayPal") {
      return "Pay with PayPal";
    }
    if (selectedPaymentMethod === "ABA") {
      return "Pay with ABA";
    }
    return "Pay Now"; // Default text when no method is selected
  };

  // Handle payment success logic
  const handlePaymentSuccess = () => {
    setPaymentSuccess(true); // Set payment success to true
  };

  return (
    <div className="w-full h-[100vh] p-6 flex flex-col items-center bg-white">
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl">
        {/* Checkout Form (Contact Information) */}
        {!showPayment && (
          <div className="w-full lg:w-2/3 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-xl font-bold mb-4 text-[#272B3B]">
              Contact Information
            </h1>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Your number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              />
              {/* Shipping Address */}
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

        {/* Payment Section (Visible only when showPayment is true) */}
        {showPayment && !paymentSuccess && (
          <div className="w-[65%] max-w-5xl p-6 bg-white shadow-md rounded-lg mt-8">
            <h1 className="text-xl font-bold mb-4 text-[#272B3B]">Payment Info</h1>
            <form className="flex flex-col gap-4">
              {/* Payment Options */}
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="Credit Card"
                    onChange={handlePaymentMethodChange}
                  />
                  Credit card
                </label>
                {selectedPaymentMethod === "Credit Card" && (
                  <>
                    <input
                      type="text"
                      placeholder="Card number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Security code"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Expiry Date (MM/YYYY)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </>
                )}

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="PayPal"
                    onChange={handlePaymentMethodChange}
                  />
                  PayPal
                </label>
                {selectedPaymentMethod === "PayPal" && (
                  <input
                    type="text"
                    placeholder="PayPal Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                )}

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="ABA"
                    onChange={handlePaymentMethodChange}
                  />
                  ABA
                </label>
                {selectedPaymentMethod === "ABA" && (
                  <input
                    type="text"
                    placeholder="ABA Number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                )}
              </div>
            </form>
          </div>
        )}

        {/* Payment Success Section */}
        {paymentSuccess && (
         <SuccesPage/>
        )}

        {/* Order Summary (Always visible unless payment is successful) */}
        {!paymentSuccess && (
          <div className="w-full lg:w-1/3 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-xl font-bold mb-4 text-[#272B3B]">Order Summary</h1>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 border-b pb-4 mb-4"
                  >
                    <img
                      src={item.image || img0}
                      alt={item.name}
                      className="h-20 object-cover rounded-lg"
                    />
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="text-[1rem] font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.model}</p>
                      <p className="text-sm text-gray-500">Color: {item.color}</p>
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                    </div>
                    <div className="text-sm font-semibold flex-shrink-0">
                      ${item.price * item.quantity}
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center text-lg font-semibold mt-4">
                  <span>Total Price:</span>
                  <span>${totalPrice}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center">
                <p className="text-gray-500 text-xl">Your cart is empty.</p>
              </div>
            )}

            {/* Continue to Payment Button or Pay Now */}
            {!showPayment ? (
              <div
                className="flex items-center justify-center w-full mt-8 bg-[#272B3B] text-white py-2 rounded-lg hover:bg-[#3e445e] cursor-pointer"
                onClick={handleContinueToPayment}
              >
                Continue to Payment
              </div>
            ) : (
              <div
                className="flex items-center justify-center w-full mt-8 bg-[#272B3B] text-white py-2 rounded-lg hover:bg-[#3e445e] cursor-pointer"
                onClick={handlePaymentSuccess}
              >
                {getPaymentButtonLabel()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
