<script setup>
import { useUiStore } from '../../stores/uiStore'

const ui = useUiStore()
</script>

<template>
  <teleport to="body">
    <div
      v-if="ui.confirm"
      class="overlay"
      role="presentation"
      @click.self="ui.confirm.resolve(false)"
    >
      <div
        class="modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
      >
        <div class="modal-header">
          <span
            class="status-icon"
            :class="{ danger: ui.confirm.danger }"
            aria-hidden="true"
          >
            <svg
              v-if="ui.confirm.danger"
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
              <path d="M12 3.5 4.5 7v5.5c0 4.4 3.1 7 7.5 8 4.4-1 7.5-3.6 7.5-8V7L12 3.5Z" />
              <path d="m9.2 12 1.8 1.8 3.8-4" />
            </svg>
          </span>

          <div class="title-wrap">
            <h2 id="confirm-dialog-title">
              {{ ui.confirm.title }}
            </h2>
            <span class="title-line"></span>
          </div>
        </div>

        <p id="confirm-dialog-message" class="message">
          {{ ui.confirm.message }}
        </p>

        <div class="actions">
          <button
            class="action-btn cancel"
            type="button"
            @click="ui.confirm.resolve(false)"
          >
            {{ ui.confirm.cancelLabel || 'Cancel' }}
          </button>

          <button
            class="action-btn"
            :class="ui.confirm.danger ? 'danger-btn' : 'confirm-btn'"
            type="button"
            @click="ui.confirm.resolve(true)"
          >
            <svg
              v-if="ui.confirm.danger"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 7h14" />
              <path d="M10 11v5" />
              <path d="M14 11v5" />
              <path d="M8 7l1-2h6l1 2" />
              <path d="M7 7l.7 13h8.6L17 7" />
            </svg>

            <svg
              v-else
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="m5 12 4.5 4.5L19 7" />
            </svg>

            <span>
              {{ ui.confirm.confirmLabel || 'Confirm' }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(20, 31, 25, 0.56);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  animation: overlay-in 0.18s ease-out;
}

.modal {
  width: min(460px, 100%);
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid #e2ebe5;
  border-radius: 18px;
  background:
    radial-gradient(
      circle at 100% 0%,
      rgba(36, 155, 91, 0.07),
      transparent 32%
    ),
    #ffffff;
  padding: 22px;
  box-shadow:
    0 28px 70px rgba(18, 46, 31, 0.18),
    0 8px 24px rgba(18, 46, 31, 0.08);
  animation: modal-in 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  border: 1px solid #d8ebdf;
  border-radius: 11px;
  background: #edf8f1;
  color: #16834a;
}

.status-icon.danger {
  border-color: #f0d5d5;
  background: #fff1f1;
  color: #c24141;
}

.status-icon svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.title-wrap {
  min-width: 0;
}

.title-wrap h2 {
  margin: 0;
  color: #26362d;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: -0.015em;
}

.title-line {
  display: block;
  width: 22px;
  height: 2px;
  margin-top: 5px;
  border-radius: 999px;
  background: #2b9a5e;
}

.status-icon.danger + .title-wrap .title-line {
  background: #c24141;
}

.message {
  margin: 18px 2px 0;
  color: #6f7c74;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.7;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 22px;
  padding-top: 15px;
  border-top: 1px solid #e9efeb;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 36px;
  padding: 0 13px;
  border: 1px solid transparent;
  border-radius: 9px;
  font: inherit;
  font-size: 10px;
  font-weight: 750;
  cursor: pointer;
  transition:
    color 0.18s ease,
    background 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

.action-btn svg {
  width: 14px;
  height: 14px;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.action-btn:focus-visible {
  outline: 3px solid rgba(43, 154, 94, 0.15);
  outline-offset: 2px;
}

.cancel {
  border-color: #dce5df;
  background: #ffffff;
  color: #65736b;
}

.cancel:hover {
  border-color: #cbd9d0;
  background: #f5f8f6;
  color: #39473f;
}

.confirm-btn {
  border-color: #16834a;
  background: #16834a;
  color: #ffffff;
  box-shadow: 0 5px 14px rgba(22, 131, 74, 0.14);
}

.confirm-btn:hover {
  border-color: #126d3d;
  background: #126d3d;
  transform: translateY(-1px);
}

.danger-btn {
  border-color: #c24141;
  background: #c24141;
  color: #ffffff;
  box-shadow: 0 5px 14px rgba(194, 65, 65, 0.13);
}

.danger-btn:hover {
  border-color: #aa3535;
  background: #aa3535;
  transform: translateY(-1px);
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

@media (max-width: 520px) {
  .overlay {
    align-items: end;
    padding: 10px;
  }

  .modal {
    width: 100%;
    border-radius: 18px 18px 14px 14px;
    padding: 18px;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .action-btn {
    width: 100%;
  }
}

@media (max-width: 360px) {
  .modal {
    padding: 16px;
  }

  .modal-header {
    gap: 9px;
  }

  .status-icon {
    width: 36px;
    height: 36px;
    flex-basis: 36px;
  }

  .title-wrap h2 {
    font-size: 14px;
  }

  .actions {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .overlay,
  .modal,
  .action-btn {
    animation: none;
    transition: none;
  }
}
</style>
