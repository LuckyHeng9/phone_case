// src/controller/paymentController.js
import Order from "../models/order.js";
import { stripe } from "../config/stripe.js";

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

        const amount = Math.round(product.price * 100); // cents
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
        metadata: {
          userId: req.user.id.toString(),
          products: JSON.stringify(
            products.map((p) => ({
              id: p.id,
              quantity: p.quantity,
              price: p.price,
            }))
          ),
        },
      });

      res.status(200).json({ sessionId: session.id, totalAmount: totalAmount / 100 });
    } catch (error) {
      console.error("Error processing checkout:", error);
      res.status(500).json({ message: "Error processing checkout", error: error.message });
    }
  },

  checkoutSuccess: async (req, res) => {
    try {
      const { sessionId } = req.body;

      if (!sessionId) {
        return res.status(400).json({ message: "Missing sessionId" });
      }

      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === "paid") {
        const products = JSON.parse(session.metadata.products);

        const newOrder = new Order({
          user: session.metadata.userId,
          products: products.map((product) => ({
            product: product.id,
            quantity: product.quantity,
            price: product.price,
          })),
          totalAmount: session.amount_total / 100,
          stripeSessionId: sessionId,
        });

        await newOrder.save();

        res.status(200).json({
          success: true,
          message: "Payment successful and order created.",
          orderId: newOrder._id,
        });
      } else {
        res.status(400).json({ message: "Payment not completed yet." });
      }
    } catch (error) {
      console.error("Error processing successful checkout:", error);
      res.status(500).json({ message: "Error processing successful checkout", error: error.message });
    }
  },
};

export default paymentController;
