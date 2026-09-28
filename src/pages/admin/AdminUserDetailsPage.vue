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

```vue
<template>
  <div class="page">
    <!-- Back -->
    <div class="back-row">
      <button
        class="back-btn"
        type="button"
        @click="router.push('/admin/users')"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M19 12H5M11 18l-6-6 6-6"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Back to Users</span>
      </button>
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="card loading-card"
      aria-label="Loading user details"
    >
      <div class="loading-avatar"></div>

      <div class="loading-content">
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-line"></div>
        <div class="skeleton skeleton-small"></div>
      </div>
    </div>

    <template v-else-if="data">
      <!-- User Header -->
      <section class="card user-header">
        <div class="avatar">
          {{
            data.user.name
              ?.split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
          }}
        </div>

        <div class="user-info">
          <span class="eyebrow">User profile</span>

          <h1>{{ data.user.name }}</h1>

          <p class="email">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect
                x="3.5"
                y="5"
                width="17"
                height="14"
                rx="2"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
              />
              <path
                d="m4.5 7 7.5 5.5L19.5 7"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            {{ data.user.email }}
          </p>

          <div class="badges">
            <span
              :class="[
                'badge',
                data.user.role === 'landlord'
                  ? 'badge-success'
                  : 'badge-muted'
              ]"
            >
              <span class="badge-dot"></span>
              {{ data.user.role }}
            </span>

            <span
              :class="[
                'badge',
                data.user.status === 'active'
                  ? 'badge-success'
                  : 'badge-danger'
              ]"
            >
              <span class="badge-dot"></span>
              {{ data.user.status }}
            </span>
          </div>
        </div>

        <div class="user-actions">
          <button
            v-if="data.user.status !== 'active'"
            class="btn action-primary"
            type="button"
            @click="setStatus('active')"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="m5 12 4.5 4.5L19 7"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Activate
          </button>

          <button
            v-if="data.user.status === 'active'"
            class="btn action-secondary"
            type="button"
            @click="setStatus('suspended')"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M8 5v14M16 5v14"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            Suspend
          </button>

          <button
            class="btn action-danger"
            type="button"
            @click="deleteUser"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M5 7h14M10 11v6M14 11v6M8 7l1-2h6l1 2M7 7l.8 13h8.4L17 7"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Delete user
          </button>
        </div>
      </section>

      <!-- Main Information -->
      <div class="panels">
        <!-- Account Details -->
        <section class="card panel">
          <div class="panel-heading">
            <div class="heading-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 21a7.5 7.5 0 0 1 15 0"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div>
              <span class="section-eyebrow">Profile information</span>
              <h2>Account details</h2>
            </div>
          </div>

          <ul class="facts">
            <li>
              <span>Phone</span>
              <strong>{{ data.user.phone || "—" }}</strong>
            </li>

            <li>
              <span>Role</span>
              <strong class="capitalize">{{ data.user.role }}</strong>
            </li>

            <li>
              <span>Status</span>
              <strong class="capitalize">{{ data.user.status }}</strong>
            </li>

            <li>
              <span>Verified</span>
              <strong
                :class="data.user.verified ? 'verified' : 'not-verified'"
              >
                {{ data.user.verified ? "Yes" : "No" }}
              </strong>
            </li>

            <li>
              <span>Joined</span>
              <strong>{{ fmt(data.user.createdAt) }}</strong>
            </li>

            <li v-if="data.user.role === 'landlord'">
              <span>Response rate</span>
              <strong>
                {{ data.user.responseRate ?? "—" }}%
              </strong>
            </li>
          </ul>
        </section>

        <!-- Properties -->
        <section
          v-if="data.properties?.length"
          class="card panel"
        >
          <div class="panel-heading">
            <div class="heading-icon property-heading-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M3.5 20.5h17M5 20V9.5L12 4l7 5.5V20M9 20v-5h6v5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div>
              <span class="section-eyebrow">Listings</span>
              <h2>
                Properties
                <span class="heading-count">
                  {{ data.properties.length }}
                </span>
              </h2>
            </div>
          </div>

          <ul class="item-list">
            <li
              v-for="p in data.properties"
              :key="p.id"
              class="item-row"
            >
              <div class="property-info">
                <div class="property-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M4 20h16M6 20V9l6-5 6 5v11M9 20v-5h6v5"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>

                <div>
                  <strong>{{ p.title }}</strong>
                  <span>Property listing</span>
                </div>
              </div>

              <span
                :class="[
                  'badge',
                  p.status === 'active'
                    ? 'badge-success'
                    : p.status === 'pending'
                      ? 'badge-warning'
                      : 'badge-muted'
                ]"
              >
                <span class="badge-dot"></span>
                {{ p.status }}
              </span>
            </li>
          </ul>
        </section>
      </div>

      <!-- Transactions -->
      <section
        v-if="data.transactions?.length"
        class="card panel transactions-panel"
      >
        <div class="panel-heading">
          <div class="heading-icon transaction-heading-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
              <path
                d="M7 4v3M17 17v3"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <div>
            <span class="section-eyebrow">Financial activity</span>
            <h2>Transaction history</h2>
          </div>

          <span class="transaction-count">
            {{ data.transactions.length }} transactions
          </span>
        </div>

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
              <tr
                v-for="tx in data.transactions"
                :key="tx.id"
              >
                <td>
                  <div class="transaction-type">
                    <span class="transaction-icon">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M7 7h10M7 12h10M7 17h6"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.7"
                          stroke-linecap="round"
                        />
                      </svg>
                    </span>

                    <strong>{{ tx.type }}</strong>
                  </div>
                </td>

                <td>
                  <span
                    :class="[
                      'coin-value',
                      tx.coins > 0
                        ? 'coin-positive'
                        : tx.coins < 0
                          ? 'coin-negative'
                          : 'coin-neutral'
                    ]"
                  >
                    {{ tx.coins > 0 ? "+" : "" }}{{ tx.coins }}
                  </span>
                </td>

                <td>
                  <strong class="amount">
                    ৳{{ tx.amount }}
                  </strong>
                </td>

                <td>
                  <span
                    :class="[
                      'badge',
                      tx.status === 'Success'
                        ? 'badge-success'
                        : 'badge-warning'
                    ]"
                  >
                    <span class="badge-dot"></span>
                    {{ tx.status }}
                  </span>
                </td>

                <td>
                  <span class="date-value">
                    {{ fmtDate(tx.createdAt) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>
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
   Back Button
========================= */

.back-row {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto 16px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 8px 13px;
  border: 1px solid #dce6e1;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.82);
  color: #53645c;
  font-size: 12px;
  font-weight: 750;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.back-btn svg {
  width: 17px;
  height: 17px;
}

.back-btn:hover {
  background: #fff;
  border-color: #b9d9ca;
  color: #197453;
  transform: translateX(-2px);
}

/* =========================
   Common Card
========================= */

.card {
  width: 100%;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #e4ebe7;
  border-radius: 20px;
  box-shadow:
    0 16px 45px rgba(28, 53, 43, 0.055),
    0 3px 10px rgba(28, 53, 43, 0.035);
}

/* =========================
   User Header
========================= */

.user-header {
  max-width: 1400px;
  margin: 0 auto;
  min-height: 130px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.avatar {
  width: 66px;
  height: 66px;
  flex: 0 0 66px;
  display: grid;
  place-items: center;
  border-radius: 19px;
  background: linear-gradient(135deg, #dff4ea, #c8eadb);
  border: 1px solid #cee8dc;
  color: #187453;
  font-size: 20px;
  font-weight: 850;
  letter-spacing: -0.03em;
}

.user-info {
  flex: 1 1 280px;
  min-width: 0;
}

.eyebrow,
.section-eyebrow {
  display: inline-flex;
  align-items: center;
  color: #17845f;
  font-size: 10px;
  font-weight: 850;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.user-info h1 {
  margin: 5px 0 4px;
  color: #17221d;
  font-size: clamp(22px, 2.5vw, 29px);
  line-height: 1.15;
  font-weight: 850;
  letter-spacing: -0.035em;
}

.email {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  color: #78867f;
  font-size: 12px;
}

.email svg {
  width: 15px;
  height: 15px;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 9px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  padding: 6px 9px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 800;
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
   User Actions
========================= */

.user-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-wrap: wrap;
}

.btn {
  min-height: 39px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 8px 13px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  border: 1px solid transparent;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.btn svg {
  width: 16px;
  height: 16px;
}

.btn:hover {
  transform: translateY(-1px);
}

.action-primary {
  color: #fff;
  background: #17865e;
  border-color: #17865e;
  box-shadow: 0 6px 15px rgba(23, 134, 94, 0.16);
}

.action-primary:hover {
  background: #127651;
}

.action-secondary {
  color: #28765b;
  background: #edf8f3;
  border-color: #d6ece1;
}

.action-secondary:hover {
  background: #e3f4ec;
}

.action-danger {
  color: #b54848;
  background: #fff3f3;
  border-color: #efd7d7;
}

.action-danger:hover {
  background: #ffebeb;
}

/* =========================
   Main Panels
========================= */

.panels {
  width: 100%;
  max-width: 1400px;
  margin: 20px auto 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.panel {
  padding: 22px;
}

.panel-heading {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 17px;
}

.heading-icon {
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: #edf8f3;
  color: #16805c;
  border: 1px solid #dceee6;
}

.heading-icon svg {
  width: 20px;
  height: 20px;
}

.property-heading-icon {
  background: #eff8f5;
  color: #19755b;
}

.transaction-heading-icon {
  background: #f1f7f4;
  color: #45695a;
}

.panel-heading h2 {
  margin: 4px 0 0;
  color: #202d27;
  font-size: 18px;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.heading-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 21px;
  margin-left: 4px;
  padding: 0 6px;
  border-radius: 999px;
  background: #edf8f3;
  color: #177653;
  font-size: 10px;
  vertical-align: middle;
}

/* =========================
   Facts
========================= */

.facts {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
}

.facts li {
  min-height: 43px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 9px 0;
  border-bottom: 1px solid #edf1ef;
}

.facts li:last-child {
  border-bottom: none;
}

.facts li span {
  color: #7a8881;
  font-size: 12px;
}

.facts li strong {
  color: #334139;
  font-size: 12px;
  font-weight: 750;
  text-align: right;
  word-break: break-word;
}

.capitalize {
  text-transform: capitalize;
}

.verified {
  color: #177653 !important;
}

.not-verified {
  color: #9a6a13 !important;
}

/* =========================
   Properties
========================= */

.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
}

.item-row {
  min-height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #edf1ef;
}

.item-row:last-child {
  border-bottom: none;
}

.property-info {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.property-icon {
  width: 35px;
  height: 35px;
  flex: 0 0 35px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: #f0f8f4;
  color: #16805c;
  border: 1px solid #dceee6;
}

.property-icon svg {
  width: 18px;
  height: 18px;
}

.property-info strong {
  display: block;
  max-width: 330px;
  overflow: hidden;
  color: #304038;
  font-size: 12px;
  font-weight: 750;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.property-info div:last-child span {
  display: block;
  margin-top: 2px;
  color: #8a958f;
  font-size: 9px;
}

/* =========================
   Transactions
========================= */

.transactions-panel {
  max-width: 1400px;
  margin: 20px auto 0;
}

.transactions-panel .panel-heading {
  margin-bottom: 20px;
}

.transaction-count {
  margin-left: auto;
  padding: 7px 10px;
  border-radius: 999px;
  background: #f0f7f4;
  border: 1px solid #dce9e3;
  color: #587068;
  font-size: 10px;
  font-weight: 750;
  white-space: nowrap;
}

.table-wrap {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid #e8eeeb;
  border-radius: 13px;
}

.data-table {
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
  border-spacing: 0;
}

.data-table thead {
  background: #f8faf9;
}

.data-table th {
  padding: 12px 15px;
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
  padding: 13px 15px;
  color: #53625b;
  font-size: 11px;
  border-bottom: 1px solid #edf1ef;
  white-space: nowrap;
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

.transaction-type {
  display: flex;
  align-items: center;
  gap: 8px;
}

.transaction-icon {
  width: 29px;
  height: 29px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: #f0f8f4;
  color: #16805c;
}

.transaction-icon svg {
  width: 15px;
  height: 15px;
}

.transaction-type strong {
  color: #36443d;
  font-size: 11px;
  font-weight: 750;
}

.coin-value {
  display: inline-flex;
  min-width: 45px;
  justify-content: center;
  padding: 5px 7px;
  border-radius: 7px;
  font-size: 10px;
  font-weight: 850;
}

.coin-positive {
  color: #177653;
  background: #eaf8f1;
}

.coin-negative {
  color: #b54848;
  background: #fff0f0;
}

.coin-neutral {
  color: #6d7973;
  background: #f1f4f2;
}

.amount {
  color: #304038;
  font-size: 11px;
}

.date-value {
  color: #7c8983;
  font-size: 10px;
}

/* =========================
   Loading
========================= */

.loading-card {
  max-width: 1400px;
  min-height: 150px;
  margin: 0 auto;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 18px;
}

.loading-avatar {
  width: 66px;
  height: 66px;
  flex: 0 0 66px;
  border-radius: 19px;
  background: #e8efeb;
  animation: pulse 1.5s ease-in-out infinite;
}

.loading-content {
  flex: 1;
  display: grid;
  gap: 10px;
}

.skeleton {
  border-radius: 7px;
  background: #e8efeb;
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-title {
  width: min(280px, 70%);
  height: 20px;
}

.skeleton-line {
  width: min(360px, 80%);
  height: 12px;
}

.skeleton-small {
  width: 150px;
  height: 10px;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.55;
  }

  50% {
    opacity: 1;
  }
}

/* =========================
   Responsive
========================= */

@media (max-width: 900px) {
  .page {
    padding: 22px 18px;
  }

  .user-header {
    align-items: flex-start;
  }

  .user-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .panels {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .page {
    padding: 18px 14px;
  }

  .user-header {
    padding: 20px;
    gap: 14px;
  }

  .avatar {
    width: 58px;
    height: 58px;
    flex-basis: 58px;
    border-radius: 16px;
    font-size: 18px;
  }

  .user-info {
    flex-basis: calc(100% - 75px);
  }

  .user-info h1 {
    font-size: 22px;
  }

  .user-actions {
    gap: 7px;
  }

  .btn {
    flex: 1 1 auto;
  }

  .panel {
    padding: 18px;
  }

  .transaction-count {
    display: none;
  }
}

@media (max-width: 450px) {
  .back-row {
    margin-bottom: 12px;
  }

  .back-btn {
    width: 100%;
    justify-content: center;
  }

  .user-header {
    flex-direction: column;
    align-items: stretch;
  }

  .avatar {
    align-self: flex-start;
  }

  .user-info {
    flex-basis: auto;
    width: 100%;
  }

  .user-actions {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
  }

  .btn {
    width: 100%;
  }

  .panel-heading {
    align-items: flex-start;
  }

  .facts li {
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;
  }

  .facts li strong {
    text-align: left;
  }

  .item-row {
    align-items: flex-start;
  }

  .property-info {
    min-width: 0;
  }

  .property-info strong {
    max-width: 180px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .back-btn,
  .btn,
  .data-table tbody tr {
    transition: none;
  }

  .skeleton,
  .loading-avatar {
    animation: none;
  }
}
</style>