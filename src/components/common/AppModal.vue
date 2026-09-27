<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  open: Boolean,
  title: String,
})
const emit = defineEmits(['close'])

function onKey(e) {
  if (e.key === 'Escape') emit('close')
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <teleport to="body">
    <div v-if="open" class="overlay" role="presentation" @click.self="emit('close')">
      <div class="modal" role="dialog" aria-modal="true" :aria-label="title">
        <header class="row">
          <h2>{{ title }}</h2>
          <button class="btn btn-ghost" type="button" aria-label="Close" @click="emit('close')">Close</button>
        </header>
        <slot />
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 28, 24, 0.45);
  display: grid;
  place-items: center;
  z-index: 80;
  padding: 16px;
}
.modal {
  background: #fff;
  border-radius: 12px;
  width: min(520px, 100%);
  max-height: 90vh;
  overflow: auto;
  padding: 20px;
  box-shadow: var(--shadow-md);
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
</style>
