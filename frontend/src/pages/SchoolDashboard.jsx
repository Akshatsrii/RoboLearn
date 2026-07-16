import { useState } from "react";
import { Link } from "react-router-dom";
import {
  School, ShieldAlert, Award, BarChart3,
  Bell, ShoppingBag, Plus, ArrowRight,
  ListTodo, CheckCircle2, ClipboardList
} from "lucide-react";
import SEO from "../components/SEO";

export default function SchoolDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [tickets, setTickets] = useState([]);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [newTicketForm, setNewTicketForm] = useState({ issue: "", priority: "Medium", desc: "" });

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const newTk = {
      id: `TK-${Math.floor(1000 + Math.random() * 9000)}`,
      issue: newTicketForm.issue,
      priority: newTicketForm.priority,
      status: "Received",
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      desc: newTicketForm.desc,
      history: ["Ticket Received (Just now)"],
    };
    setTickets((prev) => [newTk, ...prev]);
    setNewTicketForm({ issue: "", priority: "Medium", desc: "" });
    setShowNewTicket(false);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "curriculum", label: "Curriculum", icon: ListTodo },
    { id: "support", label: "Lab Support", icon: ShieldAlert },
    { id: "certificates", label: "Certificates", icon: Award },
  ];

  return (
    <div className="bg-white text-slate-900">
      <style>{`
        @keyframes dash { to { stroke-dashoffset: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .anim-fadeup { animation: fadeUp .7s ease both; }
        .circuit-line { stroke-dasharray: 6 6; stroke-dashoffset: 240; animation: dash 3s linear forwards 0.3s; }
        @media (prefers-reduced-motion: reduce) { .anim-fadeup, .circuit-line { animation: none !important; } }
      `}</style>

      <SEO
        title="School Partner Dashboard | RoboLearn"
        description="Manage your school's RoboLearn robotics program — track student progress, monitor support tickets, view training sessions, and download curriculum resources."
      />

      {/* ── HERO ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#040f1c] via-[#061b33] to-[#010812] py-24 lg:py-32 shadow-2xl">
        <svg className="absolute inset-0 w-full h-full opacity-[0.25]" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" fill="none">
          <g stroke="#22d3ee" strokeWidth="1.2">
            <path className="circuit-line" d="M0 90 H260 V210 H520" />
            <path className="circuit-line" d="M1200 60 H880 V180 H640" />
          </g>
          <g fill="#22d3ee">
            <circle cx="260" cy="90" r="4" /><circle cx="520" cy="210" r="4" />
            <circle cx="880" cy="60" r="4" /><circle cx="640" cy="180" r="4" />
          </g>
        </svg>

        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />

        <div className="relative max-w-6xl mx-auto px-6 anim-fadeup z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md text-cyan-300 border border-white/10 px-5 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                School Partner Portal
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-white tracking-tight drop-shadow-lg">
                School <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Dashboard</span>
              </h1>
              <p className="mt-6 text-slate-300 text-lg max-w-xl leading-relaxed font-medium">
                Track your robotics program, manage lab support tickets, and monitor student certificate progress — all in one place.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-2xl text-sm transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(34,211,238,0.3)]"
              >
                <Bell size={18} /> Contact Program Manager
              </Link>
              <Link
                to="/products"
                className="flex items-center justify-center gap-2 bg-white/5 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl text-sm font-bold hover:bg-white/10 hover:border-white/30 transition-all transform hover:-translate-y-1 hover:shadow-lg"
              >
                <ShoppingBag size={18} /> Order Supplies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────── */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">

          {/* Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap border-b border-slate-100 pb-4">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === id
                    ? "bg-[#0b2545] text-white shadow-md"
                    : "text-slate-500 hover:text-[#0b2545] hover:bg-slate-50"
                }`}
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>

          {/* ── Overview Tab ── */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* No school linked state */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#0b2545] flex items-center justify-center mx-auto mb-5">
                  <School size={28} className="text-cyan-400" />
                </div>
                <h2 className="text-xl font-bold text-[#0b2545] mb-2">No School Linked Yet</h2>
                <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                  Your school account isn't linked to a program yet. Contact our program manager to get started with your robotics lab setup.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-[#0b2545] hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
                  >
                    <Bell size={15} /> Contact Program Manager
                  </Link>
                  <Link
                    to="/curriculum"
                    className="inline-flex items-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
                  >
                    View Curriculum <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Info Cards — what you get when linked */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 px-1">What's included in your program</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: BarChart3, title: "Progress Tracking", desc: "Monitor curriculum completion and batch progress in real time." },
                    { icon: ShieldAlert, title: "Lab Support Tickets", desc: "File and track hardware/software maintenance requests." },
                    { icon: Award, title: "Student Certificates", desc: "View and verify all certificates issued to your students." },
                    { icon: ClipboardList, title: "Curriculum Access", desc: "Download lesson plans, worksheets, and project guides." },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="group relative overflow-hidden bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 hover:border-cyan-400 hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.15)] hover:-translate-y-1 transition-all duration-500">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-xl -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700" />
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-blue-600 transition-all duration-500 relative z-10">
                        <Icon size={20} className="text-[#0b2545] group-hover:text-white transition-colors duration-500" />
                      </div>
                      <h4 className="font-extrabold text-[#0b2545] text-base mb-2 relative z-10">{title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium relative z-10">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Curriculum Tab ── */}
          {activeTab === "curriculum" && (
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4">
                <ListTodo size={24} className="text-slate-400" />
              </div>
              <h2 className="text-lg font-bold text-[#0b2545] mb-2">Curriculum Not Assigned</h2>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                Once your school is linked to a program, your curriculum modules and progress checklist will appear here.
              </p>
              <Link to="/curriculum" className="inline-flex mt-6 items-center gap-2 text-cyan-600 font-semibold text-sm hover:underline">
                Browse Curriculum <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {/* ── Support Tickets Tab ── */}
          {activeTab === "support" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-[#0b2545] text-lg flex items-center gap-2">
                    <ShieldAlert size={18} className="text-rose-500" /> Lab Support Tickets
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">Report hardware issues or lab maintenance requests.</p>
                </div>
                <button
                  onClick={() => setShowNewTicket(true)}
                  className="bg-[#0b2545] hover:bg-cyan-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
                >
                  <Plus size={14} /> File Ticket
                </button>
              </div>

              {/* New Ticket Modal */}
              {showNewTicket && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="text-sm font-bold text-[#0b2545]">Create Maintenance Request</h3>
                      <button onClick={() => setShowNewTicket(false)} className="text-slate-400 hover:text-slate-700">✕</button>
                    </div>
                    <form onSubmit={handleCreateTicket} className="space-y-3">
                      <div>
                        <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Issue Subject</label>
                        <input
                          required
                          value={newTicketForm.issue}
                          onChange={(e) => setNewTicketForm((p) => ({ ...p, issue: e.target.value }))}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                          placeholder="e.g. Broken soldering iron kit"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Priority Level</label>
                        <select
                          value={newTicketForm.priority}
                          onChange={(e) => setNewTicketForm((p) => ({ ...p, priority: e.target.value }))}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-cyan-500/30"
                        >
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Details / Description</label>
                        <textarea
                          required
                          rows={3}
                          value={newTicketForm.desc}
                          onChange={(e) => setNewTicketForm((p) => ({ ...p, desc: e.target.value }))}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                          placeholder="Describe the hardware/cabling issue..."
                        />
                      </div>
                      <button type="submit" className="w-full bg-[#0b2545] hover:bg-cyan-600 text-white font-bold py-2.5 rounded-xl text-xs transition-colors">
                        Submit Ticket
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {tickets.length === 0 ? (
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center">
                  <ShieldAlert size={36} className="text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm font-medium">No tickets filed yet.</p>
                  <p className="text-slate-400 text-xs mt-1">Click "File Ticket" to report a lab hardware or software issue.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tickets.map((t) => (
                    <div key={t.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 hover:border-slate-300 transition-all">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            t.priority === "High" ? "bg-red-50 text-red-600 border-red-100" :
                            t.priority === "Medium" ? "bg-amber-50 text-amber-600 border-amber-100" :
                            "bg-blue-50 text-blue-600 border-blue-100"
                          }`}>
                            {t.priority} Priority
                          </span>
                          <h4 className="font-bold text-sm text-[#0b2545] mt-2">{t.issue}</h4>
                          <p className="text-[10px] text-slate-400 mt-1">Ticket ID: {t.id} · Filed {t.date}</p>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                          t.status === "Resolved" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-cyan-50 text-cyan-600 border-cyan-100"
                        }`}>
                          {t.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">{t.desc}</p>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Resolution History</p>
                        <div className="space-y-1">
                          {t.history.map((h, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Certificates Tab ── */}
          {activeTab === "certificates" && (
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4">
                <Award size={24} className="text-slate-400" />
              </div>
              <h2 className="text-lg font-bold text-[#0b2545] mb-2">No Certificates Issued Yet</h2>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                Student certificates will appear here once your school's program is active and modules are completed.
              </p>
              <Link to="/verify" className="inline-flex mt-6 items-center gap-2 text-cyan-600 font-semibold text-sm hover:underline">
                Verify a Certificate <ArrowRight size={14} />
              </Link>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
