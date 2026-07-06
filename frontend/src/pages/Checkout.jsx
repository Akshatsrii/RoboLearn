import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { CheckCircle2, ChevronRight, CreditCard, ShieldCheck, MapPin, Truck, AlertCircle, ShoppingBag } from "lucide-react";
import SEO from "../components/SEO";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    schoolName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);

    // Simulate order placement
    setTimeout(() => {
      setLoading(false);
      setOrderPlaced(true);
      setOrderId("ROBO-" + Math.floor(100000 + Math.random() * 900000));
      clearCart();
    }, 2000);
  };

  const shippingCost = 150;
  const taxCost = Math.round(cartTotal * 0.18); // 18% GST typical for hardware in India
  const grandTotal = cartTotal + shippingCost + taxCost;

  if (orderPlaced) {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    return (
      <div className="bg-slate-50 min-h-screen pt-24 pb-16 flex items-center justify-center px-6">
        <SEO title="Order Success" description="Thank you for ordering your STEM kits from RoboLearn" path="/checkout" />
        <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-lg">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={36} />
          </div>
          <h1 className="text-2xl font-bold text-[#0b2545]">Order Placed Successfully!</h1>
          <p className="text-sm text-slate-500 mt-2">
            Thank you for shopping with RoboLearn. Your order has been placed and is being processed.
          </p>

          <div className="mt-6 border-t border-b border-slate-100 py-4 space-y-2 text-left text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Order ID:</span>
              <span className="font-semibold text-slate-800">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Estimated Delivery:</span>
              <span className="font-semibold text-slate-800">
                {deliveryDate.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "short", day: "numeric" })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Shipping To:</span>
              <span className="font-semibold text-slate-800 truncate max-w-[240px]">
                {form.schoolName || form.name}
              </span>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              to="/"
              className="flex-1 bg-[#0b2545] hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold transition"
            >
              Go to Home
            </Link>
            <Link
              to="/products"
              className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 py-3 rounded-xl font-semibold transition text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16">
      <SEO title="Secure Checkout" description="Complete your secure purchase of STEM kits" path="/checkout" />
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-8">
          <Link to="/products" className="hover:text-[#0b2545]">STEM Shop</Link>
          <ChevronRight size={12} />
          <span className="text-[#0b2545]">Checkout</span>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm max-w-xl mx-auto">
            <ShoppingBag size={48} className="text-slate-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#0b2545]">Your cart is empty!</h2>
            <p className="text-sm text-slate-500 mt-2">Add some products to your cart before checking out.</p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-[#0b2545] hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold mt-6 transition"
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10">
            {/* Left: Form */}
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Shipping Address */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                  <MapPin className="text-cyan-600" size={20} />
                  <h2 className="text-lg font-bold text-[#0b2545]">Shipping &amp; Billing Details</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Contact Name *</label>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="ramesh@school.edu.in"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Phone Number *</label>
                    <input
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 outline-none transition"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">School / Organization Name</label>
                    <input
                      name="schoolName"
                      value={form.schoolName}
                      onChange={handleChange}
                      placeholder="e.g. D.A.V. Public School, Sector 12"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 outline-none transition"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Address *</label>
                    <input
                      name="address"
                      required
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Flat/House, Street Name, Landmark"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">City *</label>
                    <input
                      name="city"
                      required
                      value={form.city}
                      onChange={handleChange}
                      placeholder="New Delhi"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">State *</label>
                    <input
                      name="state"
                      required
                      value={form.state}
                      onChange={handleChange}
                      placeholder="Delhi"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">PIN / ZIP Code *</label>
                    <input
                      name="zip"
                      required
                      value={form.zip}
                      onChange={handleChange}
                      placeholder="110001"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                  <CreditCard className="text-cyan-600" size={20} />
                  <h2 className="text-lg font-bold text-[#0b2545]">Payment Method</h2>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "card", label: "Credit / Debit Card", desc: "Pay securely with Visa, Mastercard, or RuPay." },
                    { id: "upi", label: "UPI (Google Pay / PhonePe)", desc: "Quick checkout using your UPI ID." },
                    { id: "cod", label: "Cash on Delivery (COD) / Pay on Delivery", desc: "Pay cash at your school gate on kit delivery." }
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-start gap-4 p-4 border rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors ${
                        paymentMethod === method.id ? "border-cyan-500 bg-cyan-50/20" : "border-slate-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="mt-1 accent-cyan-600 shrink-0"
                      />
                      <div>
                        <span className="block text-sm font-bold text-[#0b2545]">{method.label}</span>
                        <span className="block text-xs text-slate-500 mt-1 leading-normal">{method.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </form>

            {/* Right: Order Summary */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm sticky top-24">
                <h3 className="text-lg font-bold text-[#0b2545] border-b border-slate-100 pb-4 mb-4">Order Summary</h3>

                {/* Items preview list */}
                <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item._id} className="py-3 flex gap-3 text-sm">
                      <div className="w-12 h-12 bg-slate-50 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                        <img
                          src={item.imageUrl || item.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-800 truncate">{item.name}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-slate-800 shrink-0">₹{(item.price || 0) * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Cost Breakdown */}
                <div className="border-t border-slate-100 pt-4 mt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between text-slate-500">
                    <span>Items Subtotal:</span>
                    <span className="font-semibold text-slate-800">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span className="flex items-center gap-1">Shipping &amp; Delivery: <Truck size={14} /></span>
                    <span className="font-semibold text-slate-800">₹{shippingCost}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span className="flex items-center gap-1">GST / Educational Tax (18%): <AlertCircle size={14} /></span>
                    <span className="font-semibold text-slate-800">₹{taxCost}</span>
                  </div>
                  <div className="border-t border-slate-100 pt-4 flex justify-between text-base font-bold text-[#0b2545]">
                    <span>Total Amount:</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                {/* Secure Badge */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex items-center gap-3 mt-6 text-xs text-slate-500">
                  <ShieldCheck className="text-emerald-500 shrink-0" size={18} />
                  <span>Your connection is securely encrypted. Goods are eligible for tax exemption under school code.</span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full bg-[#0b2545] hover:bg-cyan-600 disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold mt-6 flex items-center justify-center gap-2 transition shadow-md"
                >
                  {loading ? "Placing Order..." : `Place Order (₹${grandTotal})`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
