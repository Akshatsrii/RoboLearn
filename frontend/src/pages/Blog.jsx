import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Clock, Search } from "lucide-react";
import { getBlogs } from "../services/blogService";

const categoryStyles = {
  robotics: "bg-blue-50 text-blue-600",
  ai: "bg-purple-50 text-purple-600",
  stem: "bg-emerald-50 text-emerald-600",
  coding: "bg-orange-50 text-orange-600",
  education: "bg-cyan-50 text-cyan-600",
};

const categories = ["all", "robotics", "ai", "stem", "coding", "education"];

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getBlogs()
      .then((res) => setBlogs(res.data?.data || []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  const [featured, ...rest] = blogs;

  const filtered = useMemo(() => {
    return rest.filter((blog) => {
      const matchCat = activeCategory === "all" || blog.category === activeCategory;
      const matchQ = blog.title.toLowerCase().includes(query.toLowerCase());
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
            Blog &amp; Resources
          </span>
          <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
            Insights on <span className="text-cyan-400">robotics &amp; STEM</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Articles, guides, and updates from the world of robotics, AI, STEM education, and school innovation.
          </p>
          <div className="mt-9 max-w-md mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-white/5 border border-white/15 text-white placeholder:text-slate-400 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-cyan-400/60 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* FEATURED POST */}
      {!loading && featured && (
        <section className="py-16 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">Latest Article</span>
            <div className="mt-5 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center bg-slate-50 border border-slate-200 rounded-3xl p-8 lg:p-10">
              <div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${categoryStyles[featured.category] || "bg-slate-100 text-slate-600"}`}>
                  {featured.category}
                </span>
                <h2 className="mt-4 text-2xl md:text-3xl font-bold text-[#0b2545] leading-snug">{featured.title}</h2>
                <p className="mt-3 text-slate-600 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-5 text-sm text-slate-500 mt-6">
                  <span className="flex items-center gap-1.5"><Calendar size={14} />{formatDate(featured.publishedAt)}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} />{featured.readTime} min read</span>
                </div>
                <Link
                  to={`/blog/${featured.slug || featured._id}`}
                  className="group flex items-center gap-1.5 text-cyan-600 font-semibold mt-7 hover:gap-2.5 transition-all"
                >
                  Read Full Article
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              {featured.coverImage && (
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <img src={featured.coverImage} alt={featured.title} className="w-full h-64 lg:h-72 object-cover" loading="lazy" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FILTERS + GRID */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0b2545]">
              {blogs.length === 0 && !loading ? "No articles yet" : "More Articles"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`capitalize text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
                    activeCategory === cat
                      ? "bg-[#0b2545] text-white border-[#0b2545]"
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
                <div key={i} className="border border-slate-200 rounded-2xl p-6 animate-pulse">
                  <div className="h-4 w-20 bg-slate-100 rounded-full mb-4" />
                  <div className="h-4 w-full bg-slate-100 rounded mb-2" />
                  <div className="h-3 w-3/4 bg-slate-100 rounded" />
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <p className="text-lg font-medium">No articles published yet.</p>
              <p className="text-sm mt-2">Check back soon — or add articles from the Admin Dashboard.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-500">No articles match your search.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blog/${blog.slug || blog._id}`}
                  className="group border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-cyan-300 hover:-translate-y-1 transition-all duration-300"
                >
                  {blog.coverImage && (
                    <div className="overflow-hidden h-48">
                      <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                  )}
                  <div className="p-6">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${categoryStyles[blog.category] || "bg-slate-100 text-slate-600"}`}>
                      {blog.category}
                    </span>
                    <h3 className="font-semibold text-slate-900 mt-3 mb-2 leading-snug group-hover:text-cyan-600 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(blog.publishedAt)}</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{blog.readTime} min read</span>
                    </div>
                    <span className="flex items-center gap-1 text-cyan-600 text-sm font-semibold group-hover:gap-2 transition-all">
                      Read More <ArrowRight size={14} />
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