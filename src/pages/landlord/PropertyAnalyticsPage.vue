<script setup>
const metrics = [
  { label: 'Views', value: '4.2K' },
  { label: 'Shortlist', value: '186' },
  { label: 'Applications', value: '34' },
  { label: 'Conversion', value: '18%' },
]
</script>

<template>
  <div class="page">
    <h1>Property analytics</h1>
    <div class="stats">
      <div v-for="item in metrics" :key="item.label" class="card stat-card">
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.stat-card { padding: 20px; display: grid; gap: 8px; }
.stat-card strong { font-size: 1.5rem; color: var(--color-primary); }
@media (max-width: 820px) { .stats { grid-template-columns: 1fr; } }
</style>
