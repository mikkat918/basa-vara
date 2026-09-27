<script setup>
import { computed } from 'vue'

const applications = computed(() => [
  { name: 'Aisha Rahman', unit: 'Dhanmondi A-12', status: 'Under review' },
  { name: 'Sabbir Hossain', unit: 'Gulshan B-5', status: 'Approved' },
  { name: 'Nabila Islam', unit: 'Banani C-9', status: 'Pending' },
])
</script>

<template>
  <div class="page">
    <h1>Tenant applications</h1>
    <div class="card panel">
      <table>
        <thead>
          <tr><th>Tenant</th><th>Property</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr v-for="item in applications" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.unit }}</td>
            <td><span class="badge">{{ item.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.panel { padding: 20px; }
table { width: 100%; border-collapse: collapse; }
th, td { text-align: left; padding: 12px 10px; border-bottom: 1px solid var(--color-border); }
.badge { background: rgba(87, 142, 255, 0.12); color: var(--color-primary); padding: 4px 8px; border-radius: 999px; }
</style>
