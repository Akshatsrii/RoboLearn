import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import Button from "../ui/Button";

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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(10, 15, 30, 0.95)"
            : "rgba(10, 15, 30, 0.7)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #2563eb, #06b6d4)" }}
            >
              <Zap size={18} className="text-white" />
            </div>
            <span
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Robo<span style={{ color: "#06b6d4" }}>Learn</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    px-3 py-2 rounded-[8px] text-sm font-medium transition-all duration-200
                    ${isActive
                      ? "text-white bg-white/10"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                    }
                  `}
                  style={isActive ? { color: "#60a5fa" } : {}}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button size="sm" variant="secondary">Schedule Demo</Button>
            <Button size="sm">Free Consultation</Button>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 rounded-[8px] text-white/70 hover:text-white hover:bg-white/10 transition-all"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute top-[70px] left-0 right-0 bottom-0 overflow-y-auto"
            style={{ background: "rgba(10,15,30,0.98)", backdropFilter: "blur(20px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1 p-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      px-4 py-3 rounded-[10px] text-base font-medium transition-all duration-200 flex items-center
                      ${isActive ? "bg-white/10" : "hover:bg-white/5"}
                    `}
                    style={{ color: isActive ? "#60a5fa" : "rgba(255,255,255,0.75)" }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-white/10">
                <Button variant="secondary" fullWidth>Schedule Demo</Button>
                <Button fullWidth>Free Consultation</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;