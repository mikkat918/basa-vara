
<script setup>
import { computed, onBeforeUnmount, watch } from 'vue'
import AppHeader from '../components/common/AppHeader.vue'
import AppSidebar from '../components/common/AppSidebar.vue'
import MobileNavigation from '../components/common/MobileNavigation.vue'
import { useUiStore } from '../stores/uiStore'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const ui = useUiStore()

const openClass = computed(() => ({
  open: ui.sidebarOpen,
}))

const mobileItems = computed(() =>
  props.items.filter((item) => item?.to)
)

watch(
  () => ui.sidebarOpen,
  (open) => {
    document.body.classList.toggle('drawer-open', open)
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  document.body.classList.remove('drawer-open')
})
</script>

<template>
  <div class="dashboard-shell">
    <AppHeader compact />

    <div class="dashboard-layout">
      <!-- Sidebar -->
      <AppSidebar
        :items="items"
        :class="openClass"
      />

      <!-- Main content -->
      <main
        id="main"
        class="dashboard-content"
        tabindex="-1"
      >
        <div class="content-container">
          <router-view />
        </div>
      </main>
    </div>

    <!-- Mobile bottom navigation -->
    <MobileNavigation :items="mobileItems" />
  </div>
</template>

<style scoped>
/* ========================================
   Dashboard Shell
======================================== */

.dashboard-shell {
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 100svh;

  background: var(--color-bg, #f8fafc);
  color: #0f172a;

  overflow-x: hidden;
}

/* ========================================
   Dashboard Layout
======================================== */

.dashboard-layout {
  display: flex;
  flex: 1;

  width: 100%;
  min-width: 0;
  min-height: calc(100svh - var(--header-h, 64px));

  position: relative;
}

/* ========================================
   Main Content
======================================== */

.dashboard-content {
  flex: 1;

  width: 100%;
  min-width: 0;

  box-sizing: border-box;

  padding: 28px 30px 96px;

  outline: none;

  overflow-x: hidden;
}

/* Keeps page content from becoming excessively wide */
.content-container {
  width: 100%;
  max-width: 1440px;

  margin: 0 auto;
}

/* ========================================
   Drawer Overlay
======================================== */

.drawer-overlay {
  display: none;

  position: fixed;

  inset: var(--header-h, 64px) 0 0;

  width: 100%;
  height: auto;

  padding: 0;
  margin: 0;

  border: 0;

  background: rgba(15, 23, 42, 0.42);

  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);

  cursor: pointer;

  z-index: 45;
}

/* ========================================
   Large Desktop
======================================== */

@media (min-width: 1440px) {
  .dashboard-content {
    padding-left: 36px;
    padding-right: 36px;
  }
}

/* ========================================
   Tablet
======================================== */

@media (max-width: 1100px) {
  .dashboard-content {
    padding: 24px 22px 96px;
  }
}

/* ========================================
   Mobile / Sidebar Drawer
======================================== */

@media (max-width: 900px) {
  .drawer-overlay {
    display: block;
  }

  .dashboard-content {
    padding: 20px 16px 92px;
  }

  .content-container {
    max-width: 100%;
  }
}

/* ========================================
   Small Mobile
======================================== */

@media (max-width: 600px) {
  .dashboard-content {
    padding: 16px 12px 88px;
  }
}

/* ========================================
   Very Small Screens
======================================== */

@media (max-width: 380px) {
  .dashboard-content {
    padding-left: 10px;
    padding-right: 10px;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .drawer-overlay {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
</style>
