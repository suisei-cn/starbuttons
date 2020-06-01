export function setItem(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch (_) {
    // Just continue
  }
}
export function getItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (_) {
    return null;
  }
}
export function removeItem(key: string) {
  try {
    localStorage.removeItem(key);
  } catch (_) {
    // Just continue
  }
}
