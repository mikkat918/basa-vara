<script setup>
import { useUiStore } from '../../stores/uiStore'
const ui = useUiStore()
</script>

<template>
  <div class="toasts" aria-live="polite" aria-atomic="false">
    <TransitionGroup name="toast">
      <div
        v-for="t in ui.toasts"
        :key="t.id"
        class="toast"
        :class="t.type"
        role="status"
      >
        <span class="toast-icon" aria-hidden="true">
          <svg
            v-if="t.type === 'success'"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="8.5" />
            <path d="m8.5 12 2.2 2.2 4.8-5" />
          </svg>

          <svg
            v-else-if="t.type === 'error'"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="8.5" />
            <path d="m9 9 6 6" />
            <path d="m15 9-6 6" />
          </svg>

          <svg
            v-else-if="t.type === 'warning'"
            viewBox="0 0 24 24"
          >
            <path d="M12 4 21 20H3L12 4Z" />
            <path d="M12 9v5" />
            <path d="M12 17h.01" />
          </svg>

          <svg
            v-else
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 10v5" />
            <path d="M12 7h.01" />
          </svg>
        </span>

        <div class="toast-content">
          <span class="toast-type">
            {{
              t.type === 'success'
                ? 'Success'
                : t.type === 'error'
                  ? 'Something went wrong'
                  : t.type === 'warning'
                    ? 'Warning'
                    : 'Notice'
            }}
          </span>

          <p>{{ t.message }}</p>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toasts {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 9px;
  width: min(380px, calc(100vw - 28px));
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  background: #1f2924;
  color: #ffffff;
  box-shadow:
    0 16px 35px rgba(15, 30, 21, 0.18),
    0 4px 12px rgba(15, 30, 21, 0.1);
  pointer-events: auto;
}

.toast.success {
  border-color: rgba(255, 255, 255, 0.12);
  background: #16834a;
}

.toast.error {
  background: #c84b4b;
}

.toast.warning {
  background: #a86f19;
}

.toast:not(.success):not(.error):not(.warning) {
  background: #29342e;
}

.toast-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex: 0 0 28px;
  margin-top: 1px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.toast-icon svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.toast-content {
  min-width: 0;
  flex: 1;
}

.toast-type {
  display: block;
  margin-bottom: 2px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.08em;
  line-height: 1.3;
  text-transform: uppercase;
}

.toast p {
  margin: 0;
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

/* Toast animation */
.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(18px) translateY(4px);
}

.toast-move {
  transition: transform 0.22s ease;
}

/* Mobile */
@media (max-width: 600px) {
  .toasts {
    right: 12px;
    bottom: 12px;
    width: calc(100vw - 24px);
  }

  .toast {
    padding: 11px 12px;
    border-radius: 11px;
  }

  .toast-icon {
    width: 27px;
    height: 27px;
    flex-basis: 27px;
  }

  .toast p {
    font-size: 10px;
  }
}

@media (max-width: 380px) {
  .toasts {
    right: 9px;
    bottom: 9px;
    width: calc(100vw - 18px);
  }

  .toast {
    gap: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .toast-enter-active,
  .toast-leave-active,
  .toast-move {
    transition: none;
  }
}
</style>