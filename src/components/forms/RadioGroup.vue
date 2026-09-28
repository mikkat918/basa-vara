
<script setup>
defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },

  label: {
    type: String,
    default: '',
  },

  options: {
    type: Array,
    default: () => [],
  },

  name: {
    type: String,
    default: 'radio-group',
  },

  error: {
    type: String,
    default: '',
  },

  required: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <fieldset
    class="field"
    :class="{ 'has-error': error }"
    :disabled="disabled"
  >
    <!-- Label -->
    <legend class="legend">
      {{ label }}

      <span
        v-if="required"
        class="required"
        aria-hidden="true"
      >
        *
      </span>
    </legend>

    <!-- Options -->
    <div class="options">
      <label
        v-for="(opt, index) in options"
        :key="opt.value"
        class="opt"
        :class="{
          selected: modelValue === opt.value,
          disabled: disabled || opt.disabled,
        }"
      >
        <input
          class="radio-input"
          type="radio"
          :name="name"
          :value="opt.value"
          :checked="modelValue === opt.value"
          :disabled="disabled || opt.disabled"
          :required="required && index === 0"
          @change="$emit('update:modelValue', opt.value)"
        />

        <span class="radio-circle">
          <span
            v-if="modelValue === opt.value"
            class="radio-dot"
          ></span>
        </span>

        <span class="opt-content">
          <span class="opt-label">
            {{ opt.label }}
          </span>

          <span
            v-if="opt.description"
            class="opt-description"
          >
            {{ opt.description }}
          </span>
        </span>
      </label>
    </div>

    <!-- Error -->
    <p
      v-if="error"
      class="field-error"
      role="alert"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          stroke-width="1.8"
        />

        <path
          d="M12 8V13"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
        />

        <circle
          cx="12"
          cy="16.5"
          r="1"
          fill="currentColor"
        />
      </svg>

      <span>{{ error }}</span>
    </p>
  </fieldset>
</template>

<style scoped>
/* ========================================
   Field
======================================== */

.field {
  width: 100%;

  border: 0;
  padding: 0;
  margin: 0;
}

/* ========================================
   Legend
======================================== */

.legend {
  margin-bottom: 10px;
  padding: 0;

  color: #334155;

  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
}

.required {
  margin-left: 3px;
  color: #ef4444;
}

/* ========================================
   Options
======================================== */

.options {
  display: grid;
  gap: 8px;
}

/* ========================================
   Option
======================================== */

.opt {
  position: relative;

  display: flex;
  align-items: center;
  gap: 11px;

  width: 100%;
  min-height: 46px;

  padding: 9px 12px;
  box-sizing: border-box;

  border: 1px solid #e2e8f0;
  border-radius: 9px;

  background: #ffffff;

  color: #334155;

  cursor: pointer;
  user-select: none;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;
}

/* Hover */

.opt:hover:not(.disabled) {
  border-color: #b8c3d1;
  background: #f8fafc;
}

/* Selected */

.opt.selected {
  border-color: #2563eb;
  background: #eff6ff;
}

/* Selected hover */

.opt.selected:hover:not(.disabled) {
  border-color: #1d4ed8;
  background: #eff6ff;
}

/* Click */

.opt:active:not(.disabled) {
  transform: scale(0.99);
}

/* ========================================
   Native Radio
======================================== */

.radio-input {
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

/* ========================================
   Custom Radio
======================================== */

.radio-circle {
  width: 19px;
  height: 19px;

  flex: 0 0 19px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  border: 1.5px solid #cbd5e1;
  border-radius: 50%;

  background: #ffffff;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.opt.selected .radio-circle {
  border-color: #2563eb;
}

.radio-dot {
  width: 9px;
  height: 9px;

  border-radius: 50%;

  background: #2563eb;

  animation: radio-in 0.16s ease-out;
}

/* ========================================
   Focus
======================================== */

.radio-input:focus-visible + .radio-circle {
  box-shadow:
    0 0 0 3px rgba(37, 99, 235, 0.15);
}

/* ========================================
   Content
======================================== */

.opt-content {
  display: flex;
  flex-direction: column;

  min-width: 0;
}

.opt-label {
  color: #334155;

  font-size: 13px;
  font-weight: 600;

  line-height: 1.4;
}

.opt.selected .opt-label {
  color: #1d4ed8;
}

.opt-description {
  margin-top: 2px;

  color: #64748b;

  font-size: 12px;
  line-height: 1.4;
}

/* ========================================
   Disabled
======================================== */

.opt.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ========================================
   Error
======================================== */

.field.has-error .opt {
  border-color: #fecaca;
}

.field.has-error .opt.selected {
  border-color: #ef4444;
  background: #fef2f2;
}

.field-error {
  display: flex;
  align-items: center;
  gap: 6px;

  margin: 7px 0 0;

  color: #dc2626;

  font-size: 12px;
  font-weight: 500;

  line-height: 1.4;
}

.field-error svg {
  flex: 0 0 auto;

  width: 15px;
  height: 15px;
}

/* ========================================
   Animation
======================================== */

@keyframes radio-in {
  from {
    opacity: 0;
    transform: scale(0.4);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ========================================
   Mobile
======================================== */

@media (max-width: 600px) {
  .options {
    gap: 7px;
  }

  .opt {
    min-height: 44px;
    padding: 8px 10px;
  }

  .legend {
    font-size: 12px;
  }

  .opt-label {
    font-size: 12px;
  }

  .opt-description {
    font-size: 11px;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .opt,
  .radio-circle,
  .radio-dot {
    animation: none;
    transition: none;
  }
}
</style>
