const Product = require("../models/addProduct"); // Import Product model

const productsController = {
  addProducts: async (req, res) => {
    try {
      const { title, price, inStock, requiresDelivery, image_path } = req.body;

      
      // Create a new product instance
      const newProduct = new Product({
        title,
        price,
        inStock,
        requiresDelivery,
        image_path,
      });

      // Save the product to the database
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = productsController;
