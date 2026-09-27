<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import { useUiStore } from '../../stores/uiStore'

const props = defineProps({
  items: { type: Array, required: true },
})

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const ui = useUiStore()

const active = computed(() => route.path)

function go(item) {
  if (item.action === 'logout') {
    auth.logout()
    router.push('/')
  } else {
    router.push(item.to)
  }
  ui.sidebarOpen = false
}
</script>

<template>
  <aside class="sidebar">
    <p class="title">{{ auth.user?.name }}</p>
    <p class="muted role">{{ auth.role }}</p>
    <nav :aria-label="`${auth.role} navigation`">
      <button
        v-for="item in items"
        :key="item.label"
        class="nav-item"
        type="button"
        :class="{ active: item.to && (item.exact ? active === item.to : active === item.to || (item.to !== '/' && active.startsWith(`${item.to}/`))) }"
        @click="go(item)"
      >
        {{ item.label }}
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-w);
  flex: 0 0 var(--sidebar-w);
  background: #fff;
  border-right: 1px solid var(--color-border);
  padding: 24px 16px;
  min-height: calc(100svh - var(--header-h));
  overflow-y: auto;
  overscroll-behavior: contain;
}
.title {
  font-weight: 700;
}
.role {
  text-transform: capitalize;
  margin-bottom: 16px;
}
.nav-item {
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: 0;
  border-radius: 8px;
  padding: 10px 12px;
  min-height: 40px;
  cursor: pointer;
  color: var(--color-text);
  font-weight: 500;
}
.nav-item:hover,
.nav-item.active {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}
@media (max-width: 900px) {
  .sidebar {
    position: fixed;
    inset: var(--header-h) auto 0 0;
    z-index: 50;
    transform: translateX(-110%);
    transition: transform 0.2s ease;
    box-shadow: var(--shadow-md);
  }
  .sidebar.open {
    transform: none;
  }
}
</style>
