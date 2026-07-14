import { useState } from "react";
import { Link } from "react-router-dom";
import {
  School, Users, BookOpen, BarChart3, ShoppingBag, Award,
  Cpu, CalendarDays, TrendingUp, ChevronRight, ArrowRight,
  Package, GraduationCap, CheckCircle2, Bell, Download,
  ClipboardList, Star, ShieldAlert, Plus, MessageSquare, ListTodo
} from "lucide-react";
import SEO from "../components/SEO";

/* ============================================================
   MOCK DATA
   ============================================================ */
const SCHOOL = {
  name: "Delhi Public School, Rohini",
  program: "Standard STEM Lab Program",
  grade: "Grades 6–8",
  batchSize: 30,
  batches: 3,
  startDate: "April 2024",
  contact: "Mrs. Sunita Kapoor",
  city: "Delhi",
};

const INITIAL_TICKETS = [
  { id: "TK-7801", issue: "Ultrasonic sensor not reading distance", priority: "Medium", status: "In Progress", date: "12 Jul 2026", desc: "Two sensors from Batch B are returning 0cm values constantly.", history: ["Ticket Received (12 Jul)", "Engineer Assigned: Mr. Vikas (13 Jul)"] },
  { id: "TK-6402", issue: "Arduino Nano board port driver error", priority: "Low", status: "Resolved", date: "02 Jun 2026", desc: "Laptops not detecting the board over USB.", history: ["Ticket Received (02 Jun)", "Driver package shared via email (03 Jun)", "Resolved (04 Jun)"] },
];

const INITIAL_CERTIFICATES = [
  { id: "CERT-RL-2024-0012", student: "Aarav Gupta", grade: "Class 7", program: "Arduino Explorer", date: "15 May 2026" },
  { id: "CERT-RL-2024-0015", student: "Diya Malhotra", grade: "Class 8", program: "IoT Foundations", date: "22 May 2026" },
  { id: "CERT-RL-2024-0018", student: "Kabir Mehta", grade: "Class 6", program: "Scratch Master", date: "04 Jun 2026" },
];

const CURRICULUM_MILESTONES = [
  { id: 1, title: "Module 1: Basic LED Arrays & Wiring", completed: true },
  { id: 2, title: "Module 2: Potentiometers & Variables", completed: true },
  { id: 3, title: "Module 3: Ultrasonic Distance Mapping", completed: true },
  { id: 4, title: "Module 4: Servo Motor Integration", completed: false },
  { id: 5, title: "Module 5: Bluetooth Serial Control", completed: false },
];

export default function SchoolDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [newTicketForm, setNewTicketForm] = useState({ issue: "", priority: "Medium", desc: "" });

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const newTk = {
      id: `TK-${Math.floor(1000 + Math.random() * 9000)}`,
      issue: newTicketForm.issue,
      priority: newTicketForm.priority,
      status: "Received",
      date: "Today",
      desc: newTicketForm.desc,
      history: ["Ticket Received (Just now)"]
    };
    setTickets(prev => [newTk, ...prev]);
    setNewTicketForm({ issue: "", priority: "Medium", desc: "" });
    setShowNewTicket(false);
  };

  const fmt = (n) => n.toLocaleString("en-IN");

  return (
    <>
      <SEO
        title="School Partner Dashboard | RoboLearn"
        description="Manage your school's RoboLearn robotics program — track student progress, monitor support tickets, view training sessions, and download curriculum resources."
      />
      <div className="min-h-screen bg-gradient-to-br from-[#040d1a] via-[#071428] to-[#040d1a] text-white">

        {/* ── Header ────────────────────────────────────── */}
        <div className="bg-white/5 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 pt-24 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                <School size={26} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-extrabold text-white">{SCHOOL.name}</h1>
                  <span className="text-xs bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">Active Partner</span>
                </div>
                <p className="text-sm text-slate-400">{SCHOOL.program} · {SCHOOL.grade} · {SCHOOL.city}</p>
                <p className="text-xs text-slate-500 mt-0.5">Contact: {SCHOOL.contact} · Since {SCHOOL.startDate}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/contact"
                className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
                <Bell size={14} /> Contact Program Manager
              </Link>
              <Link to="/products"
                className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-4 py-2.5 rounded-xl text-sm hover:bg-white/10 transition-colors">
                <ShoppingBag size={14} /> Order Supplies
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* ── Stats ─────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Users, label: "Students Trained", value: "90", sub: "3 batches active", color: "#06b6d4" },
              { icon: BookOpen, label: "Curriculum Progress", value: "60%", sub: "3/5 modules complete", color: "#8b5cf6" },
              { icon: Award, label: "Issued Certificates", value: "72", sub: "Verified via lookup", color: "#f59e0b" },
              { icon: Star, label: "Workshops Hosted", value: "8 sessions", sub: "Next: July 20th", color: "#10b981" },
            ].map(({ icon: Icon, label, value, sub, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <Icon size={20} style={{ color }} className="mb-2" />
                <div className="text-2xl font-extrabold text-white">{value}</div>
                <div className="text-xs text-slate-400 mt-0.5">{label}</div>
                <div className="text-xs mt-1" style={{ color }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* ── Tabs ──────────────────────────────────────── */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "curriculum", label: "Curriculum", icon: ListTodo },
              { id: "support", label: "Lab Support Portal", icon: ShieldAlert },
              { id: "certificates", label: "Certificates", icon: Award },
            ].map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === id
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30"
                    : "bg-white/5 border border-white/10 text-slate-300 hover:border-white/25"
                }`}>
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>

          {/* ── Tab Contents ──────────────────────────────── */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Program Info */}
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="font-bold text-white mb-4 flex items-center gap-2">
                  <ClipboardList size={16} className="text-cyan-400" /> Program Overview
                </h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    { l: "Program", v: SCHOOL.program },
                    { l: "Grade Level", v: SCHOOL.grade },
                    { l: "Batch Size", v: `${SCHOOL.batchSize} students/batch` },
                    { l: "Active Batches", v: `${SCHOOL.batches} batches` },
                    { l: "Start Date", v: SCHOOL.startDate },
                    { l: "City", v: SCHOOL.city },
                  ].map(({ l, v }) => (
                    <div key={l}>
                      <div className="text-slate-500 text-xs mb-1">{l}</div>
                      <div className="text-white font-semibold">{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h3 className="font-semibold text-white mb-3 text-sm">Upcoming Workshops</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-xs font-bold text-cyan-400">July 20, 2026</p>
                      <p className="text-xs font-bold text-white mt-1">IoT &amp; Smart Sensors Workshop</p>
                      <p className="text-[10px] text-slate-400">Trainer: Mr. Rajan Verma</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-violet-500/15 to-cyan-500/15 border border-violet-500/30 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={14} className="text-amber-400" />
                    <span className="text-sm font-bold text-white">Next Milestone</span>
                  </div>
                  <p className="text-slate-300 text-sm">Term 2 Project Exhibition</p>
                  <div className="mt-3 bg-white/10 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-cyan-500 to-violet-500 h-1.5 rounded-full" style={{ width: "60%" }} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5">60% of term completed</p>
                </div>
              </div>
            </div>
          )}

          {/* Curriculum checklist tab */}
          {activeTab === "curriculum" && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <h2 className="font-bold text-white flex items-center gap-2 mb-4">
                <ListTodo size={16} className="text-cyan-400" /> Curriculum Progress Checklist
              </h2>
              <div className="space-y-3">
                {CURRICULUM_MILESTONES.map((m) => (
                  <div key={m.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                    <input type="checkbox" readOnly checked={m.completed} className="accent-cyan-400 h-4 w-4 rounded cursor-default" />
                    <span className={`text-xs font-semibold ${m.completed ? "text-slate-400 line-through" : "text-white"}`}>{m.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Support Ticket tab */}
          {activeTab === "support" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-white flex items-center gap-2">
                  <ShieldAlert size={16} className="text-rose-400" /> Lab Maintenance Tickets
                </h2>
                <button
                  onClick={() => setShowNewTicket(true)}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition"
                >
                  <Plus size={14} /> File Support Ticket
                </button>
              </div>

              {/* New Ticket Form Modal */}
              {showNewTicket && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                  <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <h3 className="text-sm font-bold text-white">Create Maintenance Request</h3>
                      <button onClick={() => setShowNewTicket(false)} className="text-slate-400 hover:text-white">✕</button>
                    </div>
                    <form onSubmit={handleCreateTicket} className="space-y-3">
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Issue Subject</label>
                        <input required value={newTicketForm.issue} onChange={e => setNewTicketForm(p => ({ ...p, issue: e.target.value }))} className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white" placeholder="e.g. Broken soldering iron kit" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Priority Level</label>
                        <select value={newTicketForm.priority} onChange={e => setNewTicketForm(p => ({ ...p, priority: e.target.value }))} className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white">
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Details / Description</label>
                        <textarea required rows={3} value={newTicketForm.desc} onChange={e => setNewTicketForm(p => ({ ...p, desc: e.target.value }))} className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white" placeholder="Describe the hardware/cabling issue..." />
                      </div>
                      <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2.5 rounded-xl text-xs transition">Submit Ticket</button>
                    </form>
                  </div>
                </div>
              )}

              {/* Tickets list */}
              <div className="space-y-4">
                {tickets.map((t) => (
                  <div key={t.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          t.priority === "High" ? "bg-red-500/20 text-red-400" : t.priority === "Medium" ? "bg-amber-500/20 text-amber-400" : "bg-blue-500/20 text-blue-400"
                        }`}>
                          {t.priority} Priority
                        </span>
                        <h4 className="font-extrabold text-sm text-white mt-2">{t.issue}</h4>
                        <p className="text-[10px] text-slate-400 mt-1">Ticket ID: {t.id} · Filed {t.date}</p>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${t.status === "Resolved" ? "bg-emerald-500/20 text-emerald-400" : "bg-cyan-500/20 text-cyan-400"}`}>
                        {t.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5">{t.desc}</p>

                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Resolution History</p>
                      <div className="space-y-1">
                        {t.history.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates tab */}
          {activeTab === "certificates" && (
            <div className="space-y-4">
              <h2 className="font-bold text-white mb-2">Issued Certificates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INITIAL_CERTIFICATES.map((cert) => (
                  <div key={cert.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/20 transition-all">
                    <div>
                      <Award size={20} className="text-amber-400 mb-2" />
                      <p className="text-sm font-extrabold text-white">{cert.student}</p>
                      <p className="text-xs text-slate-400">{cert.grade} · {cert.program}</p>
                      <p className="text-[10px] text-slate-500 mt-1">Certificate ID: {cert.id}</p>
                    </div>
                    <Link to={`/verify?id=${cert.id}`} className="mt-4 text-xs text-cyan-400 font-bold hover:underline flex items-center gap-1">
                      Verify Credential <ArrowRight size={12} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
