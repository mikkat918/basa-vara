<script setup>
const stats = [
  { label: 'Listings', value: '2,400+' },
  { label: 'Verified landlords', value: '1,000+' },
  { label: 'Avg. response time', value: '1 hr' },
  { label: 'Cities covered', value: '8' },
]
</script>


<template>
  <main class="about-page">
    <!-- Hero -->
    <section class="about-hero">
      <div class="container hero-inner">
        <div class="hero-copy">
          <span class="eyebrow">
            ABOUT BASA VARA
          </span>

          <h1>
            Making it easier to find
            <span class="highlight">a place to call home.</span>
          </h1>

          <p class="hero-description">
            Basa Vara brings tenants and landlords together through a
            simpler, more transparent rental experience. Discover homes,
            compare details, and connect on your terms.
          </p>

          <router-link to="/properties" class="btn btn-primary hero-btn">
            Explore properties <span>→</span>
          </router-link>
        </div>

        <div class="hero-visual" aria-hidden="true">
          <div class="visual-circle circle-back"></div>
          <div class="visual-circle circle-front"></div>

          <div class="home-illustration">
            <div class="illustration-roof"></div>
            <div class="illustration-house">
              <div class="house-window window-left"></div>
              <div class="house-door"></div>
              <div class="house-window window-right"></div>
            </div>
            <div class="house-ground"></div>
          </div>

          <div class="floating-note note-top">
            <span class="note-icon">⌂</span>
            <span>
              <strong>Find your place</strong>
              <small>Discover rental homes</small>
            </span>
          </div>

          <div class="floating-note note-bottom">
            <span class="note-check">✓</span>
            <span>
              <strong>Connect directly</strong>
              <small>Contact on your terms</small>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics -->
    <section class="container stats-section">
      <div class="stats-heading">
        <span class="eyebrow">BASA VARA AT A GLANCE</span>
        <h2>Built around your rental journey</h2>
      </div>

      <div class="grid-4 stats">
        <article
          v-for="(item, index) in stats"
          :key="item.label"
          class="card stat-card"
        >
          <span class="stat-index">
            {{ String(index + 1).padStart(2, '0') }}
          </span>

          <strong>{{ item.value }}</strong>
          <span class="stat-label">{{ item.label }}</span>
        </article>
      </div>
    </section>

    <!-- Mission -->
    <section class="section-soft">
      <div class="container mission-section">
        <div class="mission-heading">
          <span class="eyebrow">WHY WE EXIST</span>
          <h2>Our mission</h2>
          <div class="heading-line"></div>
        </div>

        <div class="mission-content">
          <p class="mission-lead">
            Finding a home should feel exciting, not overwhelming.
          </p>

          <p class="muted">
            Basa Vara aims to make renting in Bangladesh simpler and more
            transparent. We bring property information and communication
            together so tenants can explore their options and landlords
            can present their properties to potential renters.
          </p>

          <p class="muted">
            From browsing listings to unlocking a contact number when
            needed, our goal is to give users a clear and straightforward
            experience at every step.
          </p>
        </div>
      </div>
    </section>

    <!-- Platform values -->
    <section class="container values-section">
      <div class="section-heading">
        <span class="eyebrow">WHAT MATTERS TO US</span>
        <h2>A rental experience built on clarity</h2>
        <p class="muted">
          Practical features designed to make finding and listing a home easier.
        </p>
      </div>

      <div class="grid-3 values-grid">
        <article class="card value-card">
          <div class="value-icon green">✓</div>
          <h3>Clear property details</h3>
          <p class="muted">
            Browse property information, locations, pricing, and available
            amenities before deciding which homes to explore.
          </p>
        </article>

        <article class="card value-card">
          <div class="value-icon blue">↔</div>
          <h3>Transparent contact access</h3>
          <p class="muted">
            Explore listings for free and use the stated contact-unlock
            fee when you want to access a landlord's phone number.
          </p>
        </article>

        <article class="card value-card">
          <div class="value-icon purple">⌂</div>
          <h3>Designed for local needs</h3>
          <p class="muted">
            A rental platform designed around Bangladesh's housing market,
            local neighbourhoods, and familiar payment options.
          </p>
        </article>
      </div>
    </section>

    <!-- Vision -->
    <section class="container vision-section">
      <div class="vision-card">
        <div class="vision-mark" aria-hidden="true">“</div>

        <div class="vision-copy">
          <span class="eyebrow">OUR VISION</span>
          <h2>A more accessible way to find your next home.</h2>
          <p>
            We want to help build a rental experience where people can
            discover suitable homes, understand their options, and
            communicate with greater confidence.
          </p>
        </div>

        <div class="vision-decoration" aria-hidden="true">
          <span class="vision-square square-one"></span>
          <span class="vision-square square-two"></span>
          <span class="vision-square square-three"></span>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="container about-cta-section">
      <div class="about-cta">
        <div>
          <span class="cta-eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
          <h2>Ready to find your next home?</h2>
          <p>
            Explore rental properties and discover a place that fits your needs.
          </p>
        </div>

        <router-link to="/properties" class="btn cta-btn">
          Browse properties <span>→</span>
        </router-link>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Base */
.about-page {
  width: 100%;
  overflow: clip;
  color: var(--color-text, #1f2937);
}

.about-page *,
.about-page *::before,
.about-page *::after {
  box-sizing: border-box;
}

.about-page h1,
.about-page h2,
.about-page h3,
.about-page p {
  overflow-wrap: anywhere;
}

.about-page h2 {
  margin: 0;
  font-size: clamp(1.6rem, 3vw, 2.25rem);
  line-height: 1.25;
  letter-spacing: -0.04em;
}

.about-page h3 {
  margin: 0 0 12px;
  font-size: 1.08rem;
  line-height: 1.5;
}

.about-page .muted {
  color: var(--color-muted, #6b7280);
}

.eyebrow {
  display: inline-block;
  margin-bottom: 14px;
  color: var(--color-primary, #16845b);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.13em;
  line-height: 1.6;
}

/* Hero */
.about-hero {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #e6eee8;
  background:
    radial-gradient(ellipse at 80% 15%, #dff3e6 0, transparent 38%),
    linear-gradient(135deg, #f5fbf7, #fff 70%);
}

.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  align-items: center;
  gap: clamp(32px, 6vw, 80px);
  min-height: 500px;
  padding-top: 64px;
  padding-bottom: 64px;
}

.hero-copy {
  min-width: 0;
  animation: fade-up 0.6s ease both;
}

.hero-copy h1 {
  max-width: 14ch;
  margin: 0;
  color: #183526;
  font-size: clamp(2.5rem, 5vw, 4.2rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.06em;
}

.highlight {
  display: block;
  color: var(--color-primary, #16845b);
}

.hero-description {
  max-width: 54ch;
  margin: 22px 0 26px;
  color: #65756a;
  font-size: 1rem;
  line-height: 1.9;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 48px;
  padding: 13px 22px;
  border-radius: 10px;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.hero-btn:hover {
  transform: translateY(-2px);
}

/* House illustration */
.hero-visual {
  position: relative;
  display: grid;
  min-width: 0;
  min-height: 350px;
  place-items: center;
  animation: fade-up 0.75s 0.1s ease both;
}

.visual-circle {
  position: absolute;
  border-radius: 50%;
}

.circle-back {
  width: min(340px, 85%);
  aspect-ratio: 1;
  background: #e2f2e7;
}

.circle-front {
  width: min(265px, 68%);
  aspect-ratio: 1;
  border: 1px solid #c4e3ce;
}

.home-illustration {
  position: relative;
  z-index: 1;
  width: 230px;
  max-width: 65%;
  padding-top: 20px;
}

.illustration-roof {
  position: relative;
  z-index: 1;
  width: 165px;
  height: 165px;
  margin: 0 auto -3px;
  border-top: 14px solid #26764d;
  border-left: 14px solid #26764d;
  border-radius: 8px 0 0;
  transform: translateY(45px) rotate(45deg) scale(0.78);
  background: #c4e5ce;
}

.illustration-house {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  width: 205px;
  height: 145px;
  margin: 0 auto;
  padding: 26px 15px 0;
  border: 7px solid #26764d;
  border-radius: 5px 5px 0 0;
  background: #fff;
}

.house-window {
  width: 36px;
  height: 36px;
  border: 5px solid #26764d;
  border-radius: 3px;
  background: #dff3e6;
}

.house-door {
  align-self: flex-end;
  width: 42px;
  height: 76px;
  border: 5px solid #26764d;
  border-bottom: 0;
  border-radius: 5px 5px 0 0;
  background: #c4e5ce;
}

.house-ground {
  width: 260px;
  height: 7px;
  margin: 0 auto;
  border-radius: 50%;
  background: #26764d;
}

.floating-note {
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 11px;
  max-width: calc(100% - 8px);
  padding: 13px 15px;
  border: 1px solid #e7eee8;
  border-radius: 13px;
  background: #fff;
  box-shadow: 0 12px 30px rgba(26, 73, 44, 0.1);
  animation: float 5s ease-in-out infinite;
}

.note-top {
  top: 28px;
  left: 0;
}

.note-bottom {
  right: 0;
  bottom: 28px;
  animation-delay: -2.5s;
}

.floating-note > span:last-child {
  display: grid;
  gap: 4px;
}

.floating-note strong {
  color: #243b2d;
  font-size: 0.8rem;
}

.floating-note small {
  color: #78847b;
  font-size: 0.69rem;
}

.note-icon,
.note-check {
  display: grid;
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  place-items: center;
  border-radius: 10px;
  background: #e9f6ed;
  color: #16845b;
  font-size: 1.25rem;
  font-weight: 800;
}

/* Statistics */
.stats-section {
  padding-top: 64px;
  padding-bottom: 70px;
}

.stats-heading {
  margin-bottom: 26px;
}

.stats-heading .eyebrow {
  margin-bottom: 9px;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.stat-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
  min-height: 150px;
  padding: 24px;
  overflow: hidden;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 15px;
  background: #fff;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: #c7e3d0;
  box-shadow: 0 12px 28px rgba(25, 73, 44, 0.06);
}

.stat-index {
  color: #9aafa0;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.stat-card strong {
  color: var(--color-primary, #16845b);
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.2;
  overflow-wrap: anywhere;
}

.stat-label {
  color: #6b7280;
  font-size: 0.84rem;
  line-height: 1.5;
}

/* Mission */
.section-soft {
  border-top: 1px solid #edf1ed;
  border-bottom: 1px solid #edf1ed;
  background: #f7faf7;
}

.mission-section {
  display: grid;
  grid-template-columns: minmax(200px, 0.7fr) minmax(0, 1.3fr);
  gap: clamp(32px, 8vw, 100px);
  padding-top: 76px;
  padding-bottom: 76px;
}

.mission-heading h2 {
  font-size: clamp(2rem, 4vw, 2.8rem);
}

.heading-line {
  width: 54px;
  height: 4px;
  margin-top: 20px;
  border-radius: 999px;
  background: var(--color-primary, #16845b);
}

.mission-content p {
  margin: 0 0 16px;
  font-size: 0.95rem;
  line-height: 1.95;
}

.mission-content p:last-child {
  margin-bottom: 0;
}

.mission-content .mission-lead {
  color: #243c2d;
  font-size: clamp(1.25rem, 2.5vw, 1.65rem);
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: -0.03em;
}

/* Values */
.values-section {
  padding-top: 76px;
  padding-bottom: 76px;
}

.section-heading {
  max-width: 650px;
  margin-bottom: 32px;
}

.section-heading .eyebrow {
  margin-bottom: 10px;
}

.section-heading > p {
  margin: 12px 0 0;
  font-size: 0.93rem;
  line-height: 1.8;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.value-card {
  min-width: 0;
  padding: 28px;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 16px;
  background: #fff;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
}

.value-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.05);
}

.value-icon {
  display: grid;
  width: 48px;
  height: 48px;
  margin-bottom: 22px;
  place-items: center;
  border-radius: 14px;
  font-size: 1.35rem;
  font-weight: 800;
}

.green {
  background: #e6f6eb;
  color: #16845b;
}

.blue {
  background: #eaf2ff;
  color: #3867c8;
}

.purple {
  background: #f1eaff;
  color: #8055c5;
}

.value-card p {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.9;
}

/* Vision */
.vision-section {
  padding-bottom: 76px;
}

.vision-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 28px;
  min-height: 235px;
  padding: clamp(28px, 5vw, 54px);
  overflow: hidden;
  border: 1px solid #dcece1;
  border-radius: 20px;
  background: linear-gradient(120deg, #edf8f0, #f8fcf9);
}

.vision-mark {
  align-self: flex-start;
  color: #b5d9c0;
  font-family: Georgia, serif;
  font-size: 6rem;
  line-height: 0.9;
}

.vision-copy {
  position: relative;
  z-index: 1;
  max-width: 620px;
}

.vision-copy .eyebrow {
  margin-bottom: 10px;
}

.vision-copy h2 {
  color: #193d29;
  font-size: clamp(1.65rem, 3.2vw, 2.4rem);
}

.vision-copy p {
  margin: 14px 0 0;
  color: #607467;
  font-size: 0.92rem;
  line-height: 1.9;
}

.vision-decoration {
  position: absolute;
  right: 20px;
  bottom: -50px;
  width: 190px;
  height: 190px;
  opacity: 0.55;
  transform: rotate(35deg);
}

.vision-square {
  position: absolute;
  display: block;
  border: 1px solid #b9ddc5;
  border-radius: 24px;
}

.square-one {
  inset: 0;
}

.square-two {
  inset: 25px;
}

.square-three {
  inset: 50px;
}

/* CTA */
.about-cta-section {
  padding-bottom: 76px;
}

.about-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: clamp(28px, 5vw, 48px);
  border-radius: 20px;
  background: linear-gradient(115deg, #126b47, #19865a);
  color: #fff;
}

.about-cta > div {
  max-width: 620px;
}

.cta-eyebrow {
  display: inline-block;
  margin-bottom: 12px;
  color: #d0f0dc;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.about-cta h2 {
  color: #fff;
  font-size: clamp(1.7rem, 3.5vw, 2.5rem);
}

.about-cta p {
  margin: 12px 0 0;
  color: #e1f3e8;
  font-size: 0.92rem;
  line-height: 1.8;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex: 0 0 auto;
  min-height: 48px;
  padding: 12px 20px;
  border: 1px solid #fff;
  border-radius: 10px;
  background: #fff;
  color: #126b47;
  font-size: 0.88rem;
  font-weight: 700;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.cta-btn:hover {
  transform: translateY(-2px);
  background: #effaf2;
}

/* Animations */
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-7px);
  }
}

/* Accessibility */
.about-page a:focus-visible {
  outline: 3px solid #78b99a;
  outline-offset: 4px;
}

/* Tablet */
@media (max-width: 950px) {
  .hero-inner {
    grid-template-columns: minmax(0, 1fr) minmax(240px, 0.8fr);
    gap: 28px;
  }

  .hero-copy h1 {
    font-size: clamp(2.35rem, 5vw, 3.4rem);
  }

  .grid-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .mission-section {
    gap: 36px;
  }

  .grid-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .value-card:last-child {
    grid-column: 1 / -1;
  }
}

/* Mobile and small tablets */
@media (max-width: 680px) {
  .hero-inner {
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
    min-height: auto;
    padding-top: 46px;
    padding-bottom: 36px;
  }

  .hero-copy h1 {
    max-width: 15ch;
    font-size: clamp(2.5rem, 8vw, 3.4rem);
  }

  .hero-visual {
    min-height: 320px;
  }

  .mission-section {
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
    padding-top: 48px;
    padding-bottom: 48px;
  }

  .stats-section,
  .values-section {
    padding-top: 48px;
    padding-bottom: 48px;
  }

  .vision-section {
    padding-bottom: 48px;
  }

  .about-cta {
    align-items: flex-start;
    flex-direction: column;
  }

  .cta-btn {
    width: 100%;
  }
}

/* Small phones */
@media (max-width: 480px) {
  .hero-inner {
    padding-top: 34px;
  }

  .hero-copy h1 {
    font-size: clamp(2.2rem, 10vw, 2.9rem);
  }

  .hero-description {
    font-size: 0.92rem;
  }

  .hero-visual {
    min-height: 285px;
  }

  .home-illustration {
    transform: scale(0.85);
  }

  .floating-note {
    gap: 8px;
    padding: 10px;
  }

  .floating-note strong {
    font-size: 0.72rem;
  }

  .floating-note small {
    font-size: 0.63rem;
  }

  .note-top {
    top: 12px;
  }

  .note-bottom {
    bottom: 12px;
  }

  .grid-4,
  .grid-3 {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
  }

  .stat-card {
    min-height: 125px;
    padding: 20px;
  }

  .value-card {
    padding: 23px;
  }

  .value-card:last-child {
    grid-column: auto;
  }

  .vision-card {
    align-items: flex-start;
    gap: 12px;
    padding: 25px 20px;
  }

  .vision-mark {
    font-size: 3.5rem;
  }

  .vision-decoration {
    right: -80px;
    opacity: 0.25;
  }

  .about-cta {
    padding: 28px 22px;
    border-radius: 16px;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .about-page *,
  .about-page *::before,
  .about-page *::after {
    animation: none !important;
    transition: none !important;
  }
}
</style>