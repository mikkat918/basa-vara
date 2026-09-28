<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { COIN_PACKAGES } from '../../utils/constants'
import { paymentService } from '../../services/paymentService'
import { useAuthStore } from '../../stores/authStore'
import { useUiStore } from '../../stores/uiStore'
const route = useRoute(); const router = useRouter(); const auth = useAuthStore(); const ui = useUiStore()
const method = ref('bkash'); const loading = ref(false); const notice = ref('')
const pack = computed(() => COIN_PACKAGES.find((item) => item.id === route.query.package) || COIN_PACKAGES[0])
async function pay() { loading.value = true; notice.value = ''; try { const result = await paymentService.createPayment({ userId: auth.user.id, packageId: pack.value.id, method: method.value }); notice.value = `Payment request ${result.paymentId} is pending. Coins will be added only after gateway confirmation.`; ui.toast('Payment request created. Awaiting confirmation.', 'warning') } catch (error) { ui.toast(error.message || 'Unable to start payment', 'error') } finally { loading.value = false } }
</script>

<template>
  <div class="page checkout-page">
    <!-- Header -->
    <header class="page-heading">
      <div class="heading-copy">
        <span class="eyebrow">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="6" width="16" height="13" rx="2"></rect>
            <path d="M8 10h8M8 14h4"></path>
            <path d="M8 4v2M16 4v2"></path>
          </svg>
          Wallet &amp; payments
        </span>

```
    <h1>Checkout</h1>

    <p>
      Securely purchase coins to unlock landlord contact information.
    </p>
  </div>

  <button
    class="btn btn-secondary back-btn"
    type="button"
    @click="router.push('/dashboard/wallet')"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 12H5"></path>
      <path d="m11 18-6-6 6-6"></path>
    </svg>
    Back to wallet
  </button>
</header>

<!-- Checkout Layout -->
<div class="checkout-layout">
  <!-- Payment Card -->
  <section class="card panel">
    <div class="panel-header">
      <div class="section-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2"></rect>
          <path d="M3 10h18"></path>
          <path d="M7 15h4"></path>
        </svg>
      </div>

      <div>
        <span class="section-label">Payment details</span>
        <h2>Choose payment method</h2>
        <p>Select how you would like to complete your purchase.</p>
      </div>
    </div>

    <div class="form-content">
      <!-- Payment Method -->
      <label class="field">
        <span class="field-label">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2"></rect>
            <path d="M3 10h18"></path>
            <path d="M7 15h4"></path>
          </svg>
          Payment method
        </span>

        <div class="select-wrap">
          <select v-model="method">
            <option value="bkash">bKash</option>
            <option value="nagad">Nagad</option>
            <option value="card">Card</option>
          </select>

          <svg class="select-arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </label>

      <!-- Package -->
      <label class="field">
        <span class="field-label">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8"></circle>
            <path d="M12 8v8M9.5 10.2c.5-.7 1.3-1.1 2.4-1.1 1.2 0 2.2.6 2.2 1.6 0 1.1-1 1.5-2.2 1.8-1.3.3-2.3.7-2.3 1.8 0 1 .9 1.7 2.3 1.7 1.1 0 2-.4 2.5-1.1"></path>
          </svg>
          Selected package
        </span>

        <input
          :value="`${pack.coins} coins — ৳${pack.amount}`"
          readonly
        />
      </label>

      <!-- Notice -->
      <div v-if="notice" class="notice">
        <div class="notice-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M12 10v6"></path>
            <path d="M12 7.5h.01"></path>
          </svg>
        </div>

        <p>{{ notice }}</p>
      </div>

      <!-- Pay -->
      <button
        class="btn btn-primary pay-btn"
        type="button"
        :disabled="loading"
        @click="pay"
      >
        <svg
          v-if="!loading"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2"></rect>
          <path d="M3 10h18"></path>
          <path d="M7 15h4"></path>
        </svg>

        <svg
          v-else
          class="spinner"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9"></circle>
        </svg>

        {{ loading ? 'Creating payment…' : `Pay ৳${pack.amount}` }}
      </button>

      <div class="secure-note">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 10V7a5 5 0 0 1 10 0v3"></path>
          <rect x="5" y="10" width="14" height="10" rx="2"></rect>
          <path d="M12 14v3"></path>
        </svg>

        <span>
          Your payment information is handled through the selected payment
          method.
        </span>
      </div>
    </div>
  </section>

  <!-- Order Summary -->
  <aside class="card summary-card">
    <div class="summary-header">
      <span class="section-label">Order summary</span>
      <div class="summary-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 4h12l1 16H5z"></path>
          <path d="M9 8h6M9 12h6M9 16h4"></path>
        </svg>
      </div>
    </div>

    <div class="coin-display">
      <div class="coin-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8"></circle>
          <path d="M12 8v8"></path>
          <path d="M9.5 10.2c.5-.7 1.3-1.1 2.4-1.1 1.2 0 2.2.6 2.2 1.6 0 1.1-1 1.5-2.2 1.8-1.3.3-2.3.7-2.3 1.8 0 1 .9 1.7 2.3 1.7 1.1 0 2-.4 2.5-1.1"></path>
        </svg>
      </div>

      <strong>{{ pack.coins }}</strong>
      <span>coins</span>
    </div>

    <div class="summary-divider"></div>

    <div class="summary-row">
      <span>Coin package</span>
      <strong>{{ pack.coins }} coins</strong>
    </div>

    <div class="summary-row total">
      <span>Total</span>
      <strong>৳{{ pack.amount }}</strong>
    </div>

    <div class="unlock-note">
      <div class="unlock-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 10V7a5 5 0 0 1 10 0v3"></path>
          <rect x="5" y="10" width="14" height="10" rx="2"></rect>
          <path d="M12 14v3"></path>
        </svg>
      </div>

      <div>
        <strong>What are coins for?</strong>
        <p>
          Coins can be used to unlock landlord contact information when
          available.
        </p>
      </div>
    </div>
  </aside>
</div>
```

  </div>
</template>

<style scoped>
.page {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: clamp(22px, 4vw, 42px);
  background:
    radial-gradient(circle at 7% 0%, rgba(23, 132, 95, 0.10), transparent 30%),
    radial-gradient(circle at 96% 12%, rgba(31, 167, 122, 0.08), transparent 28%),
    #f6f8f7;
  color: #18231f;
}

.checkout-page {
  display: grid;
  gap: 24px;
}

/* Header */
.page-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.heading-copy {
  min-width: 0;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 9px;
  color: #17845f;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.eyebrow svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.page-heading h1 {
  margin: 0;
  color: #15211c;
  font-size: clamp(1.7rem, 3vw, 2.35rem);
  line-height: 1.1;
  letter-spacing: -0.035em;
}

.page-heading p {
  max-width: 680px;
  margin: 9px 0 0;
  color: #6d7b75;
  font-size: 0.94rem;
  line-height: 1.65;
}

/* Layout */
.checkout-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(280px, 0.7fr);
  align-items: start;
  gap: 22px;
}

/* Cards */
.panel,
.summary-card {
  border: 1px solid #e3ebe7;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 14px 40px rgba(26, 55, 44, 0.07);
}

.panel {
  padding: clamp(22px, 3vw, 32px);
}

.summary-card {
  padding: 24px;
}

/* Header buttons */
.back-btn {
  flex: 0 0 auto;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.back-btn svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Panel Header */
.panel-header {
  display: flex;
  align-items: flex-start;
  gap: 13px;
  padding-bottom: 24px;
  margin-bottom: 25px;
  border-bottom: 1px solid #edf1ef;
}

.section-icon {
  flex: 0 0 42px;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 1px solid #dcefe7;
  border-radius: 12px;
  background: #eff9f5;
  color: #17845f;
}

.section-icon svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.section-label {
  display: block;
  margin-bottom: 4px;
  color: #7b8983;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.panel-header h2 {
  margin: 0;
  color: #1b2923;
  font-size: 1.08rem;
}

.panel-header p {
  margin: 5px 0 0;
  color: #7a8782;
  font-size: 0.81rem;
  line-height: 1.5;
}

/* Form */
.form-content {
  display: grid;
  gap: 20px;
}

.field {
  display: grid;
  gap: 9px;
  color: #26352e;
  font-size: 0.83rem;
  font-weight: 750;
}

.field-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.field-label svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: #5e766b;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

input,
select {
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  border: 1px solid #dbe5e0;
  border-radius: 11px;
  outline: none;
  background: #fbfdfc;
  color: #1d2b25;
  font: inherit;
  font-size: 0.9rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

input {
  padding: 0 14px;
}

input[readonly] {
  color: #53645c;
  background: #f5f8f6;
  cursor: default;
}

input:focus,
select:focus {
  border-color: #1a9569;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(26, 149, 105, 0.10);
}

.select-wrap {
  position: relative;
}

.select-wrap select {
  appearance: none;
  padding: 0 42px 0 14px;
  cursor: pointer;
}

.select-arrow {
  position: absolute;
  top: 50%;
  right: 14px;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
  pointer-events: none;
  fill: none;
  stroke: #71817a;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Notice */
.notice {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 0;
  padding: 13px 14px;
  border: 1px solid #f0dfbd;
  border-radius: 12px;
  background: #fff8eb;
  color: #87580c;
}

.notice-icon {
  flex: 0 0 20px;
  margin-top: 1px;
}

.notice-icon svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.notice p {
  margin: 0;
  font-size: 0.77rem;
  line-height: 1.55;
}

/* Pay Button */
.pay-btn {
  width: 100%;
  min-height: 49px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0;
  border: 0;
  border-radius: 11px;
  background: #17845f;
  color: #ffffff;
  font-size: 0.86rem;
  font-weight: 850;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(23, 132, 95, 0.18);
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;
}

.pay-btn svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.pay-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  background: #116f50;
  box-shadow: 0 11px 23px rgba(23, 132, 95, 0.23);
}

.pay-btn:disabled {
  cursor: not-allowed;
  opacity: 0.68;
  box-shadow: none;
}

.spinner {
  animation: spin 0.85s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Secure note */
.secure-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  color: #84918b;
  font-size: 0.69rem;
  line-height: 1.45;
  text-align: center;
}

.secure-note svg {
  flex: 0 0 15px;
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Summary */
.summary-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 15px;
}

.summary-icon {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: #f2f7f5;
  color: #5d756a;
}

.summary-icon svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.coin-display {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 22px;
}

.coin-icon {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  margin-right: 2px;
  border-radius: 14px;
  background: #eff9f5;
  color: #17845f;
}

.coin-icon svg {
  width: 25px;
  height: 25px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.coin-display strong {
  color: #17261f;
  font-size: 1.55rem;
  letter-spacing: -0.04em;
}

.coin-display > span {
  color: #78867f;
  font-size: 0.78rem;
  font-weight: 700;
}

.summary-divider {
  height: 1px;
  margin: 22px 0 17px;
  background: #edf1ef;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 7px 0;
  color: #78867f;
  font-size: 0.78rem;
}

.summary-row strong {
  color: #34443c;
  font-weight: 800;
}

.summary-row.total {
  margin-top: 7px;
  padding-top: 15px;
  border-top: 1px solid #edf1ef;
}

.summary-row.total span {
  color: #34443c;
  font-weight: 800;
}

.summary-row.total strong {
  color: #17845f;
  font-size: 1.2rem;
}

/* Unlock Note */
.unlock-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 20px;
  padding: 13px;
  border: 1px solid #e0ebe6;
  border-radius: 12px;
  background: #f7faf8;
}

.unlock-icon {
  flex: 0 0 30px;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: #e8f5ef;
  color: #17845f;
}

.unlock-icon svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.unlock-note strong {
  display: block;
  margin-bottom: 3px;
  color: #35453d;
  font-size: 0.74rem;
}

.unlock-note p {
  margin: 0;
  color: #7c8984;
  font-size: 0.69rem;
  line-height: 1.5;
}

/* Tablet */
@media (max-width: 850px) {
  .page {
    padding: 24px 20px;
  }

  .checkout-layout {
    grid-template-columns: 1fr;
  }

  .summary-card {
    order: -1;
  }
}

/* Mobile */
@media (max-width: 560px) {
  .page {
    padding: 20px 14px;
  }

  .page-heading {
    flex-direction: column;
    gap: 13px;
  }

  .back-btn {
    align-self: flex-start;
  }

  .panel,
  .summary-card {
    border-radius: 16px;
  }

  .panel {
    padding: 20px;
  }

  .summary-card {
    padding: 20px;
  }
}

/* Small mobile */
@media (max-width: 400px) {
  .page-heading h1 {
    font-size: 1.55rem;
  }

  .page-heading p {
    font-size: 0.83rem;
  }

  .panel-header {
    gap: 10px;
  }

  .section-icon {
    flex-basis: 38px;
    width: 38px;
    height: 38px;
  }

  .panel-header h2 {
    font-size: 0.98rem;
  }

  .panel-header p {
    font-size: 0.75rem;
  }

  .secure-note {
    align-items: flex-start;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>

