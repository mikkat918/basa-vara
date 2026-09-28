<script setup>
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '../../components/search/SearchBar.vue'
import PropertyGrid from '../../components/property/PropertyGrid.vue'
import { usePropertyStore } from '../../stores/propertyStore'
import { LOCATIONS } from '../../utils/constants'
import { useAuthStore } from '../../stores/authStore'

const store = usePropertyStore()
const router = useRouter()
const auth = useAuthStore()
const steps = [
  { t: 'Search', d: 'Filter by area, rent, and amenities.' },
  { t: 'Visit details', d: 'Browse photos and listing facts for free.' },
  { t: 'Chat', d: 'Message the landlord about viewing times.' },
  { t: 'Unlock', d: 'Spend 1 coin to reveal verified phone details.' },
]

onMounted(() => store.loadHome())

function search(payload) {
  const q = new URLSearchParams()
  if (payload.q) q.set('q', payload.q)
  if (payload.location) q.set('location', payload.location)
  router.push(`/properties?${q.toString()}`)
}

const landlordCta = computed(() => (auth.role === 'landlord' ? '/landlord/properties/new' : '/register'))
</script>


<template>
  <main class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="status-dot"></span>
            Your next home starts here
          </div>

          <p class="eyebrow">বাসা ভাড়া · Bangladesh Rentals</p>

          <h1>
            Find a home
            <span class="heading-highlight">that feels right.</span>
          </h1>

          <p class="muted lead">
            Discover rental homes across Dhaka, explore property details,
            and connect with landlords when you're ready.
          </p>

          <SearchBar @search="search" />

          <div class="hero-trust">
            <span><span class="check">✓</span> Browse properties for free</span>
            <span><span class="check">✓</span> Contact on your terms</span>
          </div>
        </div>

        <div class="hero-visual" aria-hidden="true">
          <div class="hero-image-placeholder">
            <div class="house-symbol">⌂</div>
            <span class="visual-label">Find your place</span>
            <strong>Make yourself at home.</strong>
            <span class="visual-caption">A simpler way to rent in Dhaka.</span>
          </div>

          <div class="floating-card floating-top">
            <span class="floating-icon">⌂</span>
            <span>
              <strong>Find a home</strong>
              <small>Explore local listings</small>
            </span>
          </div>

          <div class="floating-card floating-bottom">
            <span class="floating-check">✓</span>
            <span>
              <strong>You're in control</strong>
              <small>Unlock contact when needed</small>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Locations -->
    <section class="container page popular-locations">
      <div class="section-heading">
        <div>
          <p class="eyebrow">EXPLORE BY AREA</p>
          <h2>Popular locations</h2>
          <p class="section-description">
            Find a home in a neighbourhood that suits your lifestyle.
          </p>
        </div>

        <router-link
          to="/properties"
          class="text-link"
        >
          Explore all homes <span>→</span>
        </router-link>
      </div>

      <div class="grid-4 location-grid">
        <router-link
          v-for="l in LOCATIONS"
          :key="l.area"
          class="card loc"
          :to="`/properties?location=${encodeURIComponent(l.area)}`"
        >
          <div class="location-icon" aria-hidden="true">⌖</div>
          <div class="location-info">
            <span class="location-name">{{ l.area }}</span>
            <span class="muted location-city">Dhaka, Bangladesh</span>
          </div>
          <span class="location-arrow" aria-hidden="true">↗</span>
        </router-link>
      </div>
    </section>

    <!-- Featured Properties -->
    <section class="section-soft">
      <div class="container page property-section">
        <div class="section-heading">
          <div>
            <p class="eyebrow">HANDPICKED FOR YOU</p>
            <h2>Featured properties</h2>
            <p class="section-description">
              Explore properties highlighted for your next move.
            </p>
          </div>

          <router-link to="/properties" class="text-link">
            View all <span>→</span>
          </router-link>
        </div>

        <PropertyGrid
          :items="store.featured"
          :loading="store.loading"
        />
      </div>
    </section>

    <!-- Latest Properties -->
    <section class="container page property-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">FRESH ON THE MARKET</p>
          <h2>Latest listings</h2>
          <p class="section-description">
            See the latest homes added to our platform.
          </p>
        </div>

        <router-link to="/properties" class="text-link">
          Browse all <span>→</span>
        </router-link>
      </div>

      <PropertyGrid
        :items="store.latest"
        :loading="store.loading"
      />

      <div class="browse-action">
        <router-link
          class="btn btn-secondary"
          to="/properties"
        >
          Browse all properties <span>→</span>
        </router-link>
      </div>
    </section>

    <!-- How It Works -->
    <section class="section-soft">
      <div class="container page how-section">
        <div class="center-heading">
          <p class="eyebrow">SIMPLE & TRANSPARENT</p>
          <h2>Renting made simpler</h2>
          <p class="section-description">
            A straightforward way to discover homes and contact landlords.
          </p>
        </div>

        <div class="grid-4 steps-grid">
          <article
            v-for="(s, index) in steps"
            :key="s.t"
            class="card step-card"
          >
            <div class="step-top">
              <span class="step-number">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <span class="step-line"></span>
            </div>

            <h3>{{ s.t }}</h3>
            <p class="muted">{{ s.d }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Platform Features -->
    <section class="container page benefits-section">
      <div class="center-heading">
        <p class="eyebrow">WHY BASA VARA</p>
        <h2>A more transparent rental experience</h2>
        <p class="section-description">
          Useful tools to help tenants and landlords connect.
        </p>
      </div>

      <div class="grid-3 benefits-grid">
        <article class="card benefit-card">
          <div class="benefit-icon icon-green">✓</div>
          <h3>Listing moderation</h3>
          <p class="muted">
            Listings can be reviewed before publication to help improve
            the quality of property information.
          </p>
        </article>

        <article class="card benefit-card">
          <div class="benefit-icon icon-blue">৳</div>
          <h3>Transparent contact fee</h3>
          <p class="muted">
            Browse for free. Use 1 coin (৳10) to unlock a landlord's
            phone number when you need it.
          </p>
        </article>

        <article class="card benefit-card">
          <div class="benefit-icon icon-purple">↗</div>
          <h3>Local payment options</h3>
          <p class="muted">
            Payment options can include bKash, Nagad and cards,
            depending on the payment gateway configuration.
          </p>
        </article>
      </div>
    </section>

    <!-- Landlord CTA -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-content">
            <span class="cta-label">FOR PROPERTY OWNERS</span>
            <h2>Have a property to rent?</h2>
            <p>
              Publish your listing, share the details with potential
              tenants, and manage enquiries in one place.
            </p>

            <router-link
              class="btn btn-cta"
              :to="landlordCta"
            >
              List your property <span>→</span>
            </router-link>
          </div>

          <div class="cta-decoration" aria-hidden="true">
            <div class="cta-house">⌂</div>
            <span class="cta-circle circle-one"></span>
            <span class="cta-circle circle-two"></span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Base */
.home-page {
  width: 100%;
  overflow: clip;
  color: var(--color-text, #1f2937);
}

.home-page *,
.home-page *::before,
.home-page *::after {
  box-sizing: border-box;
}

.home-page h1,
.home-page h2,
.home-page h3,
.home-page p {
  overflow-wrap: anywhere;
}

.home-page h2 {
  margin: 0;
  font-size: clamp(1.5rem, 2.4vw, 2rem);
  line-height: 1.3;
  letter-spacing: -0.035em;
}

.home-page h3 {
  margin: 0 0 10px;
  font-size: 1.08rem;
  line-height: 1.45;
}

.home-page .page {
  padding-top: 64px;
  padding-bottom: 64px;
}

.eyebrow {
  margin: 0 0 10px;
  color: var(--color-primary, #16845b);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  line-height: 1.6;
  text-transform: uppercase;
}

.muted {
  color: var(--color-muted, #6b7280);
}

.section-description {
  max-width: 56ch;
  margin: 10px 0 0;
  color: var(--color-muted, #6b7280);
  font-size: 0.95rem;
  line-height: 1.8;
}

/* Hero */
.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border-bottom: 1px solid var(--color-border, #e5e7eb);
  background:
    radial-gradient(ellipse at 90% 10%, #dff5e9 0, transparent 36%),
    linear-gradient(135deg, #f7fcf9 0%, #fff 65%);
}

.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
  align-items: center;
  gap: clamp(32px, 6vw, 80px);
  min-height: 540px;
  padding-top: 64px;
  padding-bottom: 64px;
}

.hero-content {
  min-width: 0;
  animation: fade-up 0.65s ease both;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 24px;
  padding: 9px 13px;
  border: 1px solid #d8eadf;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  color: #286747;
  font-size: 0.78rem;
  font-weight: 600;
}

.status-dot {
  width: 8px;
  height: 8px;
  flex: 0 0 8px;
  border-radius: 50%;
  background: #24a36a;
  box-shadow: 0 0 0 4px #e4f5eb;
}

.hero .eyebrow {
  margin-bottom: 12px;
}

.hero h1 {
  max-width: 13ch;
  margin: 0;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.065em;
  color: #172b22;
}

.heading-highlight {
  display: block;
  color: var(--color-primary, #16845b);
}

.lead {
  max-width: 52ch;
  margin: 22px 0 26px;
  font-size: 1rem;
  line-height: 1.85;
}

.hero-trust {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 22px;
  margin-top: 20px;
  color: #4b6356;
  font-size: 0.8rem;
}

.hero-trust > span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.check {
  color: #16845b;
  font-weight: 800;
}

/* Hero visual: CSS illustration, no external image required */
.hero-visual {
  position: relative;
  display: grid;
  place-items: center;
  min-width: 0;
  min-height: 350px;
  animation: fade-up 0.8s 0.12s ease both;
}

.hero-image-placeholder {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  width: min(100%, 390px);
  min-height: 360px;
  padding: 32px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 28px;
  background:
    radial-gradient(circle at 75% 20%, #d8f1df 0 12%, transparent 12.5%),
    linear-gradient(145deg, #eaf6ee, #c9e8d4);
  box-shadow: 0 30px 70px rgba(37, 91, 61, 0.13);
}

.hero-image-placeholder::before {
  position: absolute;
  top: 42px;
  right: 34px;
  width: 150px;
  height: 150px;
  border: 1px solid rgba(37, 105, 70, 0.12);
  border-radius: 50%;
  content: "";
}

.hero-image-placeholder::after {
  position: absolute;
  top: 70px;
  right: 63px;
  width: 95px;
  height: 95px;
  border: 1px solid rgba(37, 105, 70, 0.14);
  border-radius: 50%;
  content: "";
}

.house-symbol {
  position: absolute;
  top: 65px;
  left: 50%;
  display: grid;
  width: 165px;
  height: 165px;
  place-items: center;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.5);
  color: #24774f;
  font-size: 9rem;
  line-height: 1;
  transform: translateX(-50%) rotate(-5deg);
}

.visual-label,
.visual-caption,
.hero-image-placeholder > strong {
  position: relative;
  z-index: 1;
}

.visual-label {
  margin-bottom: 8px;
  color: #357653;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.hero-image-placeholder > strong {
  color: #193c2a;
  font-size: 1.65rem;
  line-height: 1.25;
  letter-spacing: -0.04em;
}

.visual-caption {
  margin-top: 10px;
  color: #52725e;
  font-size: 0.82rem;
  line-height: 1.6;
}

.floating-card {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: calc(100% - 8px);
  padding: 13px 16px;
  border: 1px solid rgba(230, 237, 232, 0.9);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 12px 35px rgba(25, 60, 42, 0.1);
  animation: float 5s ease-in-out infinite;
}

.floating-top {
  top: 28px;
  left: -12px;
}

.floating-bottom {
  right: -12px;
  bottom: 30px;
  animation-delay: -2.5s;
}

.floating-card > span:last-child {
  display: grid;
  gap: 4px;
}

.floating-card strong {
  font-size: 0.82rem;
}

.floating-card small {
  color: #6b7280;
  font-size: 0.7rem;
}

.floating-icon,
.floating-check {
  display: grid;
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
  place-items: center;
  border-radius: 11px;
  background: #e7f6ec;
  color: #16845b;
  font-size: 1.35rem;
  font-weight: 700;
}

/* Section headings */
.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.text-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 0 0 auto;
  color: var(--color-primary, #16845b);
  font-size: 0.88rem;
  font-weight: 700;
  text-decoration: none;
  transition: gap 0.2s ease;
}

.text-link:hover {
  gap: 13px;
}

.text-link span {
  font-size: 1.15rem;
}

/* Popular locations */
.popular-locations {
  padding-top: 64px;
  padding-bottom: 64px;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.location-grid {
  margin-top: 26px;
}

.loc {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  padding: 20px;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 15px;
  background: #fff;
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;
}

.loc:hover {
  transform: translateY(-4px);
  border-color: #b8ddc6;
  box-shadow: 0 12px 28px rgba(30, 75, 48, 0.07);
}

.location-icon {
  display: grid;
  width: 46px;
  height: 46px;
  flex: 0 0 46px;
  place-items: center;
  border-radius: 13px;
  background: #edf8f0;
  color: #16845b;
  font-size: 1.7rem;
}

.location-info {
  display: grid;
  min-width: 0;
  gap: 5px;
}

.location-name {
  overflow-wrap: anywhere;
  font-size: 0.95rem;
  font-weight: 700;
}

.location-city {
  font-size: 0.76rem;
}

.location-arrow {
  margin-left: auto;
  color: #9ca3af;
  transition: transform 0.2s ease;
}

.loc:hover .location-arrow {
  color: var(--color-primary, #16845b);
  transform: translate(2px, -2px);
}

/* Properties and soft sections */
.section-soft {
  background: #f7f9f7;
  border-top: 1px solid #edf0ed;
  border-bottom: 1px solid #edf0ed;
}

.property-section {
  min-width: 0;
}

.browse-action {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

.browse-action .btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 46px;
  padding: 12px 22px;
  border-radius: 10px;
}

/* How it works */
.center-heading {
  max-width: 650px;
  margin: 0 auto 36px;
  text-align: center;
}

.center-heading .section-description {
  margin-right: auto;
  margin-left: auto;
}

.steps-grid {
  margin-top: 30px;
}

.step-card {
  min-width: 0;
  padding: 25px;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 16px;
  background: #fff;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
}

.step-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.05);
}

.step-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.step-number {
  display: grid;
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  place-items: center;
  border-radius: 13px;
  background: #e8f5ed;
  color: #16845b;
  font-size: 0.9rem;
  font-weight: 800;
}

.step-line {
  width: 34px;
  height: 2px;
  background: #d9eadf;
}

.step-card p {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.8;
}

/* Platform benefits */
.benefits-section {
  padding-top: 72px !important;
  padding-bottom: 76px !important;
}

.benefits-grid {
  margin-top: 36px;
}

.benefit-card {
  min-width: 0;
  padding: 28px;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 16px;
  background: #fff;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
}

.benefit-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
}

.benefit-icon {
  display: grid;
  width: 48px;
  height: 48px;
  margin-bottom: 22px;
  place-items: center;
  border-radius: 14px;
  font-size: 1.3rem;
  font-weight: 800;
}

.icon-green {
  background: #e7f7ec;
  color: #16845b;
}

.icon-blue {
  background: #eaf2ff;
  color: #3867c8;
}

.icon-purple {
  background: #f1eaff;
  color: #8055c5;
}

.benefit-card p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.85;
}

/* Landlord call to action */
.cta-section {
  padding: 12px 0 72px;
}

.cta-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  min-height: 280px;
  padding: clamp(28px, 5vw, 56px);
  overflow: hidden;
  border-radius: 24px;
  background: linear-gradient(115deg, #126b47, #19865a);
  color: #fff;
}

.cta-content {
  position: relative;
  z-index: 1;
  max-width: 580px;
}

.cta-label {
  display: inline-block;
  margin-bottom: 16px;
  color: #d1f4dd;
  font-size: 0.73rem;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.cta-card h2 {
  color: #fff;
  font-size: clamp(1.8rem, 3.4vw, 2.7rem);
}

.cta-card p {
  max-width: 52ch;
  margin: 14px 0 24px;
  color: #e1f3e8;
  font-size: 0.95rem;
  line-height: 1.8;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 48px;
  padding: 13px 22px;
  border: 1px solid #fff;
  border-radius: 10px;
  background: #fff;
  color: #126b47;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.btn-cta:hover {
  transform: translateY(-2px);
  background: #effaf2;
}

.cta-decoration {
  position: relative;
  display: grid;
  width: 230px;
  height: 190px;
  flex: 0 0 230px;
  place-items: center;
}

.cta-house {
  position: relative;
  z-index: 1;
  display: grid;
  width: 135px;
  height: 135px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 7rem;
  line-height: 1;
  transform: rotate(-8deg);
}

.cta-circle {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.17);
  border-radius: 50%;
}

.circle-one {
  width: 185px;
  height: 185px;
}

.circle-two {
  width: 225px;
  height: 225px;
}

/* Motion */
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
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

/* Keyboard accessibility */
.home-page a:focus-visible {
  outline: 3px solid #78b99a;
  outline-offset: 4px;
}

/* Tablet */
@media (max-width: 1000px) {
  .hero-inner {
    grid-template-columns: minmax(0, 1fr) minmax(240px, 0.8fr);
    gap: 28px;
  }

  .hero h1 {
    font-size: clamp(2.4rem, 5vw, 3.5rem);
  }

  .grid-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cta-decoration {
    width: 180px;
    flex-basis: 180px;
  }
}

/* Small tablets and large phones */
@media (max-width: 700px) {
  .home-page .page {
    padding-top: 46px;
    padding-bottom: 46px;
  }

  .hero-inner {
    grid-template-columns: minmax(0, 1fr);
    gap: 30px;
    min-height: auto;
    padding-top: 48px;
    padding-bottom: 42px;
  }

  .hero h1 {
    max-width: 15ch;
    font-size: clamp(2.5rem, 8vw, 3.5rem);
  }

  .hero-visual {
    min-height: 310px;
  }

  .hero-image-placeholder {
    min-height: 310px;
  }

  .floating-top {
    left: 0;
  }

  .floating-bottom {
    right: 0;
  }

  .grid-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .section-heading {
    align-items: flex-start;
  }

  .cta-decoration {
    display: none;
  }

  .cta-section {
    padding-bottom: 46px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .home-page .page {
    padding-top: 36px;
    padding-bottom: 36px;
  }

  .hero-inner {
    padding-top: 36px;
    padding-bottom: 32px;
  }

  .hero-badge {
    margin-bottom: 20px;
    font-size: 0.72rem;
  }

  .hero h1 {
    font-size: clamp(2.25rem, 10vw, 3rem);
  }

  .lead {
    margin-top: 16px;
    font-size: 0.92rem;
  }

  .hero-trust {
    flex-direction: column;
    gap: 10px;
  }

  .hero-visual {
    min-height: 280px;
  }

  .hero-image-placeholder {
    min-height: 280px;
    padding: 24px;
    border-radius: 22px;
  }

  .house-symbol {
    top: 42px;
    width: 130px;
    height: 130px;
    font-size: 7rem;
  }

  .hero-image-placeholder > strong {
    font-size: 1.4rem;
  }

  .floating-card {
    gap: 8px;
    padding: 10px;
  }

  .floating-card strong {
    font-size: 0.72rem;
  }

  .floating-card small {
    font-size: 0.64rem;
  }

  .floating-icon,
  .floating-check {
    width: 32px;
    height: 32px;
    flex-basis: 32px;
  }

  .section-heading {
    flex-direction: column;
    gap: 14px;
    margin-bottom: 22px;
  }

  .grid-4,
  .grid-3 {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
  }

  .location-grid {
    margin-top: 20px;
  }

  .loc {
    padding: 16px;
  }

  .center-heading {
    margin-bottom: 26px;
    text-align: left;
  }

  .center-heading .section-description {
    margin-left: 0;
  }

  .step-card,
  .benefit-card {
    padding: 22px;
  }

  .step-top {
    margin-bottom: 18px;
  }

  .benefit-icon {
    margin-bottom: 16px;
  }

  .browse-action .btn {
    width: 100%;
  }

  .cta-card {
    min-height: auto;
    padding: 30px 24px;
    border-radius: 18px;
  }

  .cta-card h2 {
    font-size: 1.85rem;
  }

  .cta-card p {
    font-size: 0.9rem;
  }

  .btn-cta {
    width: 100%;
  }
}

/* Respect reduced-motion preferences */
@media (prefers-reduced-motion: reduce) {
  .home-page *,
  .home-page *::before,
  .home-page *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>