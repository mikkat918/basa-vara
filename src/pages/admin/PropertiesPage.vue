<script setup>
import { computed } from 'vue'

const properties = computed(() => [
  { title: 'Dhanmondi Studio', location: 'Dhaka', status: 'Approved' },
  { title: 'Gulshan Villa', location: 'Dhaka', status: 'Pending' },
  { title: 'Chattogram Flat', location: 'Chattogram', status: 'Approved' },
])
</script>

<template>
  <div class="page">
    <h1>Properties</h1>
    <div class="card panel">
      <table>
        <thead>
          <tr><th>Title</th><th>Location</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr v-for="property in properties" :key="property.title">
            <td>{{ property.title }}</td>
            <td>{{ property.location }}</td>
            <td>{{ property.status }}</td>
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
</style>
