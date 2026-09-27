import { createRouter, createWebHistory } from 'vue-router'
import { ROLES } from '../utils/constants'
import { setupGuards } from './guards'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/PublicLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('../pages/public/HomePage.vue') },
      { path: 'properties', name: 'properties', component: () => import('../pages/public/PropertySearchPage.vue') },
      { path: 'property/:id', name: 'property-details', component: () => import('../pages/public/PropertyDetailsPage.vue') },
      { path: 'how-it-works', name: 'how-it-works', component: () => import('../pages/public/HowItWorksPage.vue') },
      { path: 'about', name: 'about', component: () => import('../pages/public/AboutPage.vue') },
      { path: 'contact', name: 'contact', component: () => import('../pages/public/ContactPage.vue') },
      { path: 'terms', name: 'terms', component: () => import('../pages/public/TermsPage.vue') },
      { path: 'privacy', name: 'privacy', component: () => import('../pages/public/PrivacyPage.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('../layouts/AuthLayout.vue'),
    children: [
      { path: 'login', name: 'login', component: () => import('../pages/public/LoginPage.vue'), meta: { guestOnly: true } },
      { path: 'register', name: 'register', component: () => import('../pages/public/RegisterPage.vue'), meta: { guestOnly: true } },
      { path: 'forgot-password', name: 'forgot-password', component: () => import('../pages/public/ForgotPasswordPage.vue'), meta: { guestOnly: true } },
      { path: 'reset-password', name: 'reset-password', component: () => import('../pages/public/ResetPasswordPage.vue'), meta: { guestOnly: true } },
      { path: 'verify-otp', name: 'verify-otp', component: () => import('../pages/public/OtpVerifyPage.vue'), meta: { guestOnly: true } },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('../layouts/TenantLayout.vue'),
    meta: { requiresAuth: true, roles: [ROLES.TENANT] },
    children: [
      { path: '', name: 'tenant-dashboard', component: () => import('../pages/tenant/TenantDashboardPage.vue') },
      { path: 'saved', name: 'tenant-saved', component: () => import('../pages/tenant/SavedPropertiesPage.vue') },
      { path: 'messages', name: 'tenant-messages', component: () => import('../pages/tenant/MessagesPage.vue') },
      { path: 'wallet', name: 'tenant-wallet', component: () => import('../pages/tenant/WalletPage.vue') },
      { path: 'wallet/checkout', name: 'tenant-checkout', component: () => import('../pages/tenant/PaymentCheckoutPage.vue') },
      { path: 'transactions', name: 'tenant-transactions', component: () => import('../pages/tenant/TransactionsPage.vue') },
      { path: 'notifications', name: 'tenant-notifications', component: () => import('../pages/tenant/NotificationsPage.vue') },
      { path: 'profile', name: 'tenant-profile', component: () => import('../pages/tenant/TenantProfilePage.vue') },
      { path: 'settings', name: 'tenant-settings', component: () => import('../pages/tenant/TenantSettingsPage.vue') },
    ],
  },
  {
    path: '/landlord',
    component: () => import('../layouts/LandlordLayout.vue'),
    meta: { requiresAuth: true, roles: [ROLES.LANDLORD] },
    children: [
      { path: '', name: 'landlord-dashboard', component: () => import('../pages/landlord/LandlordDashboardPage.vue') },
      { path: 'properties', name: 'landlord-properties', component: () => import('../pages/landlord/MyPropertiesPage.vue') },
      { path: 'properties/new', name: 'landlord-property-new', component: () => import('../pages/landlord/PropertyFormPage.vue') },
      { path: 'properties/:id/edit', name: 'landlord-property-edit', component: () => import('../pages/landlord/PropertyFormPage.vue') },
      { path: 'properties/:id/analytics', name: 'landlord-analytics', component: () => import('../pages/landlord/PropertyAnalyticsPage.vue') },
      { path: 'messages', name: 'landlord-messages', component: () => import('../pages/landlord/LandlordMessagesPage.vue') },
      { path: 'profile', name: 'landlord-profile', component: () => import('../pages/landlord/LandlordProfilePage.vue') },
      { path: 'settings', name: 'landlord-settings', component: () => import('../pages/landlord/LandlordSettingsPage.vue') },
    ],
  },
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, roles: [ROLES.ADMIN] },
    children: [
      { path: '', name: 'admin-dashboard', component: () => import('../pages/admin/AdminDashboardPage.vue') },
      { path: 'users', name: 'admin-users', component: () => import('../pages/admin/AdminUsersPage.vue') },
      { path: 'users/:id', name: 'admin-user-details', component: () => import('../pages/admin/AdminUserDetailsPage.vue') },
      { path: 'landlords', name: 'admin-landlords', component: () => import('../pages/admin/AdminLandlordsPage.vue') },
      { path: 'tenants', name: 'admin-tenants', component: () => import('../pages/admin/AdminTenantsPage.vue') },
      { path: 'properties', name: 'admin-properties', component: () => import('../pages/admin/AdminPropertiesPage.vue') },
      { path: 'properties/pending', name: 'admin-pending', component: () => import('../pages/admin/AdminPendingPage.vue') },
      { path: 'reports', name: 'admin-reports', component: () => import('../pages/admin/AdminReportsPage.vue') },
      { path: 'payments', name: 'admin-payments', component: () => import('../pages/admin/AdminPaymentsPage.vue') },
      { path: 'coin-transactions', name: 'admin-coins', component: () => import('../pages/admin/AdminCoinTransactionsPage.vue') },
      { path: 'analytics', name: 'admin-analytics', component: () => import('../pages/admin/AdminAnalyticsPage.vue') },
      { path: 'notifications', name: 'admin-notifications', component: () => import('../pages/admin/AdminNotificationsPage.vue') },
      { path: 'settings', name: 'admin-settings', component: () => import('../pages/admin/AdminSettingsPage.vue') },
      { path: 'logs', name: 'admin-logs', component: () => import('../pages/admin/AdminLogsPage.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../pages/public/NotFoundPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

setupGuards(router)

export default router
