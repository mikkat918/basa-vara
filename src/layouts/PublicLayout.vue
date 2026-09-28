
<script setup>
import { computed, onBeforeUnmount, watch } from 'vue'
import AppHeader from '../components/common/AppHeader.vue'
import AppFooter from '../components/common/AppFooter.vue'
import { useUiStore } from '../stores/uiStore'
import { useAuthStore } from '../stores/authStore'

const ui = useUiStore()
const auth = useAuthStore()

const drawerLinks = computed(() => [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Search',
    to: '/properties',
  },
  {
    label: 'How it works',
    to: '/how-it-works',
  },
  {
    label: 'About',
    to: '/about',
  },
  {
    label: 'Contact',
    to: '/contact',
  },
  {
    label: auth.isAuthenticated ? 'Dashboard' : 'Log in',
    to: auth.isAuthenticated
      ? auth.role === 'admin'
        ? '/admin'
        : auth.role === 'landlord'
          ? '/landlord'
          : '/dashboard'
      : '/login',
  },
])

const closeDrawer = () => {
  ui.sidebarOpen = false
}

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
  <div class="public-shell">
    <AppHeader />

    <!-- Mobile menu overlay -->
    <Transition name="fade">
      <button
        v-if="ui.sidebarOpen"
        class="drawer-overlay"
        type="button"
        aria-label="Close navigation menu"
        @click="closeDrawer"
      ></button>
    </Transition>

    <!-- Mobile navigation drawer -->
    <Transition name="drawer">
      <aside
        v-if="ui.sidebarOpen"
        class="mobile-drawer"
        aria-label="Mobile navigation"
      >
        <div class="drawer-header">
          <div>
            <p class="drawer-eyebrow">Navigation</p>
            <h2 class="drawer-title">Menu</h2>
          </div>

          <button
            class="drawer-close"
            type="button"
            aria-label="Close navigation menu"
            @click="closeDrawer"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>

        <nav class="drawer-nav">
          <router-link
            v-for="link in drawerLinks"
            :key="link.to"
            :to="link.to"
            class="drawer-link"
            active-class="is-active"
            @click="closeDrawer"
          >
            <span class="link-indicator"></span>
            <span>{{ link.label }}</span>

            <svg
              class="link-arrow"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </router-link>
        </nav>

        <div class="drawer-footer">
          <span class="footer-dot"></span>
          <span>Find your next home</span>
        </div>
      </aside>
    </Transition>

    <!-- Main application content -->
    <main
      id="main"
      class="main-content"
      tabindex="-1"
    >
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </transition>
      </router-view>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
/* ========================================
   Public Shell
======================================== */

.public-shell {
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
   Main Content
======================================== */

.main-content {
  flex: 1;
  width: 100%;
  min-width: 0;

  outline: none;
}

/* ========================================
   Overlay
======================================== */

.drawer-overlay {
  position: fixed;
  inset: 0;

  width: 100%;
  height: 100%;

  padding: 0;
  border: 0;

  background: rgba(15, 23, 42, 0.42);

  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);

  cursor: pointer;

  z-index: 45;
}

/* ========================================
   Mobile Drawer
======================================== */

.mobile-drawer {
  position: fixed;

  top: var(--header-h, 64px);
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;

  width: min(340px, 88vw);

  padding: 20px;

  background: #ffffff;

  border-left: 1px solid #e2e8f0;

  box-shadow: -12px 0 35px rgba(15, 23, 42, 0.12);

  overflow-y: auto;
  overscroll-behavior: contain;

  z-index: 50;
}

/* ========================================
   Drawer Header
======================================== */

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 18px;

  border-bottom: 1px solid #e2e8f0;
}

.drawer-eyebrow {
  margin: 0 0 3px;

  color: #64748b;

  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.drawer-title {
  margin: 0;

  color: #0f172a;

  font-size: 1.25rem;
  font-weight: 750;
  line-height: 1.2;
}

.drawer-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  padding: 0;

  border: 1px solid #dbe2ea;
  border-radius: 10px;

  background: #f8fafc;
  color: #475569;

  cursor: pointer;

  transition:
    background 0.18s ease,
    color 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;
}

.drawer-close svg {
  width: 19px;
  height: 19px;
}

.drawer-close:hover {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #2563eb;
}

.drawer-close:active {
  transform: scale(0.95);
}

.drawer-close:focus-visible {
  outline: 3px solid rgba(37, 99, 235, 0.18);
  outline-offset: 2px;
}

/* ========================================
   Navigation
======================================== */

.drawer-nav {
  display: grid;
  gap: 7px;

  padding: 20px 0;
}

.drawer-link {
  position: relative;

  display: flex;
  align-items: center;
  gap: 12px;

  min-height: 48px;

  padding: 0 13px;

  border: 1px solid transparent;
  border-radius: 10px;

  color: #334155;

  font-size: 0.95rem;
  font-weight: 600;

  text-decoration: none;

  transition:
    background 0.18s ease,
    color 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;
}

.drawer-link:hover {
  background: #f8fafc;
  border-color: #e2e8f0;
  color: #2563eb;
  transform: translateX(2px);
}

.drawer-link.is-active {
  background: #eff6ff;
  border-color: #dbeafe;
  color: #1d4ed8;
}

.link-indicator {
  width: 7px;
  height: 7px;

  flex: 0 0 7px;

  border-radius: 50%;

  background: #cbd5e1;

  transition:
    background 0.18s ease,
    transform 0.18s ease;
}

.drawer-link:hover .link-indicator,
.drawer-link.is-active .link-indicator {
  background: #2563eb;
  transform: scale(1.15);
}

.link-arrow {
  width: 17px;
  height: 17px;

  margin-left: auto;

  color: #94a3b8;

  transition:
    color 0.18s ease,
    transform 0.18s ease;
}

.drawer-link:hover .link-arrow,
.drawer-link.is-active .link-arrow {
  color: #2563eb;
  transform: translateX(2px);
}

.drawer-link:focus-visible {
  outline: 3px solid rgba(37, 99, 235, 0.18);
  outline-offset: 2px;
}

/* ========================================
   Drawer Footer
======================================== */

.drawer-footer {
  display: flex;
  align-items: center;
  gap: 8px;

  margin-top: auto;
  padding: 15px 4px 2px;

  border-top: 1px solid #e2e8f0;

  color: #64748b;

  font-size: 0.78rem;
  font-weight: 500;
}

.footer-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: #2563eb;
}

/* ========================================
   Drawer Animation
======================================== */

.drawer-enter-active,
.drawer-leave-active {
  transition:
    transform 0.24s ease,
    opacity 0.2s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ========================================
   Smaller Screens
======================================== */

@media (max-width: 480px) {
  .mobile-drawer {
    width: min(320px, 92vw);
    padding: 16px;
  }

  .drawer-header {
    padding-bottom: 15px;
  }

  .drawer-nav {
    padding: 16px 0;
  }

  .drawer-link {
    min-height: 46px;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .drawer-enter-active,
  .drawer-leave-active,
  .fade-enter-active,
  .fade-leave-active,
  .drawer-link,
  .drawer-close,
  .link-indicator,
  .link-arrow {
    transition: none;
  }

  .drawer-overlay {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
</style>
