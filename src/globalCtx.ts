import centralPlayer from './components/centralPlayer'
import { setContext } from 'svelte'

export function initGlobalContext() {
  const player = new centralPlayer()
  setContext('player', player)
}
