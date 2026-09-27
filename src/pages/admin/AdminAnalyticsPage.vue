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

<template>
  <div class="page">
    <h1>Analytics</h1>
    <p class="muted" style="margin-top:4px;margin-bottom:24px">Platform-wide performance and usage metrics.</p>

    <div v-if="loading">
      <div class="stats">
        <div v-for="i in 8" :key="i" class="card stat-card skeleton" style="height:100px"></div>
      </div>
    </div>

    <template v-else-if="analytics">
      <div class="stats">
        <div class="card stat-card">
          <span class="stat-icon">👤</span>
          <strong>{{ analytics.users?.toLocaleString() }}</strong>
          <span>Total users</span>
        </div>
        <div class="card stat-card">
          <span class="stat-icon">🏠</span>
          <strong>{{ analytics.landlords?.toLocaleString() }}</strong>
          <span>Landlords</span>
        </div>
        <div class="card stat-card">
          <span class="stat-icon">🔍</span>
          <strong>{{ analytics.tenants?.toLocaleString() }}</strong>
          <span>Tenants</span>
        </div>
        <div class="card stat-card">
          <span class="stat-icon">📋</span>
          <strong>{{ analytics.properties?.toLocaleString() }}</strong>
          <span>Properties</span>
        </div>
        <div class="card stat-card">
          <span class="stat-icon">👁️</span>
          <strong>{{ analytics.views?.toLocaleString() }}</strong>
          <span>Total views</span>
        </div>
        <div class="card stat-card">
          <span class="stat-icon">💬</span>
          <strong>{{ analytics.chats?.toLocaleString() }}</strong>
          <span>Conversations</span>
        </div>
        <div class="card stat-card">
          <span class="stat-icon">🔓</span>
          <strong>{{ analytics.unlocks?.toLocaleString() }}</strong>
          <span>Contact unlocks</span>
        </div>
        <div class="card stat-card">
          <span class="stat-icon">🪙</span>
          <strong>{{ analytics.coinSales?.toLocaleString() }}</strong>
          <span>Coins sold</span>
        </div>
      </div>

      <div class="panels">
        <div class="card panel">
          <h2>Revenue</h2>
          <div class="kpi">
            <strong class="kpi-value">৳{{ analytics.revenue?.toLocaleString() }}</strong>
            <span class="muted">Total platform revenue from coin purchases</span>
          </div>
          <div v-if="analytics.series?.revenue" class="mini-chart">
            <div v-for="(val, i) in analytics.series.revenue" :key="i" class="bar-wrap">
              <div class="bar" :style="{ height: `${(val / Math.max(...analytics.series.revenue)) * 100}%` }"></div>
              <span>{{ SERIES_LABELS[i] }}</span>
            </div>
          </div>
        </div>
        <div class="card panel">
          <h2>User growth</h2>
          <div v-if="analytics.series?.users" class="mini-chart">
            <div v-for="(val, i) in analytics.series.users" :key="i" class="bar-wrap">
              <div class="bar bar-teal" :style="{ height: `${(val / Math.max(...analytics.series.users)) * 100}%` }"></div>
              <span>{{ SERIES_LABELS[i] }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card panel">
        <h2>Activity summary</h2>
        <ul class="summary-list">
          <li><span>Total properties</span><strong>{{ analytics.properties }}</strong></li>
          <li><span>Saved properties</span><strong>{{ analytics.saved }}</strong></li>
          <li><span>Active conversations</span><strong>{{ analytics.chats }}</strong></li>
          <li><span>Contact unlocks</span><strong>{{ analytics.unlocks }}</strong></li>
          <li><span>Open reports</span><strong>{{ analytics.reports }}</strong></li>
        </ul>
      </div>
    </template>
  </div>
</template>

<style scoped>
.stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-bottom: 24px; }
.stat-card { padding: 20px; display: grid; gap: 4px; text-align: center; }
.stat-icon { font-size: 1.4rem; }
.stat-card strong { font-size: 1.6rem; color: var(--color-primary); }
.stat-card span { font-size: 0.8rem; color: var(--color-muted); text-transform: uppercase; letter-spacing: 0.04em; }
.panels { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; margin-bottom: 24px; }
.panel { padding: 20px; display: grid; gap: 16px; }
.panel h2 { font-size: 1.1rem; }
.kpi { display: grid; gap: 4px; }
.kpi-value { font-size: 2rem; color: var(--color-primary); }
.mini-chart { display: flex; align-items: flex-end; gap: 6px; height: 100px; }
.bar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; height: 100%; justify-content: flex-end; }
.bar { width: 100%; background: var(--color-primary); border-radius: 4px 4px 0 0; min-height: 4px; transition: height 0.4s ease; }
.bar-teal { background: var(--color-info); }
.bar-wrap span { font-size: 0.65rem; color: var(--color-muted); white-space: nowrap; }
.summary-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
.summary-list li { display: flex; justify-content: space-between; gap: 8px; border-bottom: 1px solid var(--color-border); padding-bottom: 8px; }
@media (max-width: 1024px) { .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 768px) { .panels { grid-template-columns: 1fr; } .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 480px) { .stats { grid-template-columns: 1fr; } }
</style>
