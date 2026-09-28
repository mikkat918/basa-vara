<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../../services/authService'

const email = ref('')
const status = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

async function submit() {
  loading.value = true
  error.value = ''
  status.value = ''
  try {
    const result = await authService.forgotPassword(email.value)
    status.value = result.message || 'A reset link has been sent.'
    router.push({ path: '/reset-password', query: { email: email.value } })
  } catch (err) {
    error.value = err.message || 'Unable to reset password'
  } finally {
    loading.value = false
  }
}
</script>

```vue
<template>
  <section class="container page auth-shell">
    <!-- Background decoration -->
    <div class="auth-glow auth-glow-one"></div>
    <div class="auth-glow auth-glow-two"></div>

    <div class="auth-card">
      <!-- Header icon -->
      <div class="auth-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m3 7 9 6 9-6" />
          <path d="M16 3v4" />
        </svg>
      </div>

      <div class="auth-heading">
        <span class="eyebrow">ACCOUNT RECOVERY</span>
        <h1>Reset your password</h1>
        <p class="auth-description">
          Forgot your password? No worries. Enter the email address
          associated with your account and we'll help you get back in.
        </p>
      </div>

      <form class="auth-form" @submit.prevent="submit">
        <label class="field">
          <span class="field-label">Email address</span>

          <div class="input-wrapper">
            <svg
              class="input-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="m3 7 9 6 9-6" />
            </svg>

            <input
              v-model="email"
              class="control"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
              required
              :disabled="loading"
            />
          </div>
        </label>

        <div v-if="error" class="message message-error" role="alert">
          <span class="message-symbol">!</span>
          <p>{{ error }}</p>
        </div>

        <div
          v-if="status"
          class="message message-success"
          role="status"
        >
          <span class="message-symbol">✓</span>
          <p>{{ status }}</p>
        </div>

        <button
          class="submit-button"
          type="submit"
          :disabled="loading || !email.trim()"
        >
          <span v-if="loading" class="spinner"></span>
          <span>{{ loading ? 'Sending reset code...' : 'Send reset code' }}</span>

          <svg
            v-if="!loading"
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </form>

      <div class="security-note">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="4" y="10" width="16" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
        <span>Your account security matters to us.</span>
      </div>

      <div class="auth-footer">
        <span>Remember your password?</span>
        <RouterLink to="/login" class="back-link">
          Back to login
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.auth-shell {
  position: relative;
  isolation: isolate;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  width: 100%;
  min-height: clamp(620px, 82vh, 900px);
  padding: 56px 20px;
  overflow: hidden;
  background:
    radial-gradient(
      circle at 10% 15%,
      rgba(16, 185, 129, 0.09),
      transparent 32%
    ),
    radial-gradient(
      circle at 90% 85%,
      rgba(59, 130, 246, 0.08),
      transparent 30%
    ),
    #f7faf9;
}

.auth-glow {
  position: absolute;
  z-index: -1;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  filter: blur(70px);
  pointer-events: none;
}

.auth-glow-one {
  top: 5%;
  left: -100px;
  background: rgba(16, 185, 129, 0.12);
}

.auth-glow-two {
  right: -100px;
  bottom: 5%;
  background: rgba(59, 130, 246, 0.1);
}

.auth-card {
  width: 100%;
  max-width: 460px;
  box-sizing: border-box;
  padding: 40px;
  border: 1px solid #e7eeea;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow:
    0 24px 70px rgba(15, 23, 42, 0.07),
    0 3px 10px rgba(15, 23, 42, 0.025);
  animation: card-enter 0.55s ease both;
}

.auth-icon {
  display: grid;
  place-items: center;
  width: 66px;
  height: 66px;
  margin-bottom: 28px;
  color: #059669;
  border: 1px solid #d1fae5;
  border-radius: 20px;
  background: linear-gradient(145deg, #ecfdf5, #d1fae5);
}

.auth-heading {
  margin-bottom: 28px;
}

.eyebrow {
  display: inline-block;
  margin-bottom: 12px;
  color: #059669;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.8px;
}

.auth-heading h1 {
  margin: 0;
  color: #14231d;
  font-size: clamp(27px, 4vw, 33px);
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -1.1px;
}

.auth-description {
  margin: 13px 0 0;
  color: #728078;
  font-size: 14px;
  line-height: 1.8;
}

.auth-form {
  display: grid;
  gap: 20px;
}

.field {
  display: grid;
  gap: 9px;
  min-width: 0;
}

.field-label {
  color: #34443b;
  font-size: 13px;
  font-weight: 700;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 15px;
  flex-shrink: 0;
  color: #8a9990;
  pointer-events: none;
  transition: color 0.2s ease;
}

.input-wrapper:focus-within .input-icon {
  color: #059669;
}

.control {
  width: 100%;
  min-width: 0;
  height: 52px;
  box-sizing: border-box;
  padding: 0 15px 0 45px;
  border: 1px solid #dfe7e2;
  border-radius: 12px;
  outline: none;
  background: #fbfdfc;
  color: #17251d;
  font: inherit;
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.control::placeholder {
  color: #a4afa8;
}

.control:hover {
  border-color: #b9d8c8;
}

.control:focus {
  border-color: #10b981;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.11);
}

.control:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 53px;
  padding: 14px 18px;
  border: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, #059669, #047857);
  color: #fff;
  font: inherit;
  font-size: 14px;
  font-weight: 750;
  cursor: pointer;
  box-shadow: 0 7px 16px rgba(5, 150, 105, 0.19);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 11px 22px rgba(5, 150, 105, 0.25);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
  box-shadow: none;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.message {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.message p {
  margin: 0;
}

.message-symbol {
  display: grid;
  place-items: center;
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 800;
}

.message-error {
  border: 1px solid #fecaca;
  background: #fef2f2;
  color: #b91c1c;
}

.message-error .message-symbol {
  background: #fee2e2;
}

.message-success {
  border: 1px solid #bbf7d0;
  background: #f0fdf4;
  color: #166534;
}

.message-success .message-symbol {
  background: #dcfce7;
}

.security-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
  color: #7b8981;
  font-size: 12px;
  text-align: center;
}

.security-note svg {
  flex-shrink: 0;
  color: #059669;
}

.auth-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 24px;
  padding-top: 22px;
  border-top: 1px solid #edf1ee;
  color: #7b8981;
  font-size: 13px;
  text-align: center;
}

.back-link {
  color: #047857;
  font-weight: 750;
  text-decoration: none;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #065f46;
  text-decoration: underline;
}

@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(18px);
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

@media (max-width: 600px) {
  .auth-shell {
    min-height: 75vh;
    padding: 32px 14px;
  }

  .auth-card {
    max-width: 440px;
    padding: 28px 22px;
    border-radius: 19px;
  }

  .auth-icon {
    width: 58px;
    height: 58px;
    margin-bottom: 22px;
    border-radius: 17px;
  }

  .auth-heading {
    margin-bottom: 24px;
  }

  .auth-heading h1 {
    font-size: 27px;
  }
}

@media (max-width: 360px) {
  .auth-card {
    padding: 24px 17px;
  }

  .auth-heading h1 {
    font-size: 24px;
  }

  .auth-footer {
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  .auth-card,
  .spinner {
    animation: none;
  }

  .control,
  .submit-button,
  .back-link {
    transition: none;
  }
}
</style>
```

