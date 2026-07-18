export interface RetryOptions {
  maxRetries: number;
  initialDelayMs: number;
  multiplier: number;
  onRetry?: (error: any, attempt: number, nextDelayMs: number) => void;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = { maxRetries: 3, initialDelayMs: 1000, multiplier: 2 }
): Promise<{ result: T; attempts: number }> {
  let attempt = 1;
  let delay = options.initialDelayMs;

  while (true) {
    try {
      const result = await fn();
      return { result, attempts: attempt };
    } catch (error: any) {
      if (attempt > options.maxRetries) {
        throw error;
      }

      // Add full jitter to delay
      const jitter = Math.random() * 0.3 * delay; // up to 30% jitter
      const nextDelay = Math.min(10000, delay + jitter); // cap at 10 seconds

      if (options.onRetry) {
        options.onRetry(error, attempt, nextDelay);
      }

      await new Promise((resolve) => setTimeout(resolve, nextDelay));
      attempt++;
      delay *= options.multiplier;
    }
  }
}
