export type SoundLevel = 'N' | 'R' | 'SR' | 'SSR' | 'UR'

export function getLevelFromNumber(num: number): SoundLevel {
  if (num < 2) return 'N'
  if (num < 5) return 'R'
  if (num < 10) return 'SR'
  return 'UR'
}
