
<script setup>
import DashboardShell from './DashboardShell.vue'

const items = [
  // Overview
  {
    label: 'Dashboard',
    to: '/admin',
    exact: true,
  },

  // User Management
  {
    label: 'Users',
    to: '/admin/users',
  },
  {
    label: 'Landlords',
    to: '/admin/landlords',
  },
  {
    label: 'Tenants',
    to: '/admin/tenants',
  },

  // Property Management
  {
    label: 'Properties',
    to: '/admin/properties',
  },
  {
    label: 'Pending approvals',
    to: '/admin/properties/pending',
  },

  // Finance & Transactions
  {
    label: 'Payments',
    to: '/admin/payments',
  },
  {
    label: 'Coin transactions',
    to: '/admin/coin-transactions',
  },

  // Monitoring & Insights
  {
    label: 'Reports',
    to: '/admin/reports',
  },
  {
    label: 'Analytics',
    to: '/admin/analytics',
  },

  // Communication
  {
    label: 'Notifications',
    to: '/admin/notifications',
  },

  // System
  {
    label: 'Settings',
    to: '/admin/settings',
  },
  {
    label: 'Admin logs',
    to: '/admin/logs',
  },

  // Account
  {
    label: 'Log out',
    action: 'logout',
  },
]
</script>

<template>
  <DashboardShell :items="items" />
</template>
