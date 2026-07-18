interface CacheEntry<T> {
  data: T;
  rawText: string;
  expiresAt: number;
}

class ResponseCache {
  private cache = new Map<string, CacheEntry<any>>();

  // Create a stable cache key
  generateKey(prompt: string, config?: Record<string, any>): string {
    const serializedConfig = config ? JSON.stringify(config) : "";
    return `${prompt}::${serializedConfig}`;
  }

  get<T>(key: string): { data: T; rawText: string } | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return { data: entry.data, rawText: entry.rawText };
  }

  set<T>(key: string, data: T, rawText: string, ttlMs: number = 300000): void { // 5 mins default
    this.cache.set(key, {
      data,
      rawText,
      expiresAt: Date.now() + ttlMs,
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

export const responseCache = new ResponseCache();
