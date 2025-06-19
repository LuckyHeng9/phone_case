import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slice/cartSlice";
import succes from "../assets/succes.png";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../base_url";

const SuccesPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [message, setMessage] = useState("Confirming your order...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setMessage("No session ID found. Unable to confirm order.");
      setLoading(false);
      return;
    }

    const confirmOrder = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.post(
          `${base_url}/payment/checkout-success`,
          { sessionId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setMessage(`Payment successful! Your order ID is ${res.data.orderId}`);
          dispatch(clearCart());
        } else {
          setMessage(res.data.message || "Payment not completed yet.");
        }
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Error confirming your order."
        );
      } finally {
        setLoading(false);
      }
    };

    confirmOrder();
  }, [sessionId, dispatch]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-[#272B3B] mb-2">Thank you for your order!</h1>
        <p className="text-lg text-gray-700 mb-1">
          Update information will be sent to: <strong>Loemhengsigle@gmail.com</strong>
        </p>
        <p className="text-lg text-gray-700 mb-1">
          The waiting period for the product will be 2 to 3 days.
        </p>
      </header>

      <main className="text-center mb-8">
        <div className="mb-4">
          <img src={succes} alt="Successful Payment" className="w-32 h-32 object-cover mx-auto" />
        </div>
        <p className={`text-lg font-semibold ${loading ? "text-gray-600" : "text-[#4BB543]"}`}>
          {message}
        </p>
      </main>

      <footer className="text-center">
        <Link to="/store">
          <button className="px-6 py-2 text-white bg-[#272B3B] rounded-lg hover:bg-[#3e445e] transition duration-200">
            Continue Shopping
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default SuccesPage;
