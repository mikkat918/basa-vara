<script setup>
const rows = [{ action: 'User verified', actor: 'System', time: '09:30 AM' }, { action: 'Listing approved', actor: 'Admin', time: '08:15 AM' }]
</script>

```vue
<template>
  <div class="logs-page">

    <!-- Header -->
    <header class="page-header">
      <div>
        <div class="eyebrow">
          <span class="eyebrow-dot"></span>
          SYSTEM MONITORING
        </div>

        <h1>Activity logs</h1>

        <p>
          Review administrative actions and recent platform activity.
        </p>
      </div>

      <div class="page-badge">
        <span class="badge-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 8v4l3 2"/>
            <circle cx="12" cy="12" r="9"/>
          </svg>
        </span>
        Audit activity
      </div>
    </header>

    <!-- Logs Card -->
    <section class="card logs-card">

      <div class="card-header">
        <div>
          <span class="section-eyebrow">
            AUDIT TRAIL
          </span>

          <h2>Recent activity</h2>

          <p>
            Administrative actions recorded by the platform.
          </p>
        </div>

        <div class="count-badge">
          {{ rows?.length || 0 }} logs
        </div>
      </div>

      <!-- Table -->
      <div v-if="rows?.length" class="table-wrapper">
        <table>

          <thead>
            <tr>
              <th>Action</th>
              <th>Actor</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(row, index) in rows"
              :key="row.action + row.time + index"
            >

              <!-- Action -->
              <td>
                <div class="action-cell">

                  <span class="action-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 8v4l3 2"/>
                      <circle cx="12" cy="12" r="9"/>
                    </svg>
                  </span>

                  <div class="action-info">
                    <strong>{{ row.action }}</strong>
                    <span>Administrative activity</span>
                  </div>

                </div>
              </td>

              <!-- Actor -->
              <td>
                <div class="actor-cell">

                  <span class="avatar">
                    {{ String(row.actor || "?").charAt(0).toUpperCase() }}
                  </span>

                  <div class="actor-info">
                    <strong>{{ row.actor }}</strong>
                    <span>Administrator</span>
                  </div>

                </div>
              </td>

              <!-- Time -->
              <td>
                <div class="time-cell">

                  <span class="time-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9"/>
                      <path d="M12 7v5l3 2"/>
                    </svg>
                  </span>

                  <span>{{ row.time }}</span>

                </div>
              </td>

            </tr>
          </tbody>

        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">

        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 8v4l3 2"/>
            <circle cx="12" cy="12" r="9"/>
          </svg>
        </div>

        <h3>No activity logs</h3>

        <p>
          Administrative actions will appear here when activity is recorded.
        </p>

      </div>

    </section>

  </div>
</template>

<style scoped>
.logs-page {
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

.logs-card {
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

/* Card Header */

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

  min-width: 700px;

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

/* Action */

.action-cell {
  display: flex;
  align-items: center;

  gap: 12px;
}

.action-icon {
  width: 38px;
  height: 38px;

  flex: 0 0 auto;

  display: grid;
  place-items: center;

  border-radius: 10px;

  background: rgba(22, 163, 74, 0.08);

  color: var(--color-primary);
}

.action-icon svg {
  width: 18px;
  height: 18px;

  stroke: currentColor;

  stroke-width: 1.8;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.action-info {
  display: grid;

  gap: 3px;
}

.action-info strong {
  color: #26332c;

  font-size: 0.84rem;
}

.action-info span {
  color: var(--color-muted);

  font-size: 0.68rem;
}

/* Actor */

.actor-cell {
  display: flex;
  align-items: center;

  gap: 10px;
}

.avatar {
  width: 36px;
  height: 36px;

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

  font-size: 0.76rem;
  font-weight: 800;
}

.actor-info {
  display: grid;

  gap: 2px;
}

.actor-info strong {
  color: #344039;

  font-size: 0.8rem;
}

.actor-info span {
  color: var(--color-muted);

  font-size: 0.65rem;
}

/* Time */

.time-cell {
  display: inline-flex;
  align-items: center;

  gap: 8px;

  color: #647069;

  font-size: 0.78rem;

  white-space: nowrap;
}

.time-icon {
  width: 28px;
  height: 28px;

  display: grid;
  place-items: center;

  border-radius: 8px;

  background: #f3f5f4;

  color: #718078;
}

.time-icon svg {
  width: 15px;
  height: 15px;

  stroke: currentColor;

  stroke-width: 1.8;

  stroke-linecap: round;
  stroke-linejoin: round;
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
  max-width: 410px;

  margin: 7px 0 0;

  color: var(--color-muted);

  font-size: 0.8rem;

  line-height: 1.6;
}

/* Responsive */

@media (max-width: 850px) {
  .logs-page {
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
  .logs-page {
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

  .logs-card {
    border-radius: 14px;
  }
}

@media (max-width: 380px) {
  .logs-page {
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