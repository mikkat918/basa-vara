
<script setup>
import { computed } from 'vue'
import { formatBdt, formatDateTime } from '../../utils/format'
import EmptyState from '../common/EmptyState.vue'

const props = defineProps({
  rows: {
    type: Array,
    default: () => [],
  },
})

const normalizedRows = computed(() => {
  return props.rows.map((transaction) => ({
    ...transaction,
    statusKey: String(transaction.status || '')
      .trim()
      .toLowerCase(),
  }))
})

function statusClass(status) {
  const value = String(status || '').toLowerCase()

  if (
    value === 'success' ||
    value === 'completed' ||
    value === 'complete' ||
    value === 'paid'
  ) {
    return 'status-success'
  }

  if (
    value === 'pending' ||
    value === 'processing' ||
    value === 'in_progress'
  ) {
    return 'status-pending'
  }

  if (
    value === 'failed' ||
    value === 'cancelled' ||
    value === 'canceled' ||
    value === 'rejected'
  ) {
    return 'status-danger'
  }

  return 'status-neutral'
}

function statusLabel(status) {
  if (!status) return 'Unknown'

  const value = String(status).replace(/[_-]/g, ' ')

  return value.charAt(0).toUpperCase() + value.slice(1)
}

function isCredit(transaction) {
  const type = String(transaction.type || '').toLowerCase()

  return (
    type.includes('purchase') ||
    type.includes('credit') ||
    type.includes('topup') ||
    type.includes('deposit')
  )
}

function formatCoins(transaction) {
  const coins = Number(transaction.coins || 0)

  if (!coins) return '0'

  return `${coins > 0 ? '+' : ''}${coins}`
}
</script>

<template>
  <section class="transactions">
    <EmptyState
      v-if="!normalizedRows.length"
      title="No transactions"
      message="Purchases and contact unlocks will appear here."
    />

    <div v-else class="transaction-card">
      <!-- Header -->
      <header class="transaction-header">
        <div class="header-title">
          <span class="header-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
                stroke="currentColor"
                stroke-width="1.7"
              />
              <path
                d="M8 7h8M8 11h8M8 15h5"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </span>

          <div>
            <h2>Transaction History</h2>
            <p>{{ normalizedRows.length }} transaction{{ normalizedRows.length === 1 ? '' : 's' }}</p>
          </div>
        </div>
      </header>

      <!-- Desktop / Tablet Table -->
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Coins</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="transaction in normalizedRows"
              :key="transaction.id"
            >
              <!-- Date -->
              <td data-label="Date">
                <div class="date-cell">
                  <span class="date-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="16"
                        rx="2"
                        stroke="currentColor"
                        stroke-width="1.7"
                      />
                      <path
                        d="M8 3v4M16 3v4M3 10h18"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>

                  <span>
                    {{ formatDateTime(transaction.createdAt) }}
                  </span>
                </div>
              </td>

              <!-- Description -->
              <td data-label="Description">
                <div class="description-cell">
                  <span class="transaction-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 5h14v14H5z"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 9h8M8 13h6"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linecap="round"
                      />
                    </svg>
                  </span>

                  <span class="description-text">
                    {{ transaction.description || transaction.type || 'Transaction' }}
                  </span>
                </div>
              </td>

              <!-- Coins -->
              <td data-label="Coins">
                <span
                  class="coins-value"
                  :class="{
                    credit: isCredit(transaction),
                    debit: !isCredit(transaction),
                  }"
                >
                  {{ formatCoins(transaction) }}
                </span>
              </td>

              <!-- Amount -->
              <td data-label="Amount">
                <span class="amount-value">
                  {{
                    transaction.amount
                      ? formatBdt(transaction.amount)
                      : '—'
                  }}
                </span>
              </td>

              <!-- Status -->
              <td data-label="Status">
                <span
                  class="status-badge"
                  :class="statusClass(transaction.statusKey)"
                >
                  <span class="status-dot" aria-hidden="true"></span>
                  {{ statusLabel(transaction.status) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile cards -->
      <div class="mobile-transactions">
        <article
          v-for="transaction in normalizedRows"
          :key="`mobile-${transaction.id}`"
          class="mobile-transaction"
        >
          <div class="mobile-top">
            <div class="mobile-description">
              <span class="transaction-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 5h14v14H5z"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 9h8M8 13h6"
                    stroke="currentColor"
                    stroke-width="1.7"
                    stroke-linecap="round"
                  />
                </svg>
              </span>

              <div>
                <strong>
                  {{ transaction.description || transaction.type || 'Transaction' }}
                </strong>

                <span class="mobile-date">
                  {{ formatDateTime(transaction.createdAt) }}
                </span>
              </div>
            </div>

            <span
              class="status-badge"
              :class="statusClass(transaction.statusKey)"
            >
              <span class="status-dot" aria-hidden="true"></span>
              {{ statusLabel(transaction.status) }}
            </span>
          </div>

          <div class="mobile-details">
            <div class="mobile-detail">
              <span>Coins</span>

              <strong
                class="coins-value"
                :class="{
                  credit: isCredit(transaction),
                  debit: !isCredit(transaction),
                }"
              >
                {{ formatCoins(transaction) }}
              </strong>
            </div>

            <div class="mobile-detail">
              <span>Amount</span>

              <strong>
                {{
                  transaction.amount
                    ? formatBdt(transaction.amount)
                    : '—'
                }}
              </strong>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ========================================
   Container
======================================== */

.transactions {
  width: 100%;
}

.transaction-card {
  width: 100%;

  overflow: hidden;

  border: 1px solid #dbe3ec;
  border-radius: 12px;

  background: #ffffff;

  box-shadow:
    0 3px 10px rgba(15, 23, 42, 0.04);
}

/* ========================================
   Header
======================================== */

.transaction-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 17px 20px;

  border-bottom: 1px solid #e8edf3;

  background: #ffffff;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 11px;
}

.header-icon {
  display: grid;
  place-items: center;

  width: 35px;
  height: 35px;

  flex: 0 0 auto;

  border-radius: 9px;

  background: #eff6ff;
  color: #2563eb;
}

.header-icon svg {
  width: 18px;
  height: 18px;
}

.header-title h2 {
  margin: 0;

  color: #0f172a;

  font-size: 15px;
  font-weight: 700;
}

.header-title p {
  margin: 3px 0 0;

  color: #94a3b8;

  font-size: 10px;
}

/* ========================================
   Table
======================================== */

.table-wrap {
  width: 100%;
  overflow-x: auto;
}

.data-table {
  width: 100%;

  border-collapse: collapse;

  table-layout: auto;
}

.data-table th {
  padding: 11px 18px;

  border-bottom: 1px solid #e8edf3;

  background: #f8fafc;

  color: #64748b;

  font-size: 10px;
  font-weight: 700;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.04em;

  white-space: nowrap;
}

.data-table td {
  padding: 14px 18px;

  border-bottom: 1px solid #eef2f6;

  color: #334155;

  font-size: 12px;

  vertical-align: middle;
}

.data-table tbody tr:last-child td {
  border-bottom: 0;
}

.data-table tbody tr {
  transition:
    background-color 0.16s ease;
}

.data-table tbody tr:hover {
  background: #f8fbff;
}

/* ========================================
   Date
======================================== */

.date-cell {
  display: flex;
  align-items: center;
  gap: 8px;

  white-space: nowrap;
}

.date-icon {
  display: grid;
  place-items: center;

  width: 27px;
  height: 27px;

  flex: 0 0 auto;

  border-radius: 7px;

  background: #f8fafc;
  color: #64748b;
}

.date-icon svg {
  width: 14px;
  height: 14px;
}

/* ========================================
   Description
======================================== */

.description-cell {
  display: flex;
  align-items: center;
  gap: 9px;

  min-width: 180px;
}

.transaction-icon {
  display: grid;
  place-items: center;

  width: 29px;
  height: 29px;

  flex: 0 0 auto;

  border-radius: 7px;

  background: #f1f5f9;
  color: #64748b;
}

.transaction-icon svg {
  width: 15px;
  height: 15px;
}

.description-text {
  color: #1e293b;

  font-weight: 600;

  line-height: 1.4;
}

/* ========================================
   Coins
======================================== */

.coins-value {
  display: inline-flex;
  align-items: center;

  font-weight: 700;
  white-space: nowrap;
}

.coins-value.credit {
  color: #15803d;
}

.coins-value.debit {
  color: #dc2626;
}

/* ========================================
   Amount
======================================== */

.amount-value {
  color: #1e293b;

  font-weight: 700;

  white-space: nowrap;
}

/* ========================================
   Status
======================================== */

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;

  min-height: 25px;

  padding: 4px 8px;

  border: 1px solid transparent;
  border-radius: 999px;

  font-size: 10px;
  font-weight: 700;

  white-space: nowrap;
}

.status-dot {
  width: 5px;
  height: 5px;

  border-radius: 50%;

  background: currentColor;
}

.status-success {
  border-color: #bbf7d0;

  background: #f0fdf4;
  color: #15803d;
}

.status-pending {
  border-color: #fde68a;

  background: #fffbeb;
  color: #a16207;
}

.status-danger {
  border-color: #fecaca;

  background: #fef2f2;
  color: #dc2626;
}

.status-neutral {
  border-color: #e2e8f0;

  background: #f8fafc;
  color: #64748b;
}

/* ========================================
   Mobile Cards
======================================== */

.mobile-transactions {
  display: none;
}

.mobile-transaction {
  padding: 15px;

  border-bottom: 1px solid #e8edf3;

  background: #ffffff;
}

.mobile-transaction:last-child {
  border-bottom: 0;
}

.mobile-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 10px;
}

.mobile-description {
  display: flex;
  align-items: center;
  gap: 9px;

  min-width: 0;
}

.mobile-description > div {
  display: flex;
  flex-direction: column;
  gap: 3px;

  min-width: 0;
}

.mobile-description strong {
  overflow: hidden;

  color: #1e293b;

  font-size: 12px;
  font-weight: 650;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.mobile-date {
  color: #94a3b8;

  font-size: 10px;
}

.mobile-details {
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 10px;

  margin-top: 14px;
  padding-top: 12px;

  border-top: 1px solid #f1f5f9;
}

.mobile-detail {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-detail span {
  color: #94a3b8;

  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.mobile-detail strong {
  color: #1e293b;

  font-size: 12px;
}

/* ========================================
   Responsive
======================================== */

@media (max-width: 700px) {
  .table-wrap {
    display: none;
  }

  .mobile-transactions {
    display: block;
  }

  .transaction-header {
    padding: 15px 16px;
  }
}

@media (max-width: 420px) {
  .transaction-header {
    padding: 14px;
  }

  .header-icon {
    width: 32px;
    height: 32px;
  }

  .header-title h2 {
    font-size: 14px;
  }

  .mobile-transaction {
    padding: 13px;
  }

  .mobile-top {
    align-items: flex-start;
  }

  .status-badge {
    font-size: 9px;
    padding: 3px 7px;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .data-table tbody tr {
    transition: none;
  }
}
</style>
