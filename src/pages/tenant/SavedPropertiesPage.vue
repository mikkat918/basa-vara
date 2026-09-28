<script setup>
import { onMounted } from 'vue'
import PropertyGrid from '../../components/property/PropertyGrid.vue'
import { usePropertyStore } from '../../stores/propertyStore'

const store = usePropertyStore()

onMounted(() => store.loadSaved(''))
</script>

```vue
<template>
  <div class="page saved-page">
    <!-- Page Header -->
    <header class="page-header">
      <div class="heading-copy">
        <span class="eyebrow">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6 3.75A2.25 2.25 0 0 1 8.25 1.5h7.5A2.25 2.25 0 0 1 18 3.75v17.1a.65.65 0 0 1-1.03.53L12 17.7l-4.97 3.68A.65.65 0 0 1 6 20.85V3.75Z"
            />
          </svg>
          Your shortlist
        </span>

        <h1>Saved properties</h1>

        <p class="subtitle">
          Keep your favorite properties in one place and come back to them
          whenever you're ready.
        </p>
      </div>

      <div class="saved-count">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6 3.75A2.25 2.25 0 0 1 8.25 1.5h7.5A2.25 2.25 0 0 1 18 3.75v17.1a.65.65 0 0 1-1.03.53L12 17.7l-4.97 3.68A.65.65 0 0 1 6 20.85V3.75Z"
          />
        </svg>
        <span>{{ store.saved?.length || 0 }} saved</span>
      </div>
    </header>

    <!-- Content -->
    <section class="saved-card">
      <div class="card-header">
        <div>
          <span class="section-label">My collection</span>
          <h2>Favorite homes</h2>
        </div>

        <div class="collection-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path
              d="M12 20.25S4.5 15.9 4.5 9.55A4.05 4.05 0 0 1 12 7.32a4.05 4.05 0 0 1 7.5 2.23c0 6.35-7.5 10.7-7.5 10.7Z"
            />
          </svg>
        </div>
      </div>

      <div class="property-content">
        <PropertyGrid
          :items="store.saved"
          :loading="store.loading"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.page.saved-page {
  min-height: 100%;
  box-sizing: border-box;
  padding: clamp(22px, 3vw, 42px);
  background:
    radial-gradient(
      circle at 92% 0%,
      rgba(24, 148, 103, 0.08),
      transparent 30%
    ),
    radial-gradient(
      circle at 0% 100%,
      rgba(24, 148, 103, 0.055),
      transparent 28%
    ),
    #f6f8f7;
}

/* Header */
.page-header {
  width: min(100%, 1400px);
  margin: 0 auto 24px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.heading-copy {
  min-width: 0;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 9px;
  color: #17845f;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.eyebrow svg {
  width: 15px;
  height: 15px;
  fill: currentColor;
}

.page-header h1 {
  margin: 0;
  color: #16211d;
  font-size: clamp(1.75rem, 3vw, 2.45rem);
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.035em;
}

.subtitle {
  max-width: 680px;
  margin: 10px 0 0;
  color: #69756f;
  font-size: 0.96rem;
  line-height: 1.65;
}

.saved-count {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid rgba(23, 132, 95, 0.14);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.86);
  color: #176f53;
  box-shadow: 0 5px 18px rgba(26, 48, 39, 0.05);
  font-size: 0.86rem;
  font-weight: 750;
  white-space: nowrap;
}

.saved-count svg {
  width: 17px;
  height: 17px;
  fill: currentColor;
}

/* Main Card */
.saved-card {
  width: min(100%, 1400px);
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid rgba(22, 37, 31, 0.07);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow:
    0 18px 50px rgba(24, 42, 35, 0.055),
    0 2px 8px rgba(24, 42, 35, 0.025);
}

.card-header {
  min-height: 76px;
  box-sizing: border-box;
  padding: 18px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  border-bottom: 1px solid #edf1ef;
  background: linear-gradient(
    180deg,
    rgba(249, 252, 250, 0.95),
    rgba(255, 255, 255, 0.96)
  );
}

.section-label {
  display: block;
  margin-bottom: 4px;
  color: #17845f;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.card-header h2 {
  margin: 0;
  color: #1c2923;
  font-size: 1.05rem;
  font-weight: 780;
}

.collection-icon {
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: rgba(23, 132, 95, 0.09);
  color: #17845f;
}

.collection-icon svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.property-content {
  padding: clamp(18px, 2.2vw, 28px);
}

/* Make the existing PropertyGrid fit naturally */
.property-content :deep(.property-grid) {
  width: 100%;
}

.property-content :deep(.empty-state) {
  min-height: 280px;
}

/* Tablet */
@media (max-width: 850px) {
  .page.saved-page {
    padding: 24px 18px;
  }

  .page-header {
    gap: 16px;
  }

  .saved-card {
    border-radius: 17px;
  }
}

/* Mobile */
@media (max-width: 620px) {
  .page.saved-page {
    padding: 18px 14px 28px;
  }

  .page-header {
    display: grid;
    gap: 14px;
    margin-bottom: 18px;
  }

  .saved-count {
    justify-self: start;
  }

  .card-header {
    padding: 16px;
  }

  .property-content {
    padding: 14px;
  }
}

@media (max-width: 420px) {
  .page.saved-page {
    padding: 14px 10px 22px;
  }

  .page-header h1 {
    font-size: 1.65rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .saved-card {
    border-radius: 15px;
  }

  .card-header {
    padding: 14px;
  }

  .collection-icon {
    width: 36px;
    height: 36px;
    flex-basis: 36px;
  }

  .property-content {
    padding: 10px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .saved-page *,
  .saved-page *::before,
  .saved-page *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>