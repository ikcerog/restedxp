import './styles/main.css'

import { initRouter, route } from './router.js'
import { initStarfield }     from './starfield.js'
import { renderHome }        from './views/home.js'
import { renderPost }        from './views/post.js'
import { renderAbout }       from './views/about.js'
import { renderArchive }     from './views/archive.js'

const app = document.getElementById('app')

// ── Routes ──────────────────────────────────────────────────
route('/',              () => renderHome(app))
route('/archive',       () => renderArchive(app))
route('/about',         () => renderAbout(app))
route('/post/:slug',    (_, { slug }) => renderPost(app, slug))
route('*',              () => renderHome(app))

// ── Starfield ────────────────────────────────────────────────
initStarfield(document.getElementById('starfield'))

// ── Footer clock ─────────────────────────────────────────────
const timeEl = document.getElementById('footer-time')
function tick() {
  const now = new Date()
  const iso  = now.toISOString().slice(0, 16).replace('T', ' ')
  timeEl.textContent = `STARDATE ${iso}Z`
}
tick()
setInterval(tick, 1000)

// ── Nav active state ─────────────────────────────────────────
function updateNav() {
  const path = window.location.hash.slice(1) || '/'
  document.querySelectorAll('[data-nav]').forEach(link => {
    const key = link.dataset.nav
    const active =
      (key === 'home'    && path === '/') ||
      (key === 'archive' && path.startsWith('/archive')) ||
      (key === 'about'   && path.startsWith('/about'))
    link.classList.toggle('active', active)
    link.setAttribute('aria-current', active ? 'page' : 'false')
  })
}
window.addEventListener('hashchange', updateNav)
updateNav()

// ── Boot ─────────────────────────────────────────────────────
initRouter()
