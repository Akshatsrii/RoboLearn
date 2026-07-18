import { GoogleGenAI } from "@google/genai";
import { AIConfig, AIServiceResponse, AIError } from "../types";
import { withRetry } from "../utils/retry";
import { responseCache } from "../utils/cache";
import { aiLogger } from "../utils/logger";
import { parseJSONResponse } from "../parser/jsonParser";

class AIService {
  private aiClient: GoogleGenAI | null = null;
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (this.apiKey) {
      this.aiClient = new GoogleGenAI({ apiKey: this.apiKey });
    } else {
      console.warn("VITE_GEMINI_API_KEY is not defined in the environment. AIService will fail to run direct API queries.");
    }
  }

  /**
   * Generates unstructured text response
   */
  async generateText(prompt: string, config?: AIConfig): Promise<AIServiceResponse<string>> {
    return this.executeRequest(prompt, (text) => text, config);
  }

  /**
   * Generates structured JSON response verified against a validator schema
   */
  async generateJSON<T>(
    prompt: string,
    validatorSchema: { parse: (val: any) => T },
    config?: AIConfig
  ): Promise<AIServiceResponse<T>> {
    const jsonConfig: AIConfig = {
      ...config,
      responseMimeType: "application/json",
    };

    return this.executeRequest(
      prompt,
      (text) => {
        const parsed = parseJSONResponse<any>(text);
        try {
          return validatorSchema.parse(parsed);
        } catch (validationErr: any) {
          throw new AIError(
            `Structured output failed schema validation: ${validationErr.message}`,
            "SCHEMA_VALIDATION_ERROR",
            validationErr
          );
        }
      },
      jsonConfig
    );
  }

  /**
   * Core request execution handler with caching, retries, error mapping, and logging
   */
  private async executeRequest<T>(
    prompt: string,
    transform: (text: string) => T,
    config?: AIConfig
  ): Promise<AIServiceResponse<T>> {
    const modelName = config?.model || "gemini-2.5-flash";
    const useCache = config?.useCache !== false;
    const ttlMs = config?.ttlMs;
    const startTime = Date.now();

    // 1. Caching Lookup
    const cacheKey = responseCache.generateKey(prompt, config);
    if (useCache) {
      const cachedEntry = responseCache.get<T>(cacheKey);
      if (cachedEntry) {
        const duration = Date.now() - startTime;
        aiLogger.logSuccess(prompt, cachedEntry.rawText, duration, true, 1);
        return {
          data: cachedEntry.data,
          rawText: cachedEntry.rawText,
          cached: true,
          attempts: 1,
        };
      }
    }

    // 2. Client verification
    if (!this.aiClient) {
      const errorMsg = "Gemini API client not initialized. VITE_GEMINI_API_KEY is missing.";
      aiLogger.logFailure(prompt, errorMsg, "API_ERROR", 0, 0);
      throw new AIError(errorMsg, "API_ERROR");
    }

    // 3. Execution with Retry
    const maxRetries = config?.maxRetries ?? 3;
    let attemptsCount = 1;

    try {
      const { result, attempts } = await withRetry(
        async () => {
          const response = await this.aiClient!.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              temperature: config?.temperature ?? 0.7,
              maxOutputTokens: config?.maxOutputTokens,
              topP: config?.topP,
              topK: config?.topK,
              responseMimeType: config?.responseMimeType,
              systemInstruction: config?.systemInstruction,
            },
          });

          if (!response.text) {
            throw new Error("Received empty response from Gemini model");
          }

          return response;
        },
        {
          maxRetries,
          initialDelayMs: 1000,
          multiplier: 2,
          onRetry: (err, attempt, delay) => {
            console.warn(`AI request failed (attempt ${attempt}/${maxRetries}). Retrying in ${Math.round(delay)}ms. Error: ${err.message}`);
          },
        }
      );

      attemptsCount = attempts;
      const rawText = result.text!;
      
      // 4. Transforming & Validating response
      const data = transform(rawText);
      const duration = Date.now() - startTime;

      // 5. Caching & Logging success
      if (useCache) {
        responseCache.set(cacheKey, data, rawText, ttlMs);
      }
      aiLogger.logSuccess(prompt, rawText, duration, false, attemptsCount);

      return {
        data,
        rawText,
        cached: false,
        attempts: attemptsCount,
      };

    } catch (err: any) {
      const duration = Date.now() - startTime;
      let mappedError: AIError;

      if (err instanceof AIError) {
        mappedError = err;
      } else {
        let code: any = "API_ERROR";
        if (err.message?.includes("fetch") || err.name === "TypeError") {
          code = "NETWORK_ERROR";
        } else if (err.status === 429 || err.message?.includes("429")) {
          code = "RATE_LIMIT_ERROR";
        }
        mappedError = new AIError(err.message || "Unknown error during AI generation", code, err);
      }

      aiLogger.logFailure(prompt, mappedError.message, mappedError.code, duration, attemptsCount);
      throw mappedError;
    }
  }
}

export const aiService = new AIService();
