import express from "express";
import authController from "../controller/AuthController.js";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const filename =
      file.fieldname +
      "-" +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      ".jpg";
    req.body.profile_picture_path = filename;
    cb(null, filename);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/register", upload.single("image"), authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logOut);
router.get("/check-auth", authMiddleware, authController.checkAuth);

export default router;
