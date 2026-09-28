
<script setup>
import { computed } from 'vue'

const props = defineProps({
  balance: {
    type: Number,
    default: 0,
  },

  compact: {
    type: Boolean,
    default: false,
  },
})

const coinValue = 10

const cashValue = computed(() => {
  return Number(props.balance || 0) * coinValue
})

const formattedBalance = computed(() => {
  return Number(props.balance || 0).toLocaleString('en-US')
})

const formattedCashValue = computed(() => {
  return cashValue.value.toLocaleString('en-US')
})
</script>

<template>
  <section
    class="balance-card"
    :class="{ compact }"
    aria-label="Current coin balance"
  >
    <div class="balance-top">
      <div class="balance-label">
        <span class="wallet-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 7.5A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v9a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 16.5v-9z"
              stroke="currentColor"
              stroke-width="1.7"
            />

            <path
              d="M4 8h13.5A2.5 2.5 0 0120 10.5V13h-4.5a2.5 2.5 0 010-5H20"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linejoin="round"
            />

            <circle
              cx="15.5"
              cy="10.5"
              r=".8"
              fill="currentColor"
            />
          </svg>
        </span>

        <span>Current balance</span>
      </div>

      <span class="coin-badge">
        Coins
      </span>
    </div>

    <div class="balance-main">
      <span class="coin-symbol" aria-hidden="true">
        C
      </span>

      <div class="balance-value">
        <strong>{{ formattedBalance }}</strong>
        <span>Coins</span>
      </div>
    </div>

    <div class="balance-value-row">
      <span>Available value</span>

      <strong>
        ৳{{ formattedCashValue }}
      </strong>
    </div>

    <div class="balance-note">
      <span class="info-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="8.5"
            stroke="currentColor"
            stroke-width="1.7"
          />

          <path
            d="M12 10.5v5"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
          />

          <circle
            cx="12"
            cy="7.5"
            r="1"
            fill="currentColor"
          />
        </svg>
      </span>

      <span>1 Coin = ৳10</span>
    </div>

    <div
      v-if="$slots.default"
      class="balance-actions"
    >
      <slot />
    </div>
  </section>
</template>

<style scoped>
/* ========================================
   Card
======================================== */

.balance-card {
  position: relative;

  width: 100%;

  box-sizing: border-box;

  padding: 20px;

  overflow: hidden;

  border: 1px solid #dbe3ec;
  border-radius: 12px;

  background: #ffffff;

  box-shadow:
    0 3px 10px rgba(15, 23, 42, 0.05);

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.balance-card::before {
  content: '';

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 3px;

  background: #2563eb;
}

.balance-card:hover {
  border-color: #cbd5e1;

  box-shadow:
    0 5px 16px rgba(15, 23, 42, 0.07);
}

/* ========================================
   Header
======================================== */

.balance-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 12px;

  margin-bottom: 16px;
}

.balance-label {
  display: flex;
  align-items: center;
  gap: 8px;

  color: #64748b;

  font-size: 12px;
  font-weight: 600;
}

.wallet-icon {
  display: grid;
  place-items: center;

  width: 30px;
  height: 30px;

  flex: 0 0 auto;

  border-radius: 8px;

  background: #eff6ff;
  color: #2563eb;
}

.wallet-icon svg {
  width: 16px;
  height: 16px;
}

.coin-badge {
  padding: 4px 8px;

  border: 1px solid #dbeafe;
  border-radius: 999px;

  background: #eff6ff;
  color: #2563eb;

  font-size: 10px;
  font-weight: 700;
}

/* ========================================
   Main Balance
======================================== */

.balance-main {
  display: flex;
  align-items: center;
  gap: 11px;

  margin-bottom: 15px;
}

.coin-symbol {
  display: grid;
  place-items: center;

  width: 44px;
  height: 44px;

  flex: 0 0 auto;

  border-radius: 11px;

  background: #2563eb;
  color: #ffffff;

  font-size: 17px;
  font-weight: 800;

  box-shadow:
    0 4px 8px rgba(37, 99, 235, 0.18);
}

.balance-value {
  display: flex;
  align-items: baseline;
  gap: 7px;

  min-width: 0;
}

.balance-value strong {
  color: #0f172a;

  font-size: 28px;
  font-weight: 800;

  line-height: 1.1;
}

.balance-value span {
  color: #64748b;

  font-size: 12px;
  font-weight: 600;
}

/* ========================================
   Cash Value
======================================== */

.balance-value-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 12px;

  padding: 10px 0;

  border-top: 1px solid #edf2f7;
  border-bottom: 1px solid #edf2f7;

  color: #64748b;

  font-size: 11px;
}

.balance-value-row strong {
  color: #1e293b;

  font-size: 13px;
  font-weight: 700;
}

/* ========================================
   Note
======================================== */

.balance-note {
  display: flex;
  align-items: center;
  gap: 6px;

  margin-top: 11px;

  color: #94a3b8;

  font-size: 10px;
  font-weight: 500;
}

.info-icon {
  display: grid;
  place-items: center;
}

.info-icon svg {
  width: 13px;
  height: 13px;
}

/* ========================================
   Actions
======================================== */

.balance-actions {
  margin-top: 15px;

  padding-top: 14px;

  border-top: 1px solid #edf2f7;
}

/* ========================================
   Compact
======================================== */

.balance-card.compact {
  padding: 14px 15px;

  border-radius: 10px;
}

.balance-card.compact .balance-top {
  margin-bottom: 10px;
}

.balance-card.compact .wallet-icon {
  width: 27px;
  height: 27px;
}

.balance-card.compact .coin-badge {
  padding: 3px 7px;

  font-size: 9px;
}

.balance-card.compact .balance-main {
  margin-bottom: 10px;
}

.balance-card.compact .coin-symbol {
  width: 34px;
  height: 34px;

  border-radius: 8px;

  font-size: 13px;
}

.balance-card.compact .balance-value strong {
  font-size: 19px;
}

.balance-card.compact .balance-value span {
  font-size: 10px;
}

.balance-card.compact .balance-value-row {
  padding: 8px 0;
}

.balance-card.compact .balance-note {
  margin-top: 8px;
}

/* ========================================
   Mobile
======================================== */

@media (max-width: 480px) {
  .balance-card {
    padding: 16px;
  }

  .balance-value strong {
    font-size: 24px;
  }

  .coin-symbol {
    width: 40px;
    height: 40px;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .balance-card {
    transition: none;
  }
}
</style>
