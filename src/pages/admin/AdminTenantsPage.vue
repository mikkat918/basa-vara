<script setup>
const rows = [{ name: 'Rafi Ahmed', leases: 2, status: 'Active' }, { name: 'Mitu Noor', leases: 1, status: 'Review' }]
</script>

```vue
<template>
  <div class="page">
    <!-- Page Header -->
    <header class="page-header">
      <div class="header-copy">
        <span class="eyebrow">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3A4.5 4.5 0 0 0 4 18.5V20M10 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM16 11a3 3 0 1 0 0-6M16 14h1.5a3.5 3.5 0 0 1 3.5 3.5V20"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Tenant management
        </span>

        <h1>Tenants</h1>

        <p class="muted">
          View tenants, lease activity and current account status.
        </p>
      </div>

      <div class="header-badge">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3A4.5 4.5 0 0 0 4 18.5V20M10 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM16 11a3 3 0 1 0 0-6"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <span>{{ rows.length }} Tenants</span>
      </div>
    </header>

    <!-- Main Card -->
    <section class="card panel">
      <div class="panel-header">
        <div>
          <span class="section-eyebrow">Tenant directory</span>

          <h2>All tenants</h2>

          <p class="muted">
            Overview of registered tenants, leases and account status.
          </p>
        </div>

        <div class="count-badge">
          {{ rows.length }}
          <span>total</span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!rows.length" class="empty-state">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3A4.5 4.5 0 0 0 4 18.5V20M10 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM16 11a3 3 0 1 0 0-6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <h3>No tenants found</h3>

        <p class="muted">
          There are currently no tenant records to display.
        </p>
      </div>

      <!-- Tenant Table -->
      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Tenant</th>
              <th>Leases</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="row in rows"
              :key="row.name"
              class="tenant-row"
            >
              <!-- Tenant -->
              <td>
                <div class="tenant-cell">
                  <div class="avatar">
                    {{ row.name?.charAt(0)?.toUpperCase() || "T" }}
                  </div>

                  <div class="tenant-copy">
                    <strong>{{ row.name || "Unknown tenant" }}</strong>
                    <span>Registered tenant</span>
                  </div>
                </div>
              </td>

              <!-- Leases -->
              <td>
                <div class="lease-cell">
                  <div class="lease-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M6 4h9l3 3v13H6V4Z"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14 4v4h4M9 12h6M9 15.5h6"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>

                  <div class="lease-copy">
                    <strong>{{ row.leases }}</strong>
                    <span>
                      {{ Number(row.leases) === 1 ? "Lease" : "Leases" }}
                    </span>
                  </div>
                </div>
              </td>

              <!-- Status -->
              <td>
                <span
                  :class="[
                    'status-badge',
                    String(row.status || '').toLowerCase() === 'active'
                      ? 'status-active'
                      : String(row.status || '').toLowerCase() === 'pending'
                        ? 'status-pending'
                        : String(row.status || '').toLowerCase() === 'inactive'
                          ? 'status-inactive'
                          : String(row.status || '').toLowerCase() === 'blocked'
                            ? 'status-blocked'
                            : 'status-default'
                  ]"
                >
                  <span class="status-dot"></span>
                  {{ row.status || "Unknown" }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: clamp(22px, 3vw, 42px);
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
  margin: 0 auto 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.header-copy {
  min-width: 0;
}

.eyebrow,
.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #17845f;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.eyebrow svg {
  width: 15px;
  height: 15px;
  flex: 0 0 auto;
}

.page h1 {
  margin: 7px 0 7px;
  color: #17221d;
  font-size: clamp(27px, 3vw, 38px);
  line-height: 1.1;
  letter-spacing: -0.035em;
  font-weight: 800;
}

.muted {
  color: #718078;
  line-height: 1.55;
}

.page-header .muted {
  margin: 0;
  font-size: 14px;
}

.header-badge {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid #d8e8e0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  color: #28785b;
  font-size: 13px;
  font-weight: 750;
  box-shadow: 0 5px 18px rgba(23, 53, 42, 0.05);
}

.header-badge svg {
  width: 17px;
  height: 17px;
}

/* =========================
   Main Card
========================= */

.card {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid #e4ebe7;
  border-radius: 20px;
  box-shadow:
    0 16px 45px rgba(28, 53, 43, 0.055),
    0 3px 10px rgba(28, 53, 43, 0.035);
}

.panel {
  overflow: hidden;
}

/* =========================
   Panel Header
========================= */

.panel-header {
  min-height: 104px;
  padding: 23px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #edf1ef;
}

.panel-header h2 {
  margin: 5px 0 4px;
  color: #1b2821;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.panel-header .muted {
  margin: 0;
  font-size: 13px;
}

.count-badge {
  flex: 0 0 auto;
  min-width: 54px;
  padding: 9px 12px;
  border-radius: 12px;
  background: #eff9f4;
  color: #147b58;
  border: 1px solid #d8eee4;
  font-size: 15px;
  font-weight: 850;
  text-align: center;
}

.count-badge span {
  margin-left: 3px;
  color: #6b8277;
  font-size: 11px;
  font-weight: 650;
}

/* =========================
   Table
========================= */

.table-wrap {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  border-spacing: 0;
}

thead {
  background: #f8faf9;
}

th {
  padding: 14px 24px;
  color: #738079;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
  border-bottom: 1px solid #e8eeeb;
}

th:last-child,
td:last-child {
  width: 180px;
}

td {
  padding: 17px 24px;
  text-align: left;
  vertical-align: middle;
  border-bottom: 1px solid #edf1ef;
}

tbody tr:last-child td {
  border-bottom: none;
}

.tenant-row {
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.tenant-row:hover {
  background: #fbfdfc;
}

/* =========================
   Tenant
========================= */

.tenant-cell {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 220px;
}

.avatar {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #dff4ea, #c9eadc);
  color: #197452;
  font-size: 13px;
  font-weight: 850;
  border: 1px solid #d0e9dd;
}

.tenant-copy {
  min-width: 0;
}

.tenant-copy strong {
  display: block;
  color: #26332d;
  font-size: 14px;
  font-weight: 750;
  line-height: 1.35;
}

.tenant-copy span {
  display: block;
  margin-top: 3px;
  color: #84918b;
  font-size: 11px;
  line-height: 1.3;
}

/* =========================
   Lease
========================= */

.lease-cell {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.lease-icon {
  width: 37px;
  height: 37px;
  flex: 0 0 37px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: #f0f8f4;
  color: #16805c;
  border: 1px solid #dceee6;
}

.lease-icon svg {
  width: 19px;
  height: 19px;
}

.lease-copy strong {
  display: block;
  color: #26352e;
  font-size: 14px;
  font-weight: 800;
}

.lease-copy span {
  display: block;
  margin-top: 2px;
  color: #84918b;
  font-size: 10px;
}

/* =========================
   Status
========================= */

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  line-height: 1;
  text-transform: capitalize;
  white-space: nowrap;
  border: 1px solid transparent;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.status-active {
  color: #177a55;
  background: #ecf9f2;
  border-color: #d3eee0;
}

.status-pending {
  color: #9a6a13;
  background: #fff8e7;
  border-color: #f3e4bd;
}

.status-inactive {
  color: #6d7772;
  background: #f1f4f2;
  border-color: #e0e6e2;
}

.status-blocked {
  color: #b54848;
  background: #fff0f0;
  border-color: #f3d4d4;
}

.status-default {
  color: #68756f;
  background: #f1f4f2;
  border-color: #e0e6e2;
}

/* =========================
   Empty State
========================= */

.empty-state {
  min-height: 310px;
  padding: 45px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.empty-icon {
  width: 62px;
  height: 62px;
  display: grid;
  place-items: center;
  margin-bottom: 16px;
  border-radius: 18px;
  background: #eef8f4;
  color: #18815d;
  border: 1px solid #dceee6;
}

.empty-icon svg {
  width: 29px;
  height: 29px;
}

.empty-state h3 {
  margin: 0 0 6px;
  color: #29362f;
  font-size: 17px;
  font-weight: 800;
}

.empty-state p {
  margin: 0;
  max-width: 360px;
  font-size: 13px;
}

/* =========================
   Responsive
========================= */

@media (max-width: 850px) {
  .page {
    padding: 22px 18px;
  }

  .page-header {
    align-items: flex-start;
  }

  .panel-header {
    padding: 20px;
  }

  th,
  td {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media (max-width: 600px) {
  .page {
    padding: 18px 14px;
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 18px;
  }

  .header-badge {
    align-self: flex-start;
  }

  .page h1 {
    font-size: 27px;
  }

  .panel-header {
    min-height: auto;
    align-items: flex-start;
  }

  .panel-header h2 {
    font-size: 18px;
  }

  .count-badge {
    padding: 8px 10px;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  td {
    padding-top: 14px;
    padding-bottom: 14px;
  }
}

@media (max-width: 460px) {
  .panel-header {
    flex-direction: column;
  }

  .count-badge {
    align-self: flex-start;
  }

  .avatar {
    width: 38px;
    height: 38px;
    flex-basis: 38px;
  }

  .lease-icon {
    width: 34px;
    height: 34px;
    flex-basis: 34px;
  }

  .tenant-copy strong {
    font-size: 13px;
  }

  .tenant-cell {
    gap: 10px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tenant-row {
    transition: none;
  }
}
</style>