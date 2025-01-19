const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  inStock: { type: Boolean, required: true },
  requiresDelivery: { type: Boolean, required: true },
  img: { type: String, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
