
<script setup>
import AppModal from '../common/AppModal.vue'

defineProps({
  open: {
    type: Boolean,
    default: false,
  },

  preview: {
    type: Object,
    default: null,
  },
})

defineEmits(['close', 'unlock', 'buy'])
</script>

<template>
  <AppModal
    :open="open"
    title="Unlock landlord contact?"
    @close="$emit('close')"
  >
    <div
      v-if="preview"
      class="unlock-modal"
    >
      <!-- Header -->
      <div class="unlock-intro">
        <div class="unlock-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect
              x="5"
              y="10"
              width="14"
              height="10"
              rx="2"
              stroke="currentColor"
              stroke-width="1.7"
            />
            <path
              d="M8 10V7a4 4 0 018 0v3"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
            <circle
              cx="12"
              cy="15"
              r="1.2"
              fill="currentColor"
            />
            <path
              d="M12 16.2V18"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <div>
          <h3>Contact information</h3>
          <p>
            Use coins to unlock the landlord's contact details.
          </p>
        </div>
      </div>

      <!-- Balance Summary -->
      <div class="balance-summary">
        <div class="summary-row">
          <div class="summary-label">
            <span
              class="summary-icon"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="8.5"
                  stroke="currentColor"
                  stroke-width="1.7"
                />
                <path
                  d="M9 12h6M12 9v6"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </span>

            <span>Current balance</span>
          </div>

          <strong class="balance-value">
            {{ preview.currentBalance }} Coins
          </strong>
        </div>

        <div class="summary-row">
          <div class="summary-label">
            <span
              class="summary-icon cost"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3v18M7 7h7a3 3 0 010 6H9a3 3 0 000 6h8"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </span>

            <span>Unlock cost</span>
          </div>

          <strong class="cost-value">
            {{ preview.unlockCost }} Coin{{ preview.unlockCost === 1 ? '' : 's' }}
          </strong>
        </div>

        <div class="summary-divider"></div>

        <div class="summary-row remaining">
          <div class="summary-label">
            <span
              class="summary-icon remaining-icon"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
            </span>

            <span>Remaining balance</span>
          </div>

          <strong class="remaining-value">
            {{ preview.remainingBalance }} Coins
          </strong>
        </div>
      </div>

      <!-- Insufficient Balance -->
      <div
        v-if="!preview.sufficient"
        class="insufficient-alert"
        role="alert"
      >
        <span
          class="alert-icon"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3l9 17H3L12 3z"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linejoin="round"
            />
            <path
              d="M12 9v5"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
            <circle
              cx="12"
              cy="17"
              r="1"
              fill="currentColor"
            />
          </svg>
        </span>

        <div>
          <strong>Insufficient coins</strong>
          <p>
            You need
            <strong>
              {{
                Math.max(
                  0,
                  Number(preview.unlockCost || 0) -
                    Number(preview.currentBalance || 0)
                )
              }}
              more
            </strong>
            coins to unlock this contact.
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="modal-actions">
        <button
          class="btn-secondary"
          type="button"
          @click="$emit('close')"
        >
          Cancel
        </button>

        <button
          v-if="preview.sufficient"
          class="btn-primary"
          type="button"
          @click="$emit('unlock')"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="5"
              y="10"
              width="14"
              height="10"
              rx="2"
              stroke="currentColor"
              stroke-width="1.8"
            />
            <path
              d="M8 10V7a4 4 0 018 0v3"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>

          <span>Unlock contact</span>
        </button>

        <button
          v-else
          class="btn-primary"
          type="button"
          @click="$emit('buy')"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 3v18M7 7h7a3 3 0 010 6H9a3 3 0 000 6h8"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>

          <span>Buy coins</span>
        </button>
      </div>
    </div>
  </AppModal>
</template>

<style scoped>
/* ========================================
   Container
======================================== */

.unlock-modal {
  width: 100%;
}

/* ========================================
   Intro
======================================== */

.unlock-intro {
  display: flex;
  align-items: flex-start;
  gap: 11px;

  margin-bottom: 18px;
}

.unlock-icon {
  display: grid;
  place-items: center;

  width: 40px;
  height: 40px;

  flex: 0 0 auto;

  border-radius: 10px;

  background: #eff6ff;
  color: #2563eb;
}

.unlock-icon svg {
  width: 20px;
  height: 20px;
}

.unlock-intro h3 {
  margin: 1px 0 4px;

  color: #0f172a;

  font-size: 14px;
  font-weight: 700;
}

.unlock-intro p {
  margin: 0;

  color: #64748b;

  font-size: 11px;
  line-height: 1.5;
}

/* ========================================
   Balance Summary
======================================== */

.balance-summary {
  padding: 5px 13px;

  border: 1px solid #e2e8f0;
  border-radius: 10px;

  background: #f8fafc;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 15px;

  min-height: 46px;
}

.summary-label {
  display: flex;
  align-items: center;
  gap: 8px;

  color: #64748b;

  font-size: 11px;
  font-weight: 550;
}

.summary-icon {
  display: grid;
  place-items: center;

  width: 25px;
  height: 25px;

  flex: 0 0 auto;

  border-radius: 7px;

  background: #eff6ff;
  color: #2563eb;
}

.summary-icon.cost {
  background: #fff7ed;
  color: #ea580c;
}

.summary-icon.remaining-icon {
  background: #f0fdf4;
  color: #16a34a;
}

.summary-icon svg {
  width: 13px;
  height: 13px;
}

.balance-value,
.cost-value,
.remaining-value {
  white-space: nowrap;

  font-size: 12px;
  font-weight: 700;
}

.balance-value {
  color: #2563eb;
}

.cost-value {
  color: #ea580c;
}

.remaining-value {
  color: #15803d;
}

.summary-divider {
  height: 1px;

  background: #e2e8f0;
}

/* ========================================
   Alert
======================================== */

.insufficient-alert {
  display: flex;
  align-items: flex-start;
  gap: 9px;

  margin-top: 13px;
  padding: 11px 12px;

  border: 1px solid #fed7aa;
  border-radius: 9px;

  background: #fff7ed;
  color: #9a3412;
}

.alert-icon {
  display: grid;
  place-items: center;

  width: 25px;
  height: 25px;

  flex: 0 0 auto;
}

.alert-icon svg {
  width: 17px;
  height: 17px;
}

.insufficient-alert strong {
  font-size: 11px;
  font-weight: 700;
}

.insufficient-alert p {
  margin: 3px 0 0;

  color: #c2410c;

  font-size: 10px;
  line-height: 1.5;
}

.insufficient-alert p strong {
  font-size: inherit;
}

/* ========================================
   Actions
======================================== */

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 9px;

  margin-top: 20px;
  padding-top: 15px;

  border-top: 1px solid #edf2f7;
}

.btn-secondary,
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  min-height: 38px;

  padding: 8px 14px;

  border-radius: 8px;

  font: inherit;
  font-size: 11px;
  font-weight: 700;

  cursor: pointer;

  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease;
}

.btn-secondary {
  border: 1px solid #dbe3ec;

  background: #ffffff;
  color: #475569;
}

.btn-secondary:hover {
  border-color: #cbd5e1;

  background: #f8fafc;
}

.btn-primary {
  border: 1px solid #2563eb;

  background: #2563eb;
  color: #ffffff;

  box-shadow:
    0 2px 5px rgba(37, 99, 235, 0.16);
}

.btn-primary:hover {
  border-color: #1d4ed8;

  background: #1d4ed8;

  box-shadow:
    0 4px 10px rgba(37, 99, 235, 0.2);
}

.btn-primary:active,
.btn-secondary:active {
  transform: translateY(1px);
}

.btn-primary:focus-visible,
.btn-secondary:focus-visible {
  outline: none;

  box-shadow:
    0 0 0 3px rgba(37, 99, 235, 0.15);
}

.btn-primary svg {
  width: 15px;
  height: 15px;
}

/* ========================================
   Mobile
======================================== */

@media (max-width: 480px) {
  .summary-row {
    min-height: 43px;

    gap: 10px;
  }

  .summary-label {
    font-size: 10px;
  }

  .balance-value,
  .cost-value,
  .remaining-value {
    font-size: 11px;
  }

  .modal-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .btn-secondary,
  .btn-primary {
    width: 100%;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .btn-secondary,
  .btn-primary {
    transition: none;
  }
}
</style>
