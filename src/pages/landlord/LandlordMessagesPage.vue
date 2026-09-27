<script setup>
const messages = [
  { sender: 'Nabila', preview: 'I am interested in your flat in Banani.', time: '08:40 AM' },
  { sender: 'Sajid', preview: 'Can you share the lease terms?', time: 'Yesterday' },
]
</script>

<template>
  <div class="page">
    <h1>Messages</h1>
    <div class="card panel">
      <div v-for="item in messages" :key="item.sender" class="message-row">
        <strong>{{ item.sender }}</strong>
        <span>{{ item.preview }}</span>
        <small>{{ item.time }}</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel { padding: 20px; display: grid; gap: 12px; }
.message-row { display: grid; gap: 6px; border-bottom: 1px solid var(--color-border); padding-bottom: 10px; }
</style>
