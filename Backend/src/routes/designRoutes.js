import express from "express";
import designController from "../controller/DesignController.js";
import multer from "multer";

const router = express.Router();

// Configure Multer for memory storage (required for Cloudinary uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route for creating a design (uploading image)
router.post("/design", upload.single("imageUrl"), designController.design);

// GET route for retrieving a specific case design by ID
router.get("/get-case-design/:_id", designController.get_design);

export default router;
