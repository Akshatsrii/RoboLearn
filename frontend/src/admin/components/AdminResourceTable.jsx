import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, X, Search, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { adminApi } from "../../admin/services/adminApi";

/**
 * Config-driven CRUD table.
 * props:
 *   resource   – API path, e.g. "/products"
 *   title      – page heading, e.g. "Products"
 *   columns    – [{ key, label }]
 *   fields     – [{ name, label, type, options }]
 *   emptyItem  – default values for "Add new" form
 */
export default function AdminResourceTable({ resource, title, columns, fields, emptyItem }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyItem);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null); // { type: "success"|"error", message }

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.get(resource, { params: { search, limit: 50 } });
      setItems(data.data || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [resource, search]);

  useEffect(() => {
    const t = setTimeout(fetchItems, 300);
    return () => clearTimeout(t);
  }, [fetchItems]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyItem);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ ...emptyItem, ...item });
    setError("");
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editing) {
        await adminApi.put(`${resource}/${editing._id}`, form);
        showToast("success", `${title.replace(/s$/, "")} updated successfully!`);
      } else {
        await adminApi.post(resource, form);
        showToast("success", `${title.replace(/s$/, "")} added successfully!`);
      }
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
      showToast("error", msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item? This cannot be undone.")) return;
    try {
      await adminApi.delete(`${resource}/${id}`);
      showToast("success", "Deleted successfully.");
      fetchItems();
    } catch {
      showToast("error", "Delete failed. Please try again.");
    }
  };

  const handleFieldChange = (name, value) => setForm((p) => ({ ...p, [name]: value }));

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[100] flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-lg border text-sm font-medium transition-all ${
          toast.type === "success"
            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
            : "bg-red-50 border-red-200 text-red-700"
        }`}>
          {toast.type === "success"
            ? <CheckCircle2 size={18} className="text-emerald-500" />
            : <AlertCircle size={18} className="text-red-500" />
          }
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[#0b2545]">{title}</h1>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-[#0b2545] hover:bg-cyan-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${title.toLowerCase()}...`}
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-slate-500 text-xs uppercase tracking-wider">
                {columns.map((c) => (
                  <th key={c.key} className="px-5 py-3 font-semibold">{c.label}</th>
                ))}
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-5 py-12 text-center text-slate-400">
                    <Loader2 size={20} className="animate-spin inline" />
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-5 py-12 text-center text-slate-400">
                    No {title.toLowerCase()} found. Click "Add New" to create one.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                    {columns.map((c) => (
                      <td key={c.key} className="px-5 py-3.5 text-slate-700 max-w-xs truncate">
                        {c.render ? c.render(item[c.key], item) : String(item[c.key] ?? "—")}
                      </td>
                    ))}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-2 rounded-lg text-slate-500 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
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

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-[#061B33]/50 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white">
              <h2 className="font-bold text-[#0b2545]">
                {editing ? "Edit" : "Add New"} {title.replace(/s$/, "")}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-4">
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={form[f.name] ?? ""}
                      onChange={(e) => handleFieldChange(f.name, e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors resize-none"
                    />
                  ) : f.type === "select" ? (
                    <select
                      value={form[f.name] ?? ""}
                      onChange={(e) => handleFieldChange(f.name, e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors"
                    >
                      {f.options.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  ) : f.type === "checkbox" ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!!form[f.name]}
                        onChange={(e) => handleFieldChange(f.name, e.target.checked)}
                        className="w-4 h-4 accent-cyan-600"
                      />
                      <span className="text-sm text-slate-600">{f.label}</span>
                    </div>
                  ) : (
                    <input
                      type={f.type || "text"}
                      value={form[f.name] ?? ""}
                      onChange={(e) => handleFieldChange(f.name, e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors"
                    />
                  )}
                </div>
              ))}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-[#0b2545] hover:bg-cyan-600 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}