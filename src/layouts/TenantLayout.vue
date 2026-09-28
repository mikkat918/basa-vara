
<script setup>
import DashboardShell from './DashboardShell.vue'

/**
 * Tenant dashboard navigation.
 *
 * Route values and action names are kept unchanged
 * so DashboardShell / AppSidebar can continue using
 * the existing navigation contract.
 */
const items = [
  // Overview
  {
    label: 'Dashboard',
    to: '/dashboard',
    exact: true,
  },

  // Property Discovery
  {
    label: 'Find properties',
    to: '/properties',
  },
  {
    label: 'Saved properties',
    to: '/dashboard/saved',
  },

  // Communication
  {
    label: 'Messages',
    to: '/dashboard/messages',
  },

  // Wallet & Payments
  {
    label: 'Wallet',
    to: '/dashboard/wallet',
  },
  {
    label: 'Transactions',
    to: '/dashboard/transactions',
  },

  // Updates
  {
    label: 'Notifications',
    to: '/dashboard/notifications',
  },

  // Account
  {
    label: 'Profile',
    to: '/dashboard/profile',
  },
  {
    label: 'Settings',
    to: '/dashboard/settings',
  },

  // Session
  {
    label: 'Log out',
    action: 'logout',
  },
]
</script>

<template>
  <DashboardShell :items="items" />
</template>
