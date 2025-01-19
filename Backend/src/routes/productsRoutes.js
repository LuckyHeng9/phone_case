// // productsRoutes.js
const express = require("express");
const productsController = require("../controller/productsController");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const filename =
      file.fieldname + "-" + Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
    req.body.image_path = filename; 
    cb(null, filename);
  },
});

const upload = multer({ storage });

// POST request to add products
router.post('/addProducts', upload.single('image'), productsController.addProducts);

module.exports = router;
