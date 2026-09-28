<script setup>
import { onMounted, ref } from 'vue'
import { adminService } from '../../services/adminService'
import { useAuthStore } from '../../stores/authStore'
import { useUiStore } from '../../stores/uiStore'

const auth = useAuthStore()
const ui = useUiStore()

const analytics = ref(null)
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    analytics.value = await adminService.analytics()
  } finally {
    loading.value = false
  }
})

const SERIES_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
</script>

```vue
<template>
  <div class="analytics-page">
    <!-- Header -->
    <header class="analytics-header">
      <div>
        <div class="eyebrow">
          <span class="eyebrow-dot"></span>
          PLATFORM ANALYTICS
        </div>

        <h1>Analytics</h1>
        <p>
          Platform-wide performance and usage metrics.
        </p>
      </div>

      <div class="header-badge">
        <span class="live-dot"></span>
        Live overview
      </div>
    </header>

    <!-- Loading -->
    <div v-if="loading" class="analytics-content">
      <div class="stats">
        <div
          v-for="i in 8"
          :key="i"
          class="card stat-card skeleton-card"
        >
          <div class="skeleton-icon"></div>
          <div class="skeleton-number"></div>
          <div class="skeleton-label"></div>
        </div>
      </div>

      <div class="panels">
        <div class="card panel skeleton-panel"></div>
        <div class="card panel skeleton-panel"></div>
      </div>

      <div class="card panel skeleton-summary"></div>
    </div>

    <!-- Analytics -->
    <template v-else-if="analytics">
      <main class="analytics-content">

        <!-- KPI Cards -->
        <section class="stats">
          <div class="card stat-card">
            <div class="stat-top">
              <div class="stat-icon users-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <span class="stat-trend positive">Users</span>
            </div>

            <strong>{{ analytics.users?.toLocaleString() }}</strong>
            <span class="stat-label">Total users</span>
          </div>

          <div class="card stat-card">
            <div class="stat-top">
              <div class="stat-icon home-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 10.5 12 3l9 7.5"/>
                  <path d="M5 9.5V21h14V9.5"/>
                  <path d="M9 21v-6h6v6"/>
                </svg>
              </div>
              <span class="stat-trend">Owners</span>
            </div>

            <strong>{{ analytics.landlords?.toLocaleString() }}</strong>
            <span class="stat-label">Landlords</span>
          </div>

          <div class="card stat-card">
            <div class="stat-top">
              <div class="stat-icon search-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7"/>
                  <path d="m20 20-4-4"/>
                </svg>
              </div>
              <span class="stat-trend">Demand</span>
            </div>

            <strong>{{ analytics.tenants?.toLocaleString() }}</strong>
            <span class="stat-label">Tenants</span>
          </div>

          <div class="card stat-card">
            <div class="stat-top">
              <div class="stat-icon property-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="3" width="16" height="18" rx="2"/>
                  <path d="M8 7h8"/>
                  <path d="M8 11h2"/>
                  <path d="M14 11h2"/>
                  <path d="M8 15h2"/>
                  <path d="M14 15h2"/>
                  <path d="M8 19h8"/>
                </svg>
              </div>
              <span class="stat-trend">Listings</span>
            </div>

            <strong>{{ analytics.properties?.toLocaleString() }}</strong>
            <span class="stat-label">Properties</span>
          </div>

          <div class="card stat-card">
            <div class="stat-top">
              <div class="stat-icon views-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <span class="stat-trend">Traffic</span>
            </div>

            <strong>{{ analytics.views?.toLocaleString() }}</strong>
            <span class="stat-label">Total views</span>
          </div>

          <div class="card stat-card">
            <div class="stat-top">
              <div class="stat-icon chat-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 9.5 9.5 0 0 1-4-.9L3 21l1.9-4.7A8.2 8.2 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z"/>
                </svg>
              </div>
              <span class="stat-trend">Engagement</span>
            </div>

            <strong>{{ analytics.chats?.toLocaleString() }}</strong>
            <span class="stat-label">Conversations</span>
          </div>

          <div class="card stat-card">
            <div class="stat-top">
              <div class="stat-icon unlock-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="10" width="16" height="11" rx="2"/>
                  <path d="M8 10V7a4 4 0 0 1 7.5-2"/>
                  <circle cx="12" cy="15.5" r="1"/>
                  <path d="M12 16.5v2"/>
                </svg>
              </div>
              <span class="stat-trend">Contacts</span>
            </div>

            <strong>{{ analytics.unlocks?.toLocaleString() }}</strong>
            <span class="stat-label">Contact unlocks</span>
          </div>

          <div class="card stat-card revenue-card">
            <div class="stat-top">
              <div class="stat-icon coin-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="8"/>
                  <path d="M12 7v10"/>
                  <path d="M15 9.5c-.6-.8-1.5-1.2-3-1.2-1.5 0-2.5.7-2.5 1.7 0 2.8 5.5 1 5.5 3.8 0 1.1-1 1.9-2.8 1.9-1.4 0-2.5-.5-3.2-1.4"/>
                </svg>
              </div>
              <span class="stat-trend revenue">Revenue</span>
            </div>

            <strong>{{ analytics.coinSales?.toLocaleString() }}</strong>
            <span class="stat-label">Coins sold</span>
          </div>
        </section>

        <!-- Main Panels -->
        <section class="panels">

          <!-- Revenue -->
          <div class="card panel revenue-panel">
            <div class="panel-header">
              <div>
                <span class="panel-eyebrow">FINANCIAL OVERVIEW</span>
                <h2>Revenue</h2>
              </div>

              <div class="panel-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M3 3v18h18"/>
                  <path d="m7 16 4-5 3 3 6-8"/>
                </svg>
              </div>
            </div>

            <div class="kpi">
              <strong class="kpi-value">
                ৳{{ analytics.revenue?.toLocaleString() }}
              </strong>
              <span>
                Total platform revenue from coin purchases
              </span>
            </div>

            <div
              v-if="analytics.series?.revenue?.length"
              class="chart-area"
            >
              <div class="chart-grid">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div class="mini-chart">
                <div
                  v-for="(val, i) in analytics.series.revenue"
                  :key="i"
                  class="bar-wrap"
                >
                  <div class="bar-value">
                    {{ val?.toLocaleString() }}
                  </div>

                  <div
                    class="bar"
                    :style="{
                      height: `${Math.max(
                        5,
                        (val / Math.max(...analytics.series.revenue)) * 100
                      )}%`
                    }"
                  ></div>

                  <span>{{ SERIES_LABELS[i] }}</span>
                </div>
              </div>
            </div>

            <div
              v-else
              class="empty-chart"
            >
              No revenue trend data available.
            </div>
          </div>

          <!-- User Growth -->
          <div class="card panel">
            <div class="panel-header">
              <div>
                <span class="panel-eyebrow">AUDIENCE</span>
                <h2>User growth</h2>
              </div>

              <div class="panel-icon teal">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 19V5"/>
                  <path d="M4 19h17"/>
                  <path d="m7 15 4-4 3 2 5-6"/>
                </svg>
              </div>
            </div>

            <div
              v-if="analytics.series?.users?.length"
              class="chart-area growth-chart"
            >
              <div class="chart-grid">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div class="mini-chart">
                <div
                  v-for="(val, i) in analytics.series.users"
                  :key="i"
                  class="bar-wrap"
                >
                  <div class="bar-value">
                    {{ val?.toLocaleString() }}
                  </div>

                  <div
                    class="bar bar-teal"
                    :style="{
                      height: `${Math.max(
                        5,
                        (val / Math.max(...analytics.series.users)) * 100
                      )}%`
                    }"
                  ></div>

                  <span>{{ SERIES_LABELS[i] }}</span>
                </div>
              </div>
            </div>

            <div
              v-else
              class="empty-chart"
            >
              No user growth data available.
            </div>
          </div>
        </section>

        <!-- Activity -->
        <section class="card panel activity-panel">
          <div class="panel-header">
            <div>
              <span class="panel-eyebrow">PLATFORM ACTIVITY</span>
              <h2>Activity summary</h2>
            </div>

            <div class="panel-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M8 6h13"/>
                <path d="M8 12h13"/>
                <path d="M8 18h13"/>
                <path d="M3 6h.01"/>
                <path d="M3 12h.01"/>
                <path d="M3 18h.01"/>
              </svg>
            </div>
          </div>

          <ul class="summary-list">
            <li>
              <div class="summary-info">
                <span class="summary-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16"/>
                    <path d="M8 7h2"/>
                    <path d="M14 7h2"/>
                    <path d="M8 11h2"/>
                    <path d="M14 11h2"/>
                  </svg>
                </span>
                <span>Total properties</span>
              </div>
              <strong>{{ analytics.properties?.toLocaleString() }}</strong>
            </li>

            <li>
              <div class="summary-info">
                <span class="summary-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M20.8 8.8c0 5.5-8.8 10.2-8.8 10.2S3.2 14.3 3.2 8.8A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z"/>
                  </svg>
                </span>
                <span>Saved properties</span>
              </div>
              <strong>{{ analytics.saved?.toLocaleString() }}</strong>
            </li>

            <li>
              <div class="summary-info">
                <span class="summary-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.5 9.5 0 0 1-4-.9L3 21l1.9-4.7A8.2 8.2 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z"/>
                  </svg>
                </span>
                <span>Active conversations</span>
              </div>
              <strong>{{ analytics.chats?.toLocaleString() }}</strong>
            </li>

            <li>
              <div class="summary-info">
                <span class="summary-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="10" width="16" height="11" rx="2"/>
                    <path d="M8 10V7a4 4 0 0 1 7.5-2"/>
                  </svg>
                </span>
                <span>Contact unlocks</span>
              </div>
              <strong>{{ analytics.unlocks?.toLocaleString() }}</strong>
            </li>

            <li>
              <div class="summary-info">
                <span class="summary-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 3 4 6v5c0 5.2 3.4 8.8 8 10 4.6-1.2 8-4.8 8-10V6l-8-3Z"/>
                    <path d="M12 8v4"/>
                    <path d="M12 16h.01"/>
                  </svg>
                </span>
                <span>Open reports</span>
              </div>
              <strong>{{ analytics.reports?.toLocaleString() }}</strong>
            </li>
          </ul>
        </section>

      </main>
    </template>
  </div>
</template>

<style scoped>
.analytics-page {
  min-height: 100%;
  padding: clamp(24px, 4vw, 48px);
  background:
    radial-gradient(circle at 8% 0%, rgba(22, 163, 74, 0.08), transparent 28%),
    radial-gradient(circle at 95% 10%, rgba(14, 165, 233, 0.06), transparent 25%),
    #f6f8f7;
  box-sizing: border-box;
}

/* Header */

.analytics-header {
  max-width: 1500px;
  margin: 0 auto 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
}

.eyebrow,
.panel-eyebrow {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--color-primary);
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.eyebrow-dot,
.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.1);
}

.analytics-header h1 {
  margin: 0;
  font-size: clamp(2rem, 3vw, 2.8rem);
  line-height: 1.05;
  color: #17221d;
  letter-spacing: -0.04em;
}

.analytics-header p {
  margin: 10px 0 0;
  color: var(--color-muted);
  font-size: 0.95rem;
}

.header-badge {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 13px;
  border: 1px solid rgba(22, 163, 74, 0.15);
  background: rgba(255, 255, 255, 0.85);
  border-radius: 999px;
  color: #41604e;
  font-size: 0.78rem;
  font-weight: 700;
  white-space: nowrap;
}

/* Content */

.analytics-content {
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
}

/* Stats */

.stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  min-width: 0;
  padding: 20px;
  border: 1px solid rgba(20, 40, 30, 0.07);
  background: rgba(255, 255, 255, 0.92);
  border-radius: 16px;
  box-shadow: 0 7px 24px rgba(25, 45, 35, 0.055);
  display: grid;
  gap: 5px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
  border-color: rgba(22, 163, 74, 0.16);
  box-shadow: 0 14px 30px rgba(25, 45, 35, 0.09);
}

.stat-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.stat-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: rgba(22, 163, 74, 0.09);
}

.stat-icon svg,
.panel-icon svg,
.summary-icon svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.users-icon { color: #16834a; }
.home-icon { color: #0d9488; background: rgba(13, 148, 136, 0.09); }
.search-icon { color: #2563eb; background: rgba(37, 99, 235, 0.09); }
.property-icon { color: #7c3aed; background: rgba(124, 58, 237, 0.09); }
.views-icon { color: #0891b2; background: rgba(8, 145, 178, 0.09); }
.chat-icon { color: #db2777; background: rgba(219, 39, 119, 0.09); }
.unlock-icon { color: #d97706; background: rgba(217, 119, 6, 0.09); }
.coin-icon { color: #ca8a04; background: rgba(202, 138, 4, 0.1); }

.stat-card strong {
  color: #17221d;
  font-size: 1.75rem;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.stat-label {
  color: var(--color-muted);
  font-size: 0.78rem;
}

.stat-trend {
  padding: 4px 8px;
  border-radius: 999px;
  background: #f2f5f3;
  color: #66736c;
  font-size: 0.62rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.stat-trend.positive,
.stat-trend.revenue {
  background: rgba(22, 163, 74, 0.08);
  color: var(--color-primary);
}

/* Panels */

.panels {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.panel {
  min-width: 0;
  padding: 24px;
  border: 1px solid rgba(20, 40, 30, 0.07);
  background: rgba(255, 255, 255, 0.94);
  border-radius: 18px;
  box-shadow: 0 7px 24px rgba(25, 45, 35, 0.055);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.panel h2 {
  margin: 5px 0 0;
  color: #17221d;
  font-size: 1.15rem;
  letter-spacing: -0.02em;
}

.panel-icon {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  color: var(--color-primary);
  background: rgba(22, 163, 74, 0.09);
  border-radius: 11px;
}

.panel-icon.teal {
  color: var(--color-info);
  background: rgba(14, 165, 164, 0.09);
}

.kpi {
  margin-top: 20px;
  display: grid;
  gap: 5px;
}

.kpi-value {
  font-size: clamp(1.8rem, 3vw, 2.35rem);
  line-height: 1;
  color: var(--color-primary);
  letter-spacing: -0.04em;
}

.kpi span {
  color: var(--color-muted);
  font-size: 0.78rem;
}

/* Chart */

.chart-area {
  position: relative;
  height: 190px;
  margin-top: 22px;
  padding-top: 20px;
}

.chart-grid {
  position: absolute;
  inset: 20px 0 30px;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  pointer-events: none;
}

.chart-grid span {
  border-top: 1px dashed rgba(80, 100, 90, 0.12);
}

.mini-chart {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: flex-end;
  gap: clamp(5px, 1vw, 10px);
}

.bar-wrap {
  flex: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
}

.bar {
  width: min(100%, 34px);
  min-height: 5px;
  background: linear-gradient(
    to top,
    var(--color-primary),
    rgba(22, 163, 74, 0.55)
  );
  border-radius: 7px 7px 3px 3px;
  transition: height 0.45s ease;
}

.bar-teal {
  background: linear-gradient(
    to top,
    var(--color-info),
    rgba(14, 165, 164, 0.5)
  );
}

.bar-value {
  min-height: 14px;
  font-size: 0.58rem;
  color: #758079;
  white-space: nowrap;
}

.bar-wrap > span {
  color: var(--color-muted);
  font-size: 0.62rem;
  white-space: nowrap;
}

.empty-chart {
  margin-top: 28px;
  min-height: 120px;
  display: grid;
  place-items: center;
  border: 1px dashed var(--color-border);
  border-radius: 12px;
  color: var(--color-muted);
  font-size: 0.8rem;
}

/* Activity */

.activity-panel {
  margin-bottom: 0;
}

.summary-list {
  list-style: none;
  padding: 0;
  margin: 6px 0 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 32px;
}

.summary-list li {
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid var(--color-border);
}

.summary-info {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 11px;
  color: #445149;
  font-size: 0.88rem;
}

.summary-icon {
  flex: 0 0 auto;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  color: var(--color-primary);
  background: rgba(22, 163, 74, 0.07);
  border-radius: 9px;
}

.summary-icon svg {
  width: 17px;
  height: 17px;
}

.summary-list strong {
  color: #17221d;
  font-size: 0.95rem;
  white-space: nowrap;
}

/* Skeleton */

.skeleton-card {
  overflow: hidden;
}

.skeleton-icon,
.skeleton-number,
.skeleton-label {
  position: relative;
  overflow: hidden;
  background: #edf1ee;
  border-radius: 8px;
}

.skeleton-icon {
  width: 42px;
  height: 42px;
  margin-bottom: 10px;
}

.skeleton-number {
  width: 80px;
  height: 27px;
}

.skeleton-label {
  width: 100px;
  height: 12px;
}

.skeleton-icon::after,
.skeleton-number::after,
.skeleton-label::after,
.skeleton-panel::after,
.skeleton-summary::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.7),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

.skeleton-panel,
.skeleton-summary {
  position: relative;
  min-height: 300px;
  overflow: hidden;
}

.skeleton-summary {
  min-height: 260px;
  margin-bottom: 0;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* Responsive */

@media (max-width: 1200px) {
  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 850px) {
  .analytics-page {
    padding: 24px 18px;
  }

  .analytics-header {
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 24px;
  }

  .panels {
    grid-template-columns: 1fr;
  }

  .summary-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .analytics-page {
    padding: 20px 14px;
  }

  .stats {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .stat-card {
    padding: 15px;
    border-radius: 13px;
  }

  .stat-card strong {
    font-size: 1.35rem;
  }

  .stat-icon {
    width: 36px;
    height: 36px;
  }

  .stat-icon svg {
    width: 18px;
    height: 18px;
  }

  .stat-trend {
    display: none;
  }

  .panel {
    padding: 18px;
    border-radius: 15px;
  }

  .chart-area {
    height: 165px;
  }

  .bar-value {
    display: none;
  }
}

@media (max-width: 380px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .analytics-header h1 {
    font-size: 1.9rem;
  }

  .header-badge {
    font-size: 0.7rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stat-card,
  .bar {
    transition: none;
  }

  .skeleton-icon::after,
  .skeleton-number::after,
  .skeleton-label::after,
  .skeleton-panel::after,
  .skeleton-summary::after {
    animation: none;
  }
}
</style>