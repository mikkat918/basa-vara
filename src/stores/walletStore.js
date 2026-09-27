import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { walletService } from '../services/walletService'
import { useAuthStore } from './authStore'

export const useWalletStore = defineStore('wallet', () => {
  const coinBalance = ref(0)
  const transactions = ref([])
  const loading = ref(false)
  const error = ref('')

  const formatted = computed(() => `${coinBalance.value} Coins`)

  async function load() {
    const auth = useAuthStore()
    if (!auth.user) return
    loading.value = true
    try {
      const [wallet, txs] = await Promise.all([
        walletService.getWallet(auth.user.id),
        walletService.transactions(auth.user.id),
      ])
      coinBalance.value = wallet.coinBalance
      transactions.value = txs
    } finally {
      loading.value = false
    }
  }

  return { coinBalance, transactions, loading, error, formatted, load }
})
