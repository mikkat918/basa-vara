<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { APP_NAME } from '../../utils/constants'
import { useAuthStore } from '../../stores/authStore'
import { useNotificationStore } from '../../stores/notificationStore'
import { useUiStore } from '../../stores/uiStore'
import { useWalletStore } from '../../stores/walletStore'

defineProps({ compact: { type: Boolean, default: false } })

const auth = useAuthStore()
const wallet = useWalletStore()
const notifications = useNotificationStore()
const ui = useUiStore()
const router = useRouter()

const dash = computed(() => {
  if (auth.role === 'admin') return '/admin'
  if (auth.role === 'landlord') return '/landlord'
  if (auth.role === 'tenant') return '/dashboard'
  return '/login'
})

function logout() {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <header class="header">
    <div class="container header-inner">
      <router-link class="logo" to="/">{{ APP_NAME }}</router-link>
      <nav class="nav hide-mobile" aria-label="Primary">
        <router-link to="/properties">Search</router-link>
        <router-link to="/how-it-works">How it works</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
      <div class="actions">
        <template v-if="auth.isAuthenticated">
          <span v-if="auth.role === 'tenant'" class="coins">{{ wallet.coinBalance }} coins</span>
          <router-link class="btn btn-ghost" :to="auth.role === 'tenant' ? '/dashboard/notifications' : dash">
            Alerts ({{ notifications.unread }})
          </router-link>
          <router-link class="btn btn-secondary" :to="dash">Dashboard</router-link>
          <button class="btn btn-ghost" type="button" @click="logout">Log out</button>
        </template>
        <template v-else>
          <router-link class="btn btn-ghost" to="/login">Log in</router-link>
          <router-link class="btn btn-primary" to="/register">Register</router-link>
        </template>
        <button class="btn btn-secondary menu" type="button" aria-label="Open menu" :aria-expanded="ui.sidebarOpen" @click="ui.sidebarOpen = true">
          Menu
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: #fff;
  border-bottom: 1px solid var(--color-border);
  height: var(--header-h);
}
.header-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.logo {
  font-weight: 700;
  color: var(--color-primary);
  font-size: 1.2rem;
  text-decoration: none;
}
.nav {
  display: flex;
  gap: 20px;
}
.nav a {
  color: var(--color-text);
  font-weight: 500;
  text-decoration: none;
}
.nav a.router-link-active {
  color: var(--color-primary);
}
.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.coins {
  font-weight: 600;
  color: var(--color-primary);
}
.menu {
  display: none;
}
@media (max-width: 900px) {
  .nav { display: none; }
  .menu {
    display: inline-flex;
  }
  .actions > :not(.menu) { display: none; }
}
</style>
