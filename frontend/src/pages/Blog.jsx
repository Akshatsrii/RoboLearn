import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Clock, Search } from "lucide-react";
import { getBlogs } from "../services/blogService";
import SEO from "../components/SEO";
import { motion } from "framer-motion";

const categoryStyles = {
  robotics: "bg-blue-50 text-blue-600",
  ai: "bg-purple-50 text-purple-600",
  stem: "bg-emerald-50 text-emerald-600",
  coding: "bg-orange-50 text-orange-600",
  education: "bg-cyan-50 text-cyan-600",
};

const categories = ["all", "robotics", "ai", "stem", "coding", "education"];

const fallbackBlogs = [
  {
    _id: "blog_1",
    title: "India moving towards hardware Semiconductor",
    category: "robotics",
    excerpt: "Exploring India's domestic microprocessor initiatives, semiconductor fabrication plants, and the rise of local engineering design.",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    publishedAt: "2026-07-01",
    readTime: 6,
    author: "Karan Johar",
    content: "With massive government grants and technological updates, India is carving its footprint in advanced hardware design and silicon assembly setups."
  },
  {
    _id: "blog_2",
    title: "Future of AI in Schools",
    category: "ai",
    excerpt: "How neural networks and conversational tutors are transforming classroom curriculums and tutoring assistance.",
    coverImage: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=800&q=80",
    publishedAt: "2026-06-25",
    readTime: 4,
    author: "Aditya Roy",
    content: "Artificial intelligence is not just a tool; it is a personalized co-pilot that adapts to the learning speed of each individual child."
  },
  {
    _id: "blog_3",
    title: "Coding for Kids",
    category: "coding",
    excerpt: "Breaking down the transition from drag-and-drop block coding tools like Scratch to textual python systems.",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    publishedAt: "2026-06-18",
    readTime: 5,
    author: "Meera Sen",
    content: "Early exposure to programming languages expands cognitive models, logic building pathways, and mathematical optimization capacities."
  },
  {
    _id: "blog_4",
    title: "STEM Learning Trends",
    category: "stem",
    excerpt: "Analyzing physical computing, 3D printing integrations, and multi-disciplinary engineering design frameworks.",
    coverImage: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
    publishedAt: "2026-06-10",
    readTime: 5,
    author: "Simran Kaur",
    content: "The days of rote memorization are passing. Modern STEM structures focus entirely on active, hands-on, hardware-driven learning."
  },
  {
    _id: "blog_5",
    title: "Benefits of Robotics Education",
    category: "education",
    excerpt: "Robotics provides kids a tangible playground to understand abstract algorithms, mechanics, and design methodologies.",
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    publishedAt: "2026-06-02",
    readTime: 7,
    author: "Rajesh Kumar",
    content: "Building physical devices that respond to code sparks a deep curiosity, encouraging students to pursue science and core engineering careers."
  },
  {
    _id: "blog_6",
    title: "Introduction to Robotics",
    category: "robotics",
    excerpt: "A beginner's guide to understanding basic robotic actuators, feedback control loops, and microcontrollers.",
    coverImage: "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&w=800&q=80",
    publishedAt: "2026-06-01",
    readTime: 5,
    author: "Simran Kaur",
    content: "Robotics is the intersection of science, engineering, and logic. In this introductory post, we cover what makes a machine a robot: the Sense-Think-Act paradigm."
  }
];

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getBlogs()
      .then((res) => {
        const dbBlogs = res.data?.data || [];
        if (dbBlogs.length > 0) {
          setBlogs(dbBlogs);
        } else {
          setBlogs(fallbackBlogs);
        }
      })
      .catch(() => setBlogs(fallbackBlogs))
      .finally(() => setLoading(false));
  }, []);

  const activeBlogsList = blogs.length > 0 ? blogs : fallbackBlogs;
  const featured = activeBlogsList[0];
  const rest = activeBlogsList.slice(1);

  const filtered = useMemo(() => {
    return rest.filter((blog) => {
      const matchCat = activeCategory === "all" || blog.category === activeCategory;
      const matchQ = (blog.title || "").toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [rest, activeCategory, query]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", { month: "short", year: "numeric" });

  return (
    <div className="bg-white text-slate-900">
      <style>{`
        @keyframes dash { to { stroke-dashoffset: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .anim-fadeup { animation: fadeUp .7s ease both; }
        .circuit-line { stroke-dasharray: 6 6; stroke-dashoffset: 240; animation: dash 3s linear forwards 0.3s; }
        @media (prefers-reduced-motion: reduce) { .anim-fadeup, .circuit-line { animation: none !important; } }
      `}</style>
      <SEO title="STEM & Robotics Blog" description="Latest trends in AI education, coding for kids, and STEM learning." path="/blog" />

      {/* HERO */}
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
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto px-6 text-center"
        >
          <span className="inline-flex items-center gap-2 bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 px-4 py-1.5 rounded-full text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Knowledge Hub
          </span>
          <h1 className="mt-6 text-4xl lg:text-5xl font-bold leading-[1.1] text-white">
            Future of STEM &amp; <span className="text-cyan-400">Robotics</span>
          </h1>
          <p className="mt-4 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Stay up to date with core engineering pedagogies, semiconductor initiatives in India, and smart classroom trends.
          </p>
        </motion.div>
      </section>

      {/* FEATURED POST */}
      {featured && (
        <section className="py-20 bg-slate-50 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${categoryStyles[featured.category] || "bg-slate-200 text-slate-700"}`}>
                  Featured {featured.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b2545] mt-5 leading-snug">
                  {featured.title}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mt-4">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-5 text-sm text-slate-500 mt-6">
                  <span className="flex items-center gap-1.5"><Calendar size={14} />{formatDate(featured.publishedAt)}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} />{featured.readTime} min read</span>
                </div>
                <Link
                  to={`/blog/${featured.slug || featured._id}`}
                  className="group flex items-center gap-1.5 text-cyan-600 font-semibold mt-7 hover:gap-2.5 transition-all text-sm"
                >
                  Read Full Article
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
              {featured.coverImage && (
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 group cursor-pointer"
                >
                  <img src={featured.coverImage} alt={featured.title} className="w-full h-64 lg:h-72 object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FILTERS + GRID */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
            <h2 className="text-2xl font-bold text-[#0b2545]">
              More Articles
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`capitalize text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${
                      activeCategory === cat
                        ? "bg-[#0b2545] text-white border-[#0b2545] shadow-md scale-105"
                        : "bg-white text-slate-600 border-slate-200 hover:border-cyan-300 hover:text-cyan-600 hover:bg-slate-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border border-slate-200 rounded-2xl p-6 animate-pulse bg-white">
                  <div className="h-4 w-20 bg-slate-100 rounded-full mb-4" />
                  <div className="h-4 w-full bg-slate-100 rounded mb-2" />
                  <div className="h-3 w-3/4 bg-slate-100 rounded" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-500 text-sm">No articles match your selection.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((blog, idx) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link
                    to={`/blog/${blog.slug || blog._id}`}
                    className="group border border-slate-200 bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:border-cyan-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full justify-between"
                  >
                    <div>
                      {blog.coverImage && (
                        <div className="overflow-hidden h-48 border-b border-slate-100 relative">
                          <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>
                      )}
                      <div className="p-5">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full capitalize tracking-wide ${categoryStyles[blog.category] || "bg-slate-100 text-slate-600"}`}>
                          {blog.category}
                        </span>
                        <h3 className="font-bold text-slate-900 mt-4 mb-2 leading-snug group-hover:text-cyan-600 transition-colors text-base line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{blog.excerpt}</p>
                      </div>
                    </div>
                    <div className="p-5 pt-0 mt-auto">
                      <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 border-t border-slate-50 pt-4">
                        <span className="flex items-center gap-1.5"><Calendar size={14} />{formatDate(blog.publishedAt)}</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} />{blog.readTime} min read</span>
                      </div>
                      <span className="flex items-center gap-1 text-cyan-600 text-sm font-semibold group-hover:gap-2 transition-all">
                        Read Article <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}