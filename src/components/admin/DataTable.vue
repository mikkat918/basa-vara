<script setup>
defineProps({
  columns: Array,
  rows: Array,
})
</script>

```vue
<template>
  <div class="table-wrap table-as-cards">
    <div class="table-scroll">
      <table class="data-table">
        <thead>
          <tr>
            <th v-for="c in columns" :key="c.key">
              {{ c.label }}
            </th>

            <th v-if="$slots.actions">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td
              v-for="c in columns"
              :key="c.key"
              :data-label="c.label"
            >
              <slot :name="c.key" :row="row">
                {{ c.format ? c.format(row[c.key], row) : row[c.key] }}
              </slot>
            </td>

            <td
              v-if="$slots.actions"
              data-label="Actions"
              class="actions-cell"
            >
              <slot name="actions" :row="row" />
            </td>
          </tr>

          <tr v-if="!rows?.length" class="empty-row">
            <td
              :colspan="columns.length + ($slots.actions ? 1 : 0)"
            >
              <div class="empty-state">
                <div class="empty-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 4h14v16H5z" />
                    <path d="M8 9h8M8 13h6M8 17h4" />
                  </svg>
                </div>

                <strong>No records found</strong>
                <span>There is no data to display right now.</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-wrap {
  width: 100%;
  min-width: 0;
}

.table-scroll {
  width: 100%;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: thin;
  scrollbar-color: #cbd8d0 transparent;
}

/* Table */
.data-table {
  width: 100%;
  min-width: 680px;
  border-collapse: separate;
  border-spacing: 0;
  color: #27342c;
  font-size: 13px;
}

/* Header */
.data-table thead th {
  padding: 14px 16px;
  border-top: 1px solid #e4ebe7;
  border-bottom: 1px solid #e1e9e4;
  background: #f7faf8;
  color: #69766e;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.045em;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
}

.data-table thead th:first-child {
  border-left: 1px solid #e4ebe7;
  border-top-left-radius: 12px;
}

.data-table thead th:last-child {
  border-right: 1px solid #e4ebe7;
  border-top-right-radius: 12px;
}

/* Body */
.data-table tbody td {
  padding: 15px 16px;
  border-bottom: 1px solid #edf1ee;
  background: #ffffff;
  color: #35423a;
  vertical-align: middle;
  line-height: 1.5;
}

.data-table tbody td:first-child {
  border-left: 1px solid #edf1ee;
}

.data-table tbody td:last-child {
  border-right: 1px solid #edf1ee;
}

.data-table tbody tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
}

.data-table tbody tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
}

/* Hover */
.data-table tbody tr:not(.empty-row) td {
  transition:
    background 0.18s ease,
    border-color 0.18s ease;
}

.data-table tbody tr:not(.empty-row):hover td {
  background: #f9fcfa;
}

/* Actions */
.actions-cell {
  white-space: nowrap;
}

/* Empty */
.empty-row td {
  padding: 0 !important;
  border-left: 1px solid #e1e9e4 !important;
  border-right: 1px solid #e1e9e4 !important;
  border-bottom: 1px solid #e1e9e4 !important;
}

.empty-state {
  min-height: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
  padding: 25px;
  text-align: center;
}

.empty-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  margin-bottom: 4px;
  border-radius: 12px;
  background: #edf7f1;
  color: #218950;
}

.empty-icon svg {
  width: 21px;
  height: 21px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.empty-state strong {
  color: #344139;
  font-size: 14px;
  font-weight: 800;
}

.empty-state span {
  color: #8a948e;
  font-size: 12px;
}

/* Scrollbar */
.table-scroll::-webkit-scrollbar {
  height: 7px;
}

.table-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.table-scroll::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: #cbd8d0;
}

.table-scroll::-webkit-scrollbar-thumb:hover {
  background: #b5c5bb;
}

/* Mobile card layout */
@media (max-width: 700px) {
  .table-scroll {
    overflow-x: visible;
  }

  .data-table {
    min-width: 0;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;
  }

  .data-table thead {
    display: none;
  }

  .data-table tbody,
  .data-table tr,
  .data-table td {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }

  .data-table tbody tr:not(.empty-row) {
    overflow: hidden;
    border: 1px solid #e2e9e4;
    border-radius: 15px;
    background: #ffffff;
    box-shadow: 0 8px 22px rgba(31, 67, 47, 0.055);
  }

  .data-table tbody td {
    display: grid;
    grid-template-columns: minmax(105px, 38%) minmax(0, 1fr);
    gap: 14px;
    align-items: center;
    padding: 12px 14px;
    border: 0 !important;
    border-bottom: 1px solid #edf1ee !important;
    background: #ffffff;
  }

  .data-table tbody td::before {
    content: attr(data-label);
    color: #78847c;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .data-table tbody td:last-child {
    border-bottom: 0 !important;
  }

  .data-table tbody tr:not(.empty-row):hover td {
    background: #ffffff;
  }

  .actions-cell {
    align-items: start;
  }

  .empty-row td {
    display: block;
    width: 100%;
  }

  .empty-state {
    min-height: 170px;
    border: 1px solid #e1e9e4;
    border-radius: 15px;
    background: #ffffff;
  }
}

@media (max-width: 430px) {
  .data-table tbody td {
    grid-template-columns: 1fr;
    gap: 5px;
  }

  .data-table tbody td::before {
    font-size: 9px;
  }

  .data-table tbody td {
    padding: 11px 13px;
  }

  .empty-state {
    padding: 20px 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .data-table *,
  .data-table *::before,
  .data-table *::after {
    transition: none !important;
  }
}
</style>
