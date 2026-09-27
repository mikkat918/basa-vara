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

<template>
  <div class="page wallet-page">
    <h1>Wallet</h1>
    <CoinBalance :balance="walletStore.coinBalance" />
    <section class="pack-grid">
      <CoinPackageCard v-for="pack in COIN_PACKAGES" :key="pack.id" :package="pack" @buy="purchase(pack)" />
    </section>
    <section class="card panel">
      <h2>Transaction history</h2>
      <TransactionTable :rows="transactionStatus" />
    </section>
  </div>
</template>

<style scoped>
.wallet-page {
  display: grid;
  gap: 20px;
}
.pack-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.panel {
  padding: 20px;
}
@media (max-width: 760px) {
  .pack-grid {
    grid-template-columns: 1fr;
  }
}
</style>
