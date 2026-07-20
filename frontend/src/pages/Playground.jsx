import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw, Check, Terminal, Code2, AlertTriangle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

const LANGUAGE_VERSIONS = {
  python: "3.10.0",
  javascript: "18.15.0",
  java: "15.0.2",
  "c++": "10.2.0"
};

const DEFAULT_CODE = {
  python: "print('Hello, RoboLearn AI!')\n\n# Try writing a loop or importing math\nfor i in range(3):\n    print(f'Count: {i}')",
  javascript: "console.log('Hello, RoboLearn AI!');\n\n// Try some ES6 features\nconst nums = [1, 2, 3];\nconsole.log(nums.map(n => n * 2));",
  java: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, RoboLearn AI!\");\n    }\n}",
  "c++": "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, RoboLearn AI!\" << std::endl;\n    return 0;\n}"
};

export default function Playground() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(DEFAULT_CODE["python"]);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(DEFAULT_CODE[lang]);
    setOutput("");
    setError(false);
  };

  const handleRunCode = async () => {
    if (!code.trim() || isRunning) return;
    
    setIsRunning(true);
    setOutput("Executing code securely in the cloud...");
    setError(false);

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: language === "c++" ? "cpp" : language,
          version: LANGUAGE_VERSIONS[language],
          files: [{ content: code }]
        })
      });

      const data = await response.json();
      
      if (data.compile?.stderr || data.run?.stderr) {
        setError(true);
        setOutput((data.compile?.stderr || "") + "\n" + (data.run?.stderr || ""));
      } else {
        setOutput(data.run?.stdout || "Program exited with no output.");
      }
    } catch (err) {
      setError(true);
      setOutput("Network Error: Could not connect to the execution engine.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white pt-20">
      <SEO title="Interactive Code Playground" description="Write and execute Python, C++, Java, and JavaScript right in your browser." path="/playground" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center gap-3">
            <Code2 size={28} className="text-cyan-400" />
            Live Code Playground
          </h1>
          <p className="text-slate-400 text-sm mt-1">Write, compile, and run code entirely in your browser.</p>
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={language} 
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-white/5 border border-white/10 text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-cyan-500 transition-colors"
          >
            <option value="python">Python 3</option>
            <option value="javascript">JavaScript (Node)</option>
            <option value="java">Java 15</option>
            <option value="c++">C++</option>
          </select>
          
          <button 
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-6 py-2.5 rounded-lg disabled:opacity-50 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            {isRunning ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
            Run Code
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
        {/* Code Editor */}
        <div className="flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d1117]">
          <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2 text-slate-300 text-sm font-semibold">
              <Code2 size={16} className="text-cyan-500" /> main.{language === "python" ? "py" : language === "javascript" ? "js" : language === "java" ? "java" : "cpp"}
            </div>
            <button 
              onClick={() => setCode(DEFAULT_CODE[language])}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              language={language === "c++" ? "cpp" : language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                padding: { top: 16 }
              }}
            />
          </div>
        </div>

        {/* Terminal Output */}
        <div className="flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
          <div className="bg-[#161b22] px-4 py-3 flex items-center gap-2 border-b border-white/5 text-slate-300 text-sm font-semibold">
            <Terminal size={16} className="text-emerald-500" /> Standard Output
          </div>
          <div className="flex-1 p-5 overflow-y-auto font-mono text-sm relative">
            {!output && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
                <Terminal size={48} className="mb-4 opacity-20" />
                <p>Click "Run Code" to see the output here.</p>
              </div>
            )}
            {output && (
              <motion.pre 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className={`whitespace-pre-wrap leading-relaxed ${error ? 'text-red-400' : 'text-slate-300'}`}
              >
                {output}
              </motion.pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
