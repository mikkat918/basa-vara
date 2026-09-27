<script setup>
defineProps({ label: { type: String, default: 'Loading' } })
</script>

<template>
  <div class="spin" role="status">
    <span class="sr-only">{{ label }}</span>
  </div>
</template>

<style scoped>
.spin {
  width: 28px;
  height: 28px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: rot 0.7s linear infinite;
  margin: 16px auto;
}
@keyframes rot {
  to {
    transform: rotate(360deg);
  }
}
</style>
