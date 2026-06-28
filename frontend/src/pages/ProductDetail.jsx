import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle2, Bot, Package, Loader2 } from "lucide-react";
import { getProduct, getProducts } from "../services/productService";

const staticProducts = [
  {
    _id: "1",
    name: "Kids Robotics Kit",
    category: "Beginner",
    description: "A perfect starter kit for Grade 3–5 students to build their first simple robots through guided, hands-on activities.",
    specs: ["10+ guided build projects", "Snap-fit parts, no soldering needed", "Block-coding companion app", "Designed for ages 8-11"],
    imageUrl: "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&w=900&q=80",
    price: null,
  },
  {
    _id: "2",
    name: "Arduino Learning Kit",
    category: "Intermediate",
    description: "An Arduino-based kit with sensors, LEDs, and motors for Grade 6–8 students stepping into real electronics and code.",
    specs: ["Arduino Uno-compatible board", "20+ sensors and modules", "C++ based programming intro", "Designed for ages 11-14"],
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
    price: null,
  },
  {
    _id: "3",
    name: "AI Starter Kit",
    category: "Advanced",
    description: "Hands-on machine learning and AI concepts for Grade 9–12 students, with real datasets and visual model training.",
    specs: ["Camera module included", "Visual ML model trainer", "Python-based projects", "Designed for ages 14-18"],
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
    price: null,
  },
  {
    _id: "4",
    name: "IoT Experiment Kit",
    category: "Advanced",
    description: "Build real IoT projects with ESP32, sensors, and live cloud dashboards — for advanced senior-grade learners.",
    specs: ["ESP32 dev board", "Wi-Fi + cloud dashboard setup", "5+ real-world IoT projects", "Designed for ages 14-18"],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    price: null,
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProduct(id)
      .then((res) => setProduct(res.data.data))
      .catch(() => setProduct(staticProducts.find((p) => p._id === id) || staticProducts[0]))
      .finally(() => setLoading(false));

    getProducts({ limit: 4 })
      .then((res) => setRelated((res.data.data || []).filter((p) => p._id !== id)))
      .catch(() => setRelated(staticProducts.filter((p) => p._id !== id)));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400">
        <Loader2 size={24} className="animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <p className="text-slate-500 mb-4">Product not found.</p>
        <Link to="/products" className="text-cyan-600 font-semibold hover:underline">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-600 transition-colors mb-8">
          <ArrowLeft size={15} /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
            <img
              src={product.imageUrl || product.image}
              alt={product.name || product.title}
              className="w-full h-80 lg:h-[420px] object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full">
              {product.category || product.level}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0b2545] mt-4">
              {product.name || product.title}
            </h1>
            <p className="mt-4 text-slate-600 leading-relaxed">
              {product.description || product.desc}
            </p>

            {product.specs?.length > 0 && (
              <div className="mt-7 space-y-2.5">
                {product.specs.map((spec) => (
                  <div key={spec} className="flex items-center gap-3">
                    <CheckCircle2 size={17} className="text-cyan-600 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{spec}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex items-center gap-4">
              <span className="text-lg font-bold text-cyan-600">
                {product.price ? `₹${product.price}` : "Contact for Price"}
              </span>
            </div>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 bg-[#0b2545] hover:bg-cyan-600 text-white px-7 py-3.5 rounded-xl font-semibold mt-7 transition-colors"
            >
              Request a Quote
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-[#0b2545] mb-8">You might also like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.slice(0, 3).map((p) => {
                const Icon = p.icon || Bot;
                return (
                  <Link
                    key={p._id}
                    to={`/products/${p._id}`}
                    className="group border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#0b2545] flex items-center justify-center mb-4 group-hover:bg-cyan-500 transition-colors duration-300">
                      <Package size={18} className="text-cyan-300 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">
                      {p.category || p.level}
                    </span>
                    <h3 className="font-semibold text-slate-900 mt-3">{p.name || p.title}</h3>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
