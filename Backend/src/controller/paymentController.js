import Order from "../models/order.js";
import { stripe } from "../config/stripe.js";
import { get } from "mongoose";

const paymentController = {
  createCheckoutSession: async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res
          .status(401)
          .json({ error: "Unauthorized: User not authenticated" });
      }

      const { products } = req.body;

      if (!Array.isArray(products) || products.length === 0) {
        return res
          .status(400)
          .json({ error: "Invalid or empty products array" });
      }

      let totalAmount = 0;

      const lineItems = products.map((product) => {
        if (
          !product.name ||
          typeof product.price !== "number" ||
          !product.quantity ||
          product.quantity <= 0
        ) {
          throw new Error("Invalid product data");
        }

        const amount = Math.round(product.price * 100); // in cents
        totalAmount += amount * product.quantity;

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: product.image ? [product.image] : [],
            },
            unit_amount: amount,
          },
          quantity: product.quantity,
          
          
        };
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
        locale: 'auto',
        metadata: {
          userId: req.user.id.toString(),
          products: JSON.stringify(
            products.map((p) => ({
              id: p.id,
              quantity: p.quantity,
              price: p.price,
              type: p.type || "product",     // product | custom
              typeRef: p.typeRef
              
            }))
          ),
        },
        
      });

      res.status(200).json({
        sessionId: session.id,
        totalAmount: totalAmount / 100,
      });
    } catch (error) {
      console.error("Error processing checkout:", error);
      res
        .status(500)
        .json({ message: "Error processing checkout", error: error.message });
    }
  },

checkoutSuccess: async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ message: "Missing sessionId" });
    }

    // 1) If it already exists, return success immediately
    const existingOrder = await Order.findOne({ stripeSessionId: sessionId });
    if (existingOrder) {
      return res.status(200).json({
        success: true,
        message: "Order already confirmed.",
        orderId: existingOrder._id,
      });
    }

    // 2) Retrieve the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed yet." });
    }

    const products = JSON.parse(session.metadata.products);

    // 3) Create the new order object
    const newOrder = new Order({
      user: session.metadata.userId,
      products: products.map((p) => ({
        product: p.id,
        quantity: p.quantity,
        price: p.price,
        type: p.type,
        typeRef: p.typeRef,
        
      })),
      totalAmount: session.amount_total / 100,
      stripeSessionId: sessionId,
    });

    // 4) Attempt to save, but handle a duplicate‐key here too
    try {
      await newOrder.save();
      return res.status(200).json({
        success: true,
        message: "Payment successful and order created.",
        orderId: newOrder._id,
      });
    } catch (saveError) {
      // If it's *only* a duplicate stripeSessionId, treat as success
      if (
        saveError.name === "MongoServerError" &&
        saveError.code === 11000 &&
        saveError.keyPattern?.stripeSessionId
      ) {
        const dupOrder = await Order.findOne({ stripeSessionId: sessionId });
        return res.status(200).json({
          success: true,
          message: "Order already confirmed.",
          orderId: dupOrder._id,
        });
      }
      // Otherwise, rethrow
      throw saveError;
    }
  } catch (error) {
    console.error("Error processing successful checkout:", error);
    return res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
},


getAllOrders: async (req, res) => {
  try {
    // Check if the user is authenticated and is an admin
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: admin only" });
    }

    
    // Fetch all orders
   const orders = await Order.find().sort({ createdAt: -1 })
       .populate("user", "username email")
      .populate("products.product")
      .sort({ createdAt: -1 });
   
    return res.status(200).json(orders);
    
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ message: "Error retrieving orders" });
  }
},

updateOrderStatuse: async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      // Optional: Check for admin role
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }

      // Validate status value
      const validStatuses = ["Pending", "Accepted", "Delivered", "Canceled"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }

      // Find and update the order
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json({
        message: "Order status updated successfully",
        order: updatedOrder,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

};

export default paymentController;
