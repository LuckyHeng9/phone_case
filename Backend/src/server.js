const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoutes");
const productsRoutes = require("./routes/productsRoutes");

dotenv.config(); // Load environment variables

// Check and create 'uploads' directory if not exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Connect to MongoDB with proper error handling
connectDB()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit process with failure
  });

const app = express();

// Middleware
const authMiddleware = require("./middleware/authMiddleware");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../uploads')));

// Routes
app.use("/auth", authRoutes);
app.use("/products", authMiddleware, productsRoutes); 

// Set the port from environment variables or default to 5001
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
