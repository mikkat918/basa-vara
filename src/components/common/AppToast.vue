<script setup>
import { useUiStore } from '../../stores/uiStore'
const ui = useUiStore()
</script>

<template>
  <div class="toasts" aria-live="polite">
    <div v-for="t in ui.toasts" :key="t.id" class="toast" :class="t.type">{{ t.message }}</div>
  </div>
</template>

<style scoped>
.toasts {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.toast {
  background: #1c2420;
  color: #fff;
  padding: 12px 16px;
  border-radius: 8px;
  min-width: 220px;
}
.toast.error {
  background: var(--color-danger);
}
.toast.success {
  background: var(--color-primary);
}
</style>
