import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  Zap, LayoutDashboard, Package, FileText, Image,
  GraduationCap, Users, LogOut, Menu,
  Quote, School, BookOpen, FolderOpen, ShoppingCart,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Blogs", path: "/admin/blogs", icon: FileText },
  { label: "Products", path: "/admin/products", icon: Package },
  { label: "Gallery", path: "/admin/gallery", icon: Image },
  { label: "Courses", path: "/admin/courses", icon: GraduationCap },
  { label: "Case Studies", path: "/admin/case-studies", icon: BookOpen },
  { label: "Resources", path: "/admin/resources", icon: FolderOpen },
  { label: "Testimonials", path: "/admin/testimonials", icon: Quote },
  { label: "Partners", path: "/admin/partners", icon: School },
  { label: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { label: "Leads", path: "/admin/leads", icon: Users },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user: adminUser, logout } = useAuth();

  const handleLogout = () => { logout(); navigate("/login"); };

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
          <Zap size={15} className="text-cyan-300" strokeWidth={2.5} />
        </div>
        <span className="text-lg font-bold text-white">Robo<span className="text-cyan-400">Learn</span></span>
      </div>
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ label, path, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link key={path} to={path} onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? "bg-cyan-400/15 text-cyan-300" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}>
              <Icon size={17} />{label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 pb-5 border-t border-white/10 pt-3">
        <div className="px-3 py-2 mb-1">
          <p className="text-xs font-medium text-slate-300">{adminUser?.name}</p>
          <p className="text-xs text-slate-500 truncate">{adminUser?.email}</p>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-red-500/10 hover:text-red-400 w-full transition-colors">
          <LogOut size={17} />Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 bg-[#061B33]"><SidebarContent /></aside>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-[#061B33] flex flex-col"><SidebarContent /></aside>
        </div>
      )}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-5 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-600"><Menu size={22} /></button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0b2545] flex items-center justify-center text-cyan-300 font-semibold text-sm">
              {adminUser?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{adminUser?.name || "Admin"}</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          </div>
        </header>
        <main className="p-5 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}