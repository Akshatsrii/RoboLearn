const express = require("express");
const router = express.Router();
const {
  createPaymentIntent,
  createRazorpayOrder,
  verifyRazorpayPayment,
  saveOrder,
  trackOrder,
  getUserOrders,
  getAllOrders,
  updateOrderTracking,
} = require("../controllers/paymentController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/create-payment-intent", createPaymentIntent);
router.post("/create-razorpay-order", createRazorpayOrder);
router.post("/verify-razorpay-payment", verifyRazorpayPayment);
router.post("/save-order", saveOrder);
router.get("/track-order/:orderId", trackOrder);
router.get("/user-orders/:userId", getUserOrders);

// Admin routes
router.get("/orders", protect, adminOnly, getAllOrders);
router.patch("/orders/:id/tracking", protect, adminOnly, updateOrderTracking);

module.exports = router;
