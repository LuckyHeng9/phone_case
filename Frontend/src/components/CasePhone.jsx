import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../base_url";
import AspectRatio from "react-aspect-ratio";
import cn from "classnames";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RarniQcrHes9YPOQsI0mGzKgxh0vV4rWnNwTofhMzHY5H5VyqXl4WxWpwcN0dEq4v8Kgw4md3OHqnvSPXtwnv1o003emjrmA0"
);

const CasePhone = () => {
  const [searchParams] = useSearchParams();
  const _id = searchParams.get("_id");
  const [designData, setDesignData] = useState(null);
  const [error, setError] = useState(null);

  const templates = [
    { name: "iPhone 13 Pro Max", src: "src/assets/phone-template.png" },
    { name: "Samsung Galaxy S23", src: "src/assets/S23_temp.png" },
    { name: "Google Pixel 7", src: "src/assets/google_pixel-template.png" },
  ];

  const getCasePhone = async () => {
    if (!_id) return setError("No design ID provided.");
    const token = localStorage.getItem("token");
    if (!token) return setError("Please log in to view designs.");

    try {
      const response = await axios.get(
        `${base_url}/case/get-case-design/${_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDesignData(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch design.");
    }
  };

  useEffect(() => {
    getCasePhone();
  }, [_id]);

  const selectedTemplate = templates.find(
    (template) => template.name === designData?.selectedTemplate
  );

  const backgroundColor = designData?.backgroundColor || "#fff";
  const imageUrl = designData?.imageUrl;

  const handleCheckOut = async () => {
    if (!designData) return setError("Design data not loaded.");
    try {
      const stripe = await stripePromise;
      const token = localStorage.getItem("token");

      const productsPayload = [
        {
          id: designData._id,
          name: "Custom Phone Case",
          price: designData.price,
          quantity: 1,
          image: designData.imageUrl,
          type: "custom",
          typeRef: "CustomCase",
        },
      ];

      const response = await axios.post(
        `${base_url}/payment/create-checkout-session`,
        { products: productsPayload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { sessionId } = response.data;
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        setError(result.error.message);
      }
    } catch (error) {
      console.error("Stripe payment error:", error);
      setError(error.response?.data?.message || "Payment failed.");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col md:flex-row gap-8 items-center">
        {/* Phone View (fixed size) */}
        <div className="relative w-60 aspect-[890/1831] pointer-events-none">
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-[5px] rounded-[32px] overflow-hidden",
              "bg-gray-900"
            )}
            style={{ backgroundColor }}
          >
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Design overlay"
                className="w-full h-full object-cover z-30"
              />
            )}
          </div>

          <AspectRatio
            ratio={896 / 1831}
            className="relative z-40 aspect-[896/1831] w-full"
          >
            <img
              src={selectedTemplate?.src}
              alt="Phone template"
              className="pointer-events-none z-40 select-none"
            />
          </AspectRatio>
        </div>

        {/* Info Panel */}
        <div className="w-full md:w-1/2 text-center md:text-left flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {designData?.selectedTemplate}
          </h2>
          <p className="text-gray-600">Price: {designData?.price}</p>
          <button
            onClick={handleCheckOut}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Checkout
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default CasePhone;
