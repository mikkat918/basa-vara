<script setup>
import { reactive } from 'vue'

const settings = reactive({ maintenance: false, emailAlerts: true, reviewMode: 'Manual' })
</script>

```vue
<template>
  <div class="page">
    <!-- Page Header -->
    <header class="page-header">
      <div class="header-copy">
        <span class="eyebrow">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
            />
            <path
              d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.7 1.7-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-2.4v-.08a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.7-1.7.06-.06A1.7 1.7 0 0 0 8.46 15a1.7 1.7 0 0 0-1.56-1.03H6.82v-2.4h.08A1.7 1.7 0 0 0 8.46 10a1.7 1.7 0 0 0-.34-1.88l-.06-.06 1.7-1.7.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.03-1.56V5h2.4v.2a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.7 1.7-.06.06A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.56 1.03H21v2.4h-.04A1.7 1.7 0 0 0 19.4 15Z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linejoin="round"
            />
          </svg>
          System configuration
        </span>

        <h1>Admin settings</h1>

        <p class="muted">
          Manage platform-wide operational and review preferences.
        </p>
      </div>

      <div class="header-badge">
        <span class="status-dot"></span>
        Configuration
      </div>
    </header>

    <!-- Settings Card -->
    <section class="card panel">
      <div class="panel-header">
        <div>
          <span class="section-eyebrow">Platform controls</span>
          <h2>System settings</h2>
          <p class="muted">
            Configure how the platform behaves for users and administrators.
          </p>
        </div>

        <div class="settings-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
            />
            <path
              d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.7 1.7-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-2.4v-.08a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.7-1.7.06-.06A1.7 1.7 0 0 0 8.46 15a1.7 1.7 0 0 0-1.56-1.03H6.82v-2.4h.08A1.7 1.7 0 0 0 8.46 10a1.7 1.7 0 0 0-.34-1.88l-.06-.06 1.7-1.7.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.03-1.56V5h2.4v.2a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.7 1.7-.06.06A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.56 1.03H21v2.4h-.04A1.7 1.7 0 0 0 19.4 15Z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <div class="settings-list">
        <!-- Maintenance -->
        <label class="setting-row">
          <span class="setting-icon warning-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 3 3.8 19h16.4L12 3Z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
              <path
                d="M12 9v4M12 16.5v.01"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
          </span>

          <span class="setting-content">
            <strong>Maintenance mode</strong>
            <small>
              Temporarily restrict normal platform access while maintenance
              work is being performed.
            </small>
          </span>

          <span class="switch">
            <input
              v-model="settings.maintenance"
              type="checkbox"
            />
            <span class="slider"></span>
          </span>
        </label>

        <!-- Email Alerts -->
        <label class="setting-row">
          <span class="setting-icon email-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect
                x="3.5"
                y="5"
                width="17"
                height="14"
                rx="2"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
              />
              <path
                d="m4.5 7 7.5 5.5L19.5 7"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          <span class="setting-content">
            <strong>Email alerts</strong>
            <small>
              Enable email notifications for important administrative events
              and platform activity.
            </small>
          </span>

          <span class="switch">
            <input
              v-model="settings.emailAlerts"
              type="checkbox"
            />
            <span class="slider"></span>
          </span>
        </label>

        <!-- Review Mode -->
        <div class="setting-row review-row">
          <span class="setting-icon review-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M5 5.5h14v13H5z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
              <path
                d="m8 12 2.3 2.3L16 8.7"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          <span class="setting-content">
            <strong>Review mode</strong>
            <small>
              Choose how submitted properties should be reviewed before
              becoming available.
            </small>
          </span>

          <div class="select-wrap">
            <select v-model="settings.reviewMode">
              <option>Manual</option>
              <option>Auto approve</option>
              <option>Hybrid</option>
            </select>

            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="m7 9 5 5 5-5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Current Configuration -->
      <div class="configuration-summary">
        <div class="summary-title">
          <span class="summary-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 3.5 19 6v5.2c0 4.3-2.9 7.8-7 9.3-4.1-1.5-7-5-7-9.3V6l7-2.5Z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
              <path
                d="m9 12 2 2 4-4"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          <div>
            <strong>Current configuration</strong>
            <span>Live values from your settings controls.</span>
          </div>
        </div>

        <div class="summary-items">
          <span
            :class="[
              'summary-pill',
              settings.maintenance
                ? 'pill-warning'
                : 'pill-success'
            ]"
          >
            <span class="pill-dot"></span>
            Maintenance:
            {{ settings.maintenance ? "On" : "Off" }}
          </span>

          <span
            :class="[
              'summary-pill',
              settings.emailAlerts
                ? 'pill-success'
                : 'pill-muted'
            ]"
          >
            <span class="pill-dot"></span>
            Email alerts:
            {{ settings.emailAlerts ? "On" : "Off" }}
          </span>

          <span class="summary-pill pill-neutral">
            Review:
            {{ settings.reviewMode }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: clamp(22px, 3vw, 42px);
  background:
    radial-gradient(
      circle at 88% 4%,
      rgba(16, 185, 129, 0.08),
      transparent 28%
    ),
    radial-gradient(
      circle at 8% 92%,
      rgba(20, 184, 166, 0.06),
      transparent 30%
    ),
    #f6f8f7;
  color: #17221d;
}

/* =========================
   Page Header
========================= */

.page-header {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.header-copy {
  min-width: 0;
}

.eyebrow,
.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #17845f;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.eyebrow svg {
  width: 15px;
  height: 15px;
}

.page h1 {
  margin: 7px 0;
  color: #17221d;
  font-size: clamp(27px, 3vw, 38px);
  line-height: 1.1;
  letter-spacing: -0.035em;
  font-weight: 800;
}

.muted {
  color: #718078;
  line-height: 1.55;
}

.page-header .muted {
  margin: 0;
  font-size: 14px;
}

.header-badge {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid #d8e8e0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  color: #28785b;
  font-size: 13px;
  font-weight: 750;
  box-shadow: 0 5px 18px rgba(23, 53, 42, 0.05);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #20a36f;
  box-shadow: 0 0 0 4px rgba(32, 163, 111, 0.1);
}

/* =========================
   Main Card
========================= */

.card {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #e4ebe7;
  border-radius: 20px;
  box-shadow:
    0 16px 45px rgba(28, 53, 43, 0.055),
    0 3px 10px rgba(28, 53, 43, 0.035);
}

.panel {
  overflow: hidden;
}

/* =========================
   Panel Header
========================= */

.panel-header {
  min-height: 108px;
  padding: 23px 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid #edf1ef;
}

.panel-header h2 {
  margin: 5px 0 4px;
  color: #1b2821;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.panel-header .muted {
  margin: 0;
  font-size: 13px;
}

.settings-icon {
  width: 48px;
  height: 48px;
  flex: 0 0 48px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: #edf8f3;
  color: #16805c;
  border: 1px solid #dceee6;
}

.settings-icon svg {
  width: 25px;
  height: 25px;
}

/* =========================
   Settings List
========================= */

.settings-list {
  padding: 8px 26px 0;
}

.setting-row {
  min-height: 92px;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 18px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #edf1ef;
  cursor: pointer;
}

.setting-row:last-child {
  border-bottom: none;
}

.setting-icon {
  width: 43px;
  height: 43px;
  flex: 0 0 43px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  border: 1px solid #dceee6;
  background: #eff9f4;
  color: #16805c;
}

.setting-icon svg {
  width: 21px;
  height: 21px;
}

.warning-icon {
  color: #9a6a13;
  background: #fff8e7;
  border-color: #f3e4bd;
}

.email-icon {
  color: #197b60;
  background: #edf8f4;
}

.review-icon {
  color: #506d61;
  background: #f2f6f4;
  border-color: #e1e9e5;
}

.setting-content {
  min-width: 0;
  flex: 1;
}

.setting-content strong {
  display: block;
  color: #27342e;
  font-size: 14px;
  font-weight: 800;
  line-height: 1.35;
}

.setting-content small {
  display: block;
  max-width: 620px;
  margin-top: 4px;
  color: #7b8982;
  font-size: 12px;
  line-height: 1.5;
}

/* =========================
   Toggle Switch
========================= */

.switch {
  position: relative;
  flex: 0 0 auto;
  width: 48px;
  height: 27px;
}

.switch input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}

.slider {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: #d8e1dc;
  border: 1px solid #cbd7d0;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.slider::before {
  content: "";
  position: absolute;
  width: 21px;
  height: 21px;
  top: 2px;
  left: 2px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 5px rgba(20, 45, 34, 0.15);
  transition: transform 0.2s ease;
}

.switch input:checked + .slider {
  background: #1a9a6b;
  border-color: #1a9a6b;
}

.switch input:checked + .slider::before {
  transform: translateX(21px);
}

.switch input:focus-visible + .slider,
.select-wrap select:focus-visible {
  outline: 3px solid rgba(26, 154, 107, 0.18);
  outline-offset: 2px;
}

/* =========================
   Select
========================= */

.select-wrap {
  position: relative;
  flex: 0 0 auto;
  width: 165px;
}

.select-wrap select {
  width: 100%;
  height: 42px;
  appearance: none;
  padding: 0 38px 0 13px;
  border: 1px solid #dce5e0;
  border-radius: 11px;
  background: #fbfcfc;
  color: #33433b;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.select-wrap select:hover {
  border-color: #b9d9ca;
  background: #fff;
}

.select-wrap select:focus {
  border-color: #55ad87;
  box-shadow: 0 0 0 3px rgba(26, 154, 107, 0.09);
  outline: none;
}

.select-wrap > svg {
  position: absolute;
  top: 50%;
  right: 12px;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #728178;
}

/* =========================
   Configuration Summary
========================= */

.configuration-summary {
  margin: 8px 26px 26px;
  padding: 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  border: 1px solid #e2eee8;
  border-radius: 15px;
  background: #f7fbf9;
}

.summary-title {
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
}

.summary-icon {
  width: 35px;
  height: 35px;
  flex: 0 0 35px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: #e6f5ee;
  color: #18805c;
}

.summary-icon svg {
  width: 19px;
  height: 19px;
}

.summary-title strong {
  display: block;
  color: #304038;
  font-size: 12px;
  font-weight: 800;
}

.summary-title span:not(.summary-icon) {
  display: block;
  margin-top: 2px;
  color: #819088;
  font-size: 10px;
}

.summary-items {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 7px;
}

.summary-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 9px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 750;
  white-space: nowrap;
}

.pill-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.pill-success {
  color: #177653;
  background: #eaf8f1;
  border: 1px solid #d6eee2;
}

.pill-warning {
  color: #976713;
  background: #fff7e4;
  border: 1px solid #f1e2bd;
}

.pill-muted {
  color: #727f78;
  background: #f0f3f1;
  border: 1px solid #e0e6e2;
}

.pill-neutral {
  color: #52675d;
  background: #edf2ef;
  border: 1px solid #dce5e0;
}

/* =========================
   Responsive
========================= */

@media (max-width: 800px) {
  .page {
    padding: 22px 18px;
  }

  .page-header {
    align-items: flex-start;
  }

  .panel-header {
    padding: 20px;
  }

  .settings-list {
    padding-left: 20px;
    padding-right: 20px;
  }

  .configuration-summary {
    margin-left: 20px;
    margin-right: 20px;
  }
}

@media (max-width: 650px) {
  .page {
    padding: 18px 14px;
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 18px;
  }

  .header-badge {
    align-self: flex-start;
  }

  .page h1 {
    font-size: 27px;
  }

  .panel-header {
    min-height: auto;
  }

  .settings-icon {
    display: none;
  }

  .setting-row {
    align-items: flex-start;
  }

  .setting-content {
    padding-top: 2px;
  }

  .configuration-summary {
    align-items: flex-start;
    flex-direction: column;
  }

  .summary-items {
    justify-content: flex-start;
  }
}

@media (max-width: 480px) {
  .panel-header {
    padding: 19px 16px;
  }

  .settings-list {
    padding: 4px 16px 0;
  }

  .setting-row {
    gap: 11px;
    padding: 16px 0;
  }

  .setting-icon {
    width: 38px;
    height: 38px;
    flex-basis: 38px;
  }

  .setting-icon svg {
    width: 19px;
    height: 19px;
  }

  .setting-content strong {
    font-size: 13px;
  }

  .setting-content small {
    font-size: 11px;
  }

  .switch {
    width: 44px;
    height: 25px;
  }

  .slider::before {
    width: 19px;
    height: 19px;
  }

  .switch input:checked + .slider::before {
    transform: translateX(19px);
  }

  .select-wrap {
    width: 135px;
  }

  .select-wrap select {
    height: 40px;
    font-size: 12px;
  }

  .review-row {
    flex-wrap: wrap;
  }

  .review-row .select-wrap {
    width: 100%;
    margin-left: 49px;
  }

  .configuration-summary {
    margin: 8px 16px 16px;
    padding: 14px;
  }

  .summary-items {
    width: 100%;
  }
}

@media (max-width: 370px) {
  .review-row .select-wrap {
    margin-left: 0;
  }

  .setting-content small {
    font-size: 10.5px;
  }

  .summary-pill {
    font-size: 9px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .slider,
  .slider::before,
  .select-wrap select {
    transition: none;
  }
}
</style>
