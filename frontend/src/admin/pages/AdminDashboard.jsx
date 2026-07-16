import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package, FileText, Image, GraduationCap, Users, ArrowUpRight,
  Loader2, TrendingUp, ShoppingCart, BarChart3, CheckCircle, Clock,
} from "lucide-react";
import { adminApi } from "../services/adminApi";

const statConfig = [
  { key: "products", label: "Products", icon: Package, path: "/admin/products", color: "from-cyan-500 to-blue-600" },
  { key: "blogs", label: "Blog Posts", icon: FileText, path: "/admin/blogs", color: "from-purple-500 to-indigo-600" },
  { key: "gallery", label: "Gallery", icon: Image, path: "/admin/gallery", color: "from-pink-500 to-rose-600" },
  { key: "courses", label: "Courses", icon: GraduationCap, path: "/admin/courses", color: "from-emerald-500 to-teal-600" },
  { key: "contact", label: "Leads", icon: Users, path: "/admin/leads", color: "from-amber-500 to-orange-600" },
  { key: "orders", label: "Orders", icon: ShoppingCart, path: "/admin/orders", color: "from-violet-500 to-purple-600" },
];

const statusColors = {
  new: "bg-blue-50 text-blue-600",
  contacted: "bg-amber-50 text-amber-600",
  in_progress: "bg-purple-50 text-purple-600",
  closed: "bg-emerald-50 text-emerald-600",
};

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});
  const [recentLeads, setRecentLeads] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const results = await Promise.allSettled(
          statConfig.map((s) => adminApi.get(`/${s.key === "orders" ? "payment/orders" : s.key}`, { params: { limit: 1 } }))
        );
        const nextCounts = {};
        statConfig.forEach((s, i) => {
          if (results[i].status === "fulfilled") {
            const d = results[i].value.data;
            nextCounts[s.key] = d?.pagination?.total ?? d?.total ?? 0;
          } else {
            nextCounts[s.key] = 0;
          }
        });
        setCounts(nextCounts);

        const [leadsRes, ordersRes] = await Promise.allSettled([
          adminApi.get("/contact", { params: { limit: 5 } }),
          adminApi.get("/payment/orders", { params: { limit: 5 } }),
        ]);
        if (leadsRes.status === "fulfilled") setRecentLeads(leadsRes.value.data?.data || []);
        if (ordersRes.status === "fulfilled") setRecentOrders(ordersRes.value.data?.data || []);
      } catch {
        // fail silently
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0b2545]">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Overview of your site content and incoming leads.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
        {statConfig.map(({ key, label, icon: Icon, path, color }) => (
          <Link
            key={key}
            to={path}
            className="group bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
              <Icon size={18} className="text-white" />
            </div>
            <p className="text-2xl font-bold text-[#0b2545]">
              {loading ? <Loader2 size={18} className="animate-spin inline text-slate-300" /> : (counts[key] ?? 0)}
            </p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: TrendingUp, label: "New Blog Post", desc: "Publish an article right away.", to: "/admin/blogs" },
          { icon: Package, label: "Add Product", desc: "New robotics kits or tools.", to: "/admin/products" },
          { icon: ShoppingCart, label: "Manage Orders", desc: "Update order tracking status.", to: "/admin/orders" },
        ].map(({ icon: Icon, label, desc, to }) => (
          <div key={label} className="bg-gradient-to-br from-[#0b2545] to-[#0e3a63] rounded-2xl p-6 text-white">
            <Icon size={22} className="text-cyan-400 mb-3" />
            <h3 className="font-semibold mb-1">{label}</h3>
            <p className="text-slate-300 text-sm mb-4">{desc}</p>
            <Link to={to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors">
              Open <ArrowUpRight size={14} />
            </Link>
          </div>
        ))}
      </div>

      {/* Recent Leads + Recent Orders */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-[#0b2545] flex items-center gap-2"><Users size={16} className="text-slate-400" />Recent Leads</h2>
            <Link to="/admin/leads" className="text-sm text-cyan-600 font-medium flex items-center gap-1 hover:text-cyan-700">
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="px-6 py-10 text-center text-slate-400"><Loader2 size={18} className="animate-spin inline" /></div>
            ) : recentLeads.length === 0 ? (
              <div className="px-6 py-10 text-center text-slate-400 text-sm">No leads yet.</div>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead._id} className="flex items-center justify-between px-6 py-3.5">
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{lead.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{lead.email} · {lead.city || "—"}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[lead.status] || "bg-slate-100 text-slate-600"}`}>
                    {lead.status?.replace("_", " ")}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-[#0b2545] flex items-center gap-2"><ShoppingCart size={16} className="text-slate-400" />Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm text-cyan-600 font-medium flex items-center gap-1 hover:text-cyan-700">
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="px-6 py-10 text-center text-slate-400"><Loader2 size={18} className="animate-spin inline" /></div>
            ) : recentOrders.length === 0 ? (
              <div className="px-6 py-10 text-center text-slate-400 text-sm">No orders yet.</div>
            ) : (
              recentOrders.map((order) => (
                <div key={order._id} className="flex items-center justify-between px-6 py-3.5">
                  <div>
                    <p className="font-medium text-slate-900 text-sm font-mono">{order.orderId}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{order.shippingDetails?.name} · {order.items?.length} item(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#0b2545] text-sm">₹{order.grandTotal?.toLocaleString("en-IN")}</p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${order.paymentStatus === "paid" || order.paymentStatus === "cod" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}