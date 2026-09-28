<script setup>
import { computed } from 'vue'

const properties = computed(() => [
  { title: 'Dhanmondi Studio', location: 'Dhaka', status: 'Approved' },
  { title: 'Gulshan Villa', location: 'Dhaka', status: 'Pending' },
  { title: 'Chattogram Flat', location: 'Chattogram', status: 'Approved' },
])
</script>

```vue
<template>
  <div class="page">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <span class="eyebrow">Property management</span>
        <h1>Properties</h1>
        <p class="muted">
          View and manage all properties listed on the platform.
        </p>
      </div>

      <div class="header-badge">
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

        <span>{{ properties?.length || 0 }} properties</span>
      </div>
    </div>

    <!-- Properties Card -->
    <div class="card panel">
      <!-- Card Header -->
      <div class="panel-header">
        <div class="panel-title">
          <div class="title-icon">
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
            <span class="section-eyebrow">Listing directory</span>
            <h2>All Properties</h2>
          </div>
        </div>

        <span class="count-badge">
          {{ properties?.length || 0 }}
        </span>
      </div>

      <!-- Empty State -->
      <div
        v-if="!properties?.length"
        class="empty-state"
      >
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 20h16M6 20V9l6-5 6 5v11M9 20v-5h6v5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 10h.01M15 10h.01"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <h3>No properties found</h3>
        <p>There are currently no properties to display.</p>
      </div>

      <!-- Properties Table -->
      <div
        v-else
        class="table-wrap"
      >
        <table class="data-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="property in properties"
              :key="property.title"
            >
              <!-- Property -->
              <td data-label="Property">
                <div class="property-cell">
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

                  <div class="property-info">
                    <strong>{{ property.title }}</strong>
                    <span>Property listing</span>
                  </div>
                </div>
              </td>

              <!-- Location -->
              <td data-label="Location">
                <div class="location-cell">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="10"
                      r="2.5"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.7"
                    />
                  </svg>

                  <span>{{ property.location }}</span>
                </div>
              </td>

              <!-- Status -->
              <td data-label="Status">
                <span
                  :class="[
                    'badge',
                    property.status === 'active'
                      ? 'badge-success'
                      : property.status === 'pending'
                        ? 'badge-warning'
                        : property.status === 'rejected' ||
                            property.status === 'blocked'
                          ? 'badge-danger'
                          : 'badge-muted'
                  ]"
                >
                  <span class="badge-dot"></span>
                  {{ property.status }}
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
  border: 1px solid #e8eeeb;
  border-radius: 14px;
  -webkit-overflow-scrolling: touch;
}

.data-table {
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
}

.data-table thead {
  background: #f8faf9;
}

.data-table th {
  padding: 13px 15px;
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
  padding: 14px 15px;
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
   Property Cell
========================= */

.property-cell {
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
}

.property-icon {
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: #eef8f4;
  border: 1px solid #dceee6;
  color: #16805c;
}

.property-icon svg {
  width: 19px;
  height: 19px;
}

.property-info {
  min-width: 0;
}

.property-info strong {
  display: block;
  max-width: 360px;
  overflow: hidden;
  color: #304038;
  font-size: 12px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.property-info span {
  display: block;
  margin-top: 3px;
  color: #8a958f;
  font-size: 9px;
}

/* =========================
   Location
========================= */

.location-cell {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #65736c;
}

.location-cell svg {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  color: #7e958a;
}

.location-cell span {
  max-width: 330px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* =========================
   Status
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

@media (max-width: 800px) {
  .page {
    padding: 22px 18px;
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

  .page-header {
    margin-bottom: 14px;
  }

  .page-header h1 {
    font-size: 27px;
  }

  .panel {
    padding: 15px;
    border-radius: 17px;
  }

  /*
   * Convert table rows into cards on mobile.
   */
  .table-wrap {
    overflow: visible;
    border: none;
  }

  .data-table {
    min-width: 0;
    display: block;
  }

  .data-table thead {
    display: none;
  }

  .data-table tbody {
    display: grid;
    gap: 10px;
  }

  .data-table tr {
    display: grid;
    gap: 12px;
    padding: 16px;
    border: 1px solid #e5ece8;
    border-radius: 15px;
    background: #fff;
    box-shadow: 0 5px 18px rgba(28, 53, 43, 0.035);
  }

  .data-table td {
    display: grid;
    grid-template-columns: 78px minmax(0, 1fr);
    gap: 10px;
    align-items: center;
    padding: 0;
    border: none;
  }

  .data-table td::before {
    content: attr(data-label);
    color: #8a958f;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .property-info strong {
    max-width: 100%;
  }

  .location-cell {
    min-width: 0;
  }

  .location-cell span {
    max-width: 100%;
  }
}

@media (max-width: 450px) {
  .page {
    padding: 16px 12px;
  }

  .panel-header {
    align-items: flex-start;
  }

  .panel-header h2 {
    font-size: 16px;
  }

  .count-badge {
    min-width: 26px;
  }

  .data-table td {
    grid-template-columns: 65px minmax(0, 1fr);
  }

  .property-cell {
    min-width: 0;
  }

  .property-icon {
    width: 34px;
    height: 34px;
    flex-basis: 34px;
  }

  .property-info strong {
    font-size: 11px;
  }

  .empty-state {
    min-height: 250px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .data-table tbody tr {
    transition: none;
  }
}
</style>