import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Bot, Package, Loader2, Star, Plus, Minus, ShoppingCart, FileText, Code2, Video, ShieldAlert } from "lucide-react";
import { getProduct, getProducts } from "../services/productService";
import { useCart } from "../context/CartContext";
import SEO from "../components/SEO";

const staticProducts = [
  {
    _id: "1",
    name: "Kids Robotics Kit",
    category: "Beginner",
    description: "A perfect starter kit for Grade 3–5 students to build their first simple robots through guided, hands-on activities.",
    specs: ["10+ guided build projects", "Snap-fit parts, no soldering needed", "Block-coding companion app", "Designed for ages 8-11"],
    imageUrl: "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&w=900&q=80",
    price: 2499,
    kitItems: ["Arduino Uno Board", "Ultrasonic Sensor", "2x DC Motors", "Chassis Board", "USB Cable", "Battery Connector", "Building Bricks"],
  },
  {
    _id: "2",
    name: "Arduino Learning Kit",
    category: "Intermediate",
    description: "An Arduino-based kit with sensors, LEDs, and motors for Grade 6–8 students stepping into real electronics and code.",
    specs: ["Arduino Uno-compatible board", "20+ sensors and modules", "C++ based programming intro", "Designed for ages 11-14"],
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
    price: 3999,
    kitItems: ["Arduino Uno board", "Breadboard", "Jumper wires (40pcs)", "10x LEDs (RGB, Yellow, Red)", "Servo Motor", "Temperature Sensor (DHT11)", "Infrared Receiver", "Remote Controller"],
  },
  {
    _id: "3",
    name: "AI Starter Kit",
    category: "Advanced",
    description: "Hands-on machine learning and AI concepts for Grade 9–12 students, with real datasets and visual model training.",
    specs: ["Camera module included", "Visual ML model trainer", "Python-based projects", "Designed for ages 14-18"],
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
    price: 5499,
    kitItems: ["ESP32 Camera Module", "AI Accelerator Shield", "Connecting wires", "Visual Recognition block modules", "Python workspace setup license"],
  },
  {
    _id: "4",
    name: "IoT Experiment Kit",
    category: "Advanced",
    description: "Build real IoT projects with ESP32, sensors, and live cloud dashboards — for advanced senior-grade learners.",
    specs: ["ESP32 dev board", "Wi-Fi + cloud dashboard setup", "5+ real-world IoT projects", "Designed for ages 14-18"],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    price: 4899,
    kitItems: ["ESP32 Wi-Fi module", "Relay Module (5V)", "Soil Moisture Sensor", "DHT22 Humidty Sensor", "Micro Servo", "Buzzer module", "Jumper cables"],
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setQuantity(1);
    getProduct(id)
      .then((res) => {
        const dbProduct = res.data.data;
        // Merge DB product with static values if needed (like kit items)
        const staticMatch = staticProducts.find((p) => p._id === id);
        setProduct({
          ...dbProduct,
          price: dbProduct.price || staticMatch?.price || 1999,
          kitItems: dbProduct.kitItems || staticMatch?.kitItems || ["Main Controller board", "Jumper cables", "Sensor modules", "Battery socket", "Introduction sheet"],
          specs: dbProduct.specs || staticMatch?.specs || ["Designed for school environments", "CBSE outcome aligned", "Safety certified"],
        });
      })
      .catch(() => {
        setProduct(staticProducts.find((p) => p._id === id) || staticProducts[0]);
      })
      .finally(() => setLoading(false));

    getProducts({ limit: 4 })
      .then((res) => setRelated((res.data.data || []).filter((p) => p._id !== id)))
      .catch(() => setRelated(staticProducts.filter((p) => p._id !== id)));
  }, [id]);

  const handleAddToCart = () => {
    if (product) addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate("/checkout");
    }
  };

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

  const mockPrice = product.price || 2499;

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pt-20 pb-16">
      <SEO title={product.name || product.title} description={product.description || product.desc} path={`/products/${id}`} />
      
      <div className="max-w-6xl mx-auto px-6 py-6">
        <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-600 transition-colors mb-8 font-medium">
          <ArrowLeft size={15} /> Back to Products
        </Link>

        {/* Product Summary Grid */}
        <div className="grid lg:grid-cols-2 gap-12 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          {/* Left: Image */}
          <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center relative">
            <img
              src={product.imageUrl || product.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"}
              alt={product.name || product.title}
              className="w-full h-80 lg:h-[420px] object-cover"
            />
            <span className="absolute top-4 left-4 text-xs font-bold text-cyan-700 bg-white border border-cyan-100 px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {product.category || product.level}
            </span>
          </div>

          {/* Right: Details Info */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1.5 mb-3">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-slate-400 font-semibold">(14 verified ratings)</span>
              </div>

              <h1 className="text-3xl font-extrabold text-[#0b2545] leading-tight">
                {product.name || product.title}
              </h1>

              <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                {product.description || product.desc}
              </p>

              {/* Highlights */}
              {product.specs?.length > 0 && (
                <div className="mt-6 space-y-2 border-t border-slate-100 pt-5">
                  <h4 className="text-xs font-bold text-[#0b2545] uppercase tracking-wider mb-2">Key Highlights</h4>
                  {product.specs.map((spec) => (
                    <div key={spec} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      <span className="text-slate-600 text-sm">{spec}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price & E-com Actions */}
            <div className="mt-8 border-t border-slate-100 pt-5">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-extrabold text-[#0b2545]">₹{mockPrice}</span>
                <span className="text-xs text-slate-400 font-medium">(Incl. 18% GST)</span>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                {/* Quantity adjustment */}
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 text-slate-500 hover:text-[#0b2545] hover:bg-slate-100 rounded-l-xl transition"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-sm font-bold text-slate-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 text-slate-500 hover:text-[#0b2545] hover:bg-slate-100 rounded-r-xl transition"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-cyan-50 border border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 text-cyan-700 py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>

                {/* Buy Now */}
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#0b2545] hover:bg-cyan-600 text-white py-3.5 px-6 rounded-xl font-bold flex items-center justify-center transition shadow-md"
                >
                  Buy Now
                </button>
              </div>

              {/* Lab Quote Alternate */}
              <p className="text-[11px] text-slate-400 mt-4 leading-normal flex items-start gap-1.5">
                <ShieldAlert size={14} className="text-slate-300 shrink-0 mt-0.5" />
                <span>Bulk discounts available for schools. For purchase orders (POs) or custom setups, please request an institutional quote.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tabbed Info Board */}
        <div className="mt-10 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          {/* Tabs header */}
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            {[
              { id: "overview", label: "Overview" },
              { id: "specs", label: "Technical Specs" },
              { id: "components", label: "In The Box" },
              { id: "resources", label: "Resources" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-semibold transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "border-cyan-500 text-cyan-600 bg-white"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tabs Body */}
          <div className="p-6 sm:p-8 min-h-48 text-sm text-slate-600 leading-relaxed">
            {activeTab === "overview" && (
              <div className="space-y-4">
                <h3 className="font-bold text-[#0b2545] text-base mb-2">STEM Learning Focus</h3>
                <p>
                  This STEM product is designed by RoboLearn's curriculum experts to foster critical thinking and practical learning. By integrating real coding parameters with sensors and motors, it bridges the gap between software algorithms and hardware outputs.
                </p>
                <p>
                  Aligned with standard school outcomes, it teaches basic physics (circuits, motion, conductivity), mathematics (variables, coordinates), and engineering structures.
                </p>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-100"><td className="py-3 pr-4 font-semibold text-[#0b2545] w-48">Microcontroller</td><td className="py-3 text-slate-600">ATMega328p Compatible (Arduino core)</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-3 pr-4 font-semibold text-[#0b2545]">Power Source</td><td className="py-3 text-slate-600">6x AA batteries or USB Power (5V)</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-3 pr-4 font-semibold text-[#0b2545]">Recommended Age</td><td className="py-3 text-slate-600">Grade 4 to High School (8-16 years)</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-3 pr-4 font-semibold text-[#0b2545]">Weight</td><td className="py-3 text-slate-600">450g</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-3 pr-4 font-semibold text-[#0b2545]">Programming Language</td><td className="py-3 text-slate-600">Scratch 3.0 Blockly / C++ (Arduino IDE)</td></tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "components" && (
              <div>
                <h3 className="font-bold text-[#0b2545] text-base mb-4">Included Materials List</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.kitItems?.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="grid sm:grid-cols-2 gap-4">
                <a href="#pdf-download" className="flex items-center gap-3 p-4 border border-slate-100 rounded-2xl hover:border-cyan-200 hover:bg-slate-50/50 transition">
                  <FileText className="text-cyan-600" size={24} />
                  <div>
                    <span className="block font-bold text-slate-800 text-sm">Download Kit Datasheet</span>
                    <span className="block text-xs text-slate-400 mt-0.5">PDF File (1.4 MB)</span>
                  </div>
                </a>

                <a href="#code-zip" className="flex items-center gap-3 p-4 border border-slate-100 rounded-2xl hover:border-cyan-200 hover:bg-slate-50/50 transition">
                  <Code2 className="text-cyan-600" size={24} />
                  <div>
                    <span className="block font-bold text-slate-800 text-sm">Sample Codes Repository</span>
                    <span className="block text-xs text-slate-400 mt-0.5">ZIP Archive (250 KB)</span>
                  </div>
                </a>

                <a href="#tutorial-video" className="flex items-center gap-3 p-4 border border-slate-100 rounded-2xl hover:border-cyan-200 hover:bg-slate-50/50 transition sm:col-span-2">
                  <Video className="text-cyan-600" size={24} />
                  <div>
                    <span className="block font-bold text-slate-800 text-sm">Step-by-Step Unboxing &amp; Assembly Video Guide</span>
                    <span className="block text-xs text-slate-400 mt-0.5">Streaming video tutorial</span>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Customer Mock Reviews */}
        <div className="mt-10 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-bold text-[#0b2545] border-b border-slate-100 pb-4 mb-6">Customer Reviews</h3>

          <div className="space-y-6 divide-y divide-slate-100">
            {[
              { author: "Deepak Rawat", role: "School STEM Coordinator", comment: "Excellent build quality. We've introduced this in Class 6 and students have built bluetooth obstacle cars within 4 lectures. Breadboard space is excellent for basic wiring practice." },
              { author: "Sonia Joseph", role: "Science Teacher", comment: "My students absolutely love block-coding their robots! The visual tutorial videos made setup very easy. Strongly recommended for school physics and computing labs." }
            ].map((review, idx) => (
              <div key={review.author} className={`${idx > 0 ? "pt-6" : ""} text-sm`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="block font-bold text-slate-800">{review.author}</span>
                    <span className="block text-xs text-slate-400 mt-0.5">{review.role}</span>
                  </div>
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-[#0b2545] mb-8">You might also like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.slice(0, 3).map((p) => {
                return (
                  <Link
                    key={p._id}
                    to={`/products/${p._id}`}
                    className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-full h-36 rounded-xl overflow-hidden mb-4 bg-slate-50 border border-slate-100">
                        <img
                          src={p.imageUrl || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2.5 py-0.5 rounded-full inline-block mb-3">
                        {p.category || p.level}
                      </span>
                      <h3 className="font-bold text-slate-900 group-hover:text-cyan-600 transition-colors line-clamp-1">{p.name || p.title}</h3>
                    </div>
                    <span className="flex items-center gap-1 text-cyan-600 text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                      View Details <ArrowLeft className="rotate-180" size={14} />
                    </span>
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
