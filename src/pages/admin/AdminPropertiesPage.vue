<script setup>
const rows = [{ title: 'Dhanmondi Studio', owner: 'Nabil Ahmed', status: 'Approved' }, { title: 'Gulshan Apartment', owner: 'Javed Rahman', status: 'Pending' }]
</script>

<template>
  <div class="page">
    <h1>Properties</h1>
    <div class="card panel">
      <table>
        <thead><tr><th>Title</th><th>Owner</th><th>Status</th></tr></thead>
        <tbody>
          <tr v-for="row in rows" :key="row.title"><td>{{ row.title }}</td><td>{{ row.owner }}</td><td>{{ row.status }}</td></tr>
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
