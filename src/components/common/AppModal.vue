<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  open: Boolean,
  title: String,
})
const emit = defineEmits(['close'])

function onKey(e) {
  if (props.open && e.key === 'Escape') emit('close')
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>


<template>
  <teleport to="body">
    <div
      v-if="open"
      class="overlay"
      role="presentation"
      @click.self="emit('close')"
    >
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
      >
        <header class="modal-header">
          <div class="title-wrap">
            <span class="title-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 3.5 4.5 7v5.5c0 4.4 3.1 7 7.5 8 4.4-1 7.5-3.6 7.5-8V7L12 3.5Z" />
                <path d="m9.2 12 1.8 1.8 3.8-4" />
              </svg>
            </span>

            <div class="title-content">
              <h2>{{ title }}</h2>
              <span class="title-line"></span>
            </div>
          </div>

          <button
            class="close-btn"
            type="button"
            aria-label="Close"
            @click="emit('close')"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m7 7 10 10" />
              <path d="m17 7-10 10" />
            </svg>
          </button>
        </header>

        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(20, 31, 25, 0.56);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  animation: overlay-in 0.18s ease-out;
}

.modal {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(540px, 100%);
  max-height: min(720px, 90vh);
  overflow: hidden;
  border: 1px solid #e2ebe5;
  border-radius: 18px;
  background:
    radial-gradient(
      circle at 100% 0%,
      rgba(36, 155, 91, 0.07),
      transparent 30%
    ),
    #ffffff;
  box-shadow:
    0 28px 70px rgba(18, 46, 31, 0.18),
    0 8px 24px rgba(18, 46, 31, 0.08);
  animation: modal-in 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 70px;
  padding: 15px 17px 15px 20px;
  border-bottom: 1px solid #e8eee9;
  background: rgba(255, 255, 255, 0.84);
}

.title-wrap {
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
}

.title-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  border: 1px solid #d9ebdf;
  border-radius: 10px;
  background: #edf8f1;
  color: #16834a;
}

.title-icon svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.65;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.title-content {
  min-width: 0;
}

.title-content h2 {
  margin: 0;
  overflow: hidden;
  color: #26362d;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.015em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title-line {
  display: block;
  width: 22px;
  height: 2px;
  margin-top: 5px;
  border-radius: 999px;
  background: #2b9a5e;
}

.close-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  border: 1px solid #e1e8e3;
  border-radius: 9px;
  background: #ffffff;
  color: #738078;
  cursor: pointer;
  transition:
    color 0.18s ease,
    background 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;
}

.close-btn svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
}

.close-btn:hover {
  border-color: #cce1d3;
  background: #f0f8f3;
  color: #16834a;
  transform: rotate(2deg);
}

.close-btn:focus-visible {
  outline: 3px solid rgba(43, 154, 94, 0.16);
  outline-offset: 2px;
}

.modal-body {
  min-height: 0;
  overflow: auto;
  padding: 20px;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: #cddbd2 transparent;
}

.modal-body::-webkit-scrollbar {
  width: 7px;
}

.modal-body::-webkit-scrollbar-track {
  background: transparent;
}

.modal-body::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: #cddbd2;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: #b5c9bc;
}

@keyframes overlay-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 600px) {
  .overlay {
    align-items: end;
    padding: 10px;
  }

  .modal {
    width: 100%;
    max-height: 88vh;
    border-radius: 18px 18px 14px 14px;
  }

  .modal-header {
    min-height: 64px;
    padding: 13px 14px 13px 16px;
  }

  .modal-body {
    padding: 16px;
  }

  .title-content h2 {
    font-size: 14px;
  }
}

@media (max-width: 400px) {
  .overlay {
    padding: 7px;
  }

  .modal {
    max-height: 92vh;
  }

  .title-icon {
    width: 33px;
    height: 33px;
    flex-basis: 33px;
  }

  .close-btn {
    width: 32px;
    height: 32px;
    flex-basis: 32px;
  }

  .modal-body {
    padding: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .overlay,
  .modal,
  .close-btn {
    animation: none;
    transition: none;
  }
}
</style>
