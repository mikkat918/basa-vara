<script setup>
const rows = [{ type: 'Top-up', amount: '+250 coins', user: 'Jubaer' }, { type: 'Unlock contact', amount: '-10 coins', user: 'Nadia' }]
</script>

```vue
<template>
  <div class="transactions-page">
    <!-- Header -->
    <header class="page-header">
      <div>
        <div class="eyebrow">
          <span class="eyebrow-dot"></span>
          FINANCIAL ACTIVITY
        </div>

        <h1>Coin transactions</h1>

        <p>
          Monitor coin purchases and transaction activity across the platform.
        </p>
      </div>

      <div class="transaction-badge">
        <span class="badge-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8"></circle>
            <path d="M12 7v10"></path>
            <path d="M15 9.5c-.6-.8-1.5-1.2-3-1.2-1.5 0-2.5.7-2.5 1.7 0 2.8 5.5 1 5.5 3.8 0 1.1-1 1.9-2.8 1.9-1.4 0-2.5-.5-3.2-1.4"></path>
          </svg>
        </span>
        Coin activity
      </div>
    </header>

    <!-- Transaction Card -->
    <section class="card transaction-card">

      <div class="card-header">
        <div>
          <h2>Transaction history</h2>
          <p>
            Recent coin-related activity recorded on the platform.
          </p>
        </div>

        <div class="count-badge">
          {{ rows?.length || 0 }} transactions
        </div>
      </div>

      <!-- Desktop Table -->
      <div v-if="rows?.length" class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Transaction type</th>
              <th>User</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(row, index) in rows"
              :key="row.type + row.user + index"
            >
              <td>
                <div class="type-cell">
                  <span class="type-icon">
                    <svg
                      v-if="String(row.type).toLowerCase().includes('buy')"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path d="M12 3v18"></path>
                      <path d="M7 7h7a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h8"></path>
                    </svg>

                    <svg
                      v-else
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle cx="12" cy="12" r="8"></circle>
                      <path d="M8.5 12h7"></path>
                    </svg>
                  </span>

                  <div>
                    <strong>{{ row.type }}</strong>
                    <span>Coin transaction</span>
                  </div>
                </div>
              </td>

              <td>
                <div class="user-cell">
                  <span class="avatar">
                    {{ String(row.user || "?").charAt(0).toUpperCase() }}
                  </span>

                  <span>{{ row.user }}</span>
                </div>
              </td>

              <td>
                <span class="amount">
                  {{ row.amount }}
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
            <circle cx="12" cy="12" r="8"></circle>
            <path d="M12 8v8"></path>
            <path d="M9 10.5h4a2 2 0 0 1 0 4H9"></path>
          </svg>
        </div>

        <h3>No transactions yet</h3>

        <p>
          Coin transactions will appear here once activity is recorded.
        </p>
      </div>

    </section>
  </div>
</template>

<style scoped>
.transactions-page {
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

.eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 8px;

  color: var(--color-primary);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
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

.transaction-badge {
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

.transaction-card {
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
  margin: 0;

  color: #17221d;
  font-size: 1.1rem;
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

  text-transform: uppercase;
  letter-spacing: 0.07em;

  text-align: left;

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
  transition:
    background 0.18s ease;
}

tbody tr:hover {
  background: #fafcfb;
}

tbody tr:last-child td {
  border-bottom: none;
}

/* Type */

.type-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.type-icon {
  width: 38px;
  height: 38px;

  flex: 0 0 auto;

  display: grid;
  place-items: center;

  border-radius: 10px;

  background: rgba(22, 163, 74, 0.08);
  color: var(--color-primary);
}

.type-icon svg {
  width: 18px;
  height: 18px;

  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.type-cell strong {
  display: block;

  color: #26332c;
  font-size: 0.85rem;
  font-weight: 700;
}

.type-cell div > span {
  display: block;

  margin-top: 2px;

  color: var(--color-muted);
  font-size: 0.68rem;
}

/* User */

.user-cell {
  display: flex;
  align-items: center;
  gap: 10px;

  color: #34423a;
  font-weight: 600;
}

.avatar {
  width: 32px;
  height: 32px;

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

  font-size: 0.72rem;
  font-weight: 800;
}

/* Amount */

.amount {
  display: inline-flex;
  align-items: center;

  padding: 6px 10px;

  border-radius: 8px;

  background: rgba(22, 163, 74, 0.07);

  color: var(--color-primary);

  font-size: 0.82rem;
  font-weight: 800;
}

/* Empty */

.empty-state {
  min-height: 300px;

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
  .transactions-page {
    padding: 24px 18px;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 24px;
  }

  .transaction-badge {
    align-self: flex-start;
  }
}

@media (max-width: 560px) {
  .transactions-page {
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

  .transaction-card {
    border-radius: 14px;
  }
}

@media (max-width: 380px) {
  .transactions-page {
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