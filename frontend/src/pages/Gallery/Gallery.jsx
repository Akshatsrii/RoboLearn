import { useState, useEffect } from "react";
import { getGallery } from "../../services/galleryService";

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
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Gallery
          </span>
          <h1 className="text-5xl font-bold mb-6">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Labs & Activities
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Photos from robotics labs, student workshops, competitions and school events across India.
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
                className={`px-5 py-2 rounded-xl text-sm font-medium capitalize transition ${
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
            <div className="text-center py-20 text-slate-400">Loading gallery...</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <div key={item._id} className="group overflow-hidden rounded-2xl border border-slate-200 hover:shadow-xl transition">
                  <div className="overflow-hidden h-64">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
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