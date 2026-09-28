<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import { useUiStore } from '../../stores/uiStore'

const form = reactive({ email: '', password: '' })
const loading = ref(false)
const error = ref('')
const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const ui = useUiStore()

async function submit() {
  loading.value = true
  error.value = ''
  try {
    await auth.login(form)
    const requestedRedirect = route.query.redirect
    const redirect = typeof requestedRedirect === 'string' && requestedRedirect.startsWith('/') && !requestedRedirect.startsWith('//')
      ? requestedRedirect
      : (auth.role === 'admin' ? '/admin' : auth.role === 'landlord' ? '/landlord' : '/dashboard')
    router.push(redirect)
    ui.toast('Welcome back.', 'success')
  } catch (err) {
    error.value = err.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

```vue
<template>
  <section class="container page auth-shell">
    <!-- Decorative background -->
    <div class="auth-glow auth-glow-one"></div>
    <div class="auth-glow auth-glow-two"></div>

    <div class="auth-card">
      <!-- Logo / Icon -->
      <div class="brand-mark">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 22L24 8L40 22V38C40 39.1 39.1 40 38 40H10C8.9 40 8 39.1 8 38V22Z"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linejoin="round"
          />
          <path
            d="M18 40V27H30V40"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linejoin="round"
          />
          <path
            d="M5 24L24 7L43 24"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <!-- Heading -->
      <div class="auth-heading">
        <span class="eyebrow">WELCOME BACK</span>

        <h1>Sign in to your account</h1>

        <p>
          Continue your rental search or manage your property listings
          from one place.
        </p>
      </div>

      <!-- Login form -->
      <form class="auth-form" @submit.prevent="submit">
        <!-- Email -->
        <label class="field">
          <span class="field-label">Email address</span>

          <div class="input-wrapper">
            <svg
              class="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="M3 7L12 13L21 7" />
            </svg>

            <input
              v-model="form.email"
              class="control"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
              required
              :disabled="loading"
            />
          </div>
        </label>

        <!-- Password -->
        <label class="field">
          <div class="field-header">
            <span class="field-label">Password</span>

            <router-link
              to="/forgot-password"
              class="forgot-link"
            >
              Forgot password?
            </router-link>
          </div>

          <div class="input-wrapper">
            <svg
              class="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="10" width="16" height="11" rx="2" />
              <path d="M8 10V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V10" />
              <path d="M12 14V17" />
            </svg>

            <input
              v-model="form.password"
              class="control"
              type="password"
              placeholder="••••••••"
              autocomplete="current-password"
              required
              :disabled="loading"
            />
          </div>
        </label>

        <!-- Error -->
        <div
          v-if="error"
          class="message message-error"
          role="alert"
        >
          <span class="message-icon">!</span>
          <span>{{ error }}</span>
        </div>

        <!-- Submit -->
        <button
          class="submit-button"
          type="submit"
          :disabled="loading"
        >
          <span v-if="loading" class="spinner"></span>

          <span>
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </span>

          <svg
            v-if="!loading"
            class="button-arrow"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 12H19" />
            <path d="M12 5L19 12L12 19" />
          </svg>
        </button>
      </form>

      <!-- Security -->
      <div class="security-note">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 3L20 6V11C20 16 16.7 19.7 12 21C7.3 19.7 4 16 4 11V6L12 3Z" />
          <path d="M9 12L11 14L15 10" />
        </svg>

        <span>Your account information is securely protected.</span>
      </div>

      <!-- Register -->
      <div class="register-area">
        <span>Don't have an account?</span>

        <router-link to="/register" class="register-link">
          Create an account
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 12H19" />
            <path d="M12 5L19 12L12 19" />
          </svg>
        </router-link>
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

  width: 100%;
  min-height: clamp(650px, 82vh, 900px);

  box-sizing: border-box;
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
      rgba(59, 130, 246, 0.07),
      transparent 30%
    ),
    #f7faf9;
}

/* =========================
   BACKGROUND
========================= */

.auth-glow {
  position: absolute;
  z-index: -1;

  width: 260px;
  height: 260px;

  border-radius: 50%;
  filter: blur(75px);

  pointer-events: none;
}

.auth-glow-one {
  top: -80px;
  left: -100px;
  background: rgba(16, 185, 129, 0.12);
}

.auth-glow-two {
  right: -100px;
  bottom: -80px;
  background: rgba(59, 130, 246, 0.09);
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

  box-shadow:
    0 25px 70px rgba(15, 23, 42, 0.07),
    0 4px 12px rgba(15, 23, 42, 0.025);

  animation: card-enter 0.55s ease both;
}

/* =========================
   BRAND
========================= */

.brand-mark {
  display: grid;
  place-items: center;

  width: 66px;
  height: 66px;

  margin-bottom: 27px;

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

.brand-mark svg {
  width: 39px;
  height: 39px;
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
  margin: 13px 0 0;

  color: #728078;

  font-size: 14px;
  line-height: 1.75;
}

/* =========================
   FORM
========================= */

.auth-form {
  display: grid;
  gap: 20px;
}

.field {
  display: grid;
  gap: 9px;
  min-width: 0;
}

.field-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.field-label {
  color: #35443c;

  font-size: 13px;
  font-weight: 700;
}

.forgot-link {
  color: #059669;

  font-size: 12px;
  font-weight: 700;

  text-decoration: none;

  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #047857;
  text-decoration: underline;
}

/* =========================
   INPUT
========================= */

.input-wrapper {
  position: relative;

  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 15px;

  width: 19px;
  height: 19px;

  color: #8c9992;

  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;

  pointer-events: none;

  transition: color 0.2s ease;
}

.input-wrapper:focus-within .input-icon {
  color: #059669;
}

.control {
  width: 100%;
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
  color: #a5afa9;
}

.control:hover {
  border-color: #b9d9c9;
}

.control:focus {
  border-color: #10b981;

  background: #fff;

  box-shadow:
    0 0 0 4px rgba(16, 185, 129, 0.1);
}

.control:disabled {
  cursor: not-allowed;
  opacity: 0.65;
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

.message-icon {
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
   BUTTON
========================= */

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

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);

  box-shadow:
    0 12px 25px rgba(5, 150, 105, 0.25);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  cursor: not-allowed;
  opacity: 0.65;

  box-shadow: none;
}

.button-arrow {
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
   REGISTER
========================= */

.register-area {
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

.register-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;

  color: #047857;

  font-weight: 750;

  text-decoration: none;

  transition: color 0.2s ease;
}

.register-link svg {
  width: 15px;
  height: 15px;

  stroke: currentColor;
  stroke-width: 2;

  stroke-linecap: round;
  stroke-linejoin: round;

  transition: transform 0.2s ease;
}

.register-link:hover {
  color: #065f46;
}

.register-link:hover svg {
  transform: translateX(2px);
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
   TABLET
========================= */

@media (max-width: 700px) {
  .auth-shell {
    min-height: 75vh;
    padding: 38px 16px;
  }

  .auth-card {
    padding: 32px 26px;
  }
}

/* =========================
   MOBILE
========================= */

@media (max-width: 480px) {
  .auth-shell {
    min-height: 72vh;
    padding: 28px 12px;
  }

  .auth-card {
    padding: 28px 20px;
    border-radius: 20px;
  }

  .brand-mark {
    width: 58px;
    height: 58px;
    margin-bottom: 23px;
    border-radius: 17px;
  }

  .brand-mark svg {
    width: 34px;
    height: 34px;
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

  .field-header {
    align-items: flex-start;
  }

  .control {
    height: 50px;
  }

  .submit-button {
    min-height: 51px;
  }
}

@media (max-width: 350px) {
  .auth-card {
    padding: 24px 16px;
  }

  .auth-heading h1 {
    font-size: 24px;
  }

  .forgot-link {
    font-size: 11px;
  }

  .register-area {
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

  .control,
  .submit-button,
  .forgot-link,
  .register-link,
  .register-link svg {
    transition: none;
  }
}
</style>
```

