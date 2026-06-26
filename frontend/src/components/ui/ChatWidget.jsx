import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Sparkles, Loader2 } from "lucide-react";
import { sendChatMessage } from "../../services/chatService";

const WELCOME_MESSAGE = {
  role: "bot",
  text: "Hi! I'm RoboLearn's assistant. Ask me about our robotics lab setup, training programs, curriculum, pricing — or anything else you're curious about.",
};

const suggestedPrompts = [
  "What does lab setup include?",
  "Do you provide teacher training?",
  "Which kits suit Grade 6–8?",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textOverride) => {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      // Sends full history (minus the welcome message) so Gemini has context.
      const history = nextMessages.slice(1).map((m) => ({ role: m.role, text: m.text }));
      const reply = await sendChatMessage(history);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, I couldn't reach the server just now. Please try again, or contact us directly." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <style>{`
        @keyframes chatPop { from { opacity: 0; transform: translateY(14px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes chatPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(34,211,238,0.4); } 70% { box-shadow: 0 0 0 10px rgba(34,211,238,0); } }
        @keyframes bubbleIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dotBounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-4px); } }
        .chat-panel { animation: chatPop .25s ease both; }
        .chat-fab { animation: chatPulse 2.5s infinite; }
        .chat-bubble { animation: bubbleIn .25s ease both; }
        .dot { animation: dotBounce 1.2s infinite ease-in-out; }
        .dot:nth-child(2) { animation-delay: .15s; }
        .dot:nth-child(3) { animation-delay: .3s; }
        @media (prefers-reduced-motion: reduce) {
          .chat-panel, .chat-fab, .chat-bubble, .dot { animation: none !important; }
        }
        .chat-scroll::-webkit-scrollbar { width: 6px; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(11,37,69,0.15); border-radius: 999px; }
      `}</style>

      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open chat assistant"
          className="chat-fab fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#0b2545] hover:bg-cyan-600 text-white flex items-center justify-center shadow-xl transition-colors duration-300"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="chat-panel fixed bottom-6 right-6 z-50 w-[92vw] max-w-sm h-[34rem] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">

          {/* Header */}
          <div className="relative bg-[#061B33] px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-cyan-500/20 blur-2xl pointer-events-none" />
            <div className="relative flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center">
                <Bot size={18} className="text-cyan-300" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">RoboLearn Assistant</p>
                <p className="text-cyan-300/80 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="relative text-white/70 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="chat-scroll flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] text-sm leading-relaxed px-4 py-2.5 rounded-2xl ${
                    m.role === "user"
                      ? "bg-[#0b2545] text-white rounded-br-md"
                      : "bg-white text-slate-700 border border-slate-200 rounded-bl-md"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-bubble flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                  <span className="dot w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span className="dot w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span className="dot w-1.5 h-1.5 rounded-full bg-cyan-500" />
                </div>
              </div>
            )}

            {/* Suggested prompts — only before the conversation starts */}
            {messages.length === 1 && !loading && (
              <div className="flex flex-col gap-2 pt-2">
                {suggestedPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSend(p)}
                    className="flex items-center gap-2 text-left text-xs font-medium text-cyan-700 bg-cyan-50 border border-cyan-100 rounded-xl px-3 py-2 hover:border-cyan-300 transition-colors"
                  >
                    <Sparkles size={13} className="flex-shrink-0" />
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex-shrink-0 border-t border-slate-200 p-3 bg-white">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                rows={1}
                className="flex-1 resize-none max-h-24 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="w-10 h-10 flex-shrink-0 rounded-xl bg-[#0b2545] hover:bg-cyan-600 disabled:opacity-40 text-white flex items-center justify-center transition-colors"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 text-center">Powered by Gemini · Replies may be inaccurate</p>
          </div>
        </div>
      )}
    </>
  );
}