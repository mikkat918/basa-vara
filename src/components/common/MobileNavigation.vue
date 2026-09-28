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
  <button
    v-if="open"
    class="drawer-bg"
    type="button"
    aria-label="Close navigation menu"
    @click="open = false"
  ></button>

  <nav class="bottom" aria-label="Mobile navigation">
    <router-link
      v-for="item in items.slice(0, 4)"
      :key="item.label"
      :to="item.to || route.path"
      class="nav-item"
      :aria-label="item.label"
    >
      <span class="nav-icon" aria-hidden="true">
        <svg
          v-if="/home|dashboard/i.test(item.label)"
          viewBox="0 0 24 24"
        >
          <path d="m4 10 8-6 8 6" />
          <path d="M6.5 9v10h11V9" />
          <path d="M10 19v-6h4v6" />
        </svg>

        <svg
          v-else-if="/search|find/i.test(item.label)"
          viewBox="0 0 24 24"
        >
          <circle cx="10.8" cy="10.8" r="6.3" />
          <path d="m16 16 4.5 4.5" />
        </svg>

        <svg
          v-else-if="/message|chat/i.test(item.label)"
          viewBox="0 0 24 24"
        >
          <path d="M5 5.5h14A2.5 2.5 0 0 1 21.5 8v7A2.5 2.5 0 0 1 19 17.5H11l-4.5 3v-3H5A2.5 2.5 0 0 1 2.5 15V8A2.5 2.5 0 0 1 5 5.5Z" />
          <path d="M7 10h10M7 13h6" />
        </svg>

        <svg
          v-else-if="/save|favorite|bookmark/i.test(item.label)"
          viewBox="0 0 24 24"
        >
          <path d="M6.5 4.5h11A1.5 1.5 0 0 1 19 6v14l-7-4-7 4V6a1.5 1.5 0 0 1 1.5-1.5Z" />
        </svg>

        <svg
          v-else-if="/profile|account|user/i.test(item.label)"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5.5 20c.8-3.3 3-5 6.5-5s5.7 1.7 6.5 5" />
        </svg>

        <svg
          v-else
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2.5 2" />
        </svg>
      </span>

      <span class="nav-label">{{ item.label }}</span>
    </router-link>

    <button
      class="nav-item more-btn"
      type="button"
      :aria-expanded="open"
      aria-label="Open more navigation options"
      @click="open = true"
    >
      <span class="nav-icon more-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <circle cx="5" cy="12" r="1.4" />
          <circle cx="12" cy="12" r="1.4" />
          <circle cx="19" cy="12" r="1.4" />
        </svg>
      </span>

      <span class="nav-label">More</span>
    </button>
  </nav>
</template>

<style scoped>
.bottom {
  display: none;
}

.drawer-bg {
  width: 100%;
  padding: 0;
  border: 0;
  position: fixed;
  inset: 0;
  z-index: 44;
  background: rgba(18, 30, 23, 0.42);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  animation: fade-in 0.18s ease-out;
}

@media (max-width: 900px) {
  .bottom {
    position: sticky;
    bottom: 0;
    z-index: 30;

    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    width: 100%;
    min-height: 64px;
    box-sizing: border-box;

    border-top: 1px solid #e1e9e4;
    background: rgba(255, 255, 255, 0.96);
    box-shadow: 0 -8px 24px rgba(22, 48, 32, 0.08);

    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }

  .nav-item {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;

    min-width: 0;
    min-height: 64px;
    padding: 7px 4px;

    border: 0;
    background: transparent;
    color: #7a8780;

    font: inherit;
    text-decoration: none;

    cursor: pointer;

    transition:
      color 0.18s ease,
      background 0.18s ease;
  }

  .nav-item::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;

    width: 28px;
    height: 3px;

    border-radius: 0 0 999px 999px;
    background: #16834a;

    transform: translateX(-50%) scaleX(0);
    transform-origin: center;

    transition: transform 0.18s ease;
  }

  .nav-item:hover {
    color: #16834a;
    background: #f5faf7;
  }

  .nav-item.router-link-active {
    color: #16834a;
  }

  .nav-item.router-link-active::before {
    transform: translateX(-50%) scaleX(1);
  }

  .nav-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 22px;
    height: 22px;
    flex: 0 0 22px;
  }

  .nav-icon svg {
    width: 19px;
    height: 19px;

    fill: none;
    stroke: currentColor;
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .nav-label {
    display: block;
    width: 100%;

    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-size: 12px;
    font-weight: 750;
    line-height: 1.2;
  }

  .more-btn {
    color: #69776f;
  }

  .more-icon svg {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 560px) {
  .bottom {
    min-height: 60px;
  }

  .nav-item {
    min-height: 60px;
    padding: 6px 3px;
  }

  .nav-icon {
    width: 20px;
    height: 20px;
    flex-basis: 20px;
  }

  .nav-icon svg {
    width: 18px;
    height: 18px;
  }

  .nav-label {
    font-size: 12px;
  }
}

@media (max-width: 380px) {
  .bottom {
    min-height: 56px;
  }

  .nav-item {
    min-height: 56px;
    gap: 2px;
  }

  .nav-label {
    font-size: 12px;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .drawer-bg,
  .nav-item,
  .nav-item::before {
    animation: none;
    transition: none;
  }
}
</style>

