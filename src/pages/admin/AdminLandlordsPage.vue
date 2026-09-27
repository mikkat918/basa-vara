<script setup>
const rows = [{ name: 'Nabil Ahmed', properties: 8, status: 'Verified' }, { name: 'Zahid Hasan', properties: 3, status: 'Pending' }]
</script>

<template>
  <div class="page">
    <h1>Landlords</h1>
    <div class="card panel">
      <table>
        <thead><tr><th>Name</th><th>Properties</th><th>Status</th></tr></thead>
        <tbody>
          <tr v-for="row in rows" :key="row.name"><td>{{ row.name }}</td><td>{{ row.properties }}</td><td>{{ row.status }}</td></tr>
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
