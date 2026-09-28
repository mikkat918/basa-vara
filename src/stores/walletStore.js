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
    if (!auth.user) {
      coinBalance.value = 0
      transactions.value = []
      error.value = ''
      return
    }
    loading.value = true
    error.value = ''
    try {
      const [wallet, txs] = await Promise.all([
        walletService.getWallet(auth.user.id),
        walletService.transactions(auth.user.id),
      ])
      coinBalance.value = wallet.coinBalance
      transactions.value = txs
    } catch (err) {
      error.value = err.message || 'Could not load wallet data.'
      throw err
    } finally {
      loading.value = false
    }
  }

  return { coinBalance, transactions, loading, error, formatted, load }
})
