export function getKey(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch (_) {
    return null
  }
}

export function setKey(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (_) {
    return false
  }
}
