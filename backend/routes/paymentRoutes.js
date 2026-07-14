const express = require("express");
const router = express.Router();
const {
  createPaymentIntent,
  createRazorpayOrder,
  verifyRazorpayPayment,
  saveOrder,
  trackOrder,
  getUserOrders,
} = require("../controllers/paymentController");

router.post("/create-payment-intent", createPaymentIntent);
router.post("/create-razorpay-order", createRazorpayOrder);
router.post("/verify-razorpay-payment", verifyRazorpayPayment);
router.post("/save-order", saveOrder);
router.get("/track-order/:orderId", trackOrder);
router.get("/user-orders/:userId", getUserOrders);

module.exports = router;
