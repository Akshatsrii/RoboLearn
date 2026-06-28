import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Bot, Zap, Wifi, Package } from "lucide-react";
import { getProducts } from "../../services/productService";

const staticProducts = [
  { icon: Bot, title: "Kids Robotics Kit", category: "Beginner", desc: "Perfect starter kit for Grade 3–5. Build simple robots with guided activities.", price: "Contact for Price" },
  { icon: Cpu, title: "Arduino Learning Kit", category: "Intermediate", desc: "Arduino-based kit with sensors, LEDs and motors. For Grade 6–8.", price: "Contact for Price" },
  { icon: Zap, title: "AI Starter Kit", category: "Advanced", desc: "Machine learning and AI concepts with hands-on projects. For Grade 9–12.", price: "Contact for Price" },
  { icon: Wifi, title: "IoT Experiment Kit", category: "Advanced", desc: "Build real IoT projects with ESP32, sensors and cloud connectivity.", price: "Contact for Price" },
];

const categories = ["All", "Beginner", "Intermediate", "Advanced"];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const display = products.length > 0 ? products : staticProducts;
  const filtered = active === "All" ? display : display.filter((p) => p.category === active || p.level === active.toLowerCase());

  return (
    <div className="bg-white text-slate-900">
      <style>{`
        @keyframes dash { to { stroke-dashoffset: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .anim-fadeup { animation: fadeUp .7s ease both; }
        .circuit-line { stroke-dasharray: 6 6; stroke-dashoffset: 240; animation: dash 3s linear forwards 0.3s; }
        @media (prefers-reduced-motion: reduce) {
          .anim-fadeup, .circuit-line { animation: none !important; }
        }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[#061B33] py-24 lg:py-28">
        <svg className="absolute inset-0 w-full h-full opacity-[0.16]" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" fill="none">
          <g stroke="#22d3ee" strokeWidth="1.2">
            <path className="circuit-line" d="M0 90 H260 V210 H520" />
            <path className="circuit-line" d="M1200 60 H880 V180 H640" />
          </g>
          <g fill="#22d3ee">
            <circle cx="260" cy="90" r="4" /><circle cx="520" cy="210" r="4" />
            <circle cx="880" cy="60" r="4" /><circle cx="640" cy="180" r="4" />
          </g>
        </svg>

        <div className="relative max-w-4xl mx-auto px-6 text-center anim-fadeup">
          <span className="inline-flex items-center gap-2 bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 px-4 py-1.5 rounded-full text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Robotics Products
          </span>
          <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
            Kits &amp; tools for <span className="text-cyan-400">every grade level</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            High-quality robotics kits, AI tools, IoT experiment kits, and
            educational electronics for school labs.
          </p>
        </div>
      </section>

      {/* ============ FILTER + GRID ============ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  active === c
                    ? "bg-[#0b2545] text-white"
                    : "border border-slate-200 text-slate-600 hover:border-cyan-300 hover:text-cyan-600"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="border border-slate-200 rounded-2xl p-6 animate-pulse">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl mb-4" />
                  <div className="h-4 w-20 bg-slate-100 rounded-full mb-3" />
                  <div className="h-4 w-full bg-slate-100 rounded mb-2" />
                  <div className="h-3 w-full bg-slate-100 rounded mb-2" />
                  <div className="h-3 w-2/3 bg-slate-100 rounded" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-500">No products in this category yet — try another filter.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((p, i) => {
                const Icon = p.icon || Package;
                return (
                  <Link key={p._id || i} to={`/products/${p._id || i}`} className="group border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-cyan-300 hover:-translate-y-1 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#0b2545] flex items-center justify-center mb-4 group-hover:bg-cyan-500 transition-colors duration-300">
                      <Icon size={22} className="text-cyan-300 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full mb-3 inline-block">
                      {p.category || p.level}
                    </span>
                    <h3 className="font-semibold text-slate-900 mb-2">{p.name || p.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.description || p.desc}</p>
                    <div className="text-sm font-semibold text-cyan-600">{p.price ? `₹${p.price}` : "Contact for Price"}</div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2545] via-[#0e3a63] to-cyan-600 p-12 text-white">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <circle cx="40" cy="40" r="90" fill="white" /><circle cx="380" cy="180" r="120" fill="white" />
              </svg>
            </div>
            <h2 className="relative text-3xl md:text-4xl font-bold">Need a custom kit for your school?</h2>
            <p className="relative mt-4 text-cyan-50/90">We'll help you pick the right products for your budget and grade level.</p>
            <Link to="/contact" className="relative inline-flex items-center gap-2 bg-white text-[#0b2545] hover:bg-cyan-50 px-8 py-4 rounded-xl font-semibold mt-8 transition-colors">
              Request Catalogue <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}