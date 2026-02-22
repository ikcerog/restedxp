import { getPosts } from '../sanity.js'

export async function renderArchive(container) {
  container.innerHTML = `
    <section class="archive-section">
      <div class="archive-inner container">
        <div class="section-header">
          <h2 class="section-title">
            <span class="title-bracket" aria-hidden="true">//</span>
            FULL ARCHIVE
          </h2>
          <div class="section-line" aria-hidden="true"></div>
        </div>
        <div id="archive-list" class="archive-list" role="list">
          <div class="loading-state" role="status">
            <div class="loading-spinner" aria-hidden="true"></div>
            <span>INDEXING RECORDS…</span>
          </div>
        </div>
      </div>
    </section>
  `

  const list = container.querySelector('#archive-list')

  try {
    const posts = await getPosts()

    if (!posts?.length) {
      list.innerHTML = `<div class="empty-state">NO RECORDS IN ARCHIVE</div>`
      return
    }

    // Group by year
    const byYear = posts.reduce((acc, post) => {
      const year = post.publishedAt ? new Date(post.publishedAt).getFullYear() : 'UNDATED'
      ;(acc[year] = acc[year] || []).push(post)
      return acc
    }, {})

    list.innerHTML = Object.entries(byYear)
      .sort(([a], [b]) => b - a)
      .map(([year, yearPosts]) => `
        <div class="archive-year-group" role="listitem">
          <div class="archive-year-label">
            <span class="year-bracket" aria-hidden="true">◈</span>
            ${year}
          </div>
          <ul class="archive-year-list">
            ${yearPosts.map(post => `
              <li class="archive-item">
                <span class="archive-item-date">
                  ${post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()
                    : '—'}
                </span>
                <span class="archive-item-category">${(post.category || 'GENERAL').toUpperCase()}</span>
                <a href="#/post/${post.slug.current}" class="archive-item-title">${post.title}</a>
              </li>
            `).join('')}
          </ul>
        </div>
      `).join('')
  } catch (err) {
    console.error('[restedxp] archive fetch failed:', err)
    list.innerHTML = `<div class="error-state">SIGNAL LOST — UNABLE TO LOAD ARCHIVE</div>`
  }
}
