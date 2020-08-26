import type { ErrorFormatter } from './types'

declare global {
  interface Window {
    errorFormatter?: ErrorFormatter
  }
}
