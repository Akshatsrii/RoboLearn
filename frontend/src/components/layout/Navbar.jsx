import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Zap, User, LogOut, LayoutDashboard, ChevronDown, ShoppingBag } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Lab Setup", path: "/lab-setup" },
  { label: "Training", path: "/training" },
  { label: "Products", path: "/products" },
  { label: "Curriculum", path: "/curriculum" },
  { label: "Gallery", path: "/gallery" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close user dropdown on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <style>{`
        @keyframes navDrop { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes navItemIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes dropdownIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .nav-drawer { animation: navDrop .22s ease both; }
        .nav-item { animation: navItemIn .35s ease both; }
        .dropdown-in { animation: dropdownIn .15s ease both; }
        @media (prefers-reduced-motion: reduce) {
          .nav-drawer, .nav-item, .dropdown-in { animation: none !important; }
        }
      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
            : "bg-white/80 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2 flex-shrink-0">
            <div className="relative w-8 h-8 rounded-lg bg-[#0b2545] flex items-center justify-center shadow-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-400/0 group-hover:from-cyan-500/30 group-hover:to-cyan-400/10 transition-all duration-300" />
              <Zap size={15} className="relative text-cyan-300" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-[#0b2545] tracking-tight">
              Robo<span className="text-cyan-600">Learn</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ label, path }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`relative px-3 py-1.5 text-sm rounded-lg font-medium transition-all duration-150 ${
                    active ? "text-[#0b2545] font-semibold" : "text-slate-600 hover:text-[#0b2545] hover:bg-slate-50"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-cyan-500 transition-all duration-200 ${
                      active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop Right side: CTA + Auth */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link
              to="/contact"
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-[#0b2545] text-white hover:bg-cyan-600 transition-colors shadow-sm"
            >
              Free Consultation
            </Link>

            {/* Desktop Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-600 hover:text-cyan-600 hover:bg-slate-50 rounded-lg transition-colors shrink-0"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg border border-slate-200 hover:border-cyan-300 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-700 font-semibold text-xs">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="dropdown-in absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-900 truncate">{user?.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                    </div>
                    {user?.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <LayoutDashboard size={15} /> Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 text-slate-700 hover:border-cyan-400 hover:text-cyan-600 transition-all"
              >
                <User size={15} /> Log In
              </Link>
            )}
          </div>

          {/* Mobile Right: Cart + Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-600 hover:text-cyan-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-cyan-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setIsOpen(false)}>
          <div className="absolute inset-0 bg-[#061B33]/40 backdrop-blur-[2px]" />

          <div
            className="nav-drawer absolute top-[64px] left-0 right-0 bg-white border-b border-slate-200 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ label, path }, i) => {
                const active = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    style={{ animationDelay: `${i * 30}ms` }}
                    className={`nav-item px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                      active ? "bg-cyan-50 text-cyan-700 font-semibold" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-cyan-500" : "bg-transparent"}`} />
                    {label}
                  </Link>
                );
              })}

              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-slate-100">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2">
                      <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                      <p className="text-xs text-slate-400">{user?.email}</p>
                    </div>
                    {user?.role === "admin" && (
                      <Link to="/admin/dashboard" className="text-center py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:border-cyan-400 hover:text-cyan-600 transition-colors">
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="text-center py-3 rounded-xl bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="text-center py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:border-cyan-400 hover:text-cyan-600 transition-colors"
                  >
                    Log In
                  </Link>
                )}
                <Link
                  to="/contact"
                  className="text-center py-3 rounded-xl bg-[#0b2545] text-white text-sm font-semibold hover:bg-cyan-600 transition-colors"
                >
                  Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
