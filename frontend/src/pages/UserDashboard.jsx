import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Calendar, BookOpen, ArrowRight, Package, Clock, CheckCircle2, Truck, ShoppingBag, User2, BarChart3, Flame, Medal, Zap, Trophy, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";
import { getUserOrders } from "../services/orderService";

const quickLinks = [
  { icon: Calendar, title: "Book Consultation", desc: "Request a free lab setup consultation.", path: "/contact" },
  { icon: BookOpen, title: "Browse Curriculum", desc: "See our grade-wise STEM curriculum.", path: "/curriculum" },
  { icon: FileText, title: "Download Resources", desc: "Brochures, guides, and case studies.", path: "/resources" },
  { icon: Package, title: "View Products", desc: "Browse robotics kits and tools.", path: "/products" },
];

const statusConfig = {
  paid: { label: "Confirmed", color: "emerald" },
  pending: { label: "Pending", color: "amber" },
  failed: { label: "Failed", color: "red" },
  cod: { label: "COD", color: "blue" },
};

export default function UserDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");

  useEffect(() => {
    if (user?._id || user?.id) {
      const uid = user._id || user.id;
      setOrdersLoading(true);
      getUserOrders(uid)
        .then((res) => {
          if (res.data?.success) setOrders(res.data.orders || []);
        })
        .catch(() => setOrdersError("Could not load order history."))
        .finally(() => setOrdersLoading(false));
    }
  }, [user]);

  const firstName = user?.name?.split(" ")[0] || "there";
  const initial = user?.name?.[0]?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title="My Dashboard | RoboLearn" description="Manage your orders, resources, and account settings." path="/dashboard" />

      <style>{`
        @keyframes floatSlow { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
        @keyframes floatSlower { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-9px); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dash { to { stroke-dashoffset: 0; } }
        .anim-float { animation: floatSlow 6s ease-in-out infinite; }
        .anim-float-slow { animation: floatSlower 7s ease-in-out infinite; }
        .anim-fadeup { animation: fadeUp .7s ease both; }
        .circuit-line { stroke-dasharray: 6 6; stroke-dashoffset: 240; animation: dash 3s linear forwards 0.3s; }
        @media (prefers-reduced-motion: reduce) {
          .anim-float, .anim-float-slow, .anim-fadeup, .circuit-line { animation: none !important; }
        }
      `}</style>

      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-[#061B33] pt-32 pb-20 px-6">
        <svg className="absolute inset-0 w-full h-full opacity-[0.16]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" fill="none">
          <g stroke="#22d3ee" strokeWidth="1.2">
            <path className="circuit-line" d="M0 100 H260 V220 H520" />
            <path className="circuit-line" d="M1200 60 H880 V180 H640" />
            <path className="circuit-line" d="M0 500 H300 V380 H560" />
          </g>
          <g fill="#22d3ee">
            <circle cx="260" cy="100" r="4" /><circle cx="520" cy="220" r="4" />
            <circle cx="880" cy="60" r="4" /><circle cx="640" cy="180" r="4" />
            <circle cx="300" cy="500" r="4" /><circle cx="560" cy="380" r="4" />
          </g>
        </svg>
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-24 bottom-0 w-72 h-72 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left z-10 anim-fadeup">
          <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-black text-3xl shrink-0 anim-float">
            {initial}
          </div>
          <div>
            <span className="inline-flex items-center gap-2 bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 px-4 py-1.5 rounded-full text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              My Account
            </span>
            <h1 className="mt-5 text-3xl sm:text-5xl font-bold leading-[1.1] text-white">
              Welcome back, <span className="text-cyan-400">{firstName}</span> 👋
            </h1>
            <p className="mt-3 text-slate-300 text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative max-w-5xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 z-10">
          {[
            { icon: ShoppingBag, label: "Total Orders", value: orders.length },
            { icon: CheckCircle2, label: "Delivered", value: orders.filter(o => o.trackingSteps?.at(-1)?.completed).length },
            { icon: BarChart3, label: "Total Spent", value: `₹${orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0).toLocaleString("en-IN")}` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-400/40 hover:bg-white/[0.07] transition-all">
              <div className="w-14 h-14 bg-cyan-400/10 rounded-2xl flex items-center justify-center mx-auto">
                <Icon size={26} className="text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white mt-5">{value}</div>
              <div className="text-slate-300 text-xs mt-2 uppercase tracking-widest font-semibold">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* Gamification Profile */}
        <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            
            {/* Level Ring */}
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#0ea5e9" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset="56.54" strokeLinecap="round" className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-[#0b2545]">8</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Level</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 w-full space-y-6">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#0b2545]">Robotics Innovator</h3>
                  <p className="text-slate-500 text-sm mt-1">2,400 / 3,000 XP to next level</p>
                </div>
                <div className="flex items-center gap-2 text-amber-500 font-bold bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                  <Flame size={16} className="animate-pulse" /> 14 Day Streak
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: '80%' }} />
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Trophy size={20} className="text-blue-600" />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-[#0b2545]">Code Master</p>
                     <p className="text-[10px] text-slate-500">100 runs</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} className="text-emerald-600" />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-[#0b2545]">AI Explorer</p>
                     <p className="text-[10px] text-slate-500">50 Queries</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 opacity-50 grayscale">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                    <Zap size={20} className="text-slate-500" />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-[#0b2545]">Speed Demon</p>
                     <p className="text-[10px] text-slate-500">Locked</p>
                  </div>
                </div>
                <div className="flex items-center justify-center bg-cyan-50 border border-cyan-200 rounded-xl p-3 cursor-pointer hover:bg-cyan-100 transition-colors">
                  <span className="text-xs font-bold text-cyan-700 text-center flex items-center gap-1">
                    <Medal size={14} /> Leaderboard
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section>
          <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">Quick Actions</span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
            {quickLinks.map(({ icon: Icon, title, desc, path }) => (
              <Link key={title} to={path}
                className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#0b2545] flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-300">
                  <Icon size={22} className="text-cyan-300 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-[#0b2545] mt-5">{title}</h3>
                <p className="mt-2.5 text-slate-600 text-sm leading-relaxed">{desc}</p>
                <div className="inline-flex items-center gap-2 text-cyan-600 text-sm font-bold mt-5 group-hover:gap-3 transition-all">
                  Explore <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Order History */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">Order History</span>
            <Link to="/track-order" className="text-cyan-600 text-xs font-bold hover:underline flex items-center gap-1">
              <Truck size={13} /> Track an Order
            </Link>
          </div>

          {ordersLoading ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-400 text-sm">
              Loading your orders...
            </div>
          ) : ordersError ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-500 text-sm text-center">
              {ordersError}
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
              <ShoppingBag size={36} className="text-slate-200 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">You haven't placed any orders yet.</p>
              <Link to="/products" className="inline-flex mt-4 bg-[#0b2545] hover:bg-cyan-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors">
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const cfg = statusConfig[order.paymentStatus] || statusConfig.pending;
                const lastStep = order.trackingSteps?.filter(s => s.completed).at(-1);
                return (
                  <div key={order._id} className="group bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-6 hover:border-cyan-300 hover:shadow-lg transition-all duration-300">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <span className="font-bold text-[#0b2545] text-base font-mono bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{order.orderId}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border bg-${cfg.color}-50 text-${cfg.color}-700 border-${cfg.color}-200`}>
                          {cfg.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500 mt-2 font-medium">
                        <Clock size={14} className="text-slate-400" />
                        {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        {lastStep && (
                           <>
                             <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mx-1" />
                             <span className="text-slate-600">{lastStep.label}</span>
                           </>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
                        <Package size={14} className="text-slate-400" />
                        {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mx-1" />
                        <span className="font-medium">{order.paymentMethod?.toUpperCase() || "N/A"}</span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end gap-4 shrink-0 sm:border-l border-slate-100 sm:pl-6">
                      <span className="font-bold text-[#0b2545] text-2xl tracking-tight">₹{order.grandTotal?.toLocaleString("en-IN")}</span>
                      <Link to={`/track-order/${order.orderId}`} className="inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-cyan-50 text-cyan-700 text-sm font-bold px-6 py-2.5 rounded-xl border border-slate-200 hover:border-cyan-200 transition-colors w-full sm:w-auto">
                        <Truck size={16} /> Track Order
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}