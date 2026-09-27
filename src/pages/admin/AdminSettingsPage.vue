<script setup>
import { reactive } from 'vue'

const settings = reactive({ maintenance: false, emailAlerts: true, reviewMode: 'Manual' })
</script>

<template>
  <div class="page">
    <h1>Admin settings</h1>
    <div class="card panel">
      <label class="option"><input v-model="settings.maintenance" type="checkbox" /> Maintenance mode</label>
      <label class="option"><input v-model="settings.emailAlerts" type="checkbox" /> Email alerts</label>
      <label class="option">
        Review mode
        <select v-model="settings.reviewMode">
          <option>Manual</option>
          <option>Auto approve</option>
          <option>Hybrid</option>
        </select>
      </label>
    </div>
  </div>
</template>

<style scoped>
.panel { padding: 20px; display: grid; gap: 14px; }
.option { display: flex; align-items: center; gap: 10px; font-weight: 600; }
select { padding: 8px 10px; border-radius: 8px; border: 1px solid var(--color-border); }
</style>
