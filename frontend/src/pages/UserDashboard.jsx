import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Calendar, BookOpen, ArrowRight, Package, Clock, CheckCircle2, Truck, ShoppingBag, User2, BarChart3 } from "lucide-react";
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

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#0b2545] via-[#112d5a] to-[#1a4a7a] pt-28 pb-12 px-6">
        <div className="max-w-5xl mx-auto flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white font-black text-2xl shadow-lg shrink-0">
            {initial}
          </div>
          <div>
            <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <User2 size={12} /> My Account
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {firstName} 👋
            </h1>
            <p className="text-blue-200 text-sm mt-1">{user?.email}</p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="max-w-5xl mx-auto mt-8 grid grid-cols-3 gap-4">
          {[
            { icon: ShoppingBag, label: "Total Orders", value: orders.length },
            { icon: CheckCircle2, label: "Delivered", value: orders.filter(o => o.trackingSteps?.at(-1)?.completed).length },
            { icon: BarChart3, label: "Total Spent", value: `₹${orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0).toLocaleString("en-IN")}` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white/10 border border-white/10 rounded-2xl p-4 text-center">
              <Icon size={18} className="text-cyan-300 mx-auto mb-1" />
              <div className="text-xl font-black text-white">{value}</div>
              <div className="text-[10px] text-blue-300 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* Quick Links */}
        <section>
          <h2 className="text-lg font-bold text-[#0b2545] mb-5">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickLinks.map(({ icon: Icon, title, desc, path }) => (
              <Link key={title} to={path}
                className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-cyan-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-[#0b2545] flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-300">
                  <Icon size={20} className="text-cyan-300 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-[#0b2545] mt-4 text-sm">{title}</h3>
                <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">{desc}</p>
                <span className="inline-flex items-center gap-1 text-cyan-600 text-xs font-semibold mt-4 group-hover:gap-2 transition-all">
                  Go <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Order History */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-[#0b2545]">Order History</h2>
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
              <Link to="/products" className="inline-flex mt-4 bg-[#0b2545] hover:bg-cyan-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition">
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const cfg = statusConfig[order.paymentStatus] || statusConfig.pending;
                const lastStep = order.trackingSteps?.filter(s => s.completed).at(-1);
                return (
                  <div key={order._id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-cyan-200 hover:shadow-sm transition-all">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[#0b2545] text-sm font-mono">{order.orderId}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-${cfg.color}-50 text-${cfg.color}-600 border-${cfg.color}-100`}>
                          {cfg.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                        <Clock size={11} />
                        {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        {lastStep && <span className="text-slate-300">• {lastStep.label}</span>}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""} · {order.paymentMethod?.toUpperCase() || "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-extrabold text-[#0b2545] text-base">₹{order.grandTotal?.toLocaleString("en-IN")}</span>
                      <Link to={`/track-order/${order.orderId}`} className="text-xs font-bold text-cyan-600 hover:underline flex items-center gap-1">
                        <Truck size={12} /> Track
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