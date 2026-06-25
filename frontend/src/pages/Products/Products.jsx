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
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Robotics Products
          </span>
          <h1 className="text-5xl font-bold mb-6">
            Kits & Tools for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Every Grade Level
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            High-quality robotics kits, AI tools, IoT experiment kits and
            educational electronics for school labs.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
                  active === c
                    ? "bg-cyan-600 text-white"
                    : "border border-slate-200 text-slate-600 hover:border-cyan-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-slate-400">Loading products...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((p, i) => {
                const Icon = p.icon || Package;
                return (
                  <div key={p._id || i} className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-cyan-300 transition">
                    <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center mb-4">
                      <Icon size={24} className="text-cyan-600" />
                    </div>
                    <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full mb-3 inline-block">
                      {p.category || p.level}
                    </span>
                    <h3 className="font-semibold text-slate-900 mb-2">{p.name || p.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.description || p.desc}</p>
                    <div className="text-sm font-semibold text-cyan-600">{p.price ? `₹${p.price}` : "Contact for Price"}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Kit for Your School?</h2>
            <p className="text-white/80 mb-8">We'll help you pick the right products for your budget and grade level.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-cyan-600 hover:bg-slate-50 px-8 py-4 rounded-xl font-semibold transition">
              Request Catalogue <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}