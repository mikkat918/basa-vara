
<script setup>
import DashboardShell from './DashboardShell.vue'

/**
 * Landlord dashboard navigation
 *
 * Keep route names and action values stable because
 * DashboardShell / AppSidebar may depend on them.
 */
const items = [
  // Overview
  {
    label: 'Dashboard',
    to: '/landlord',
    exact: true,
  },

  // Property Management
  {
    label: 'My properties',
    to: '/landlord/properties',
  },
  {
    label: 'Add property',
    to: '/landlord/properties/new',
  },

  // Communication
  {
    label: 'Messages',
    to: '/landlord/messages',
  },

  // Account
  {
    label: 'Profile',
    to: '/landlord/profile',
  },
  {
    label: 'Settings',
    to: '/landlord/settings',
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
