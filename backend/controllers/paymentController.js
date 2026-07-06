const stripe = require("stripe");

let stripeInstance = null;

// Lazily load Stripe to avoid failure if STRIPE_SECRET_KEY is missing initially
const getStripe = () => {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY || "sk_test_mock_secret_key_robolearn";
    stripeInstance = stripe(key);
  }
  return stripeInstance;
};

exports.createPaymentIntent = async (req, res) => {
  const { amount, email, metadata } = req.body;

  if (!amount) {
    return res.status(400).json({ success: false, message: "Amount is required" });
  }

  try {
    const stripeClient = getStripe();

    // Check if Stripe key is mock to bypass real api call and return mock secret
    if (process.env.STRIPE_SECRET_KEY === undefined || process.env.STRIPE_SECRET_KEY === "") {
      return res.json({
        success: true,
        clientSecret: "pi_mock_intent_secret_" + Math.random().toString(36).substring(2),
        isMock: true
      });
    }

    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to paise
      currency: "inr",
      receipt_email: email,
      metadata: metadata || {},
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create payment intent",
    });
  }
};
