<script setup>
defineProps({
  label: String,
  value: [String, Number],
  hint: String,
})
</script>

```vue id="q3m7vd"
<template>
  <article class="stat-card card">
    <div class="stat-top">
      <div class="stat-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M5 19V10" />
          <path d="M12 19V5" />
          <path d="M19 19v-7" />
        </svg>
      </div>

      <span class="stat-label">
        {{ label }}
      </span>
    </div>

    <div class="stat-value">
      {{ value }}
    </div>

    <div v-if="hint" class="stat-footer">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 10v6M12 7h.01" />
      </svg>

      <span>{{ hint }}</span>
    </div>
  </article>
</template>

<style scoped>
.stat-card {
  position: relative;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 20px;
  overflow: hidden;
  border: 1px solid #e1e9e4;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(31, 67, 47, 0.065);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.stat-card::after {
  content: "";
  position: absolute;
  top: -45px;
  right: -45px;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.055);
  pointer-events: none;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: #d5e3da;
  box-shadow: 0 16px 38px rgba(31, 67, 47, 0.09);
}

/* Top */
.stat-top {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  border-radius: 11px;
  background: #eaf8ef;
  color: #18884e;
}

.stat-icon svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.stat-label {
  min-width: 0;
  color: #69766e;
  font-size: 12px;
  font-weight: 750;
  line-height: 1.4;
  word-break: break-word;
}

/* Value */
.stat-value {
  position: relative;
  z-index: 1;
  margin-top: 17px;
  color: #17231d;
  font-size: clamp(25px, 2.5vw, 32px);
  font-weight: 850;
  line-height: 1.1;
  letter-spacing: -0.035em;
  word-break: break-word;
}

/* Hint */
.stat-footer {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-top: 10px;
  color: #89938d;
  font-size: 11px;
  line-height: 1.5;
}

.stat-footer svg {
  width: 14px;
  height: 14px;
  flex: 0 0 auto;
  margin-top: 1px;
  fill: none;
  stroke: #5d9b76;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Responsive */
@media (max-width: 600px) {
  .stat-card {
    padding: 17px;
    border-radius: 15px;
  }

  .stat-icon {
    width: 35px;
    height: 35px;
  }

  .stat-value {
    margin-top: 14px;
    font-size: 26px;
  }
}

@media (max-width: 380px) {
  .stat-card {
    padding: 15px;
  }

  .stat-label {
    font-size: 11px;
  }

  .stat-value {
    font-size: 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stat-card {
    transition: none;
  }
}
</style>