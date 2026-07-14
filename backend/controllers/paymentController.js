const stripe = require("stripe");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

// ── Stripe ──────────────────────────────────────────
let stripeInstance = null;
const getStripe = () => {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY || "";
    stripeInstance = stripe(key || "sk_test_mock");
  }
  return stripeInstance;
};

// ── Razorpay ─────────────────────────────────────────
const getRazorpay = () =>
  new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret",
  });

// ── Stripe: create payment intent ───────────────────
exports.createPaymentIntent = async (req, res) => {
  const { amount, email, metadata } = req.body;
  if (!amount) return res.status(400).json({ success: false, message: "Amount is required" });

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.json({
        success: true,
        clientSecret: "pi_mock_" + Math.random().toString(36).substring(2),
        isMock: true,
      });
    }
    const intent = await getStripe().paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "inr",
      receipt_email: email,
      metadata: metadata || {},
    });
    res.json({ success: true, clientSecret: intent.client_secret });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── Razorpay: create order ───────────────────────────
exports.createRazorpayOrder = async (req, res) => {
  const { amount } = req.body;
  if (!amount) return res.status(400).json({ success: false, message: "Amount is required" });

  try {
    if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === "rzp_test_placeholder") {
      return res.json({
        success: true,
        orderId: "order_mock_" + Math.random().toString(36).substring(2, 10),
        amount: Math.round(amount * 100),
        currency: "INR",
        keyId: "rzp_test_placeholder",
        isMock: true,
      });
    }
    const order = await getRazorpay().orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    });
    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── Razorpay: verify payment signature ──────────────
exports.verifyRazorpayPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET || "placeholder_secret";
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSig = crypto.createHmac("sha256", secret).update(body).digest("hex");
    const isValid = expectedSig === razorpay_signature;
    res.json({ success: isValid, verified: isValid });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── Save order after payment ─────────────────────────
exports.saveOrder = async (req, res) => {
  try {
    const { orderId, userId, items, shippingDetails, paymentMethod, paymentId,
      paymentStatus, subtotal, shippingCost, tax, discount, grandTotal } = req.body;

    const awb = "AWB-" + Math.floor(100000000 + Math.random() * 900000000);
    const now = new Date().toLocaleString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

    const order = await Order.create({
      orderId,
      userId: userId || undefined,
      items,
      shippingDetails,
      paymentMethod,
      paymentId,
      paymentStatus,
      subtotal,
      shippingCost,
      tax,
      discount,
      grandTotal,
      awb,
      trackingSteps: [
        { label: "Order Placed & Confirmed", desc: "Payment cleared successfully.", time: now, completed: true },
        { label: "Packed & Label Generated", desc: "STEM kits packaged and serial numbers assigned.", time: "Pending", completed: false },
        { label: "In Transit", desc: "Sorted at regional distribution hub.", time: "Pending", completed: false },
        { label: "Out for Delivery", desc: "Dispatched in local delivery van.", time: "Pending", completed: false },
        { label: "Delivered", desc: "Secure handover to school reception.", time: "Estimated in 5-7 days", completed: false },
      ],
    });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── Track order by ID ────────────────────────────────
exports.trackOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId.toUpperCase() });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── Get user orders ──────────────────────────────────
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 }).limit(10);
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
