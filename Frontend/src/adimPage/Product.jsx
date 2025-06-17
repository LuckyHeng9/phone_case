import React from "react";
import Sidebar from "../components/dashbord/Sidebar";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const products = [
    { id: 1, name: "Smartphone X", category: "Electronics", price: "$799", stock: 23 },
    { id: 2, name: "Running Shoes", category: "Footwear", price: "$120", stock: 48 },
    { id: 3, name: "Wireless Headphones", category: "Accessories", price: "$199", stock: 15 },
  ];

  return (
    <div className="flex bg-[#F4F4F2]">
      <Sidebar />
      <main className="ml-64 p-8 w-full bg-white min-h-screen shadow-inner rounded-tl-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-semibold text-gray-800">All Products</h1>
          <Link
            to="/admin/product/add"
            className="px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
          >
            + Add New Product
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-gray-700 text-sm font-medium">
              <tr>
                <th className="px-6 py-3 text-left">Product Name</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4 text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 text-green-700 font-semibold">{product.price}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
