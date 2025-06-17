import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../redux/slice/cartSlice";
import {
  fetchProducts,
  getProducts,
  getProductLoading,
} from "../redux/slice/productSlice";

const ProductDetail = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const loading = useSelector(getProductLoading);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const product = products.find((item) => item._id === _id);

  const handleAddToCart = () => {
    dispatch(addCartItem(product));
  };

  return (
    <>
      {loading ? (
        <p className="text-center text-lg text-gray-600 mt-10">Loading...</p>
      ) : !product ? (
        <p className="text-center text-red-500 mt-10">Product not found.</p>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
            {/* Image Section */}
            <div className="md:w-1/2 w-full h-[300px] md:h-auto">
              <img
                src={product.image_path}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/300")
                }
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info Section */}
            <div className="p-6 md:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {product.title}
                </h2>
                <p className="text-lg text-green-600 font-semibold mb-4">
                  ${product.price}
                </p>
                <p className="text-gray-600 mb-6">{product.description || 'UnKnown'}</p>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
