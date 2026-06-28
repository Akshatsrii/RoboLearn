import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Clock, Search } from "lucide-react";
import { getBlogs } from "../../services/blogService";

const staticBlogs = [
  { _id: 1, title: "Benefits of Robotics Education in Schools", category: "robotics", excerpt: "How robotics helps students develop critical thinking, problem-solving and teamwork skills from an early age.", readTime: 5, publishedAt: "2026-06-01" },
  { _id: 2, title: "Future of AI in Indian Schools", category: "ai", excerpt: "AI is transforming education. Here's how schools can prepare students for an AI-driven world.", readTime: 6, publishedAt: "2026-06-08" },
  { _id: 3, title: "STEM Learning Trends in 2026", category: "stem", excerpt: "The latest trends in STEM education and what they mean for school curriculum planning.", readTime: 4, publishedAt: "2026-06-15" },
  { _id: 4, title: "Coding for Kids — Where to Start", category: "coding", excerpt: "A beginner's guide for schools looking to introduce coding and robotics to young learners.", readTime: 5, publishedAt: "2026-06-20" },
];

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
      .then((res) => setBlogs(res.data.data || []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  const all = blogs.length > 0 ? blogs : staticBlogs;
  const [featured, ...rest] = all;

  const filtered = useMemo(() => {
    return rest.filter((blog) => {
      const matchesCategory = activeCategory === "all" || blog.category === activeCategory;
      const matchesQuery = blog.title.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
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
        @media (prefers-reduced-motion: reduce) {
          .anim-fadeup, .circuit-line { animation: none !important; }
        }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[#061B33] py-24 lg:py-28">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.16]"
          viewBox="0 0 1200 500"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <g stroke="#22d3ee" strokeWidth="1.2">
            <path className="circuit-line" d="M0 90 H260 V210 H520" />
            <path className="circuit-line" d="M1200 60 H880 V180 H640" />
          </g>
          <g fill="#22d3ee">
            <circle cx="260" cy="90" r="4" />
            <circle cx="520" cy="210" r="4" />
            <circle cx="880" cy="60" r="4" />
            <circle cx="640" cy="180" r="4" />
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
            Articles, guides, and updates from the world of robotics, AI,
            STEM education, and school innovation.
          </p>

          {/* Search */}
          <div className="mt-9 max-w-md mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-white/5 border border-white/15 text-white placeholder:text-slate-400 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-cyan-400/60 focus:bg-white/10 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* ============ FEATURED POST ============ */}
      {!loading && featured && (
        <section className="py-16 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">
              Latest Article
            </span>

            <div className="mt-5 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center bg-slate-50 border border-slate-200 rounded-3xl p-8 lg:p-10">
              <div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${categoryStyles[featured.category] || "bg-slate-100 text-slate-600"}`}>
                  {featured.category}
                </span>

                <h2 className="mt-4 text-2xl md:text-3xl font-bold text-[#0b2545] leading-snug">
                  {featured.title}
                </h2>

                <p className="mt-3 text-slate-600 leading-relaxed">
                  {featured.excerpt}
                </p>

                <div className="flex items-center gap-5 text-sm text-slate-500 mt-6">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {formatDate(featured.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {featured.readTime} min read
                  </span>
                </div>

                <Link to={`/blog/${featured._id}`} className="group flex items-center gap-1.5 text-cyan-600 font-semibold mt-7 hover:gap-2.5 transition-all">
                  Read Full Article
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
                  alt="Robotics circuit board featured in the latest article"
                  className="w-full h-64 lg:h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============ FILTERS + GRID ============ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0b2545]">
              More Articles
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
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="border border-slate-200 rounded-2xl p-6 animate-pulse">
                  <div className="h-5 w-20 bg-slate-100 rounded-full" />
                  <div className="h-4 w-full bg-slate-100 rounded mt-4" />
                  <div className="h-4 w-3/4 bg-slate-100 rounded mt-2" />
                  <div className="h-3 w-full bg-slate-100 rounded mt-4" />
                  <div className="h-3 w-2/3 bg-slate-100 rounded mt-2" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              No articles match your search yet — try another keyword or category.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((blog) => (
                <Link
                  to={`/blog/${blog._id}`}
                  key={blog._id}
                  className="group border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-cyan-300 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="p-6">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${categoryStyles[blog.category] || "bg-slate-100 text-slate-600"}`}>
                      {blog.category}
                    </span>

                    <h3 className="font-semibold text-slate-900 mt-3 mb-2 leading-snug group-hover:text-cyan-600 transition-colors">
                      {blog.title}
                    </h3>

                    <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(blog.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {blog.readTime} min read
                      </span>
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

      {/* ============ NEWSLETTER CTA ============ */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2545] via-[#0e3a63] to-cyan-600 p-10 md:p-14 text-center text-white">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <circle cx="40" cy="40" r="90" fill="white" />
                <circle cx="380" cy="180" r="120" fill="white" />
              </svg>
            </div>

            <h2 className="relative text-2xl md:text-3xl font-bold">
              Get robotics & STEM insights in your inbox
            </h2>
            <p className="relative mt-3 text-cyan-50/90">
              One useful article a month — no spam, unsubscribe anytime.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative mt-7 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="you@school.edu"
                className="flex-1 rounded-xl px-4 py-3.5 text-slate-900 outline-none focus:ring-2 focus:ring-cyan-300"
              />
              <button
                type="submit"
                className="bg-white text-[#0b2545] hover:bg-cyan-50 px-6 py-3.5 rounded-xl font-semibold transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}