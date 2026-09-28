<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

```vue
<template>
  <section class="container page not-found">
    <div class="background-glow glow-one"></div>
    <div class="background-glow glow-two"></div>

    <div class="error-card">
      <!-- Illustration -->
      <div class="illustration">
        <div class="house">
          <div class="roof"></div>

          <div class="house-body">
            <div class="window window-left"></div>
            <div class="window window-right"></div>
            <div class="door"></div>
          </div>
        </div>

        <div class="error-number">404</div>
      </div>

      <!-- Content -->
      <span class="eyebrow">PAGE NOT FOUND</span>

      <h1>Oops! This page wandered away.</h1>

      <p class="description">
        The page you're looking for doesn't exist, may have been moved,
        or the link might be incorrect.
      </p>

      <!-- Actions -->
      <div class="actions">
        <button
          class="primary-button"
          type="button"
          @click="router.push('/')"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 11L12 3L21 11" />
            <path d="M5 10V21H19V10" />
            <path d="M9 21V15H15V21" />
          </svg>

          Go home
        </button>

        <button
          class="secondary-button"
          type="button"
          @click="router.back()"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 12H5" />
            <path d="M12 19L5 12L12 5" />
          </svg>

          Go back
        </button>
      </div>

      <!-- Helpful links -->
      <div class="quick-links">
        <span>Looking for something?</span>

        <router-link to="/properties">
          Browse properties
        </router-link>

        <span class="separator">•</span>

        <router-link to="/contact">
          Contact support
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.not-found {
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
      circle at 15% 20%,
      rgba(16, 185, 129, 0.08),
      transparent 30%
    ),
    radial-gradient(
      circle at 85% 80%,
      rgba(59, 130, 246, 0.06),
      transparent 30%
    ),
    #f7faf9;
}

/* =========================
   BACKGROUND
========================= */

.background-glow {
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
  background: rgba(16, 185, 129, 0.11);
}

.glow-two {
  right: -100px;
  bottom: -100px;
  background: rgba(59, 130, 246, 0.08);
}

/* =========================
   CARD
========================= */

.error-card {
  width: min(650px, 100%);

  box-sizing: border-box;

  padding: 48px 44px;

  border: 1px solid #e4ebe7;
  border-radius: 28px;

  background: rgba(255, 255, 255, 0.97);

  text-align: center;

  box-shadow:
    0 25px 70px rgba(15, 23, 42, 0.07),
    0 4px 12px rgba(15, 23, 42, 0.025);

  animation: card-enter 0.55s ease both;
}

/* =========================
   ILLUSTRATION
========================= */

.illustration {
  position: relative;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  width: 230px;
  height: 145px;

  margin: 0 auto 28px;
}

.house {
  position: relative;

  width: 100px;
  height: 105px;

  transform: translateY(5px);

  animation: floating-house 4s ease-in-out infinite;
}

.roof {
  position: absolute;

  top: 5px;
  left: 7px;

  width: 86px;
  height: 70px;

  border: 3px solid #059669;
  border-bottom: 0;

  background: #ecfdf5;

  clip-path: polygon(50% 0, 100% 55%, 100% 100%, 0 100%, 0 55%);
}

.house-body {
  position: absolute;

  left: 14px;
  bottom: 0;

  width: 72px;
  height: 69px;

  border: 3px solid #059669;
  border-radius: 4px;

  background: #fff;
}

.window {
  position: absolute;

  top: 17px;

  width: 13px;
  height: 13px;

  border: 2px solid #059669;
  border-radius: 3px;

  background: #ecfdf5;
}

.window-left {
  left: 10px;
}

.window-right {
  right: 10px;
}

.door {
  position: absolute;

  bottom: 0;
  left: 28px;

  width: 17px;
  height: 31px;

  border: 2px solid #059669;
  border-bottom: 0;

  border-radius: 4px 4px 0 0;

  background: #d1fae5;
}

.error-number {
  position: absolute;

  right: 4px;
  bottom: 0;

  color: #059669;

  font-size: 42px;
  font-weight: 900;
  line-height: 1;

  letter-spacing: -3px;

  transform: rotate(-7deg);
}

/* =========================
   TEXT
========================= */

.eyebrow {
  display: inline-block;

  margin-bottom: 12px;

  color: #059669;

  font-size: 11px;
  font-weight: 850;

  letter-spacing: 1.8px;
}

.error-card h1 {
  max-width: 520px;

  margin: 0 auto;

  color: #16241d;

  font-size: clamp(28px, 4vw, 38px);
  font-weight: 850;

  line-height: 1.18;

  letter-spacing: -1.2px;
}

.description {
  max-width: 490px;

  margin: 15px auto 0;

  color: #748079;

  font-size: 14px;
  line-height: 1.8;
}

/* =========================
   ACTIONS
========================= */

.actions {
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 11px;

  margin-top: 28px;
}

.primary-button,
.secondary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  min-height: 46px;

  padding: 0 18px;

  border-radius: 11px;

  font: inherit;
  font-size: 13px;
  font-weight: 750;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.primary-button {
  border: 0;

  background:
    linear-gradient(
      135deg,
      #059669,
      #047857
    );

  color: #fff;

  box-shadow:
    0 8px 18px rgba(5, 150, 105, 0.18);
}

.primary-button:hover {
  transform: translateY(-2px);

  box-shadow:
    0 12px 24px rgba(5, 150, 105, 0.24);
}

.secondary-button {
  border: 1px solid #dce6e0;

  background: #fff;

  color: #46554d;
}

.secondary-button:hover {
  transform: translateY(-2px);

  border-color: #bfd9cb;

  background: #f8fcfa;
}

.primary-button svg,
.secondary-button svg {
  width: 17px;
  height: 17px;

  stroke: currentColor;
  stroke-width: 1.9;

  stroke-linecap: round;
  stroke-linejoin: round;
}

/* =========================
   QUICK LINKS
========================= */

.quick-links {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  gap: 7px;

  margin-top: 28px;
  padding-top: 22px;

  border-top: 1px solid #edf1ee;

  color: #89948e;

  font-size: 12px;
}

.quick-links a {
  color: #047857;

  font-weight: 700;

  text-decoration: none;

  transition: color 0.2s ease;
}

.quick-links a:hover {
  color: #065f46;
  text-decoration: underline;
}

.separator {
  color: #c4cdc8;
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

@keyframes floating-house {
  0%,
  100% {
    transform: translateY(5px);
  }

  50% {
    transform: translateY(-5px);
  }
}

/* =========================
   TABLET
========================= */

@media (max-width: 650px) {
  .not-found {
    min-height: 75vh;
    padding: 35px 16px;
  }

  .error-card {
    padding: 38px 28px;
    border-radius: 22px;
  }
}

/* =========================
   MOBILE
========================= */

@media (max-width: 480px) {
  .not-found {
    padding: 25px 12px;
  }

  .error-card {
    padding: 32px 20px;
    border-radius: 19px;
  }

  .illustration {
    width: 200px;
    height: 125px;
    margin-bottom: 22px;
  }

  .house {
    transform: scale(0.88) translateY(5px);
  }

  .error-number {
    right: 0;
    font-size: 35px;
  }

  .error-card h1 {
    font-size: 27px;
  }

  .description {
    font-size: 13px;
  }

  .actions {
    flex-direction: column;
    width: 100%;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
  }

  .quick-links {
    flex-direction: column;
    gap: 8px;
  }

  .separator {
    display: none;
  }
}

@media (max-width: 350px) {
  .error-card {
    padding: 28px 16px;
  }

  .error-card h1 {
    font-size: 24px;
  }

  .illustration {
    transform: scale(0.9);
  }
}

/* =========================
   REDUCED MOTION
========================= */

@media (prefers-reduced-motion: reduce) {
  .error-card,
  .house {
    animation: none;
  }

  .primary-button,
  .secondary-button,
  .quick-links a {
    transition: none;
  }
}
</style>
```
