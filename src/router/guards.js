import { useAuthStore } from '../stores/authStore'
import { ROLES } from '../utils/constants'

export function setupGuards(router) {
  router.beforeEach((to) => {
    const auth = useAuthStore()
    const roles = to.meta.roles
    if (to.meta.guestOnly && auth.isAuthenticated) {
      return homeFor(auth.role)
    }
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
      return { path: '/login', query: { redirect: to.fullPath } }
    }
    if (roles?.length && !roles.includes(auth.role)) {
      return homeFor(auth.role)
    }
    return true
  })
}

function homeFor(role) {
  if (role === ROLES.ADMIN) return '/admin'
  if (role === ROLES.LANDLORD) return '/landlord'
  if (role === ROLES.TENANT) return '/dashboard'
  return '/'
}
