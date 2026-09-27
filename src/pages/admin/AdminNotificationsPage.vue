<script setup>
const items = [{ title: 'New verification request', time: '2h ago' }, { title: 'Payment issue flagged', time: '1d ago' }]
</script>

<template>
  <div class="page">
    <h1>Notifications</h1>
    <div class="card panel">
      <div v-for="item in items" :key="item.title" class="row">
        <span>{{ item.title }}</span>
        <small>{{ item.time }}</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel { padding: 20px; display: grid; gap: 12px; }
.row { display: flex; justify-content: space-between; gap: 12px; border-bottom: 1px solid var(--color-border); padding-bottom: 8px; }
</style>
