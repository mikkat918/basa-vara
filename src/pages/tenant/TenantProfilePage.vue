<script setup>
import { useAuthStore } from '../../stores/authStore'

const auth = useAuthStore()
</script>

```vue
<template>
  <div class="page profile-page">
    <!-- Header -->
    <header class="profile-header">
      <div>
        <span class="eyebrow">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2.75a9.25 9.25 0 1 0 9.25 9.25A9.26 9.26 0 0 0 12 2.75Zm0 4a2.5 2.5 0 1 1-2.5 2.5A2.5 2.5 0 0 1 12 6.75Zm4.75 10.1a6.36 6.36 0 0 1-9.5 0V15.8c0-1.38 2.12-2.55 4.75-2.55s4.75 1.17 4.75 2.55v1.05Z"
            />
          </svg>
          Account
        </span>

        <h1>Profile</h1>

        <p class="subtitle">
          View your account information and personal details.
        </p>
      </div>

      <div class="profile-badge">
        <span class="online-dot"></span>
        Account active
      </div>
    </header>

    <!-- Profile Card -->
    <section class="profile-card">
      <div class="profile-intro">
        <div class="avatar">
          {{
            (auth.user?.name || "U")
              .split(" ")
              .map((part) => part.charAt(0))
              .slice(0, 2)
              .join("")
              .toUpperCase()
          }}
        </div>

        <div class="intro-copy">
          <h2>{{ auth.user?.name || "User" }}</h2>
          <p>{{ auth.user?.email || "No email available" }}</p>

          <span class="role-badge">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2.75 19 5.5v5.8c0 4.7-2.9 8.1-7 9.95-4.1-1.85-7-5.25-7-9.95V5.5l7-2.75Zm0 4.1-3.5 1.4v3.05c0 3.35 1.88 5.85 3.5 6.85 1.62-1 3.5-3.5 3.5-6.85V8.25L12 6.85Z"
              />
            </svg>
            {{ auth.user?.role || "User" }}
          </span>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Account Information -->
      <div class="section-heading">
        <div>
          <span class="section-label">Personal information</span>
          <h3>Account details</h3>
        </div>
      </div>

      <div class="details-grid">
        <div class="detail-item">
          <div class="detail-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 1.5c-4.05 0-7 2.2-7 5.25v.75h14v-.75c0-3.05-2.95-5.25-7-5.25Z"
              />
            </svg>
          </div>

          <div>
            <span class="detail-label">Full name</span>
            <strong>{{ auth.user?.name || "Not provided" }}</strong>
          </div>
        </div>

        <div class="detail-item">
          <div class="detail-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4.5 5.25h15A2.25 2.25 0 0 1 21.75 7.5v9A2.25 2.25 0 0 1 19.5 18.75h-15a2.25 2.25 0 0 1-2.25-2.25v-9A2.25 2.25 0 0 1 4.5 5.25Zm0 2.25v.45L12 12.5l7.5-4.55V7.5h-15Zm15 9v-6.08l-7.5 4.55-7.5-4.55v6.08h15Z"
              />
            </svg>
          </div>

          <div>
            <span class="detail-label">Email address</span>
            <strong>{{ auth.user?.email || "Not provided" }}</strong>
          </div>
        </div>

        <div class="detail-item">
          <div class="detail-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M7.1 3.5h2.25c.55 0 1.02.4 1.11.94l.5 3.02c.08.46-.13.92-.53 1.16L8.8 9.76a13.45 13.45 0 0 0 5.44 5.44l1.14-1.63c.24-.4.7-.61 1.16-.53l3.02.5c.54.09.94.56.94 1.11v2.25c0 .61-.49 1.1-1.1 1.1C10.6 18 6 13.4 6 7.1c0-.61.49-1.1 1.1-1.1Z"
              />
            </svg>
          </div>

          <div>
            <span class="detail-label">Phone number</span>
            <strong>{{ auth.user?.phone || "Not provided" }}</strong>
          </div>
        </div>

        <div class="detail-item">
          <div class="detail-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2.75 19 5.5v5.8c0 4.7-2.9 8.1-7 9.95-4.1-1.85-7-5.25-7-9.95V5.5l7-2.75Zm0 4.1-3.5 1.4v3.05c0 3.35 1.88 5.85 3.5 6.85 1.62-1 3.5-3.5 3.5-6.85V8.25L12 6.85Z"
              />
            </svg>
          </div>

          <div>
            <span class="detail-label">Account role</span>
            <strong>{{ auth.user?.role || "Not provided" }}</strong>
          </div>
        </div>
      </div>

      <div class="profile-note">
        <div class="note-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2.75a9.25 9.25 0 1 0 9.25 9.25A9.26 9.26 0 0 0 12 2.75Zm0 4a1.15 1.15 0 1 1-1.15 1.15A1.15 1.15 0 0 1 12 6.75Zm1.1 10.5h-2.2v-6h2.2v6Z"
            />
          </svg>
        </div>

        <p>
          Keep your account information up to date so your rental experience
          stays smooth and secure.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.profile-page {
  min-height: 100%;
  box-sizing: border-box;
  padding: clamp(22px, 3vw, 42px);
  background:
    radial-gradient(
      circle at 94% 0%,
      rgba(24, 148, 103, 0.08),
      transparent 30%
    ),
    radial-gradient(
      circle at 0% 100%,
      rgba(24, 148, 103, 0.05),
      transparent 28%
    ),
    #f6f8f7;
}

/* Header */
.profile-header {
  width: min(100%, 1100px);
  margin: 0 auto 24px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 9px;
  color: #17845f;
  font-size: 0.73rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.eyebrow svg {
  width: 15px;
  height: 15px;
  fill: currentColor;
}

.profile-header h1 {
  margin: 0;
  color: #17231e;
  font-size: clamp(1.8rem, 3vw, 2.45rem);
  line-height: 1.1;
  font-weight: 820;
  letter-spacing: -0.04em;
}

.subtitle {
  margin: 9px 0 0;
  color: #6c7772;
  font-size: 0.95rem;
  line-height: 1.6;
}

.profile-badge {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid rgba(23, 132, 95, 0.13);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.86);
  color: #176f53;
  font-size: 0.82rem;
  font-weight: 750;
  box-shadow: 0 5px 18px rgba(26, 48, 39, 0.045);
  white-space: nowrap;
}

.online-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1a9a6a;
  box-shadow: 0 0 0 4px rgba(26, 154, 106, 0.1);
}

/* Main card */
.profile-card {
  width: min(100%, 1100px);
  margin: 0 auto;
  box-sizing: border-box;
  padding: clamp(22px, 3vw, 34px);
  border: 1px solid rgba(22, 37, 31, 0.07);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow:
    0 18px 50px rgba(24, 42, 35, 0.055),
    0 2px 8px rgba(24, 42, 35, 0.025);
}

/* Intro */
.profile-intro {
  display: flex;
  align-items: center;
  gap: 18px;
}

.avatar {
  width: 76px;
  height: 76px;
  flex: 0 0 76px;
  display: grid;
  place-items: center;
  border-radius: 22px;
  background: linear-gradient(135deg, #17845f, #1a9a6a);
  color: #fff;
  font-size: 1.45rem;
  font-weight: 820;
  letter-spacing: -0.03em;
  box-shadow: 0 10px 24px rgba(23, 132, 95, 0.2);
}

.intro-copy {
  min-width: 0;
}

.intro-copy h2 {
  margin: 0;
  color: #17231e;
  font-size: 1.35rem;
  font-weight: 800;
}

.intro-copy p {
  margin: 5px 0 10px;
  color: #77827c;
  font-size: 0.88rem;
  overflow-wrap: anywhere;
}

.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 9px;
  border-radius: 999px;
  background: rgba(23, 132, 95, 0.08);
  color: #177553;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: capitalize;
}

.role-badge svg {
  width: 13px;
  height: 13px;
  fill: currentColor;
}

/* Divider */
.divider {
  height: 1px;
  margin: 28px 0;
  background: #edf1ef;
}

/* Section */
.section-heading {
  margin-bottom: 16px;
}

.section-label {
  display: block;
  margin-bottom: 4px;
  color: #17845f;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.section-heading h3 {
  margin: 0;
  color: #1d2a24;
  font-size: 1.05rem;
  font-weight: 780;
}

/* Details */
.details-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.detail-item {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 16px;
  border: 1px solid #edf1ef;
  border-radius: 14px;
  background: #fbfcfc;
}

.detail-icon {
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: rgba(23, 132, 95, 0.08);
  color: #17845f;
}

.detail-icon svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.detail-item > div:last-child {
  min-width: 0;
}

.detail-label {
  display: block;
  margin-bottom: 4px;
  color: #8a948f;
  font-size: 0.69rem;
  font-weight: 700;
}

.detail-item strong {
  display: block;
  overflow-wrap: anywhere;
  color: #26332d;
  font-size: 0.87rem;
  font-weight: 750;
  line-height: 1.45;
}

/* Note */
.profile-note {
  margin-top: 20px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 11px;
  border: 1px solid rgba(23, 132, 95, 0.1);
  border-radius: 13px;
  background: rgba(23, 132, 95, 0.045);
}

.note-icon {
  width: 30px;
  height: 30px;
  flex: 0 0 30px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: rgba(23, 132, 95, 0.09);
  color: #17845f;
}

.note-icon svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.profile-note p {
  margin: 0;
  color: #607068;
  font-size: 0.78rem;
  line-height: 1.55;
}

/* Responsive */
@media (max-width: 800px) {
  .profile-page {
    padding: 24px 18px;
  }

  .profile-header {
    display: grid;
    gap: 14px;
  }

  .profile-badge {
    justify-self: start;
  }
}

@media (max-width: 650px) {
  .details-grid {
    grid-template-columns: 1fr;
  }

  .profile-card {
    padding: 22px 18px;
    border-radius: 17px;
  }
}

@media (max-width: 480px) {
  .profile-page {
    padding: 18px 14px 28px;
  }

  .profile-header h1 {
    font-size: 1.7rem;
  }

  .subtitle {
    font-size: 0.88rem;
  }

  .profile-card {
    padding: 20px 15px;
  }

  .profile-intro {
    align-items: flex-start;
  }

  .avatar {
    width: 62px;
    height: 62px;
    flex-basis: 62px;
    border-radius: 18px;
    font-size: 1.15rem;
  }

  .intro-copy h2 {
    font-size: 1.1rem;
  }

  .detail-item {
    padding: 13px;
  }
}

@media (max-width: 380px) {
  .profile-page {
    padding: 14px 10px 22px;
  }

  .profile-intro {
    gap: 12px;
  }

  .avatar {
    width: 54px;
    height: 54px;
    flex-basis: 54px;
    border-radius: 15px;
    font-size: 1rem;
  }

  .profile-note {
    align-items: flex-start;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .profile-page *,
  .profile-page *::before,
  .profile-page *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>