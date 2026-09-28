```vue
<template>
  <section class="legal-page">
    <!-- Hero -->
    <div class="legal-hero">
      <div class="container hero-inner">
        <div class="hero-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3L19 6.5V11.5C19 16.2 16.05 19.8 12 21C7.95 19.8 5 16.2 5 11.5V6.5L12 3Z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"
            />
            <path
              d="M9.5 12L11.2 13.7L14.8 10.1"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div>
          <span class="eyebrow">BASA VARA</span>
          <h1>Privacy Policy</h1>
          <p>
            Your privacy matters to us. Learn how Basa Vara collects,
            uses, protects, and handles your information.
          </p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="container legal-container">
      <div class="content-card">

        <div class="intro-box">
          <div class="intro-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                stroke-width="1.8"
              />
              <path
                d="M12 10.5V16"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
              <circle cx="12" cy="7.5" r="1" fill="currentColor" />
            </svg>
          </div>

          <div>
            <h2>Your privacy at a glance</h2>
            <p>
              Basa Vara collects only the information reasonably needed to
              provide and improve the rental marketplace experience.
            </p>
          </div>
        </div>

        <section class="policy-section">
          <div class="section-number">01</div>
          <div class="section-content">
            <h2>Information We Collect</h2>
            <p>
              We may collect information needed to operate the platform,
              including account details, property listing information,
              communication data, and payment-related metadata.
            </p>

            <div class="info-grid">
              <div class="info-item">
                <span class="info-icon">👤</span>
                <div>
                  <h3>Account Information</h3>
                  <p>
                    Information associated with creating and managing your
                    Basa Vara account.
                  </p>
                </div>
              </div>

              <div class="info-item">
                <span class="info-icon">🏠</span>
                <div>
                  <h3>Listing Information</h3>
                  <p>
                    Property details submitted by landlords for rental
                    listings.
                  </p>
                </div>
              </div>

              <div class="info-item">
                <span class="info-icon">💬</span>
                <div>
                  <h3>Communication Data</h3>
                  <p>
                    Information related to conversations and interactions
                    through the platform.
                  </p>
                </div>
              </div>

              <div class="info-item">
                <span class="info-icon">💳</span>
                <div>
                  <h3>Payment Metadata</h3>
                  <p>
                    Relevant transaction information required to process
                    platform-related actions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="policy-section">
          <div class="section-number">02</div>
          <div class="section-content">
            <h2>How We Use Information</h2>
            <p>
              Information collected through Basa Vara may be used to operate
              the marketplace, manage accounts and listings, facilitate
              communication, improve platform functionality, and maintain
              platform security.
            </p>

            <ul class="policy-list">
              <li>
                <span>✓</span>
                <p>Provide and maintain the Basa Vara platform.</p>
              </li>
              <li>
                <span>✓</span>
                <p>Manage user accounts and property listings.</p>
              </li>
              <li>
                <span>✓</span>
                <p>Support communication between users where applicable.</p>
              </li>
              <li>
                <span>✓</span>
                <p>Improve reliability, security, and user experience.</p>
              </li>
            </ul>
          </div>
        </section>

        <section class="policy-section">
          <div class="section-number">03</div>
          <div class="section-content">
            <h2>Landlord Contact Data</h2>

            <div class="notice-box">
              <div class="notice-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect
                    x="5"
                    y="3"
                    width="14"
                    height="18"
                    rx="2"
                    stroke="currentColor"
                    stroke-width="1.8"
                  />
                  <path
                    d="M9 7H15M9 11H15M10 16H14"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                  />
                </svg>
              </div>

              <div>
                <h3>Contact information is not public by default</h3>
                <p>
                  Landlord contact information is kept private by default.
                  Where the platform requires an unlock action, the contact
                  information is revealed only after the applicable action
                  has been confirmed and the platform verifies the required
                  account balance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="policy-section">
          <div class="section-number">04</div>
          <div class="section-content">
            <h2>Security</h2>
            <p>
              We use standard application safeguards designed to protect user
              information from unauthorized access, alteration, or disclosure.
              Access to private contact information is handled through the
              application's access controls rather than exposing it publicly
              in the page markup.
            </p>

            <div class="security-points">
              <div>
                <strong>Protected Access</strong>
                <span>Private information is intended to remain restricted.</span>
              </div>

              <div>
                <strong>Controlled Disclosure</strong>
                <span>Contact information is not displayed publicly by default.</span>
              </div>

              <div>
                <strong>Platform Safeguards</strong>
                <span>Standard application security practices are applied.</span>
              </div>
            </div>
          </div>
        </section>

        <section class="policy-section last-section">
          <div class="section-number">05</div>
          <div class="section-content">
            <h2>Your Responsibility</h2>
            <p>
              Users should keep their account credentials secure and avoid
              sharing passwords or other sensitive account information with
              third parties. If you believe your account has been accessed
              without authorization, contact the platform support team.
            </p>
          </div>
        </section>

        <div class="policy-footer">
          <div class="footer-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3L19 6.5V11.5C19 16.2 16.05 19.8 12 21C7.95 19.8 5 16.2 5 11.5V6.5L12 3Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div>
            <strong>Your privacy is important to Basa Vara.</strong>
            <p>
              We aim to handle your information responsibly while providing
              a useful rental marketplace.
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* ================================
   PAGE
================================ */

.legal-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 8% 0%, rgba(5, 150, 105, 0.08), transparent 28%),
    radial-gradient(circle at 92% 12%, rgba(16, 185, 129, 0.06), transparent 25%),
    #f7faf9;
  color: #17211d;
  padding-bottom: 70px;
}

/* ================================
   HERO
================================ */

.legal-hero {
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(
      135deg,
      #064e3b 0%,
      #047857 55%,
      #059669 100%
    );
  color: #fff;
  padding: 68px 20px 76px;
}

.legal-hero::before,
.legal-hero::after {
  content: "";
  position: absolute;
  border-radius: 999px;
  pointer-events: none;
}

.legal-hero::before {
  width: 280px;
  height: 280px;
  right: -100px;
  top: -150px;
  background: rgba(255, 255, 255, 0.07);
}

.legal-hero::after {
  width: 190px;
  height: 190px;
  left: -80px;
  bottom: -110px;
  background: rgba(255, 255, 255, 0.05);
}

.container {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
}

.hero-inner {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 24px;
  animation: heroEnter 0.65s ease both;
}

.hero-icon {
  width: 72px;
  height: 72px;
  flex: 0 0 72px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.12);
}

.hero-icon svg {
  width: 36px;
  height: 36px;
}

.eyebrow {
  display: inline-block;
  margin-bottom: 9px;
  color: #a7f3d0;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.legal-hero h1 {
  margin: 0;
  font-size: clamp(34px, 5vw, 52px);
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.legal-hero p {
  max-width: 680px;
  margin: 15px 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 16px;
  line-height: 1.75;
}

/* ================================
   CONTENT CARD
================================ */

.legal-container {
  position: relative;
  margin-top: -34px;
  z-index: 2;
}

.content-card {
  overflow: hidden;
  border: 1px solid #e1ebe6;
  border-radius: 28px;
  background: #fff;
  box-shadow:
    0 24px 70px rgba(15, 23, 42, 0.09),
    0 4px 14px rgba(15, 23, 42, 0.04);
  animation: cardEnter 0.7s 0.08s ease both;
}

/* ================================
   INTRO
================================ */

.intro-box {
  display: flex;
  gap: 18px;
  margin: 30px;
  padding: 22px;
  border: 1px solid #d9eee6;
  border-radius: 18px;
  background: linear-gradient(135deg, #f0fdf8, #f8fffc);
}

.intro-icon {
  width: 46px;
  height: 46px;
  flex: 0 0 46px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  color: #047857;
  background: #dff8ed;
}

.intro-icon svg {
  width: 25px;
  height: 25px;
}

.intro-box h2 {
  margin: 0 0 6px;
  color: #064e3b;
  font-size: 18px;
}

.intro-box p {
  margin: 0;
  color: #60736b;
  font-size: 14px;
  line-height: 1.7;
}

/* ================================
   POLICY SECTIONS
================================ */

.policy-section {
  display: grid;
  grid-template-columns: 68px minmax(0, 1fr);
  gap: 20px;
  padding: 34px 38px;
  border-top: 1px solid #edf1ef;
}

.section-number {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  color: #047857;
  background: #ecfdf5;
  border: 1px solid #d1fae5;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.section-content h2 {
  margin: 0 0 10px;
  color: #17211d;
  font-size: 23px;
  letter-spacing: -0.02em;
}

.section-content > p {
  max-width: 850px;
  margin: 0;
  color: #61716a;
  font-size: 15px;
  line-height: 1.85;
}

/* ================================
   INFORMATION GRID
================================ */

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 22px;
}

.info-item {
  display: flex;
  gap: 13px;
  padding: 17px;
  border: 1px solid #e5ece9;
  border-radius: 16px;
  background: #fbfdfc;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.info-item:hover {
  transform: translateY(-3px);
  border-color: #c6e8db;
  box-shadow: 0 12px 25px rgba(5, 150, 105, 0.07);
}

.info-icon {
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: #ecfdf5;
  font-size: 17px;
}

.info-item h3 {
  margin: 0 0 4px;
  color: #26352f;
  font-size: 14px;
}

.info-item p {
  margin: 0;
  color: #71817a;
  font-size: 13px;
  line-height: 1.6;
}

/* ================================
   LIST
================================ */

.policy-list {
  display: grid;
  gap: 11px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.policy-list li {
  display: flex;
  align-items: flex-start;
  gap: 11px;
}

.policy-list li > span {
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
  display: grid;
  place-items: center;
  margin-top: 1px;
  border-radius: 50%;
  background: #dff8ed;
  color: #047857;
  font-size: 12px;
  font-weight: 800;
}

.policy-list p {
  margin: 0;
  color: #5f7169;
  font-size: 14px;
  line-height: 1.65;
}

/* ================================
   NOTICE
================================ */

.notice-box {
  display: flex;
  gap: 15px;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #d9eee6;
  border-left: 4px solid #059669;
  border-radius: 15px;
  background: #f3fcf8;
}

.notice-icon {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: #047857;
  background: #dff8ed;
}

.notice-icon svg {
  width: 23px;
  height: 23px;
}

.notice-box h3 {
  margin: 0 0 6px;
  color: #14532d;
  font-size: 15px;
}

.notice-box p {
  margin: 0;
  color: #60736b;
  font-size: 14px;
  line-height: 1.75;
}

/* ================================
   SECURITY
================================ */

.security-points {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 22px;
}

.security-points > div {
  padding: 16px;
  border: 1px solid #e5ece9;
  border-radius: 14px;
  background: #fbfdfc;
}

.security-points strong,
.security-points span {
  display: block;
}

.security-points strong {
  margin-bottom: 5px;
  color: #26352f;
  font-size: 13px;
}

.security-points span {
  color: #73817b;
  font-size: 12px;
  line-height: 1.6;
}

/* ================================
   FOOTER
================================ */

.last-section {
  padding-bottom: 38px;
}

.policy-footer {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 0 30px 30px;
  padding: 21px;
  border-radius: 18px;
  background: #064e3b;
  color: #fff;
}

.footer-icon {
  width: 43px;
  height: 43px;
  flex: 0 0 43px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: #a7f3d0;
  background: rgba(255, 255, 255, 0.1);
}

.footer-icon svg {
  width: 23px;
  height: 23px;
}

.policy-footer strong {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
}

.policy-footer p {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  line-height: 1.6;
}

/* ================================
   ANIMATIONS
================================ */

@keyframes heroEnter {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateY(25px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ================================
   RESPONSIVE
================================ */

@media (max-width: 760px) {
  .legal-hero {
    padding: 48px 20px 65px;
  }

  .hero-inner {
    align-items: flex-start;
  }

  .hero-icon {
    width: 60px;
    height: 60px;
    flex-basis: 60px;
    border-radius: 18px;
  }

  .hero-icon svg {
    width: 30px;
    height: 30px;
  }

  .legal-container {
    margin-top: -25px;
  }

  .content-card {
    border-radius: 22px;
  }

  .policy-section {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 28px 24px;
  }

  .info-grid,
  .security-points {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .container {
    width: min(100% - 24px, 1180px);
  }

  .legal-page {
    padding-bottom: 35px;
  }

  .legal-hero {
    padding: 38px 12px 58px;
  }

  .hero-inner {
    gap: 15px;
  }

  .hero-icon {
    width: 52px;
    height: 52px;
    flex-basis: 52px;
    border-radius: 15px;
  }

  .hero-icon svg {
    width: 26px;
    height: 26px;
  }

  .legal-hero h1 {
    font-size: 34px;
  }

  .legal-hero p {
    font-size: 14px;
    line-height: 1.65;
  }

  .intro-box {
    margin: 18px;
    padding: 17px;
    gap: 12px;
  }

  .intro-icon {
    width: 40px;
    height: 40px;
    flex-basis: 40px;
  }

  .intro-box h2 {
    font-size: 16px;
  }

  .intro-box p {
    font-size: 13px;
  }

  .policy-section {
    padding: 25px 18px;
  }

  .section-number {
    width: 40px;
    height: 40px;
  }

  .section-content h2 {
    font-size: 20px;
  }

  .section-content > p {
    font-size: 14px;
    line-height: 1.75;
  }

  .notice-box {
    padding: 16px;
  }

  .policy-footer {
    margin: 0 18px 18px;
    padding: 17px;
  }
}

@media (max-width: 380px) {
  .legal-hero h1 {
    font-size: 29px;
  }

  .hero-inner {
    align-items: flex-start;
  }

  .hero-icon {
    display: none;
  }

  .info-item {
    padding: 14px;
  }
}

/* ================================
   REDUCED MOTION
================================ */

@media (prefers-reduced-motion: reduce) {
  .hero-inner,
  .content-card {
    animation: none;
  }

  .info-item {
    transition: none;
  }
}
</style>
