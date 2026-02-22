const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?/\\[]{}=-+'

/**
 * Text-scramble reveal effect.
 * @param {HTMLElement} el
 * @param {string} finalText
 * @param {number} duration  ms
 */
export function scramble(el, finalText, duration = 900) {
  const frames = Math.round(duration / 28)
  const chars  = finalText.split('')
  let frame    = 0

  const id = setInterval(() => {
    el.textContent = chars.map((ch, i) => {
      if (ch === ' ' || ch === '\n') return ch
      if (frame / frames > i / chars.length) return ch
      return CHARS[Math.floor(Math.random() * CHARS.length)]
    }).join('')

    frame++
    if (frame > frames) {
      el.textContent = finalText
      clearInterval(id)
    }
  }, 28)
}
