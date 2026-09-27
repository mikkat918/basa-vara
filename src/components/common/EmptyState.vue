<script setup>
defineProps({
  title: { type: String, default: 'Nothing here yet' },
  message: { type: String, default: '' },
})
</script>

<template>
  <div class="empty card" style="padding: 32px; text-align: center">
    <h3>{{ title }}</h3>
    <p class="muted">{{ message }}</p>
    <div style="margin-top: 12px">
      <slot />
    </div>
  </div>
</template>
