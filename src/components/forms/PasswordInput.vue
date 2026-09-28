
<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: String,
    default: '',
  },

  label: {
    type: String,
    default: 'Password',
  },

  error: {
    type: String,
    default: '',
  },

  id: {
    type: String,
    default: '',
  },

  autocomplete: {
    type: String,
    default: 'current-password',
  },

  placeholder: {
    type: String,
    default: 'Enter your password',
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  required: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])

const show = ref(false)
</script>

<template>
  <div class="field">

    <!-- Label -->
    <label
      class="field-label"
      :for="id"
    >
      {{ label }}

      <span
        v-if="required"
        class="required"
        aria-hidden="true"
      >
        *
      </span>
    </label>

    <!-- Input -->
    <div
      class="wrap"
      :class="{ 'has-error': error }"
    >
      <input
        :id="id"
        class="control"
        :type="show ? 'text' : 'password'"
        :value="modelValue"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${id}-error` : undefined"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <!-- Show / Hide -->
      <button
        class="toggle"
        type="button"
        :disabled="disabled"
        :aria-label="show ? 'Hide password' : 'Show password'"
        :title="show ? 'Hide password' : 'Show password'"
        @click="show = !show"
      >
        <!-- Eye -->
        <svg
          v-if="!show"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linejoin="round"
          />

          <circle
            cx="12"
            cy="12"
            r="2.5"
            stroke="currentColor"
            stroke-width="1.8"
          />
        </svg>

        <!-- Eye Off -->
        <svg
          v-else
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 3L21 21"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />

          <path
            d="M10.6 5.7C11.05 5.57 11.52 5.5 12 5.5C18 5.5 21.5 12 21.5 12C20.8 13.3 19.7 14.8 18.2 16"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <path
            d="M6.1 7.1C4.45 8.3 3.35 10.05 2.5 12C2.5 12 6 18.5 12 18.5C13.35 18.5 14.55 18.15 15.6 17.65"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <path
            d="M9.9 9.9C9.35 10.45 9 11.2 9 12C9 13.65 10.35 15 12 15C12.8 15 13.55 14.65 14.1 14.1"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>

    <!-- Error -->
    <p
      v-if="error"
      :id="`${id}-error`"
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
  </div>
</template>

<style scoped>
.field {
  width: 100%;
}

/* ========================================
   Label
======================================== */

.field-label {
  display: block;

  margin-bottom: 7px;

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
   Input Wrapper
======================================== */

.wrap {
  position: relative;
  width: 100%;
}

/* ========================================
   Input
======================================== */

.control {
  width: 100%;
  min-height: 44px;

  box-sizing: border-box;

  padding: 0 46px 0 13px;

  border: 1px solid #d7dee8;
  border-radius: 8px;

  outline: none;

  background: #ffffff;
  color: #1e293b;

  font-family: inherit;
  font-size: 14px;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.control::placeholder {
  color: #94a3b8;
}

/* Hover */

.control:hover:not(:disabled) {
  border-color: #b8c3d1;
}

/* Focus */

.control:focus {
  border-color: #2563eb;

  box-shadow:
    0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Error */

.wrap.has-error .control {
  border-color: #ef4444;
}

.wrap.has-error .control:focus {
  border-color: #ef4444;

  box-shadow:
    0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Disabled */

.control:disabled {
  background: #f8fafc;
  color: #94a3b8;

  cursor: not-allowed;
}

/* ========================================
   Toggle Button
======================================== */

.toggle {
  position: absolute;

  top: 50%;
  right: 7px;

  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  transform: translateY(-50%);

  border: none;
  border-radius: 6px;

  background: transparent;
  color: #64748b;

  cursor: pointer;

  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.toggle:hover:not(:disabled) {
  background: #f1f5f9;
  color: #2563eb;
}

.toggle:active:not(:disabled) {
  transform: translateY(-50%) scale(0.94);
}

.toggle:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 1px;
}

.toggle:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.toggle svg {
  width: 19px;
  height: 19px;
}

/* ========================================
   Error
======================================== */

.field-error {
  display: flex;
  align-items: center;
  gap: 6px;

  margin: 6px 0 0;

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
   Responsive
======================================== */

@media (max-width: 600px) {
  .control {
    min-height: 42px;

    padding-left: 12px;
    padding-right: 44px;

    font-size: 14px;
  }

  .field-label {
    font-size: 12px;
  }

  .field-error {
    font-size: 11px;
  }
}

/* ========================================
   Reduced Motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .control,
  .toggle {
    transition: none;
  }
}
</style>
