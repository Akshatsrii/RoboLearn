import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, AlertTriangle, Award, GraduationCap, Calendar, ShieldCheck, ArrowLeft, Search } from "lucide-react";
import SEO from "../components/SEO";

/* MOCK CERTIFICATES DATA STORE */
const MOCK_CERTIFICATES = {
  "CERT-RL-2024-0012": { student: "Aarav Gupta", grade: "Class 7", program: "Arduino Explorer", date: "15 May 2026", school: "Delhi Public School, Rohini", status: "Verified" },
  "CERT-RL-2024-0015": { student: "Diya Malhotra", grade: "Class 8", program: "IoT Foundations", date: "22 May 2026", school: "Delhi Public School, Rohini", status: "Verified" },
  "CERT-RL-2024-0018": { student: "Kabir Mehta", grade: "Class 6", program: "Scratch Master", date: "04 Jun 2026", school: "Delhi Public School, Rohini", status: "Verified" },
};

export default function VerifyCertificate() {
  const [searchParams] = useSearchParams();
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      setCertId(idParam);
      handleVerify(idParam);
    }
  }, [searchParams]);

  const handleVerify = (idToLookup) => {
    const cleanId = (idToLookup || certId).trim().toUpperCase();
    setSearched(true);
    if (MOCK_CERTIFICATES[cleanId]) {
      setResult({ id: cleanId, ...MOCK_CERTIFICATES[cleanId] });
    } else {
      setResult(null);
    }
  };

  return (
    <>
      <SEO
        title="Verify Certificate | RoboLearn"
        description="Verify the authenticity of RoboLearn student and teacher certificates by entering the unique Certificate ID."
      />
      <div className="min-h-screen bg-gradient-to-br from-[#040d1a] via-[#071428] to-[#040d1a] text-white flex flex-col items-center justify-center px-6 pt-20 pb-16">
        <div className="w-full max-w-xl space-y-6">

          {/* Back */}
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition text-xs font-semibold">
            <ArrowLeft size={14} /> Back to Home
          </Link>

          {/* Main Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <Award size={36} className="text-amber-400 mx-auto" />
              <h1 className="text-2xl font-extrabold text-white">Digital Certificate Verification</h1>
              <p className="text-xs text-slate-400">Enter a unique certificate ID to verify credential authenticity.</p>
            </div>

            {/* Input field */}
            <div className="flex gap-2">
              <input
                value={certId}
                onChange={e => setCertId(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleVerify()}
                className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500"
                placeholder="e.g. CERT-RL-2024-0012"
              />
              <button
                onClick={() => handleVerify()}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs px-4 py-3 rounded-xl flex items-center gap-1.5 transition shadow-lg"
              >
                <Search size={14} /> Verify
              </button>
            </div>

            {/* Verification Result Area */}
            {searched && (
              <div className="border-t border-white/10 pt-6">
                {result ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 space-y-4 animate-fade-up">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 size={18} />
                      <span className="text-xs font-bold uppercase tracking-wider">Credential Authenticated</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Student / Recipient</span>
                        <p className="text-sm font-extrabold text-white mt-0.5">{result.student}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Program Completed</span>
                          <p className="text-xs font-bold text-slate-200 mt-0.5">{result.program}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Grade Level</span>
                          <p className="text-xs font-bold text-slate-200 mt-0.5">{result.grade}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">School Partner</span>
                        <p className="text-xs font-semibold text-slate-300 mt-0.5">{result.school}</p>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-white/5 text-[10px] text-slate-400 font-mono">
                        <span>ID: {result.id}</span>
                        <span>Date Issued: {result.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 bg-black/30 border border-white/5 p-2 rounded-lg justify-center text-[10px] text-emerald-300">
                      <ShieldCheck size={12} /> SECURE VERIFIED RECORD
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 flex items-start gap-3 text-red-400">
                    <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold">Invalid Certificate ID</h4>
                      <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                        We could not find any active certificate record matching "{certId.toUpperCase()}". Please verify the spelling and formatting.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
