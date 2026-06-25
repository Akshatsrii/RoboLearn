import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200"
            : "bg-white border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>

            <h1 className="text-xl font-bold text-slate-900">
              Robo<span className="text-cyan-600">Learn</span>
            </h1>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm rounded-lg font-medium transition-all ${
                    active
                      ? "bg-cyan-100 text-cyan-700"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/contact"
              className="px-4 py-2 text-sm rounded-lg border border-cyan-600 text-cyan-600 hover:bg-cyan-50 transition"
            >
              Schedule Demo
            </Link>

            <Link
              to="/contact"
              className="px-4 py-2 text-sm rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition"
            >
              Free Consultation
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-slate-700"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white lg:hidden pt-20">
          <div className="px-6 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="border border-slate-200 rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/contact"
              className="mt-4 text-center border border-cyan-600 text-cyan-600 py-3 rounded-xl"
            >
              Schedule Demo
            </Link>

            <Link
              to="/contact"
              className="text-center bg-cyan-600 text-white py-3 rounded-xl"
            >
              Free Consultation
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;