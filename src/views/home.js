import { getPosts } from '../sanity.js'
import { scramble } from '../scramble.js'

export async function renderHome(container) {
  container.innerHTML = `
    <section class="hero">
      <div class="hero-inner container">
        <div class="hero-eyebrow">
          <span class="eyebrow-line" aria-hidden="true"></span>
          <span class="eyebrow-text">TRANSMISSION INCOMING</span>
          <span class="eyebrow-line" aria-hidden="true"></span>
        </div>
        <h1 class="hero-title">
          <span class="hero-title-line" data-scramble="CHRONICLES">CHRONICLES</span>
          <span class="hero-title-line accent" data-scramble="OF THE VOID">OF THE VOID</span>
        </h1>
        <p class="hero-sub">Dispatches from the outer systems. Gaming, lore, and life at the edge of the map.</p>
        <div class="hero-stats" aria-label="Character stats">
          <div class="stat">
            <span class="stat-label">CLASS</span>
            <span class="stat-value">EXPLORER</span>
          </div>
          <span class="stat-divider" aria-hidden="true">//</span>
          <div class="stat">
            <span class="stat-label">STATUS</span>
            <span class="stat-value online">ACTIVE</span>
          </div>
          <span class="stat-divider" aria-hidden="true">//</span>
          <div class="stat">
            <span class="stat-label">SECTOR</span>
            <span class="stat-value">RESTEDXP</span>
          </div>
        </div>
      </div>
    </section>

    <section class="posts-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <span class="title-bracket" aria-hidden="true">//</span>
            LATEST TRANSMISSIONS
          </h2>
          <div class="section-line" aria-hidden="true"></div>
        </div>
        <div id="post-grid" class="post-grid" role="list">
          <div class="loading-state" role="status">
            <div class="loading-spinner" aria-hidden="true"></div>
            <span>SCANNING DATASTREAM…</span>
          </div>
        </div>
      </div>
    </section>
  `

  // Trigger scramble on hero title lines
  container.querySelectorAll('[data-scramble]').forEach(el => {
    const text = el.dataset.scramble
    requestAnimationFrame(() => scramble(el, text, 1000))
  })

  const grid = container.querySelector('#post-grid')

  try {
    const posts = await getPosts()

    if (!posts?.length) {
      grid.innerHTML = `<div class="empty-state">NO TRANSMISSIONS DETECTED — DATASTREAM QUIET</div>`
      return
    }

    grid.innerHTML = posts.map((post, i) => renderPostCard(post, i)).join('')

    // Stagger entry animation
    grid.querySelectorAll('.post-card').forEach((card, i) => {
      card.style.animationDelay = `${i * 70}ms`
    })
  } catch (err) {
    console.error('[restedxp] getPosts failed:', err)
    grid.innerHTML = `<div class="error-state">SIGNAL LOST — UNABLE TO REACH DATASTREAM</div>`
  }
}

function formatDate(iso) {
  if (!iso) return 'UNDATED'
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  }).toUpperCase()
}

function renderPostCard(post, index) {
  const date     = formatDate(post.publishedAt)
  const category = (post.category || 'GENERAL').toUpperCase()
  const featured = index === 0
  const tags     = post.tags?.map(t => `<span class="tag">${t}</span>`).join('') ?? ''

  return `
    <article class="post-card ${featured ? 'post-card--featured' : ''}" role="listitem" data-index="${index}">
      <div class="card-inner">
        <header class="card-header">
          <div class="card-meta">
            <span class="card-category">${category}</span>
            <span class="card-date">${date}</span>
          </div>
          ${featured ? '<div class="featured-badge">FEATURED</div>' : ''}
        </header>

        ${post.coverImage ? `
          <div class="card-image" style="background-image:url('${post.coverImage}')" role="img" aria-label="${post.title} cover image"></div>
        ` : ''}

        <div class="card-body">
          <h2 class="card-title">${post.title}</h2>
          ${post.excerpt ? `<p class="card-excerpt">${post.excerpt}</p>` : ''}
          ${tags ? `<div class="card-tags">${tags}</div>` : ''}
        </div>

        <footer class="card-footer">
          <a href="#/post/${post.slug.current}" class="card-link">
            <span>READ TRANSMISSION</span>
            <span class="link-arrow" aria-hidden="true">→</span>
          </a>
        </footer>
      </div>
      <div class="card-glow" aria-hidden="true"></div>
    </article>
  `
}
