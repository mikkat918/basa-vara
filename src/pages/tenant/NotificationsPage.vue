<script setup>
import { onMounted } from 'vue'
import { useNotificationStore } from '../../stores/notificationStore'

const notifications = useNotificationStore()

onMounted(() => notifications.load())
</script>

<template>
  <div class="page">
    <h1>Notifications</h1>
    <div class="card panel">
      <ul v-if="notifications.items.length" class="list">
        <li v-for="item in notifications.items" :key="item.id" class="notification-item">
          <strong>{{ item.title }}</strong>
          <p class="muted">{{ item.body }}</p>
        </li>
      </ul>
      <p v-else class="muted">No notifications yet.</p>
    </div>
  </div>
</template>

<style scoped>
.panel { padding: 20px; }
.list { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
.notification-item { border-bottom: 1px solid var(--color-border); padding-bottom: 12px; }
</style>
