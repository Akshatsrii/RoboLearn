const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [{
    productId: String,
    name: String,
    price: Number,
    quantity: Number,
    imageUrl: String,
  }],
  shippingDetails: {
    name: String,
    email: String,
    phone: String,
    schoolName: String,
    address: String,
    city: String,
    state: String,
    zip: String,
  },
  paymentMethod: { type: String, enum: ["card", "razorpay", "upi", "cod"], default: "card" },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed", "cod"], default: "pending" },
  paymentId: String, // Stripe/Razorpay payment ID
  subtotal: Number,
  shippingCost: Number,
  tax: Number,
  discount: Number,
  grandTotal: Number,
  trackingSteps: [{
    label: String,
    desc: String,
    completed: { type: Boolean, default: false },
    time: String,
  }],
  carrier: { type: String, default: "BlueDart Express" },
  awb: String,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
