// Storage can be disabled by browser settings or unavailable in embedded contexts.
const sessionFallback = new Map<string, string>();

export function readSessionValue(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return sessionFallback.get(key) ?? null;
  }
}

export function writeSessionValue(key: string, value: string): void {
  sessionFallback.set(key, value);
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Keep the current visit usable even when persistence is unavailable.
  }
}
