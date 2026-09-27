<script setup>
import { onMounted } from 'vue'
import TransactionTable from '../../components/wallet/TransactionTable.vue'
import { useWalletStore } from '../../stores/walletStore'

const wallet = useWalletStore()

onMounted(() => wallet.load())
</script>

<template>
  <div class="page">
    <h1>Transactions</h1>
    <div class="card panel">
      <TransactionTable :rows="wallet.transactions" />
    </div>
  </div>
</template>

<style scoped>
.panel { padding: 20px; }
</style>
