import { useState, useCallback } from "react";
import { ChatMessage, AIError } from "../types";
import { aiService } from "../services/aiService";
import { AssistantResponse, AssistantResponseSchema } from "../schemas/assistantSchema";
import { CHAT_ASSISTANT_SYSTEM_PROMPT, compileChatPrompt } from "../prompts/templates";

export interface ChatMessageExtended {
  role: "user" | "model" | "system";
  text: string;
  response?: AssistantResponse;
}

export function useAIChat(initialMessages: ChatMessageExtended[] = []) {
  const [messages, setMessages] = useState<ChatMessageExtended[]>(initialMessages);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AIError | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;

      const userMsg: ChatMessageExtended = { role: "user", text };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);
      setError(null);

      const history: ChatMessage[] = messages.map((m) => ({
        role: m.role === "model" ? "model" : "user",
        text: m.text,
      }));

      const compiledPrompt = compileChatPrompt(history, text);

      try {
        const response = await aiService.generateJSON<AssistantResponse>(
          compiledPrompt,
          AssistantResponseSchema,
          {
            systemInstruction: CHAT_ASSISTANT_SYSTEM_PROMPT,
            temperature: 0.7,
            useCache: true,
          }
        );

        const botMsg: ChatMessageExtended = {
          role: "model",
          text: response.data.text,
          response: response.data,
        };

        setMessages((prev) => [...prev, botMsg]);
        return response.data;
      } catch (err: any) {
        let aiErr: AIError;
        if (err instanceof AIError) {
          aiErr = err;
        } else {
          aiErr = new AIError(err.message || "Failed to generate AI chat response", "UNKNOWN_ERROR", err);
        }
        setError(aiErr);
        
        const errorBotMsg: ChatMessageExtended = {
          role: "model",
          text: "I'm sorry, I encountered an issue connecting to the AI service. Please try again in a moment.",
          response: {
            type: "fallback",
            text: "Error encountered.",
            quickReplies: ["Reset chat", "Contact support"]
          }
        };
        setMessages((prev) => [...prev, errorBotMsg]);

        throw aiErr;
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const resetChat = useCallback((welcomeMessage: ChatMessageExtended) => {
    setMessages([welcomeMessage]);
    setLoading(false);
    setError(null);
  }, []);

  return { messages, setMessages, loading, error, sendMessage, resetChat };
}
