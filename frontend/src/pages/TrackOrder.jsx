import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Search, Truck, MapPin, Calendar, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import SEO from "../components/SEO";

export default function TrackOrder() {
  const { id } = useParams();
  const [orderInput, setOrderInput] = useState(id || "");
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = (e) => {
    if (e) e.preventDefault();
    if (!orderInput.trim()) {
      setError("Please enter a valid Order ID.");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);

    // Simulate database lookup & dynamic transit mapping
    setTimeout(() => {
      const orderIdStr = orderInput.trim().toUpperCase();
      
      // Calculate past timestamps relative to today
      const today = new Date();
      const formatTime = (daysAgo, hourOffset) => {
        const d = new Date();
        d.setDate(today.getDate() - daysAgo);
        d.setHours(d.getHours() - hourOffset);
        return d.toLocaleString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
      };

      // Mock statuses depending on ID length
      const statusIndex = orderIdStr.includes("MOCK") ? 2 : 3; // In Transit or Out for Delivery

      setTrackingData({
        orderId: orderIdStr,
        carrier: "BlueDart Express",
        awb: "AWB-" + Math.floor(100000000 + Math.random() * 900000000),
        origin: "RoboLearn Warehouse, Bengaluru",
        destination: "St. Xavier Public School, Delhi NCR",
        currentStatus: statusIndex === 2 ? "In Transit" : "Out for Delivery",
        lastUpdated: formatTime(0, 2),
        steps: [
          { label: "Order Placed & Confirmed", desc: "Payment cleared via Stripe Secure Gateway.", time: formatTime(3, 12), completed: true },
          { label: "Packed & Label Generated", desc: "STEM kits packaged and serial numbers assigned.", time: formatTime(2, 6), completed: true },
          { label: "In Transit", desc: "Sorted at Delhi Okhla Distribution Hub.", time: formatTime(1, 4), completed: true },
          { label: "Out for Delivery", desc: "Dispatched in local delivery van via BlueDart.", time: statusIndex === 3 ? formatTime(0, 3) : "Pending", completed: statusIndex >= 3 },
          { label: "Delivered", desc: "Secure handover to school reception coordinator.", time: "Estimated Tomorrow", completed: false }
        ]
      });
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    if (id) {
      setOrderInput(id);
      handleTrack();
    }
  }, [id]);

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16 text-sm text-slate-800">
      <SEO title="Track Your Order" description="Check the live shipping status of your robotics kits." path="/track-order" />
      
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Back Link */}
        <Link to="/products" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 transition mb-6 font-semibold">
          <ArrowLeft size={14} /> Back to Products
        </Link>

        {/* Search header panel */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
            <div className="w-10 h-10 bg-cyan-50 border border-cyan-100 rounded-xl flex items-center justify-center text-cyan-600">
              <Truck size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#0b2545]">Track Order Status</h1>
              <p className="text-xs text-slate-400 mt-0.5">Enter your Order ID to see real-time shipping updates.</p>
            </div>
          </div>

          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                required
                value={orderInput}
                onChange={(e) => setOrderInput(e.target.value)}
                placeholder="e.g. ROBO-582109 or ROBO-MOCK-391"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 outline-none transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0b2545] hover:bg-cyan-600 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-xl transition shadow-md shrink-0 text-xs sm:text-sm"
            >
              {loading ? "Locating Parcel..." : "Track Shipment"}
            </button>
          </form>
          {error && <p className="text-red-500 text-xs mt-2 font-semibold">{error}</p>}
        </div>

        {/* Results Timeline Panel */}
        {searched && trackingData && !loading && (
          <div className="mt-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm animate-fadeUp">
            
            {/* Meta details header strip */}
            <div className="grid sm:grid-cols-3 gap-4 border-b border-slate-100 pb-5 mb-8 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold mb-1">Carrier Details</span>
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  {trackingData.carrier}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold mb-1">AWB Tracking No.</span>
                <span className="font-bold text-slate-800 font-mono">{trackingData.awb}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold mb-1">Estimated Handover</span>
                <span className="font-bold text-cyan-600">Tomorrow, by 6:00 PM</span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="relative pl-6 border-l-2 border-slate-100 space-y-8 ml-3">
              {trackingData.steps.map((step, idx) => (
                <div key={idx} className="relative">
                  
                  {/* Status Indicator bubble */}
                  <span className={`absolute -left-9.5 top-0.5 w-6 h-6 rounded-full flex items-center justify-center border shadow-sm transition-colors duration-300 ${
                    step.completed 
                      ? "bg-emerald-500 border-emerald-600 text-white" 
                      : "bg-white border-slate-200 text-slate-400"
                  }`}>
                    {step.completed ? <CheckCircle2 size={13} className="fill-current text-emerald-500" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />}
                  </span>

                  {/* Step Description */}
                  <div>
                    <h3 className={`font-bold text-sm ${step.completed ? "text-slate-800" : "text-slate-400"}`}>
                      {step.label}
                    </h3>
                    <p className={`text-xs mt-1 leading-normal ${step.completed ? "text-slate-500" : "text-slate-400"}`}>
                      {step.desc}
                    </p>
                    <span className="block text-[10px] text-slate-400 mt-1.5 font-semibold">
                      {step.time}
                    </span>
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
      </div>
    </div>
  );
}
