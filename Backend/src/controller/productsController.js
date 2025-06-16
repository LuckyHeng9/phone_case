import { get } from "mongoose";
import Product from "../models/products.js";
import cloudinary from "cloudinary";

const productsController = {
  addProduct: async (req, res) => {
    try {
      const { title, price, inStock, requiresDelivery } = req.body;

      if (!title || !price || typeof inStock === "undefined" || typeof requiresDelivery === "undefined") {
        return res.status(400).json({ message: "Missing required fields" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No image file uploaded" });
      }

      const uploadStream = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.v2.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          stream.end(req.file.buffer);
        });
      };

      const result = await uploadStream();
      const imageUrl = result.secure_url;

      const newProduct = new Product({
        title,
        price,
        inStock,
        requiresDelivery,
        image_path: imageUrl,
      });

      await newProduct.save();
      res.status(201).json({
        message: "Product added successfully",
        product: newProduct,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ message: "Failed to add product", error: error.message });
    }
  },


  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error retrieving products:", error);
      res.status(500).json({ message: "Failed to retrieve products", error: error.message });
    }
  },


  getProductById: async (req, res) =>{
    try {
     
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if(!product){
        return res.status(404).json({message:"Product not found"});
      }else{
       return res.status(200).json(product);
      }
      
    } catch (error) {
      console.error("Error retrieving product:", error);
      res.status(500).json({ message: "Failed to retrieve product", error: error.message });
    }
  },
  
  deleteProduct: async (req, res) =>{
    try {
      const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if(!product){
      return res.statuse(404).json({message:"Product not found"});
    }else{
      return res.status(200).json({message:"Product deleted successfully"});
    }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const {title, price, inStock, requiresDelivery} = req.body;
      const product = await Product.findById(productId);
      const updatedProduct = await Product.findByIdAndUpdate(productId, {title, price, inStock, requiresDelivery}, {new: true});

      if(!product){
        return res.status(404).json({message:"Product not found"});
      }else{
        return res.status(200).json(updatedProduct);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update product" });
    }
  }
      
};  

export default productsController;
