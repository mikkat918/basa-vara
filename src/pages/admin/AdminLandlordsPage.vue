<script setup>
const rows = [{ name: 'Nabil Ahmed', properties: 8, status: 'Verified' }, { name: 'Zahid Hasan', properties: 3, status: 'Pending' }]
</script>

```vue
<template>
  <div class="landlords-page">

    <!-- Header -->
    <header class="page-header">
      <div>
        <div class="eyebrow">
          <span class="eyebrow-dot"></span>
          USER MANAGEMENT
        </div>

        <h1>Landlords</h1>

        <p>
          Manage property owners and review their platform activity.
        </p>
      </div>

      <div class="page-badge">
        <span class="badge-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </span>
        Landlord management
      </div>
    </header>

    <!-- Main Card -->
    <section class="card landlords-card">

      <div class="card-header">
        <div>
          <span class="section-eyebrow">
            PROPERTY OWNERS
          </span>

          <h2>Landlord directory</h2>

          <p>
            Overview of registered landlords and their properties.
          </p>
        </div>

        <div class="count-badge">
          {{ rows?.length || 0 }} landlords
        </div>
      </div>

      <!-- Table -->
      <div v-if="rows?.length" class="table-wrapper">
        <table>

          <thead>
            <tr>
              <th>Landlord</th>
              <th>Properties</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(row, index) in rows"
              :key="row.name + index"
            >

              <!-- Name -->
              <td>
                <div class="landlord-cell">

                  <span class="avatar">
                    {{ String(row.name || "?").charAt(0).toUpperCase() }}
                  </span>

                  <div class="landlord-info">
                    <strong>{{ row.name }}</strong>
                    <span>Property owner</span>
                  </div>

                </div>
              </td>

              <!-- Properties -->
              <td>
                <div class="property-count">

                  <span class="property-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M3 10.5 12 3l9 7.5"/>
                      <path d="M5 9.5V21h14V9.5"/>
                      <path d="M9 21v-6h6v6"/>
                    </svg>
                  </span>

                  <strong>
                    {{ row.properties }}
                  </strong>

                  <span>
                    {{ Number(row.properties) === 1 ? 'property' : 'properties' }}
                  </span>

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
                        : 'status-inactive'
                  ]"
                >
                  <span class="status-dot"></span>
                  {{ row.status }}
                </span>
              </td>

            </tr>
          </tbody>

        </table>
      </div>

      <!-- Empty -->
      <div v-else class="empty-state">

        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>

        <h3>No landlords found</h3>

        <p>
          Registered landlords will appear here once they are available.
        </p>

      </div>

    </section>

  </div>
</template>

<style scoped>
.landlords-page {
  min-height: 100%;

  padding: clamp(24px, 4vw, 48px);

  box-sizing: border-box;

  background:
    radial-gradient(
      circle at 8% 0%,
      rgba(22, 163, 74, 0.08),
      transparent 28%
    ),
    radial-gradient(
      circle at 95% 10%,
      rgba(14, 165, 164, 0.06),
      transparent 25%
    ),
    #f6f8f7;
}

/* Header */

.page-header {
  max-width: 1500px;

  margin: 0 auto 30px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 24px;
}

.eyebrow,
.section-eyebrow {
  color: var(--color-primary);

  font-size: 0.68rem;
  font-weight: 800;

  letter-spacing: 0.12em;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 8px;
}

.eyebrow-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: var(--color-primary);

  box-shadow:
    0 0 0 4px rgba(22, 163, 74, 0.1);
}

.page-header h1 {
  margin: 0;

  color: #17221d;

  font-size: clamp(2rem, 3vw, 2.7rem);

  line-height: 1.05;

  letter-spacing: -0.04em;
}

.page-header p {
  margin: 10px 0 0;

  color: var(--color-muted);

  font-size: 0.95rem;
}

.page-badge {
  display: flex;
  align-items: center;

  gap: 9px;

  padding: 9px 14px;

  border: 1px solid rgba(22, 163, 74, 0.14);

  border-radius: 999px;

  background: rgba(255, 255, 255, 0.88);

  color: #41604e;

  font-size: 0.78rem;
  font-weight: 700;

  white-space: nowrap;
}

.badge-icon {
  width: 25px;
  height: 25px;

  display: grid;
  place-items: center;

  border-radius: 50%;

  background: rgba(22, 163, 74, 0.09);

  color: var(--color-primary);
}

.badge-icon svg {
  width: 15px;
  height: 15px;

  stroke: currentColor;

  stroke-width: 1.8;

  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Main Card */

.landlords-card {
  width: 100%;
  max-width: 1500px;

  margin: 0 auto;

  padding: 0;

  overflow: hidden;

  border: 1px solid rgba(20, 40, 30, 0.07);

  border-radius: 18px;

  background: rgba(255, 255, 255, 0.96);

  box-shadow:
    0 8px 30px rgba(25, 45, 35, 0.06);
}

.card-header {
  padding: 22px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  border-bottom: 1px solid var(--color-border);
}

.card-header h2 {
  margin: 5px 0 0;

  color: #17221d;

  font-size: 1.1rem;

  letter-spacing: -0.02em;
}

.card-header p {
  margin: 5px 0 0;

  color: var(--color-muted);

  font-size: 0.78rem;
}

.count-badge {
  padding: 7px 11px;

  border-radius: 999px;

  background: #f1f5f2;

  color: #5f6d65;

  font-size: 0.72rem;
  font-weight: 700;

  white-space: nowrap;
}

/* Table */

.table-wrapper {
  width: 100%;

  overflow-x: auto;
}

table {
  width: 100%;

  min-width: 650px;

  border-collapse: collapse;
}

thead {
  background: #f8faf9;
}

th {
  padding: 13px 24px;

  color: #748078;

  font-size: 0.68rem;
  font-weight: 800;

  text-align: left;

  text-transform: uppercase;

  letter-spacing: 0.07em;

  border-bottom: 1px solid var(--color-border);
}

td {
  padding: 16px 24px;

  color: #3e4b44;

  font-size: 0.86rem;

  border-bottom: 1px solid var(--color-border);

  vertical-align: middle;
}

tbody tr {
  transition: background 0.18s ease;
}

tbody tr:hover {
  background: #fafcfb;
}

tbody tr:last-child td {
  border-bottom: none;
}

/* Landlord */

.landlord-cell {
  display: flex;

  align-items: center;

  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;

  flex: 0 0 auto;

  display: grid;
  place-items: center;

  border-radius: 50%;

  background:
    linear-gradient(
      135deg,
      rgba(22, 163, 74, 0.16),
      rgba(14, 165, 164, 0.1)
    );

  color: var(--color-primary);

  font-size: 0.8rem;
  font-weight: 800;
}

.landlord-info {
  min-width: 0;

  display: grid;

  gap: 3px;
}

.landlord-info strong {
  color: #26332c;

  font-size: 0.85rem;
}

.landlord-info span {
  color: var(--color-muted);

  font-size: 0.68rem;
}

/* Properties */

.property-count {
  display: inline-flex;

  align-items: center;

  gap: 8px;
}

.property-icon {
  width: 32px;
  height: 32px;

  display: grid;
  place-items: center;

  border-radius: 9px;

  background: rgba(22, 163, 74, 0.08);

  color: var(--color-primary);
}

.property-icon svg {
  width: 17px;
  height: 17px;

  stroke: currentColor;

  stroke-width: 1.8;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.property-count strong {
  color: #26332c;

  font-size: 0.85rem;
}

.property-count > span:last-child {
  color: var(--color-muted);

  font-size: 0.68rem;
}

/* Status */

.status-badge {
  display: inline-flex;

  align-items: center;

  gap: 7px;

  padding: 6px 10px;

  border-radius: 999px;

  font-size: 0.68rem;
  font-weight: 800;

  text-transform: capitalize;
}

.status-dot {
  width: 6px;
  height: 6px;

  border-radius: 50%;
}

.status-active {
  background: rgba(22, 163, 74, 0.09);

  color: #16834a;
}

.status-active .status-dot {
  background: #16a34a;
}

.status-pending {
  background: rgba(217, 119, 6, 0.1);

  color: #b45309;
}

.status-pending .status-dot {
  background: #d97706;
}

.status-inactive {
  background: #f0f2f1;

  color: #69746e;
}

.status-inactive .status-dot {
  background: #89948e;
}

/* Empty */

.empty-state {
  min-height: 320px;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: 40px 24px;

  text-align: center;
}

.empty-icon {
  width: 62px;
  height: 62px;

  display: grid;
  place-items: center;

  margin-bottom: 15px;

  border-radius: 18px;

  background: rgba(22, 163, 74, 0.08);

  color: var(--color-primary);
}

.empty-icon svg {
  width: 28px;
  height: 28px;

  stroke: currentColor;

  stroke-width: 1.7;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.empty-state h3 {
  margin: 0;

  color: #26332c;

  font-size: 1rem;
}

.empty-state p {
  max-width: 400px;

  margin: 7px 0 0;

  color: var(--color-muted);

  font-size: 0.8rem;

  line-height: 1.6;
}

/* Responsive */

@media (max-width: 850px) {
  .landlords-page {
    padding: 24px 18px;
  }

  .page-header {
    align-items: flex-start;

    flex-direction: column;

    margin-bottom: 24px;
  }

  .page-badge {
    align-self: flex-start;
  }
}

@media (max-width: 560px) {
  .landlords-page {
    padding: 20px 14px;
  }

  .page-header h1 {
    font-size: 1.9rem;
  }

  .card-header {
    padding: 18px;

    align-items: flex-start;

    flex-direction: column;
  }

  th {
    padding: 12px 16px;
  }

  td {
    padding: 14px 16px;
  }

  .landlords-card {
    border-radius: 14px;
  }
}

@media (max-width: 380px) {
  .landlords-page {
    padding: 18px 10px;
  }

  .page-header p {
    font-size: 0.82rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  tbody tr {
    transition: none;
  }
}
</style>
