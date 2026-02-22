import { getPost, renderBody } from '../sanity.js'

export async function renderPost(container, slug) {
  container.innerHTML = `
    <div class="post-loading container" role="status">
      <div class="loading-spinner" aria-hidden="true"></div>
      <span>DECRYPTING TRANSMISSION…</span>
    </div>
  `

  try {
    const post = await getPost(slug)

    if (!post) {
      container.innerHTML = notFound()
      return
    }

    const date = post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric',
        })
      : 'UNDATED'

    const category = (post.category || 'GENERAL').toUpperCase()
    const tags     = post.tags?.map(t => `<span class="tag">${t}</span>`).join('') ?? ''
    const bodyHtml = renderBody(post.body)

    container.innerHTML = `
      <article class="post-full">
        <div class="post-full-inner container">

          <nav class="post-breadcrumb" aria-label="Breadcrumb">
            <a href="#/" class="breadcrumb-link">HOME</a>
            <span class="breadcrumb-sep" aria-hidden="true">/</span>
            <span class="breadcrumb-current" aria-current="page">${post.title}</span>
          </nav>

          ${post.coverImage ? `
            <div class="post-cover">
              <img src="${post.coverImage}" alt="${post.coverAlt || post.title}" />
              <div class="cover-overlay" aria-hidden="true"></div>
            </div>
          ` : ''}

          <header class="post-header">
            <div class="post-meta">
              <span class="post-category">${category}</span>
              <span class="meta-sep" aria-hidden="true">//</span>
              <time class="post-date" datetime="${post.publishedAt || ''}">${date}</time>
            </div>
            <h1 class="post-title">${post.title}</h1>
            ${post.excerpt ? `<p class="post-excerpt">${post.excerpt}</p>` : ''}
            ${tags ? `<div class="post-tags" aria-label="Tags">${tags}</div>` : ''}
          </header>

          <div class="post-body prose">
            ${bodyHtml}
          </div>

          <footer class="post-footer">
            <div class="post-footer-line" aria-hidden="true"></div>
            <a href="#/" class="back-btn">
              <span class="back-arrow" aria-hidden="true">←</span>
              BACK TO TRANSMISSIONS
            </a>
          </footer>

        </div>
      </article>
    `
  } catch (err) {
    console.error('[restedxp] getPost failed:', err)
    container.innerHTML = `
      <div class="error-state container">
        <div class="error-code" aria-hidden="true">ERR</div>
        <div class="error-msg">SIGNAL CORRUPTED — UNABLE TO DECODE</div>
        <a href="#/" class="back-link">← RETURN TO BASE</a>
      </div>
    `
  }
}

function notFound() {
  return `
    <div class="not-found container">
      <div class="error-code" aria-hidden="true">404</div>
      <div class="error-msg">TRANSMISSION NOT FOUND</div>
      <a href="#/" class="back-link">← RETURN TO BASE</a>
    </div>
  `
}
