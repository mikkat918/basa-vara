<script setup>
const rows = [{ ref: 'INV-1024', user: 'Ayesha', amount: '৳4,500', status: 'Paid' }, { ref: 'INV-1028', user: 'Rahim', amount: '৳12,000', status: 'Pending' }]
</script>

```vue
<template>
  <div class="payments-page">

    <!-- Header -->
    <header class="page-header">
      <div>
        <div class="eyebrow">
          <span class="eyebrow-dot"></span>
          FINANCIAL ACTIVITY
        </div>

        <h1>Payments</h1>

        <p>
          Monitor payment transactions and their current processing status.
        </p>
      </div>

      <div class="page-badge">
        <span class="badge-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="2.5" y="5" width="19" height="14" rx="2.5"/>
            <path d="M2.5 10h19"/>
            <path d="M7 15h3"/>
          </svg>
        </span>
        Payment center
      </div>
    </header>

    <!-- Payments Card -->
    <section class="card payments-card">

      <div class="card-header">
        <div>
          <span class="section-eyebrow">
            TRANSACTION HISTORY
          </span>

          <h2>Recent payments</h2>

          <p>
            Review payment references, users, amounts and statuses.
          </p>
        </div>

        <div class="count-badge">
          {{ rows?.length || 0 }}
          {{ (rows?.length || 0) === 1 ? 'transaction' : 'transactions' }}
        </div>
      </div>

      <!-- Table -->
      <div v-if="rows?.length" class="table-wrapper">
        <table>

          <thead>
            <tr>
              <th>Reference</th>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(row, index) in rows"
              :key="row.ref + index"
            >

              <!-- Reference -->
              <td>
                <div class="reference-cell">

                  <span class="payment-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />
                      <path d="M3 10h18"/>
                      <path d="M7 15h3"/>
                    </svg>
                  </span>

                  <div class="reference-info">
                    <strong>{{ row.ref }}</strong>
                    <span>Payment reference</span>
                  </div>

                </div>
              </td>

              <!-- User -->
              <td>
                <div class="user-cell">

                  <span class="avatar">
                    {{ String(row.user || "?").charAt(0).toUpperCase() }}
                  </span>

                  <div class="user-info">
                    <strong>{{ row.user }}</strong>
                    <span>Account holder</span>
                  </div>

                </div>
              </td>

              <!-- Amount -->
              <td>
                <span class="amount">
                  {{ row.amount }}
                </span>
              </td>

              <!-- Status -->
              <td>
                <span
                  :class="[
                    'status-badge',
                    String(row.status || '').toLowerCase() === 'completed' ||
                    String(row.status || '').toLowerCase() === 'success' ||
                    String(row.status || '').toLowerCase() === 'successful'
                      ? 'status-success'
                      : String(row.status || '').toLowerCase() === 'pending'
                        ? 'status-pending'
                        : 'status-failed'
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

      <!-- Empty State -->
      <div v-else class="empty-state">

        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
            />
            <path d="M3 10h18"/>
            <path d="M7 15h3"/>
          </svg>
        </div>

        <h3>No payments found</h3>

        <p>
          Payment transactions will appear here when they are recorded.
        </p>

      </div>

    </section>

  </div>
</template>

<style scoped>
.payments-page {
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

.payments-card {
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

  min-width: 780px;

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

/* Reference */

.reference-cell {
  display: flex;

  align-items: center;

  gap: 12px;
}

.payment-icon {
  width: 38px;
  height: 38px;

  flex: 0 0 auto;

  display: grid;
  place-items: center;

  border-radius: 10px;

  background: rgba(22, 163, 74, 0.08);

  color: var(--color-primary);
}

.payment-icon svg {
  width: 18px;
  height: 18px;

  stroke: currentColor;

  stroke-width: 1.8;

  stroke-linecap: round;
  stroke-linejoin: round;
}

.reference-info {
  display: grid;

  gap: 3px;
}

.reference-info strong {
  color: #26332c;

  font-size: 0.82rem;

  font-family:
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    monospace;
}

.reference-info span {
  color: var(--color-muted);

  font-size: 0.65rem;
}

/* User */

.user-cell {
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

.user-info {
  display: grid;

  gap: 2px;
}

.user-info strong {
  color: #344039;

  font-size: 0.8rem;
}

.user-info span {
  color: var(--color-muted);

  font-size: 0.65rem;
}

/* Amount */

.amount {
  display: inline-flex;

  align-items: center;

  padding: 7px 10px;

  border-radius: 8px;

  background: #f3f7f4;

  color: #287044;

  font-size: 0.78rem;
  font-weight: 800;

  white-space: nowrap;
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

  white-space: nowrap;
}

.status-dot {
  width: 6px;
  height: 6px;

  border-radius: 50%;
}

.status-success {
  background: rgba(22, 163, 74, 0.09);

  color: #16834a;
}

.status-success .status-dot {
  background: #16a34a;
}

.status-pending {
  background: rgba(217, 119, 6, 0.1);

  color: #b45309;
}

.status-pending .status-dot {
  background: #d97706;
}

.status-failed {
  background: rgba(220, 38, 38, 0.08);

  color: #c24141;
}

.status-failed .status-dot {
  background: #dc2626;
}

/* Empty State */

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
  .payments-page {
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
  .payments-page {
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

  .payments-card {
    border-radius: 14px;
  }
}

@media (max-width: 380px) {
  .payments-page {
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
