<script setup>
import { formatBdt, formatDateTime } from '../../utils/format'
import EmptyState from '../common/EmptyState.vue'
defineProps({ rows: { type: Array, default: () => [] } })
</script>

<template>
  <EmptyState v-if="!rows.length" title="No transactions" message="Purchases and contact unlocks will appear here." />
  <div v-else class="table-wrap table-as-cards">
    <table class="data-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Coins</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in rows" :key="t.id">
          <td data-label="Date">{{ formatDateTime(t.createdAt) }}</td>
          <td data-label="Description">{{ t.description || t.type }}</td>
          <td data-label="Coins">{{ t.coins }}</td>
          <td data-label="Amount">{{ t.amount ? formatBdt(t.amount) : '—' }}</td>
          <td data-label="Status">{{ t.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
