<script setup>
defineProps({
  lines: { type: Number, default: 5 },
})
</script>

<template>
  <div class="sk" aria-hidden="true">
    <div
      v-for="n in lines"
      :key="n"
      class="skeleton line"
      :class="{ short: n === lines }"
    ></div>
  </div>
</template>

<style scoped>
.sk {
  width: 100%;
  display: grid;
  gap: 10px;
}

.skeleton {
  position: relative;
  overflow: hidden;
  background: #e9edf2;
  border-radius: 6px;
}

.line {
  width: 100%;
  height: 14px;
}

/* Last line একটু ছোট হবে */
.line.short {
  width: 65%;
}

/* Smooth shimmer animation */
.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;

  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.55) 50%,
    transparent 100%
  );

  transform: translateX(-100%);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* Mobile */
@media (max-width: 600px) {
  .sk {
    gap: 8px;
  }

  .line {
    height: 12px;
  }

  .line.short {
    width: 60%;
  }
}

/* Reduced motion accessibility */
@media (prefers-reduced-motion: reduce) {
  .skeleton::after {
    animation: none;
  }
}
</style>
