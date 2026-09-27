<script setup>
import { onMounted } from 'vue'
import AppToast from './components/common/AppToast.vue'
import ConfirmDialog from './components/common/ConfirmDialog.vue'
import { useNotificationStore } from './stores/notificationStore'
import { useWalletStore } from './stores/walletStore'
import { useAuthStore } from './stores/authStore'

const auth = useAuthStore()
const wallet = useWalletStore()
const notifications = useNotificationStore()

onMounted(() => {
  if (auth.isAuthenticated) {
    wallet.load()
    notifications.load()
  }
})
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <router-view />
  <AppToast />
  <ConfirmDialog />
</template>
