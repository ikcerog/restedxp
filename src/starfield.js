export function initStarfield(canvas) {
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  let stars = []
  let raf

  function resize() {
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    generateStars()
  }

  function generateStars() {
    stars = Array.from({ length: 240 }, () => ({
      x:            Math.random() * canvas.width,
      y:            Math.random() * canvas.height,
      r:            Math.random() * 1.4 + 0.2,
      speed:        Math.random() * 0.12 + 0.015,
      opacity:      Math.random() * 0.65 + 0.15,
      phase:        Math.random() * Math.PI * 2,
      phaseSpeed:   Math.random() * 0.008 + 0.002,
    }))
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const s of stars) {
      s.phase += s.phaseSpeed
      const a = s.opacity * (0.55 + 0.45 * Math.sin(s.phase))

      // Core dot
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(200, 230, 255, ${a})`
      ctx.fill()

      // Soft halo for brighter stars
      if (s.r > 1.0) {
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4)
        g.addColorStop(0, `rgba(90, 170, 255, ${a * 0.18})`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      }

      // Drift down slowly
      s.y += s.speed
      if (s.y > canvas.height + 2) {
        s.y = -2
        s.x = Math.random() * canvas.width
      }
    }

    raf = requestAnimationFrame(draw)
  }

  const ro = new ResizeObserver(resize)
  ro.observe(document.documentElement)
  resize()
  draw()

  return () => { cancelAnimationFrame(raf); ro.disconnect() }
}
