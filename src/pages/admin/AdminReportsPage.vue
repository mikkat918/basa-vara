<script setup>
const rows = [{ label: 'Fraud alerts', count: 4 }, { label: 'Chargebacks', count: 2 }, { label: 'Verification issues', count: 7 }]
</script>

<template>
  <div class="page">
    <h1>Reports</h1>
    <div class="card panel">
      <table>
        <thead><tr><th>Report</th><th>Count</th></tr></thead>
        <tbody>
          <tr v-for="row in rows" :key="row.label"><td>{{ row.label }}</td><td>{{ row.count }}</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.panel { padding: 20px; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 12px 10px; border-bottom: 1px solid var(--color-border); text-align: left; }
</style>
