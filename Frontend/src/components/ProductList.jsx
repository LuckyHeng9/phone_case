// components/ProductList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import {
  fetchProducts,
  getProducts,
  getProductLoading,
  getProductError,
} from "../redux/slice/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
  const loading = useSelector(getProductLoading);
  const error = useSelector(getProductError);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="text-white">Loading products...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="flex gap-8 flex-wrap px-20 py-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
