<script setup>
const profile = {
  name: 'Nabil Ahmed',
  email: 'nabil@example.com',
  phone: '+8801712345678',
  company: 'Basa Vara Homes',
}
</script>

```vue id="profile-page"
<template>
  <div class="page">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <span class="eyebrow">Account settings</span>
        <h1>Profile</h1>
        <p class="subtitle">
          Manage and review your personal account information.
        </p>
      </div>

      <div class="profile-badge">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle
            cx="12"
            cy="8"
            r="3.2"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
          />
          <path
            d="M5.5 20c.7-3.5 3-5.4 6.5-5.4s5.8 1.9 6.5 5.4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
          />
        </svg>
        <span>My profile</span>
      </div>
    </div>

    <!-- Profile Card -->
    <div class="card panel">
      <!-- Profile Intro -->
      <div class="profile-intro">
        <div class="avatar">
          {{ profile.name?.charAt(0)?.toUpperCase() || "U" }}
        </div>

        <div class="intro-content">
          <span class="section-eyebrow">Personal information</span>
          <h2>{{ profile.name || "User profile" }}</h2>
          <p>
            Your account details are shown below.
          </p>
        </div>
      </div>

      <!-- Information List -->
      <div class="profile-details">
        <div class="row">
          <div class="field-info">
            <div class="field-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle
                  cx="12"
                  cy="8"
                  r="3.2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                />
                <path
                  d="M5.5 20c.7-3.5 3-5.4 6.5-5.4s5.8 1.9 6.5 5.4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div>
              <span class="label">Full name</span>
              <strong>{{ profile.name }}</strong>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="field-info">
            <div class="field-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect
                  x="3.5"
                  y="5"
                  width="17"
                  height="14"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                />
                <path
                  d="m5.5 7 6.5 5 6.5-5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div>
              <span class="label">Email address</span>
              <strong>{{ profile.email }}</strong>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="field-info">
            <div class="field-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M7.2 4.5h2.3l1.1 3.1-1.6 1.4a14.4 14.4 0 0 0 6 6l1.4-1.6 3.1 1.1v2.3c0 1-.8 1.8-1.8 1.8C11.4 18.6 5.4 12.6 5.4 5.3c0-1 .8-1.8 1.8-1.8Z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div>
              <span class="label">Phone number</span>
              <strong>{{ profile.phone }}</strong>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="field-info">
            <div class="field-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 20V7.5L12 4l8 3.5V20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 20v-5h8v5M7 9h10"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.7"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div>
              <span class="label">Company</span>
              <strong>{{ profile.company }}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Note -->
      <div class="profile-note">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle
            cx="12"
            cy="12"
            r="8.5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
          />
          <path
            d="M12 10.5v5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
          />
          <circle cx="12" cy="7.5" r="1" fill="currentColor" />
        </svg>

        <span>
          Keep your profile information accurate and up to date.
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: clamp(20px, 3vw, 40px);
  background:
    radial-gradient(
      circle at 88% 4%,
      rgba(16, 185, 129, 0.08),
      transparent 28%
    ),
    radial-gradient(
      circle at 8% 92%,
      rgba(20, 184, 166, 0.06),
      transparent 30%
    ),
    #f6f8f7;
  color: #17221d;
}

/* =========================
   Header
========================= */

.page-header {
  width: 100%;
  max-width: 920px;
  margin: 0 auto 18px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.eyebrow {
  display: block;
  margin-bottom: 5px;
  color: #17845f;
  font-size: 10px;
  font-weight: 850;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.page-header h1 {
  margin: 0;
  color: #17221d;
  font-size: clamp(26px, 3vw, 35px);
  line-height: 1.1;
  font-weight: 850;
  letter-spacing: -0.04em;
}

.subtitle {
  margin: 7px 0 0;
  color: #7b8881;
  font-size: 12px;
  line-height: 1.5;
}

.profile-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border: 1px solid #dceae3;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.84);
  color: #557066;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}

.profile-badge svg {
  width: 17px;
  height: 17px;
  color: #17845f;
}

/* =========================
   Main Card
========================= */

.card {
  background: rgba(255, 255, 255, 0.97);
  border: 1px solid #e4ebe7;
  border-radius: 20px;
  box-shadow:
    0 16px 45px rgba(28, 53, 43, 0.055),
    0 3px 10px rgba(28, 53, 43, 0.035);
}

.panel {
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  padding: clamp(20px, 3vw, 30px);
  box-sizing: border-box;
}

/* =========================
   Profile Intro
========================= */

.profile-intro {
  display: flex;
  align-items: center;
  gap: 15px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9efec;
}

.avatar {
  width: 64px;
  height: 64px;
  flex: 0 0 64px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: linear-gradient(
    135deg,
    #e8f7f0,
    #d8eee4
  );
  border: 1px solid #d2e9df;
  color: #167753;
  font-size: 21px;
  font-weight: 850;
}

.intro-content {
  min-width: 0;
}

.section-eyebrow {
  display: block;
  color: #17845f;
  font-size: 9px;
  font-weight: 850;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.intro-content h2 {
  margin: 4px 0 0;
  color: #26352d;
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.025em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.intro-content p {
  margin: 5px 0 0;
  color: #89948e;
  font-size: 10px;
}

/* =========================
   Profile Details
========================= */

.profile-details {
  display: grid;
  margin-top: 8px;
}

.row {
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 17px 4px;
  border-bottom: 1px solid #edf1ef;
}

.row:last-child {
  border-bottom: none;
}

.field-info {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 13px;
}

.field-icon {
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #f0f8f4;
  border: 1px solid #dfede6;
  color: #16805c;
}

.field-icon svg {
  width: 19px;
  height: 19px;
}

.label {
  display: block;
  margin-bottom: 4px;
  color: #89948e;
  font-size: 9px;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.07em;
}

.field-info strong {
  display: block;
  max-width: 100%;
  color: #33423a;
  font-size: 12px;
  font-weight: 750;
  overflow-wrap: anywhere;
}

/* =========================
   Note
========================= */

.profile-note {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 11px 13px;
  border: 1px solid #e1eee8;
  border-radius: 12px;
  background: #f7fbf9;
  color: #728079;
  font-size: 10px;
  line-height: 1.45;
}

.profile-note svg {
  width: 15px;
  height: 15px;
  flex: 0 0 15px;
  color: #16805c;
}

/* =========================
   Responsive
========================= */

@media (max-width: 700px) {
  .page {
    padding: 22px 18px;
  }

  .profile-badge {
    display: none;
  }

  .panel {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .page {
    padding: 18px 14px;
  }

  .page-header h1 {
    font-size: 28px;
  }

  .panel {
    padding: 16px;
    border-radius: 17px;
  }

  .profile-intro {
    align-items: flex-start;
    gap: 12px;
    padding-bottom: 20px;
  }

  .avatar {
    width: 54px;
    height: 54px;
    flex-basis: 54px;
    border-radius: 15px;
    font-size: 18px;
  }

  .intro-content h2 {
    font-size: 16px;
  }

  .row {
    padding: 15px 2px;
  }

  .field-info {
    gap: 10px;
  }

  .field-icon {
    width: 36px;
    height: 36px;
    flex-basis: 36px;
    border-radius: 10px;
  }

  .field-icon svg {
    width: 17px;
    height: 17px;
  }

  .field-info strong {
    font-size: 11px;
  }

  .profile-note {
    align-items: flex-start;
  }
}

@media (max-width: 360px) {
  .page {
    padding: 14px 10px;
  }

  .panel {
    padding: 14px;
  }

  .profile-intro {
    flex-direction: column;
  }

  .row {
    padding-left: 0;
    padding-right: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    scroll-behavior: auto !important;
  }
}
</style>
