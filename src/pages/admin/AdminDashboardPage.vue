<script setup>
import { computed, onMounted } from 'vue'
import { useAdminStore } from '../../stores/adminStore'
import { useAuthStore } from '../../stores/authStore'
import { useRouter } from 'vue-router'
import { adminService } from '../../services/adminService'

const adminStore = useAdminStore()
const auth = useAuthStore()
const router = useRouter()

onMounted(() => adminStore.loadOverview())

const stats = computed(() => [
  { label: 'Total users', value: adminStore.overview?.totalUsers ?? '—', icon: '👤', color: 'blue' },
  { label: 'Active landlords', value: adminStore.overview?.activeLandlords ?? '—', icon: '🏠', color: 'green' },
  { label: 'Active listings', value: adminStore.overview?.activeProperties ?? '—', icon: '📋', color: 'teal' },
  { label: 'Pending approvals', value: adminStore.overview?.pendingApprovals ?? '—', icon: '⏳', color: 'orange' },
  { label: 'Open reports', value: adminStore.overview?.openReports ?? '—', icon: '⚠️', color: 'red' },
  { label: 'Coin sales total', value: adminStore.overview?.totalCoinSales ?? '—', icon: '🪙', color: 'yellow' },
])

const pending = computed(() => adminStore.overview?.pending || [])
const recentActivity = computed(() => adminStore.overview?.recentActivity || [])
const reports = computed(() => adminStore.overview?.reports || [])

async function approveProperty(id) {
  try {
    await adminService.approve(id, auth.user?.id)
    await adminStore.loadOverview()
  } catch (e) {
    console.error(e)
  }
}

function fmt(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-BD', { dateStyle: 'medium', timeStyle: 'short' })
}
</script>

<template>
  <div class="page dashboard">
    <div class="page-header">
      <div>
        <h1>Admin dashboard</h1>
        <p class="muted">Platform overview and quick actions.</p>
      </div>
    </div>

    <div v-if="adminStore.loading" class="stats">
      <div v-for="i in 6" :key="i" class="card stat-card skeleton" style="height:100px"></div>
    </div>

    <div v-else class="stats">
      <div v-for="stat in stats" :key="stat.label" class="card stat-card">
        <div class="stat-icon">{{ stat.icon }}</div>
        <strong class="stat-value">{{ stat.value }}</strong>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>

    <div class="panels">
      <section class="card panel">
        <div class="panel-head">
          <h2>Pending approvals</h2>
          <button class="btn btn-secondary" type="button" @click="router.push('/admin/properties/pending')">View all</button>
        </div>
        <div v-if="!pending.length" class="empty-msg muted">No pending listings right now.</div>
        <ul v-else class="approval-list">
          <li v-for="p in pending.slice(0, 4)" :key="p.id" class="approval-item">
            <div class="approval-info">
              <strong>{{ p.title }}</strong>
              <span class="muted">{{ p.location?.area }}, {{ p.location?.district }}</span>
            </div>
            <div class="approval-actions">
              <span class="badge badge-warning">Pending</span>
              <button class="btn btn-secondary" type="button" @click="approveProperty(p.id)">Approve</button>
              <button class="btn btn-secondary" type="button" @click="router.push(`/admin/properties`)">View</button>
            </div>
          </li>
        </ul>
      </section>

      <section class="card panel">
        <div class="panel-head">
          <h2>Recent reports</h2>
          <button class="btn btn-secondary" type="button" @click="router.push('/admin/reports')">View all</button>
        </div>
        <div v-if="!reports.length" class="empty-msg muted">No reports to review.</div>
        <ul v-else class="report-list">
          <li v-for="r in reports" :key="r.id" class="report-item">
            <div>
              <strong>{{ r.category }}</strong>
              <p class="muted" style="margin-top:4px;font-size:0.9rem">{{ r.description?.slice(0, 80) }}{{ r.description?.length > 80 ? '…' : '' }}</p>
            </div>
            <span :class="['badge', r.status === 'open' ? 'badge-danger' : r.status === 'investigating' ? 'badge-warning' : 'badge-muted']">
              {{ r.status }}
            </span>
          </li>
        </ul>
      </section>
    </div>

    <section class="card panel">
      <div class="panel-head">
        <h2>Recent activity</h2>
        <button class="btn btn-secondary" type="button" @click="router.push('/admin/logs')">View logs</button>
      </div>
      <div v-if="!recentActivity.length" class="empty-msg muted">No recent admin activity.</div>
      <ul v-else class="activity-list">
        <li v-for="log in recentActivity" :key="log.id" class="activity-item">
          <span class="activity-dot"></span>
          <div>
            <strong>{{ log.action }}</strong>
            <span class="muted"> · {{ fmt(log.date) }}</span>
          </div>
        </li>
      </ul>
    </section>

    <div class="quick-links">
      <button class="card quick-link" type="button" @click="router.push('/admin/users')">
        <span>👤</span> Manage Users
      </button>
      <button class="card quick-link" type="button" @click="router.push('/admin/properties')">
        <span>🏘️</span> All Properties
      </button>
      <button class="card quick-link" type="button" @click="router.push('/admin/payments')">
        <span>💳</span> Payments
      </button>
      <button class="card quick-link" type="button" @click="router.push('/admin/analytics')">
        <span>📊</span> Analytics
      </button>
      <button class="card quick-link" type="button" @click="router.push('/admin/notifications')">
        <span>🔔</span> Notifications
      </button>
      <button class="card quick-link" type="button" @click="router.push('/admin/settings')">
        <span>⚙️</span> Settings
      </button>
    </div>
  </div>
</template>

<style scoped>
.dashboard { display: grid; gap: 24px; }
.page-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
.page-header p { margin-top: 4px; }
.stats {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 16px;
}
.stat-card {
  padding: 20px 16px;
  display: grid;
  gap: 6px;
  text-align: center;
}
.stat-icon { font-size: 1.5rem; }
.stat-value { font-size: 1.6rem; color: var(--color-primary); }
.stat-label { font-size: 0.8rem; color: var(--color-muted); text-transform: uppercase; letter-spacing: 0.04em; }
.panels { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
.panel { padding: 20px; }
.panel-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.panel-head h2 { font-size: 1.1rem; }
.empty-msg { padding: 12px 0; }
.approval-list, .report-list, .activity-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
.approval-item { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; border-bottom: 1px solid var(--color-border); padding-bottom: 10px; }
.approval-info { display: grid; gap: 2px; }
.approval-actions { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.report-item { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; border-bottom: 1px solid var(--color-border); padding-bottom: 10px; }
.activity-item { display: flex; align-items: center; gap: 12px; }
.activity-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-primary); flex-shrink: 0; }
.quick-links { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 12px; }
.quick-link { padding: 20px 12px; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; border: 0; font-weight: 600; font-size: 0.9rem; transition: transform 0.15s ease; }
.quick-link:hover { transform: translateY(-2px); }
.quick-link span { font-size: 1.5rem; }
@media (max-width: 1200px) { .stats { grid-template-columns: repeat(3, minmax(0, 1fr)); } .quick-links { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 820px) { .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); } .panels { grid-template-columns: 1fr; } .quick-links { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 480px) { .stats { grid-template-columns: 1fr; } .quick-links { grid-template-columns: 1fr; } }
</style>
