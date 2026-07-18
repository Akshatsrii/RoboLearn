import { useState, useCallback } from "react";
import { AIError } from "../types";

export interface UseAIResult<T, Args extends any[]> {
  data: T | null;
  loading: boolean;
  error: AIError | null;
  execute: (...args: Args) => Promise<T>;
  reset: () => void;
}

export function useAI<T, Args extends any[]>(
  aiCall: (...args: Args) => Promise<{ data: T } | T>
): UseAIResult<T, Args> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AIError | null>(null);

  const execute = useCallback(
    async (...args: Args): Promise<T> => {
      setLoading(true);
      setError(null);
      try {
        const response = await aiCall(...args);
        const resultData = (response as any).data !== undefined ? (response as any).data : response;
        setData(resultData);
        return resultData;
      } catch (err: any) {
        let aiErr: AIError;
        if (err instanceof AIError) {
          aiErr = err;
        } else {
          aiErr = new AIError(err.message || "Something went wrong", "UNKNOWN_ERROR", err);
        }
        setError(aiErr);
        throw aiErr;
      } finally {
        setLoading(false);
      }
    },
    [aiCall]
  );

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error, execute, reset };
}
