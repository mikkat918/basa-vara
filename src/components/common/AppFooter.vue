<script setup>
import { APP_NAME } from '../../utils/constants'
</script>


<template>
  <footer class="footer">
    <div class="footer-glow"></div>

    <div class="container footer-inner">
      <!-- Brand -->
      <div class="footer-brand">
        <div class="brand-row">
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M3.5 10.5 12 3l8.5 7.5" />
              <path d="M5.5 9.5V21h13V9.5" />
              <path d="M9 21v-6h6v6" />
              <path d="M8 12h.01M16 12h.01" />
            </svg>
          </span>

          <p class="brand">{{ APP_NAME }}</p>
        </div>

        <p class="brand-description">
          Trusted rental listings across Bangladesh. Search, chat, then unlock
          verified landlord contacts with coins.
        </p>

        <div class="trust-pill">
          <span class="trust-dot"></span>
          <span>Built for easier renting</span>
        </div>
      </div>

      <!-- Explore -->
      <div class="footer-column">
        <h3>Explore</h3>

        <router-link to="/properties">
          <span>Find a home</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </router-link>

        <router-link to="/how-it-works">
          <span>How it works</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </router-link>

        <router-link to="/register">
          <span>List a property</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </router-link>
      </div>

      <!-- Company -->
      <div class="footer-column">
        <h3>Company</h3>

        <router-link to="/about">
          <span>About</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </router-link>

        <router-link to="/contact">
          <span>Contact</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </router-link>
      </div>

      <!-- Legal -->
      <div class="footer-column">
        <h3>Legal</h3>

        <router-link to="/terms">
          <span>Terms</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </router-link>

        <router-link to="/privacy">
          <span>Privacy</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </router-link>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <div class="container bottom-inner">
        <p class="copy">
          © {{ new Date().getFullYear() }} {{ APP_NAME }}. Dhaka, Bangladesh.
        </p>

        <div class="bottom-status">
          <span class="status-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" />
              <circle cx="12" cy="9" r="2.2" />
            </svg>
          </span>
          <span>Bangladesh</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  isolation: isolate;
  margin-top: auto;
  overflow: hidden;
  border-top: 1px solid #e3ebe6;
  background:
    radial-gradient(circle at 12% 0%, rgba(35, 155, 91, 0.08), transparent 30%),
    radial-gradient(circle at 88% 20%, rgba(35, 155, 91, 0.05), transparent 28%),
    #ffffff;
}

.footer-glow {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(31, 134, 76, 0.025),
      transparent
    );
}

.footer-inner {
  display: grid;
  grid-template-columns: minmax(260px, 1.7fr) repeat(3, minmax(130px, 1fr));
  gap: 48px;
  padding-top: 52px;
  padding-bottom: 44px;
}

/* Brand */
.footer-brand {
  max-width: 410px;
}

.brand-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 13px;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  border: 1px solid #d9ebdf;
  border-radius: 10px;
  background: #edf8f1;
  color: #16834a;
}

.brand-mark svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.brand {
  margin: 0;
  color: #16834a;
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.025em;
}

.brand-description {
  max-width: 390px;
  margin: 0;
  color: #75817a;
  font-size: 12px;
  line-height: 1.75;
}

.trust-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 18px;
  padding: 7px 10px;
  border: 1px solid #e0ebe4;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  color: #69766e;
  font-size: 10px;
  font-weight: 650;
}

.trust-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2b9a5e;
  box-shadow: 0 0 0 3px rgba(43, 154, 94, 0.1);
}

/* Columns */
.footer-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer-column h3 {
  margin: 2px 0 15px;
  color: #26362d;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.footer-column a {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  max-width: 160px;
  margin: 0 0 8px;
  padding: 5px 0;
  color: #78837c;
  font-size: 11px;
  font-weight: 550;
  text-decoration: none;
  transition:
    color 0.18s ease,
    transform 0.18s ease;
}

.footer-column a svg {
  width: 12px;
  height: 12px;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  transform: translateX(-4px);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.footer-column a:hover {
  color: #16834a;
  transform: translateX(2px);
}

.footer-column a:hover svg {
  opacity: 1;
  transform: translateX(0);
}

/* Bottom */
.footer-bottom {
  border-top: 1px solid #e8eee9;
  background: rgba(248, 251, 249, 0.8);
}

.bottom-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 58px;
}

.copy {
  margin: 0;
  color: #8a948e;
  font-size: 10px;
}

.bottom-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #7c8780;
  font-size: 10px;
  font-weight: 600;
}

.status-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: #edf8f1;
  color: #16834a;
}

.status-icon svg {
  width: 11px;
  height: 11px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Tablet */
@media (max-width: 900px) {
  .footer-inner {
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 32px;
    padding-top: 42px;
    padding-bottom: 36px;
  }

  .footer-brand {
    grid-row: span 2;
  }
}

/* Mobile */
@media (max-width: 650px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
    gap: 30px 24px;
    padding-top: 36px;
    padding-bottom: 32px;
  }

  .footer-brand {
    grid-column: 1 / -1;
    grid-row: auto;
    max-width: 520px;
  }

  .footer-column a {
    max-width: 180px;
  }

  .bottom-inner {
    min-height: 64px;
    padding-top: 12px;
    padding-bottom: 12px;
    flex-direction: column;
    justify-content: center;
    gap: 7px;
    text-align: center;
  }
}

@media (max-width: 420px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .footer-column {
    width: 100%;
  }

  .footer-column a {
    max-width: 100%;
    padding: 6px 0;
  }

  .brand-description {
    font-size: 11px;
  }

  .copy {
    line-height: 1.5;
  }
}

@media (prefers-reduced-motion: reduce) {
  .footer-column a,
  .footer-column a svg {
    transition: none;
  }
}
</style>