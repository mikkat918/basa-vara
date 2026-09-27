<script setup>
import { computed } from 'vue'
import AppHeader from '../components/common/AppHeader.vue'
import AppFooter from '../components/common/AppFooter.vue'
import { useUiStore } from '../stores/uiStore'
import { useAuthStore } from '../stores/authStore'

const ui = useUiStore()
const auth = useAuthStore()

const drawerLinks = computed(() => [
  { label: 'Home', to: '/' },
  { label: 'Search', to: '/properties' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: auth.isAuthenticated ? 'Dashboard' : 'Log in', to: auth.isAuthenticated ? (auth.role === 'admin' ? '/admin' : auth.role === 'landlord' ? '/landlord' : '/dashboard') : '/login' },
])
</script>

<template>
  <div class="shell">
    <AppHeader />
    <div v-if="ui.sidebarOpen" class="overlay" @click="ui.sidebarOpen = false"></div>
    <nav v-if="ui.sidebarOpen" class="drawer" aria-label="Mobile menu">
      <router-link v-for="l in drawerLinks" :key="l.to" :to="l.to" @click="ui.sidebarOpen = false">{{ l.label }}</router-link>
    </nav>
    <main id="main">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.shell {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 45;
}
.drawer {
  position: fixed;
  top: var(--header-h);
  right: 0;
  bottom: 0;
  width: min(280px, 90vw);
  background: #fff;
  z-index: 50;
  padding: 16px;
  display: grid;
  align-content: start;
  gap: 8px;
}
</style>
