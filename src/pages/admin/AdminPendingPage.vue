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

<template>
  <div class="page">
    <div class="page-header">
      <div>
        <h1>Pending approvals</h1>
        <p class="muted">Review and approve or reject property submissions.</p>
      </div>
    </div>

    <div class="card panel">
      <div class="toolbar">
        <input v-model="q" class="control" placeholder="Search listings…" @keyup.enter="load" />
        <select v-model="statusFilter" class="control" @change="load">
          <option value="pending">Pending</option>
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="rejected">Rejected</option>
        </select>
        <button class="btn btn-primary" type="button" :disabled="loading" @click="load">Filter</button>
      </div>

      <div v-if="loading" class="state-box muted">Loading listings…</div>
      <div v-else-if="!rows.length" class="state-box">
        <p class="muted">No listings match this filter.</p>
      </div>
      <ul v-else class="property-list">
        <li v-for="row in rows" :key="row.id" class="property-item">
          <div class="prop-info">
            <strong>{{ row.title }}</strong>
            <span class="muted">{{ row.location?.area }}, {{ row.location?.district }} · {{ row.type }}</span>
            <span class="muted">৳{{ row.rent?.toLocaleString() }}/mo · Submitted {{ fmt(row.updatedAt || row.createdAt) }}</span>
            <span v-if="row.rejectionReason" class="rejection-note">Rejection reason: {{ row.rejectionReason }}</span>
          </div>
          <div class="prop-actions">
            <span :class="['badge', row.status === 'active' ? 'badge-success' : row.status === 'pending' ? 'badge-warning' : row.status === 'rejected' ? 'badge-danger' : 'badge-muted']">{{ row.status }}</span>
            <button v-if="row.status === 'pending' || row.status === 'rejected'" class="btn btn-primary" type="button" @click="approve(row.id)">Approve</button>
            <button v-if="row.status === 'pending' || row.status === 'active'" class="btn btn-secondary" type="button" @click="reject(row)">Reject</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.page-header { margin-bottom: 4px; }
.page-header p { margin-top: 4px; }
.panel { padding: 20px; display: grid; gap: 16px; }
.toolbar { display: grid; grid-template-columns: 1fr 160px auto; gap: 10px; }
.state-box { padding: 24px 0; text-align: center; }
.property-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
.property-item { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; border-bottom: 1px solid var(--color-border); padding-bottom: 14px; flex-wrap: wrap; }
.prop-info { display: grid; gap: 4px; }
.prop-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; flex-shrink: 0; }
.rejection-note { color: var(--color-danger); font-size: 0.85rem; background: var(--color-danger-soft); padding: 4px 8px; border-radius: 4px; }
@media (max-width: 600px) { .toolbar { grid-template-columns: 1fr; } .property-item { flex-direction: column; } }
</style>
