<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWalletStore } from '../../stores/walletStore'
import { COIN_PACKAGES } from '../../utils/constants'
import CoinBalance from '../../components/wallet/CoinBalance.vue'
import CoinPackageCard from '../../components/wallet/CoinPackageCard.vue'
import TransactionTable from '../../components/wallet/TransactionTable.vue'
import { useAuthStore } from '../../stores/authStore'

const walletStore = useWalletStore()
const auth = useAuthStore()
const router = useRouter()

const transactionStatus = computed(() => walletStore.transactions)

function purchase(pack) {
  router.push({ path: '/dashboard/wallet/checkout', query: { package: pack.id } })
}

onMounted(() => walletStore.load())
</script>

```vue
<template>
  <div class="wallet-page">
    <div class="wallet-shell">

      <!-- Header -->
      <header class="wallet-header">
        <div class="header-copy">
          <div class="eyebrow">
            <span class="eyebrow-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H20v14H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" />
                <path d="M4 8h13.5a2.5 2.5 0 0 1 0 5H20" />
                <path d="M16 10.5h.01" />
              </svg>
            </span>
            Wallet & credits
          </div>

          <h1>Wallet</h1>

          <p>
            Manage your coins, purchase packages, and keep track of your
            wallet transactions.
          </p>
        </div>

        <div class="wallet-status">
          <span class="status-dot"></span>
          Wallet active
        </div>
      </header>

      <!-- Balance -->
      <section class="balance-section">
        <CoinBalance :balance="walletStore.coinBalance" />
      </section>

      <!-- Coin Packages -->
      <section class="packages-section">
        <div class="section-heading">
          <div>
            <span class="section-label">Add coins</span>
            <h2>Choose a coin package</h2>
            <p>Select a package that works for you.</p>
          </div>

          <div class="package-count">
            {{ COIN_PACKAGES.length }} packages
          </div>
        </div>

        <div class="pack-grid">
          <CoinPackageCard
            v-for="pack in COIN_PACKAGES"
            :key="pack.id"
            :package="pack"
            @buy="purchase(pack)"
          />
        </div>
      </section>

      <!-- Transaction History -->
      <section class="card transaction-card">
        <div class="card-header">
          <div class="card-title-wrap">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 4h14v16H5z" />
                <path d="M8 8h8M8 12h8M8 16h5" />
              </svg>
            </div>

            <div>
              <h2>Transaction history</h2>
              <p>Review your recent wallet activity.</p>
            </div>
          </div>

          <div class="history-badge">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="8.5" />
            </svg>
            Activity
          </div>
        </div>

        <div class="transaction-table">
          <TransactionTable :rows="transactionStatus" />
        </div>
      </section>

      <!-- Security / Info -->
      <div class="wallet-note">
        <div class="note-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3 20 6v5c0 5-3.2 8.2-8 10-4.8-1.8-8-5-8-10V6l8-3Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>

        <div>
          <strong>Keep track of your wallet</strong>
          <p>
            Your current balance and transaction activity are displayed here
            for easy reference.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.wallet-page {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 42px 28px 56px;
  background:
    radial-gradient(circle at 8% 0%, rgba(34, 197, 94, 0.09), transparent 28%),
    radial-gradient(circle at 92% 8%, rgba(16, 185, 129, 0.08), transparent 27%),
    #f5f8f6;
  color: #17231d;
}

.wallet-shell {
  width: 100%;
  max-width: 1380px;
  margin: 0 auto;
}

/* Header */
.wallet-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 28px;
  margin-bottom: 28px;
}

.header-copy {
  min-width: 0;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  color: #16834b;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.eyebrow-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 8px;
  background: #e7f7ed;
}

.eyebrow-icon svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.wallet-header h1 {
  margin: 0;
  color: #14221a;
  font-size: clamp(30px, 3vw, 44px);
  line-height: 1.08;
  letter-spacing: -0.04em;
}

.header-copy p {
  max-width: 650px;
  margin: 11px 0 0;
  color: #6b776f;
  font-size: 15px;
  line-height: 1.7;
}

.wallet-status {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid #dce9e1;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  color: #4d5d53;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 8px 25px rgba(24, 60, 40, 0.05);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #24a35b;
  box-shadow: 0 0 0 4px rgba(36, 163, 91, 0.1);
}

/* Balance */
.balance-section {
  margin-bottom: 32px;
}

/* Packages */
.packages-section {
  margin-bottom: 32px;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 16px;
}

.section-label {
  display: block;
  margin-bottom: 5px;
  color: #18864d;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.section-heading h2 {
  margin: 0;
  color: #1b2921;
  font-size: 22px;
  letter-spacing: -0.025em;
}

.section-heading p {
  margin: 5px 0 0;
  color: #7a847e;
  font-size: 13px;
}

.package-count {
  flex: 0 0 auto;
  padding: 8px 12px;
  border: 1px solid #dce9e1;
  border-radius: 999px;
  background: #ffffff;
  color: #65736b;
  font-size: 12px;
  font-weight: 700;
}

.pack-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

/* Transaction card */
.transaction-card {
  overflow: hidden;
  margin-top: 4px;
  border: 1px solid #e1e9e4;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 18px 55px rgba(31, 67, 47, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 22px 24px;
  border-bottom: 1px solid #edf1ee;
}

.card-title-wrap {
  display: flex;
  align-items: center;
  gap: 13px;
  min-width: 0;
}

.card-icon {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #eaf8ef;
  color: #16864c;
}

.card-icon svg {
  width: 21px;
  height: 21px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.card-title-wrap h2 {
  margin: 0;
  color: #1c2921;
  font-size: 17px;
  font-weight: 800;
}

.card-title-wrap p {
  margin: 4px 0 0;
  color: #7a847e;
  font-size: 13px;
  line-height: 1.5;
}

.history-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  flex: 0 0 auto;
  padding: 8px 11px;
  border: 1px solid #e1eae4;
  border-radius: 999px;
  background: #f7faf8;
  color: #65736b;
  font-size: 12px;
  font-weight: 700;
}

.history-badge svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: #238d53;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.transaction-table {
  width: 100%;
  min-width: 0;
  overflow-x: auto;
}

/* Bottom note */
.wallet-note {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 18px;
  padding: 16px 18px;
  border: 1px solid #e2ebe5;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.78);
}

.note-icon {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: #edf8f1;
  color: #218950;
}

.note-icon svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.wallet-note strong {
  display: block;
  margin-bottom: 3px;
  color: #334139;
  font-size: 13px;
  font-weight: 800;
}

.wallet-note p {
  margin: 0;
  color: #7a847e;
  font-size: 12px;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 1050px) {
  .pack-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 800px) {
  .wallet-page {
    padding: 32px 20px 44px;
  }

  .wallet-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
  }

  .wallet-status {
    align-self: flex-start;
  }
}

@media (max-width: 650px) {
  .wallet-page {
    padding: 24px 14px 34px;
  }

  .wallet-header {
    margin-bottom: 22px;
  }

  .wallet-header h1 {
    font-size: 30px;
  }

  .header-copy p {
    font-size: 14px;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .pack-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .transaction-card {
    border-radius: 16px;
  }

  .card-header {
    align-items: flex-start;
    flex-direction: column;
    padding: 18px;
  }

  .history-badge {
    align-self: flex-start;
  }

  .wallet-note {
    padding: 14px;
  }
}

@media (max-width: 420px) {
  .wallet-page {
    padding: 18px 10px 28px;
  }

  .wallet-header h1 {
    font-size: 27px;
  }

  .wallet-status {
    width: 100%;
    justify-content: center;
    box-sizing: border-box;
  }

  .section-heading h2 {
    font-size: 20px;
  }

  .card-title-wrap {
    align-items: flex-start;
  }

  .card-icon {
    width: 38px;
    height: 38px;
  }

  .card-title-wrap h2 {
    font-size: 15px;
  }

  .card-title-wrap p {
    font-size: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wallet-page *,
  .wallet-page *::before,
  .wallet-page *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
