import { aiService } from "../ai/services/aiService";
import { AssistantResponseSchema } from "../ai/schemas/assistantSchema";
import { CHAT_ASSISTANT_SYSTEM_PROMPT, compileChatPrompt } from "../ai/prompts/templates";

export async function sendChatMessage(history) {
  try {
    const mappedHistory = history.map((msg) => ({
      role: msg.role === "bot" ? "model" : "user",
      text: msg.text,
    }));

    const currentMsg = mappedHistory[mappedHistory.length - 1]?.text || "";
    const precedingHistory = mappedHistory.slice(0, -1);

    const compiledPrompt = compileChatPrompt(precedingHistory, currentMsg);

    const response = await aiService.generateJSON(
      compiledPrompt,
      AssistantResponseSchema,
      {
        systemInstruction: CHAT_ASSISTANT_SYSTEM_PROMPT,
        temperature: 0.7,
        useCache: true,
      }
    );

    return response.data.text;
  } catch (err) {
    console.error("Gemini Error:", err);
    return "Sorry, I couldn't generate a response.";
  }
}