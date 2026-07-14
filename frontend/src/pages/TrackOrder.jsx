import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Search, Truck, MapPin, ShieldCheck, CheckCircle2, AlertTriangle, Loader2, Package } from "lucide-react";
import SEO from "../components/SEO";
import { trackOrder } from "../services/orderService";

export default function TrackOrder() {
  const { id } = useParams();
  const [orderInput, setOrderInput] = useState(id || "");
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e, overrideId) => {
    if (e) e.preventDefault();
    const searchId = overrideId || orderInput;
    if (!searchId.trim()) {
      setError("Please enter a valid Order ID.");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);
    setTrackingData(null);

    try {
      const res = await trackOrder(searchId.trim().toUpperCase());
      if (res.data?.success && res.data?.order) {
        setTrackingData(res.data.order);
      } else {
        setError("Order not found. Please check your Order ID and try again.");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Order not found. Please check your Order ID and try again.");
      } else {
        setError("Failed to connect to the tracking service. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      setOrderInput(id);
      handleTrack(null, id);
    }
  }, [id]);

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16 text-sm text-slate-800">
      <SEO title="Track Your Order | RoboLearn" description="Check the live shipping status of your robotics kits." path="/track-order" />

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#0b2545] to-[#1a4a7a] text-white py-10 px-6 mb-10 -mt-24 pt-32">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center">
              <Truck size={20} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Track Your Order</h1>
          </div>
          <p className="text-sm text-blue-200 mt-1">Enter your Order ID to see real-time shipping updates.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">

        {/* Back Link */}
        <Link to="/products" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 transition mb-6 font-semibold">
          <ArrowLeft size={14} /> Back to Products
        </Link>

        {/* Search Panel */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                required
                value={orderInput}
                onChange={(e) => setOrderInput(e.target.value)}
                placeholder="e.g. ROBO-582109"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 outline-none transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0b2545] hover:bg-cyan-600 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-xl transition shadow-md shrink-0 text-xs sm:text-sm flex items-center gap-2"
            >
              {loading ? <><Loader2 size={14} className="animate-spin" /> Locating...</> : "Track Shipment"}
            </button>
          </form>
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-xs flex items-start gap-2">
              <AlertTriangle size={15} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="mt-8 flex items-center justify-center gap-3 text-slate-500">
            <Loader2 size={20} className="animate-spin text-cyan-500" />
            <span className="text-sm">Fetching your order details...</span>
          </div>
        )}

        {/* Results Timeline Panel */}
        {searched && trackingData && !loading && (
          <div className="mt-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">

            {/* Meta details header strip */}
            <div className="grid sm:grid-cols-3 gap-4 border-b border-slate-100 pb-5 mb-8 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold mb-1">Order ID</span>
                <span className="font-bold text-slate-800 font-mono">{trackingData.orderId}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold mb-1">AWB Tracking No.</span>
                <span className="font-bold text-slate-800 font-mono">{trackingData.awb || "—"}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold mb-1">Payment</span>
                <span className={`font-bold uppercase tracking-wider px-2 py-0.5 rounded text-[10px] ${
                  trackingData.paymentStatus === "paid" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"
                }`}>{trackingData.paymentStatus || "confirmed"}</span>
              </div>
            </div>

            {/* Shipping Details */}
            {trackingData.shippingDetails && (
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-8 text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-700 mb-2">
                  <MapPin size={13} className="text-cyan-500" />
                  Delivery Address
                </div>
                <p className="text-slate-600">{trackingData.shippingDetails.name}</p>
                <p className="text-slate-500">{trackingData.shippingDetails.address}, {trackingData.shippingDetails.city}, {trackingData.shippingDetails.state} - {trackingData.shippingDetails.zip}</p>
              </div>
            )}

            {/* Stepper Timeline */}
            <div className="relative pl-6 border-l-2 border-slate-100 space-y-8 ml-3">
              {(trackingData.trackingSteps || []).map((step, idx) => (
                <div key={idx} className="relative">
                  <span className={`absolute -left-9.5 top-0.5 w-6 h-6 rounded-full flex items-center justify-center border shadow-sm transition-colors duration-300 ${
                    step.completed
                      ? "bg-emerald-500 border-emerald-600 text-white"
                      : "bg-white border-slate-200 text-slate-400"
                  }`}>
                    {step.completed ? <CheckCircle2 size={13} className="fill-current text-emerald-500" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />}
                  </span>
                  <div>
                    <h3 className={`font-bold text-sm ${step.completed ? "text-slate-800" : "text-slate-400"}`}>
                      {step.label}
                    </h3>
                    <p className={`text-xs mt-1 leading-normal ${step.completed ? "text-slate-500" : "text-slate-400"}`}>
                      {step.desc}
                    </p>
                    <span className="block text-[10px] text-slate-400 mt-1.5 font-semibold">{step.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Support section */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>Authorized Delhivery / BlueDart partnership shipping track</span>
              </div>
              <Link to="/contact" className="text-cyan-600 font-bold hover:underline">
                Report Shipping Issue
              </Link>
            </div>
          </div>
        )}

        {/* Not found state */}
        {searched && !trackingData && !loading && !error && (
          <div className="mt-8 bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
            <Package size={40} className="text-slate-200 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700">Order Not Found</h3>
            <p className="text-slate-400 text-xs mt-2">We couldn't find an order matching that ID. Please verify and try again.</p>
          </div>
        )}
      </div>
    </div>
  );
}
