<script setup>
import { computed, onMounted } from 'vue'
import { useAdminStore } from '../../stores/adminStore'

const adminStore = useAdminStore()
const cards = computed(() => [
  { label: 'Total properties', value: 12 },
  { label: 'Active listings', value: 8 },
  { label: 'Pending listings', value: 2 },
  { label: 'Total views', value: 1460 },
])

onMounted(() => adminStore.loadOverview())
</script>

<template>
  <div class="page dashboard">
    <h1>Landlord dashboard</h1>
    <div class="stats">
      <div v-for="card in cards" :key="card.label" class="card stat-card">
        <span>{{ card.label }}</span>
        <strong>{{ card.value }}</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard { display: grid; gap: 20px; }
.stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.stat-card { padding: 20px; display: grid; gap: 8px; }
.stat-card strong { font-size: 1.5rem; color: var(--color-primary); }
@media (max-width: 820px) { .stats { grid-template-columns: 1fr; } }
</style>
