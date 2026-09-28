```vue
<template>
  <div class="page settings-page">
    <!-- Header -->
    <header class="settings-header">
      <div class="header-copy">
        <span class="eyebrow">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Zm8.15 2.25a8.42 8.42 0 0 0-.72-1.73l1.04-1.3-1.94-1.94-1.3 1.04a8.42 8.42 0 0 0-1.73-.72L15.3 4h-2.74l-.27 1.85a8.42 8.42 0 0 0-1.73.72l-1.3-1.04-1.94 1.94 1.04 1.3a8.42 8.42 0 0 0-.72 1.73L5.8 10.8v2.74l1.85.27c.18.61.42 1.19.72 1.73l-1.04 1.3 1.94 1.94 1.3-1.04c.54.3 1.12.54 1.73.72l.27 1.85h2.74l.27-1.85a8.42 8.42 0 0 0 1.73-.72l1.3 1.04 1.94-1.94-1.04-1.3c.3-.54.54-1.12.72-1.73l1.85-.27V10.8l-1.85-.3Zm-8.15 6.75A5.25 5.25 0 1 1 12 6.75a5.25 5.25 0 0 1 0 10.5Z"
            />
          </svg>
          Preferences
        </span>

        <h1>Settings</h1>

        <p class="subtitle">
          Manage your notification preferences and account experience.
        </p>
      </div>

      <div class="settings-badge">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2.75a9.25 9.25 0 1 0 9.25 9.25A9.26 9.26 0 0 0 12 2.75Zm0 4a1.15 1.15 0 1 1-1.15 1.15A1.15 1.15 0 0 1 12 6.75Zm1.1 10.5h-2.2v-6h2.2v6Z"
          />
        </svg>
        Account preferences
      </div>
    </header>

    <!-- Settings Card -->
    <section class="settings-card">
      <div class="card-header">
        <div>
          <span class="section-label">Notifications</span>
          <h2>Communication preferences</h2>
          <p>
            Choose how you would like to receive important updates.
          </p>
        </div>

        <div class="header-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M18 9.5a6 6 0 0 0-12 0c0 7-2.5 7-2.5 8.5h17C20.5 16.5 18 16.5 18 9.5ZM9.75 20h4.5"
            />
          </svg>
        </div>
      </div>

      <div class="settings-options">
        <!-- Email -->
        <label class="setting-item">
          <div class="setting-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4.5 5.25h15A2.25 2.25 0 0 1 21.75 7.5v9A2.25 2.25 0 0 1 19.5 18.75h-15a2.25 2.25 0 0 1-2.25-2.25v-9A2.25 2.25 0 0 1 4.5 5.25Zm0 2.25v.45L12 12.5l7.5-4.55V7.5h-15Zm15 9v-6.08l-7.5 4.55-7.5-4.55v6.08h15Z"
              />
            </svg>
          </div>

          <div class="setting-copy">
            <strong>Email notifications</strong>
            <span>
              Receive important account and rental updates by email.
            </span>
          </div>

          <input
            class="control"
            type="checkbox"
            checked
          />
        </label>

        <!-- SMS -->
        <label class="setting-item">
          <div class="setting-icon sms-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 3.75h12A2.25 2.25 0 0 1 20.25 6v9A2.25 2.25 0 0 1 18 17.25h-3.6L12 20l-2.4-2.75H6A2.25 2.25 0 0 1 3.75 15V6A2.25 2.25 0 0 1 6 3.75Zm0 1.5A.75.75 0 0 0 5.25 6v9c0 .41.34.75.75.75h4.28L12 17.98l1.72-2.23H18a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75H6Zm1.5 3h9v1.5h-9v-1.5Zm0 3h6v1.5h-6v-1.5Z"
              />
            </svg>
          </div>

          <div class="setting-copy">
            <strong>SMS notifications</strong>
            <span>
              Get selected updates and alerts directly on your phone.
            </span>
          </div>

          <input
            class="control"
            type="checkbox"
          />
        </label>
      </div>

      <div class="card-footer">
        <div class="save-note">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2.75a9.25 9.25 0 1 0 9.25 9.25A9.26 9.26 0 0 0 12 2.75Zm0 4a1.15 1.15 0 1 1-1.15 1.15A1.15 1.15 0 0 1 12 6.75Zm1.1 10.5h-2.2v-6h2.2v6Z"
            />
          </svg>
          <span>Your notification preferences can be updated anytime.</span>
        </div>

        <button class="btn btn-primary save-button" type="button">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5.25 4.5h11.4L19.5 7.35v12.9H4.5V4.5h.75Zm1.5 1.5v4.5h7.5V6h-7.5Zm0 7.5v5.25h10.5V13.5H6.75Z"
            />
          </svg>
          Save changes
        </button>
      </div>
    </section>

    <!-- Security Note -->
    <div class="security-note">
      <div class="security-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2.75 19 5.5v5.8c0 4.7-2.9 8.1-7 9.95-4.1-1.85-7-5.25-7-9.95V5.5l7-2.75Zm0 3.1L7 7.82v3.48c0 3.55 1.98 6.2 5 7.83 3.02-1.63 5-4.28 5-7.83V7.82l-5-1.97Z"
          />
        </svg>
      </div>

      <div>
        <strong>Keep your account preferences up to date</strong>
        <p>
          Notification settings help you control how Basa Vara communicates
          with you.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-page {
  min-height: 100%;
  box-sizing: border-box;
  padding: clamp(22px, 3vw, 42px);
  background:
    radial-gradient(
      circle at 94% 0%,
      rgba(24, 148, 103, 0.08),
      transparent 30%
    ),
    radial-gradient(
      circle at 0% 100%,
      rgba(24, 148, 103, 0.05),
      transparent 28%
    ),
    #f6f8f7;
}

/* Header */
.settings-header {
  width: min(100%, 1000px);
  margin: 0 auto 24px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.header-copy {
  min-width: 0;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 9px;
  color: #17845f;
  font-size: 0.73rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.eyebrow svg {
  width: 15px;
  height: 15px;
  fill: currentColor;
}

.settings-header h1 {
  margin: 0;
  color: #17231e;
  font-size: clamp(1.8rem, 3vw, 2.45rem);
  line-height: 1.1;
  font-weight: 820;
  letter-spacing: -0.04em;
}

.subtitle {
  margin: 9px 0 0;
  color: #6c7772;
  font-size: 0.95rem;
  line-height: 1.6;
}

.settings-badge {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid rgba(23, 132, 95, 0.13);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.86);
  color: #176f53;
  font-size: 0.81rem;
  font-weight: 750;
  box-shadow: 0 5px 18px rgba(26, 48, 39, 0.045);
  white-space: nowrap;
}

.settings-badge svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

/* Main Card */
.settings-card {
  width: min(100%, 1000px);
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid rgba(22, 37, 31, 0.07);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow:
    0 18px 50px rgba(24, 42, 35, 0.055),
    0 2px 8px rgba(24, 42, 35, 0.025);
}

/* Card Header */
.card-header {
  padding: 22px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  border-bottom: 1px solid #edf1ef;
  background: linear-gradient(
    180deg,
    rgba(249, 252, 250, 0.96),
    rgba(255, 255, 255, 0.96)
  );
}

.section-label {
  display: block;
  margin-bottom: 4px;
  color: #17845f;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.card-header h2 {
  margin: 0;
  color: #1d2a24;
  font-size: 1.08rem;
  font-weight: 780;
}

.card-header p {
  margin: 5px 0 0;
  color: #78837e;
  font-size: 0.82rem;
  line-height: 1.5;
}

.header-icon {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: grid;
  place-items: center;
  border-radius: 13px;
  background: rgba(23, 132, 95, 0.09);
  color: #17845f;
}

.header-icon svg {
  width: 21px;
  height: 21px;
  fill: currentColor;
}

/* Options */
.settings-options {
  padding: 8px 24px;
}

.setting-item {
  min-width: 0;
  padding: 20px 0;
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) auto;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  border-bottom: 1px solid #edf1ef;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: rgba(23, 132, 95, 0.08);
  color: #17845f;
}

.setting-icon svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.sms-icon {
  color: #4773b6;
  background: rgba(71, 115, 182, 0.09);
}

.setting-copy {
  min-width: 0;
}

.setting-copy strong {
  display: block;
  margin-bottom: 4px;
  color: #293630;
  font-size: 0.9rem;
  font-weight: 760;
}

.setting-copy span {
  display: block;
  color: #7b8580;
  font-size: 0.78rem;
  line-height: 1.5;
}

/* Checkbox */
.control {
  appearance: none;
  width: 44px;
  height: 24px;
  position: relative;
  margin: 0;
  flex: 0 0 auto;
  border: 0;
  border-radius: 999px;
  background: #d9dfdc;
  cursor: pointer;
  transition:
    background 180ms ease,
    box-shadow 180ms ease;
}

.control::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.14);
  transition: transform 180ms ease;
}

.control:checked {
  background: #17845f;
  box-shadow: 0 0 0 4px rgba(23, 132, 95, 0.08);
}

.control:checked::after {
  transform: translateX(20px);
}

.control:focus-visible {
  outline: 3px solid rgba(23, 132, 95, 0.2);
  outline-offset: 3px;
}

/* Footer */
.card-footer {
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  border-top: 1px solid #edf1ef;
  background: #fbfcfc;
}

.save-note {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #7a857f;
  font-size: 0.75rem;
  line-height: 1.45;
}

.save-note svg {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  fill: #17845f;
}

.save-button {
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 17px;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
}

.save-button svg {
  width: 17px;
  height: 17px;
  fill: currentColor;
}

/* Security Note */
.security-note {
  width: min(100%, 1000px);
  margin: 16px auto 0;
  box-sizing: border-box;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 11px;
  border: 1px solid rgba(23, 132, 95, 0.1);
  border-radius: 14px;
  background: rgba(23, 132, 95, 0.045);
}

.security-icon {
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: rgba(23, 132, 95, 0.09);
  color: #17845f;
}

.security-icon svg {
  width: 17px;
  height: 17px;
  fill: currentColor;
}

.security-note strong {
  display: block;
  margin-bottom: 3px;
  color: #33433b;
  font-size: 0.78rem;
}

.security-note p {
  margin: 0;
  color: #718078;
  font-size: 0.74rem;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 800px) {
  .settings-page {
    padding: 24px 18px;
  }

  .settings-header {
    display: grid;
    gap: 14px;
  }

  .settings-badge {
    justify-self: start;
  }
}

@media (max-width: 600px) {
  .settings-page {
    padding: 18px 14px 28px;
  }

  .settings-card {
    border-radius: 17px;
  }

  .card-header {
    padding: 18px;
  }

  .settings-options {
    padding: 6px 18px;
  }

  .card-footer {
    padding: 16px 18px;
    align-items: stretch;
    flex-direction: column;
  }

  .save-button {
    width: 100%;
  }

  .security-note {
    align-items: flex-start;
  }
}

@media (max-width: 430px) {
  .settings-page {
    padding: 14px 10px 22px;
  }

  .settings-header h1 {
    font-size: 1.7rem;
  }

  .subtitle {
    font-size: 0.88rem;
  }

  .setting-item {
    grid-template-columns: 38px minmax(0, 1fr) auto;
    gap: 11px;
    padding: 17px 0;
  }

  .setting-icon {
    width: 38px;
    height: 38px;
  }

  .setting-icon svg {
    width: 18px;
    height: 18px;
  }

  .setting-copy strong {
    font-size: 0.84rem;
  }

  .setting-copy span {
    font-size: 0.74rem;
  }

  .control {
    width: 40px;
    height: 23px;
  }

  .control::after {
    width: 17px;
    height: 17px;
  }

  .control:checked::after {
    transform: translateX(17px);
  }

  .security-note {
    padding: 13px;
  }
}

@media (max-width: 360px) {
  .setting-item {
    grid-template-columns: 1fr auto;
  }

  .setting-icon {
    display: none;
  }

  .card-header {
    align-items: flex-start;
  }

  .header-icon {
    width: 36px;
    height: 36px;
    flex-basis: 36px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .settings-page *,
  .settings-page *::before,
  .settings-page *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>