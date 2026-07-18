export type ChatRole = "user" | "model" | "system";

export interface ChatMessage {
  role: ChatRole;
  text: string;
}

export interface AIConfig {
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
  topP?: number;
  topK?: number;
  responseMimeType?: string;
  responseSchema?: Record<string, any>;
  systemInstruction?: string;
  useCache?: boolean;
  ttlMs?: number; // cache TTL
  maxRetries?: number;
}

export interface AIServiceResponse<T> {
  data: T;
  rawText: string;
  cached: boolean;
  attempts: number;
}

export type AIErrorCode =
  | "NETWORK_ERROR"
  | "API_ERROR"
  | "SCHEMA_VALIDATION_ERROR"
  | "PARSING_ERROR"
  | "RATE_LIMIT_ERROR"
  | "UNKNOWN_ERROR";

export class AIError extends Error {
  code: AIErrorCode;
  originalError?: any;

  constructor(message: string, code: AIErrorCode, originalError?: any) {
    super(message);
    this.name = "AIError";
    this.code = code;
    this.originalError = originalError;
  }
}
