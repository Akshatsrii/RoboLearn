import { Link } from "react-router-dom";
import { FileText, Calendar, BookOpen, ArrowRight, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const quickLinks = [
  { icon: Calendar, title: "Book a Consultation", desc: "Request a free lab setup consultation for your school.", path: "/contact" },
  { icon: BookOpen, title: "Browse Curriculum", desc: "See the grade-wise STEM curriculum we offer.", path: "/curriculum" },
  { icon: FileText, title: "Download Resources", desc: "Brochures, guides, and case studies.", path: "/resources" },
];

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-[70vh] bg-slate-50 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-700 font-bold text-lg">
            {user?.name?.[0]?.toUpperCase() || <User size={22} />}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#0b2545]">Welcome back, {user?.name?.split(" ")[0] || "there"} 👋</h1>
            <p className="text-slate-500 text-sm">{user?.email}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map(({ icon: Icon, title, desc, path }) => (
            <Link
              key={title}
              to={path}
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#0b2545] flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-300">
                <Icon size={20} className="text-cyan-300 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-[#0b2545] mt-4">{title}</h3>
              <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">{desc}</p>
              <span className="inline-flex items-center gap-1 text-cyan-600 text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                Go <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}