import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { getBlogs } from "../../services/blogService";

const staticBlogs = [
  { _id: 1, title: "Benefits of Robotics Education in Schools", category: "robotics", excerpt: "How robotics helps students develop critical thinking, problem-solving and teamwork skills from an early age.", readTime: 5, publishedAt: "2026-06-01" },
  { _id: 2, title: "Future of AI in Indian Schools", category: "ai", excerpt: "AI is transforming education. Here's how schools can prepare students for an AI-driven world.", readTime: 6, publishedAt: "2026-06-08" },
  { _id: 3, title: "STEM Learning Trends in 2026", category: "stem", excerpt: "The latest trends in STEM education and what they mean for school curriculum planning.", readTime: 4, publishedAt: "2026-06-15" },
  { _id: 4, title: "Coding for Kids — Where to Start", category: "coding", excerpt: "A beginner's guide for schools looking to introduce coding and robotics to young learners.", readTime: 5, publishedAt: "2026-06-20" },
];

const categoryColors = {
  robotics: "bg-blue-50 text-blue-600",
  ai: "bg-purple-50 text-purple-600",
  stem: "bg-emerald-50 text-emerald-600",
  coding: "bg-orange-50 text-orange-600",
  education: "bg-cyan-50 text-cyan-600",
};

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs()
      .then((res) => setBlogs(res.data.data || []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  const display = blogs.length > 0 ? blogs : staticBlogs;

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Blog & Resources
          </span>
          <h1 className="text-5xl font-bold mb-6">
            Insights on{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Robotics & STEM
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Articles, guides and updates from the world of robotics, AI, STEM education and school innovation.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-20 text-slate-400">Loading articles...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {display.map((blog) => (
                <div key={blog._id} className="border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-cyan-300 transition group">
                  <div className="p-6">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${categoryColors[blog.category] || "bg-slate-100 text-slate-600"}`}>
                      {blog.category}
                    </span>
                    <h3 className="font-semibold text-slate-900 mt-3 mb-2 leading-snug group-hover:text-cyan-600 transition">
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(blog.publishedAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {blog.readTime} min read
                      </span>
                    </div>
                    <button className="flex items-center gap-1 text-cyan-600 text-sm font-semibold hover:gap-2 transition-all">
                      Read More <ArrowRight size={14} />
                    </button>
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