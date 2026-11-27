import { createRouter, createWebHistory } from 'vue-router'
import Rotas from './Rotas'
import { useSessionStore } from '../stores/session'

const router = createRouter({
  history: createWebHistory(),
  routes: [Rotas],
})

router.beforeEach((to) => {
  if (!to.meta.requiresAuth) {
    return true
  }

  const session = useSessionStore()
  if (session.isAuthenticated) {
    return true
  }

  session.setAnonymous()
  return { name: 'login', query: { redirect: to.fullPath } }
})

export default router
