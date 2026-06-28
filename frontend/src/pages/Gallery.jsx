import { useState, useEffect } from "react";
import { getGallery } from "../services/galleryService";

const categories = ["All", "labs", "workshops", "events", "competitions"];

const staticImages = [
  { _id: 1, imageUrl: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800", title: "Robotics Lab Setup", category: "labs" },
  { _id: 2, imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800", title: "Student Workshop", category: "workshops" },
  { _id: 3, imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800", title: "Electronics Lab", category: "labs" },
  { _id: 4, imageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800", title: "Robotics Competition", category: "competitions" },
  { _id: 5, imageUrl: "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?w=800", title: "STEM Workshop", category: "workshops" },
  { _id: 6, imageUrl: "https://images.unsplash.com/photo-1527430253228-e93688616381?w=800", title: "School Event", category: "events" },
];

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");

  useEffect(() => {
    getGallery()
      .then((res) => setItems(res.data.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const display = items.length > 0 ? items : staticImages;
  const filtered = active === "All" ? display : display.filter((i) => i.category === active);

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
            Gallery
          </span>
          <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
            Our <span className="text-cyan-400">labs &amp; activities</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Photos from robotics labs, student workshops, competitions, and school events across India.
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
                className={`px-5 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
                  <div className="h-64 bg-slate-100" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 w-20 bg-slate-100 rounded-full" />
                    <div className="h-4 w-2/3 bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-500">No photos in this category yet — check back soon.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <div key={item._id} className="group overflow-hidden rounded-2xl border border-slate-200 hover:border-cyan-300 hover:shadow-xl transition-all duration-300">
                  <div className="overflow-hidden h-64">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full capitalize">{item.category}</span>
                    <h3 className="font-semibold text-slate-900 mt-2 text-sm">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}