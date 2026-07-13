import { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageCircle, X, Send, Bot, Sparkles, Loader2,
  ChevronRight, Phone, Calendar, Cpu, BookOpen, ShoppingBag,
  RotateCcw, Zap, GraduationCap, IndianRupee, Users, ArrowRight,
  CheckCircle2, Star, Package
} from "lucide-react";

/* ================================================================
   KNOWLEDGE BASE — Products, Curriculum, Services
   ================================================================ */
const KB = {
  labPackages: [
    {
      tier: "Starter Lab",
      budget: "₹2L – ₹5L",
      grades: ["1-5", "6-8"],
      students: "20–30",
      focus: "Basic robotics, Block coding, Scratch",
      kits: ["Arduino Starter Kit ×15", "Sensor Module Bundle ×15", "Line-Following Robot ×8"],
      time: "3–4 weeks setup",
      badge: "🟢 Best for New Schools",
    },
    {
      tier: "Standard Lab",
      budget: "₹5L – ₹12L",
      grades: ["6-8", "9-12"],
      students: "30–40",
      focus: "Arduino, IoT, Python, App Inventor",
      kits: ["Arduino Advanced Kit ×20", "RPi 4B Modules ×10", "Multi-Sensor Bundle ×20", "Competition Robot Chassis ×8"],
      time: "4–5 weeks setup",
      badge: "🔵 Most Popular",
    },
    {
      tier: "Premium Innovation Lab",
      budget: "₹12L – ₹25L",
      grades: ["9-12"],
      students: "40–50",
      focus: "AI/ML, IoT, PCB Design, Computer Vision",
      kits: ["Pro Robotics Kit (Arduino+RPi) ×25", "6-DOF Robotic Arm ×5", "AI Camera Module ×10", "3D Printer ×1", "Soldering Station Set ×8"],
      time: "5–6 weeks setup",
      badge: "⭐ CBSE Atal Lab Compliant",
    },
    {
      tier: "Atal Tinkering Lab (ATL)",
      budget: "₹20L (Govt. Grant)",
      grades: ["6-8", "9-12"],
      students: "Up to 50",
      focus: "Full STEM innovation + AI/ML + IoT + 3D Printing",
      kits: ["NITI Aayog ATL Kit Bundle P1–P3", "3D Printer ×2", "Arduino Innovation Kit ×25", "AI & Drone Kit ×10"],
      time: "6–8 weeks full setup + NITI registration",
      badge: "🇮🇳 Govt. Funded",
    },
  ],
  gradeMap: {
    "1": "1-5", "2": "1-5", "3": "1-5", "4": "1-5", "5": "1-5",
    "6": "6-8", "7": "6-8", "8": "6-8",
    "9": "9-12", "10": "9-12", "11": "9-12", "12": "9-12",
  },
  curriculum: {
    "1-5": { title: "Foundation (Grade 1–5)", topics: ["Scratch 3.0 block coding", "Basic electronics & circuits", "Simple robot assembly", "Fun STEM projects"], link: "/curriculum" },
    "6-8": { title: "Intermediate (Grade 6–8)", topics: ["Arduino C++ programming", "Sensor integration", "MIT App Inventor", "IoT fundamentals"], link: "/curriculum" },
    "9-12": { title: "Advanced (Grade 9–12)", topics: ["Python & MicroPython", "AI/ML with TensorFlow Lite", "PCB design basics", "Autonomous robot navigation"], link: "/curriculum" },
  },
  featuredProducts: [
    { name: "Arduino Starter Kit", price: "₹2,500", tag: "Grade 6–8", link: "/products" },
    { name: "Raspberry Pi 4B Module", price: "₹4,200", tag: "Grade 9–12", link: "/products" },
    { name: "Advanced Sensor Bundle", price: "₹3,200", tag: "Grade 6–12", link: "/products" },
    { name: "Line-Following Robot Kit", price: "₹1,800", tag: "Grade 4–8", link: "/products" },
  ],
  atl: {
    grant: "₹20 Lakhs",
    eligibility: "Govt. / Aided schools with Classes 6–12",
    steps: ["Apply on MyGov ATL portal", "School Selection by NITI Aayog", "Grant disbursement in 2 tranches", "RoboLearn sets up the lab (NITI-listed vendor)", "Teacher training + curriculum delivery"],
    duration: "~6 months from application to running lab",
  },
};

/* ================================================================
   NLP ENGINE — Intent Detection
   ================================================================ */
function detectIntent(text) {
  const t = text.toLowerCase();

  // Grade extraction
  const gradeMatch = t.match(/(?:grade|class|std|standard)\s*(\d+)/i) ||
                     t.match(/(\d+)(?:th|st|nd|rd)?\s*(?:grade|class|std)/i);
  const gradeMentioned = gradeMatch ? gradeMatch[1] : null;

  // Student count extraction
  const stuMatch = t.match(/(\d+)\s*(?:students?|kids?|children|bachche|bacche)/i);
  const studentCount = stuMatch ? parseInt(stuMatch[1]) : null;

  // Budget extraction
  const budgetMatch = t.match(/(\d+)\s*(?:lakh|lac|l)/i);
  const budget = budgetMatch ? parseInt(budgetMatch[1]) : null;

  const intents = [];

  if (/atl|atal|tinkering|niti|aayog|grant|government|govt/i.test(t)) intents.push("atl");
  if (/product|kit|sensor|arduino|raspberry|buy|purchase|khareed|price|cost|kitna/i.test(t)) intents.push("products");
  if (/curriculum|syllabus|course|topic|sikha|padhai|lesson|program/i.test(t)) intents.push("curriculum");
  if (/lab\s*setup|setup|lab\s*plan|install|infrastructure|room|space/i.test(t)) intents.push("lab_setup");
  if (/training|teacher|faculty|trainer|teach/i.test(t)) intents.push("training");
  if (/book|consult|appointment|meeting|call|demo|baat|contact/i.test(t)) intents.push("booking");
  if (/tour|virtual|lab tour|dekh|visit/i.test(t)) intents.push("tour");
  if (/hello|hi|helo|namaste|hey|start|help|kya|what|how|konsa/i.test(t) && intents.length === 0) intents.push("greeting");

  // Lab recommendation intent — has grade + students
  if (gradeMentioned || studentCount) intents.push("lab_recommendation");

  return { intents, gradeMentioned, studentCount, budget };
}

/* ================================================================
   RESPONSE BUILDER — Rich structured responses
   ================================================================ */
function buildResponse({ intents, gradeMentioned, studentCount, budget }, conversationState, setConversationState) {
  // ATL Query
  if (intents.includes("atl")) {
    return {
      type: "atl",
      data: KB.atl,
      quickReplies: ["How to apply for ATL?", "ATL lab setup kya include hota hai?", "Book ATL consultation"],
    };
  }

  // Tour
  if (intents.includes("tour")) {
    return {
      type: "tour",
      quickReplies: ["Lab setup pricing", "Products dekho", "Consultation book karo"],
    };
  }

  // Booking
  if (intents.includes("booking")) {
    return {
      type: "booking",
      quickReplies: ["Lab setup inquiry", "ATL application help", "Curriculum demo"],
    };
  }

  // Products
  if (intents.includes("products") && !intents.includes("lab_recommendation")) {
    const gradeFilter = gradeMentioned ? KB.gradeMap[gradeMentioned] : null;
    return {
      type: "products",
      products: KB.featuredProducts,
      gradeFilter,
      quickReplies: ["Grade 6–8 kits", "Arduino products", "Lab setup bundle"],
    };
  }

  // Curriculum
  if (intents.includes("curriculum") && !intents.includes("lab_recommendation")) {
    const gradeKey = gradeMentioned ? KB.gradeMap[gradeMentioned] : null;
    const curr = gradeKey ? KB.curriculum[gradeKey] : null;
    return {
      type: "curriculum",
      curriculum: curr,
      allCurriculum: KB.curriculum,
      quickReplies: ["Grade 6–8 curriculum", "Grade 9–12 topics", "Products dekho"],
    };
  }

  // Training
  if (intents.includes("training")) {
    return {
      type: "training",
      quickReplies: ["Teacher training duration?", "Lab setup pricing", "Book a demo"],
    };
  }

  // Lab Recommendation — main flow
  if (intents.includes("lab_recommendation") || intents.includes("lab_setup")) {
    const gradeKey = gradeMentioned ? KB.gradeMap[gradeMentioned] : null;

    // Determine recommended package
    let pkg = null;
    if (budget && budget >= 20) pkg = KB.labPackages[3];
    else if (budget && budget >= 12) pkg = KB.labPackages[2];
    else if (budget && budget >= 5) pkg = KB.labPackages[1];
    else if (budget) pkg = KB.labPackages[0];
    else if (gradeKey === "9-12") pkg = KB.labPackages[2];
    else if (gradeKey === "6-8") {
      pkg = studentCount && studentCount > 35 ? KB.labPackages[1] : KB.labPackages[0];
    } else if (gradeKey === "1-5") pkg = KB.labPackages[0];
    else pkg = KB.labPackages[1]; // default

    const curr = gradeKey ? KB.curriculum[gradeKey] : null;

    return {
      type: "lab_recommendation",
      package: pkg,
      curriculum: curr,
      gradeKey,
      studentCount,
      gradeMentioned,
      quickReplies: ["ATL grant apply karna hai", "Consultation book karo", "Products list dekho", "Different budget option"],
    };
  }

  // Greeting
  if (intents.includes("greeting") || intents.length === 0) {
    return {
      type: "greeting",
      quickReplies: [
        "Lab setup recommendation chahiye",
        "ATL grant ke baare mein batao",
        "Grade 6–8 ke products dikhao",
        "Curriculum kya hai?",
      ],
    };
  }

  // Fallback
  return {
    type: "fallback",
    quickReplies: ["Lab setup recommendation", "Products dekho", "ATL inquiry", "Consultation book karo"],
  };
}

/* ================================================================
   RICH MESSAGE RENDERERS
   ================================================================ */
function LabRecommendationCard({ pkg, curriculum, gradeMentioned, studentCount }) {
  return (
    <div className="mt-2 space-y-3">
      <p className="text-xs text-slate-600 leading-relaxed">
        {gradeMentioned && studentCount
          ? `Class ${gradeMentioned} ke ${studentCount} students ke liye perfect recommendation:`
          : gradeMentioned
          ? `Class ${gradeMentioned} ke liye recommended lab setup:`
          : "Aapki requirement ke liye best match:"}
      </p>

      {/* Package Card */}
      <div className="bg-gradient-to-br from-[#0b2545] to-[#112d54] rounded-xl p-4 text-white shadow-lg">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-xs text-cyan-300 font-medium">{pkg.badge}</span>
            <h4 className="font-bold text-sm mt-0.5">{pkg.tier}</h4>
          </div>
          <span className="text-cyan-400 font-bold text-sm bg-cyan-400/10 px-2.5 py-1 rounded-lg border border-cyan-400/25">
            {pkg.budget}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="bg-white/5 rounded-lg p-2">
            <p className="text-slate-400 mb-0.5">Students</p>
            <p className="font-semibold text-cyan-300">{pkg.students}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-2">
            <p className="text-slate-400 mb-0.5">Setup Time</p>
            <p className="font-semibold text-cyan-300">{pkg.time}</p>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-slate-400 text-xs mb-1.5">Focus Areas</p>
          <p className="text-xs text-white/80">{pkg.focus}</p>
        </div>

        <div>
          <p className="text-slate-400 text-xs mb-1.5">Recommended Kits</p>
          {pkg.kits.slice(0, 3).map((k, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-white/70 mb-1">
              <CheckCircle2 size={10} className="text-cyan-400 flex-shrink-0"/>
              {k}
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum snippet */}
      {curriculum && (
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <BookOpen size={12} className="text-sky-600"/>
            <p className="text-xs font-bold text-sky-700">{curriculum.title}</p>
          </div>
          {curriculum.topics.slice(0,3).map((t, i) => (
            <p key={i} className="text-xs text-sky-600 mb-0.5">• {t}</p>
          ))}
          <a href={curriculum.link} className="text-xs text-sky-700 font-semibold flex items-center gap-1 mt-2 hover:underline">
            Full Curriculum <ArrowRight size={10}/>
          </a>
        </div>
      )}

      <a href="/contact"
        className="flex items-center justify-center gap-2 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs py-3 rounded-xl transition shadow-md">
        <Calendar size={13}/> Book Free Lab Consultation
      </a>
    </div>
  );
}

function ProductsCard({ products }) {
  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs text-slate-600">Yahan kuch featured products hain:</p>
      {products.map((p, i) => (
        <a key={i} href={p.link}
          className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 hover:border-cyan-300 hover:bg-cyan-50 transition group">
          <div className="flex items-center gap-2">
            <Package size={13} className="text-cyan-600"/>
            <div>
              <p className="text-xs font-semibold text-slate-800">{p.name}</p>
              <span className="text-xs text-slate-400">{p.tag}</span>
            </div>
          </div>
          <span className="text-xs font-bold text-cyan-700 group-hover:text-cyan-800">{p.price}</span>
        </a>
      ))}
      <a href="/products" className="flex items-center justify-center gap-1.5 text-xs font-semibold text-cyan-700 border border-cyan-200 rounded-xl py-2.5 hover:bg-cyan-50 transition">
        <ShoppingBag size={12}/> Full Catalog Dekho
      </a>
    </div>
  );
}

function ATLCard({ data }) {
  return (
    <div className="mt-2 space-y-3">
      <p className="text-xs text-slate-600 leading-relaxed">
        Atal Tinkering Lab (ATL) ek government initiative hai jisme schools ko <strong>{data.grant}</strong> ka grant milta hai STEM innovation lab banane ke liye.
      </p>
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-amber-200 rounded-xl p-3">
        <p className="text-xs font-bold text-amber-800 mb-2">🇮🇳 Eligibility</p>
        <p className="text-xs text-amber-700">{data.eligibility}</p>
      </div>
      <div className="bg-[#0b2545]/5 rounded-xl p-3">
        <p className="text-xs font-bold text-slate-700 mb-2">Application Steps</p>
        {data.steps.map((s, i) => (
          <div key={i} className="flex items-start gap-2 mb-1.5">
            <span className="w-4 h-4 rounded-full bg-cyan-600 text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">{i+1}</span>
            <p className="text-xs text-slate-600">{s}</p>
          </div>
        ))}
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-2">
        <Zap size={14} className="text-amber-500 flex-shrink-0"/>
        <p className="text-xs text-slate-600"><strong>Timeline:</strong> {data.duration}</p>
      </div>
      <a href="/contact" className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-3 rounded-xl transition shadow-md">
        <Phone size={12}/> Get ATL Application Help
      </a>
    </div>
  );
}

function CurriculumCard({ curriculum, allCurriculum }) {
  const items = curriculum ? [curriculum] : Object.values(allCurriculum);
  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs text-slate-600">Hamara grade-wise STEM curriculum:</p>
      {items.map((c, i) => (
        <div key={i} className="bg-sky-50 border border-sky-200 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <GraduationCap size={12} className="text-sky-600"/>
            <p className="text-xs font-bold text-sky-700">{c.title}</p>
          </div>
          {c.topics.map((t, j) => (
            <p key={j} className="text-xs text-sky-600 mb-0.5">• {t}</p>
          ))}
        </div>
      ))}
      <a href="/curriculum" className="flex items-center justify-center gap-1.5 text-xs font-semibold text-sky-700 border border-sky-200 rounded-xl py-2.5 hover:bg-sky-50 transition">
        <BookOpen size={12}/> Full Curriculum Board
      </a>
    </div>
  );
}

function TrainingCard() {
  return (
    <div className="mt-2 space-y-3">
      <p className="text-xs text-slate-600 leading-relaxed">
        Sirf lab setup nahi — hamari team teachers ko bhi train karti hai!
      </p>
      <div className="space-y-2">
        {[
          { icon: GraduationCap, title: "3-Day Teacher Training", desc: "In-school, hands-on workshop" },
          { icon: BookOpen, title: "Monthly Curriculum Updates", desc: "New projects & lesson plans" },
          { icon: Star, title: "Annual Teacher Re-certification", desc: "Keep skills current" },
        ].map((t, i) => (
          <div key={i} className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-200">
            <t.icon size={14} className="text-cyan-600 flex-shrink-0 mt-0.5"/>
            <div>
              <p className="text-xs font-semibold text-slate-800">{t.title}</p>
              <p className="text-xs text-slate-500">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <a href="/training" className="flex items-center justify-center gap-1.5 text-xs font-semibold bg-[#0b2545] text-white rounded-xl py-2.5 hover:bg-cyan-700 transition">
        Training Programs Dekho <ArrowRight size={11}/>
      </a>
    </div>
  );
}

function BookingCard() {
  return (
    <div className="mt-2 space-y-3">
      <p className="text-xs text-slate-600 leading-relaxed">
        Hamari team se baat karein — free 30-minute consultation available hai!
      </p>
      <div className="bg-gradient-to-br from-[#0b2545] to-[#112d54] rounded-xl p-4 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={14} className="text-cyan-400"/>
          <p className="text-sm font-bold">Free Lab Consultation</p>
        </div>
        <ul className="space-y-1.5">
          {["Lab requirements assessment", "Budget & package recommendation", "ATL grant guidance", "Timeline & setup planning"].map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-white/80">
              <CheckCircle2 size={10} className="text-cyan-400 flex-shrink-0"/>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <a href="/contact" className="flex items-center justify-center gap-2 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs py-3 rounded-xl transition shadow-md">
        <Phone size={12}/> Book Free Consultation
      </a>
      <a href="tel:+91XXXXXXXXXX" className="flex items-center justify-center gap-2 w-full text-xs font-semibold text-slate-500 py-1.5 hover:text-slate-700 transition">
        Or call us directly →
      </a>
    </div>
  );
}

function TourCard() {
  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs text-slate-600">Hamari virtual lab tour try karo — bilkul free!</p>
      <a href="/lab-tour"
        className="flex items-center justify-between bg-gradient-to-r from-[#0b2545] to-cyan-700 rounded-xl px-4 py-3 text-white group hover:opacity-95 transition">
        <div>
          <p className="text-sm font-bold">Virtual Lab Tour</p>
          <p className="text-xs text-cyan-300">8 interactive hotspots</p>
        </div>
        <ArrowRight size={16} className="text-cyan-400 group-hover:translate-x-1 transition-transform"/>
      </a>
    </div>
  );
}

function GreetingCard() {
  const items = [
    { icon: Cpu, text: "Lab setup recommendation", color: "text-cyan-600" },
    { icon: IndianRupee, text: "ATL grant information", color: "text-amber-600" },
    { icon: ShoppingBag, text: "Products & kits", color: "text-violet-600" },
    { icon: GraduationCap, text: "Curriculum details", color: "text-sky-600" },
  ];
  return (
    <div className="mt-2 grid grid-cols-2 gap-2">
      {items.map((item, i) => (
        <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex flex-col items-center text-center gap-1.5">
          <item.icon size={16} className={item.color}/>
          <p className="text-xs text-slate-600 font-medium leading-tight">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ================================================================
   MESSAGE RENDERER
   ================================================================ */
function RichMessage({ msg }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[82%] bg-[#0b2545] text-white text-xs leading-relaxed px-4 py-2.5 rounded-2xl rounded-br-md shadow-sm">
          {msg.text}
        </div>
      </div>
    );
  }

  const r = msg.response;

  return (
    <div className="flex justify-start">
      <div className="max-w-[88%]">
        <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
          <p className="text-xs text-slate-700 leading-relaxed">{msg.text}</p>

          {r?.type === "lab_recommendation" && (
            <LabRecommendationCard
              pkg={r.package}
              curriculum={r.curriculum}
              gradeMentioned={r.gradeMentioned}
              studentCount={r.studentCount}
            />
          )}
          {r?.type === "products" && <ProductsCard products={r.products}/>}
          {r?.type === "atl" && <ATLCard data={r.data}/>}
          {r?.type === "curriculum" && <CurriculumCard curriculum={r.curriculum} allCurriculum={r.allCurriculum}/>}
          {r?.type === "training" && <TrainingCard/>}
          {r?.type === "booking" && <BookingCard/>}
          {r?.type === "tour" && <TourCard/>}
          {r?.type === "greeting" && <GreetingCard/>}
        </div>

        {/* Quick Reply chips */}
        {r?.quickReplies && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {r.quickReplies.map((qr, i) => (
              <button key={i} data-quickreply={qr}
                className="text-xs bg-slate-100 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-slate-600 hover:text-cyan-700 px-2.5 py-1 rounded-full transition-all font-medium">
                {qr}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================
   INITIAL MESSAGES
   ================================================================ */
function buildBotTextForResponse(response) {
  switch (response?.type) {
    case "lab_recommendation":
      return response.gradeMentioned
        ? `Perfect! Class ${response.gradeMentioned}${response.studentCount ? ` ke ${response.studentCount} students` : ""} ke liye maine ek structured lab recommendation ready ki hai:`
        : "Aapki requirements ke basis par yeh lab setup recommend karunga:";
    case "products": return "Yahan RoboLearn ke popular STEM products hain — sab kuch ready to ship:";
    case "atl": return "ATL (Atal Tinkering Lab) ke baare mein detail mein batata hoon:";
    case "curriculum": return "Hamara grade-wise STEM curriculum designed hai CBSE/ICSE schools ke liye:";
    case "training": return "Teacher training program ke baare mein batata hoon:";
    case "booking": return "Bilkul! Hamare experts se baat karo — consultation bilkul free hai:";
    case "tour": return "Virtual Lab Tour ek amazing experience hai! Yahan dekh sakte ho:";
    case "greeting": return "Namaste! Main RoboBot hoon — RoboLearn ka AI Lab Consultant. Kaise help kar sakta hoon aapki?";
    default:
      return "Mujhe aapki query fully samajh nahi aayi. Kya aap aur detail de sakte hain? Ya neeche options choose kar sakte hain:";
  }
}

const WELCOME = {
  role: "bot",
  text: "Namaste! Main RoboBot hoon — RoboLearn ka AI Lab Consultant 🤖\n\nAap koi bhi sawaal poochh sakte hain — lab setup, ATL grant, products, ya curriculum ke baare mein. Main structured recommendation doonga!",
  response: {
    type: "greeting",
    quickReplies: [
      "Class 6–8 ke 30 students ka lab chahiye",
      "ATL grant kya hota hai?",
      "Arduino kits dikhao",
      "Grade 9–12 curriculum kya hai?",
    ],
  },
};

/* ================================================================
   MAIN WIDGET
   ================================================================ */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationState, setConversationState] = useState({});
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  // Delegate quick-reply clicks via event delegation on scroll container
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleClick = (e) => {
      const btn = e.target.closest("[data-quickreply]");
      if (btn) { handleSend(btn.dataset.quickreply); }
    };
    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, [messages, loading]);

  const handleSend = useCallback(async (textOverride) => {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;
    setInput("");

    const userMsg = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    await new Promise(r => setTimeout(r, 600 + Math.random() * 500));

    const parsed = detectIntent(text);
    const response = buildResponse(parsed, conversationState, setConversationState);
    const botText = buildBotTextForResponse(response);

    setMessages(prev => [...prev, { role: "bot", text: botText, response }]);
    setLoading(false);
  }, [input, loading, conversationState]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleReset = () => {
    setMessages([WELCOME]);
    setConversationState({});
    setInput("");
  };

  const unread = !isOpen && messages.length > 1;

  return (
    <>
      <style>{`
        @keyframes chatPop { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes fabPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(34,211,238,0.5); } 70% { box-shadow: 0 0 0 12px rgba(34,211,238,0); } }
        @keyframes bubbleIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dotBounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-5px); } }
        @keyframes badgePop { from { transform: scale(0); } to { transform: scale(1); } }
        .chat-panel { animation: chatPop .28s cubic-bezier(0.16,1,0.3,1) both; }
        .chat-fab { animation: fabPulse 2.8s infinite; }
        .chat-bubble { animation: bubbleIn .22s ease both; }
        .dot-anim { animation: dotBounce 1.4s infinite ease-in-out; }
        .dot-anim:nth-child(2) { animation-delay: .18s; }
        .dot-anim:nth-child(3) { animation-delay: .36s; }
        .badge-pop { animation: badgePop 0.3s cubic-bezier(0.175,0.885,0.32,1.275) both; }
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(11,37,69,0.12); border-radius: 999px; }
        @media (prefers-reduced-motion: reduce) {
          .chat-panel,.chat-fab,.chat-bubble,.dot-anim,.badge-pop { animation: none !important; }
        }
      `}</style>

      {/* ---- FAB ---- */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Robotics Consultant"
          className="chat-fab fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#0b2545] hover:bg-cyan-600 text-white flex items-center justify-center shadow-2xl transition-colors duration-300"
        >
          <Bot size={24}/>
          {unread && (
            <span className="badge-pop absolute -top-1 -right-1 w-5 h-5 bg-cyan-400 text-[#0b2545] rounded-full text-xs font-black flex items-center justify-center">
              {messages.filter(m => m.role === "bot").length - 1}
            </span>
          )}
        </button>
      )}

      {/* ---- CHAT PANEL ---- */}
      {isOpen && (
        <div className="chat-panel fixed bottom-6 right-6 z-50 w-[96vw] max-w-[420px] flex flex-col rounded-2xl shadow-2xl border border-slate-200 overflow-hidden bg-white"
          style={{ height: "min(620px, calc(100dvh - 100px))" }}>

          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#061225] via-[#0b2545] to-[#0d2e5a] px-4 py-3.5 flex items-center justify-between flex-shrink-0">
            {/* Glow blobs */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"/>
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-violet-500/10 blur-3xl pointer-events-none"/>

            <div className="relative flex items-center gap-3">
              {/* Avatar */}
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0">
                <Bot size={20} className="text-cyan-300"/>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0b2545]"/>
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">RoboBot</p>
                <p className="text-cyan-300/80 text-[10px] flex items-center gap-1">
                  <Sparkles size={9}/> AI Lab Consultant
                </p>
              </div>
            </div>

            <div className="relative flex items-center gap-2">
              <a href="/contact"
                className="flex items-center gap-1.5 text-xs font-semibold bg-cyan-400/15 hover:bg-cyan-400/25 border border-cyan-400/30 text-cyan-300 px-2.5 py-1.5 rounded-lg transition"
                onClick={() => setIsOpen(false)}>
                <Calendar size={11}/> Book Call
              </a>
              <button onClick={handleReset} title="Reset chat"
                className="text-white/50 hover:text-white/80 transition p-1.5 rounded-lg hover:bg-white/10">
                <RotateCcw size={14}/>
              </button>
              <button onClick={() => setIsOpen(false)} aria-label="Close"
                className="text-white/60 hover:text-white transition p-1.5 rounded-lg hover:bg-white/10">
                <X size={16}/>
              </button>
            </div>
          </div>

          {/* Context banner */}
          <div className="flex-shrink-0 bg-cyan-50 border-b border-cyan-100 px-4 py-2 flex items-center gap-2">
            <Zap size={11} className="text-cyan-600 flex-shrink-0"/>
            <p className="text-[10px] text-cyan-700 font-medium">
              Ask: grades, student count, budget → get full lab recommendation instantly
            </p>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="chat-scroll flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className="chat-bubble">
                <RichMessage msg={m}/>
              </div>
            ))}

            {loading && (
              <div className="chat-bubble flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <span className="dot-anim w-1.5 h-1.5 rounded-full bg-cyan-500 inline-block"/>
                      <span className="dot-anim w-1.5 h-1.5 rounded-full bg-cyan-500 inline-block"/>
                      <span className="dot-anim w-1.5 h-1.5 rounded-full bg-cyan-500 inline-block"/>
                    </div>
                    <span className="text-xs text-slate-400 italic">RoboBot is analyzing…</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex-shrink-0 border-t border-slate-200 p-3 bg-white">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. Class 8 ke 40 students ke liye lab chahiye…"
                rows={1}
                className="flex-1 resize-none max-h-20 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors leading-relaxed"
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="w-10 h-10 flex-shrink-0 rounded-xl bg-[#0b2545] hover:bg-cyan-600 disabled:opacity-40 text-white flex items-center justify-center transition-colors shadow-md"
              >
                {loading ? <Loader2 size={15} className="animate-spin"/> : <Send size={15}/>}
              </button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-[10px] text-slate-400">
                <span className="text-emerald-500 font-semibold">●</span> AI Consultant · Powered by RoboLearn KB
              </p>
              <a href="/lab-tour" onClick={() => setIsOpen(false)}
                className="text-[10px] text-cyan-600 hover:underline font-medium">
                Virtual Lab Tour →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}