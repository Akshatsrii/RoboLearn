import { AIError } from "../types";

export function parseJSONResponse<T>(text: string): T {
  let cleaned = text.trim();

  // Strip markdown formatting if present
  if (cleaned.startsWith("```")) {
    const match = cleaned.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
    if (match) {
      cleaned = match[1].trim();
    }
  }

  // Find the JSON block if there's surrounding text
  const startIdx = cleaned.indexOf("{");
  const arrayStartIdx = cleaned.indexOf("[");

  let actualJSON = cleaned;
  if (startIdx !== -1 || arrayStartIdx !== -1) {
    let start = startIdx;
    let end = cleaned.lastIndexOf("}");

    if (arrayStartIdx !== -1 && (startIdx === -1 || arrayStartIdx < startIdx)) {
      start = arrayStartIdx;
      end = cleaned.lastIndexOf("]");
    }

    if (start !== -1 && end !== -1 && end > start) {
      actualJSON = cleaned.slice(start, end + 1);
    }
  }

  try {
    return JSON.parse(actualJSON) as T;
  } catch (error: any) {
    throw new AIError(
      `Failed to parse JSON response: ${error.message}. Raw text snippet: ${text.substring(0, 100)}`,
      "PARSING_ERROR",
      error
    );
  }
}
