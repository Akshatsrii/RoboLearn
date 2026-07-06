import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Clock, Search } from "lucide-react";
import { getBlogs } from "../services/blogService";
import SEO from "../components/SEO";

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
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
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
    coverImage: "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&w=800&q=80",
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
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
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
    coverImage: "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&w=800&q=80",
    publishedAt: "2026-06-02",
    readTime: 7,
    author: "Rajesh Kumar",
    content: "Building physical devices that respond to code sparks a deep curiosity, encouraging students to pursue science and core engineering careers."
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
        <div className="relative max-w-4xl mx-auto px-6 text-center anim-fadeup">
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
        </div>
      </section>

      {/* FEATURED POST */}
      {featured && (
        <section className="py-20 bg-slate-50 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="anim-fadeup">
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
              </div>
              {featured.coverImage && (
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                  <img src={featured.coverImage} alt={featured.title} className="w-full h-64 lg:h-72 object-cover" loading="lazy" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FILTERS + GRID */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
            <h2 className="text-xl font-bold text-[#0b2545]">
              More Articles
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`capitalize text-xs font-semibold px-4 py-2 rounded-xl border transition-colors ${
                    activeCategory === cat
                      ? "bg-[#0b2545] text-white border-[#0b2545] shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:border-cyan-300 hover:text-cyan-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
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
              {filtered.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blog/${blog.slug || blog._id}`}
                  className="group border border-slate-200 bg-white rounded-2xl overflow-hidden hover:shadow-md hover:border-cyan-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {blog.coverImage && (
                      <div className="overflow-hidden h-44 border-b border-slate-100">
                        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" loading="lazy" />
                      </div>
                    )}
                    <div className="p-5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${categoryStyles[blog.category] || "bg-slate-100 text-slate-600"}`}>
                        {blog.category}
                      </span>
                      <h3 className="font-bold text-slate-900 mt-3 mb-2 leading-snug group-hover:text-cyan-600 transition-colors text-sm line-clamp-1">
                        {blog.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">{blog.excerpt}</p>
                    </div>
                  </div>
                  <div className="p-5 pt-0 mt-auto">
                    <div className="flex items-center gap-4 text-[10px] text-slate-400 mb-3.5">
                      <span className="flex items-center gap-1"><Calendar size={11} />{formatDate(blog.publishedAt)}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{blog.readTime} min read</span>
                    </div>
                    <span className="flex items-center gap-1 text-cyan-600 text-xs font-bold group-hover:gap-1.5 transition-all">
                      Read More <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}