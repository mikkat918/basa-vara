<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import { useUiStore } from '../../stores/uiStore'

const router = useRouter()
const auth = useAuthStore()
const ui = useUiStore()
const loading = ref(false)
const form = reactive({ name: '', email: '', phone: '', role: 'tenant', password: '', confirmPassword: '' })
const error = ref('')

async function submit() {
  loading.value = true
  error.value = ''
  try {
    await auth.register(form)
    ui.toast('Your account is ready.', 'success')
    router.push(auth.role === 'admin' ? '/admin' : auth.role === 'landlord' ? '/landlord' : '/dashboard')
  } catch (err) {
    error.value = err.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

```vue
<template>
  <section class="register-page">
    <div class="register-background">
      <div class="glow glow-one"></div>
      <div class="glow glow-two"></div>
    </div>

    <div class="register-container">

      <!-- Branding / Intro -->
      <div class="register-intro">
        <div class="brand-mark">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path d="M3 10.5 12 3l9 7.5"></path>
            <path d="M5.5 9.5V21h13V9.5"></path>
            <path d="M9 21v-6h6v6"></path>
          </svg>
        </div>

        <span class="eyebrow">BASA VARA</span>

        <h1>Create your account</h1>

        <p>
          Find a home, list your property, and connect with people
          looking for their next place.
        </p>

        <div class="benefits">
          <div class="benefit">
            <span class="benefit-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="m5 12 4 4L19 6"></path>
              </svg>
            </span>
            <span>Browse available properties</span>
          </div>

          <div class="benefit">
            <span class="benefit-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"></path>
              </svg>
            </span>
            <span>Connect with landlords and tenants</span>
          </div>

          <div class="benefit">
            <span class="benefit-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </span>
            <span>Manage your rental journey</span>
          </div>
        </div>
      </div>

      <!-- Register Card -->
      <div class="register-card">

        <div class="card-header">
          <div>
            <h2>Get started</h2>
            <p>Fill in your details to create your account.</p>
          </div>

          <div class="step-badge">
            01
          </div>
        </div>

        <form class="register-form" @submit.prevent="submit">

          <!-- Full Name -->
          <label class="field">
            <span class="field-label">
              Full name
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
                <circle cx="12" cy="8" r="4"></circle>
                <path d="M4 21a8 8 0 0 1 16 0"></path>
              </svg>

              <input
                v-model="form.name"
                class="control"
                placeholder="Your full name"
                autocomplete="name"
              />
            </div>
          </label>

          <!-- Email -->
          <label class="field">
            <span class="field-label">
              Email address
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
                <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                <path d="m3 7 9 6 9-6"></path>
              </svg>

              <input
                v-model="form.email"
                class="control"
                type="email"
                placeholder="you@example.com"
                autocomplete="email"
              />
            </div>
          </label>

          <!-- Phone -->
          <label class="field">
            <span class="field-label">
              Phone number
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
                <rect x="6" y="2.5" width="12" height="19" rx="2"></rect>
                <path d="M10 5h4"></path>
                <path d="M11 18.5h2"></path>
              </svg>

              <input
                v-model="form.phone"
                class="control"
                type="tel"
                inputmode="tel"
                placeholder="01XXXXXXXXX"
                autocomplete="tel"
              />
            </div>
          </label>

          <!-- Role -->
          <div class="field">
            <span class="field-label">
              I am a
              <span>*</span>
            </span>

            <div class="role-grid">

              <label
                class="role-option"
                :class="{ active: form.role === 'tenant' }"
              >
                <input
                  v-model="form.role"
                  type="radio"
                  value="tenant"
                />

                <span class="role-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <path d="M3 10.5 12 3l9 7.5"></path>
                    <path d="M5.5 9.5V21h13V9.5"></path>
                    <path d="M9 21v-6h6v6"></path>
                  </svg>
                </span>

                <span class="role-content">
                  <strong>Tenant</strong>
                  <small>Looking for a home</small>
                </span>

                <span class="radio-check"></span>
              </label>

              <label
                class="role-option"
                :class="{ active: form.role === 'landlord' }"
              >
                <input
                  v-model="form.role"
                  type="radio"
                  value="landlord"
                />

                <span class="role-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <path d="M4 21V5l8-3 8 3v16"></path>
                    <path d="M8 21v-5h8v5"></path>
                    <path d="M8 8h.01"></path>
                    <path d="M12 8h.01"></path>
                    <path d="M16 8h.01"></path>
                    <path d="M8 11h.01"></path>
                    <path d="M12 11h.01"></path>
                    <path d="M16 11h.01"></path>
                  </svg>
                </span>

                <span class="role-content">
                  <strong>Landlord</strong>
                  <small>Listing a property</small>
                </span>

                <span class="radio-check"></span>
              </label>

            </div>
          </div>

          <!-- Password -->
          <label class="field">
            <span class="field-label">
              Password
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
                placeholder="Minimum 8 characters"
                autocomplete="new-password"
              />
            </div>
          </label>

          <!-- Confirm Password -->
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
                placeholder="Repeat your password"
                autocomplete="new-password"
              />
            </div>
          </label>

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
            class="btn btn-primary register-btn"
            type="submit"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner"></span>

            <span>
              {{ loading ? 'Creating your account...' : 'Create account' }}
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

        <div class="login-divider">
          <span>Already registered?</span>
        </div>

        <router-link to="/login" class="login-link">
          Log in to your account
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M5 12h14"></path>
            <path d="m13 6 6 6-6 6"></path>
          </svg>
        </router-link>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* =========================
   PAGE
========================= */

.register-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(
      circle at 10% 10%,
      rgba(16, 185, 129, 0.12),
      transparent 30%
    ),
    radial-gradient(
      circle at 90% 90%,
      rgba(5, 150, 105, 0.08),
      transparent 30%
    ),
    #f7faf9;
}

.register-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.glow {
  position: absolute;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.35;
}

.glow-one {
  top: -180px;
  left: -100px;
  background: rgba(16, 185, 129, 0.16);
}

.glow-two {
  right: -150px;
  bottom: -180px;
  background: rgba(5, 150, 105, 0.13);
}

/* =========================
   CONTAINER
========================= */

.register-container {
  position: relative;
  z-index: 1;

  width: min(1120px, calc(100% - 40px));
  min-height: 100vh;
  margin: 0 auto;
  padding: 60px 0;

  display: grid;
  grid-template-columns: minmax(300px, 0.85fr) minmax(460px, 1.15fr);
  align-items: center;
  gap: 80px;

  box-sizing: border-box;
}

/* =========================
   INTRO
========================= */

.register-intro {
  max-width: 460px;
}

.brand-mark {
  display: grid;
  place-items: center;

  width: 52px;
  height: 52px;
  margin-bottom: 18px;

  border: 1px solid rgba(5, 150, 105, 0.18);
  border-radius: 15px;

  color: #059669;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
}

.brand-mark svg {
  width: 28px;
  height: 28px;
}

.eyebrow {
  display: block;
  margin-bottom: 9px;

  color: #059669;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.register-intro h1 {
  margin: 0;

  color: #17211d;
  font-size: clamp(36px, 4vw, 56px);
  line-height: 1.04;
  letter-spacing: -0.045em;
}

.register-intro > p {
  max-width: 430px;
  margin: 18px 0 0;

  color: #64748b;
  font-size: 15px;
  line-height: 1.75;
}

.benefits {
  display: grid;
  gap: 13px;
  margin-top: 30px;
}

.benefit {
  display: flex;
  align-items: center;
  gap: 11px;

  color: #475569;
  font-size: 13px;
}

.benefit-icon {
  display: grid;
  place-items: center;

  width: 28px;
  height: 28px;
  flex-shrink: 0;

  border-radius: 9px;
  color: #059669;
  background: #eaf8f3;
}

.benefit-icon svg {
  width: 15px;
  height: 15px;
}

/* =========================
   CARD
========================= */

.register-card {
  width: 100%;
  box-sizing: border-box;

  padding: 34px;

  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 24px;

  background: rgba(255, 255, 255, 0.94);

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

.step-badge {
  display: grid;
  place-items: center;

  width: 38px;
  height: 38px;
  flex-shrink: 0;

  border-radius: 11px;

  color: #059669;
  background: #eaf8f3;

  font-size: 11px;
  font-weight: 800;
}

/* =========================
   FORM
========================= */

.register-form {
  display: grid;
  gap: 15px;
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
  min-height: 46px;
  padding-left: 43px;
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
  z-index: 1;
}

/* =========================
   ROLE
========================= */

.role-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.role-option {
  position: relative;

  display: flex;
  align-items: center;
  gap: 10px;

  min-width: 0;
  padding: 13px;

  border: 1px solid #e2e8f0;
  border-radius: 13px;

  background: #fff;

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.role-option:hover {
  border-color: #a7e5d0;
  transform: translateY(-1px);
}

.role-option.active {
  border-color: #34b889;
  background: #f0fbf7;
  box-shadow: 0 5px 16px rgba(5, 150, 105, 0.08);
}

.role-option input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.role-icon {
  display: grid;
  place-items: center;

  width: 35px;
  height: 35px;
  flex-shrink: 0;

  border-radius: 10px;

  color: #64748b;
  background: #f1f5f9;
}

.role-option.active .role-icon {
  color: #059669;
  background: #dff7ed;
}

.role-icon svg {
  width: 18px;
  height: 18px;
}

.role-content {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.role-content strong {
  color: #1e293b;
  font-size: 12px;
}

.role-content small {
  overflow: hidden;

  color: #94a3b8;
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.radio-check {
  width: 15px;
  height: 15px;
  margin-left: auto;
  flex-shrink: 0;

  border: 2px solid #cbd5e1;
  border-radius: 50%;
  box-sizing: border-box;
}

.role-option.active .radio-check {
  border: 4px solid #059669;
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
  margin-top: 1px;
}

/* =========================
   BUTTON
========================= */

.register-btn {
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

.register-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 9px 22px rgba(5, 150, 105, 0.18);
}

.register-btn svg {
  width: 17px;
  height: 17px;
}

.register-btn:disabled {
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
   LOGIN
========================= */

.login-divider {
  display: flex;
  align-items: center;
  gap: 12px;

  margin: 23px 0 15px;

  color: #94a3b8;
  font-size: 11px;
}

.login-divider::before,
.login-divider::after {
  content: "";
  height: 1px;
  flex: 1;
  background: #e5e7eb;
}

.login-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  color: #059669;
  font-size: 13px;
  font-weight: 750;
  text-decoration: none;
}

.login-link svg {
  width: 15px;
  height: 15px;

  transition: transform 0.2s ease;
}

.login-link:hover svg {
  transform: translateX(3px);
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 980px) {
  .register-container {
    grid-template-columns: 1fr;
    max-width: 620px;
    gap: 30px;
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .register-intro {
    max-width: 620px;
    text-align: center;
  }

  .brand-mark {
    margin-left: auto;
    margin-right: auto;
  }

  .register-intro > p {
    margin-left: auto;
    margin-right: auto;
  }

  .benefits {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .benefit {
    justify-content: center;
  }
}

@media (max-width: 620px) {
  .register-container {
    width: min(100% - 24px, 560px);
    padding-top: 24px;
    padding-bottom: 24px;
  }

  .register-intro h1 {
    font-size: 35px;
  }

  .register-intro > p {
    font-size: 13px;
  }

  .benefits {
    display: none;
  }

  .register-card {
    padding: 23px 18px;
    border-radius: 19px;
  }

  .card-header {
    margin-bottom: 20px;
  }

  .role-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 390px) {
  .register-container {
    width: calc(100% - 16px);
  }

  .register-card {
    padding: 20px 14px;
  }

  .register-intro h1 {
    font-size: 31px;
  }

  .card-header h2 {
    font-size: 20px;
  }

  .role-option {
    padding: 11px;
  }
}

/* =========================
   ACCESSIBILITY
========================= */

@media (prefers-reduced-motion: reduce) {
  .register-page *,
  .register-page *::before,
  .register-page *::after {
    transition: none !important;
    animation: none !important;
  }
}
</style>
