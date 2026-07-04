import { useState, useEffect, useCallback } from "react";
import { Search, Loader2, Trash2, Mail, Phone, Eye } from "lucide-react";
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
  const [selected, setSelected] = useState(null);

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

      {/* Filters */}
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
          className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40 transition-colors"
        >
          <option value="">All statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>{s.replace("_", " ")}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {statusOptions.map((s) => (
          <div key={s} className="bg-white border border-slate-200 rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-[#0b2545]">
              {leads.filter((l) => l.status === s).length}
            </p>
            <p className="text-xs text-slate-500 capitalize mt-0.5">{s.replace("_", " ")}</p>
          </div>
        ))}
      </div>

      {/* Table */}
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
                <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                  <Loader2 size={20} className="animate-spin inline" />
                </td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                  No leads found. When someone submits the Contact form, it appears here.
                </td></tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-50/80 transition-colors align-top">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-slate-900">{lead.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 max-w-[180px]">{lead.message}</p>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 space-y-1">
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors">
                        <Mail size={13} /> {lead.email}
                      </a>
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors">
                        <Phone size={13} /> {lead.phone}
                      </a>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      <p>{lead.schoolName || "—"}</p>
                      <p className="text-xs text-slate-400">{lead.city}</p>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 capitalize">{lead.type}</td>
                    <td className="px-5 py-3.5">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead._id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 outline-none cursor-pointer ${statusStyles[lead.status] || "bg-slate-100 text-slate-600"}`}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{s.replace("_", " ")}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelected(lead)}
                          className="p-2 rounded-lg text-slate-500 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(lead._id)}
                          className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-[#061B33]/50 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="font-bold text-[#0b2545] mb-4">Lead Details</h2>
            <div className="space-y-3 text-sm">
              {[
                ["Name", selected.name],
                ["Email", selected.email],
                ["Phone", selected.phone],
                ["School", selected.schoolName || "—"],
                ["City", selected.city || "—"],
                ["Type", selected.type],
                ["Status", selected.status],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-3 gap-2">
                  <span className="text-slate-500 font-medium">{label}</span>
                  <span className="col-span-2 text-slate-900">{value}</span>
                </div>
              ))}
              <div>
                <p className="text-slate-500 font-medium mb-1">Message</p>
                <p className="text-slate-900 bg-slate-50 rounded-xl p-3 leading-relaxed">{selected.message}</p>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="mt-5 w-full bg-[#0b2545] hover:bg-cyan-600 text-white py-2.5 rounded-xl font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}