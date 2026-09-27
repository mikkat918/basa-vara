<script setup>
import DashboardShell from './DashboardShell.vue'

const items = [
  { label: 'Dashboard', to: '/admin', exact: true },
  { label: 'Users', to: '/admin/users' },
  { label: 'Landlords', to: '/admin/landlords' },
  { label: 'Tenants', to: '/admin/tenants' },
  { label: 'Properties', to: '/admin/properties' },
  { label: 'Pending approvals', to: '/admin/properties/pending' },
  { label: 'Reports', to: '/admin/reports' },
  { label: 'Payments', to: '/admin/payments' },
  { label: 'Coin transactions', to: '/admin/coin-transactions' },
  { label: 'Analytics', to: '/admin/analytics' },
  { label: 'Notifications', to: '/admin/notifications' },
  { label: 'Settings', to: '/admin/settings' },
  { label: 'Admin logs', to: '/admin/logs' },
  { label: 'Log out', action: 'logout' },
]
</script>

<template>
  <DashboardShell :items="items" />
</template>
