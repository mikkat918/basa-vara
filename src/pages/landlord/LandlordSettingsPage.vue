<script setup>
import { reactive } from 'vue'

const settings = reactive({ notifications: true, autoReply: true, theme: 'Light' })
</script>

```vue
<template>
  <div class="page">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <span class="eyebrow">Account preferences</span>
        <h1>Settings</h1>
        <p class="subtitle">
          Customize notifications, replies, and appearance preferences.
        </p>
      </div>

      <div class="settings-badge">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 3.8a2 2 0 0 1 2 2v.3a6.8 6.8 0 0 1 1.8 1l.3-.2a2 2 0 1 1 2 3.4l-.3.2a7 7 0 0 1 0 2.1l.3.2a2 2 0 1 1-2 3.4l-.3-.2a6.8 6.8 0 0 1-1.8 1v.3a2 2 0 1 1-4 0v-.3a6.8 6.8 0 0 1-1.8-1l-.3.2a2 2 0 1 1-2-3.4l.3-.2a7 7 0 0 1 0-2.1l-.3-.2a2 2 0 1 1 2-3.4l.3.2a6.8 6.8 0 0 1 1.8-1v-.3a2 2 0 0 1 2-2Z"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
          <circle
            cx="12"
            cy="12"
            r="2.7"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          />
        </svg>
        <span>Preferences</span>
      </div>
    </div>

    <!-- Settings Card -->
    <div class="card panel">
      <div class="panel-header">
        <div class="title-group">
          <div class="title-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 3.8a2 2 0 0 1 2 2v.3a6.8 6.8 0 0 1 1.8 1l.3-.2a2 2 0 1 1 2 3.4l-.3.2a7 7 0 0 1 0 2.1l.3.2a2 2 0 1 1-2 3.4l-.3-.2a6.8 6.8 0 0 1-1.8 1v.3a2 2 0 1 1-4 0v-.3a6.8 6.8 0 0 1-1.8-1l-.3.2a2 2 0 1 1-2-3.4l.3-.2a7 7 0 0 1 0-2.1l-.3-.2a2 2 0 1 1 2-3.4l.3.2a6.8 6.8 0 0 1 1.8-1v-.3a2 2 0 0 1 2-2Z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="2.7"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
          </div>

          <div>
            <span class="section-eyebrow">Preferences</span>
            <h2>Application settings</h2>
          </div>
        </div>
      </div>

      <div class="settings-list">
        <!-- Email Notifications -->
        <label class="setting-row">
          <div class="setting-icon">
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
                d="m5.5 7 6.5 5 6.5-5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div class="setting-content">
            <strong>Email notifications</strong>
            <span>
              Receive important account and inquiry updates by email.
            </span>
          </div>

          <span class="switch">
            <input
              v-model="settings.notifications"
              type="checkbox"
            />
            <span class="slider"></span>
          </span>
        </label>

        <!-- Auto Reply -->
        <label class="setting-row">
          <div class="setting-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M5 5.5A2.5 2.5 0 0 1 7.5 3h9A2.5 2.5 0 0 1 19 5.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-5 4v-4.5A2.5 2.5 0 0 1 5 12.5Z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
              <path
                d="M9 8h6M9 11h4"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <div class="setting-content">
            <strong>Auto reply for inquiries</strong>
            <span>
              Automatically respond to new property inquiries.
            </span>
          </div>

          <span class="switch">
            <input
              v-model="settings.autoReply"
              type="checkbox"
            />
            <span class="slider"></span>
          </span>
        </label>

        <!-- Theme -->
        <div class="setting-row theme-row">
          <div class="setting-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M20 14.2A8.5 8.5 0 0 1 9.8 4a8.5 8.5 0 1 0 10.2 10.2Z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div class="setting-content">
            <strong>Theme</strong>
            <span>
              Choose how the application should appear.
            </span>
          </div>

          <div class="theme-control">
            <select v-model="settings.theme" aria-label="Theme">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>

            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="m7 10 5 5 5-5"
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

      <!-- Information Note -->
      <div class="settings-note">
        <div class="note-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle
              cx="12"
              cy="12"
              r="8.5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
            />
            <path
              d="M12 10.5v5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
            />
            <circle cx="12" cy="7.5" r="1" fill="currentColor" />
          </svg>
        </div>

        <span>
          Your preferences are applied to your account experience.
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: clamp(20px, 3vw, 40px);
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
   Header
========================= */

.page-header {
  width: 100%;
  max-width: 920px;
  margin: 0 auto 18px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.eyebrow {
  display: block;
  margin-bottom: 5px;
  color: #17845f;
  font-size: 10px;
  font-weight: 850;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.page-header h1 {
  margin: 0;
  color: #17221d;
  font-size: clamp(26px, 3vw, 35px);
  line-height: 1.1;
  font-weight: 850;
  letter-spacing: -0.04em;
}

.subtitle {
  margin: 7px 0 0;
  color: #7b8881;
  font-size: 12px;
  line-height: 1.5;
}

.settings-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border: 1px solid #dceae3;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.84);
  color: #557066;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}

.settings-badge svg {
  width: 17px;
  height: 17px;
  color: #17845f;
}

/* =========================
   Card
========================= */

.card {
  background: rgba(255, 255, 255, 0.97);
  border: 1px solid #e4ebe7;
  border-radius: 20px;
  box-shadow:
    0 16px 45px rgba(28, 53, 43, 0.055),
    0 3px 10px rgba(28, 53, 43, 0.035);
}

.panel {
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  padding: clamp(20px, 3vw, 30px);
  box-sizing: border-box;
}

/* =========================
   Panel Header
========================= */

.panel-header {
  padding-bottom: 20px;
  border-bottom: 1px solid #e9efec;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-icon {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #edf8f3;
  border: 1px solid #dceee6;
  color: #16805c;
}

.title-icon svg {
  width: 21px;
  height: 21px;
}

.section-eyebrow {
  display: block;
  color: #17845f;
  font-size: 9px;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.title-group h2 {
  margin: 4px 0 0;
  color: #26352d;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.025em;
}

/* =========================
   Settings List
========================= */

.settings-list {
  display: grid;
}

.setting-row {
  min-width: 0;
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) auto;
  align-items: center;
  gap: 13px;
  padding: 19px 4px;
  border-bottom: 1px solid #edf1ef;
  cursor: pointer;
}

.setting-row:last-child {
  border-bottom: none;
}

.setting-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #f0f8f4;
  border: 1px solid #dfede6;
  color: #16805c;
}

.setting-icon svg {
  width: 19px;
  height: 19px;
}

.setting-content {
  min-width: 0;
}

.setting-content strong {
  display: block;
  color: #33423a;
  font-size: 12px;
  font-weight: 800;
}

.setting-content span {
  display: block;
  margin-top: 4px;
  color: #8a958f;
  font-size: 10px;
  line-height: 1.5;
}

/* =========================
   Toggle Switch
========================= */

.switch {
  position: relative;
  width: 44px;
  height: 24px;
  flex: 0 0 44px;
}

.switch input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: #d8e0dc;
  transition: 0.22s ease;
}

.slider::before {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  left: 3px;
  top: 3px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
  transition: 0.22s ease;
}

.switch input:checked + .slider {
  background: #16805c;
}

.switch input:checked + .slider::before {
  transform: translateX(20px);
}

.switch input:focus-visible + .slider {
  outline: 3px solid rgba(22, 128, 92, 0.18);
  outline-offset: 2px;
}

/* =========================
   Theme Select
========================= */

.theme-control {
  position: relative;
  width: 140px;
}

.theme-control select {
  width: 100%;
  appearance: none;
  box-sizing: border-box;
  padding: 10px 34px 10px 12px;
  border: 1px solid #dce6e1;
  border-radius: 10px;
  background: #fff;
  color: #34433b;
  font: inherit;
  font-size: 10px;
  font-weight: 750;
  cursor: pointer;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.theme-control select:hover {
  border-color: #bcd6ca;
}

.theme-control select:focus {
  border-color: #72b79a;
  box-shadow: 0 0 0 3px rgba(22, 128, 92, 0.1);
}

.theme-control > svg {
  position: absolute;
  top: 50%;
  right: 10px;
  width: 15px;
  height: 15px;
  color: #718079;
  pointer-events: none;
  transform: translateY(-50%);
}

/* =========================
   Note
========================= */

.settings-note {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 20px;
  padding: 11px 13px;
  border: 1px solid #e1eee8;
  border-radius: 12px;
  background: #f7fbf9;
  color: #728079;
  font-size: 10px;
  line-height: 1.45;
}

.note-icon {
  display: grid;
  place-items: center;
  flex: 0 0 15px;
}

.note-icon svg {
  width: 15px;
  height: 15px;
  color: #16805c;
}

/* =========================
   Responsive
========================= */

@media (max-width: 700px) {
  .page {
    padding: 22px 18px;
  }

  .settings-badge {
    display: none;
  }

  .panel {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .page {
    padding: 18px 14px;
  }

  .page-header h1 {
    font-size: 28px;
  }

  .panel {
    padding: 16px;
    border-radius: 17px;
  }

  .title-icon {
    width: 38px;
    height: 38px;
    flex-basis: 38px;
  }

  .title-group h2 {
    font-size: 16px;
  }

  .setting-row {
    grid-template-columns: 38px minmax(0, 1fr) auto;
    gap: 10px;
    padding: 16px 2px;
  }

  .setting-icon {
    width: 38px;
    height: 38px;
  }

  .setting-icon svg {
    width: 17px;
    height: 17px;
  }

  .setting-content strong {
    font-size: 11px;
  }

  .setting-content span {
    font-size: 9px;
  }

  .theme-control {
    width: 112px;
  }

  .theme-control select {
    font-size: 9px;
  }
}

@media (max-width: 380px) {
  .setting-row {
    grid-template-columns: 36px minmax(0, 1fr);
  }

  .switch,
  .theme-control {
    grid-column: 2;
    justify-self: start;
    margin-top: 3px;
  }

  .theme-row {
    align-items: start;
  }

  .theme-control {
    width: 125px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .slider,
  .slider::before,
  .theme-control select {
    transition: none;
  }
}
</style>