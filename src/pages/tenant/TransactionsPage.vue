<script setup>
import { onMounted } from 'vue'
import TransactionTable from '../../components/wallet/TransactionTable.vue'
import { useWalletStore } from '../../stores/walletStore'

const wallet = useWalletStore()

onMounted(() => wallet.load())
</script>

```vue
<template>
  <div class="transactions-page">
    <div class="transactions-shell">

      <!-- Header -->
      <header class="page-header">
        <div class="header-copy">
          <div class="eyebrow">
            <span class="eyebrow-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
                />
                <path d="M8 7h8M8 11h8M8 15h5" />
              </svg>
            </span>
            Transaction history
          </div>

          <h1>Transactions</h1>

          <p>
            View your account activity, payments, and transaction history
            in one place.
          </p>
        </div>

        <div class="header-badge">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3v18M16.5 7.5h-6a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5h-6" />
          </svg>
          <span>Wallet activity</span>
        </div>
      </header>

      <!-- Transactions Card -->
      <section class="transactions-card card">

        <div class="card-header">
          <div class="card-title-wrap">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 6h16v13H4z" />
                <path d="M4 9h16M8 14h3M8 17h6" />
              </svg>
            </div>

            <div>
              <h2>Transaction history</h2>
              <p>Your recent wallet transactions are shown below.</p>
            </div>
          </div>

          <div class="secure-badge">
            <span class="status-dot"></span>
            Secure records
          </div>
        </div>

        <div class="table-container">
          <TransactionTable :rows="wallet.transactions" />
        </div>

      </section>

      <!-- Bottom Note -->
      <div class="information-note">
        <div class="note-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 10v6M12 7h.01" />
          </svg>
        </div>

        <div>
          <strong>Transaction records</strong>
          <p>
            Your transaction history helps you keep track of wallet activity
            and payments associated with your account.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.transactions-page {
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  padding: 42px 28px 56px;
  background:
    radial-gradient(circle at 8% 0%, rgba(34, 197, 94, 0.09), transparent 28%),
    radial-gradient(circle at 92% 10%, rgba(16, 185, 129, 0.07), transparent 26%),
    #f5f8f6;
  color: #17231d;
}

.transactions-shell {
  width: 100%;
  max-width: 1380px;
  margin: 0 auto;
}

/* Header */
.page-header {
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
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.page-header h1 {
  margin: 0;
  font-size: clamp(30px, 3vw, 44px);
  line-height: 1.08;
  letter-spacing: -0.04em;
  color: #14221a;
}

.header-copy p {
  max-width: 650px;
  margin: 11px 0 0;
  color: #6b776f;
  font-size: 15px;
  line-height: 1.7;
}

.header-badge {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 11px 15px;
  border: 1px solid #dce9e1;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.86);
  color: #536159;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 8px 25px rgba(24, 60, 40, 0.05);
}

.header-badge svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: #199653;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Main card */
.transactions-card {
  overflow: hidden;
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
  flex: 0 0 auto;
  display: flex;
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

.secure-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  flex: 0 0 auto;
  padding: 8px 11px;
  border: 1px solid #dcefe3;
  border-radius: 999px;
  background: #f4fbf6;
  color: #37815a;
  font-size: 12px;
  font-weight: 700;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #27a55e;
  box-shadow: 0 0 0 4px rgba(39, 165, 94, 0.1);
}

.table-container {
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  padding: 4px 0;
}

/* Bottom information */
.information-note {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 18px;
  padding: 16px 18px;
  border: 1px solid #e2ebe5;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.76);
}

.note-icon {
  flex: 0 0 auto;
  display: flex;
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

.information-note strong {
  display: block;
  margin-bottom: 3px;
  color: #334139;
  font-size: 13px;
  font-weight: 800;
}

.information-note p {
  margin: 0;
  color: #7a847e;
  font-size: 12px;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 900px) {
  .transactions-page {
    padding: 32px 20px 44px;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
  }

  .header-badge {
    align-self: flex-start;
  }
}

@media (max-width: 650px) {
  .transactions-page {
    padding: 24px 14px 34px;
  }

  .page-header {
    margin-bottom: 20px;
  }

  .page-header h1 {
    font-size: 30px;
  }

  .header-copy p {
    font-size: 14px;
  }

  .transactions-card {
    border-radius: 16px;
  }

  .card-header {
    align-items: flex-start;
    flex-direction: column;
    padding: 18px;
  }

  .secure-badge {
    align-self: flex-start;
  }

  .information-note {
    padding: 14px;
  }
}

@media (max-width: 420px) {
  .transactions-page {
    padding: 18px 10px 28px;
  }

  .page-header h1 {
    font-size: 27px;
  }

  .header-badge {
    width: 100%;
    justify-content: center;
    box-sizing: border-box;
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

  .information-note {
    gap: 9px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .transactions-page *,
  .transactions-page *::before,
  .transactions-page *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>