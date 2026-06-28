import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, FileText, Image, GraduationCap, Users, ArrowUpRight, Loader2 } from "lucide-react";
import { adminApi } from "../services/adminApi";

const statConfig = [
  { key: "products", label: "Products", icon: Package, path: "/admin/products" },
  { key: "blogs", label: "Blog Posts", icon: FileText, path: "/admin/blogs" },
  { key: "gallery", label: "Gallery Items", icon: Image, path: "/admin/gallery" },
  { key: "courses", label: "Courses", icon: GraduationCap, path: "/admin/courses" },
  { key: "contact", label: "Total Leads", icon: Users, path: "/admin/leads" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const results = await Promise.all(
          statConfig.map((s) =>
            adminApi.get(`/${s.key}`, { params: { limit: 1 } }).catch(() => ({ data: { pagination: { total: 0 } } }))
          )
        );
        const nextCounts = {};
        statConfig.forEach((s, i) => {
          nextCounts[s.key] = results[i].data?.pagination?.total ?? 0;
        });
        setCounts(nextCounts);

        const { data: leadsData } = await adminApi.get("/contact", { params: { limit: 5 } });
        setRecentLeads(leadsData.data || []);
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0b2545] mb-1">Dashboard</h1>
      <p className="text-slate-500 text-sm mb-8">Overview of your site content and leads.</p>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {statConfig.map(({ key, label, icon: Icon, path }) => (
          <Link
            key={key}
            to={path}
            className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-cyan-300 hover:shadow-md transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0b2545] flex items-center justify-center mb-4 group-hover:bg-cyan-500 transition-colors duration-300">
              <Icon size={18} className="text-cyan-300 group-hover:text-white transition-colors duration-300" />
            </div>
            <p className="text-2xl font-bold text-[#0b2545]">
              {loading ? <Loader2 size={18} className="animate-spin" /> : counts[key] ?? 0}
            </p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-[#0b2545]">Recent Leads</h2>
          <Link to="/admin/leads" className="text-sm text-cyan-600 font-medium flex items-center gap-1 hover:text-cyan-700">
            View all <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="px-6 py-10 text-center text-slate-400"><Loader2 size={18} className="animate-spin inline" /></div>
          ) : recentLeads.length === 0 ? (
            <div className="px-6 py-10 text-center text-slate-400">No leads yet.</div>
          ) : (
            recentLeads.map((lead) => (
              <div key={lead._id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-medium text-slate-900 text-sm">{lead.name}</p>
                  <p className="text-xs text-slate-400">{lead.email} · {lead.schoolName || "No school listed"}</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 capitalize">
                  {lead.status?.replace("_", " ")}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}