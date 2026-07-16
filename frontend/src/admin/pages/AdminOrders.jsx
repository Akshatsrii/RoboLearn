import { useState, useEffect, useCallback } from "react";
import { Search, Loader2, Eye, Package, CheckCircle2, Truck, MapPin, Clock } from "lucide-react";
import { adminApi } from "../services/adminApi";

const statusColors = {
  paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cod: "bg-blue-50 text-blue-700 border-blue-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  failed: "bg-red-50 text-red-700 border-red-200",
};

const TRACKING_LABELS = [
  "Order Placed & Confirmed",
  "Packed & Label Generated",
  "In Transit",
  "Out for Delivery",
  "Delivered",
];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.get("/payment/orders", {
        params: { search: search || undefined, status: statusFilter || undefined, limit: 50 },
      });
      setOrders(data.data || []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const t = setTimeout(fetchOrders, 300);
    return () => clearTimeout(t);
  }, [fetchOrders]);

  const markStep = async (orderId, stepIndex) => {
    setUpdating(true);
    try {
      const now = new Date().toLocaleString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
      await adminApi.patch(`/payment/orders/${orderId}/tracking`, {
        stepIndex,
        completed: true,
        time: now,
      });
      // update selected in-place
      setSelected((prev) => {
        if (!prev) return prev;
        const steps = [...prev.trackingSteps];
        steps[stepIndex] = { ...steps[stepIndex], completed: true, time: now };
        return { ...prev, trackingSteps: steps };
      });
      fetchOrders();
    } catch {
      alert("Failed to update tracking");
    } finally {
      setUpdating(false);
    }
  };

  const totalRevenue = orders.filter(o => o.paymentStatus === "paid" || o.paymentStatus === "cod")
    .reduce((s, o) => s + (o.grandTotal || 0), 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0b2545]">Orders</h1>
        <p className="text-slate-500 text-sm mt-1">Manage and track all customer orders.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Orders", value: orders.length, color: "text-[#0b2545]" },
          { label: "Confirmed", value: orders.filter(o => o.paymentStatus === "paid" || o.paymentStatus === "cod").length, color: "text-emerald-600" },
          { label: "Pending", value: orders.filter(o => o.paymentStatus === "pending").length, color: "text-amber-600" },
          { label: "Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, color: "text-cyan-600" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative max-w-sm flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40"
        >
          <option value="">All Statuses</option>
          <option value="paid">Paid</option>
          <option value="cod">COD</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-5 py-3 font-semibold">Order ID</th>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Items</th>
                <th className="px-5 py-3 font-semibold">Total</th>
                <th className="px-5 py-3 font-semibold">Payment</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-slate-400"><Loader2 size={20} className="animate-spin inline" /></td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-slate-400">No orders found.</td></tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5 font-mono font-bold text-[#0b2545] text-xs">{order.orderId}</td>
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-slate-900">{order.shippingDetails?.name || "—"}</p>
                      <p className="text-xs text-slate-400">{order.shippingDetails?.email}</p>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{order.items?.length || 0} item(s)</td>
                    <td className="px-5 py-3.5 font-bold text-[#0b2545]">₹{order.grandTotal?.toLocaleString("en-IN")}</td>
                    <td className="px-5 py-3.5 text-slate-600 uppercase text-xs font-medium">{order.paymentMethod}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusColors[order.paymentStatus] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => setSelected(order)}
                        className="p-2 rounded-lg text-slate-500 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-[#061B33]/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-[#0b2545]">Order: <span className="font-mono">{selected.orderId}</span></h2>
                <p className="text-xs text-slate-400">{new Date(selected.createdAt).toLocaleDateString("en-IN", { dateStyle: "full" })}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">✕</button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Customer & Shipping</h3>
                <div className="bg-slate-50 rounded-2xl p-4 grid sm:grid-cols-2 gap-3 text-sm">
                  {[
                    ["Name", selected.shippingDetails?.name],
                    ["Email", selected.shippingDetails?.email],
                    ["Phone", selected.shippingDetails?.phone],
                    ["School", selected.shippingDetails?.schoolName || "—"],
                    ["Address", selected.shippingDetails?.address],
                    ["City / State", `${selected.shippingDetails?.city}, ${selected.shippingDetails?.state}`],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <span className="text-slate-500 text-xs">{label}</span>
                      <p className="font-medium text-slate-900">{value || "—"}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Items Ordered</h3>
                <div className="space-y-2">
                  {selected.items?.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                      {item.imageUrl && <img src={item.imageUrl} alt="" className="w-12 h-12 object-cover rounded-lg border border-slate-100" />}
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 text-sm">{item.name}</p>
                        <p className="text-xs text-slate-400">Qty: {item.quantity} · ₹{item.price?.toLocaleString("en-IN")} each</p>
                      </div>
                      <p className="font-bold text-[#0b2545]">₹{(item.price * item.quantity)?.toLocaleString("en-IN")}</p>
                    </div>
                  ))}
                  <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold text-[#0b2545]">
                    <span>Grand Total</span>
                    <span>₹{selected.grandTotal?.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Tracking */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Tracking Steps</h3>
                <p className="text-xs text-slate-400 mb-3">AWB: <span className="font-mono font-medium">{selected.awb}</span></p>
                <div className="space-y-2">
                  {selected.trackingSteps?.map((step, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${step.completed ? "bg-emerald-50 border-emerald-100" : "bg-slate-50 border-slate-100"}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${step.completed ? "bg-emerald-500" : "bg-slate-200"}`}>
                        {step.completed ? <CheckCircle2 size={14} className="text-white" /> : <Clock size={14} className="text-slate-400" />}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${step.completed ? "text-emerald-700" : "text-slate-600"}`}>{step.label}</p>
                        <p className="text-xs text-slate-400">{step.time}</p>
                      </div>
                      {!step.completed && (
                        <button
                          onClick={() => markStep(selected._id, i)}
                          disabled={updating}
                          className="text-xs font-bold bg-[#0b2545] text-white px-3 py-1.5 rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
                        >
                          {updating ? "..." : "Mark Done"}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
