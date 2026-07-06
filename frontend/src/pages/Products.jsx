import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package, Search, SlidersHorizontal, ShoppingCart, Star } from "lucide-react";
import { getProducts } from "../services/productService";
import { useCart } from "../context/CartContext";

const categories = ["All", "Beginner", "Intermediate", "Advanced"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹3,000", min: 0, max: 3000 },
  { label: "₹3,000 - ₹5,000", min: 3000, max: 5000 },
  { label: "Over ₹5,000", min: 5000, max: Infinity },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePriceRange, setActivePriceRange] = useState(0); // Index of priceRange
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data?.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      const matchCat =
        activeCategory === "All" ||
        p.category === activeCategory ||
        p.level === activeCategory.toLowerCase();

      // Price filter
      const price = p.price || (p.category === "Advanced" ? 5499 : p.category === "Intermediate" ? 3999 : 2499);
      const range = priceRanges[activePriceRange];
      const matchPrice = price >= range.min && price <= range.max;

      // Search filter
      const matchSearch =
        (p.name || p.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description || p.desc || "").toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchPrice && matchSearch;
    });
  }, [products, activeCategory, activePriceRange, searchQuery]);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <style>{`
        @keyframes dash { to { stroke-dashoffset: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .anim-fadeup { animation: fadeUp .7s ease both; }
        .circuit-line { stroke-dasharray: 6 6; stroke-dashoffset: 240; animation: dash 3s linear forwards 0.3s; }
        @media (prefers-reduced-motion: reduce) { .anim-fadeup, .circuit-line { animation: none !important; } }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#061B33] py-20 lg:py-24">
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
            STEM Shop
          </span>
          <h1 className="mt-6 text-4xl lg:text-5xl font-bold leading-[1.1] text-white">
            Robotics Kits &amp; Tools for <span className="text-cyan-400">Schools</span>
          </h1>
          <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Classroom-tested hardware kits, coding companion devices, and IoT starter packages designed to map directly to curriculum standards.
          </p>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[260px_1fr] gap-8 items-start">
            
            {/* Left Sidebar Filters */}
            <aside className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 sticky top-24 shadow-sm hidden lg:block">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <SlidersHorizontal size={16} className="text-cyan-600" />
                <h3 className="font-bold text-[#0b2545] text-sm uppercase tracking-wider">Filters</h3>
              </div>

              {/* Category */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Grade Level</h4>
                <div className="space-y-1.5">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setActiveCategory(c)}
                      className={`w-full text-left px-3.5 py-2 text-sm rounded-xl font-medium transition-colors ${
                        activeCategory === c
                          ? "bg-cyan-50 text-cyan-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Price Range</h4>
                <div className="space-y-1.5">
                  {priceRanges.map((r, i) => (
                    <button
                      key={r.label}
                      onClick={() => setActivePriceRange(i)}
                      className={`w-full text-left px-3.5 py-2 text-sm rounded-xl font-medium transition-colors ${
                        activePriceRange === i
                          ? "bg-cyan-50 text-cyan-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right Side Grid */}
            <div className="space-y-6">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="relative w-full sm:max-w-md">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search STEM kits, components..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div className="text-xs text-slate-400 font-semibold shrink-0">
                  Showing {filtered.length} products
                </div>
              </div>

              {/* Grid content */}
              {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="border border-slate-200 bg-white rounded-2xl p-6 animate-pulse">
                      <div className="h-40 bg-slate-100 rounded-xl mb-4" />
                      <div className="h-4 w-20 bg-slate-100 rounded-full mb-3" />
                      <div className="h-4 w-full bg-slate-100 rounded mb-2" />
                      <div className="h-4 w-1/2 bg-slate-100 rounded" />
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
                  <Package size={48} className="text-slate-200 mx-auto mb-4" />
                  <p className="text-lg font-bold text-[#0b2545]">No products found</p>
                  <p className="text-sm text-slate-500 mt-1 max-w-[280px] mx-auto">
                    Try adjusting your filters or search keywords to find what you're looking for.
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((p) => {
                    const price = p.price || (p.category === "Advanced" ? 5499 : p.category === "Intermediate" ? 3999 : 2499);
                    return (
                      <div
                        key={p._id}
                        className="group bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-cyan-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          {/* Image Container */}
                          <div className="w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-50 relative border border-slate-100">
                            <img
                              src={p.imageUrl || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"}
                              alt={p.name || p.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            {/* Level Badge */}
                            <span className="absolute top-3 left-3 text-[10px] font-bold text-cyan-700 bg-white border border-cyan-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {p.category || p.level}
                            </span>
                          </div>

                          {/* Ratings */}
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={12} className={i < 4 ? "text-amber-400 fill-amber-400" : "text-slate-200"} />
                            ))}
                            <span className="text-[10px] text-slate-400 font-semibold ml-1">(4.0)</span>
                          </div>

                          {/* Title */}
                          <Link to={`/products/${p._id}`} className="block">
                            <h3 className="font-bold text-slate-900 leading-snug group-hover:text-cyan-600 transition-colors mb-2 line-clamp-1">
                              {p.name || p.title}
                            </h3>
                          </Link>

                          {/* Description */}
                          <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">
                            {p.description || p.desc}
                          </p>
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                          <span className="text-base font-bold text-[#0b2545]">₹{price}</span>
                          <button
                            onClick={() => addToCart(p, 1)}
                            className="bg-cyan-50 hover:bg-cyan-600 text-cyan-600 hover:text-white p-2 rounded-xl transition-all duration-200 shadow-sm border border-cyan-100 hover:border-cyan-600"
                            aria-label="Add to cart"
                          >
                            <ShoppingCart size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2545] via-[#0e3a63] to-cyan-600 p-12 text-white shadow-xl">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <circle cx="40" cy="40" r="90" fill="white" /><circle cx="380" cy="180" r="120" fill="white" />
              </svg>
            </div>
            <h2 className="relative text-3xl font-bold">Need customized packages for your school?</h2>
            <p className="relative mt-4 text-cyan-50/90 max-w-xl mx-auto">
              We offer volume licensing, custom hardware compilation, and teacher development support. Request our official STEM Catalogue.
            </p>
            <Link to="/contact" className="relative inline-flex items-center gap-2 bg-white text-[#0b2545] hover:bg-cyan-50 px-8 py-4 rounded-xl font-semibold mt-8 transition-colors shadow-md">
              Request Catalogue <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}