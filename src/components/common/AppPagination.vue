<script setup>
const props = defineProps({
  page: Number,
  pageSize: { type: Number, default: 9 },
  total: Number,
})
const emit = defineEmits(['update:page'])
const pages = () => Math.max(1, Math.ceil(props.total / props.pageSize))
</script>


<template>
  <nav
    v-if="total > pageSize"
    class="pager"
    aria-label="Pagination"
  >
    <button
      class="page-btn"
      type="button"
      :disabled="page <= 1"
      aria-label="Go to previous page"
      @click="emit('update:page', page - 1)"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m15 18-6-6 6-6" />
      </svg>
      <span>Previous</span>
    </button>

    <div class="page-status" aria-live="polite">
      <span class="status-label">Page</span>
      <strong>{{ page }}</strong>
      <span class="status-of">of</span>
      <strong>{{ pages() }}</strong>
    </div>

    <button
      class="page-btn"
      type="button"
      :disabled="page >= pages()"
      aria-label="Go to next page"
      @click="emit('update:page', page + 1)"
    >
      <span>Next</span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  </nav>
</template>

<style scoped>
.pager {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: 26px;
  padding: 4px 0;
}

.page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 92px;
  height: 36px;
  padding: 0 11px;
  border: 1px solid #dce6df;
  border-radius: 9px;
  background: #ffffff;
  color: #536158;
  font: inherit;
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
  transition:
    color 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease,
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

.page-btn svg {
  width: 14px;
  height: 14px;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.page-btn:hover:not(:disabled) {
  border-color: #bddcc8;
  background: #f1f9f4;
  color: #16834a;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(22, 131, 74, 0.07);
}

.page-btn:focus-visible {
  outline: 3px solid rgba(43, 154, 94, 0.15);
  outline-offset: 2px;
}

.page-btn:disabled {
  opacity: 0.42;
  cursor: not-allowed;
  background: #f7f9f8;
}

.page-status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 100px;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #e2ebe5;
  border-radius: 9px;
  background: #f7faf8;
  color: #77837b;
  font-size: 10px;
  font-weight: 600;
}

.page-status strong {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 21px;
  height: 21px;
  padding: 0 5px;
  border-radius: 6px;
  background: #edf8f1;
  color: #16834a;
  font-size: 10px;
  font-weight: 800;
}

.status-of {
  color: #a0aaa4;
}

/* Mobile */
@media (max-width: 520px) {
  .pager {
    gap: 7px;
    margin-top: 20px;
  }

  .page-btn {
    min-width: 38px;
    width: 38px;
    padding: 0;
  }

  .page-btn span {
    display: none;
  }

  .page-status {
    min-width: 88px;
    height: 34px;
    padding: 0 9px;
  }
}

@media (max-width: 360px) {
  .pager {
    gap: 5px;
  }

  .page-status {
    min-width: 78px;
    gap: 4px;
  }

  .page-status .status-label,
  .page-status .status-of {
    font-size: 9px;
  }

  .page-btn {
    width: 34px;
    min-width: 34px;
    height: 34px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .page-btn {
    transition: none;
  }
}
</style>