<script setup>
const rows = [{ action: 'User verified', actor: 'System', time: '09:30 AM' }, { action: 'Listing approved', actor: 'Admin', time: '08:15 AM' }]
</script>

<template>
  <div class="page">
    <h1>Activity logs</h1>
    <div class="card panel">
      <table>
        <thead><tr><th>Action</th><th>Actor</th><th>Time</th></tr></thead>
        <tbody>
          <tr v-for="row in rows" :key="row.action + row.time"><td>{{ row.action }}</td><td>{{ row.actor }}</td><td>{{ row.time }}</td></tr>
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
