// routes/paymentRoutes.js
import express from "express";
import paymentController from "../controller/paymentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-checkout-session", authMiddleware, paymentController.createCheckoutSession);
router.post("/checkout-success", paymentController.checkoutSuccess);
router.get("/get-all-orders", authMiddleware, paymentController.getAllOrders);
router.put("/update-order-status/:orderId", authMiddleware, paymentController.updateOrderStatuse);

export default router;
