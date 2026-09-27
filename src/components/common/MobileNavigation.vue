<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '../../stores/uiStore'

const props = defineProps({
  items: { type: Array, default: () => [] },
})
const route = useRoute()
const ui = useUiStore()
const open = computed({
  get: () => ui.sidebarOpen,
  set: (v) => (ui.sidebarOpen = v),
})
</script>

<template>
  <div v-if="open" class="drawer-bg" @click="open = false"></div>
  <nav class="bottom" aria-label="Mobile">
    <router-link v-for="item in items.slice(0, 4)" :key="item.label" :to="item.to || route.path">
      {{ item.label }}
    </router-link>
    <button type="button" @click="open = true">More</button>
  </nav>
</template>

<style scoped>
.bottom {
  display: none;
}
@media (max-width: 900px) {
  .bottom {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    position: sticky;
    bottom: 0;
    background: #fff;
    border-top: 1px solid var(--color-border);
    z-index: 30;
  }
  .bottom a,
  .bottom button {
    min-height: 56px;
    border: 0;
    background: none;
    font-size: 12px;
    text-decoration: none;
    color: var(--color-text);
  }
  .drawer-bg {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 45;
  }
}
</style>
