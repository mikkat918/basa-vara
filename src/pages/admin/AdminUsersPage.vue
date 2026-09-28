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

```vue
<template>
  <div class="page">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <span class="eyebrow">User management</span>
        <h1>Users</h1>
        <p class="muted">
          Manage all registered users on the platform.
        </p>
      </div>

      <div class="header-badge">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <span>{{ users?.length || 0 }} users</span>
      </div>
    </div>

    <!-- Main Card -->
    <div class="card panel">
      <!-- Toolbar -->
      <div class="toolbar">
        <div class="search-field">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle
              cx="11"
              cy="11"
              r="6.5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
            />
            <path
              d="m16 16 4.5 4.5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
          </svg>

          <input
            v-model="q"
            class="control"
            placeholder="Search by name or email…"
            @keyup.enter="load"
          />
        </div>

        <div class="filter-field">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 6h16M7 12h10M10 18h4"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
          </svg>

          <select
            v-model="roleFilter"
            class="control"
            @change="load"
          >
            <option value="">All roles</option>
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div class="filter-field">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle
              cx="12"
              cy="12"
              r="8"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
            />
            <path
              d="M12 8v4l2.5 2"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
          </svg>

          <select
            v-model="statusFilter"
            class="control"
            @change="load"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        <button
          class="btn btn-primary search-btn"
          type="button"
          :disabled="loading"
          @click="load"
        >
          <svg
            v-if="!loading"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="11"
              r="6.5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
            />
            <path
              d="m16 16 4.5 4.5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
          </svg>

          <span>{{ loading ? "Loading…" : "Search" }}</span>
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="loading-state">
        <div class="loading-row" v-for="n in 5" :key="n">
          <div class="loading-avatar"></div>
          <div class="loading-lines">
            <span></span>
            <span></span>
          </div>
          <div class="loading-pill"></div>
        </div>
      </div>

      <!-- Empty -->
      <div
        v-else-if="!users.length"
        class="state-box"
      >
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle
              cx="9"
              cy="8"
              r="3.5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
            />
            <path
              d="M3.5 20a5.5 5.5 0 0 1 11 0M17 11a3 3 0 1 0 0-6M17 14.5a4.5 4.5 0 0 1 3.5 4.5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <h3>No users found</h3>
        <p>No users match your current search or filters.</p>
      </div>

      <!-- Users Table -->
      <div
        v-else
        class="table-wrap table-as-cards"
      >
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
            <tr
              v-for="user in users"
              :key="user.id"
            >
              <!-- Name -->
              <td data-label="Name">
                <button
                  class="user-cell"
                  type="button"
                  @click="router.push(`/admin/users/${user.id}`)"
                >
                  <span class="user-avatar">
                    {{
                      user.name
                        ?.split(" ")
                        .map((p) => p[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()
                    }}
                  </span>

                  <span class="user-name">
                    {{ user.name }}
                  </span>
                </button>
              </td>

              <!-- Email -->
              <td data-label="Email">
                <span class="email-cell">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect
                      x="3.5"
                      y="5"
                      width="17"
                      height="14"
                      rx="2"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                    />
                    <path
                      d="m4.5 7 7.5 5.5L19.5 7"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  {{ user.email }}
                </span>
              </td>

              <!-- Role -->
              <td data-label="Role">
                <span
                  :class="[
                    'badge',
                    user.role === 'landlord'
                      ? 'badge-success'
                      : user.role === 'admin'
                        ? 'badge-warning'
                        : 'badge-muted'
                  ]"
                >
                  <span class="badge-dot"></span>
                  {{ user.role }}
                </span>
              </td>

              <!-- Status -->
              <td data-label="Status">
                <span
                  :class="[
                    'badge',
                    user.status === 'active'
                      ? 'badge-success'
                      : user.status === 'suspended' ||
                          user.status === 'blocked'
                        ? 'badge-danger'
                        : 'badge-warning'
                  ]"
                >
                  <span class="badge-dot"></span>
                  {{ user.status }}
                </span>
              </td>

              <!-- Joined -->
              <td data-label="Joined">
                <span class="date-cell">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect
                      x="4"
                      y="5"
                      width="16"
                      height="15"
                      rx="2"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                    />
                    <path
                      d="M8 3v4M16 3v4M4 9h16"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                    />
                  </svg>

                  {{ fmt(user.createdAt) }}
                </span>
              </td>

              <!-- Actions -->
              <td data-label="Actions">
                <div class="action-row">
                  <button
                    class="btn btn-secondary"
                    type="button"
                    @click="router.push(`/admin/users/${user.id}`)"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="2.5"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.6"
                      />
                    </svg>
                    View
                  </button>

                  <button
                    v-if="user.status !== 'active'"
                    class="btn btn-secondary"
                    type="button"
                    @click="setStatus(user, 'active')"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="m5 12 4.5 4.5L19 7"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Activate
                  </button>

                  <button
                    v-if="user.status === 'active'"
                    class="btn btn-secondary"
                    type="button"
                    @click="setStatus(user, 'suspended')"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M8 5v14M16 5v14"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                      />
                    </svg>
                    Suspend
                  </button>

                  <button
                    class="btn btn-danger"
                    type="button"
                    @click="deleteUser(user)"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M5 7h14M10 11v6M14 11v6M8 7l1-2h6l1 2M7 7l.8 13h8.4L17 7"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Delete
                  </button>
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
  max-width: 1400px;
  margin: 0 auto 18px;
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

.page-header p {
  margin: 6px 0 0;
  color: #7b8881;
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
   Card
========================= */

.card {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #e4ebe7;
  border-radius: 20px;
  box-shadow:
    0 16px 45px rgba(28, 53, 43, 0.055),
    0 3px 10px rgba(28, 53, 43, 0.035);
}

.panel {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 22px;
  display: grid;
  gap: 17px;
  box-sizing: border-box;
}

/* =========================
   Toolbar
========================= */

.toolbar {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) 170px 170px auto;
  gap: 10px;
  align-items: center;
}

.search-field,
.filter-field {
  position: relative;
  min-width: 0;
}

.search-field > svg,
.filter-field > svg {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 12px;
  width: 16px;
  height: 16px;
  color: #829089;
  pointer-events: none;
  transform: translateY(-50%);
}

.control {
  width: 100%;
  min-height: 42px;
  box-sizing: border-box;
  border: 1px solid #dce6e1;
  border-radius: 11px;
  background: #fbfcfc;
  color: #304038;
  outline: none;
  font: inherit;
  font-size: 11px;
  font-weight: 650;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

input.control {
  padding: 0 13px 0 38px;
}

select.control {
  padding: 0 32px 0 37px;
  cursor: pointer;
  appearance: auto;
}

.control::placeholder {
  color: #9aa59f;
}

.control:focus {
  border-color: #9bcdb8;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(23, 132, 95, 0.08);
}

.btn {
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 800;
  line-height: 1;
  cursor: pointer;
  border: 1px solid transparent;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.btn svg {
  width: 15px;
  height: 15px;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.btn-primary {
  color: #fff;
  background: #17865e;
  border-color: #17865e;
  box-shadow: 0 6px 15px rgba(23, 134, 94, 0.15);
}

.btn-primary:hover:not(:disabled) {
  background: #127651;
}

.btn-secondary {
  color: #34705a;
  background: #eef8f3;
  border-color: #d8ebe1;
}

.btn-secondary:hover:not(:disabled) {
  background: #e3f4ec;
}

.btn-danger {
  color: #b54848;
  background: #fff3f3;
  border-color: #efd8d8;
}

.btn-danger:hover:not(:disabled) {
  background: #ffebeb;
}

.search-btn {
  padding-inline: 17px;
}

/* =========================
   Table
========================= */

.table-wrap {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #e8eeeb;
  border-radius: 14px;
  -webkit-overflow-scrolling: touch;
}

.data-table {
  width: 100%;
  min-width: 980px;
  border-collapse: collapse;
}

.data-table thead {
  background: #f8faf9;
}

.data-table th {
  padding: 13px 14px;
  color: #738079;
  font-size: 9px;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
  border-bottom: 1px solid #e8eeeb;
}

.data-table td {
  padding: 13px 14px;
  color: #53625b;
  font-size: 11px;
  border-bottom: 1px solid #edf1ef;
  vertical-align: middle;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.data-table tbody tr {
  transition: background-color 0.2s ease;
}

.data-table tbody tr:hover {
  background: #fbfdfc;
}

/* =========================
   User Cell
========================= */

.user-cell {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  max-width: 230px;
  padding: 0;
  border: none;
  background: transparent;
  color: #26362e;
  cursor: pointer;
  text-align: left;
}

.user-avatar {
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: #e5f4ed;
  border: 1px solid #d4eadd;
  color: #187554;
  font-size: 10px;
  font-weight: 850;
}

.user-name {
  overflow: hidden;
  font-size: 11px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-cell:hover .user-name {
  color: #17845f;
  text-decoration: underline;
}

.email-cell,
.date-cell {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #68766f;
  white-space: nowrap;
}

.email-cell svg,
.date-cell svg {
  width: 14px;
  height: 14px;
  color: #8a9790;
}

/* =========================
   Badges
========================= */

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  border-radius: 999px;
  font-size: 9px;
  font-weight: 850;
  line-height: 1;
  text-transform: capitalize;
  white-space: nowrap;
  border: 1px solid transparent;
}

.badge-dot {
  width: 5px;
  height: 5px;
  flex: 0 0 5px;
  border-radius: 50%;
  background: currentColor;
}

.badge-success {
  color: #177a55;
  background: #ecf9f2;
  border-color: #d3eee0;
}

.badge-warning {
  color: #9a6a13;
  background: #fff8e7;
  border-color: #f3e4bd;
}

.badge-danger {
  color: #b54848;
  background: #fff0f0;
  border-color: #f3d4d4;
}

.badge-muted {
  color: #68756f;
  background: #f1f4f2;
  border-color: #e0e6e2;
}

/* =========================
   Actions
========================= */

.action-row {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
}

.action-row .btn {
  min-height: 32px;
  padding: 6px 9px;
  font-size: 9px;
}

/* =========================
   Empty State
========================= */

.state-box {
  min-height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 35px 20px;
  text-align: center;
}

.empty-icon {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  margin-bottom: 13px;
  border-radius: 17px;
  background: #edf8f3;
  border: 1px solid #dceee6;
  color: #16805c;
}

.empty-icon svg {
  width: 27px;
  height: 27px;
}

.state-box h3 {
  margin: 0;
  color: #33423a;
  font-size: 15px;
  font-weight: 800;
}

.state-box p {
  margin: 6px 0 0;
  color: #8a958f;
  font-size: 11px;
}

/* =========================
   Loading
========================= */

.loading-state {
  overflow: hidden;
  border: 1px solid #edf1ef;
  border-radius: 14px;
}

.loading-row {
  min-height: 62px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 15px;
  border-bottom: 1px solid #edf1ef;
}

.loading-row:last-child {
  border-bottom: none;
}

.loading-avatar {
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  border-radius: 10px;
  background: #e8efeb;
  animation: pulse 1.4s ease-in-out infinite;
}

.loading-lines {
  flex: 1;
  display: grid;
  gap: 7px;
}

.loading-lines span {
  display: block;
  width: min(190px, 70%);
  height: 9px;
  border-radius: 5px;
  background: #e8efeb;
  animation: pulse 1.4s ease-in-out infinite;
}

.loading-lines span:last-child {
  width: min(130px, 50%);
}

.loading-pill {
  width: 60px;
  height: 22px;
  border-radius: 999px;
  background: #e8efeb;
  animation: pulse 1.4s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }
}

/* =========================
   Responsive
========================= */

@media (max-width: 1050px) {
  .toolbar {
    grid-template-columns: 1fr 1fr;
  }

  .search-field {
    grid-column: 1 / -1;
  }

  .search-btn {
    width: 100%;
  }
}

@media (max-width: 800px) {
  .page {
    padding: 22px 18px;
  }

  .page-header {
    align-items: flex-start;
  }

  .header-badge {
    display: none;
  }

  .panel {
    padding: 18px;
  }
}

@media (max-width: 620px) {
  .page {
    padding: 18px 14px;
  }

  .toolbar {
    grid-template-columns: 1fr;
  }

  .search-field {
    grid-column: auto;
  }

  .control {
    min-height: 44px;
  }

  /*
   * Convert the table into mobile cards.
   */
  .table-as-cards {
    overflow: visible;
    border: none;
  }

  .table-as-cards .data-table {
    min-width: 0;
    display: block;
  }

  .table-as-cards thead {
    display: none;
  }

  .table-as-cards tbody {
    display: grid;
    gap: 10px;
  }

  .table-as-cards tr {
    display: grid;
    gap: 10px;
    padding: 15px;
    border: 1px solid #e5ece8;
    border-radius: 15px;
    background: #fff;
    box-shadow: 0 5px 18px rgba(28, 53, 43, 0.035);
  }

  .table-as-cards td {
    display: grid;
    grid-template-columns: 82px minmax(0, 1fr);
    gap: 10px;
    align-items: center;
    padding: 0;
    border: none;
    min-width: 0;
  }

  .table-as-cards td::before {
    content: attr(data-label);
    color: #8a958f;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .table-as-cards td[data-label="Name"] {
    padding-bottom: 4px;
  }

  .user-cell {
    max-width: 100%;
  }

  .action-row {
    width: 100%;
  }

  .action-row .btn {
    flex: 1 1 auto;
  }
}

@media (max-width: 450px) {
  .page-header h1 {
    font-size: 25px;
  }

  .page-header p {
    max-width: 280px;
    line-height: 1.5;
  }

  .panel {
    padding: 14px;
    border-radius: 16px;
  }

  .table-as-cards td {
    grid-template-columns: 70px minmax(0, 1fr);
  }

  .action-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .action-row .btn {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn,
  .data-table tbody tr,
  .user-cell {
    transition: none;
  }

  .loading-avatar,
  .loading-lines span,
  .loading-pill {
    animation: none;
  }
}
</style>