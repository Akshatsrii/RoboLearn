import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ArrowRight, Loader2 } from "lucide-react";
import { getBlog, getBlogs } from "../services/blogService";

const categoryStyles = {
  robotics: "bg-blue-50 text-blue-600",
  ai: "bg-purple-50 text-purple-600",
  stem: "bg-emerald-50 text-emerald-600",
  coding: "bg-orange-50 text-orange-600",
  education: "bg-cyan-50 text-cyan-600",
};

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBlog(id)
      .then((res) => {
        const data = res.data.data;
        setBlog(data);
        return getBlogs({ category: data.category, limit: 4 });
      })
      .then((res) => {
        setRelated((res.data?.data || []).filter((b) => b._id !== id));
      })
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [id]);

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "";

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400">
        <Loader2 size={24} className="animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <p className="text-slate-500 mb-4">Article not found.</p>
        <Link to="/blog" className="text-cyan-600 font-semibold hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-900">
      <article className="max-w-3xl mx-auto px-6 py-10">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-600 transition-colors mb-8">
          <ArrowLeft size={15} /> Back to Blog
        </Link>

        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${categoryStyles[blog.category] || "bg-slate-100 text-slate-600"}`}>
          {blog.category}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold text-[#0b2545] mt-4 leading-snug">
          {blog.title}
        </h1>

        <div className="flex items-center gap-5 text-sm text-slate-500 mt-5">
          <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(blog.publishedAt)}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> {blog.readTime} min read</span>
          {blog.author && <span>By {blog.author}</span>}
        </div>

        {blog.coverImage && (
          <div className="rounded-2xl overflow-hidden mt-8 shadow-sm">
            <img src={blog.coverImage} alt={blog.title} className="w-full h-72 md:h-96 object-cover" />
          </div>
        )}

        <div className="prose prose-slate max-w-none mt-8 text-slate-700 leading-relaxed whitespace-pre-line">
          {blog.content || blog.excerpt}
        </div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="bg-slate-50 py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[#0b2545] mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.slice(0, 3).map((b) => (
                <Link
                  key={b._id}
                  to={`/blog/${b._id}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-lg transition-all duration-300"
                >
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${categoryStyles[b.category] || "bg-slate-100 text-slate-600"}`}>
                    {b.category}
                  </span>
                  <h3 className="font-semibold text-slate-900 mt-3 mb-2 leading-snug group-hover:text-cyan-600 transition-colors">
                    {b.title}
                  </h3>
                  <span className="flex items-center gap-1 text-cyan-600 text-sm font-semibold group-hover:gap-2 transition-all">
                    Read More <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}