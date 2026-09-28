<script setup>
import { watch } from 'vue'
import AppToast from './components/common/AppToast.vue'
import ConfirmDialog from './components/common/ConfirmDialog.vue'
import { useNotificationStore } from './stores/notificationStore'
import { useWalletStore } from './stores/walletStore'
import { useAuthStore } from './stores/authStore'

const auth = useAuthStore()
const wallet = useWalletStore()
const notifications = useNotificationStore()

watch(() => auth.user?.id, (userId) => {
  if (!userId) {
    wallet.coinBalance = 0
    wallet.transactions = []
    wallet.error = ''
    notifications.items = []
    return
  }
  // A new session can be created after the app mounts. Refresh account data
  // on login and clear stale data before switching accounts.
  wallet.coinBalance = 0
  wallet.transactions = []
  notifications.items = []
  Promise.allSettled([wallet.load(), notifications.load()])
}, { immediate: true })
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <router-view />
  <AppToast />
  <ConfirmDialog />
</template>
