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
    <!-- User identity -->
    <div class="profile">
      <div class="avatar" aria-hidden="true">
        {{ auth.user?.name?.charAt(0)?.toUpperCase() || 'U' }}
      </div>

      <div class="profile-info">
        <p class="title">{{ auth.user?.name }}</p>
        <p class="role">{{ auth.role }}</p>
      </div>
    </div>

    <div class="divider"></div>

    <!-- Navigation -->
    <nav :aria-label="`${auth.role} navigation`">
      <p class="nav-label">Workspace</p>

      <button
        v-for="item in items"
        :key="item.label"
        class="nav-item"
        type="button"
        :class="{
          active:
            item.to &&
            (
              item.exact
                ? active === item.to
                : active === item.to ||
                  (item.to !== '/' && active.startsWith(`${item.to}/`))
            )
        }"
        @click="go(item)"
      >
        <span class="nav-icon" aria-hidden="true">
          <svg v-if="/dashboard|home/i.test(item.label)" viewBox="0 0 24 24">
            <rect x="4" y="4" width="6" height="6" rx="1" />
            <rect x="14" y="4" width="6" height="6" rx="1" />
            <rect x="4" y="14" width="6" height="6" rx="1" />
            <rect x="14" y="14" width="6" height="6" rx="1" />
          </svg>

          <svg v-else-if="/property|properties|listing/i.test(item.label)" viewBox="0 0 24 24">
            <path d="M4 10.5 12 4l8 6.5" />
            <path d="M6 9.5V20h12V9.5" />
            <path d="M9.5 20v-5h5v5" />
          </svg>

          <svg v-else-if="/message|chat|conversation/i.test(item.label)" viewBox="0 0 24 24">
            <path d="M5 5.5h14A1.5 1.5 0 0 1 20.5 7v8A1.5 1.5 0 0 1 19 16.5H11l-4.5 3v-3H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5Z" />
            <path d="M7.5 10h9" />
            <path d="M7.5 13h5" />
          </svg>

          <svg v-else-if="/notification|alert/i.test(item.label)" viewBox="0 0 24 24">
            <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
          </svg>

          <svg v-else-if="/wallet|coin|payment|transaction/i.test(item.label)" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8.5" />
            <path d="M9.5 10.2c.3-1 1.1-1.6 2.5-1.6 1.5 0 2.4.7 2.4 1.7 0 1.1-.9 1.5-2.4 1.8-1.6.3-2.5.7-2.5 1.8 0 1.1 1 1.8 2.6 1.8 1.4 0 2.3-.6 2.6-1.6" />
            <path d="M12 6.8v10.4" />
          </svg>

          <svg v-else-if="/profile|account|user/i.test(item.label)" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20c.7-3.5 3-5.5 7-5.5s6.3 2 7 5.5" />
          </svg>

          <svg v-else-if="/setting/i.test(item.label)" viewBox="0 0 24 24">
            <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
            <path d="m19 13.5 1.2 1-.1 1.4-1.5.7-.4 1.4.9 1.4-.8 1.1-1.7-.3-1 1-.1 1.5-1.3.5-1-1.2h-1.4l-1 1.2-1.3-.5-.1-1.5-1-1-1.7.3-.8-1.1.9-1.4-.4-1.4-1.5-.7-.1-1.4 1.2-1 .4-1.4-1-1.4.8-1.1 1.7.3 1-1 .1-1.5 1.3-.5 1 1.2h1.4l1-1.2 1.3.5.1 1.5 1 1 1.7-.3.8 1.1-.9 1.4Z" />
          </svg>

          <svg v-else viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 8v4l2.5 1.5" />
          </svg>
        </span>

        <span class="nav-text">{{ item.label }}</span>

        <svg
          class="arrow"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: relative;
  width: var(--sidebar-w);
  flex: 0 0 var(--sidebar-w);
  min-height: calc(100svh - var(--header-h));
  box-sizing: border-box;
  padding: 22px 13px;
  overflow-y: auto;
  overscroll-behavior: contain;
  border-right: 1px solid #e4ece7;
  background:
    radial-gradient(
      circle at 0% 0%,
      rgba(35, 155, 91, 0.06),
      transparent 32%
    ),
    #ffffff;
  scrollbar-width: thin;
  scrollbar-color: #cddbd2 transparent;
}

.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: #cddbd2;
}

/* Profile */
.profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 3px 7px 15px;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  border: 1px solid #d6e9dc;
  border-radius: 10px;
  background: #edf8f1;
  color: #16834a;
  font-size: 12px;
  font-weight: 800;
}

.profile-info {
  min-width: 0;
}

.title {
  margin: 0 0 3px;
  overflow: hidden;
  color: #26362d;
  font-size: 11px;
  font-weight: 800;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.role {
  margin: 0;
  color: #87928b;
  font-size: 9px;
  font-weight: 650;
  letter-spacing: 0.04em;
  text-transform: capitalize;
}

.divider {
  height: 1px;
  margin: 0 7px 17px;
  background: #e9efeb;
}

/* Navigation */
.nav-label {
  margin: 0 8px 8px;
  color: #a0aaa4;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 41px;
  margin-bottom: 4px;
  padding: 0 9px;
  gap: 10px;
  border: 1px solid transparent;
  border-radius: 9px;
  background: transparent;
  color: #68756d;
  font: inherit;
  font-size: 10px;
  font-weight: 650;
  text-align: left;
  cursor: pointer;
  transition:
    color 0.18s ease,
    background 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;
}

.nav-item:hover {
  border-color: #e2eee6;
  background: #f4faf6;
  color: #16834a;
  transform: translateX(2px);
}

.nav-item.active {
  border-color: #d9ebdf;
  background: #edf8f1;
  color: #16834a;
  font-weight: 750;
}

.nav-item.active::before {
  content: "";
  position: absolute;
  left: -13px;
  top: 8px;
  bottom: 8px;
  width: 3px;
  border-radius: 0 4px 4px 0;
  background: #2b9a5e;
}

.nav-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
  color: currentColor;
}

.nav-icon svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.65;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.nav-text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.arrow {
  width: 12px;
  height: 12px;
  margin-left: auto;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  transform: translateX(-4px);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.nav-item:hover .arrow,
.nav-item.active .arrow {
  opacity: 0.8;
  transform: translateX(0);
}

/* Mobile */
@media (max-width: 900px) {
  .sidebar {
    position: fixed;
    inset: var(--header-h) auto 0 0;
    z-index: 50;
    width: min(var(--sidebar-w), 86vw);
    min-height: 0;
    box-shadow:
      16px 0 40px rgba(20, 45, 30, 0.13),
      4px 0 12px rgba(20, 45, 30, 0.05);
    transform: translateX(-110%);
    transition: transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .sidebar.open {
    transform: translateX(0);
  }
}

@media (max-width: 420px) {
  .sidebar {
    width: min(300px, 88vw);
    padding: 18px 11px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-item,
  .arrow,
  .sidebar {
    transition: none;
  }
}
</style>