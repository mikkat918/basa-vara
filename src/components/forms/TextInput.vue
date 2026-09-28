
<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },

  label: {
    type: String,
    default: '',
  },

  type: {
    type: String,
    default: 'text',
  },

  error: {
    type: String,
    default: '',
  },

  id: {
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

  placeholder: {
    type: String,
    default: '',
  },

  autocomplete: {
    type: String,
    default: undefined,
  },

  inputmode: {
    type: String,
    default: undefined,
  },

  name: {
    type: String,
    default: undefined,
  },

  maxlength: {
    type: [String, Number],
    default: undefined,
  },

  minlength: {
    type: [String, Number],
    default: undefined,
  },

  readonly: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="field">

    <!-- Label -->
    <label
      v-if="label"
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
      class="input-wrap"
      :class="{ 'has-error': error }"
    >
      <input
        :id="id"
        class="control"
        :type="type"
        :value="modelValue"
        :name="name"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :inputmode="inputmode"
        :maxlength="maxlength"
        :minlength="minlength"
        :aria-invalid="Boolean(error)"
        :aria-describedby="error ? `${id}-error` : undefined"
        @input="$emit('update:modelValue', $event.target.value)"
      />
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
/* ========================================
   Field
======================================== */

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

.input-wrap {
  position: relative;
  width: 100%;
}

/* ========================================
   Input
======================================== */

.control {
  display: block;

  width: 100%;
  min-height: 44px;

  box-sizing: border-box;

  padding: 0 13px;

  border: 1px solid #d7dee8;
  border-radius: 8px;

  outline: none;

  background: #ffffff;
  color: #1e293b;

  font-family: inherit;
  font-size: 14px;
  font-weight: 400;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

/* Placeholder */

.control::placeholder {
  color: #94a3b8;
  opacity: 1;
}

/* Hover */

.control:hover:not(:disabled):not(:focus) {
  border-color: #b8c3d1;
}

/* Focus */

.control:focus {
  border-color: #2563eb;

  box-shadow:
    0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Error */

.input-wrap.has-error .control {
  border-color: #ef4444;
}

.input-wrap.has-error .control:focus {
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

.control:disabled::placeholder {
  color: #cbd5e1;
}

/* Readonly */

.control:read-only:not(:disabled) {
  background: #f8fafc;
  cursor: default;
}

/* ========================================
   Error Message
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
   Mobile
======================================== */

@media (max-width: 600px) {
  .control {
    min-height: 42px;

    padding: 0 12px;

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
  .control {
    transition: none;
  }
}
</style>
