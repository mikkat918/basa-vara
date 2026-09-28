<script setup>
defineProps({
  title: String,
  values: { type: Array, default: () => [] },
})
const max = (vals) => Math.max(...vals, 1)
</script>

```vue
<template>
  <article class="analytics-card card">
    <div class="card-header">
      <div class="title-wrap">
        <div class="chart-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M5 19V10" />
            <path d="M12 19V5" />
            <path d="M19 19v-7" />
          </svg>
        </div>

        <div>
          <h3>{{ title }}</h3>
          <span>Weekly activity</span>
        </div>
      </div>

      <div class="period-badge">
        7 periods
      </div>
    </div>

    <div class="chart-area">
      <div class="chart-lines" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div class="bars" aria-hidden="true">
        <div
          v-for="(v, i) in values"
          :key="i"
          class="bar-column"
        >
          <span
            class="bar"
            :style="{ height: `${(v / max(values)) * 80}px` }"
          ></span>
        </div>
      </div>
    </div>

    <div class="card-footer">
      <span class="muted">Last 7 periods</span>

      <span class="trend">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m5 15 5-5 4 4 5-6" />
          <path d="M15 8h4v4" />
        </svg>
        Activity
      </span>
    </div>
  </article>
</template>

<style scoped>
.analytics-card {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 20px;
  overflow: hidden;
  border: 1px solid #e2e9e4;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 12px 34px rgba(31, 67, 47, 0.07);
}

/* Header */
.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
}

.title-wrap {
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
}

.chart-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: #eaf8ef;
  color: #18884e;
}

.chart-icon svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.title-wrap h3 {
  margin: 0;
  color: #1b2921;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.3;
}

.title-wrap span {
  display: block;
  margin-top: 3px;
  color: #8a948e;
  font-size: 11px;
}

/* Badge */
.period-badge {
  flex: 0 0 auto;
  padding: 6px 9px;
  border: 1px solid #e2ebe5;
  border-radius: 999px;
  background: #f7faf8;
  color: #65736b;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}

/* Chart */
.chart-area {
  position: relative;
  height: 108px;
  margin: 20px 0 12px;
  padding: 0 2px;
}

.chart-lines {
  position: absolute;
  inset: 0 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
}

.chart-lines span {
  width: 100%;
  border-top: 1px dashed #e8eeea;
}

.bars {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  gap: 7px;
  height: 90px;
  padding: 0 2px;
}

.bar-column {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex: 1;
  height: 90px;
  min-width: 0;
}

.bar {
  display: block;
  width: 100%;
  max-width: 24px;
  min-height: 4px;
  border-radius: 6px 6px 2px 2px;
  background: linear-gradient(
    to top,
    #17864c,
    #3bbd72
  );
  box-shadow: 0 5px 12px rgba(24, 134, 76, 0.16);
  transition:
    height 0.35s ease,
    transform 0.2s ease,
    opacity 0.2s ease;
}

.bar:hover {
  opacity: 0.82;
  transform: translateY(-2px);
}

/* Footer */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 13px;
  border-top: 1px solid #edf1ee;
}

.muted {
  margin: 0;
  color: #89928d;
  font-size: 11px;
}

.trend {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #218950;
  font-size: 11px;
  font-weight: 700;
}

.trend svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Responsive */
@media (max-width: 500px) {
  .analytics-card {
    padding: 16px;
    border-radius: 15px;
  }

  .chart-icon {
    width: 34px;
    height: 34px;
  }

  .title-wrap h3 {
    font-size: 14px;
  }

  .period-badge {
    padding: 5px 7px;
    font-size: 9px;
  }

  .bars {
    gap: 5px;
  }

  .bar {
    max-width: 20px;
  }
}

@media (max-width: 360px) {
  .card-footer {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }

  .period-badge {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .analytics-card *,
  .analytics-card *::before,
  .analytics-card *::after {
    animation: none !important;
    transition: none !important;
  }
}
</style>
