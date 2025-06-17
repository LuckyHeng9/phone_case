import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { base_url } from "../../../base_url";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${base_url}/products/get-all-products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error.response?.data || error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${base_url}/products/delete-product/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${base_url}/products/update-product/${editingProduct._id}`,
        editingProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts((prev) =>
        prev.map((p) => (p._id === editingProduct._id ? editingProduct : p))
      );
      setEditingProduct(null); // close modal
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 min-h-screen bg-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">All Products</h1>
        <button
          onClick={() => navigate("/add-product")}
          className="bg-[#272B3B] text-white px-4 py-2 rounded-md hover:bg-[#3e445e] transition"
        >
          + Add New Product
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">No products available.</p>
      ) : (
        <div className="bg-slate-100  grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="w-[22rem] h-[26rem] flex flex-col  rounded-xl shadow-md hover:shadow-lg transition p-4"
            >
             
             <div className="mb-4 flex items-center justify-center ">
               <img
                src={product.image_path}
                alt={product.title}
                className="h-[15rem] object-cover rounded-md mb-3"
              />
             </div>
              <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
              <p className="text-sm text-gray-600">${product.price}</p>
              <p
                className={`text-sm mt-1 ${
                  product.inStock ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm transition"
                >
                  <FiEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                type="text"
                name="title"
                value={editingProduct.title}
                onChange={handleChange}
                placeholder="Product Title"
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-2 border rounded"
              />
              <select
                name="inStock"
                value={editingProduct.inStock ? "true" : "false"}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    inStock: e.target.value === "true",
                  })
                }
                className="w-full p-2 border rounded"
              >
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
