<script setup>
import { computed, watch } from 'vue'
import AppHeader from '../components/common/AppHeader.vue'
import AppSidebar from '../components/common/AppSidebar.vue'
import MobileNavigation from '../components/common/MobileNavigation.vue'
import { useUiStore } from '../stores/uiStore'

const props = defineProps({
  items: { type: Array, required: true },
})
const ui = useUiStore()
const openClass = computed(() => (ui.sidebarOpen ? 'open' : ''))

watch(() => ui.sidebarOpen, (open) => document.body.classList.toggle('drawer-open', open))
</script>

<template>
  <div>
    <AppHeader compact />
    <button v-if="ui.sidebarOpen" class="drawer-overlay" type="button" aria-label="Close navigation" @click="ui.sidebarOpen = false"></button>
    <div class="dash">
      <AppSidebar :items="items" :class="openClass" />
      <main id="main" class="content">
        <router-view />
      </main>
    </div>
    <MobileNavigation :items="items.filter((i) => i.to)" />
  </div>
</template>

<style scoped>
.dash {
  display: flex;
  min-width: 0;
  min-height: calc(100svh - var(--header-h));
}
.content {
  flex: 1;
  min-width: 0;
  width: 100%;
  padding: 24px;
  padding-bottom: 80px;
}
.drawer-overlay { display: none; }
@media (max-width: 900px) {
  .drawer-overlay { display: block; position: fixed; inset: var(--header-h) 0 0; z-index: 45; border: 0; background: rgba(20, 28, 24, .4); }
  .content {
    padding: 16px;
  }
}
</style>
