export function renderAbout(container) {
  container.innerHTML = `
    <section class="about-section">
      <div class="about-inner container">
        <div class="section-header">
          <h2 class="section-title">
            <span class="title-bracket" aria-hidden="true">//</span>
            ABOUT THIS STATION
          </h2>
          <div class="section-line" aria-hidden="true"></div>
        </div>

        <div class="about-panel">
          <p>
            This is <strong>RestedXP</strong> — a personal blog about gaming, worlds,
            and the spaces between. Named after that feeling when you log back in
            fully rested, bar filled, ready for whatever the world throws at you.
          </p>
          <p>
            Expect dispatches on MMOs, RPGs, game design, lore deep-dives, and
            the occasional existential meditation on why we play at all.
          </p>
          <div class="about-stats">
            <div class="about-stat">
              <span class="about-stat-label">ALIGNMENT</span>
              <span class="about-stat-value">CHAOTIC GOOD</span>
            </div>
            <div class="about-stat">
              <span class="about-stat-label">PRIMARY CLASS</span>
              <span class="about-stat-value">WRITER / EXPLORER</span>
            </div>
            <div class="about-stat">
              <span class="about-stat-label">HOME SYSTEM</span>
              <span class="about-stat-value">RESTEDXP.BLOG</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
}
