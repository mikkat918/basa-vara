<script setup>
defineProps({ label: { type: String, default: 'Loading' } })
</script>


<template>
  <div class="spinner-wrap" role="status" aria-live="polite">
    <span class="spinner" aria-hidden="true">
      <span class="spinner-dot"></span>
    </span>

    <span class="sr-only">{{ label }}</span>
  </div>
</template>

<style scoped>
.spinner-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 72px;
  width: 100%;
  box-sizing: border-box;
}

.spinner {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  box-sizing: border-box;
  border: 3px solid #e1ebe5;
  border-top-color: #16834a;
  border-right-color: #2b9a5e;
  border-radius: 50%;
  animation: spinner-rotate 0.75s linear infinite;
}

.spinner-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #16834a;
  box-shadow: 0 0 0 3px rgba(22, 131, 74, 0.08);
}

@keyframes spinner-rotate {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 480px) {
  .spinner-wrap {
    min-height: 64px;
  }

  .spinner {
    width: 30px;
    height: 30px;
    border-width: 3px;
  }

  .spinner-dot {
    width: 4px;
    height: 4px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
    border-top-color: #16834a;
    border-right-color: #16834a;
  }
}
</style>
