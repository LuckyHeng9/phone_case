import React, { useRef, useState } from "react";
import { PiUploadSimple } from "react-icons/pi";
import { base_url } from "../../../base_url";
import axios from "axios";

const AddProduct = () => {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
    }
    e.target.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !title || !description || !price) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("inStock", true);
    formData.append("requiresDelivery", true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${base_url}/products/addProducts`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("✅ Product added:", response.data.product);
        setSuccessMessage("🎉 Product added successfully!");
        setTitle("");
        setDescription("");
        setPrice("");
        setImage(null);
      }
    } catch (error) {
      console.error("❌ Failed to add product:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
      <div className="bg-slate-900 shadow-2xl rounded-2xl w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Add New Phone Case
        </h2>

        {successMessage && (
          <div className="mb-4 text-green-400 font-semibold text-center">
            {successMessage}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter product name"
              className="w-full px-4 py-2 bg-slate-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Description
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="w-full px-4 py-2 bg-slate-800 text-white border border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Price ($)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-4 py-2 bg-slate-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Upload Image
            </label>
            <div
              onClick={handleFileClick}
              className="w-full flex items-center gap-3 cursor-pointer bg-slate-800 border border-dashed border-gray-500 rounded-lg p-4 hover:border-blue-500 transition"
            >
              <PiUploadSimple className="text-white text-2xl" />
              <span className="text-white">Click to upload image</span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {image && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-500"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Submitting..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
