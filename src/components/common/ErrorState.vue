<script setup>
defineProps({
  message: { type: String, default: 'Something went wrong.' },
})
defineEmits(['retry'])
</script>

<template>
  <div class="error-state card" role="alert">
    <div class="error-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M12 3.5 21 20H3L12 3.5Z" />
        <path d="M12 9v5" />
        <path d="M12 17h.01" />
      </svg>
    </div>

    <div class="content">
      <span class="eyebrow">Something went wrong</span>
      <h3>Unable to load</h3>
      <p class="muted">{{ message }}</p>
    </div>

    <button
      class="retry-btn"
      type="button"
      @click="$emit('retry')"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 11a8 8 0 1 0 1 4" />
        <path d="M20 5v6h-6" />
      </svg>

      <span>Try again</span>
    </button>
  </div>
</template>

<style scoped>
.error-state {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 220px;
  box-sizing: border-box;
  padding: 32px 24px;
  overflow: hidden;
  border: 1px solid #eadede;
  border-radius: 18px;
  background:
    radial-gradient(
      circle at 50% 0%,
      rgba(194, 65, 65, 0.065),
      transparent 42%
    ),
    #ffffff;
  text-align: center;
  box-shadow: 0 8px 26px rgba(65, 32, 32, 0.05);
}

.error-state::before {
  content: "";
  position: absolute;
  top: -60px;
  left: 50%;
  width: 155px;
  height: 155px;
  border-radius: 50%;
  background: rgba(194, 65, 65, 0.035);
  transform: translateX(-50%);
  pointer-events: none;
}

.error-icon {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  margin-bottom: 15px;
  border: 1px solid #f0d7d7;
  border-radius: 15px;
  background: #fff3f3;
  color: #c24141;
}

.error-icon svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.content {
  position: relative;
  z-index: 1;
  max-width: 460px;
}

.eyebrow {
  display: block;
  margin-bottom: 5px;
  color: #b45555;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.12em;
  line-height: 1.4;
  text-transform: uppercase;
}

.content h3 {
  margin: 0;
  color: #29372f;
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

.retry-btn {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 37px;
  margin-top: 19px;
  padding: 0 14px;
  border: 1px solid #d5dfd9;
  border-radius: 9px;
  background: #ffffff;
  color: #425148;
  font: inherit;
  font-size: 10px;
  font-weight: 750;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(24, 53, 36, 0.04);
  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

.retry-btn svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.retry-btn:hover {
  border-color: #b9d4c2;
  background: #f2f9f4;
  color: #16834a;
  transform: translateY(-1px);
  box-shadow: 0 5px 14px rgba(24, 83, 49, 0.08);
}

.retry-btn:focus-visible {
  outline: 3px solid rgba(43, 154, 94, 0.15);
  outline-offset: 2px;
}

@media (max-width: 600px) {
  .error-state {
    min-height: 190px;
    padding: 28px 18px;
    border-radius: 15px;
  }

  .error-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 13px;
    border-radius: 13px;
  }

  .error-icon svg {
    width: 21px;
    height: 21px;
  }

  .content h3 {
    font-size: 15px;
  }

  .content p {
    font-size: 11px;
  }
}

@media (max-width: 380px) {
  .error-state {
    min-height: 175px;
    padding: 24px 15px;
  }

  .error-icon {
    width: 44px;
    height: 44px;
  }

  .content h3 {
    font-size: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .retry-btn {
    transition: none;
  }
}
</style>
