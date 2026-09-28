<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authService } from '../../services/authService'

const route = useRoute()
const router = useRouter()
const form = reactive({ resetToken: route.query.token || (route.query.email ? `reset-${route.query.email}` : ''), password: '', confirmPassword: '' })
const error = ref('')
const loading = ref(false)

async function submit() {
  loading.value = true
  error.value = ''
  try {
    await authService.resetPassword({
      resetToken: form.resetToken,
      password: form.password,
      confirmPassword: form.confirmPassword,
    })
    router.push('/login')
  } catch (err) {
    error.value = err.message || 'Unable to reset password'
  } finally {
    loading.value = false
  }
}
</script>

```vue
<template>
  <section class="password-page">
    <div class="password-bg">
      <div class="bg-glow bg-glow-one"></div>
      <div class="bg-glow bg-glow-two"></div>
    </div>

    <div class="password-container">

      <!-- Left information -->
      <div class="password-intro">

        <div class="security-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <rect x="4" y="10" width="16" height="10" rx="2"></rect>
            <path d="M8 10V7a4 4 0 0 1 8 0v3"></path>
            <path d="M12 14v3"></path>
          </svg>
        </div>

        <span class="eyebrow">ACCOUNT SECURITY</span>

        <h1>Create a new password</h1>

        <p>
          Choose a strong password to keep your Basa Vara account
          protected and secure.
        </p>

        <div class="security-points">

          <div class="security-point">
            <span class="point-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="m5 12 4 4L19 6"></path>
              </svg>
            </span>
            <span>Use at least 8 characters</span>
          </div>

          <div class="security-point">
            <span class="point-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="m5 12 4 4L19 6"></path>
              </svg>
            </span>
            <span>Avoid easy-to-guess passwords</span>
          </div>

          <div class="security-point">
            <span class="point-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="m5 12 4 4L19 6"></path>
              </svg>
            </span>
            <span>Don't reuse an old password</span>
          </div>

        </div>
      </div>

      <!-- Password card -->
      <div class="password-card">

        <div class="card-header">
          <div>
            <h2>Set your password</h2>
            <p>Enter your new password below.</p>
          </div>

          <div class="lock-badge">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <rect x="5" y="10" width="14" height="10" rx="2"></rect>
              <path d="M8 10V7a4 4 0 0 1 8 0v3"></path>
            </svg>
          </div>
        </div>

        <form class="password-form" @submit.prevent="submit">

          <!-- New password -->
          <label class="field">
            <span class="field-label">
              New password
              <span>*</span>
            </span>

            <div class="input-wrap">
              <svg
                class="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <rect x="4" y="10" width="16" height="10" rx="2"></rect>
                <path d="M8 10V7a4 4 0 0 1 8 0v3"></path>
              </svg>

              <input
                v-model="form.password"
                class="control"
                type="password"
                placeholder="Enter new password"
                autocomplete="new-password"
              />
            </div>
          </label>

          <!-- Confirm password -->
          <label class="field">
            <span class="field-label">
              Confirm password
              <span>*</span>
            </span>

            <div class="input-wrap">
              <svg
                class="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path d="M12 3 4 6v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-3z"></path>
                <path d="m8.5 12 2.2 2.2 4.8-5"></path>
              </svg>

              <input
                v-model="form.confirmPassword"
                class="control"
                type="password"
                placeholder="Repeat new password"
                autocomplete="new-password"
              />
            </div>
          </label>

          <!-- Password hint -->
          <div class="password-hint">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <circle cx="12" cy="12" r="9"></circle>
              <path d="M12 11v5"></path>
              <path d="M12 8h.01"></path>
            </svg>

            <span>
              Make sure both passwords match before continuing.
            </span>
          </div>

          <!-- Error -->
          <div v-if="error" class="error-box">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="9"></circle>
              <path d="M12 8v5"></path>
              <path d="M12 16h.01"></path>
            </svg>

            <span>{{ error }}</span>
          </div>

          <!-- Submit -->
          <button
            class="btn btn-primary password-btn"
            type="submit"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner"></span>

            <span>
              {{ loading ? 'Updating password...' : 'Update password' }}
            </span>

            <svg
              v-if="!loading"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M5 12h14"></path>
              <path d="m13 6 6 6-6 6"></path>
            </svg>
          </button>

        </form>

        <div class="security-footer">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>

          <span>Your password is handled securely.</span>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* =========================
   PAGE
========================= */

.password-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  background:
    radial-gradient(
      circle at 10% 10%,
      rgba(16, 185, 129, 0.11),
      transparent 30%
    ),
    radial-gradient(
      circle at 90% 90%,
      rgba(5, 150, 105, 0.08),
      transparent 30%
    ),
    #f7faf9;
}

.password-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-glow {
  position: absolute;

  width: 360px;
  height: 360px;

  border-radius: 50%;
  filter: blur(75px);

  opacity: 0.3;
}

.bg-glow-one {
  top: -180px;
  left: -120px;
  background: rgba(16, 185, 129, 0.16);
}

.bg-glow-two {
  right: -160px;
  bottom: -190px;
  background: rgba(5, 150, 105, 0.13);
}

/* =========================
   CONTAINER
========================= */

.password-container {
  position: relative;
  z-index: 1;

  width: min(1060px, calc(100% - 40px));
  min-height: 100vh;

  margin: 0 auto;
  padding: 60px 0;

  display: grid;
  grid-template-columns: minmax(300px, 0.85fr) minmax(430px, 1.15fr);

  align-items: center;
  gap: 80px;

  box-sizing: border-box;
}

/* =========================
   INTRO
========================= */

.password-intro {
  max-width: 440px;
}

.security-icon {
  display: grid;
  place-items: center;

  width: 54px;
  height: 54px;
  margin-bottom: 18px;

  border: 1px solid rgba(5, 150, 105, 0.18);
  border-radius: 16px;

  color: #059669;
  background: rgba(255, 255, 255, 0.82);

  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
}

.security-icon svg {
  width: 28px;
  height: 28px;
}

.eyebrow {
  display: block;

  margin-bottom: 9px;

  color: #059669;

  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
}

.password-intro h1 {
  margin: 0;

  color: #17211d;

  font-size: clamp(36px, 4vw, 53px);
  line-height: 1.05;
  letter-spacing: -0.045em;
}

.password-intro > p {
  max-width: 420px;

  margin: 18px 0 0;

  color: #64748b;

  font-size: 15px;
  line-height: 1.75;
}

/* =========================
   SECURITY POINTS
========================= */

.security-points {
  display: grid;
  gap: 13px;

  margin-top: 30px;
}

.security-point {
  display: flex;
  align-items: center;
  gap: 11px;

  color: #475569;
  font-size: 13px;
}

.point-icon {
  display: grid;
  place-items: center;

  width: 28px;
  height: 28px;
  flex-shrink: 0;

  border-radius: 9px;

  color: #059669;
  background: #eaf8f3;
}

.point-icon svg {
  width: 15px;
  height: 15px;
}

/* =========================
   CARD
========================= */

.password-card {
  width: 100%;
  box-sizing: border-box;

  padding: 34px;

  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 24px;

  background: rgba(255, 255, 255, 0.95);

  box-shadow:
    0 25px 70px rgba(15, 23, 42, 0.08),
    0 4px 12px rgba(15, 23, 42, 0.025);

  backdrop-filter: blur(16px);
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 20px;
  margin-bottom: 24px;
}

.card-header h2 {
  margin: 0;

  color: #17211d;

  font-size: 23px;
  letter-spacing: -0.025em;
}

.card-header p {
  margin: 6px 0 0;

  color: #64748b;
  font-size: 13px;
}

.lock-badge {
  display: grid;
  place-items: center;

  width: 40px;
  height: 40px;
  flex-shrink: 0;

  border-radius: 12px;

  color: #059669;
  background: #eaf8f3;
}

.lock-badge svg {
  width: 20px;
  height: 20px;
}

/* =========================
   FORM
========================= */

.password-form {
  display: grid;
  gap: 16px;
}

.field {
  display: grid;
  gap: 7px;
}

.field-label {
  display: flex;
  gap: 3px;

  color: #334155;

  font-size: 12px;
  font-weight: 700;
}

.field-label > span {
  color: #059669;
}

.input-wrap {
  position: relative;
}

.input-wrap .control {
  width: 100%;
  min-height: 47px;

  padding-left: 44px;

  box-sizing: border-box;
}

.input-icon {
  position: absolute;

  top: 50%;
  left: 14px;

  width: 18px;
  height: 18px;

  color: #94a3b8;

  transform: translateY(-50%);
  pointer-events: none;
}

/* =========================
   HINT
========================= */

.password-hint {
  display: flex;
  align-items: flex-start;
  gap: 8px;

  padding: 11px 12px;

  border-radius: 11px;

  color: #64748b;
  background: #f8fafc;

  font-size: 11px;
  line-height: 1.5;
}

.password-hint svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  margin-top: 1px;

  color: #059669;
}

/* =========================
   ERROR
========================= */

.error-box {
  display: flex;
  align-items: flex-start;
  gap: 9px;

  padding: 11px 13px;

  border: 1px solid #fecaca;
  border-radius: 11px;

  color: #b91c1c;
  background: #fff7f7;

  font-size: 12px;
  line-height: 1.5;
}

.error-box svg {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
}

/* =========================
   BUTTON
========================= */

.password-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;

  width: 100%;
  min-height: 48px;
  margin-top: 2px;

  border-radius: 12px;

  font-weight: 750;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.password-btn:hover:not(:disabled) {
  transform: translateY(-1px);

  box-shadow:
    0 9px 22px rgba(5, 150, 105, 0.18);
}

.password-btn svg {
  width: 17px;
  height: 17px;
}

.password-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.spinner {
  width: 15px;
  height: 15px;

  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: #fff;
  border-radius: 50%;

  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* =========================
   FOOTER
========================= */

.security-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  margin-top: 22px;
  padding-top: 18px;

  border-top: 1px solid #eef2f1;

  color: #94a3b8;
  font-size: 11px;
}

.security-footer svg {
  width: 15px;
  height: 15px;

  color: #059669;
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 950px) {
  .password-container {
    grid-template-columns: 1fr;

    width: min(620px, calc(100% - 40px));

    gap: 30px;

    padding-top: 40px;
    padding-bottom: 40px;
  }

  .password-intro {
    max-width: 620px;
    text-align: center;
  }

  .security-icon {
    margin-left: auto;
    margin-right: auto;
  }

  .password-intro > p {
    margin-left: auto;
    margin-right: auto;
  }

  .security-points {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 620px) {
  .password-container {
    width: min(100% - 24px, 560px);

    padding-top: 24px;
    padding-bottom: 24px;
  }

  .password-intro h1 {
    font-size: 35px;
  }

  .password-intro > p {
    font-size: 13px;
  }

  .security-points {
    display: none;
  }

  .password-card {
    padding: 23px 18px;
    border-radius: 19px;
  }

  .card-header {
    margin-bottom: 20px;
  }
}

@media (max-width: 390px) {
  .password-container {
    width: calc(100% - 16px);
  }

  .password-card {
    padding: 20px 14px;
  }

  .password-intro h1 {
    font-size: 31px;
  }

  .card-header h2 {
    font-size: 20px;
  }
}

/* =========================
   REDUCED MOTION
========================= */

@media (prefers-reduced-motion: reduce) {
  .password-page *,
  .password-page *::before,
  .password-page *::after {
    transition: none !important;
    animation: none !important;
  }
}
</style>