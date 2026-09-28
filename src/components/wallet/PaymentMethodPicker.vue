
<script setup>
import { PAYMENT_METHODS } from '../../utils/constants'

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <fieldset class="payment-fieldset">
    <legend class="payment-legend">
      <span class="legend-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="currentColor"
            stroke-width="1.7"
          />
          <path
            d="M3 9h18"
            stroke="currentColor"
            stroke-width="1.7"
          />
          <path
            d="M7 14h3"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
          />
        </svg>
      </span>

      <span>
        <strong>Payment method</strong>
        <small>Select how you want to pay</small>
      </span>
    </legend>

    <div class="payment-options">
      <label
        v-for="method in PAYMENT_METHODS"
        :key="method.id"
        class="payment-option"
        :class="{ selected: modelValue === method.id }"
      >
        <input
          type="radio"
          name="payment-method"
          :value="method.id"
          :checked="modelValue === method.id"
          @change="$emit('update:modelValue', method.id)"
        />

        <span class="radio-indicator" aria-hidden="true">
          <span class="radio-dot"></span>
        </span>

        <span class="option-content">
          <span class="option-title">
            {{ method.label }}
          </span>

          <span
            v-if="method.description"
            class="option-description"
          >
            {{ method.description }}
          </span>
        </span>

        <span
          v-if="modelValue === method.id"
          class="selected-icon"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="m5 12 4 4L19 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </label>
    </div>
  </fieldset>
</template>

<style scoped>
/* ========================================
   Fieldset
======================================== */

.payment-fieldset {
  width: 100%;

  margin: 0;
  padding: 0;

  border: 0;
}

/* ========================================
   Legend
======================================== */

.payment-legend {
  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 14px;
  padding: 0;

  color: #0f172a;
}

.legend-icon {
  display: grid;
  place-items: center;

  width: 34px;
  height: 34px;

  flex: 0 0 auto;

  border-radius: 9px;

  background: #eff6ff;
  color: #2563eb;
}

.legend-icon svg {
  width: 17px;
  height: 17px;
}

.payment-legend > span:last-child {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.payment-legend strong {
  font-size: 14px;
  font-weight: 700;
}

.payment-legend small {
  color: #64748b;

  font-size: 11px;
  font-weight: 500;
}

/* ========================================
   Options
======================================== */

.payment-options {
  display: grid;
  gap: 10px;
}

.payment-option {
  position: relative;

  display: flex;
  align-items: center;

  gap: 12px;

  width: 100%;
  min-height: 58px;

  box-sizing: border-box;

  padding: 11px 13px;

  border: 1px solid #dbe3ec;
  border-radius: 10px;

  background: #ffffff;

  cursor: pointer;

  transition:
    border-color 0.18s ease,
    background-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease;
}

.payment-option:hover {
  border-color: #bfdbfe;

  background: #f8fbff;

  box-shadow:
    0 2px 7px rgba(15, 23, 42, 0.05);

  transform: translateY(-1px);
}

.payment-option.selected {
  border-color: #2563eb;

  background: #eff6ff;

  box-shadow:
    0 0 0 1px rgba(37, 99, 235, 0.06);
}

/* ========================================
   Native Radio
======================================== */

.payment-option input {
  position: absolute;

  width: 1px;
  height: 1px;

  opacity: 0;
  pointer-events: none;
}

/* ========================================
   Radio Indicator
======================================== */

.radio-indicator {
  display: grid;
  place-items: center;

  width: 19px;
  height: 19px;

  flex: 0 0 auto;

  border: 1.7px solid #94a3b8;
  border-radius: 50%;

  background: #ffffff;

  transition:
    border-color 0.18s ease,
    background-color 0.18s ease;
}

.payment-option.selected .radio-indicator {
  border-color: #2563eb;
}

.radio-dot {
  width: 9px;
  height: 9px;

  border-radius: 50%;

  background: #2563eb;

  opacity: 0;

  transform: scale(0.5);

  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.payment-option.selected .radio-dot {
  opacity: 1;
  transform: scale(1);
}

/* ========================================
   Content
======================================== */

.option-content {
  display: flex;
  flex-direction: column;
  gap: 2px;

  min-width: 0;

  flex: 1;
}

.option-title {
  color: #1e293b;

  font-size: 13px;
  font-weight: 650;

  line-height: 1.4;
}

.payment-option.selected .option-title {
  color: #1d4ed8;
}

.option-description {
  overflow: hidden;

  color: #64748b;

  font-size: 10px;
  line-height: 1.4;

  text-overflow: ellipsis;
}

/* ========================================
   Selected Icon
======================================== */

.selected-icon {
  display: grid;
  place-items: center;

  width: 23px;
  height: 23px;

  flex: 0 0 auto;

  border-radius: 50%;

  background: #2563eb;
  color: #ffffff;
}

.selected-icon svg {
  width: 13px;
  height: 13px;
}

/* ========================================
   Keyboard Focus
======================================== */

.payment-option:has(input:focus-visible) {
  outline: none;

  border-color: #2563eb;

  box-shadow:
    0 0 0 3px rgba(37, 99, 235, 0.15);
}

/* ========================================
   Mobile
======================================== */

@media (max-width: 480px) {
  .payment-option {
    min-height: 55px;

    padding: 10px 11px;

    gap: 10px;
  }

  .legend-icon {
    width: 32px;
    height: 32px;
  }

  .payment-legend strong {
    font-size: 13px;
  }

  .payment-legend small {
    font-size: 10px;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .payment-option,
  .radio-indicator,
  .radio-dot {
    transition: none;
  }
}
</style>
