import { useState } from "react";
import { Link } from "react-router-dom";
import {
  School, Users, BookOpen, BarChart3, ShoppingBag, Award,
  Cpu, CalendarDays, TrendingUp, ChevronRight, ArrowRight,
  Package, GraduationCap, CheckCircle2, Bell, Download,
  ClipboardList, Star
} from "lucide-react";
import SEO from "../components/SEO";

/* ============================================================
   MOCK DATA  (replace with API calls in production)
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

const STATS = [
  { icon: Users,      label: "Students Enrolled",   value: "90",   sub: "3 batches × 30",       color: "#06b6d4" },
  { icon: BookOpen,   label: "Projects Completed",  value: "24",   sub: "8 per batch",           color: "#8b5cf6" },
  { icon: Award,      label: "Certifications Given", value: "72",   sub: "Arduino + Explorer",   color: "#f59e0b" },
  { icon: TrendingUp, label: "Avg. Skill Score",    value: "84%",  sub: "+12% from last term",  color: "#10b981" },
];

const ORDERS = [
  { id: "RL-2024-0041", item: "Standard STEM Kit ×30", date: "15 Mar 2024", status: "Delivered",   statusColor: "text-emerald-400" },
  { id: "RL-2024-0078", item: "Sensor Add-on Pack ×10", date: "02 May 2024", status: "In Transit",  statusColor: "text-amber-400"   },
  { id: "RL-2024-0091", item: "Arduino Mega ×5",       date: "18 Jun 2024", status: "Processing",  statusColor: "text-blue-400"    },
];

const SESSIONS = [
  { date: "Jul 20, 2024", topic: "IoT & Smart Home Sensors",    trainer: "Mr. Rajan Verma",  status: "Upcoming" },
  { date: "Jun 14, 2024", topic: "Arduino C++ Fundamentals",    trainer: "Ms. Prachi Jain",  status: "Completed" },
  { date: "May 10, 2024", topic: "Intro to Microcontrollers",   trainer: "Mr. Rajan Verma",  status: "Completed" },
];

const RESOURCES = [
  { title: "Term 1 Curriculum Guide",   type: "PDF", size: "2.3 MB" },
  { title: "Arduino Starter Workbook",  type: "PDF", size: "5.1 MB" },
  { title: "Project Assessment Rubric", type: "PDF", size: "0.8 MB" },
  { title: "Safety Guidelines – Lab",   type: "PDF", size: "1.2 MB" },
];

const TABS = [
  { id: "overview",   label: "Overview",   icon: BarChart3     },
  { id: "orders",     label: "Orders",     icon: ShoppingBag   },
  { id: "sessions",   label: "Training",   icon: CalendarDays  },
  { id: "resources",  label: "Resources",  icon: Download      },
];

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function SchoolDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <SEO
        title="School Partner Dashboard | RoboLearn"
        description="Manage your school's RoboLearn robotics program — track student progress, monitor orders, view training sessions, and download curriculum resources."
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
                <Bell size={14} /> Contact RoboLearn
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
            {STATS.map(({ icon: Icon, label, value, sub, color }) => (
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
            {TABS.map(({ id, label, icon: Icon }) => (
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

          {/* ── Overview ──────────────────────────────────── */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Program Info */}
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="font-bold text-white mb-4 flex items-center gap-2">
                  <ClipboardList size={16} className="text-cyan-400" /> Program Details
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
                  <h3 className="font-semibold text-white mb-3 text-sm">Quick Actions</h3>
                  <div className="space-y-2">
                    {[
                      { label: "View Curriculum",  to: "/curriculum", icon: BookOpen },
                      { label: "Order New Kits",   to: "/products",   icon: Package },
                      { label: "Book Training",    to: "/contact",    icon: GraduationCap },
                      { label: "Impact Calculator",to: "/impact-calculator", icon: BarChart3 },
                    ].map(({ label, to, icon: Icon }) => (
                      <Link key={to} to={to}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors group">
                        <span className="flex items-center gap-2 text-sm text-slate-300 group-hover:text-white">
                          <Icon size={14} className="text-cyan-400" /> {label}
                        </span>
                        <ChevronRight size={14} className="text-slate-500 group-hover:text-white" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Next Milestone */}
                <div className="bg-gradient-to-br from-violet-500/15 to-cyan-500/15 border border-violet-500/30 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={14} className="text-amber-400" />
                    <span className="text-sm font-bold text-white">Next Milestone</span>
                  </div>
                  <p className="text-slate-300 text-sm">Term 2 Project Exhibition</p>
                  <p className="text-xs text-slate-500 mt-1">August 15, 2024</p>
                  <div className="mt-3 bg-white/10 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-cyan-500 to-violet-500 h-1.5 rounded-full" style={{ width: "60%" }} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5">60% of term completed</p>
                </div>
              </div>
            </div>
          )}

          {/* ── Orders ────────────────────────────────────── */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-white">Order History</h2>
                <Link to="/products" className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                  New Order <ArrowRight size={13} />
                </Link>
              </div>
              {ORDERS.map(order => (
                <div key={order.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                      <ShoppingBag size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{order.item}</p>
                      <p className="text-xs text-slate-400">{order.id} · Ordered {order.date}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-bold ${order.statusColor} bg-white/5 px-3 py-1 rounded-full`}>
                    {order.status}
                  </span>
                </div>
              ))}
              <div className="text-center pt-4">
                <Link to="/track-order" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1">
                  Track all orders <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          )}

          {/* ── Training Sessions ─────────────────────────── */}
          {activeTab === "sessions" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-white">Training Sessions</h2>
                <Link to="/contact" className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                  Book Session <ArrowRight size={13} />
                </Link>
              </div>
              {SESSIONS.map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      s.status === "Upcoming" ? "bg-cyan-500/20 border border-cyan-500/30" : "bg-white/5"
                    }`}>
                      <CalendarDays size={18} className={s.status === "Upcoming" ? "text-cyan-400" : "text-slate-400"} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{s.topic}</p>
                      <p className="text-xs text-slate-400">{s.date} · {s.trainer}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                    s.status === "Upcoming"
                      ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-400"
                      : "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
                  }`}>
                    {s.status === "Upcoming" ? "⏰ " : "✓ "}{s.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ── Resources ─────────────────────────────────── */}
          {activeTab === "resources" && (
            <div className="space-y-4">
              <h2 className="font-bold text-white mb-2">Curriculum Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RESOURCES.map((r, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between hover:border-white/20 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center">
                        <Download size={16} className="text-red-400" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{r.title}</p>
                        <p className="text-xs text-slate-400">{r.type} · {r.size}</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-1 text-xs text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
                      <Download size={12} /> Download
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <BookOpen size={28} className="text-cyan-400 mx-auto mb-2" />
                <p className="text-white font-bold mb-1">Need more resources?</p>
                <p className="text-slate-400 text-sm mb-4">Contact your RoboLearn program manager for custom curriculum content.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                  <CheckCircle2 size={14} /> Request Resources
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
