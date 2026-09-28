<script setup>
import { reactive, ref } from 'vue'

const form = reactive({ name: '', email: '', message: '' })
const sent = ref(false)

function submit() {
  sent.value = true
}
</script>


<template>
  <main class="contact-page">
    <!-- Hero -->
    <section class="contact-hero">
      <div class="container hero-inner">
        <span class="eyebrow">WE'RE HERE TO HELP</span>

        <h1>
          Let's talk about
          <span class="highlight">how we can help.</span>
        </h1>

        <p class="hero-description">
          Have a question about renting, listing a property, or unlocking
          contact details? Send us a message and our support team can help.
        </p>

        <div class="hero-note">
          <span class="online-dot"></span>
          We're happy to hear from you
        </div>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="container page contact-section">
      <div class="contact-grid">
        <!-- Contact Information -->
        <aside class="contact-sidebar">
          <div class="info-card">
            <span class="eyebrow light-eyebrow">CONTACT INFORMATION</span>

            <h2>Get in touch</h2>

            <p class="info-description">
              Choose a contact method or send us a message using the form.
            </p>

            <div class="contact-methods">
              <a
                class="contact-method"
                href="mailto:support@basavara.com"
              >
                <span class="method-icon">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2"
                      stroke="currentColor" stroke-width="1.7"/>
                    <path d="m4 7 8 6 8-6"
                      stroke="currentColor" stroke-width="1.7"
                      stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>

                <span class="method-copy">
                  <span class="method-label">Email us</span>
                  <strong>support@basavara.com</strong>
                  <small>For questions and support</small>
                </span>

                <span class="method-arrow">↗</span>
              </a>

              <a
                class="contact-method"
                href="tel:+8801700000000"
              >
                <span class="method-icon">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M7 3h3l2 5-2.5 1.7a14 14 0 0 0 4.8 4.8L16 12l5 2v3c0 1.1-.9 2-2 2C10.7 19 5 13.3 5 6c0-1.7.9-3 2-3Z"
                      stroke="currentColor" stroke-width="1.7"
                      stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>

                <span class="method-copy">
                  <span class="method-label">Call us</span>
                  <strong>+880 1700-000000</strong>
                  <small>For direct assistance</small>
                </span>

                <span class="method-arrow">↗</span>
              </a>

              <div class="contact-method">
                <span class="method-icon">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                      stroke="currentColor" stroke-width="1.7"/>
                    <circle cx="12" cy="10" r="2.5"
                      stroke="currentColor" stroke-width="1.7"/>
                  </svg>
                </span>

                <span class="method-copy">
                  <span class="method-label">Our location</span>
                  <strong>Dhaka, Bangladesh</strong>
                  <small>Serving the local rental community</small>
                </span>
              </div>
            </div>

            <div class="sidebar-divider"></div>

            <div class="support-note">
              <span class="support-note-icon">i</span>
              <p>
                Need help with a property listing or contact unlock?
                Include the relevant details in your message.
              </p>
            </div>
          </div>
        </aside>

        <!-- Contact Form -->
        <div class="form-card">
          <div class="form-heading">
            <span class="eyebrow">SEND US A MESSAGE</span>
            <h2>How can we help you?</h2>
            <p class="muted">
              Fill in the details below. Fields marked with
              <span class="required-mark">*</span> are required.
            </p>
          </div>

          <form class="contact-form" @submit.prevent="submit">
            <div class="form-row">
              <label class="field">
                <span class="field-label">
                  Your name <span class="required-mark">*</span>
                </span>

                <input
                  v-model.trim="form.name"
                  class="control"
                  type="text"
                  placeholder="Enter your full name"
                  autocomplete="name"
                  maxlength="100"
                  required
                />
              </label>

              <label class="field">
                <span class="field-label">
                  Email address <span class="required-mark">*</span>
                </span>

                <input
                  v-model.trim="form.email"
                  class="control"
                  type="email"
                  placeholder="you@example.com"
                  autocomplete="email"
                  maxlength="254"
                  required
                />
              </label>
            </div>

            <label class="field">
              <span class="field-label">
                Subject
              </span>

              <select
                v-model="form.subject"
                class="control select-control"
              >
                <option value="" disabled>Select a topic (optional)</option>
                <option value="Rental enquiry">Rental enquiry</option>
                <option value="Property listing">Property listing</option>
                <option value="Contact unlock">Contact unlock / coins</option>
                <option value="Payment support">Payment support</option>
                <option value="Account support">Account support</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label class="field">
              <span class="field-label">
                Your message <span class="required-mark">*</span>
              </span>

              <textarea
                v-model.trim="form.message"
                class="control message-control"
                placeholder="Tell us a little more about how we can help..."
                rows="6"
                minlength="10"
                maxlength="3000"
                required
              ></textarea>

              <span class="character-count">
                {{ (form.message || '').length }} / 3000 characters
              </span>
            </label>

            <button
              class="btn btn-primary submit-btn"
              type="submit"
              :disabled="sending"
            >
              <span>{{ sending ? 'Sending message...' : 'Send message' }}</span>
              <span v-if="!sending" class="submit-arrow">→</span>
            </button>

            <p v-if="sent" class="form-feedback success-message" role="status">
              <span class="feedback-icon">✓</span>
              {{ successMessage }}
            </p>

            <p v-if="errorMessage" class="form-feedback error-message" role="alert">
              {{ errorMessage }}
            </p>

            <p class="privacy-note">
              Please don't include passwords, payment PINs, or other sensitive
              account information in your message.
            </p>
          </form>
        </div>
      </div>
    </section>

    <!-- Bottom Help Section -->
    <section class="container bottom-help">
      <div class="bottom-help-inner">
        <div class="help-icon">?</div>

        <div class="help-copy">
          <h3>Looking for a place to rent?</h3>
          <p class="muted">
            Explore available properties and find a home that suits your needs.
          </p>
        </div>

        <router-link to="/properties" class="btn btn-secondary explore-btn">
          Browse properties <span>→</span>
        </router-link>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Base */
.contact-page {
  width: 100%;
  overflow: clip;
  color: var(--color-text, #1f2937);
}

.contact-page *,
.contact-page *::before,
.contact-page *::after {
  box-sizing: border-box;
}

.contact-page h1,
.contact-page h2,
.contact-page h3,
.contact-page p {
  overflow-wrap: anywhere;
}

.contact-page h2 {
  margin: 0;
  font-size: clamp(1.55rem, 3vw, 2rem);
  line-height: 1.3;
  letter-spacing: -0.04em;
}

.eyebrow {
  display: inline-block;
  margin-bottom: 12px;
  color: var(--color-primary, #16845b);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  line-height: 1.6;
}

/* Hero */
.contact-hero {
  border-bottom: 1px solid #e5eee8;
  background:
    radial-gradient(ellipse at 85% 10%, #e0f3e6 0, transparent 38%),
    linear-gradient(135deg, #f5fbf7, #fff 70%);
}

.hero-inner {
  padding-top: 64px;
  padding-bottom: 62px;
}

.hero-inner h1 {
  max-width: 17ch;
  margin: 0;
  color: #193728;
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.06em;
}

.highlight {
  display: block;
  color: var(--color-primary, #16845b);
}

.hero-description {
  max-width: 58ch;
  margin: 18px 0 20px;
  color: #68786d;
  font-size: 0.98rem;
  line-height: 1.9;
}

.hero-note {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #4c6c58;
  font-size: 0.83rem;
  font-weight: 600;
}

.online-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #24a36a;
  box-shadow: 0 0 0 4px #e3f5e9;
}

/* Main contact section */
.contact-section {
  padding-top: 52px;
  padding-bottom: 48px;
}

.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.35fr);
  align-items: stretch;
  gap: 26px;
}

/* Sidebar */
.contact-sidebar {
  min-width: 0;
}

.info-card {
  height: 100%;
  padding: clamp(24px, 3vw, 34px);
  border: 0;
  border-radius: 18px;
  background: linear-gradient(150deg, #155d3e, #104b33);
  color: #fff;
  box-shadow: 0 14px 35px rgba(19, 84, 53, 0.12);
}

.light-eyebrow {
  color: #b9e6c9;
}

.info-card h2 {
  color: #fff;
}

.info-description {
  margin: 12px 0 28px;
  color: #d5e9dc;
  font-size: 0.9rem;
  line-height: 1.8;
}

.contact-methods {
  display: grid;
  gap: 8px;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 13px;
  min-width: 0;
  padding: 13px 10px;
  border: 1px solid transparent;
  border-radius: 12px;
  color: inherit;
  text-decoration: none;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

a.contact-method:hover {
  border-color: rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.07);
}

.method-icon {
  display: grid;
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  place-items: center;
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.12);
  color: #d7f2e1;
}

.method-icon svg {
  width: 21px;
  height: 21px;
}

.method-copy {
  display: grid;
  min-width: 0;
  gap: 4px;
}

.method-label {
  color: #c4e3cf;
  font-size: 0.75rem;
}

.method-copy strong {
  overflow-wrap: anywhere;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.5;
}

.method-copy small {
  color: #c6dfcf;
  font-size: 0.72rem;
  line-height: 1.5;
}

.method-arrow {
  margin-left: auto;
  color: #c6dfcf;
}

.sidebar-divider {
  height: 1px;
  margin: 24px 0;
  background: rgba(255, 255, 255, 0.16);
}

.support-note {
  display: flex;
  align-items: flex-start;
  gap: 11px;
}

.support-note-icon {
  display: grid;
  width: 23px;
  height: 23px;
  flex: 0 0 23px;
  place-items: center;
  border: 1px solid #a8d7ba;
  border-radius: 50%;
  color: #d4f1df;
  font-size: 0.78rem;
  font-weight: 700;
}

.support-note p {
  margin: 0;
  color: #d1e5d8;
  font-size: 0.78rem;
  line-height: 1.8;
}

/* Form card */
.form-card {
  min-width: 0;
  padding: clamp(24px, 3vw, 38px);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.025);
}

.form-heading {
  margin-bottom: 28px;
}

.form-heading h2 {
  margin-bottom: 9px;
}

.form-heading > p {
  margin: 0;
  font-size: 0.87rem;
  line-height: 1.7;
}

.required-mark {
  color: #d34b4b;
}

.contact-form {
  display: grid;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.field {
  display: grid;
  align-content: start;
  gap: 9px;
  min-width: 0;
}

.field-label {
  color: #37463b;
  font-size: 0.84rem;
  font-weight: 700;
}

.control {
  display: block;
  width: 100%;
  min-width: 0;
  min-height: 48px;
  padding: 12px 14px;
  border: 1px solid #dfe6e1;
  border-radius: 10px;
  outline: none;
  background: #fbfcfb;
  color: #24352a;
  font: inherit;
  font-size: 0.88rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.control::placeholder {
  color: #9aa49d;
}

.control:hover {
  border-color: #bdcec2;
}

.control:focus {
  border-color: var(--color-primary, #16845b);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(22, 132, 91, 0.1);
}

.select-control {
  cursor: pointer;
}

.message-control {
  min-height: 150px;
  resize: vertical;
  line-height: 1.75;
}

.character-count {
  justify-self: end;
  color: #8a958d;
  font-size: 0.73rem;
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  min-height: 49px;
  padding: 13px 20px;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 700;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease,
    box-shadow 0.2s ease;
}

.submit-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 18px rgba(22, 132, 91, 0.18);
}

.submit-btn:disabled {
  cursor: wait;
  opacity: 0.65;
}

.submit-arrow {
  font-size: 1.15rem;
}

.form-feedback {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 0;
  padding: 13px 14px;
  border-radius: 10px;
  font-size: 0.84rem;
  line-height: 1.65;
}

.success-message {
  border: 1px solid #c9e9d3;
  background: #effaf2;
  color: #17633c;
}

.feedback-icon {
  font-weight: 800;
}

.error-message {
  border: 1px solid #f2cccc;
  background: #fff4f4;
  color: #a52e2e;
}

.privacy-note {
  margin: -3px 0 0;
  color: #858f88;
  font-size: 0.75rem;
  line-height: 1.75;
}

/* Bottom help */
.bottom-help {
  padding-top: 0;
  padding-bottom: 64px;
}

.bottom-help-inner {
  display: flex;
  align-items: center;
  gap: 17px;
  padding: 24px 28px;
  border: 1px solid #e5eee7;
  border-radius: 15px;
  background: #f7faf7;
}

.help-icon {
  display: grid;
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  place-items: center;
  border-radius: 13px;
  background: #e4f3e9;
  color: #16845b;
  font-size: 1.2rem;
  font-weight: 800;
}

.help-copy {
  flex: 1;
  min-width: 0;
}

.help-copy h3 {
  margin: 0 0 5px;
  font-size: 0.98rem;
}

.help-copy p {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.7;
}

.explore-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  flex: 0 0 auto;
  min-height: 44px;
  padding: 10px 16px;
  border-radius: 9px;
  text-decoration: none;
}

/* Accessibility */
.contact-page a:focus-visible,
.contact-page button:focus-visible {
  outline: 3px solid #78b99a;
  outline-offset: 4px;
}

/* Tablet */
@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .info-card {
    height: auto;
  }

  .contact-methods {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .contact-method:last-child {
    grid-column: 1 / -1;
  }

  .hero-inner {
    padding-top: 50px;
    padding-bottom: 48px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .hero-inner {
    padding-top: 38px;
    padding-bottom: 36px;
  }

  .hero-inner h1 {
    font-size: clamp(2.2rem, 9vw, 3rem);
  }

  .hero-description {
    font-size: 0.91rem;
  }

  .contact-section {
    padding-top: 30px;
    padding-bottom: 32px;
  }

  .contact-methods {
    grid-template-columns: minmax(0, 1fr);
  }

  .contact-method:last-child {
    grid-column: auto;
  }

  .info-card,
  .form-card {
    padding: 23px 19px;
    border-radius: 14px;
  }

  .form-row {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }

  .bottom-help {
    padding-bottom: 38px;
  }

  .bottom-help-inner {
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 20px;
  }

  .help-copy {
    flex-basis: calc(100% - 65px);
  }

  .explore-btn {
    width: 100%;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .contact-page *,
  .contact-page *::before,
  .contact-page *::after {
    animation: none !important;
    transition: none !important;
  }
}
</style>