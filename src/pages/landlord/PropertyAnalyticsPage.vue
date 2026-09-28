<script setup>
const metrics = [
  { label: 'Views', value: '4.2K' },
  { label: 'Shortlist', value: '186' },
  { label: 'Applications', value: '34' },
  { label: 'Conversion', value: '18%' },
]
</script>

```vue
<template>
  <div class="page">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <span class="eyebrow">Property performance</span>
        <h1>Property analytics</h1>
        <p class="subtitle">
          Track important performance metrics for your property listing.
        </p>
      </div>

      <div class="analytics-badge">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 19V9M12 19V5M19 19v-7"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <span>Analytics</span>
      </div>
    </div>

    <!-- Metrics -->
    <div class="stats">
      <div
        v-for="item in metrics"
        :key="item.label"
        class="card stat-card"
      >
        <div class="stat-top">
          <div class="stat-icon">
            <svg
              v-if="
                String(item.label).toLowerCase().includes('view') ||
                String(item.label).toLowerCase().includes('visit')
              "
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M3.5 12s3.2-5 8.5-5 8.5 5 8.5 5-3.2 5-8.5 5-8.5-5-8.5-5Z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="2.3"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
              />
            </svg>

            <svg
              v-else-if="
                String(item.label).toLowerCase().includes('contact') ||
                String(item.label).toLowerCase().includes('inquir')
              "
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-5 4v-4.5A2.5 2.5 0 0 1 4 13.5Z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
              <path
                d="M8 8h8M8 11.5h5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>

            <svg
              v-else-if="
                String(item.label).toLowerCase().includes('save') ||
                String(item.label).toLowerCase().includes('favorite')
              "
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M12 20s-7-4.4-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.6 12 20 12 20Z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
            </svg>

            <svg
              v-else
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M5 19V9M12 19V5M19 19v-7"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <span class="metric-label">
            {{ item.label }}
          </span>
        </div>

        <strong>{{ item.value }}</strong>

        <div class="metric-footer">
          <span class="metric-line"></span>
          <span>Property metric</span>
        </div>
      </div>
    </div>

    <!-- Overview Card -->
    <div class="card overview">
      <div class="overview-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 19V9M12 19V5M19 19v-7"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <div>
        <span class="section-eyebrow">Performance overview</span>
        <h2>Property activity at a glance</h2>
        <p>
          Use these metrics to understand how your listing is performing
          and how visitors are interacting with it.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: clamp(20px, 3vw, 40px);
  background:
    radial-gradient(
      circle at 88% 4%,
      rgba(16, 185, 129, 0.08),
      transparent 28%
    ),
    radial-gradient(
      circle at 8% 92%,
      rgba(20, 184, 166, 0.06),
      transparent 30%
    ),
    #f6f8f7;
  color: #17221d;
}

/* =========================
   Header
========================= */

.page-header {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto 20px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.eyebrow {
  display: block;
  margin-bottom: 5px;
  color: #17845f;
  font-size: 10px;
  font-weight: 850;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.page-header h1 {
  margin: 0;
  color: #17221d;
  font-size: clamp(26px, 3vw, 35px);
  line-height: 1.1;
  font-weight: 850;
  letter-spacing: -0.04em;
}

.subtitle {
  margin: 7px 0 0;
  color: #7b8881;
  font-size: 12px;
  line-height: 1.5;
}

.analytics-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border: 1px solid #dceae3;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.84);
  color: #557066;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}

.analytics-badge svg {
  width: 17px;
  height: 17px;
  color: #17845f;
}

/* =========================
   Stats Grid
========================= */

.stats {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 15px;
}

.card {
  background: rgba(255, 255, 255, 0.97);
  border: 1px solid #e4ebe7;
  border-radius: 18px;
  box-shadow:
    0 14px 35px rgba(28, 53, 43, 0.05),
    0 3px 9px rgba(28, 53, 43, 0.03);
}

/* =========================
   Stat Card
========================= */

.stat-card {
  min-width: 0;
  min-height: 158px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  box-sizing: border-box;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: #d6e7df;
  box-shadow:
    0 18px 40px rgba(28, 53, 43, 0.07),
    0 5px 12px rgba(28, 53, 43, 0.035);
}

.stat-top {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stat-icon {
  width: 39px;
  height: 39px;
  flex: 0 0 39px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: #edf8f3;
  border: 1px solid #dceee6;
  color: #16805c;
}

.stat-icon svg {
  width: 19px;
  height: 19px;
}

.metric-label {
  min-width: 0;
  color: #65736b;
  font-size: 10px;
  font-weight: 750;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.stat-card strong {
  display: block;
  color: #17845f;
  font-size: clamp(24px, 2.4vw, 31px);
  line-height: 1;
  font-weight: 850;
  letter-spacing: -0.04em;
}

.metric-footer {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #9aa49f;
  font-size: 8px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.metric-line {
  width: 18px;
  height: 2px;
  border-radius: 999px;
  background: #61b892;
}

/* =========================
   Overview
========================= */

.overview {
  width: 100%;
  max-width: 1100px;
  margin: 18px auto 0;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-sizing: border-box;
}

.overview-icon {
  width: 46px;
  height: 46px;
  flex: 0 0 46px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: #f0f8f4;
  border: 1px solid #dfede6;
  color: #16805c;
}

.overview-icon svg {
  width: 22px;
  height: 22px;
}

.section-eyebrow {
  display: block;
  color: #17845f;
  font-size: 9px;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.overview h2 {
  margin: 4px 0 0;
  color: #2d3c34;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.overview p {
  max-width: 700px;
  margin: 5px 0 0;
  color: #849089;
  font-size: 10px;
  line-height: 1.55;
}

/* =========================
   Responsive
========================= */

@media (max-width: 1050px) {
  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .page {
    padding: 22px 18px;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .analytics-badge {
    display: none;
  }

  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .stat-card {
    min-height: 145px;
    padding: 15px;
  }

  .overview {
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .page {
    padding: 18px 14px;
  }

  .page-header h1 {
    font-size: 28px;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .stat-card {
    min-height: 135px;
  }

  .stat-card strong {
    font-size: 27px;
  }

  .overview {
    padding: 16px;
    border-radius: 16px;
  }

  .overview-icon {
    width: 40px;
    height: 40px;
    flex-basis: 40px;
    border-radius: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stat-card {
    transition: none;
  }
}
</style>