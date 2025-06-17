import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import connectDB from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import designRoutes from "./routes/designRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import connectCloudinary from "./config/cloudinary.js";
import { stripe } from "./config/stripe.js";
import paymentRoutes from "./routes/paymentRoutes.js";



dotenv.config();
connectCloudinary();
// Connect to MongoDB with proper error handling
connectDB()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit process with failure
  });

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/auth", authRoutes);
app.use("/products", authMiddleware, productsRoutes);
app.use("/case", authMiddleware, designRoutes);
app.use("/payment", paymentRoutes);
// Set the port from environment variables or default to 5001
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
