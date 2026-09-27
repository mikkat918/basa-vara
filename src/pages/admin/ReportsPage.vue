<script setup>
const reports = [
  { title: 'Fraudulent listing', count: 4, priority: 'High' },
  { title: 'Payment disputes', count: 2, priority: 'Medium' },
  { title: 'Profile verification', count: 9, priority: 'Low' },
]
</script>

<template>
  <div class="page">
    <h1>Reports</h1>
    <div class="card panel">
      <ul class="list">
        <li v-for="report in reports" :key="report.title" class="row item">
          <span>{{ report.title }}</span>
          <span>{{ report.count }}</span>
          <span class="badge">{{ report.priority }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.panel { padding: 20px; }
.list { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
.item { justify-content: space-between; align-items: center; }
.badge { background: rgba(255, 166, 0, 0.12); color: #b7791f; padding: 4px 8px; border-radius: 999px; }
</style>
