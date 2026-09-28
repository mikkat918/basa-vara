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
    <div class="header-glow"></div>

    <div class="container header-inner">
      <!-- Logo -->
      <router-link class="logo" to="/" aria-label="Go to homepage">
        <span class="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M3.5 10.5 12 3l8.5 7.5" />
            <path d="M5.5 9.5V21h13V9.5" />
            <path d="M9 21v-6h6v6" />
          </svg>
        </span>

        <span class="logo-text">{{ APP_NAME }}</span>
      </router-link>

      <!-- Main Navigation -->
      <nav class="nav hide-mobile" aria-label="Primary">
        <router-link to="/properties">
          <span>Search</span>
        </router-link>

        <router-link to="/how-it-works">
          <span>How it works</span>
        </router-link>

        <router-link to="/about">
          <span>About</span>
        </router-link>

        <router-link to="/contact">
          <span>Contact</span>
        </router-link>
      </nav>

      <!-- Actions -->
      <div class="actions">
        <template v-if="auth.isAuthenticated">
          <!-- Coins -->
          <span
            v-if="auth.role === 'tenant'"
            class="coins"
            aria-label="Available coins"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="8.5" />
              <path d="M9.5 10.2c.3-1 1.1-1.6 2.5-1.6 1.5 0 2.4.7 2.4 1.7 0 1.1-.9 1.5-2.4 1.8-1.6.3-2.5.7-2.5 1.8 0 1.1 1 1.8 2.6 1.8 1.4 0 2.3-.6 2.6-1.6" />
              <path d="M12 6.8v10.4" />
            </svg>
            <span>{{ wallet.coinBalance }}</span>
          </span>

          <!-- Alerts -->
          <router-link
            class="header-action alert-action"
            :to="auth.role === 'tenant' ? '/dashboard/notifications' : dash"
            aria-label="Open alerts"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
              <path d="M10 21h4" />
            </svg>

            <span class="action-label">Alerts</span>

            <span
              v-if="notifications.unread"
              class="alert-count"
            >
              {{ notifications.unread > 99 ? '99+' : notifications.unread }}
            </span>
          </router-link>

          <!-- Dashboard -->
          <router-link class="dashboard-btn" :to="dash">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="4" width="6" height="6" rx="1" />
              <rect x="14" y="4" width="6" height="6" rx="1" />
              <rect x="4" y="14" width="6" height="6" rx="1" />
              <rect x="14" y="14" width="6" height="6" rx="1" />
            </svg>
            <span>Dashboard</span>
          </router-link>

          <!-- Logout -->
          <button
            class="logout-btn"
            type="button"
            @click="logout"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 5H6.5A1.5 1.5 0 0 0 5 6.5v11A1.5 1.5 0 0 0 6.5 19H10" />
              <path d="M14 8l4 4-4 4" />
              <path d="M9 12h9" />
            </svg>
            <span>Log out</span>
          </button>
        </template>

        <template v-else>
          <!-- Guest actions -->
          <router-link class="login-btn" to="/login">
            Log in
          </router-link>

          <router-link class="register-btn" to="/register">
            Register
          </router-link>
        </template>

        <!-- Mobile Menu -->
        <button
          class="menu"
          type="button"
          aria-label="Open menu"
          :aria-expanded="ui.sidebarOpen"
          @click="ui.sidebarOpen = true"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>
          <span>Menu</span>
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
  height: var(--header-h);
  border-bottom: 1px solid #e5ece7;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.header-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(
      circle at 18% 0%,
      rgba(35, 155, 91, 0.07),
      transparent 28%
    ),
    linear-gradient(
      90deg,
      transparent,
      rgba(35, 155, 91, 0.018),
      transparent
    );
}

.header-inner {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

/* Logo */
.logo {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  flex: 0 0 auto;
  color: #16834a;
  text-decoration: none;
}

.logo-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid #d8ebdf;
  border-radius: 9px;
  background: #edf8f1;
  color: #16834a;
  box-shadow: 0 4px 12px rgba(22, 131, 74, 0.07);
  transition:
    transform 0.18s ease,
    background 0.18s ease;
}

.logo-mark svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.logo-text {
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.025em;
}

/* Navigation */
.nav {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;
}

.nav a {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 11px;
  border-radius: 8px;
  color: #65736b;
  font-size: 11px;
  font-weight: 650;
  text-decoration: none;
  transition:
    color 0.18s ease,
    background 0.18s ease;
}

.nav a:hover {
  color: #16834a;
  background: #f0f8f3;
}

.nav a.router-link-active {
  color: #16834a;
  background: #edf8f1;
}

.nav a.router-link-active::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 3px;
  width: 14px;
  height: 2px;
  border-radius: 999px;
  background: #2b9a5e;
  transform: translateX(-50%);
}

/* Actions */
.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 7px;
  flex: 0 0 auto;
}

.coins {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 32px;
  padding: 0 9px;
  border: 1px solid #dcece2;
  border-radius: 8px;
  background: #f3faf5;
  color: #16834a;
  font-size: 10px;
  font-weight: 750;
}

.coins svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Alert */
.header-action {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  padding: 0 9px;
  border-radius: 8px;
  color: #66746c;
  font-size: 10px;
  font-weight: 650;
  text-decoration: none;
  transition:
    color 0.18s ease,
    background 0.18s ease;
}

.header-action:hover {
  color: #16834a;
  background: #f0f8f3;
}

.header-action > svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.alert-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 17px;
  height: 17px;
  padding: 0 4px;
  border-radius: 999px;
  background: #16834a;
  color: #ffffff;
  font-size: 8px;
  font-weight: 800;
  line-height: 1;
}

/* Dashboard */
.dashboard-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  padding: 0 11px;
  border: 1px solid #d9e5dd;
  border-radius: 8px;
  background: #ffffff;
  color: #46544c;
  font-size: 10px;
  font-weight: 700;
  text-decoration: none;
  transition:
    border-color 0.18s ease,
    background 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
}

.dashboard-btn svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
}

.dashboard-btn:hover {
  border-color: #bcdcc8;
  background: #f3faf5;
  color: #16834a;
  transform: translateY(-1px);
}

/* Logout */
.logout-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 32px;
  padding: 0 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #77837c;
  font: inherit;
  font-size: 10px;
  font-weight: 650;
  cursor: pointer;
  transition:
    color 0.18s ease,
    background 0.18s ease;
}

.logout-btn svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.logout-btn:hover {
  color: #c24141;
  background: #fff3f3;
}

/* Guest */
.login-btn,
.register-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 33px;
  padding: 0 12px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 700;
  text-decoration: none;
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    border-color 0.18s ease;
}

.login-btn {
  color: #5f6d65;
}

.login-btn:hover {
  color: #16834a;
  background: #f0f8f3;
}

.register-btn {
  border: 1px solid #16834a;
  background: #16834a;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(22, 131, 74, 0.12);
}

.register-btn:hover {
  background: #126d3d;
  border-color: #126d3d;
  transform: translateY(-1px);
}

/* Mobile menu */
.menu {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 34px;
  padding: 0 10px;
  border: 1px solid #d9e5dd;
  border-radius: 8px;
  background: #ffffff;
  color: #506057;
  font: inherit;
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
}

.menu svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
}

/* Tablet */
@media (max-width: 1100px) {
  .nav {
    gap: 2px;
  }

  .nav a {
    padding-inline: 8px;
  }

  .action-label {
    display: none;
  }

  .header-action {
    padding-inline: 8px;
  }
}

@media (max-width: 900px) {
  .nav {
    display: none;
  }

  .menu {
    display: inline-flex;
  }

  .actions > :not(.menu) {
    display: none;
  }

  .logo-text {
    font-size: 16px;
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .header-inner {
    gap: 10px;
  }

  .logo-mark {
    width: 32px;
    height: 32px;
  }

  .logo-text {
    font-size: 15px;
  }

  .menu {
    min-height: 32px;
    padding-inline: 9px;
  }
}

@media (max-width: 360px) {
  .logo-text {
    display: none;
  }

  .logo-mark {
    width: 34px;
    height: 34px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .logo-mark,
  .nav a,
  .header-action,
  .dashboard-btn,
  .logout-btn,
  .login-btn,
  .register-btn {
    transition: none;
  }
}
</style>
