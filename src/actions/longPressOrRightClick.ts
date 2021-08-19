// https://stackoverflow.com/a/56853302

const EVT_NAME_LONGPRESS = 'long-press'

export function longPressOrRightClick(node: Element, threshold = 500) {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  const evtMouseDown = isTouch ? 'touchstart' : 'mousedown'
  const evtMouseUp = isTouch ? 'touchend' : 'mouseup'
  const evtMouseMove = isTouch ? 'touchmove' : 'mousemove'

  const handle_mousedown = () => {
    const timeout = setTimeout(() => {
      node.dispatchEvent(new CustomEvent(EVT_NAME_LONGPRESS))
    }, threshold)

    const cancel = () => {
      clearTimeout(timeout)
      node.removeEventListener(evtMouseMove, cancel)
      node.removeEventListener(evtMouseUp, cancel)
    }

    node.addEventListener(evtMouseMove, cancel)
    node.addEventListener(evtMouseUp, cancel)
  }

  node.addEventListener(evtMouseDown, handle_mousedown)

  return {
    destroy() {
      node.removeEventListener(evtMouseDown, handle_mousedown)
    },
  }
}
