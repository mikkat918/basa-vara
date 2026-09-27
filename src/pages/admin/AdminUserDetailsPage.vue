<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { adminService } from '../../services/adminService'
import { useUiStore } from '../../stores/uiStore'
import { useAuthStore } from '../../stores/authStore'

const route = useRoute()
const router = useRouter()
const ui = useUiStore()
const auth = useAuthStore()

const data = ref(null)
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    data.value = await adminService.user(route.params.id)
  } catch (e) {
    ui.toast(e.message || 'User not found', 'error')
    router.push('/admin/users')
  } finally {
    loading.value = false
  }
})

async function setStatus(status) {
  try {
    const updated = await adminService.setUserStatus(route.params.id, status)
    data.value.user = updated
    ui.toast(`User ${status}.`, 'success')
  } catch (e) {
    ui.toast(e.message || 'Unable to update', 'error')
  }
}

async function deleteUser() {
  const ok = await ui.askConfirm({ title: 'Delete user', message: `Delete ${data.value.user?.name}? This cannot be undone.`, confirmLabel: 'Delete', danger: true })
  if (!ok) return
  try {
    await adminService.deleteUser(route.params.id)
    ui.toast('User deleted.', 'success')
    router.push('/admin/users')
  } catch (e) {
    ui.toast(e.message || 'Unable to delete', 'error')
  }
}

function fmt(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-BD', { dateStyle: 'long' })
}

function fmtDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-BD', { dateStyle: 'medium' })
}
</script>

<template>
  <div class="page">
    <div class="back-row">
      <button class="btn btn-secondary" type="button" @click="router.push('/admin/users')">← Back to Users</button>
    </div>

    <div v-if="loading" class="card skeleton" style="height:200px;margin-top:16px"></div>

    <template v-else-if="data">
      <div class="user-header card">
        <div class="avatar">{{ data.user.name?.split(' ').map(p => p[0]).join('').slice(0, 2) }}</div>
        <div class="user-info">
          <h1>{{ data.user.name }}</h1>
          <p class="muted">{{ data.user.email }}</p>
          <div class="badges">
            <span :class="['badge', data.user.role === 'landlord' ? 'badge-success' : 'badge-muted']">{{ data.user.role }}</span>
            <span :class="['badge', data.user.status === 'active' ? 'badge-success' : 'badge-danger']">{{ data.user.status }}</span>
          </div>
        </div>
        <div class="user-actions">
          <button v-if="data.user.status !== 'active'" class="btn btn-primary" type="button" @click="setStatus('active')">Activate</button>
          <button v-if="data.user.status === 'active'" class="btn btn-secondary" type="button" @click="setStatus('suspended')">Suspend</button>
          <button class="btn btn-danger" type="button" @click="deleteUser">Delete user</button>
        </div>
      </div>

      <div class="panels">
        <div class="card panel">
          <h2>Account details</h2>
          <ul class="facts">
            <li><span>Phone</span><strong>{{ data.user.phone || '—' }}</strong></li>
            <li><span>Role</span><strong>{{ data.user.role }}</strong></li>
            <li><span>Status</span><strong>{{ data.user.status }}</strong></li>
            <li><span>Verified</span><strong>{{ data.user.verified ? 'Yes' : 'No' }}</strong></li>
            <li><span>Joined</span><strong>{{ fmt(data.user.createdAt) }}</strong></li>
            <li v-if="data.user.role === 'landlord'"><span>Response rate</span><strong>{{ data.user.responseRate ?? '—' }}%</strong></li>
          </ul>
        </div>

        <div v-if="data.properties?.length" class="card panel">
          <h2>Properties ({{ data.properties.length }})</h2>
          <ul class="item-list">
            <li v-for="p in data.properties" :key="p.id" class="item-row">
              <span>{{ p.title }}</span>
              <span :class="['badge', p.status === 'active' ? 'badge-success' : p.status === 'pending' ? 'badge-warning' : 'badge-muted']">{{ p.status }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="data.transactions?.length" class="card panel">
        <h2>Transaction history</h2>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Coins</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tx in data.transactions" :key="tx.id">
                <td>{{ tx.type }}</td>
                <td>{{ tx.coins > 0 ? '+' : '' }}{{ tx.coins }}</td>
                <td>৳{{ tx.amount }}</td>
                <td><span :class="['badge', tx.status === 'Success' ? 'badge-success' : 'badge-warning']">{{ tx.status }}</span></td>
                <td>{{ fmtDate(tx.createdAt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.back-row { margin-bottom: 16px; }
.user-header { display: flex; align-items: center; gap: 20px; padding: 24px; flex-wrap: wrap; margin-top: 4px; }
.avatar { width: 56px; height: 56px; border-radius: 50%; background: var(--color-primary-soft); color: var(--color-primary); display: grid; place-items: center; font-weight: 700; font-size: 1.2rem; flex-shrink: 0; }
.user-info { flex: 1; display: grid; gap: 6px; }
.user-info h1 { font-size: 1.4rem; }
.badges { display: flex; gap: 8px; }
.user-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.panels { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; margin-top: 20px; }
.panel { padding: 20px; display: grid; gap: 12px; }
.panel h2 { font-size: 1.1rem; margin-bottom: 4px; }
.facts { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
.facts li { display: flex; justify-content: space-between; gap: 8px; border-bottom: 1px solid var(--color-border); padding-bottom: 8px; }
.item-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
.item-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; border-bottom: 1px solid var(--color-border); padding-bottom: 6px; }
@media (max-width: 768px) { .panels { grid-template-columns: 1fr; } .user-header { flex-direction: column; align-items: flex-start; } }
</style>
