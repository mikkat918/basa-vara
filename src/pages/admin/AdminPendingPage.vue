<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { adminService } from '../../services/adminService'
import { useUiStore } from '../../stores/uiStore'
import { useAuthStore } from '../../stores/authStore'

const router = useRouter()
const ui = useUiStore()
const auth = useAuthStore()

const rows = ref([])
const loading = ref(false)
const q = ref('')
const statusFilter = ref('pending')

async function load() {
  loading.value = true
  try {
    rows.value = await adminService.properties({ status: statusFilter.value || undefined, q: q.value || undefined })
  } finally {
    loading.value = false
  }
}

onMounted(load)

async function approve(id) {
  try {
    await adminService.approve(id, auth.user?.id)
    ui.toast('Property approved and listed.', 'success')
    await load()
  } catch (e) {
    ui.toast(e.message || 'Unable to approve', 'error')
  }
}

async function reject(row) {
  const reason = prompt(`Rejection reason for "${row.title}":`)
  if (reason === null) return
  if (!reason.trim()) return ui.toast('A reason is required.', 'error')
  try {
    await adminService.reject(row.id, auth.user?.id, reason.trim())
    ui.toast('Property rejected.', 'success')
    await load()
  } catch (e) {
    ui.toast(e.message || 'Unable to reject', 'error')
  }
}

function fmt(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-BD', { dateStyle: 'medium' })
}
</script>

```vue
<template>
  <div class="approvals-page">

    <!-- Header -->
    <header class="page-header">
      <div>
        <div class="eyebrow">
          <span class="eyebrow-dot"></span>
          PROPERTY MODERATION
        </div>

        <h1>Pending approvals</h1>

        <p>
          Review property submissions and manage their approval status.
        </p>
      </div>

      <div class="page-badge">
        <span class="badge-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M9 11l3 3L22 4"/>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
        </span>
        Approval center
      </div>
    </header>

    <!-- Main Card -->
    <section class="card approvals-card">

      <!-- Card Header -->
      <div class="card-header">
        <div>
          <span class="section-eyebrow">
            LISTING REVIEW
          </span>

          <h2>Property submissions</h2>

          <p>
            Search, filter and review submitted rental listings.
          </p>
        </div>

        <div class="count-badge">
          {{ rows?.length || 0 }}
          {{ (rows?.length || 0) === 1 ? 'listing' : 'listings' }}
        </div>
      </div>

      <!-- Toolbar -->
      <div class="toolbar">

        <div class="search-box">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7"/>
            <path d="m20 20-4-4"/>
          </svg>

          <input
            v-model="q"
            class="control"
            placeholder="Search listings…"
            @keyup.enter="load"
          />
        </div>

        <select
          v-model="statusFilter"
          class="control status-select"
          @change="load"
        >
          <option value="pending">Pending</option>
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="rejected">Rejected</option>
        </select>

        <button
          class="btn btn-primary filter-button"
          type="button"
          :disabled="loading"
          @click="load"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 5h16"/>
            <path d="M7 12h10"/>
            <path d="M10 19h4"/>
          </svg>

          {{ loading ? 'Loading...' : 'Filter' }}
        </button>

      </div>

      <!-- Loading -->
      <div v-if="loading" class="loading-state">

        <div class="loading-spinner"></div>

        <strong>Loading listings</strong>

        <span>Please wait while submissions are being loaded.</span>

      </div>

      <!-- Empty -->
      <div v-else-if="!rows.length" class="empty-state">

        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 10.5 12 3l9 7.5"/>
            <path d="M5 9.5V21h14V9.5"/>
            <path d="M9 21v-6h6v6"/>
          </svg>
        </div>

        <h3>No listings found</h3>

        <p>
          No property submissions match the current search or status filter.
        </p>

      </div>

      <!-- Property List -->
      <ul v-else class="property-list">

        <li
          v-for="row in rows"
          :key="row.id"
          class="property-item"
        >

          <!-- Property Info -->
          <div class="property-main">

            <div class="property-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M3 10.5 12 3l9 7.5"/>
                <path d="M5 9.5V21h14V9.5"/>
                <path d="M9 21v-6h6v6"/>
              </svg>
            </div>

            <div class="prop-info">

              <div class="title-row">
                <strong>{{ row.title }}</strong>

                <span
                  :class="[
                    'status-badge',
                    row.status === 'active'
                      ? 'status-active'
                      : row.status === 'pending'
                        ? 'status-pending'
                        : row.status === 'rejected'
                          ? 'status-rejected'
                          : 'status-muted'
                  ]"
                >
                  <span class="status-dot"></span>
                  {{ row.status }}
                </span>
              </div>

              <div class="property-meta">
                <span>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/>
                    <circle cx="12" cy="10" r="2.5"/>
                  </svg>

                  {{ row.location?.area }}, {{ row.location?.district }}
                </span>

                <span>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M3 10.5 12 3l9 7.5"/>
                    <path d="M5 9.5V21h14V9.5"/>
                  </svg>

                  {{ row.type }}
                </span>

                <span>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M6 3v18"/>
                    <path d="M18 3v18"/>
                    <path d="M6 7h12"/>
                    <path d="M6 17h12"/>
                  </svg>

                  ৳{{ row.rent?.toLocaleString() }}/mo
                </span>
              </div>

              <span class="submitted">
                Submitted {{ fmt(row.updatedAt || row.createdAt) }}
              </span>

              <div
                v-if="row.rejectionReason"
                class="rejection-note"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M12 8v5"/>
                  <path d="M12 16h.01"/>
                </svg>

                <span>
                  <strong>Rejection reason:</strong>
                  {{ row.rejectionReason }}
                </span>
              </div>

            </div>
          </div>

          <!-- Actions -->
          <div class="prop-actions">

            <button
              v-if="row.status === 'pending' || row.status === 'rejected'"
              class="btn btn-primary action-button"
              type="button"
              @click="approve(row.id)"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="m5 12 4 4L19 6"/>
              </svg>

              Approve
            </button>

            <button
              v-if="row.status === 'pending' || row.status === 'active'"
              class="btn btn-secondary action-button"
              type="button"
              @click="reject(row)"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12"/>
                <path d="M18 6 6 18"/>
              </svg>

              Reject
            </button>

          </div>

        </li>

      </ul>

    </section>

  </div>
</template>

<style scoped>
.approvals-page {
  min-height: 100%;

  padding: clamp(24px, 4vw, 48px);

  box-sizing: border-box;

  background:
    radial-gradient(
      circle at 8% 0%,
      rgba(22, 163, 74, 0.08),
      transparent 28%
    ),
    radial-gradient(
      circle at 95% 10%,
      rgba(14, 165, 164, 0.06),
      transparent 25%
    ),
    #f6f8f7;
}

/* Header */

.page-header {
  max-width: 1500px;

  margin: 0 auto 30px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 24px;
}

.eyebrow,
.section-eyebrow {
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

.eyebrow-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: var(--color-primary);

  box-shadow:
    0 0 0 4px rgba(22, 163, 74, 0.1);
}

.page-header h1 {
  margin: 0;

  color: #17221d;

  font-size: clamp(2rem, 3vw, 2.7rem);

  line-height: 1.05;

  letter-spacing: -0.04em;
}

.page-header p {
  margin: 10px 0 0;

  color: var(--color-muted);

  font-size: 0.95rem;
}

.page-badge {
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

.badge-icon {
  width: 25px;
  height: 25px;

  display: grid;
  place-items: center;

  border-radius: 50%;

  background: rgba(22, 163, 74, 0.09);

  color: var(--color-primary);
}

.badge-icon svg {
  width: 15px;
  height: 15px;

  stroke: currentColor;

  stroke-width: 1.8;

  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Main Card */

.approvals-card {
  width: 100%;
  max-width: 1500px;

  margin: 0 auto;

  padding: 0;

  overflow: hidden;

  border: 1px solid rgba(20, 40, 30, 0.07);

  border-radius: 18px;

  background: rgba(255, 255, 255, 0.96);

  box-shadow:
    0 8px 30px rgba(25, 45, 35, 0.06);
}

/* Card Header */

.card-header {
  padding: 22px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  border-bottom: 1px solid var(--color-border);
}

.card-header h2 {
  margin: 5px 0 0;

  color: #17221d;

  font-size: 1.1rem;

  letter-spacing: -0.02em;
}

.card-header p {
  margin: 5px 0 0;

  color: var(--color-muted);

  font-size: 0.78rem;
}

.count-badge {
  padding: 7px 11px;

  border-radius: 999px;

  background: #f1f5f2;

  color: #5f6d65;

  font-size: 0.72rem;
  font-weight: 700;

  white-space: nowrap;
}

/* Toolbar */

.toolbar {
  display: grid;

  grid-template-columns:
    minmax(220px, 1fr)
    180px
    auto;

  gap: 10px;

  padding: 18px 24px;

  background: #fbfcfb;

  border-bottom: 1px solid var(--color-border);
}

.search-box {
  position: relative;
}

.search-box svg {
  position: absolute;

  left: 13px;
  top: 50%;

  width: 17px;
  height: 17px;

  transform: translateY(-50%);

  color: #7b8880;

  stroke: currentColor;

  stroke-width: 1.8;

  stroke-linecap: round;
  stroke-linejoin: round;

  pointer-events: none;

  z-index: 1;
}

.search-box .control {
  width: 100%;

  padding-left: 40px;
}

.status-select {
  width: 100%;
}

.filter-button {
  min-width: 100px;

  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 7px;
}

.filter-button svg {
  width: 16px;
  height: 16px;

  stroke: currentColor;

  stroke-width: 1.8;

  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Property List */

.property-list {
  list-style: none;

  padding: 0;
  margin: 0;
}

.property-item {
  display: flex;

  align-items: flex-start;
  justify-content: space-between;

  gap: 22px;

  padding: 20px 24px;

  border-bottom: 1px solid var(--color-border);

  transition:
    background 0.18s ease;
}

.property-item:last-child {
  border-bottom: none;
}

.property-item:hover {
  background: #fcfdfc;
}

/* Property Main */

.property-main {
  min-width: 0;

  display: flex;

  align-items: flex-start;

  gap: 14px;

  flex: 1;
}

.property-icon {
  width: 44px;
  height: 44px;

  flex: 0 0 auto;

  display: grid;
  place-items: center;

  border-radius: 12px;

  background:
    linear-gradient(
      135deg,
      rgba(22, 163, 74, 0.11),
      rgba(14, 165, 164, 0.07)
    );

  color: var(--color-primary);
}

.property-icon svg {
  width: 21px;
  height: 21px;

  stroke: currentColor;

  stroke-width: 1.7;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.prop-info {
  min-width: 0;

  display: grid;

  gap: 7px;
}

.title-row {
  display: flex;

  align-items: center;

  gap: 10px;

  flex-wrap: wrap;
}

.title-row strong {
  color: #26332c;

  font-size: 0.92rem;
}

/* Status */

.status-badge {
  display: inline-flex;

  align-items: center;

  gap: 6px;

  padding: 5px 9px;

  border-radius: 999px;

  font-size: 0.64rem;
  font-weight: 800;

  text-transform: capitalize;
}

.status-dot {
  width: 6px;
  height: 6px;

  border-radius: 50%;
}

.status-active {
  background: rgba(22, 163, 74, 0.09);

  color: #16834a;
}

.status-active .status-dot {
  background: #16a34a;
}

.status-pending {
  background: rgba(217, 119, 6, 0.1);

  color: #b45309;
}

.status-pending .status-dot {
  background: #d97706;
}

.status-rejected {
  background: rgba(220, 38, 38, 0.08);

  color: #c24141;
}

.status-rejected .status-dot {
  background: #dc2626;
}

.status-muted {
  background: #f0f2f1;

  color: #69746e;
}

.status-muted .status-dot {
  background: #89948e;
}

/* Property Meta */

.property-meta {
  display: flex;

  align-items: center;

  gap: 14px;

  flex-wrap: wrap;
}

.property-meta span {
  display: inline-flex;

  align-items: center;

  gap: 5px;

  color: #657169;

  font-size: 0.72rem;
}

.property-meta svg {
  width: 14px;
  height: 14px;

  stroke: currentColor;

  stroke-width: 1.7;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.submitted {
  color: #8a948e;

  font-size: 0.67rem;
}

/* Rejection */

.rejection-note {
  display: flex;

  align-items: flex-start;

  gap: 7px;

  width: fit-content;

  max-width: 100%;

  padding: 7px 10px;

  border: 1px solid rgba(220, 38, 38, 0.1);

  border-radius: 8px;

  background: rgba(220, 38, 38, 0.05);

  color: #b74444;

  font-size: 0.7rem;

  line-height: 1.45;
}

.rejection-note svg {
  width: 14px;
  height: 14px;

  flex: 0 0 auto;

  margin-top: 1px;

  stroke: currentColor;

  stroke-width: 1.8;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.rejection-note strong {
  font-weight: 800;
}

/* Actions */

.prop-actions {
  display: flex;

  align-items: center;

  justify-content: flex-end;

  gap: 8px;

  flex-shrink: 0;

  padding-top: 2px;
}

.action-button {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 6px;

  min-width: 88px;
}

.action-button svg {
  width: 15px;
  height: 15px;

  stroke: currentColor;

  stroke-width: 2;

  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Loading */

.loading-state {
  min-height: 300px;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: 40px 24px;

  text-align: center;
}

.loading-spinner {
  width: 30px;
  height: 30px;

  margin-bottom: 14px;

  border: 3px solid rgba(22, 163, 74, 0.12);

  border-top-color: var(--color-primary);

  border-radius: 50%;

  animation: spin 0.8s linear infinite;
}

.loading-state strong {
  color: #344039;

  font-size: 0.9rem;
}

.loading-state span {
  margin-top: 5px;

  color: var(--color-muted);

  font-size: 0.75rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Empty */

.empty-state {
  min-height: 320px;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: 40px 24px;

  text-align: center;
}

.empty-icon {
  width: 62px;
  height: 62px;

  display: grid;
  place-items: center;

  margin-bottom: 15px;

  border-radius: 18px;

  background: rgba(22, 163, 74, 0.08);

  color: var(--color-primary);
}

.empty-icon svg {
  width: 28px;
  height: 28px;

  stroke: currentColor;

  stroke-width: 1.7;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.empty-state h3 {
  margin: 0;

  color: #26332c;

  font-size: 1rem;
}

.empty-state p {
  max-width: 420px;

  margin: 7px 0 0;

  color: var(--color-muted);

  font-size: 0.8rem;

  line-height: 1.6;
}

/* Responsive */

@media (max-width: 950px) {
  .property-item {
    flex-direction: column;
  }

  .prop-actions {
    width: 100%;

    justify-content: flex-start;
  }
}

@media (max-width: 850px) {
  .approvals-page {
    padding: 24px 18px;
  }

  .page-header {
    align-items: flex-start;

    flex-direction: column;

    margin-bottom: 24px;
  }

  .page-badge {
    align-self: flex-start;
  }

  .toolbar {
    grid-template-columns: 1fr 160px;

    padding: 16px 18px;
  }

  .filter-button {
    grid-column: 1 / -1;
  }
}

@media (max-width: 600px) {
  .approvals-page {
    padding: 20px 14px;
  }

  .page-header h1 {
    font-size: 1.9rem;
  }

  .card-header {
    padding: 18px;

    align-items: flex-start;

    flex-direction: column;
  }

  .toolbar {
    grid-template-columns: 1fr;

    padding: 15px 18px;
  }

  .filter-button {
    grid-column: auto;

    width: 100%;
  }

  .property-item {
    padding: 18px;
  }

  .property-main {
    width: 100%;
  }

  .property-meta {
    align-items: flex-start;

    flex-direction: column;

    gap: 6px;
  }

  .prop-actions {
    width: 100%;
  }

  .action-button {
    flex: 1;
  }

  .approvals-card {
    border-radius: 14px;
  }
}

@media (max-width: 400px) {
  .approvals-page {
    padding: 18px 10px;
  }

  .property-main {
    gap: 10px;
  }

  .property-icon {
    width: 38px;
    height: 38px;
  }

  .property-icon svg {
    width: 18px;
    height: 18px;
  }

  .title-row strong {
    font-size: 0.84rem;
  }

  .action-button {
    min-width: 0;

    padding-left: 10px;
    padding-right: 10px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .property-item,
  .loading-spinner {
    animation: none;

    transition: none;
  }
}
</style>