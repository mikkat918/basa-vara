<script setup>
import { computed } from 'vue'

const users = computed(() => [
  { name: 'Ayesha Karim', role: 'Tenant', status: 'Active' },
  { name: 'Rahim Uddin', role: 'Landlord', status: 'Active' },
  { name: 'Jahid Hasan', role: 'Admin', status: 'Active' },
])
</script>

<template>
  <div class="page">
    <h1>Users</h1>
    <div class="card panel">
      <table>
        <thead>
          <tr><th>Name</th><th>Role</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.name">
            <td>{{ user.name }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.status }}</td>
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
