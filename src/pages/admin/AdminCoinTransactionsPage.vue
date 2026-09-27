<script setup>
const rows = [{ type: 'Top-up', amount: '+250 coins', user: 'Jubaer' }, { type: 'Unlock contact', amount: '-10 coins', user: 'Nadia' }]
</script>

<template>
  <div class="page">
    <h1>Coin transactions</h1>
    <div class="card panel">
      <table>
        <thead><tr><th>Type</th><th>User</th><th>Amount</th></tr></thead>
        <tbody>
          <tr v-for="row in rows" :key="row.type + row.user"><td>{{ row.type }}</td><td>{{ row.user }}</td><td>{{ row.amount }}</td></tr>
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
