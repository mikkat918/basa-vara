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

```vue
<template>
  <div class="admin-dashboard">

    <!-- Header -->
    <header class="dashboard-header">
      <div>
        <div class="eyebrow">
          <span class="eyebrow-dot"></span>
          ADMIN CONTROL CENTER
        </div>

        <h1>Admin dashboard</h1>

        <p>
          Platform overview, moderation activity and quick actions.
        </p>
      </div>

      <div class="status-badge">
        <span class="status-dot"></span>
        System overview
      </div>
    </header>

    <!-- Loading -->
    <div v-if="adminStore.loading" class="dashboard-content">

      <section class="stats">
        <div
          v-for="i in 6"
          :key="i"
          class="card stat-card skeleton-card"
        >
          <div class="skeleton-icon"></div>
          <div class="skeleton-value"></div>
          <div class="skeleton-label"></div>
        </div>
      </section>

      <section class="panels">
        <div class="card skeleton-panel"></div>
        <div class="card skeleton-panel"></div>
      </section>

    </div>

    <!-- Dashboard -->
    <div v-else class="dashboard-content">

      <!-- Stats -->
      <section class="stats">

        <div
          v-for="stat in stats"
          :key="stat.label"
          class="card stat-card"
        >
          <div class="stat-top">

            <div class="stat-icon">
              <!-- Users -->
              <svg
                v-if="stat.label.toLowerCase().includes('user')"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>

              <!-- Property -->
              <svg
                v-else-if="
                  stat.label.toLowerCase().includes('propert') ||
                  stat.label.toLowerCase().includes('listing')
                "
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M3 10.5 12 3l9 7.5"/>
                <path d="M5 9.5V21h14V9.5"/>
                <path d="M9 21v-6h6v6"/>
              </svg>

              <!-- Payment -->
              <svg
                v-else-if="
                  stat.label.toLowerCase().includes('payment') ||
                  stat.label.toLowerCase().includes('revenue')
                "
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <path d="M3 10h18"/>
                <path d="M7 15h3"/>
              </svg>

              <!-- Report -->
              <svg
                v-else-if="stat.label.toLowerCase().includes('report')"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M12 3 4 6v5c0 5.2 3.4 8.8 8 10 4.6-1.2 8-4.8 8-10V6l-8-3Z"/>
                <path d="M12 8v4"/>
                <path d="M12 16h.01"/>
              </svg>

              <!-- Default -->
              <svg
                v-else
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M4 19V5"/>
                <path d="M4 19h17"/>
                <path d="m7 15 4-4 3 2 5-6"/>
              </svg>
            </div>

            <span class="stat-tag">
              Overview
            </span>
          </div>

          <strong class="stat-value">
            {{ stat.value }}
          </strong>

          <span class="stat-label">
            {{ stat.label }}
          </span>
        </div>

      </section>

      <!-- Main Panels -->
      <section class="panels">

        <!-- Pending Approvals -->
        <section class="card panel">

          <div class="panel-head">
            <div>
              <span class="panel-eyebrow">
                MODERATION
              </span>

              <h2>Pending approvals</h2>

              <p>
                Listings waiting for admin review.
              </p>
            </div>

            <button
              class="btn btn-secondary panel-action"
              type="button"
              @click="router.push('/admin/properties/pending')"
            >
              View all
            </button>
          </div>

          <div
            v-if="!pending.length"
            class="empty-state"
          >
            <div class="empty-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="m5 12 4 4L19 6"/>
              </svg>
            </div>

            <strong>Everything is up to date</strong>

            <span>
              No pending listings right now.
            </span>
          </div>

          <ul
            v-else
            class="approval-list"
          >
            <li
              v-for="p in pending.slice(0, 4)"
              :key="p.id"
              class="approval-item"
            >

              <div class="approval-main">

                <div class="property-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M3 10.5 12 3l9 7.5"/>
                    <path d="M5 9.5V21h14V9.5"/>
                    <path d="M9 21v-6h6v6"/>
                  </svg>
                </div>

                <div class="approval-info">
                  <strong>{{ p.title }}</strong>

                  <span>
                    {{ p.location?.area || 'Unknown area' }},
                    {{ p.location?.district || 'Unknown district' }}
                  </span>
                </div>

              </div>

              <div class="approval-actions">

                <span class="badge badge-warning">
                  Pending
                </span>

                <button
                  class="btn btn-primary-small"
                  type="button"
                  @click="approveProperty(p.id)"
                >
                  Approve
                </button>

                <button
                  class="btn btn-secondary-small"
                  type="button"
                  @click="router.push(`/admin/properties`)"
                >
                  View
                </button>

              </div>

            </li>
          </ul>

        </section>

        <!-- Reports -->
        <section class="card panel">

          <div class="panel-head">
            <div>
              <span class="panel-eyebrow">
                MODERATION
              </span>

              <h2>Recent reports</h2>

              <p>
                User-submitted issues requiring attention.
              </p>
            </div>

            <button
              class="btn btn-secondary panel-action"
              type="button"
              @click="router.push('/admin/reports')"
            >
              View all
            </button>
          </div>

          <div
            v-if="!reports.length"
            class="empty-state"
          >
            <div class="empty-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 3 4 6v5c0 5.2 3.4 8.8 8 10 4.6-1.2 8-4.8 8-10V6l-8-3Z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>

            <strong>No reports to review</strong>

            <span>
              There are currently no reported issues.
            </span>
          </div>

          <ul
            v-else
            class="report-list"
          >
            <li
              v-for="r in reports"
              :key="r.id"
              class="report-item"
            >

              <div class="report-main">

                <div class="report-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 3 4 6v5c0 5.2 3.4 8.8 8 10 4.6-1.2 8-4.8 8-10V6l-8-3Z"/>
                    <path d="M12 8v4"/>
                    <path d="M12 16h.01"/>
                  </svg>
                </div>

                <div>
                  <strong>{{ r.category }}</strong>

                  <p>
                    {{ r.description?.slice(0, 80) }}
                    {{ r.description?.length > 80 ? '…' : '' }}
                  </p>
                </div>

              </div>

              <span
                :class="[
                  'badge',
                  r.status === 'open'
                    ? 'badge-danger'
                    : r.status === 'investigating'
                      ? 'badge-warning'
                      : 'badge-muted'
                ]"
              >
                {{ r.status }}
              </span>

            </li>
          </ul>

        </section>

      </section>

      <!-- Activity -->
      <section class="card panel activity-panel">

        <div class="panel-head">
          <div>
            <span class="panel-eyebrow">
              AUDIT TRAIL
            </span>

            <h2>Recent activity</h2>

            <p>
              Latest actions performed across the admin panel.
            </p>
          </div>

          <button
            class="btn btn-secondary panel-action"
            type="button"
            @click="router.push('/admin/logs')"
          >
            View logs
          </button>
        </div>

        <div
          v-if="!recentActivity.length"
          class="empty-state"
        >
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 19V5"/>
              <path d="M4 19h17"/>
              <path d="m7 15 4-4 3 2 5-6"/>
            </svg>
          </div>

          <strong>No recent activity</strong>

          <span>
            Admin actions will appear here.
          </span>
        </div>

        <ul
          v-else
          class="activity-list"
        >
          <li
            v-for="log in recentActivity"
            :key="log.id"
            class="activity-item"
          >
            <span class="activity-line"></span>

            <span class="activity-dot"></span>

            <div class="activity-content">
              <strong>{{ log.action }}</strong>

              <span>
                {{ fmt(log.date) }}
              </span>
            </div>
          </li>
        </ul>

      </section>

      <!-- Quick Actions -->
      <section class="quick-section">

        <div class="quick-heading">
          <div>
            <span class="panel-eyebrow">
              ADMIN TOOLS
            </span>

            <h2>Quick actions</h2>
          </div>
        </div>

        <div class="quick-links">

          <button
            class="card quick-link"
            type="button"
            @click="router.push('/admin/users')"
          >
            <span class="quick-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </span>

            <span class="quick-title">Manage Users</span>
            <span class="quick-description">Accounts and roles</span>
          </button>

          <button
            class="card quick-link"
            type="button"
            @click="router.push('/admin/properties')"
          >
            <span class="quick-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M3 10.5 12 3l9 7.5"/>
                <path d="M5 9.5V21h14V9.5"/>
                <path d="M9 21v-6h6v6"/>
              </svg>
            </span>

            <span class="quick-title">All Properties</span>
            <span class="quick-description">Listings management</span>
          </button>

          <button
            class="card quick-link"
            type="button"
            @click="router.push('/admin/payments')"
          >
            <span class="quick-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <path d="M3 10h18"/>
                <path d="M7 15h3"/>
              </svg>
            </span>

            <span class="quick-title">Payments</span>
            <span class="quick-description">Payment activity</span>
          </button>

          <button
            class="card quick-link"
            type="button"
            @click="router.push('/admin/analytics')"
          >
            <span class="quick-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 19V5"/>
                <path d="M4 19h17"/>
                <path d="m7 15 4-4 3 2 5-6"/>
              </svg>
            </span>

            <span class="quick-title">Analytics</span>
            <span class="quick-description">Platform insights</span>
          </button>

          <button
            class="card quick-link"
            type="button"
            @click="router.push('/admin/notifications')"
          >
            <span class="quick-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>
                <path d="M10 21h4"/>
              </svg>
            </span>

            <span class="quick-title">Notifications</span>
            <span class="quick-description">Platform messages</span>
          </button>

          <button
            class="card quick-link"
            type="button"
            @click="router.push('/admin/settings')"
          >
            <span class="quick-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-2.4v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.7-1.7.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H4v-2.4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1L7 7l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5h2.4v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3L15.4 6l1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2v2.4h-.2a1.7 1.7 0 0 0-1.5 1Z"/>
              </svg>
            </span>

            <span class="quick-title">Settings</span>
            <span class="quick-description">System configuration</span>
          </button>

        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  min-height: 100%;
  padding: clamp(24px, 4vw, 48px);

  box-sizing: border-box;

  background:
    radial-gradient(
      circle at 7% 0%,
      rgba(22, 163, 74, 0.08),
      transparent 28%
    ),
    radial-gradient(
      circle at 95% 8%,
      rgba(14, 165, 164, 0.06),
      transparent 25%
    ),
    #f6f8f7;
}

.dashboard-content {
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
}

/* Header */

.dashboard-header {
  max-width: 1500px;
  margin: 0 auto 32px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}

.eyebrow,
.panel-eyebrow {
  color: var(--color-primary);

  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 8px;
}

.eyebrow-dot,
.status-dot {
  width: 7px;
  height: 7px;

  flex: 0 0 auto;

  border-radius: 50%;

  background: var(--color-primary);

  box-shadow:
    0 0 0 4px rgba(22, 163, 74, 0.1);
}

.dashboard-header h1 {
  margin: 0;

  color: #17221d;

  font-size: clamp(2rem, 3vw, 2.8rem);
  line-height: 1.05;

  letter-spacing: -0.04em;
}

.dashboard-header p {
  margin: 10px 0 0;

  color: var(--color-muted);

  font-size: 0.95rem;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 9px;

  padding: 9px 14px;

  border: 1px solid rgba(22, 163, 74, 0.14);
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.88);

  color: #41604e;

  font-size: 0.78rem;
  font-weight: 700;

  white-space: nowrap;
}

/* Stats */

.stats {
  display: grid;

  grid-template-columns:
    repeat(6, minmax(0, 1fr));

  gap: 16px;

  margin-bottom: 24px;
}

.stat-card {
  min-width: 0;

  padding: 20px;

  border: 1px solid rgba(20, 40, 30, 0.07);
  border-radius: 16px;

  background: rgba(255, 255, 255, 0.94);

  box-shadow:
    0 7px 24px rgba(25, 45, 35, 0.055);

  display: grid;
  gap: 5px;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-3px);

  border-color: rgba(22, 163, 74, 0.15);

  box-shadow:
    0 14px 30px rgba(25, 45, 35, 0.09);
}

.stat-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 10px;

  margin-bottom: 8px;
}

.stat-icon {
  width: 42px;
  height: 42px;

  display: grid;
  place-items: center;

  border-radius: 12px;

  background: rgba(22, 163, 74, 0.09);
  color: var(--color-primary);
}

.stat-icon svg {
  width: 20px;
  height: 20px;

  stroke: currentColor;
  stroke-width: 1.8;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.stat-tag {
  padding: 4px 8px;

  border-radius: 999px;

  background: #f2f5f3;

  color: #6c7871;

  font-size: 0.59rem;
  font-weight: 800;

  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.stat-value {
  color: #17221d;

  font-size: 1.75rem;
  line-height: 1.1;

  letter-spacing: -0.03em;
}

.stat-label {
  color: var(--color-muted);

  font-size: 0.75rem;
}

/* Panels */

.panels {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 20px;

  margin-bottom: 24px;
}

.panel {
  min-width: 0;

  padding: 24px;

  border: 1px solid rgba(20, 40, 30, 0.07);
  border-radius: 18px;

  background: rgba(255, 255, 255, 0.95);

  box-shadow:
    0 7px 24px rgba(25, 45, 35, 0.055);
}

.panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 18px;

  margin-bottom: 20px;
}

.panel-head h2 {
  margin: 5px 0 0;

  color: #17221d;

  font-size: 1.12rem;
  letter-spacing: -0.02em;
}

.panel-head p {
  margin: 5px 0 0;

  color: var(--color-muted);

  font-size: 0.75rem;
}

.panel-action {
  flex: 0 0 auto;
}

/* Approval */

.approval-list,
.report-list,
.activity-list {
  list-style: none;

  padding: 0;
  margin: 0;

  display: grid;
  gap: 0;
}

.approval-item {
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 16px;

  padding: 14px 0;

  border-bottom: 1px solid var(--color-border);
}

.approval-item:last-child {
  border-bottom: 0;
}

.approval-main {
  min-width: 0;

  display: flex;
  align-items: center;

  gap: 12px;
}

.property-icon,
.report-icon {
  width: 38px;
  height: 38px;

  flex: 0 0 auto;

  display: grid;
  place-items: center;

  border-radius: 10px;

  background: rgba(22, 163, 74, 0.08);
  color: var(--color-primary);
}

.property-icon svg,
.report-icon svg {
  width: 19px;
  height: 19px;

  stroke: currentColor;
  stroke-width: 1.8;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.approval-info {
  min-width: 0;

  display: grid;
  gap: 3px;
}

.approval-info strong {
  overflow: hidden;

  color: #26332c;

  font-size: 0.84rem;

  white-space: nowrap;
  text-overflow: ellipsis;
}

.approval-info span {
  color: var(--color-muted);

  font-size: 0.7rem;
}

.approval-actions {
  display: flex;

  align-items: center;

  gap: 7px;

  flex-wrap: wrap;
}

/* Buttons */

.btn-primary-small,
.btn-secondary-small {
  border: 0;

  padding: 7px 10px;

  border-radius: 8px;

  font-size: 0.68rem;
  font-weight: 700;

  cursor: pointer;
}

.btn-primary-small {
  background: var(--color-primary);
  color: white;
}

.btn-primary-small:hover {
  filter: brightness(0.94);
}

.btn-secondary-small {
  background: #f1f4f2;
  color: #526058;
}

/* Badge */

.badge {
  display: inline-flex;
  align-items: center;

  padding: 5px 8px;

  border-radius: 999px;

  font-size: 0.62rem;
  font-weight: 800;

  text-transform: capitalize;
}

.badge-warning {
  background: rgba(217, 119, 6, 0.1);
  color: #b45309;
}

.badge-danger {
  background: rgba(220, 38, 38, 0.09);
  color: #b91c1c;
}

.badge-muted {
  background: #f0f2f1;
  color: #69746e;
}

/* Reports */

.report-item {
  display: flex;

  align-items: flex-start;
  justify-content: space-between;

  gap: 14px;

  padding: 14px 0;

  border-bottom: 1px solid var(--color-border);
}

.report-item:last-child {
  border-bottom: 0;
}

.report-main {
  min-width: 0;

  display: flex;

  gap: 11px;
}

.report-icon {
  color: #d97706;

  background: rgba(217, 119, 6, 0.08);
}

.report-main strong {
  display: block;

  color: #26332c;

  font-size: 0.84rem;
}

.report-main p {
  max-width: 400px;

  margin: 4px 0 0;

  color: var(--color-muted);

  font-size: 0.72rem;
  line-height: 1.5;
}

/* Empty */

.empty-state {
  min-height: 150px;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: 24px;

  text-align: center;
}

.empty-icon {
  width: 46px;
  height: 46px;

  display: grid;
  place-items: center;

  margin-bottom: 10px;

  border-radius: 13px;

  background: rgba(22, 163, 74, 0.08);
  color: var(--color-primary);
}

.empty-icon svg {
  width: 22px;
  height: 22px;

  stroke: currentColor;
  stroke-width: 1.8;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.empty-state strong {
  color: #34423a;

  font-size: 0.84rem;
}

.empty-state span {
  margin-top: 4px;

  color: var(--color-muted);

  font-size: 0.7rem;
}

/* Activity */

.activity-panel {
  margin-bottom: 24px;
}

.activity-item {
  position: relative;

  display: flex;

  align-items: center;

  gap: 12px;

  min-height: 50px;

  border-bottom: 1px solid var(--color-border);
}

.activity-item:last-child {
  border-bottom: 0;
}

.activity-dot {
  position: relative;
  z-index: 2;

  width: 9px;
  height: 9px;

  flex: 0 0 auto;

  border-radius: 50%;

  background: var(--color-primary);

  box-shadow:
    0 0 0 5px rgba(22, 163, 74, 0.08);
}

.activity-line {
  position: absolute;

  left: 4px;
  top: 50%;

  width: 1px;
  height: 100%;

  background: rgba(22, 163, 74, 0.15);
}

.activity-item:last-child .activity-line {
  display: none;
}

.activity-content {
  display: flex;

  align-items: center;

  gap: 5px;

  min-width: 0;
}

.activity-content strong {
  color: #34423a;

  font-size: 0.8rem;
}

.activity-content span {
  color: var(--color-muted);

  font-size: 0.7rem;
}

/* Quick Actions */

.quick-section {
  width: 100%;
}

.quick-heading {
  margin-bottom: 14px;
}

.quick-heading h2 {
  margin: 5px 0 0;

  color: #17221d;

  font-size: 1.1rem;
}

.quick-links {
  display: grid;

  grid-template-columns:
    repeat(6, minmax(0, 1fr));

  gap: 12px;
}

.quick-link {
  min-width: 0;

  padding: 20px 14px;

  display: flex;

  flex-direction: column;

  align-items: flex-start;

  gap: 7px;

  border: 1px solid rgba(20, 40, 30, 0.07);
  border-radius: 15px;

  background: rgba(255, 255, 255, 0.94);

  box-shadow:
    0 6px 20px rgba(25, 45, 35, 0.045);

  cursor: pointer;

  text-align: left;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.quick-link:hover {
  transform: translateY(-3px);

  border-color: rgba(22, 163, 74, 0.16);

  box-shadow:
    0 12px 26px rgba(25, 45, 35, 0.08);
}

.quick-icon {
  width: 38px;
  height: 38px;

  display: grid;
  place-items: center;

  margin-bottom: 4px;

  border-radius: 10px;

  background: rgba(22, 163, 74, 0.08);
  color: var(--color-primary);
}

.quick-icon svg {
  width: 19px;
  height: 19px;

  stroke: currentColor;
  stroke-width: 1.8;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.quick-title {
  color: #26332c;

  font-size: 0.82rem;
  font-weight: 800;
}

.quick-description {
  color: var(--color-muted);

  font-size: 0.68rem;
}

/* Skeleton */

.skeleton-card {
  overflow: hidden;
}

.skeleton-icon,
.skeleton-value,
.skeleton-label {
  position: relative;

  overflow: hidden;

  background: #edf1ee;

  border-radius: 8px;
}

.skeleton-icon {
  width: 42px;
  height: 42px;

  margin-bottom: 9px;
}

.skeleton-value {
  width: 75px;
  height: 27px;
}

.skeleton-label {
  width: 95px;
  height: 12px;
}

.skeleton-panel {
  position: relative;

  min-height: 300px;

  overflow: hidden;

  border-radius: 18px;

  background: #fff;
}

.skeleton-icon::after,
.skeleton-value::after,
.skeleton-label::after,
.skeleton-panel::after {
  content: "";

  position: absolute;

  inset: 0;

  transform: translateX(-100%);

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.75),
      transparent
    );

  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* Responsive */

@media (max-width: 1250px) {
  .stats {
    grid-template-columns:
      repeat(3, minmax(0, 1fr));
  }

  .quick-links {
    grid-template-columns:
      repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .admin-dashboard {
    padding: 24px 18px;
  }

  .dashboard-header {
    align-items: flex-start;
    flex-direction: column;

    margin-bottom: 24px;
  }

  .panels {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 650px) {
  .stats {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: 10px;
  }

  .stat-card {
    padding: 15px;
  }

  .stat-value {
    font-size: 1.4rem;
  }

  .stat-tag {
    display: none;
  }

  .panel {
    padding: 18px;
  }

  .approval-item,
  .report-item {
    align-items: flex-start;
    flex-direction: column;
  }

  .approval-actions {
    width: 100%;
  }

  .quick-links {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 430px) {
  .admin-dashboard {
    padding: 18px 12px;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .quick-links {
    grid-template-columns: 1fr;
  }

  .panel-head {
    flex-direction: column;
  }

  .panel-action {
    align-self: flex-start;
  }

  .approval-actions {
    width: 100%;
  }

  .dashboard-header h1 {
    font-size: 1.9rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stat-card,
  .quick-link {
    transition: none;
  }

  .skeleton-icon::after,
  .skeleton-value::after,
  .skeleton-label::after,
  .skeleton-panel::after {
    animation: none;
  }
}
</style>
