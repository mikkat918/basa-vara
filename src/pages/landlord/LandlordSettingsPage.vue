<script setup>
import { reactive } from 'vue'

const settings = reactive({ notifications: true, autoReply: true, theme: 'Light' })
</script>

<template>
  <div class="page">
    <h1>Settings</h1>
    <div class="card panel">
      <label class="option"><input v-model="settings.notifications" type="checkbox" /> Email notifications</label>
      <label class="option"><input v-model="settings.autoReply" type="checkbox" /> Auto reply for inquiries</label>
      <label class="option">
        Theme
        <select v-model="settings.theme">
          <option>Light</option>
          <option>Dark</option>
          <option>System</option>
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
