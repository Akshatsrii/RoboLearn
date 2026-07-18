import { AIErrorCode } from "../types";

export interface LogEntry {
  id: string;
  timestamp: string;
  prompt: string;
  response?: string;
  error?: {
    message: string;
    code: AIErrorCode;
  };
  durationMs: number;
  cached: boolean;
  attempts: number;
}

class AILogger {
  private history: LogEntry[] = [];
  private maxHistorySize = 50;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const data = localStorage.getItem("robolearn_ai_history");
      if (data) {
        this.history = JSON.parse(data);
      }
    } catch (e) {
      console.warn("Failed to load AI history from localStorage", e);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem("robolearn_ai_history", JSON.stringify(this.history));
    } catch (e) {
      console.warn("Failed to save AI history to localStorage", e);
    }
  }

  logSuccess(prompt: string, response: string, durationMs: number, cached: boolean, attempts: number) {
    const entry: LogEntry = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      prompt,
      response,
      durationMs,
      cached,
      attempts
    };
    this.history.unshift(entry);
    if (this.history.length > this.maxHistorySize) {
      this.history.pop();
    }
    this.saveToStorage();
    console.log(`[AI SUCCESS] [${durationMs}ms] cached=${cached} prompt="${prompt.substring(0, 60)}..."`);
  }

  logFailure(prompt: string, errorMessage: string, errorCode: AIErrorCode, durationMs: number, attempts: number) {
    const entry: LogEntry = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      prompt,
      error: {
        message: errorMessage,
        code: errorCode
      },
      durationMs,
      cached: false,
      attempts
    };
    this.history.unshift(entry);
    if (this.history.length > this.maxHistorySize) {
      this.history.pop();
    }
    this.saveToStorage();
    console.error(`[AI FAILURE] [${errorCode}] [${durationMs}ms] error="${errorMessage}" prompt="${prompt.substring(0, 60)}..."`);
  }

  getHistory(): LogEntry[] {
    return this.history;
  }

  clearHistory() {
    this.history = [];
    localStorage.removeItem("robolearn_ai_history");
  }
}

export const aiLogger = new AILogger();
