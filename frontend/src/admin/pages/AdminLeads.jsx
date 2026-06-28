import { useState, useEffect, useCallback } from "react";
import { Search, Loader2, Trash2, Mail, Phone } from "lucide-react";
import { adminApi } from "../services/adminApi";

const statusStyles = {
  new: "bg-blue-50 text-blue-600",
  contacted: "bg-amber-50 text-amber-600",
  in_progress: "bg-purple-50 text-purple-600",
  closed: "bg-emerald-50 text-emerald-600",
};

const statusOptions = ["new", "contacted", "in_progress", "closed"];

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.get("/contact", {
        params: { search, status: statusFilter || undefined, limit: 50 },
      });
      setLeads(data.data || []);
    } catch {
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const t = setTimeout(fetchLeads, 300);
    return () => clearTimeout(t);
  }, [fetchLeads]);

  const updateStatus = async (id, status) => {
    await adminApi.patch(`/contact/${id}/status`, { status });
    setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    await adminApi.delete(`/contact/${id}`);
    fetchLeads();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0b2545] mb-6">Leads</h1>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative max-w-sm flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors"
        >
          <option value="">All statuses</option>
          {statusOptions.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
        </select>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Contact</th>
                <th className="px-5 py-3 font-semibold">School / City</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-400"><Loader2 size={20} className="animate-spin inline" /></td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-400">No leads found.</td></tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-50/80 transition-colors align-top">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-slate-900">{lead.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-2 max-w-[220px]">{lead.message}</p>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 hover:text-cyan-600">
                        <Mail size={13} /> {lead.email}
                      </a>
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 hover:text-cyan-600 mt-1">
                        <Phone size={13} /> {lead.phone}
                      </a>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {lead.schoolName || "—"}<br />
                      <span className="text-xs text-slate-400">{lead.city}</span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 capitalize">{lead.type}</td>
                    <td className="px-5 py-3.5">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead._id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 outline-none cursor-pointer ${statusStyles[lead.status] || "bg-slate-100 text-slate-600"}`}
                      >
                        {statusOptions.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button onClick={() => handleDelete(lead._id)} className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}