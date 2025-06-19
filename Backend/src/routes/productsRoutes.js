import express from "express";
import productsController from "../controller/productsController.js";
import multer from "multer";

const router = express.Router();

// Configure multer for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to add a product with image
router.post("/addProducts", upload.single("image"), productsController.addProduct);
router.get("/get-all-products", productsController.getAllProducts);
router.get("/get-product/:id", productsController.getProductById);
router.delete("/delete-product/:id", productsController.deleteProduct);
router.put("/update-product/:id", productsController.updateProduct);
router.get("/search-products",productsController.searchProducts);

export default router;
