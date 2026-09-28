<script setup>
import { computed } from 'vue'

const users = computed(() => [
  { name: 'Ayesha Karim', role: 'Tenant', status: 'Active' },
  { name: 'Rahim Uddin', role: 'Landlord', status: 'Active' },
  { name: 'Jahid Hasan', role: 'Admin', status: 'Active' },
])
</script>

```vue
<template>
  <div class="page">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <span class="eyebrow">Account management</span>
        <h1>Users</h1>
        <p class="muted">
          Manage registered users, roles and account status.
        </p>
      </div>

      <div class="header-badge">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-5A4.5 4.5 0 0 0 2 18.5V20"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
          />
          <circle
            cx="9"
            cy="7"
            r="3"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
          />
          <path
            d="M16 11a3 3 0 1 0 0-6M16 14a4.5 4.5 0 0 1 4.5 4.5V20"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
          />
        </svg>

        <span>{{ users?.length || 0 }} users</span>
      </div>
    </div>

    <!-- Users Card -->
    <div class="card panel">
      <div class="panel-header">
        <div class="panel-title">
          <div class="title-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-5A4.5 4.5 0 0 0 2 18.5V20"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
              <circle
                cx="9"
                cy="7"
                r="3"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
              />
              <path
                d="M16 11a3 3 0 1 0 0-6M16 14a4.5 4.5 0 0 1 4.5 4.5V20"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <div>
            <span class="section-eyebrow">User directory</span>
            <h2>Registered Users</h2>
          </div>
        </div>

        <span class="count-badge">
          {{ users?.length || 0 }}
        </span>
      </div>

      <!-- Empty State -->
      <div
        v-if="!users?.length"
        class="empty-state"
      >
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-5A4.5 4.5 0 0 0 2 18.5V20"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
            <circle
              cx="9"
              cy="7"
              r="3"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
            />
          </svg>
        </div>

        <h3>No users found</h3>
        <p>There are currently no registered users to display.</p>
      </div>

      <!-- Desktop / Tablet Table -->
      <div
        v-else
        class="table-wrap"
      >
        <table class="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="user in users"
              :key="user.name"
            >
              <!-- Name -->
              <td data-label="Name">
                <div class="user-cell">
                  <div class="avatar">
                    {{ user.name?.charAt(0)?.toUpperCase() || "U" }}
                  </div>

                  <div class="user-info">
                    <strong>{{ user.name }}</strong>
                    <span>Platform user</span>
                  </div>
                </div>
              </td>

              <!-- Role -->
              <td data-label="Role">
                <span
                  :class="[
                    'badge',
                    user.role?.toLowerCase() === 'admin'
                      ? 'badge-admin'
                      : user.role?.toLowerCase() === 'landlord'
                        ? 'badge-landlord'
                        : user.role?.toLowerCase() === 'tenant'
                          ? 'badge-tenant'
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
                    user.status?.toLowerCase() === 'active'
                      ? 'badge-active'
                      : user.status?.toLowerCase() === 'pending'
                        ? 'badge-pending'
                        : user.status?.toLowerCase() === 'blocked' ||
                          user.status?.toLowerCase() === 'suspended'
                          ? 'badge-danger'
                          : 'badge-muted'
                  ]"
                >
                  <span class="badge-dot"></span>
                  {{ user.status }}
                </span>
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
   Page Header
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

.muted {
  color: #7b8881;
}

.page-header p {
  margin: 6px 0 0;
  font-size: 12px;
}

/* =========================
   Header Badge
========================= */

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
   Main Card
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
  box-sizing: border-box;
}

/* =========================
   Panel Header
========================= */

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 20px;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 11px;
}

.title-icon {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #edf8f3;
  border: 1px solid #dceee6;
  color: #16805c;
}

.title-icon svg {
  width: 21px;
  height: 21px;
}

.section-eyebrow {
  display: block;
  color: #17845f;
  font-size: 9px;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.panel-header h2 {
  margin: 4px 0 0;
  color: #24322b;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.count-badge {
  min-width: 30px;
  height: 26px;
  padding: 0 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #edf8f3;
  border: 1px solid #dceee6;
  color: #177653;
  font-size: 10px;
  font-weight: 850;
}

/* =========================
   Table
========================= */

.table-wrap {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #e7eeea;
  border-radius: 15px;
}

.users-table {
  width: 100%;
  min-width: 600px;
  border-collapse: separate;
  border-spacing: 0;
}

.users-table th {
  padding: 12px 15px;
  background: #f7faf8;
  border-bottom: 1px solid #e5ece8;
  color: #7c8983;
  font-size: 9px;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-align: left;
  text-transform: uppercase;
}

.users-table td {
  padding: 13px 15px;
  border-bottom: 1px solid #edf1ef;
  color: #405047;
  font-size: 11px;
  vertical-align: middle;
}

.users-table tbody tr:last-child td {
  border-bottom: none;
}

.users-table tbody tr {
  transition: background-color 0.18s ease;
}

.users-table tbody tr:hover {
  background: #fbfdfc;
}

/* =========================
   User Cell
========================= */

.user-cell {
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 180px;
}

.avatar {
  width: 37px;
  height: 37px;
  flex: 0 0 37px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: linear-gradient(
    135deg,
    #e8f7f0,
    #d8eee4
  );
  border: 1px solid #d2e9df;
  color: #167753;
  font-size: 12px;
  font-weight: 850;
}

.user-info {
  min-width: 0;
}

.user-info strong {
  display: block;
  overflow: hidden;
  color: #2f3e36;
  font-size: 12px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-info span {
  display: block;
  margin-top: 3px;
  color: #929c97;
  font-size: 9px;
}

/* =========================
   Badges
========================= */

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 9px;
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

/* Roles */

.badge-admin {
  color: #7051a6;
  background: #f4effb;
  border-color: #e4d8f3;
}

.badge-landlord {
  color: #176f58;
  background: #edf8f3;
  border-color: #d5ece1;
}

.badge-tenant {
  color: #3e6d98;
  background: #edf5fb;
  border-color: #d9e8f3;
}

/* Status */

.badge-active {
  color: #177a55;
  background: #ecf9f2;
  border-color: #d3eee0;
}

.badge-pending {
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
   Empty State
========================= */

.empty-state {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.empty-icon {
  width: 62px;
  height: 62px;
  display: grid;
  place-items: center;
  margin-bottom: 14px;
  border-radius: 18px;
  background: #edf8f3;
  border: 1px solid #dceee6;
  color: #16805c;
}

.empty-icon svg {
  width: 29px;
  height: 29px;
}

.empty-state h3 {
  margin: 0;
  color: #33423a;
  font-size: 16px;
  font-weight: 800;
}

.empty-state p {
  margin: 6px 0 0;
  color: #8a958f;
  font-size: 11px;
}

/* =========================
   Responsive
========================= */

@media (max-width: 700px) {
  .page {
    padding: 22px 18px;
  }

  .header-badge {
    display: none;
  }

  .panel {
    padding: 18px;
  }

  .users-table {
    min-width: 540px;
  }
}

@media (max-width: 480px) {
  .page {
    padding: 18px 14px;
  }

  .page-header h1 {
    font-size: 27px;
  }

  .panel {
    padding: 14px;
    border-radius: 17px;
  }

  .panel-header {
    align-items: flex-start;
  }

  .panel-header h2 {
    font-size: 16px;
  }

  .title-icon {
    width: 38px;
    height: 38px;
    flex-basis: 38px;
  }

  .table-wrap {
    border: none;
    overflow: visible;
  }

  .users-table,
  .users-table tbody {
    display: block;
    min-width: 0;
    width: 100%;
  }

  .users-table thead {
    display: none;
  }

  .users-table tr {
    display: grid;
    gap: 12px;
    padding: 15px;
    margin-bottom: 10px;
    border: 1px solid #e7eeea;
    border-radius: 14px;
    background: #fff;
  }

  .users-table tbody tr:hover {
    background: #fff;
  }

  .users-table td {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 0;
    border: none;
    font-size: 11px;
  }

  .users-table td::before {
    content: attr(data-label);
    flex: 0 0 auto;
    color: #8a958f;
    font-size: 8px;
    font-weight: 850;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .users-table td:first-child {
    display: block;
  }

  .users-table td:first-child::before {
    display: none;
  }

  .user-cell {
    width: 100%;
  }

  .user-info strong {
    white-space: normal;
  }
}

@media (prefers-reduced-motion: reduce) {
  .users-table tbody tr {
    transition: none;
  }
}
</style>