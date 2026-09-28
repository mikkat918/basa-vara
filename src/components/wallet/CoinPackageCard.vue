<script setup>
import { computed } from 'vue'
import { formatBdt } from '../../utils/format'

const props = defineProps({
  pack: {
    type: Object,
    default: () => ({
      coins: 0,
      amount: 0,
    }),
  },
})

defineEmits(['buy'])

const coinLabel = computed(() => {
  return Number(props.pack?.coins || 0) === 1 ? 'Coin' : 'Coins'
})

const perCoinPrice = computed(() => {
  const coins = Number(props.pack?.coins || 0)
  const amount = Number(props.pack?.amount || 0)

  if (!coins) return 0

  return amount / coins
})
</script>

<template>
  <article class="coin-pack">
    <div class="pack-header">
      <div class="coin-icon" aria-hidden="true">
        <span>C</span>
      </div>

      <span class="pack-label">
        Coin Pack
      </span>
    </div>

    <div class="pack-content">
      <p class="coin-count">
        {{ pack?.coins || 0 }}
        <span>{{ coinLabel }}</span>
      </p>

      <div class="price">
        {{ formatBdt(pack?.amount || 0) }}
      </div>

      <p class="price-note">
        ৳{{ perCoinPrice.toFixed(2) }} per coin
      </p>
    </div>

    <div class="pack-footer">
      <button
        class="buy-button"
        type="button"
        :disabled="!pack?.coins || !pack?.amount"
        @click="$emit('buy', pack)"
      >
        <span>Buy Now</span>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 12h13"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
          <path
            d="m13 6 6 6-6 6"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </article>
</template>

<style scoped>
/* ========================================
   Card
======================================== */

.coin-pack {
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 250px;

  box-sizing: border-box;

  padding: 20px;

  overflow: hidden;

  border: 1px solid #dbe3ec;
  border-radius: 12px;

  background: #ffffff;

  box-shadow:
    0 3px 10px rgba(15, 23, 42, 0.05);

  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.coin-pack::before {
  content: '';

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 3px;

  background: #2563eb;
}

.coin-pack:hover {
  transform: translateY(-3px);

  border-color: #bfdbfe;

  box-shadow:
    0 8px 20px rgba(15, 23, 42, 0.08);
}

/* ========================================
   Header
======================================== */

.pack-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 10px;

  margin-bottom: 22px;
}

.coin-icon {
  display: grid;
  place-items: center;

  width: 42px;
  height: 42px;

  border-radius: 11px;

  background: #eff6ff;
  color: #2563eb;

  box-shadow:
    inset 0 0 0 1px #dbeafe;
}

.coin-icon span {
  display: grid;
  place-items: center;

  width: 25px;
  height: 25px;

  border: 2px solid currentColor;
  border-radius: 50%;

  font-size: 12px;
  font-weight: 800;
}

.pack-label {
  padding: 5px 9px;

  border: 1px solid #e2e8f0;
  border-radius: 999px;

  background: #f8fafc;
  color: #64748b;

  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* ========================================
   Content
======================================== */

.pack-content {
  flex: 1;
}

.coin-count {
  margin: 0;

  color: #0f172a;

  font-size: 25px;
  font-weight: 800;
  line-height: 1.2;
}

.coin-count span {
  color: #64748b;

  font-size: 13px;
  font-weight: 600;
}

.price {
  margin-top: 12px;

  color: #2563eb;

  font-size: 22px;
  font-weight: 800;
  line-height: 1.2;
}

.price-note {
  margin: 7px 0 0;

  color: #94a3b8;

  font-size: 11px;
}

/* ========================================
   Footer
======================================== */

.pack-footer {
  margin-top: 20px;
}

.buy-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  width: 100%;
  min-height: 42px;

  padding: 10px 16px;

  border: 1px solid #2563eb;
  border-radius: 8px;

  background: #2563eb;
  color: #ffffff;

  font: inherit;
  font-size: 13px;
  font-weight: 700;

  cursor: pointer;

  box-shadow:
    0 2px 5px rgba(37, 99, 235, 0.18);

  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease;
}

.buy-button svg {
  width: 16px;
  height: 16px;

  transition: transform 0.18s ease;
}

.buy-button:hover:not(:disabled) {
  background: #1d4ed8;
  border-color: #1d4ed8;

  box-shadow:
    0 4px 10px rgba(37, 99, 235, 0.22);
}

.buy-button:hover:not(:disabled) svg {
  transform: translateX(2px);
}

.buy-button:active:not(:disabled) {
  transform: translateY(1px);
}

.buy-button:focus-visible {
  outline: none;

  box-shadow:
    0 0 0 3px rgba(37, 99, 235, 0.18);
}

.buy-button:disabled {
  opacity: 0.55;

  cursor: not-allowed;

  box-shadow: none;
}

/* ========================================
   Mobile
======================================== */

@media (max-width: 480px) {
  .coin-pack {
    min-height: 230px;

    padding: 17px;
  }

  .pack-header {
    margin-bottom: 18px;
  }

  .coin-icon {
    width: 38px;
    height: 38px;
  }

  .coin-count {
    font-size: 22px;
  }

  .price {
    font-size: 20px;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .coin-pack,
  .buy-button,
  .buy-button svg {
    transition: none;
  }
}
</style>
