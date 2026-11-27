import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export interface SessionUser {
  id: string
  email: string
  displayName?: string
}

export type SessionStatus = 'unknown' | 'anonymous' | 'authenticated'

export const useSessionStore = defineStore('session', () => {
  const status = ref<SessionStatus>('unknown')
  const user = ref<SessionUser | null>(null)

  const isAuthenticated = computed(() => status.value === 'authenticated')

  function setAuthenticated(nextUser: SessionUser) {
    user.value = nextUser
    status.value = 'authenticated'
  }

  function setAnonymous() {
    user.value = null
    status.value = 'anonymous'
  }

  function signOut() {
    setAnonymous()
  }

  return { status, user, isAuthenticated, setAuthenticated, setAnonymous, signOut }
})
