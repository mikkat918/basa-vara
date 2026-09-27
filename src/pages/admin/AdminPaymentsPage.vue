<script setup>
const rows = [{ ref: 'INV-1024', user: 'Ayesha', amount: '৳4,500', status: 'Paid' }, { ref: 'INV-1028', user: 'Rahim', amount: '৳12,000', status: 'Pending' }]
</script>

<template>
  <div class="page">
    <h1>Payments</h1>
    <div class="card panel">
      <table>
        <thead><tr><th>Ref</th><th>User</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>
          <tr v-for="row in rows" :key="row.ref"><td>{{ row.ref }}</td><td>{{ row.user }}</td><td>{{ row.amount }}</td><td>{{ row.status }}</td></tr>
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
