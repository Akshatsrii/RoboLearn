import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, Trophy, Calendar, Clock, Users, Star,
  ArrowRight, Filter, CheckCircle2, Upload, Send,
  Zap, Award, Target, Flame, Medal, ChevronDown, Lock
} from "lucide-react";
import SEO from "../components/SEO";
import { submitContact } from "../services/contactService";

/* ================================================================
   DATA
   ================================================================ */
const challenges = [
  {
    id: "line-follower-2025",
    title: "Line Follower Speedrun Challenge",
    month: "July 2025",
    category: "Robotics",
    status: "active",
    deadline: "2025-07-31",
    eligibility: "Grade 6–12 students from any RoboLearn partner school",
    prize: ["₹5,000 Amazon Voucher", "Gold Innovator Badge", "National Showcase Feature"],
    description: "Build the fastest line-following robot that completes a 3-meter track with 4 turns and 2 T-junctions. Robot must be Arduino/RPi based. Speed + accuracy = score.",
    rules: [
      "Arduino Uno or Nano only (no Raspberry Pi for motor control)",
      "Maximum 4 IR sensors allowed",
      "Robot must complete the track within 60 seconds",
      "3 timed attempts — best time counts",
      "Video submission required (minimum 720p)",
    ],
    submissions: 23,
    color: "cyan",
    featured: true,
  },
  {
    id: "iot-smart-home",
    title: "IoT Smart Home Automation",
    month: "August 2025",
    category: "IoT",
    status: "upcoming",
    deadline: "2025-08-31",
    eligibility: "Grade 8–12 students",
    prize: ["₹7,500 Amazon Voucher", "Platinum Badge", "Mentorship Session with RoboLearn Team"],
    description: "Build a smart home automation system controlling at least 3 home devices (lights, fan, door lock, etc.) using IoT protocols. Cloud dashboard required for remote monitoring.",
    rules: [
      "Minimum 3 devices must be automated",
      "Cloud dashboard required (Firebase, Blynk, or custom)",
      "Must include a working demo video",
      "Code must be original and submitted via GitHub",
      "Teams of 1–3 students allowed",
    ],
    submissions: 0,
    color: "emerald",
    featured: true,
  },
  {
    id: "scratch-animation-june",
    title: "Scratch Story Animation",
    month: "June 2025",
    category: "Coding",
    status: "completed",
    deadline: "2025-06-30",
    eligibility: "Grade 3–6 students",
    prize: ["₹2,000 Amazon Voucher", "Silver Badge", "Certificate of Excellence"],
    description: "Create an animated Scratch story about robots helping the environment. Minimum 30 seconds, at least 3 scenes with dialogues.",
    rules: [
      "Scratch 3.0 only",
      "Minimum 30-second animation",
      "Must include at least 1 robot character",
      "Original music/sounds preferred",
      "Parent/teacher consent required for under-12",
    ],
    submissions: 47,
    color: "violet",
    featured: false,
    winner: {
      name: "Ananya Verma",
      school: "Amity International, Gurgaon",
      project: "Robo-Garden: A Clean Planet Story",
    },
  },
  {
    id: "obstacle-maze-may",
    title: "Obstacle Maze Navigation",
    month: "May 2025",
    category: "Robotics",
    status: "completed",
    deadline: "2025-05-31",
    eligibility: "Grade 6–10 students",
    prize: ["₹4,000 Amazon Voucher", "Gold Badge", "Lab Tour Priority Access"],
    description: "Design a robot that autonomously navigates a maze with at least 6 turns and identifies the exit using sensor logic — no remote control allowed.",
    rules: [
      "Fully autonomous (no remote control)",
      "Maze layout revealed 30 mins before trial",
      "Must complete within 90 seconds",
      "Maximum 2 ultrasonic/IR sensors",
      "Video + code submission required",
    ],
    submissions: 31,
    color: "amber",
    featured: false,
    winner: {
      name: "Aryan Sharma & Priya Singh",
      school: "Delhi Public School, Noida",
      project: "MazeBot v2.0",
    },
  },
];

const leaderboard = [
  { rank: 1, name: "Sahil Mehta", school: "Kendriya Vidyalaya, Pune", points: 480, badges: 4, streak: 3 },
  { rank: 2, name: "Kavya Reddy", school: "Lotus Valley International, Noida", points: 420, badges: 3, streak: 2 },
  { rank: 3, name: "Aryan Sharma", school: "Delhi Public School, Noida", points: 390, badges: 3, streak: 2 },
  { rank: 4, name: "Ananya Verma", school: "Amity International, Gurgaon", points: 340, badges: 2, streak: 1 },
  { rank: 5, name: "Neha Gupta", school: "Ryan International, Bangalore", points: 310, badges: 2, streak: 1 },
  { rank: 6, name: "Tanvi Joshi", school: "Kendriya Vidyalaya, Pune", points: 280, badges: 2, streak: 1 },
  { rank: 7, name: "Aditya Nair", school: "Lotus Valley International, Noida", points: 250, badges: 1, streak: 0 },
  { rank: 8, name: "Ishaan Chopra", school: "The Shri Ram School, Delhi", points: 210, badges: 1, streak: 0 },
];

const colorMap = {
  cyan:    { bg: "bg-cyan-50",    border: "border-cyan-200",    text: "text-cyan-700",    badge: "bg-cyan-100 text-cyan-800",    dot: "bg-cyan-500"    },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
  violet:  { bg: "bg-violet-50",  border: "border-violet-200",  text: "text-violet-700",  badge: "bg-violet-100 text-violet-800",  dot: "bg-violet-500"  },
  amber:   { bg: "bg-amber-50",   border: "border-amber-200",   text: "text-amber-700",   badge: "bg-amber-100 text-amber-800",   dot: "bg-amber-500"   },
};

function daysLeft(deadline) {
  const diff = new Date(deadline) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/* ================================================================
   SUBMISSION MODAL
   ================================================================ */
function SubmitModal({ challenge, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", school: "", grade: "", phone: "", videoUrl: "", githubUrl: "", description: "" });
  const [status, setStatus] = useState(""); // ""|"loading"|"success"|"error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitContact({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: `Challenge Submission: ${challenge.title}`,
        message: `School: ${form.school}\nGrade: ${form.grade}\nVideo: ${form.videoUrl}\nGitHub: ${form.githubUrl}\nDescription: ${form.description}`,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputCls = "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition bg-white";
  const c = colorMap[challenge.color];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className={`p-5 border-b ${c.border} ${c.bg} flex items-center justify-between`}>
          <div>
            <p className="text-xs font-bold text-slate-500">Submitting for</p>
            <h3 className={`font-bold text-sm ${c.text}`}>{challenge.title}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition text-lg">✕</button>
        </div>
        <div className="p-5">
          {status === "success" ? (
            <div className="text-center py-8">
              <CheckCircle2 size={44} className="text-emerald-500 mx-auto mb-3" />
              <h3 className="font-bold text-[#0b2545] text-lg mb-1">Submission Received! 🎉</h3>
              <p className="text-sm text-slate-500 mb-4">Our judges will review and announce results by {challenge.deadline}. Check your email for confirmation.</p>
              <button onClick={onClose} className="bg-[#0b2545] text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-cyan-700 transition">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input required placeholder="Full Name *" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className={inputCls} />
                <input required placeholder="Phone *" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className={inputCls} />
              </div>
              <input required type="email" placeholder="Email *" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className={inputCls} />
              <div className="grid grid-cols-2 gap-3">
                <input required placeholder="School Name *" value={form.school} onChange={e => setForm(p => ({ ...p, school: e.target.value }))} className={inputCls} />
                <input required placeholder="Grade (e.g. 8) *" value={form.grade} onChange={e => setForm(p => ({ ...p, grade: e.target.value }))} className={inputCls} />
              </div>
              <input placeholder="YouTube / Drive Video URL *" value={form.videoUrl} onChange={e => setForm(p => ({ ...p, videoUrl: e.target.value }))} className={inputCls} />
              <input placeholder="GitHub Repository URL (if applicable)" value={form.githubUrl} onChange={e => setForm(p => ({ ...p, githubUrl: e.target.value }))} className={inputCls} />
              <textarea rows={3} placeholder="Brief description of your project & how it meets the challenge criteria *" required value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className={inputCls} />
              {status === "error" && <p className="text-red-500 text-xs font-semibold">Something went wrong. Please try again.</p>}
              <button type="submit" disabled={status === "loading"}
                className={`w-full ${c.dot.replace("bg-", "bg-")} disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-md bg-[#0b2545] hover:bg-cyan-700`}>
                {status === "loading" ? "Submitting..." : <><Send size={14} /> Submit Challenge Entry</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   CHALLENGE CARD
   ================================================================ */
function ChallengeCard({ challenge, onSubmit }) {
  const [expanded, setExpanded] = useState(false);
  const c = colorMap[challenge.color];
  const days = daysLeft(challenge.deadline);

  return (
    <div className={`bg-white rounded-2xl border-2 ${challenge.featured ? c.border : "border-slate-200"} shadow-sm overflow-hidden transition-all`}>
      {/* Header */}
      <div className={`px-5 py-4 ${challenge.featured ? c.bg : "bg-white"} border-b ${challenge.featured ? c.border : "border-slate-100"}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${c.badge}`}>{challenge.category}</span>
              {challenge.status === "active" && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
                </span>
              )}
              {challenge.status === "upcoming" && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">UPCOMING</span>
              )}
              {challenge.status === "completed" && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">ENDED</span>
              )}
              {challenge.featured && <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1"><Star size={9} /> Featured</span>}
            </div>
            <h3 className="font-bold text-[#0b2545] leading-tight">{challenge.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><Calendar size={10} /> {challenge.month} · Deadline: {challenge.deadline}</p>
          </div>
          {challenge.status === "active" && (
            <div className="text-center flex-shrink-0">
              <p className={`text-2xl font-black ${c.text}`}>{days}</p>
              <p className="text-xs text-slate-500">days left</p>
            </div>
          )}
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mt-2">{challenge.description}</p>
      </div>

      {/* Stats row */}
      <div className="px-5 py-3 flex flex-wrap gap-4 border-b border-slate-100 text-xs text-slate-500">
        <span className="flex items-center gap-1"><Users size={11} /> {challenge.submissions} submissions</span>
        <span className="flex items-center gap-1"><Target size={11} /> {challenge.eligibility}</span>
      </div>

      {/* Prizes */}
      <div className="px-5 py-3 border-b border-slate-100">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Prizes</p>
        <div className="flex flex-wrap gap-2">
          {challenge.prizes?.map((p, i) => (
            <span key={i} className={`text-xs px-2.5 py-1 rounded-full border ${c.border} ${c.text} font-medium`}>{p}</span>
          )) ?? challenge.prize?.map((p, i) => (
            <span key={i} className={`text-xs px-2.5 py-1 rounded-full border ${c.border} ${c.text} font-medium`}>{p}</span>
          ))}
        </div>
      </div>

      {/* Expandable rules */}
      <div className="px-5 py-3">
        <button onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition w-full text-left">
          <ChevronDown size={13} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
          {expanded ? "Hide" : "View"} Rules & Requirements
        </button>
        {expanded && (
          <ul className="mt-3 space-y-1.5">
            {challenge.rules.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                <span className="text-slate-400 font-mono flex-shrink-0">{i + 1}.</span> {r}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Winner (completed) */}
      {challenge.status === "completed" && challenge.winner && (
        <div className="mx-5 mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Trophy size={13} className="text-amber-600" />
            <p className="text-xs font-bold text-amber-800">Winner</p>
          </div>
          <p className="text-xs font-semibold text-slate-800">{challenge.winner.name}</p>
          <p className="text-xs text-slate-500">{challenge.winner.school} · "{challenge.winner.project}"</p>
        </div>
      )}

      {/* CTA */}
      <div className="px-5 pb-5">
        {challenge.status === "active" ? (
          <button onClick={() => onSubmit(challenge)}
            className="w-full bg-[#0b2545] hover:bg-cyan-700 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-md">
            <Upload size={14} /> Submit Your Entry
          </button>
        ) : challenge.status === "upcoming" ? (
          <button disabled className="w-full bg-slate-100 text-slate-400 font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 cursor-not-allowed">
            <Lock size={14} /> Registration Opens Soon
          </button>
        ) : (
          <Link to="/showcase"
            className="flex items-center justify-center gap-2 w-full border border-slate-200 text-slate-600 font-bold py-3 rounded-xl text-sm hover:border-cyan-300 hover:text-cyan-700 transition">
            View Winning Projects <ArrowRight size={13} />
          </Link>
        )}
      </div>
    </div>
  );
}

/* ================================================================
   LEADERBOARD TABLE
   ================================================================ */
function Leaderboard() {
  const rankStyle = {
    1: "bg-amber-400 text-[#0b2545]",
    2: "bg-slate-300 text-slate-700",
    3: "bg-amber-700/60 text-white",
  };
  const rankIcon = { 1: "🥇", 2: "🥈", 3: "🥉" };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-[#0b2545] to-[#0d3060] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-amber-400" />
          <h3 className="font-bold text-white text-sm">All-Time Leaderboard</h3>
        </div>
        <span className="text-xs text-cyan-300">Season 2025</span>
      </div>
      <div className="divide-y divide-slate-50">
        {leaderboard.map((entry) => (
          <div key={entry.rank} className={`px-5 py-3 flex items-center gap-3 ${entry.rank <= 3 ? "bg-amber-50/30" : ""}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${rankStyle[entry.rank] ?? "bg-slate-100 text-slate-600"}`}>
              {rankIcon[entry.rank] ?? entry.rank}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0b2545] truncate">{entry.name}</p>
              <p className="text-xs text-slate-400 truncate">{entry.school}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-black text-cyan-700">{entry.points} pts</p>
              <p className="text-xs text-slate-400">{entry.badges} badges · {entry.streak} streak</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */
export default function ChallengeHub() {
  const [filter, setFilter] = useState("all"); // all|active|upcoming|completed
  const [submitChallenge, setSubmitChallenge] = useState(null);

  const filtered = challenges.filter(c => filter === "all" || c.status === filter);
  const active = challenges.filter(c => c.status === "active");

  return (
    <>
      <SEO
        title="Competition & Challenge Hub | RoboLearn"
        description="Monthly robotics challenges, leaderboard, winners and submission portal for RoboLearn partner school students."
      />
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px);} to {opacity:1;transform:translateY(0);}}
        @keyframes pulseRing { 0%,100%{box-shadow:0 0 0 0 rgba(34,211,238,0.4);}70%{box-shadow:0 0 0 10px rgba(34,211,238,0);}}
        .fade-up{animation:fadeUp .5s ease both;}
        .pulse-ring{animation:pulseRing 2.5s infinite;}
        @media(prefers-reduced-motion:reduce){.fade-up,.pulse-ring{animation:none!important;}}
      `}</style>

      {/* HERO */}
      <section className="bg-[#060e1d] pt-24 pb-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg viewBox="0 0 1200 400" className="w-full h-full">
            {[...Array(5)].map((_, i) => (
              <polygon key={i} points={`${600+i*80},20 ${700+i*60},180 ${500+i*40},180`}
                fill="none" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="4 6" />
            ))}
          </svg>
        </div>
        <div className="relative max-w-5xl mx-auto fade-up">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
            <ChevronRight size={12} />
            <span className="text-cyan-400">Challenge Hub</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
            <Flame size={12} /> MONTHLY CHALLENGES
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight">
            Competition & <span className="text-amber-400">Challenge Hub</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm max-w-2xl leading-relaxed">
            Compete, build, win. Monthly robotics and STEM challenges open to all RoboLearn partner school students. Track your rank on the live leaderboard.
          </p>
          <div className="flex flex-wrap gap-6 mt-6">
            {[
              { v: challenges.filter(c=>c.status==="active").length, l: "Live Now", color: "text-emerald-400" },
              { v: challenges.reduce((a,c)=>a+c.submissions,0), l: "Total Submissions", color: "text-cyan-400" },
              { v: leaderboard.length, l: "On Leaderboard", color: "text-amber-400" },
              { v: challenges.filter(c=>c.status==="completed" && c.winner).length, l: "Challenge Winners", color: "text-violet-400" },
            ].map((s,i) => (
              <div key={i} className="text-center">
                <p className={`text-2xl font-black ${s.color}`}>{s.v}</p>
                <p className="text-xs text-slate-400">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVE CHALLENGE BANNER */}
      {active.length > 0 && (
        <section className="bg-gradient-to-r from-emerald-600 to-cyan-700 px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="pulse-ring w-3 h-3 rounded-full bg-white flex-shrink-0" />
              <p className="text-white text-sm font-semibold">
                <strong>{active[0].title}</strong> — {daysLeft(active[0].deadline)} days remaining!
              </p>
            </div>
            <button onClick={() => setSubmitChallenge(active[0])}
              className="bg-white text-emerald-700 font-bold px-4 py-2 rounded-xl text-xs hover:bg-emerald-50 transition whitespace-nowrap">
              Submit Now →
            </button>
          </div>
        </section>
      )}

      {/* MAIN CONTENT */}
      <section className="bg-slate-50 px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_300px] gap-6">

            {/* Challenges list */}
            <div>
              {/* Filter tabs */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {[["all","All Challenges"],["active","🟢 Live"],["upcoming","⏳ Upcoming"],["completed","✅ Completed"]].map(([val,lbl]) => (
                  <button key={val} onClick={() => setFilter(val)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${filter===val ? "bg-[#0b2545] text-white shadow-md" : "bg-white border border-slate-200 text-slate-600 hover:border-cyan-300"}`}>
                    {lbl}
                  </button>
                ))}
              </div>

              <div className="space-y-5">
                {filtered.map(ch => (
                  <ChallengeCard key={ch.id} challenge={ch} onSubmit={setSubmitChallenge} />
                ))}
              </div>
            </div>

            {/* Leaderboard sidebar */}
            <div className="space-y-5">
              <Leaderboard />

              {/* How it works */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-bold text-[#0b2545] text-sm mb-4 flex items-center gap-2">
                  <Zap size={14} className="text-cyan-600" /> How It Works
                </h3>
                {[
                  { step: "1", text: "Join active challenge before deadline" },
                  { step: "2", text: "Build & document your project" },
                  { step: "3", text: "Submit video + code link" },
                  { step: "4", text: "Get judged & earn points + badges" },
                  { step: "5", text: "Top projects featured in Showcase" },
                ].map(s => (
                  <div key={s.step} className="flex items-start gap-2.5 mb-3">
                    <span className="w-5 h-5 rounded-full bg-cyan-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">{s.step}</span>
                    <p className="text-xs text-slate-600 pt-0.5">{s.text}</p>
                  </div>
                ))}
              </div>

              {/* School CTA */}
              <div className="bg-gradient-to-br from-[#0b2545] to-[#0d3060] rounded-2xl p-5 text-white">
                <Medal size={20} className="text-amber-400 mb-2" />
                <p className="font-bold text-sm mb-1">Is your school not enrolled?</p>
                <p className="text-xs text-slate-300 mb-3">Partner with RoboLearn to unlock challenges, leaderboard access, and monthly competitions for your students.</p>
                <Link to="/contact" className="flex items-center justify-center gap-2 bg-amber-400 text-[#0b2545] font-bold text-xs py-2.5 rounded-xl hover:bg-amber-300 transition">
                  Enroll Your School <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submit Modal */}
      {submitChallenge && <SubmitModal challenge={submitChallenge} onClose={() => setSubmitChallenge(null)} />}
    </>
  );
}
