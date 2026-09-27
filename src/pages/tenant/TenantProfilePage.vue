<script setup>
import { useAuthStore } from '../../stores/authStore'

const auth = useAuthStore()
</script>

<template>
  <div class="page">
    <h1>Profile</h1>
    <div class="card panel">
      <p><strong>Name:</strong> {{ auth.user?.name }}</p>
      <p><strong>Email:</strong> {{ auth.user?.email }}</p>
      <p><strong>Phone:</strong> {{ auth.user?.phone }}</p>
      <p><strong>Role:</strong> {{ auth.user?.role }}</p>
    </div>
  </div>
</template>

<style scoped>
.panel { padding: 20px; display: grid; gap: 8px; }
</style>
