import React, { useState } from "react";
import { Sparkles, ArrowRight, Loader2, RefreshCcw, GraduationCap, Cpu, Code } from "lucide-react";
import { aiService } from "../../ai/services/aiService";
import { motion } from "framer-motion";

export default function AIDemoSection() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (textOverride) => {
    const textToAsk = textOverride || query;
    if (!textToAsk.trim() || loading) return;

    setLoading(true);
    setResponse(null);
    if (!textOverride) setQuery(textToAsk);

    try {
      // Direct call to aiService to get unstructured text
      const prompt = `You are RoboLearn AI. Answer the following query in strictly 2-3 concise lines. Be encouraging, smart, and direct.\n\nQuery: ${textToAsk}`;
      const res = await aiService.generateText(prompt, { model: "gemini-2.0-flash" });
      setResponse(res.data);
    } catch (err) {
      setResponse("Oops! I couldn't process that right now. Ensure your API keys are configured correctly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-[#0a192f] relative overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded-full mb-4">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">Live AI Demo</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Meet your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">AI Tutor</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Experience our intelligent learning engine before you even log in. Ask a concept, and get a crisp, accurate explanation instantly.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl max-w-3xl mx-auto"
        >
          {/* Input Area */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input 
              type="text" 
              placeholder="Ask RoboLearn anything (e.g. 'Explain Recursion')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAsk()}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all"
            />
            <button 
              onClick={() => handleAsk()}
              disabled={loading || !query.trim()}
              className="bg-cyan-500 hover:bg-cyan-400 text-[#0a192f] font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <ArrowRight size={18} />}
              Ask AI
            </button>
          </div>

          {/* Suggested Queries if empty */}
          {!response && !loading && (
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {[
                { icon: Cpu, text: "How does a CPU work?" },
                { icon: Code, text: "Explain Recursion" },
                { icon: GraduationCap, text: "What is Arduino?" }
              ].map((item, i) => (
                <button 
                  key={i}
                  onClick={() => {
                    setQuery(item.text);
                    handleAsk(item.text);
                  }}
                  className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 border border-white/5 hover:border-cyan-400/30 hover:text-cyan-300 px-3 py-1.5 rounded-full transition-all"
                >
                  <item.icon size={12} />
                  {item.text}
                </button>
              ))}
            </div>
          )}

          {/* AI Response Area */}
          {loading && (
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5 animate-pulse flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center shrink-0">
                 <Sparkles size={18} className="text-cyan-400" />
               </div>
               <div className="space-y-2 w-full">
                 <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                 <div className="h-2 w-1/2 bg-white/10 rounded-full" />
               </div>
            </div>
          )}

          {response && !loading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 mt-4 relative"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center shrink-0 border border-cyan-400/30">
                  <Sparkles size={18} className="text-cyan-400" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-200 leading-relaxed font-medium">
                    {response}
                  </p>
                  
                  {/* Smart Actions */}
                  <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/10">
                    <button onClick={() => handleAsk(`Explain "${query}" in simpler terms for a 10 year old.`)} className="text-xs font-semibold bg-white/5 hover:bg-white/10 text-cyan-300 px-3 py-1.5 rounded-lg border border-white/10 transition-colors">
                      Explain Easier
                    </button>
                    <button onClick={() => handleAsk(`Give me a real world example for "${query}".`)} className="text-xs font-semibold bg-white/5 hover:bg-white/10 text-violet-300 px-3 py-1.5 rounded-lg border border-white/10 transition-colors">
                      Give Example
                    </button>
                    <button onClick={() => handleAsk(`Ask me a multiple choice question to test my understanding of "${query}".`)} className="text-xs font-semibold bg-white/5 hover:bg-white/10 text-emerald-300 px-3 py-1.5 rounded-lg border border-white/10 transition-colors">
                      Quiz Me
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
}
