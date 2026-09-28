
<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  label: {
    type: String,
    default: "",
  },

  id: {
    type: String,
    default: "",
  },

  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(["update:modelValue"])
</script>

<template>
  <label
    class="chk"
    :class="{ disabled }"
    :for="id"
  >
    <input
      :id="id"
      type="checkbox"
      class="chk-input"
      :checked="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.checked)"
    />

    <span class="chk-box" aria-hidden="true">
      <svg
        v-if="modelValue"
        class="chk-icon"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M4 10.5L8 14.5L16 6"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>

    <span v-if="label" class="chk-label">
      {{ label }}
    </span>
  </label>
</template>

<style scoped>
.chk {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  min-height: 40px;
  width: fit-content;

  cursor: pointer;
  user-select: none;

  color: #1f2937;
  font-size: 14px;
  font-weight: 500;

  transition:
    color 0.2s ease,
    opacity 0.2s ease;
}

/* Hide native checkbox */
.chk-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;

  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;

  border: 0;
}

/* Custom checkbox */
.chk-box {
  position: relative;

  width: 19px;
  height: 19px;

  flex: 0 0 19px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #ffffff;
  border: 1.5px solid #cbd5e1;
  border-radius: 5px;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;
}

/* Checked */
.chk-input:checked + .chk-box {
  background: #2563eb;
  border-color: #2563eb;
}

.chk-icon {
  width: 14px;
  height: 14px;
  color: #ffffff;

  animation: check-in 0.18s ease-out;
}

/* Hover */
.chk:hover:not(.disabled) .chk-box {
  border-color: #2563eb;
}

.chk:hover:not(.disabled) .chk-input:checked + .chk-box {
  background: #1d4ed8;
  border-color: #1d4ed8;
}

/* Keyboard focus */
.chk-input:focus-visible + .chk-box {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
}

/* Click animation */
.chk:active:not(.disabled) .chk-box {
  transform: scale(0.94);
}

/* Label */
.chk-label {
  line-height: 1.4;
}

/* Disabled */
.chk.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Animation */
@keyframes check-in {
  from {
    opacity: 0;
    transform: scale(0.6);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Mobile */
@media (max-width: 600px) {
  .chk {
    gap: 9px;
    min-height: 38px;
    font-size: 13px;
  }

  .chk-box {
    width: 18px;
    height: 18px;
    flex-basis: 18px;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .chk-box,
  .chk-icon {
    animation: none;
    transition: none;
  }
}
</style>
