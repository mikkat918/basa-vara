<script setup>
import { computed, onMounted } from 'vue'
import { useAdminStore } from '../../stores/adminStore'

const adminStore = useAdminStore()
const cards = computed(() => [
  { label: 'Total properties', value: 12 },
  { label: 'Active listings', value: 8 },
  { label: 'Pending listings', value: 2 },
  { label: 'Total views', value: 1460 },
])

onMounted(() => adminStore.loadOverview())
</script>

```vue
<template>
  <div class="page dashboard">
    <!-- Header -->
    <div class="page-header">
      <div>
        <span class="eyebrow">Landlord workspace</span>
        <h1>Landlord dashboard</h1>
        <p class="muted">
          Keep track of your properties, listings and rental activity.
        </p>
      </div>

      <div class="header-badge">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 21V9.5L12 3l8 6.5V21"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linejoin="round"
          />
          <path
            d="M8 21v-6h8v6M8 10h8"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
          />
        </svg>
        <span>Landlord account</span>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats">
      <div
        v-for="card in cards"
        :key="card.label"
        class="card stat-card"
      >
        <div class="stat-top">
          <div class="stat-icon">
            <svg
              v-if="card.label?.toLowerCase().includes('property')"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M4 21V9.5L12 3l8 6.5V21"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
              <path
                d="M8 21v-6h8v6M8 10h8"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>

            <svg
              v-else-if="card.label?.toLowerCase().includes('rent')"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M12 3v18M16 7.5c0-1.7-1.7-3-4-3s-4 1.3-4 3 1.7 3 4 3 4 1.3 4 3-1.7 3-4 3-4-1.3-4-3"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>

            <svg
              v-else-if="card.label?.toLowerCase().includes('tenant')"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                cx="9"
                cy="8"
                r="3"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
              />
              <path
                d="M3 20v-1.5A4.5 4.5 0 0 1 7.5 14h3A4.5 4.5 0 0 1 15 18.5V20"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
              <path
                d="M16 11a3 3 0 1 0 0-6M16 14a4.5 4.5 0 0 1 4.5 4.5V20"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>

            <svg
              v-else
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M12 3v18M16 7.5c0-1.7-1.7-3-4-3s-4 1.3-4 3 1.7 3 4 3 4 1.3 4 3-1.7 3-4 3-4-1.3-4-3"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <span class="stat-dot"></span>
        </div>

        <div class="stat-content">
          <span>{{ card.label }}</span>
          <strong>{{ card.value }}</strong>
        </div>
      </div>
    </div>

    <!-- Overview -->
    <div class="overview-card card">
      <div class="overview-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 19V5M4 19h16"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
          />
          <path
            d="m7 15 4-4 3 2 5-6"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <div>
        <span class="overview-label">Dashboard overview</span>
        <h2>Manage your rental business</h2>
        <p>
          Use the information above to monitor your current activity and
          keep your listings up to date.
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

.dashboard {
  display: grid;
  gap: 20px;
}

/* =========================
   Header
========================= */

.page-header {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
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
  font-size: clamp(25px, 3vw, 34px);
  line-height: 1.1;
  font-weight: 850;
  letter-spacing: -0.04em;
}

.muted {
  color: #7b8881;
}

.page-header p {
  margin: 6px 0 0;
  font-size: 12px;
}

.header-badge {
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

.header-badge svg {
  width: 17px;
  height: 17px;
  color: #17845f;
}

/* =========================
   Stats
========================= */

.stats {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.card {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #e4ebe7;
  border-radius: 18px;
  box-shadow:
    0 16px 45px rgba(28, 53, 43, 0.05),
    0 3px 10px rgba(28, 53, 43, 0.03);
}

.stat-card {
  min-width: 0;
  min-height: 145px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.stat-card::after {
  content: "";
  position: absolute;
  width: 90px;
  height: 90px;
  right: -38px;
  bottom: -42px;
  border-radius: 50%;
  background: rgba(23, 132, 95, 0.055);
  pointer-events: none;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: #d7e7df;
  box-shadow:
    0 20px 42px rgba(28, 53, 43, 0.07),
    0 4px 12px rgba(28, 53, 43, 0.04);
}

.stat-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #edf8f3;
  border: 1px solid #dceee6;
  color: #16805c;
}

.stat-icon svg {
  width: 21px;
  height: 21px;
}

.stat-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #42a982;
  box-shadow: 0 0 0 4px rgba(66, 169, 130, 0.1);
}

.stat-content {
  position: relative;
  z-index: 1;
}

.stat-content span {
  display: block;
  margin-bottom: 5px;
  color: #7d8a83;
  font-size: 10px;
  font-weight: 750;
}

.stat-content strong {
  display: block;
  color: #17845f;
  font-size: clamp(22px, 2.4vw, 28px);
  line-height: 1;
  font-weight: 850;
  letter-spacing: -0.04em;
}

/* =========================
   Overview
========================= */

.overview-card {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 22px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 15px;
}

.overview-icon {
  width: 46px;
  height: 46px;
  flex: 0 0 46px;
  display: grid;
  place-items: center;
  border-radius: 13px;
  background: #edf8f3;
  border: 1px solid #dceee6;
  color: #16805c;
}

.overview-icon svg {
  width: 22px;
  height: 22px;
}

.overview-label {
  display: block;
  margin-bottom: 3px;
  color: #17845f;
  font-size: 9px;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.overview-card h2 {
  margin: 0;
  color: #2d3c34;
  font-size: 15px;
  font-weight: 800;
}

.overview-card p {
  margin: 5px 0 0;
  color: #89958f;
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

  .header-badge {
    display: none;
  }

  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .stat-card {
    min-height: 130px;
    padding: 17px;
  }

  .overview-card {
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .page {
    padding: 18px 14px;
  }

  .page-header h1 {
    font-size: 27px;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .stat-card {
    min-height: 125px;
  }

  .overview-card {
    padding: 18px;
    flex-direction: column;
  }

  .overview-icon {
    width: 40px;
    height: 40px;
    flex-basis: 40px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stat-card {
    transition: none;
  }
}
</style>