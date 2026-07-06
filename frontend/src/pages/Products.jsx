import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package, Search, SlidersHorizontal, ShoppingCart, Star, Heart, X, Scale, CheckCircle2 } from "lucide-react";
import { getProducts } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const categories = ["All", "Robotics Kits", "Experimental Tools", "Educational Products"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 - ₹3,000", min: 1000, max: 3000 },
  { label: "Over ₹3,000", min: 3000, max: Infinity },
];

const fallbackProducts = [
  // Robotics Kits
  {
    _id: "1",
    name: "Kids Robotics Kit",
    category: "Robotics Kits",
    level: "Beginner Kit",
    price: 2499,
    description: "Introductory physical computing building blocks, snap-fit chassis assembly, no soldering.",
    imageUrl: "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&w=400&q=80",
  },
  {
    _id: "2",
    name: "Arduino Learning Kit",
    category: "Robotics Kits",
    level: "Intermediate Kit",
    price: 3999,
    description: "Arduino core microcontroller board, multi-sensor shield array, breadboard connections.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80",
  },
  {
    _id: "3",
    name: "AI Starter Kit",
    category: "Robotics Kits",
    level: "Advanced Kit",
    price: 5499,
    description: "Computer vision and machine learning starter kits with ESP32 high-res camera shield.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
  },
  {
    _id: "4",
    name: "IoT Experiment Kit",
    category: "Robotics Kits",
    level: "Advanced Kit",
    price: 4899,
    description: "Cloud communications node module with temperature, light, and soil humidity telemetry.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
  },

  // Experimental Tools
  {
    _id: "5",
    name: "Ultrasonic Distance Sensor HC-SR04",
    category: "Experimental Tools",
    level: "Sensors",
    price: 180,
    description: "High accuracy ultrasonic distance measuring sensor compatible with Arduino and Raspberry Pi.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
  },
  {
    _id: "6",
    name: "High Torque DC Geared Motor 150RPM",
    category: "Experimental Tools",
    level: "Motors (Actuators)",
    price: 320,
    description: "12V high-torque metal gear motor suitable for robotics chassis and remote control vehicles.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
  },
  {
    _id: "7",
    name: "Arduino Uno R3 Board (ATmega328P)",
    category: "Experimental Tools",
    level: "Controllers",
    price: 650,
    description: "Standard microcontroller development board for general electronics prototyping.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80",
  },
  {
    _id: "8",
    name: "Digital Multimeter & Temperature Probe",
    category: "Experimental Tools",
    level: "STEM Equipment",
    price: 1450,
    description: "Essential lab measurement tool for diagnostic testing of voltages, currents, and resistance parameters.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
  },

  // Educational Products
  {
    _id: "9",
    name: "Block Coding Software Companion Starter",
    category: "Educational Products",
    level: "Coding Kits",
    price: 1999,
    description: "Visual Scratch 3.0 drag-and-drop course guide block modules mapped to beginner kit setups.",
    imageUrl: "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&w=400&q=80",
  },
  {
    _id: "10",
    name: "EdgeAI Vision Model Training Pack",
    category: "Educational Products",
    level: "AI Learning Kits",
    price: 2999,
    description: "Interactive kit for training custom neural networks on microcontrollers with camera captures.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
  },
  {
    _id: "11",
    name: "Smart Agriculture IoT telemetry Binders",
    category: "Educational Products",
    level: "IoT Learning Kits",
    price: 3499,
    description: "Complete greenhouse telemetry automation setup files, charts dashboards, and humidity triggers.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
  }
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePriceRange, setActivePriceRange] = useState(0); // Index of priceRange
  const [searchQuery, setSearchQuery] = useState("");

  // Compare states
  const [compareList, setCompareList] = useState([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    getProducts()
      .then((res) => {
        const dbItems = res.data?.data || [];
        // Map database courses to fallbacks if they have no custom values
        if (dbItems.length > 0) {
          setProducts(dbItems);
        } else {
          setProducts(fallbackProducts);
        }
      })
      .catch(() => setProducts(fallbackProducts))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const list = products.length > 0 ? products : fallbackProducts;
    return list.filter((p) => {
      // Category filter
      const matchCat =
        activeCategory === "All" ||
        p.category === activeCategory;

      // Price filter
      const price = p.price || 199;
      const range = priceRanges[activePriceRange];
      const matchPrice = price >= range.min && price <= range.max;

      // Search filter
      const matchSearch =
        (p.name || p.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description || p.desc || "").toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchPrice && matchSearch;
    });
  }, [products, activeCategory, activePriceRange, searchQuery]);

  // Compare handlers
  const handleToggleCompare = (product, checked) => {
    if (checked) {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 products at a time.");
        return;
      }
      setCompareList((prev) => [...prev, product]);
    } else {
      setCompareList((prev) => prev.filter((item) => item._id !== product._id));
    }
  };

  const handleRemoveFromCompare = (productId) => {
    setCompareList((prev) => prev.filter((item) => item._id !== productId));
  };

  // Mock specs data for comparison
  const getCompareSpecs = (p) => {
    const idStr = String(p._id);
    if (idStr === "1") {
      return {
        micro: "Snap-fit Connectors (App guided)",
        age: "Ages 8-11",
        inclusions: "LED modules, Motors, Chassis, Battery connector",
        sensors: "Ultrasonic sensor"
      };
    }
    if (idStr === "2") {
      return {
        micro: "ATMega328p Uno-compatible",
        age: "Ages 11-14",
        inclusions: "Servo motor, RGB LED, remote controllers, breadboard",
        sensors: "DHT11 Temp, IR Receiver, Ultrasonic"
      };
    }
    if (idStr === "3") {
      return {
        micro: "ESP32 Camera Module (AI acceleration)",
        age: "Ages 14-18",
        inclusions: "ESP32 CAM, custom AI Shield, Python workspace license",
        sensors: "High-resolution Camera sensor"
      };
    }
    if (idStr === "4") {
      return {
        micro: "ESP32 Wi-Fi Node Module",
        age: "Ages 14-18",
        inclusions: "ESP32 Wifi dev board, relay modules, buzzer system",
        sensors: "DHT22, Soil Moisture sensor, light sensor"
      };
    }
    return {
      micro: "Module Core Component",
      age: "All Grades",
      inclusions: "Standard connecting terminals",
      sensors: "Digital output feeds"
    };
  };

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
      <section className="py-12 pb-32">
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
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Product Category</h4>
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
                  {/* B2B Quote Card */}
                  <div className="bg-gradient-to-br from-[#0b2545] to-[#0e3a63] border border-cyan-500/20 rounded-2xl p-6 text-white flex flex-col justify-between shadow-md">
                    <div>
                      <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-0.5 rounded-full">School Procurement</span>
                      <h3 className="font-extrabold text-base mt-4 leading-snug">Need Bulk STEM Kits for Your School Labs?</h3>
                      <p className="text-slate-300 text-xs leading-relaxed mt-2.5">
                        Get discounted institutional quotes, curriculum binders, and free training trials for teachers.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const school = prompt("Enter School Name:");
                        const qty = prompt("Enter Target Quantity of Kits (e.g. 50):");
                        if (school && qty) {
                          alert(`Thank you! Bulk RFP submitted for ${school} (${qty} kits). Our regional sales manager will reach out within 24 hours.`);
                        }
                      }}
                      className="w-full bg-cyan-400 hover:bg-cyan-300 text-[#0b2545] font-extrabold text-xs py-3 rounded-xl transition shadow-md mt-6 animate-pulse"
                    >
                      Request Institutional RFP
                    </button>
                  </div>

                  {filtered.map((p) => {
                    const price = p.price || 199;
                    const isLiked = isInWishlist(p._id);
                    const isCompared = compareList.some((item) => item._id === p._id);
                    return (
                      <div
                        key={p._id}
                        className="group bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-cyan-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative text-sm"
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
                            {/* Category Badge */}
                            <span className="absolute top-3 left-3 text-[10px] font-bold text-cyan-700 bg-white border border-cyan-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {p.category}
                            </span>

                            {/* Wishlist toggle */}
                            <button
                              onClick={() => toggleWishlist(p)}
                              className="absolute top-3 right-3 bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 p-2 rounded-xl transition border border-slate-100 shadow-sm"
                              aria-label="Add to wishlist"
                            >
                              <Heart size={14} className={isLiked ? "text-red-500 fill-red-500" : ""} />
                            </button>
                          </div>

                          {/* Compare checkbox */}
                          <div className="flex items-center gap-1.5 mb-2.5">
                            <input
                              type="checkbox"
                              id={`compare-${p._id}`}
                              checked={isCompared}
                              onChange={(e) => handleToggleCompare(p, e.target.checked)}
                              className="w-3.5 h-3.5 border-slate-300 rounded text-cyan-600 focus:ring-cyan-500 shrink-0 cursor-pointer"
                            />
                            <label htmlFor={`compare-${p._id}`} className="text-[10px] text-slate-400 font-semibold cursor-pointer hover:text-slate-600">
                              Compare Product
                            </label>
                          </div>

                          {/* Type / Level sublabel */}
                          {p.level && (
                            <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wide">
                              {p.level}
                            </span>
                          )}

                          {/* Title */}
                          <Link to={`/products/${p._id}`} className="block">
                            <h3 className="font-bold text-slate-900 leading-snug group-hover:text-cyan-600 transition-colors mb-1 line-clamp-1">
                              {p.name || p.title}
                            </h3>
                          </Link>

                          {/* Rating and Stock Urgency */}
                          <div className="flex items-center gap-3 mt-1.5 mb-3 text-[10px]">
                            <div className="flex items-center text-amber-500 font-bold gap-0.5">
                              <Star size={11} className="fill-current" />
                              4.8
                              <span className="text-slate-400 font-medium ml-0.5">(18 reviews)</span>
                            </div>
                            <span className={`font-bold uppercase tracking-wider ${p.category === "Robotics Kits" ? "text-red-500" : "text-emerald-600"}`}>
                              {p.category === "Robotics Kits" ? "Only 4 left!" : "In Stock"}
                            </span>
                          </div>

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

      {/* Floating Compare Tray */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl py-4 px-6 flex items-center justify-between gap-4 animate-fadeUp">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0b2545]">
              <Scale size={16} className="text-cyan-600" />
              Compare Products ({compareList.length}/3)
            </div>
            <div className="flex gap-2">
              {compareList.map((item) => (
                <div key={item._id} className="flex items-center gap-2 bg-slate-100 border border-slate-200/50 rounded-xl pl-2 pr-1.5 py-1 text-xs font-semibold text-slate-700">
                  <span className="truncate max-w-[100px]">{item.name || item.title}</span>
                  <button onClick={() => handleRemoveFromCompare(item._id)} className="text-slate-400 hover:text-slate-600 transition">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setCompareList([])}
              className="text-slate-500 hover:text-slate-800 text-xs font-semibold px-4 py-2"
            >
              Clear All
            </button>
            <button
              onClick={() => setCompareModalOpen(true)}
              className="bg-[#0b2545] hover:bg-cyan-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition shadow-md flex items-center gap-1.5"
            >
              <Scale size={14} />
              Compare Now
            </button>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-[#061B33]/50 backdrop-blur-sm" onClick={() => setCompareModalOpen(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h3 className="font-bold text-[#0b2545] text-lg flex items-center gap-2">
                <Scale className="text-cyan-600" size={20} />
                STEM Kit Comparison
              </h3>
              <button onClick={() => setCompareModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-[150px_1fr] md:grid-cols-[200px_repeat(auto-fit,minmax(180px,1fr))] border-collapse text-xs md:text-sm">
                
                {/* Headers / Images */}
                <div className="p-3 bg-slate-50/50 font-bold text-slate-400 uppercase tracking-wider flex items-center">Product</div>
                {compareList.map((item) => (
                  <div key={item._id} className="p-4 border-l border-slate-100 text-center">
                    <div className="w-16 h-16 mx-auto rounded-lg overflow-hidden bg-slate-50 border border-slate-100 mb-3">
                      <img src={item.imageUrl || item.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bold text-slate-800 line-clamp-1">{item.name || item.title}</span>
                  </div>
                ))}

                {/* Pricing row */}
                <div className="p-3 border-t border-slate-100 bg-slate-50/50 font-bold text-[#0b2545] flex items-center">Price</div>
                {compareList.map((item) => {
                  const price = item.price || 199;
                  return (
                    <div key={item._id} className="p-4 border-t border-l border-slate-100 font-bold text-cyan-600 text-center">
                      ₹{price}
                    </div>
                  );
                })}

                {/* Level / Category */}
                <div className="p-3 border-t border-slate-100 bg-slate-50/50 font-bold text-[#0b2545] flex items-center">Product Type</div>
                {compareList.map((item) => (
                  <div key={item._id} className="p-4 border-t border-l border-slate-100 text-center text-slate-600">
                    <span className="font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded uppercase tracking-wider text-[10px]">
                      {item.level || item.category}
                    </span>
                  </div>
                ))}

                {/* Microcontroller */}
                <div className="p-3 border-t border-slate-100 bg-slate-50/50 font-bold text-[#0b2545] flex items-center">Controller Core</div>
                {compareList.map((item) => (
                  <div key={item._id} className="p-4 border-t border-l border-slate-100 text-center text-slate-600">
                    {getCompareSpecs(item).micro}
                  </div>
                ))}

                {/* Target Age */}
                <div className="p-3 border-t border-slate-100 bg-slate-50/50 font-bold text-[#0b2545] flex items-center">Target Grades</div>
                {compareList.map((item) => (
                  <div key={item._id} className="p-4 border-t border-l border-slate-100 text-center text-slate-600">
                    {getCompareSpecs(item).age}
                  </div>
                ))}

                {/* Sensors */}
                <div className="p-3 border-t border-slate-100 bg-slate-50/50 font-bold text-[#0b2545] flex items-center">Key Sensors</div>
                {compareList.map((item) => (
                  <div key={item._id} className="p-4 border-t border-l border-slate-100 text-center text-slate-600">
                    {getCompareSpecs(item).sensors}
                  </div>
                ))}

                {/* Package Inclusions */}
                <div className="p-3 border-t border-slate-100 bg-slate-50/50 font-bold text-[#0b2545] flex items-center">Box Inclusions</div>
                {compareList.map((item) => (
                  <div key={item._id} className="p-4 border-t border-l border-slate-100 text-center text-slate-600 text-xs">
                    {getCompareSpecs(item).inclusions}
                  </div>
                ))}

                {/* Cart Action */}
                <div className="p-3 border-t border-slate-100 bg-slate-50/50 font-bold text-[#0b2545] flex items-center">Buy</div>
                {compareList.map((item) => (
                  <div key={item._id} className="p-4 border-t border-l border-slate-100 flex justify-center">
                    <button
                      onClick={() => {
                        addToCart(item, 1);
                        setCompareModalOpen(false);
                      }}
                      className="bg-[#0b2545] hover:bg-cyan-600 text-white font-semibold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1 shadow-sm"
                    >
                      <ShoppingCart size={12} /> Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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