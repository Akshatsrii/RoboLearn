import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, FileText, Image, GraduationCap, Users, ArrowUpRight, Loader2, TrendingUp } from "lucide-react";
import { adminApi } from "../services/adminApi";

const statConfig = [
  { key: "products", label: "Products", icon: Package, path: "/admin/products", color: "text-cyan-600" },
  { key: "blogs", label: "Blog Posts", icon: FileText, path: "/admin/blogs", color: "text-blue-600" },
  { key: "gallery", label: "Gallery Items", icon: Image, path: "/admin/gallery", color: "text-purple-600" },
  { key: "courses", label: "Courses", icon: GraduationCap, path: "/admin/courses", color: "text-emerald-600" },
  { key: "contact", label: "Total Leads", icon: Users, path: "/admin/leads", color: "text-amber-600" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const results = await Promise.allSettled(
          statConfig.map((s) =>
            adminApi.get(`/${s.key}`, { params: { limit: 1 } })
          )
        );
        const nextCounts = {};
        statConfig.forEach((s, i) => {
          if (results[i].status === "fulfilled") {
            nextCounts[s.key] = results[i].value.data?.pagination?.total ?? 0;
          } else {
            nextCounts[s.key] = 0;
          }
        });
        setCounts(nextCounts);

        const { data: leadsData } = await adminApi.get("/contact", { params: { limit: 5, sort: "-createdAt" } });
        setRecentLeads(leadsData.data || []);
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {statConfig.map(({ key, label, icon: Icon, path, color }) => (
          <Link
            key={key}
            to={path}
            className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-cyan-300 hover:shadow-md transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0b2545] flex items-center justify-center mb-4 group-hover:bg-cyan-500 transition-colors duration-300">
              <Icon size={18} className="text-cyan-300 group-hover:text-white transition-colors duration-300" />
            </div>
            <p className="text-2xl font-bold text-[#0b2545]">
              {loading ? <Loader2 size={18} className="animate-spin inline text-slate-300" /> : (counts[key] ?? 0)}
            </p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <div className="bg-gradient-to-br from-[#0b2545] to-[#0e3a63] rounded-2xl p-6 text-white">
          <TrendingUp size={22} className="text-cyan-400 mb-3" />
          <h3 className="font-semibold mb-1">Add new blog post</h3>
          <p className="text-slate-300 text-sm mb-4">Publish an article — it appears on the Blog page immediately.</p>
          <Link to="/admin/blogs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors">
            Go to Blogs <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="bg-gradient-to-br from-[#0b2545] to-[#0e3a63] rounded-2xl p-6 text-white">
          <Package size={22} className="text-cyan-400 mb-3" />
          <h3 className="font-semibold mb-1">Add a product</h3>
          <p className="text-slate-300 text-sm mb-4">New robotics kits or tools — visible on the Products page right away.</p>
          <Link to="/admin/products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors">
            Go to Products <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-[#0b2545]">Recent Leads</h2>
          <Link to="/admin/leads" className="text-sm text-cyan-600 font-medium flex items-center gap-1 hover:text-cyan-700 transition-colors">
            View all <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="px-6 py-10 text-center text-slate-400">
              <Loader2 size={18} className="animate-spin inline" />
            </div>
          ) : recentLeads.length === 0 ? (
            <div className="px-6 py-10 text-center text-slate-400">
              <p className="font-medium">No leads yet.</p>
              <p className="text-sm mt-1">When someone submits the Contact form, it will appear here.</p>
            </div>
          ) : (
            recentLeads.map((lead) => (
              <div key={lead._id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-medium text-slate-900 text-sm">{lead.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{lead.email} · {lead.schoolName || "No school"} · {lead.city || "No city"}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                  lead.status === "new" ? "bg-blue-50 text-blue-600" :
                  lead.status === "contacted" ? "bg-amber-50 text-amber-600" :
                  lead.status === "in_progress" ? "bg-purple-50 text-purple-600" :
                  "bg-emerald-50 text-emerald-600"
                }`}>
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