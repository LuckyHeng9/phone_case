// models/Product.js
import mongoose from "mongoose";

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
    model: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Product= mongoose.model("Product", ProductSchema); // Export the model

export default Product;