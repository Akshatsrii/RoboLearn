import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

/**
 * Sends the conversation history to our backend, which forwards it to Gemini.
 * history: [{ role: "user" | "bot", text: string }, ...]
 * Returns: string (the bot's reply)
 */
export async function sendChatMessage(history) {
  const { data } = await axios.post(`${API_BASE}/chat`, { history });
  return data.reply;
}