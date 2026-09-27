<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAdminStore } from '../../stores/adminStore'
import { useAuthStore } from '../../stores/authStore'
import { useUiStore } from '../../stores/uiStore'
import { useRouter } from 'vue-router'
import { adminService } from '../../services/adminService'

const adminStore = useAdminStore()
const auth = useAuthStore()
const ui = useUiStore()
const router = useRouter()

const users = ref([])
const loading = ref(false)
const q = ref('')
const roleFilter = ref('')
const statusFilter = ref('')

async function load() {
  loading.value = true
  try {
    users.value = await adminService.users({ role: roleFilter.value, status: statusFilter.value, q: q.value })
  } finally {
    loading.value = false
  }
}

onMounted(load)

async function setStatus(user, status) {
  try {
    await adminService.setUserStatus(user.id, status)
    ui.toast(`User ${status === 'active' ? 'activated' : status === 'suspended' ? 'suspended' : 'blocked'}.`, 'success')
    await load()
  } catch (e) {
    ui.toast(e.message || 'Unable to update user', 'error')
  }
}

async function deleteUser(user) {
  const ok = await ui.askConfirm({ title: 'Delete user', message: `Delete ${user.name}? This cannot be undone.`, confirmLabel: 'Delete', danger: true })
  if (!ok) return
  try {
    await adminService.deleteUser(user.id)
    ui.toast('User deleted.', 'success')
    await load()
  } catch (e) {
    ui.toast(e.message || 'Unable to delete user', 'error')
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
        <h1>Users</h1>
        <p class="muted">Manage all registered users on the platform.</p>
      </div>
    </div>

    <div class="card panel">
      <div class="toolbar">
        <input v-model="q" class="control" placeholder="Search by name or email…" @keyup.enter="load" />
        <select v-model="roleFilter" class="control" @change="load">
          <option value="">All roles</option>
          <option value="tenant">Tenant</option>
          <option value="landlord">Landlord</option>
          <option value="admin">Admin</option>
        </select>
        <select v-model="statusFilter" class="control" @change="load">
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
          <option value="blocked">Blocked</option>
        </select>
        <button class="btn btn-primary" type="button" :disabled="loading" @click="load">Search</button>
      </div>

      <div v-if="loading" class="state-box muted">Loading users…</div>
      <div v-else-if="!users.length" class="state-box muted">No users match your filters.</div>
      <div v-else class="table-wrap table-as-cards">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td data-label="Name">
                <button class="link-btn" type="button" @click="router.push(`/admin/users/${user.id}`)">{{ user.name }}</button>
              </td>
              <td data-label="Email">{{ user.email }}</td>
              <td data-label="Role">
                <span :class="['badge', user.role === 'landlord' ? 'badge-success' : user.role === 'admin' ? 'badge-warning' : 'badge-muted']">
                  {{ user.role }}
                </span>
              </td>
              <td data-label="Status">
                <span :class="['badge', user.status === 'active' ? 'badge-success' : user.status === 'suspended' || user.status === 'blocked' ? 'badge-danger' : 'badge-warning']">
                  {{ user.status }}
                </span>
              </td>
              <td data-label="Joined">{{ fmt(user.createdAt) }}</td>
              <td data-label="Actions">
                <div class="action-row">
                  <button class="btn btn-secondary" type="button" @click="router.push(`/admin/users/${user.id}`)">View</button>
                  <button v-if="user.status !== 'active'" class="btn btn-secondary" type="button" @click="setStatus(user, 'active')">Activate</button>
                  <button v-if="user.status === 'active'" class="btn btn-secondary" type="button" @click="setStatus(user, 'suspended')">Suspend</button>
                  <button class="btn btn-danger" type="button" @click="deleteUser(user)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header { margin-bottom: 4px; }
.page-header p { margin-top: 4px; }
.panel { padding: 20px; display: grid; gap: 16px; }
.toolbar { display: grid; grid-template-columns: 1fr 160px 160px auto; gap: 10px; }
.state-box { padding: 24px 0; text-align: center; }
.link-btn { background: none; border: none; cursor: pointer; color: var(--color-primary); font-weight: 600; padding: 0; }
.link-btn:hover { text-decoration: underline; }
.action-row { display: flex; gap: 6px; flex-wrap: wrap; }
@media (max-width: 900px) { .toolbar { grid-template-columns: 1fr; } }
</style>
