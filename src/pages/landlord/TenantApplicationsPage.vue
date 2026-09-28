<script setup>
import { computed } from 'vue'

const applications = computed(() => [
  { name: 'Aisha Rahman', unit: 'Dhanmondi A-12', status: 'Under review' },
  { name: 'Sabbir Hossain', unit: 'Gulshan B-5', status: 'Approved' },
  { name: 'Nabila Islam', unit: 'Banani C-9', status: 'Pending' },
])
</script>

<template>
  <div class="page applications-page">
    <!-- Header -->
    <header class="page-header">
      <div class="header-copy">
        <span class="eyebrow">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20"></path>
            <circle cx="10" cy="7.5" r="3.5"></circle>
            <path d="M16 4.5a3.5 3.5 0 0 1 0 6.8"></path>
            <path d="M17 15.2a3.5 3.5 0 0 1 3 3.3V20"></path>
          </svg>
          Rental management
        </span>

```
    <h1>Tenant applications</h1>

    <p>
      Review tenant applications and see which property each applicant
      is interested in.
    </p>
  </div>

  <div class="header-badge">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18.5z"></path>
      <path d="m8 12 2.5 2.5L16 9"></path>
    </svg>
    Applications
  </div>
</header>

<!-- Applications Card -->
<section class="card panel">
  <div class="panel-header">
    <div>
      <span class="section-label">Applicant overview</span>
      <h2>Recent applications</h2>
      <p>Tenant applications associated with your properties.</p>
    </div>

    <div class="count-badge">
      {{ applications.length }}
      <span>total</span>
    </div>
  </div>

  <!-- Desktop / Tablet Table -->
  <div v-if="applications.length" class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Tenant</th>
          <th>Property</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in applications" :key="item.name">
          <td>
            <div class="tenant-cell">
              <div class="avatar">
                {{ item.name?.charAt(0)?.toUpperCase() || 'T' }}
              </div>

              <div class="tenant-info">
                <strong>{{ item.name }}</strong>
                <span>Tenant applicant</span>
              </div>
            </div>
          </td>

          <td>
            <div class="property-cell">
              <span class="property-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 20V8l8-5 8 5v12"></path>
                  <path d="M8 20v-6h8v6"></path>
                  <path d="M9 10h.01M12 10h.01M15 10h.01"></path>
                </svg>
              </span>

              <span>{{ item.unit }}</span>
            </div>
          </td>

          <td>
            <span class="badge">
              <span class="badge-dot"></span>
              {{ item.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Empty State -->
  <div v-else class="empty-state">
    <div class="empty-icon">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20"></path>
        <circle cx="10" cy="7.5" r="3.5"></circle>
        <path d="M17 8h4M19 6v4"></path>
      </svg>
    </div>

    <h3>No tenant applications yet</h3>

    <p>
      New tenant applications will appear here when someone applies
      for one of your properties.
    </p>
  </div>

  <!-- Mobile Cards -->
  <div v-if="applications.length" class="mobile-list">
    <article
      v-for="item in applications"
      :key="`mobile-${item.name}`"
      class="application-card"
    >
      <div class="application-top">
        <div class="tenant-cell">
          <div class="avatar">
            {{ item.name?.charAt(0)?.toUpperCase() || 'T' }}
          </div>

          <div class="tenant-info">
            <strong>{{ item.name }}</strong>
            <span>Tenant applicant</span>
          </div>
        </div>

        <span class="badge">
          <span class="badge-dot"></span>
          {{ item.status }}
        </span>
      </div>

      <div class="mobile-property">
        <span class="property-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 20V8l8-5 8 5v12"></path>
            <path d="M8 20v-6h8v6"></path>
          </svg>
        </span>

        <div>
          <small>Applied property</small>
          <strong>{{ item.unit }}</strong>
        </div>
      </div>
    </article>
  </div>
</section>
```

  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: clamp(22px, 4vw, 42px);
  background:
    radial-gradient(circle at 8% 0%, rgba(23, 132, 95, 0.10), transparent 30%),
    radial-gradient(circle at 96% 12%, rgba(31, 167, 122, 0.08), transparent 28%),
    #f6f8f7;
  color: #18231f;
}

.applications-page {
  display: grid;
  gap: 24px;
}

/* Header */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.header-copy {
  min-width: 0;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 9px;
  color: #17845f;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.eyebrow svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.page-header h1 {
  margin: 0;
  color: #15211c;
  font-size: clamp(1.7rem, 3vw, 2.35rem);
  line-height: 1.1;
  letter-spacing: -0.035em;
}

.page-header p {
  max-width: 680px;
  margin: 9px 0 0;
  color: #6d7b75;
  font-size: 0.94rem;
  line-height: 1.65;
}

.header-badge {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid #d9ebe3;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.86);
  color: #397360;
  font-size: 0.78rem;
  font-weight: 800;
  white-space: nowrap;
  box-shadow: 0 6px 18px rgba(28, 73, 57, 0.05);
}

.header-badge svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Main card */
.panel {
  width: 100%;
  box-sizing: border-box;
  padding: clamp(20px, 3vw, 30px);
  border: 1px solid #e3ebe7;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 14px 40px rgba(26, 55, 44, 0.07);
  overflow: hidden;
}

/* Panel Header */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding-bottom: 22px;
  border-bottom: 1px solid #edf1ef;
}

.section-label {
  display: block;
  margin-bottom: 4px;
  color: #7b8983;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.panel-header h2 {
  margin: 0;
  color: #1b2923;
  font-size: 1.08rem;
  letter-spacing: -0.015em;
}

.panel-header p {
  margin: 5px 0 0;
  color: #7a8782;
  font-size: 0.81rem;
}

.count-badge {
  min-width: 52px;
  display: inline-flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  padding: 9px 12px;
  border: 1px solid #dceee7;
  border-radius: 11px;
  background: #f1f9f6;
  color: #17845f;
  font-size: 0.95rem;
  font-weight: 850;
}

.count-badge span {
  color: #6e8379;
  font-size: 0.68rem;
  font-weight: 700;
}

/* Table */
.table-wrap {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

table {
  width: 100%;
  min-width: 620px;
  border-collapse: collapse;
}

th {
  padding: 17px 12px 13px;
  color: #7b8983;
  font-size: 0.69rem;
  font-weight: 850;
  letter-spacing: 0.09em;
  text-align: left;
  text-transform: uppercase;
}

td {
  padding: 16px 12px;
  border-top: 1px solid #edf1ef;
  color: #33423b;
  font-size: 0.84rem;
  vertical-align: middle;
}

tbody tr {
  transition: background 0.18s ease;
}

tbody tr:hover {
  background: #fbfdfc;
}

/* Tenant */
.tenant-cell {
  display: flex;
  align-items: center;
  gap: 11px;
}

.avatar {
  flex: 0 0 38px;
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border: 1px solid #d8ebe3;
  border-radius: 11px;
  background: #eef8f4;
  color: #17845f;
  font-size: 0.8rem;
  font-weight: 850;
}

.tenant-info {
  min-width: 0;
}

.tenant-info strong,
.tenant-info span {
  display: block;
}

.tenant-info strong {
  color: #26352e;
  font-size: 0.84rem;
  font-weight: 800;
}

.tenant-info span {
  margin-top: 2px;
  color: #89948f;
  font-size: 0.69rem;
}

/* Property */
.property-cell {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #42534b;
  font-weight: 650;
}

.property-icon {
  flex: 0 0 34px;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: #f3f6f5;
  color: #60756b;
}

.property-icon svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.65;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Status */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 10px;
  border: 1px solid #dceee7;
  border-radius: 999px;
  background: #f1f9f6;
  color: #267558;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: capitalize;
  white-space: nowrap;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1b9a6b;
}

/* Empty */
.empty-state {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 35px 20px;
  text-align: center;
}

.empty-icon {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  margin-bottom: 15px;
  border-radius: 16px;
  background: #eff8f4;
  color: #17845f;
}

.empty-icon svg {
  width: 27px;
  height: 27px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.empty-state h3 {
  margin: 0;
  color: #293831;
  font-size: 0.98rem;
}

.empty-state p {
  max-width: 430px;
  margin: 7px 0 0;
  color: #89948f;
  font-size: 0.8rem;
  line-height: 1.6;
}

/* Mobile cards */
.mobile-list {
  display: none;
}

.application-card {
  padding: 16px;
  border: 1px solid #e5ece9;
  border-radius: 14px;
  background: #ffffff;
}

.application-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.mobile-property {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid #edf1ef;
}

.mobile-property small,
.mobile-property strong {
  display: block;
}

.mobile-property small {
  margin-bottom: 3px;
  color: #89948f;
  font-size: 0.67rem;
}

.mobile-property strong {
  color: #34443c;
  font-size: 0.8rem;
}

/* Tablet */
@media (max-width: 800px) {
  .page {
    padding: 24px 20px;
  }

  .page-header {
    align-items: flex-start;
  }

  .panel {
    padding: 22px;
  }
}

/* Mobile */
@media (max-width: 620px) {
  .page {
    padding: 20px 14px;
  }

  .page-header {
    flex-direction: column;
    gap: 13px;
  }

  .header-badge {
    align-self: flex-start;
  }

  .panel {
    padding: 18px;
    border-radius: 16px;
  }

  .panel-header {
    align-items: flex-start;
  }

  .table-wrap {
    display: none;
  }

  .mobile-list {
    display: grid;
    gap: 10px;
    padding-top: 16px;
  }
}

/* Small mobile */
@media (max-width: 430px) {
  .page-header h1 {
    font-size: 1.55rem;
  }

  .page-header p {
    font-size: 0.84rem;
  }

  .panel-header {
    gap: 10px;
  }

  .panel-header h2 {
    font-size: 0.98rem;
  }

  .panel-header p {
    font-size: 0.74rem;
  }

  .count-badge {
    padding: 8px 9px;
  }

  .application-top {
    align-items: flex-start;
    flex-direction: column;
  }

  .application-top .badge {
    align-self: flex-start;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>
