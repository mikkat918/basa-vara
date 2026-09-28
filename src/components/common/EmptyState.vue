<script setup>
defineProps({
  title: { type: String, default: 'Nothing here yet' },
  message: { type: String, default: '' },
})
</script>


<template>
  <div class="empty card">
    <div class="empty-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M7 4.5h10A2.5 2.5 0 0 1 19.5 7v10a2.5 2.5 0 0 1-2.5 2.5H7A2.5 2.5 0 0 1 4.5 17V7A2.5 2.5 0 0 1 7 4.5Z" />
        <path d="M8.5 9h7" />
        <path d="M8.5 12h5" />
        <path d="M8.5 15h3" />
      </svg>
    </div>

    <div class="content">
      <h3>{{ title }}</h3>
      <p class="muted">{{ message }}</p>
    </div>

    <div v-if="$slots.default" class="actions">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.empty {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 220px;
  box-sizing: border-box;
  padding: 34px 24px;
  overflow: hidden;
  border: 1px solid #e3ebe6;
  border-radius: 18px;
  background:
    radial-gradient(
      circle at 50% 0%,
      rgba(39, 153, 91, 0.08),
      transparent 42%
    ),
    #ffffff;
  text-align: center;
  box-shadow: 0 8px 26px rgba(24, 53, 36, 0.05);
}

.empty::before {
  content: "";
  position: absolute;
  top: -55px;
  left: 50%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: rgba(39, 153, 91, 0.035);
  transform: translateX(-50%);
  pointer-events: none;
}

.empty-icon {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  margin-bottom: 16px;
  border: 1px solid #d9ebe0;
  border-radius: 15px;
  background: #f0f9f3;
  color: #16834a;
}

.empty-icon svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.content {
  position: relative;
  z-index: 1;
  max-width: 440px;
}

.content h3 {
  margin: 0;
  color: #26362d;
  font-size: 17px;
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: -0.02em;
}

.content p {
  margin: 7px 0 0;
  color: #718078;
  font-size: 12px;
  line-height: 1.7;
}

.actions {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
}

.actions :deep(.btn) {
  min-height: 36px;
}

@media (max-width: 600px) {
  .empty {
    min-height: 190px;
    padding: 28px 18px;
    border-radius: 15px;
  }

  .empty-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 13px;
    border-radius: 13px;
  }

  .empty-icon svg {
    width: 21px;
    height: 21px;
  }

  .content h3 {
    font-size: 15px;
  }

  .content p {
    font-size: 11px;
  }

  .actions {
    flex-wrap: wrap;
  }
}

@media (max-width: 380px) {
  .empty {
    min-height: 175px;
    padding: 24px 15px;
  }

  .empty-icon {
    width: 44px;
    height: 44px;
  }

  .content h3 {
    font-size: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .empty {
    scroll-behavior: auto;
  }
}
</style>