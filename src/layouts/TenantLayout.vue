<script setup>
import DashboardShell from './DashboardShell.vue'

const items = [
  { label: 'Dashboard', to: '/dashboard', exact: true },
  { label: 'Find properties', to: '/properties' },
  { label: 'Saved properties', to: '/dashboard/saved' },
  { label: 'Messages', to: '/dashboard/messages' },
  { label: 'Wallet', to: '/dashboard/wallet' },
  { label: 'Transactions', to: '/dashboard/transactions' },
  { label: 'Notifications', to: '/dashboard/notifications' },
  { label: 'Profile', to: '/dashboard/profile' },
  { label: 'Settings', to: '/dashboard/settings' },
  { label: 'Log out', action: 'logout' },
]
</script>

<template>
  <DashboardShell :items="items" />
</template>
