
<script setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
})

defineEmits(['remove'])
</script>

<template>
  <button
    class="chip"
    type="button"
    :aria-label="`Remove ${label}`"
    @click="$emit('remove')"
  >
    <span class="chip-label">
      {{ label }}
    </span>

    <span class="remove-icon" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M7 7l10 10M17 7L7 17"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </span>
  </button>
</template>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;

  min-height: 32px;
  max-width: 100%;

  padding: 5px 8px 5px 11px;

  border: 1px solid #dbe3ec;
  border-radius: 999px;

  background: #ffffff;
  color: #334155;

  font: inherit;
  font-size: 12px;
  font-weight: 600;

  line-height: 1;

  cursor: pointer;

  user-select: none;

  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease;
}

.chip:hover {
  border-color: #bfdbfe;
  background: #f8fbff;
  color: #1d4ed8;

  transform: translateY(-1px);

  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
}

.chip:active {
  transform: translateY(0);
}

.chip:focus-visible {
  outline: none;

  border-color: #2563eb;

  box-shadow:
    0 0 0 3px rgba(37, 99, 235, 0.14);
}

.chip-label {
  min-width: 0;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.remove-icon {
  display: grid;
  place-items: center;

  width: 19px;
  height: 19px;

  flex: 0 0 auto;

  border-radius: 50%;

  background: #f1f5f9;
  color: #64748b;

  transition:
    background-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
}

.remove-icon svg {
  width: 11px;
  height: 11px;
}

.chip:hover .remove-icon {
  background: #dbeafe;
  color: #2563eb;

  transform: rotate(90deg);
}

/* ========================================
   Mobile
======================================== */

@media (max-width: 480px) {
  .chip {
    min-height: 30px;

    padding: 5px 7px 5px 10px;

    font-size: 11px;
  }

  .remove-icon {
    width: 18px;
    height: 18px;
  }
}

/* ========================================
   Reduced motion
======================================== */

@media (prefers-reduced-motion: reduce) {
  .chip,
  .remove-icon {
    transition: none;
  }

  .chip:hover,
  .chip:active,
  .chip:hover .remove-icon {
    transform: none;
  }
}
</style>
