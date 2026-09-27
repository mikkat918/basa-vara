<script setup>
import DashboardShell from './DashboardShell.vue'

const items = [
  { label: 'Dashboard', to: '/landlord', exact: true },
  { label: 'My properties', to: '/landlord/properties' },
  { label: 'Add property', to: '/landlord/properties/new' },
  { label: 'Messages', to: '/landlord/messages' },
  { label: 'Profile', to: '/landlord/profile' },
  { label: 'Settings', to: '/landlord/settings' },
  { label: 'Log out', action: 'logout' },
]
</script>

<template>
  <DashboardShell :items="items" />
</template>
