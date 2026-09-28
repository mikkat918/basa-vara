<script setup>
const rows = [{ title: 'Dhanmondi Studio', owner: 'Nabil Ahmed', status: 'Approved' }, { title: 'Gulshan Apartment', owner: 'Javed Rahman', status: 'Pending' }]
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
              d="M3 10.5 12 3l9 7.5M5.5 9.5V21h13V9.5M9 21v-6h6v6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Property management
        </span>

        <h1>Properties</h1>
        <p class="muted">
          View and manage all properties listed on the platform.
        </p>
      </div>

      <div class="header-badge">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 20V9l8-5 8 5v11M8 20v-6h8v6"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>{{ rows.length }} Properties</span>
      </div>
    </header>

    <!-- Main Card -->
    <section class="card panel">
      <div class="panel-header">
        <div>
          <span class="section-eyebrow">Property directory</span>
          <h2>All properties</h2>
          <p class="muted">
            Overview of property listings, owners and current status.
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
              d="M4 20V9l8-5 8 5v11M8 20v-6h8v6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <h3>No properties found</h3>
        <p class="muted">
          There are currently no property listings to display.
        </p>
      </div>

      <!-- Property Table -->
      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Owner</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="row in rows"
              :key="row.title"
              class="property-row"
            >
              <td>
                <div class="property-cell">
                  <div class="property-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M3.5 20.5h17M5 20V9.5L12 4l7 5.5V20M9 20v-5h6v5M8.5 10.5h.01M15.5 10.5h.01"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>

                  <div class="property-copy">
                    <strong>{{ row.title }}</strong>
                    <span>Property listing</span>
                  </div>
                </div>
              </td>

              <td>
                <div class="owner-cell">
                  <div class="avatar">
                    {{ row.owner?.charAt(0)?.toUpperCase() || "O" }}
                  </div>

                  <div class="owner-copy">
                    <strong>{{ row.owner || "Unknown owner" }}</strong>
                    <span>Property owner</span>
                  </div>
                </div>
              </td>

              <td>
                <span
                  :class="[
                    'status-badge',
                    String(row.status || '').toLowerCase() === 'active'
                      ? 'status-active'
                      : String(row.status || '').toLowerCase() === 'pending'
                        ? 'status-pending'
                        : String(row.status || '').toLowerCase() === 'rejected'
                          ? 'status-rejected'
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
  font-size: clamp(27px, 3vw, 38px);
  line-height: 1.1;
  letter-spacing: -0.035em;
  font-weight: 800;
  color: #17221d;
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
  border-bottom: 1px solid #edf1ef;
  box-sizing: border-box;
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
  font-size: 15px;
  font-weight: 850;
  text-align: center;
  border: 1px solid #d8eee4;
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
  min-width: 680px;
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
  text-transform: uppercase;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid #e8eeeb;
}

td {
  padding: 17px 24px;
  border-bottom: 1px solid #edf1ef;
  text-align: left;
  vertical-align: middle;
}

tbody tr:last-child td {
  border-bottom: none;
}

.property-row {
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.property-row:hover {
  background: #fbfdfc;
}

/* =========================
   Property Cell
========================= */

.property-cell,
.owner-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.property-icon {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #edf8f3;
  color: #16805c;
  border: 1px solid #dceee6;
}

.property-icon svg {
  width: 21px;
  height: 21px;
}

.property-copy,
.owner-copy {
  min-width: 0;
}

.property-copy strong,
.owner-copy strong {
  display: block;
  color: #26332d;
  font-size: 14px;
  font-weight: 750;
  line-height: 1.35;
}

.property-copy span,
.owner-copy span {
  display: block;
  margin-top: 3px;
  color: #84918b;
  font-size: 11px;
  line-height: 1.3;
}

/* =========================
   Owner
========================= */

.avatar {
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #dff4ea, #c9eadc);
  color: #197452;
  font-size: 13px;
  font-weight: 850;
  border: 1px solid #d0e9dd;
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

.status-rejected {
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

  .property-icon {
    width: 38px;
    height: 38px;
    flex-basis: 38px;
  }

  .avatar {
    width: 34px;
    height: 34px;
    flex-basis: 34px;
  }

  .property-copy strong,
  .owner-copy strong {
    font-size: 13px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .property-row {
    transition: none;
  }
}
</style>