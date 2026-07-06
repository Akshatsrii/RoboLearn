import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ArrowRight, Loader2 } from "lucide-react";
import { getBlog, getBlogs } from "../services/blogService";
import SEO from "../components/SEO";

const categoryStyles = {
  robotics: "bg-blue-50 text-blue-600",
  ai: "bg-purple-50 text-purple-600",
  stem: "bg-emerald-50 text-emerald-600",
  coding: "bg-orange-50 text-orange-600",
  education: "bg-cyan-50 text-cyan-600",
};

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
    content: `India is rapidly transforming its technology ecosystem, moving aggressively from software exports to domestic semiconductor design and manufacturing. Driven by massive government subsidies and strategic academic alignments, local engineering labs are training the next generation in silicon chip assembly setups.

In this deep dive, we explore how educational robotics labs play a critical role. By training students in physical computing, microcontrollers, and logic routing early in high school, we are seeding the talent pool required to support India's upcoming fabrication plants. The transition to high-tech manufacturing starts inside the science classroom.`
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
    content: `Artificial intelligence is moving beyond chatbots to become an active, personalized co-pilot for school children. Smart learning software can now diagnose a student's cognitive models in real time, serving them customized challenges to address specific learning gaps.

We look at how integration of AI kits in STEM classrooms helps students build, calibrate, and program their own vision sensors. Moving AI from the cloud onto physical edge processors makes machine learning tangible and exciting for young students.`
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
    content: `Programming is the new literacy of the 21st century. Drag-and-drop environments like Scratch 3.0 have made logic construction highly accessible to kids as young as eight. However, transitioning from blocks to actual text code like Python can be intimidating.

The solution lies in physical computing. By coding robotic shields, motors, and LEDs, students see the physical results of their loops and conditionals. This tactile validation bridges the gap, converting abstract syntaxes into enjoyable logic gameplay.`
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
    content: `The modern STEM landscape is moving away from purely virtual simulations back to tangible hardware assemblies. Schools are finding that physical interactions are critical to developing strong spacial reasoning and troubleshooting endurance.

We analyze the latest CBSE and NEP guidelines recommending hands-on project assessments. Designing smart city grids, solar trackers, and automated agricultural sensors gives kids a genuine taste of active engineering practices.`
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
    content: `Why is robotics becoming central to modern curricula? Unlike flat computer screens, a robot operates in the real physical world, which has friction, gravity, and noise.

Debugging a physical system teaches kids patience and resilience. They learn that coding is not just about syntax; it is about building feedback loops that correct physical errors. We detail five key academic benefits including logic, spatial visualization, team work, and early mechanical intuition.`
  }
];

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBlog(id)
      .then((res) => {
        const data = res.data?.data;
        if (data) {
          setBlog(data);
          return getBlogs({ category: data.category, limit: 4 });
        } else {
          throw new Error("No data");
        }
      })
      .then((res) => {
        setRelated((res.data?.data || []).filter((b) => b._id !== id));
      })
      .catch(() => {
        // Fallback search
        const fallbackObj = fallbackBlogs.find((b) => b._id === id || b.title.toLowerCase().replace(/ /g, "-") === id);
        if (fallbackObj) {
          setBlog(fallbackObj);
          setRelated(fallbackBlogs.filter((b) => b._id !== fallbackObj._id).slice(0, 3));
        } else {
          setBlog(null);
        }
      })
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
    <div className="bg-white text-slate-900 min-h-screen">
      <SEO title={blog.title} description={blog.excerpt} path={`/blog/${blog._id}`} />
      <article className="max-w-3xl mx-auto px-6 py-12">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-600 transition-colors mb-8 font-semibold">
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${categoryStyles[blog.category] || "bg-slate-100 text-slate-600"}`}>
          {blog.category}
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0b2545] mt-5 leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center gap-5 text-xs text-slate-400 mt-5 pb-6 border-b border-slate-100">
          <span className="flex items-center gap-1.5"><Calendar size={13} /> {formatDate(blog.publishedAt)}</span>
          <span className="flex items-center gap-1.5"><Clock size={13} /> {blog.readTime} min read</span>
          {blog.author && <span className="font-semibold text-slate-500">By {blog.author}</span>}
        </div>

        {blog.coverImage && (
          <div className="rounded-2xl overflow-hidden mt-8 shadow-sm border border-slate-200">
            <img src={blog.coverImage} alt={blog.title} className="w-full h-64 md:h-96 object-cover" />
          </div>
        )}

        <div className="mt-8 text-slate-700 leading-relaxed text-sm md:text-base space-y-6 whitespace-pre-line font-normal">
          {blog.content}
        </div>

        {/* RELATED POSTS */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-100">
            <h3 className="text-lg font-bold text-[#0b2545] mb-6">Related Articles</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item._id}
                  to={`/blog/${item.slug || item._id}`}
                  className="group block space-y-2.5 text-xs"
                >
                  <div className="h-28 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                    <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform" />
                  </div>
                  <h4 className="font-bold text-slate-800 leading-snug group-hover:text-cyan-600 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
