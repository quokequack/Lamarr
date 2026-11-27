import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useQuestionnaireStore } from '../../src/stores/questionnaire'
import { useSessionStore } from '../../src/stores/session'
import { useTrailsStore } from '../../src/stores/trails'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('questionnaire store', () => {
  it('keeps objective and preference answers in separate steps', () => {
    const questionnaire = useQuestionnaireStore()

    questionnaire.saveObjectiveAnswers({ name: 'Olive' })
    questionnaire.savePreferenceAnswers({ organizationMethod: 'Listas' })

    expect(questionnaire.objectiveAnswers.name).toBe('Olive')
    expect(questionnaire.preferenceAnswers.organizationMethod).toBe('Listas')
    expect(questionnaire.hasObjectiveAnswers).toBe(true)
    expect(questionnaire.hasPreferenceAnswers).toBe(true)
  })
})

describe('session store', () => {
  it('exposes the authenticated state only after a user is set', () => {
    const session = useSessionStore()

    expect(session.isAuthenticated).toBe(false)
    session.setAuthenticated({ id: 'user-1', email: 'olive@example.com' })

    expect(session.isAuthenticated).toBe(true)
    expect(session.user?.email).toBe('olive@example.com')
  })
})

describe('trails store', () => {
  it('tracks generation transitions through its public interface', () => {
    const trails = useTrailsStore()

    trails.startGeneration()
    expect(trails.generation.state).toBe('generating')

    trails.failGeneration('A geração não foi concluída.')
    expect(trails.generation).toEqual({
      state: 'error',
      errorMessage: 'A geração não foi concluída.',
    })
  })
})
