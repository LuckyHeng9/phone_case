// models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
    requiresDelivery: {
      type: Boolean,
      required: true,
    },
    image_path: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Product", ProductSchema); // Export the model
