```vue
<template>
  <section class="terms-page">

    <div class="terms-background">
      <div class="bg-glow bg-glow-one"></div>
      <div class="bg-glow bg-glow-two"></div>
    </div>

    <div class="terms-container">

      <!-- Header -->
      <header class="terms-header">

        <div class="legal-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <path d="M14 2v6h6"></path>
            <path d="M8 13h8"></path>
            <path d="M8 17h6"></path>
            <path d="M8 9h2"></path>
          </svg>
        </div>

        <span class="eyebrow">BASA VARA · LEGAL</span>

        <h1>Terms and conditions</h1>

        <p>
          These terms explain the basic rules for using Basa Vara,
          publishing rental listings, and accessing landlord contact information.
        </p>

      </header>

      <!-- Content -->
      <main class="terms-card">

        <div class="last-updated">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M12 7v5l3 2"></path>
          </svg>

          <span>Please review these terms before using the platform.</span>
        </div>

        <!-- Introduction -->
        <section class="terms-section">
          <div class="section-number">01</div>

          <div class="section-content">
            <h2>Using Basa Vara</h2>

            <p>
              By using Basa Vara, you agree to provide accurate information
              and follow our marketplace rules. Listings must be truthful and
              listings or user conduct that violates community standards may
              be moderated.
            </p>
          </div>
        </section>

        <!-- Listings -->
        <section class="terms-section">
          <div class="section-number">02</div>

          <div class="section-content">
            <h2>Rental listings</h2>

            <p>
              Landlords are responsible for the content of their listings.
              Basa Vara reviews submissions for moderation and may reject
              incomplete or deceptive advertisements.
            </p>

            <div class="info-note">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path d="M12 3 4 6v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-3z"></path>
                <path d="M12 8v4"></path>
                <path d="M12 15h.01"></path>
              </svg>

              <span>
                Property information should accurately represent the rental
                being offered.
              </span>
            </div>
          </div>
        </section>

        <!-- Contact unlock -->
        <section class="terms-section">
          <div class="section-number">03</div>

          <div class="section-content">
            <h2>Contact unlocks</h2>

            <p>
              Contact information is unlocked through a coin-based system.
              Coins are used for the specific unlock and are not a substitute
              for a payment or legal contract.
            </p>

            <div class="coin-note">
              <div class="coin-icon">
                <span>৳</span>
              </div>

              <div>
                <strong>Coin-based access</strong>
                <span>
                  Coins are used to unlock landlord contact information.
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- General -->
        <section class="terms-section">
          <div class="section-number">04</div>

          <div class="section-content">
            <h2>Responsible use</h2>

            <p>
              Users are expected to use the platform responsibly and respect
              other members of the Basa Vara community. Information provided
              through the platform should be used only for legitimate rental
              purposes.
            </p>
          </div>
        </section>

        <!-- Footer note -->
        <div class="terms-footer">
          <div class="footer-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="m8.5 12 2.2 2.2 4.8-5"></path>
            </svg>
          </div>

          <div>
            <strong>Use Basa Vara responsibly</strong>
            <p>
              Keeping listings and account information accurate helps maintain
              a useful rental marketplace for everyone.
            </p>
          </div>
        </div>

      </main>

    </div>
  </section>
</template>

<style scoped>
/* =========================
   PAGE
========================= */

.terms-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  background:
    radial-gradient(
      circle at 10% 10%,
      rgba(16, 185, 129, 0.10),
      transparent 30%
    ),
    radial-gradient(
      circle at 90% 90%,
      rgba(5, 150, 105, 0.07),
      transparent 30%
    ),
    #f7faf9;
}

.terms-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-glow {
  position: absolute;

  width: 360px;
  height: 360px;

  border-radius: 50%;
  filter: blur(80px);

  opacity: 0.28;
}

.bg-glow-one {
  top: -180px;
  left: -120px;
  background: rgba(16, 185, 129, 0.15);
}

.bg-glow-two {
  right: -150px;
  bottom: -180px;
  background: rgba(5, 150, 105, 0.12);
}

/* =========================
   CONTAINER
========================= */

.terms-container {
  position: relative;
  z-index: 1;

  width: min(920px, calc(100% - 40px));

  margin: 0 auto;
  padding: 60px 0 80px;

  box-sizing: border-box;
}

/* =========================
   HEADER
========================= */

.terms-header {
  max-width: 760px;
  margin: 0 auto 34px;
  text-align: center;
}

.legal-icon {
  display: grid;
  place-items: center;

  width: 56px;
  height: 56px;

  margin: 0 auto 18px;

  border: 1px solid rgba(5, 150, 105, 0.18);
  border-radius: 16px;

  color: #059669;
  background: rgba(255, 255, 255, 0.82);

  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.05);
}

.legal-icon svg {
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

.terms-header h1 {
  margin: 0;

  color: #17211d;

  font-size: clamp(34px, 5vw, 52px);
  line-height: 1.05;
  letter-spacing: -0.045em;
}

.terms-header > p {
  max-width: 650px;

  margin: 16px auto 0;

  color: #64748b;

  font-size: 14px;
  line-height: 1.75;
}

/* =========================
   CARD
========================= */

.terms-card {
  padding: 34px;

  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 24px;

  background: rgba(255, 255, 255, 0.95);

  box-shadow:
    0 25px 70px rgba(15, 23, 42, 0.07),
    0 4px 12px rgba(15, 23, 42, 0.025);

  backdrop-filter: blur(16px);
}

/* =========================
   TOP NOTE
========================= */

.last-updated {
  display: flex;
  align-items: center;
  gap: 9px;

  margin-bottom: 30px;
  padding: 12px 14px;

  border-radius: 12px;

  color: #64748b;
  background: #f8fafc;

  font-size: 12px;
}

.last-updated svg {
  width: 17px;
  height: 17px;
  flex-shrink: 0;

  color: #059669;
}

/* =========================
   SECTIONS
========================= */

.terms-section {
  display: grid;
  grid-template-columns: 46px minmax(0, 1fr);

  gap: 18px;

  padding: 25px 0;

  border-bottom: 1px solid #edf1ef;
}

.terms-section:first-of-type {
  padding-top: 0;
}

.section-number {
  display: grid;
  place-items: center;

  width: 36px;
  height: 36px;

  border-radius: 10px;

  color: #059669;
  background: #eaf8f3;

  font-size: 11px;
  font-weight: 800;
}

.section-content {
  min-width: 0;
}

.section-content h2 {
  margin: 0 0 9px;

  color: #17211d;

  font-size: 18px;
  letter-spacing: -0.02em;
}

.section-content p {
  margin: 0;

  color: #64748b;

  font-size: 13px;
  line-height: 1.8;
}

/* =========================
   INFO NOTE
========================= */

.info-note {
  display: flex;
  align-items: flex-start;
  gap: 9px;

  margin-top: 15px;
  padding: 12px 13px;

  border: 1px solid #dcefe7;
  border-radius: 11px;

  color: #39745f;
  background: #f3fbf7;

  font-size: 11px;
  line-height: 1.55;
}

.info-note svg {
  width: 17px;
  height: 17px;
  flex-shrink: 0;

  color: #059669;
}

/* =========================
   COIN NOTE
========================= */

.coin-note {
  display: flex;
  align-items: center;
  gap: 11px;

  margin-top: 15px;
  padding: 13px;

  border: 1px solid #e5e7eb;
  border-radius: 13px;

  background: #fafafa;
}

.coin-icon {
  display: grid;
  place-items: center;

  width: 38px;
  height: 38px;
  flex-shrink: 0;

  border-radius: 50%;

  color: #ffffff;
  background: #059669;

  font-size: 17px;
  font-weight: 800;
}

.coin-note div:last-child {
  display: grid;
  gap: 2px;
}

.coin-note strong {
  color: #334155;
  font-size: 12px;
}

.coin-note span {
  color: #64748b;
  font-size: 11px;
}

/* =========================
   FOOTER
========================= */

.terms-footer {
  display: flex;
  align-items: flex-start;
  gap: 13px;

  margin-top: 28px;
  padding: 17px;

  border-radius: 14px;

  background: #f0fbf7;
}

.footer-icon {
  display: grid;
  place-items: center;

  width: 35px;
  height: 35px;
  flex-shrink: 0;

  border-radius: 10px;

  color: #059669;
  background: #dff7ed;
}

.footer-icon svg {
  width: 18px;
  height: 18px;
}

.terms-footer strong {
  display: block;

  margin-bottom: 4px;

  color: #1e293b;
  font-size: 12px;
}

.terms-footer p {
  margin: 0;

  color: #64748b;

  font-size: 11px;
  line-height: 1.6;
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 700px) {
  .terms-container {
    width: min(100% - 24px, 620px);

    padding-top: 32px;
    padding-bottom: 50px;
  }

  .terms-header h1 {
    font-size: 36px;
  }

  .terms-header > p {
    font-size: 13px;
  }

  .terms-card {
    padding: 24px 19px;
    border-radius: 19px;
  }

  .terms-section {
    grid-template-columns: 38px minmax(0, 1fr);
    gap: 12px;
    padding: 21px 0;
  }

  .section-number {
    width: 32px;
    height: 32px;
    font-size: 10px;
  }
}

@media (max-width: 450px) {
  .terms-container {
    width: calc(100% - 16px);
  }

  .terms-header h1 {
    font-size: 31px;
  }

  .terms-card {
    padding: 20px 15px;
  }

  .last-updated {
    align-items: flex-start;
  }

  .terms-section {
    grid-template-columns: 1fr;
  }

  .section-number {
    margin-bottom: 2px;
  }

  .section-content h2 {
    font-size: 17px;
  }

  .section-content p {
    font-size: 12px;
  }

  .coin-note {
    align-items: flex-start;
  }
}

/* =========================
   REDUCED MOTION
========================= */

@media (prefers-reduced-motion: reduce) {
  .terms-page *,
  .terms-page *::before,
  .terms-page *::after {
    transition: none !important;
    animation: none !important;
  }
}
</style>