<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authService } from '../../services/authService'

const code = ref('')
const error = ref(''); const loading = ref(false); const router = useRouter(); const route = useRoute()
async function submit() { loading.value = true; error.value = ''; try { const result = await authService.verifyOtp({ email: route.query.email || '', otp: code.value }); router.push({ path: '/reset-password', query: { token: result.resetToken } }) } catch (err) { error.value = err.message || 'Unable to verify code' } finally { loading.value = false } }
</script>

```vue
<template>
  <div class="page auth-page">
    <!-- Decorative background -->
    <div class="bg-glow glow-one"></div>
    <div class="bg-glow glow-two"></div>

    <div class="auth-card">
      <!-- Icon -->
      <div class="otp-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="4" y="3" width="16" height="18" rx="3" />
          <path d="M8 7H16" />
          <path d="M8 11H8.01" />
          <path d="M12 11H12.01" />
          <path d="M16 11H16.01" />
          <path d="M8 15H8.01" />
          <path d="M12 15H12.01" />
          <path d="M16 15H16.01" />
        </svg>
      </div>

      <!-- Heading -->
      <div class="auth-heading">
        <span class="eyebrow">SECURITY CHECK</span>

        <h1>Verify your OTP</h1>

        <p>
          Enter the 6-digit verification code sent to your
          phone or email to continue.
        </p>
      </div>

      <!-- OTP Form -->
      <form class="otp-form" @submit.prevent="submit">
        <label class="otp-field">
          <span class="field-label">Verification code</span>

          <div class="otp-input-wrapper">
            <input
              v-model="code"
              class="otp-input"
              type="text"
              inputmode="numeric"
              autocomplete="one-time-code"
              maxlength="6"
              placeholder="000000"
              pattern="[0-9]{6}"
              required
              :disabled="loading"
              @input="code = code.replace(/\D/g, '').slice(0, 6)"
            />
          </div>

          <span class="input-hint">
            Enter all 6 digits
          </span>
        </label>

        <!-- Error -->
        <div
          v-if="error"
          class="message-error"
          role="alert"
        >
          <span class="error-icon">!</span>
          <span>{{ error }}</span>
        </div>

        <!-- Verify -->
        <button
          class="verify-button"
          type="submit"
          :disabled="loading || code.length !== 6"
        >
          <span v-if="loading" class="spinner"></span>

          <span>
            {{ loading ? 'Verifying...' : 'Verify code' }}
          </span>

          <svg
            v-if="!loading"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 12L10 17L19 7" />
          </svg>
        </button>
      </form>

      <!-- Security note -->
      <div class="security-note">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 3L20 6V11C20 16 16.7 19.7 12 21C7.3 19.7 4 16 4 11V6L12 3Z" />
          <path d="M9 12L11 14L15 10" />
        </svg>

        <span>Never share your verification code with anyone.</span>
      </div>

      <!-- Footer -->
      <div class="auth-footer">
        <span>Didn't receive the code?</span>
        <button
          type="button"
          class="resend-button"
          :disabled="loading"
        >
          Resend code
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  position: relative;
  isolation: isolate;

  display: grid;
  place-items: center;

  width: 100%;
  min-height: clamp(620px, 82vh, 900px);

  box-sizing: border-box;
  padding: 50px 20px;

  overflow: hidden;

  background:
    radial-gradient(
      circle at 10% 15%,
      rgba(16, 185, 129, 0.09),
      transparent 32%
    ),
    radial-gradient(
      circle at 90% 85%,
      rgba(59, 130, 246, 0.07),
      transparent 30%
    ),
    #f7faf9;
}

/* =========================
   BACKGROUND
========================= */

.bg-glow {
  position: absolute;
  z-index: -1;

  width: 260px;
  height: 260px;

  border-radius: 50%;

  filter: blur(80px);

  pointer-events: none;
}

.glow-one {
  top: -100px;
  left: -100px;

  background: rgba(16, 185, 129, 0.12);
}

.glow-two {
  right: -100px;
  bottom: -100px;

  background: rgba(59, 130, 246, 0.08);
}

/* =========================
   CARD
========================= */

.auth-card {
  width: min(460px, 100%);

  box-sizing: border-box;

  padding: 40px;

  border: 1px solid #e4ebe7;
  border-radius: 24px;

  background: rgba(255, 255, 255, 0.97);

  text-align: center;

  box-shadow:
    0 25px 70px rgba(15, 23, 42, 0.07),
    0 4px 12px rgba(15, 23, 42, 0.025);

  animation: card-enter 0.55s ease both;
}

/* =========================
   ICON
========================= */

.otp-icon {
  display: grid;
  place-items: center;

  width: 66px;
  height: 66px;

  margin: 0 auto 27px;

  color: #059669;

  border: 1px solid #ccefe0;
  border-radius: 20px;

  background:
    linear-gradient(
      145deg,
      #ecfdf5,
      #d1fae5
    );

  box-shadow:
    0 8px 22px rgba(5, 150, 105, 0.08);
}

.otp-icon svg {
  width: 34px;
  height: 34px;

  stroke: currentColor;
  stroke-width: 1.7;

  stroke-linecap: round;
  stroke-linejoin: round;
}

/* =========================
   HEADING
========================= */

.auth-heading {
  margin-bottom: 28px;
}

.eyebrow {
  display: inline-block;

  margin-bottom: 11px;

  color: #059669;

  font-size: 11px;
  font-weight: 800;

  letter-spacing: 1.8px;
}

.auth-heading h1 {
  margin: 0;

  color: #15231c;

  font-size: clamp(28px, 4vw, 34px);
  font-weight: 850;

  line-height: 1.2;

  letter-spacing: -1.2px;
}

.auth-heading p {
  max-width: 370px;

  margin: 13px auto 0;

  color: #728078;

  font-size: 14px;
  line-height: 1.75;
}

/* =========================
   FORM
========================= */

.otp-form {
  display: grid;
  gap: 20px;

  text-align: left;
}

.otp-field {
  display: grid;
  gap: 9px;
}

.field-label {
  color: #35443c;

  font-size: 13px;
  font-weight: 700;
}

.otp-input-wrapper {
  position: relative;
}

.otp-input {
  display: block;

  width: 100%;
  height: 66px;

  box-sizing: border-box;

  padding: 0 18px;

  border: 1px solid #dfe7e2;
  border-radius: 14px;

  outline: none;

  background: #fbfdfc;

  color: #17251d;

  font-family:
    "SFMono-Regular",
    Consolas,
    "Liberation Mono",
    monospace;

  font-size: 28px;
  font-weight: 750;

  letter-spacing: 12px;

  text-align: center;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.otp-input::placeholder {
  color: #c5cec9;
  letter-spacing: 10px;
}

.otp-input:hover {
  border-color: #b9d9c9;
}

.otp-input:focus {
  border-color: #10b981;

  background: #fff;

  box-shadow:
    0 0 0 4px rgba(16, 185, 129, 0.1);
}

.otp-input:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.input-hint {
  color: #8a958f;

  font-size: 11px;

  text-align: center;
}

/* =========================
   ERROR
========================= */

.message-error {
  display: flex;
  align-items: flex-start;

  gap: 10px;

  padding: 12px 14px;

  border: 1px solid #fecaca;
  border-radius: 10px;

  background: #fef2f2;

  color: #b91c1c;

  font-size: 13px;
  line-height: 1.55;

  animation: message-enter 0.25s ease both;
}

.error-icon {
  display: grid;
  place-items: center;

  flex: 0 0 20px;

  width: 20px;
  height: 20px;

  border-radius: 50%;

  background: #fee2e2;

  font-size: 12px;
  font-weight: 800;
}

/* =========================
   VERIFY BUTTON
========================= */

.verify-button {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 9px;

  width: 100%;
  min-height: 53px;

  padding: 14px 18px;

  border: 0;
  border-radius: 12px;

  background:
    linear-gradient(
      135deg,
      #059669,
      #047857
    );

  color: #fff;

  font: inherit;
  font-size: 14px;
  font-weight: 750;

  cursor: pointer;

  box-shadow:
    0 8px 18px rgba(5, 150, 105, 0.18);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;
}

.verify-button:hover:not(:disabled) {
  transform: translateY(-2px);

  box-shadow:
    0 12px 25px rgba(5, 150, 105, 0.25);
}

.verify-button:active:not(:disabled) {
  transform: translateY(0);
}

.verify-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;

  box-shadow: none;
}

.verify-button svg {
  width: 18px;
  height: 18px;

  stroke: currentColor;
  stroke-width: 2;

  stroke-linecap: round;
  stroke-linejoin: round;
}

/* =========================
   LOADING
========================= */

.spinner {
  width: 16px;
  height: 16px;

  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;

  border-radius: 50%;

  animation: spin 0.7s linear infinite;
}

/* =========================
   SECURITY
========================= */

.security-note {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  margin-top: 24px;

  color: #7c8982;

  font-size: 11.5px;
  line-height: 1.5;

  text-align: center;
}

.security-note svg {
  flex: 0 0 auto;

  width: 17px;
  height: 17px;

  color: #059669;

  stroke: currentColor;
  stroke-width: 1.7;

  stroke-linecap: round;
  stroke-linejoin: round;
}

/* =========================
   FOOTER
========================= */

.auth-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  gap: 5px;

  margin-top: 24px;
  padding-top: 22px;

  border-top: 1px solid #edf1ee;

  color: #7b8981;

  font-size: 13px;

  text-align: center;
}

.resend-button {
  padding: 0;

  border: 0;

  background: transparent;

  color: #047857;

  font: inherit;
  font-size: 13px;
  font-weight: 750;

  cursor: pointer;

  transition: color 0.2s ease;
}

.resend-button:hover:not(:disabled) {
  color: #065f46;

  text-decoration: underline;
}

.resend-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* =========================
   ANIMATIONS
========================= */

@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.99);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes message-enter {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* =========================
   MOBILE
========================= */

@media (max-width: 600px) {
  .auth-page {
    min-height: 75vh;

    padding: 32px 14px;
  }

  .auth-card {
    padding: 32px 22px;

    border-radius: 20px;
  }

  .otp-icon {
    width: 58px;
    height: 58px;

    margin-bottom: 22px;

    border-radius: 17px;
  }

  .otp-icon svg {
    width: 30px;
    height: 30px;
  }

  .auth-heading {
    margin-bottom: 24px;
  }

  .auth-heading h1 {
    font-size: 27px;
  }

  .auth-heading p {
    font-size: 13px;
  }

  .otp-input {
    height: 60px;

    font-size: 25px;
    letter-spacing: 9px;
  }

  .otp-input::placeholder {
    letter-spacing: 8px;
  }
}

@media (max-width: 360px) {
  .auth-card {
    padding: 27px 17px;
  }

  .auth-heading h1 {
    font-size: 24px;
  }

  .otp-input {
    height: 56px;

    font-size: 22px;
    letter-spacing: 7px;
  }

  .otp-input::placeholder {
    letter-spacing: 6px;
  }

  .auth-footer {
    flex-direction: column;
  }
}

/* =========================
   REDUCED MOTION
========================= */

@media (prefers-reduced-motion: reduce) {
  .auth-card,
  .message-error,
  .spinner {
    animation: none;
  }

  .otp-input,
  .verify-button,
  .resend-button {
    transition: none;
  }
}
</style>
```
