import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  calculateEndDate,
  calculateTotalStudyHours,
  mapQuestionnaireToGenerationInput,
  validateObjectiveAnswers,
  validatePreferenceAnswers,
} from '../../src/domain/questionnaire'
import type { ObjectiveQuestionnaire, PreferenceQuestionnaire } from '../../src/domain/learning'
import { useQuestionnaireStore } from '../../src/stores/questionnaire'
import { useSessionStore } from '../../src/stores/session'
import { useTrailsStore } from '../../src/stores/trails'

beforeEach(() => {
  window.sessionStorage.clear()
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

  it('prepares a validated generation input with coherent availability', () => {
    const questionnaire = useQuestionnaireStore()
    const objective: ObjectiveQuestionnaire = {
      name: 'Olive',
      email: 'olive@example.com',
      objective: { topic: 'TypeScript', outcome: 'deepen', targetLevel: 'beginner' },
      currentLevel: 'beginner',
      expectedOutcome: 'deepen',
      duration: { amount: 4, unit: 'weeks' },
      startDate: '2099-01-01',
      studyDaysPerWeek: 3,
      dailyStudyHours: 2,
      availableResources: ['books'],
      preferences: { format: 'balanced', budget: 'free' },
      previousAttempts: true,
    }
    const preferences: PreferenceQuestionnaire = {
      organizationMethod: 'lists',
      listensToMusic: false,
      methods: ['practice'],
      preferredPeriod: 'evening',
      projectPreference: 'creativity',
    }

    questionnaire.saveObjectiveAnswers(objective)
    questionnaire.savePreferenceAnswers(preferences)

    expect(questionnaire.generationInput?.availability).toEqual({
      startDate: '2099-01-01',
      endDate: '2099-01-29',
      studyDaysPerWeek: 3,
      dailyStudyHours: 2,
      totalStudyHours: 24,
    })
    expect(questionnaire.confirmReview()).toBe(true)
    expect(questionnaire.reviewConfirmed).toBe(true)
  })

  it('persists a draft in the session and clears it only on reset', () => {
    const firstQuestionnaire = useQuestionnaireStore()
    firstQuestionnaire.saveObjectiveAnswers({ name: 'Olive' })

    setActivePinia(createPinia())
    const reloadedQuestionnaire = useQuestionnaireStore()
    expect(reloadedQuestionnaire.objectiveAnswers.name).toBe('Olive')

    reloadedQuestionnaire.reset()
    setActivePinia(createPinia())
    expect(useQuestionnaireStore().objectiveAnswers).toEqual({})
  })
})

describe('questionnaire rules', () => {
  it.each([0, 0.1, 0.49, 12.1, Number.NaN, Number.POSITIVE_INFINITY])(
    'rejects %s daily study hours outside the allowed range',
    (dailyStudyHours) => {
      expect(validateObjectiveAnswers({ dailyStudyHours }).dailyStudyHours).toBe(
        'Informe entre 0,5 e 12 horas por dia.',
      )
    },
  )

  it.each([0.5, 1, 12])('accepts %s daily study hours', (dailyStudyHours) => {
    expect(validateObjectiveAnswers({ dailyStudyHours }).dailyStudyHours).toBeUndefined()
  })

  it('reports the missing and incoherent answers', () => {
    const objectiveErrors = validateObjectiveAnswers(
      {
        email: 'invalid-email',
        duration: { amount: 0, unit: 'weeks' },
        startDate: '2020-01-01',
        studyDaysPerWeek: 8,
        dailyStudyHours: 13,
      },
      '2026-01-01',
    )
    const preferenceErrors = validatePreferenceAnswers({ listensToMusic: true })

    expect(objectiveErrors).toMatchObject({
      name: 'Informe seu nome.',
      email: 'Digite um email válido.',
      topic: 'Informe o assunto que você quer aprender.',
      startDate: 'A data de início não pode estar no passado.',
      studyDaysPerWeek: 'Escolha entre 1 e 7 dias de estudo por semana.',
      dailyStudyHours: 'Informe entre 0,5 e 12 horas por dia.',
    })
    expect(preferenceErrors.musicType).toBe('Informe o tipo de música que você prefere.')
  })

  it('calculates deadline and load for a study plan', () => {
    expect(calculateEndDate('2099-01-01', { amount: 1, unit: 'months' })).toBe('2099-02-01')
    expect(calculateTotalStudyHours('2099-01-01', { amount: 2, unit: 'weeks' }, 1.5, 5)).toBe(15)
  })

  it('maps the expected outcome to the shared trail level', () => {
    const input = mapQuestionnaireToGenerationInput(
      {
        name: 'Olive',
        email: 'olive@example.com',
        objective: { topic: 'TypeScript', outcome: 'specialize', targetLevel: 'beginner' },
        currentLevel: 'frequent',
        expectedOutcome: 'specialize',
        duration: { amount: 1, unit: 'weeks' },
        startDate: '2099-01-01',
        studyDaysPerWeek: 5,
        dailyStudyHours: 1,
        availableResources: ['computer'],
        preferences: { format: 'practical', budget: 'both' },
        previousAttempts: false,
      },
      {
        organizationMethod: 'lists',
        listensToMusic: false,
        methods: ['practice'],
        preferredPeriod: 'morning',
        projectPreference: 'logic-and-data',
      },
    )

    expect(input.objective.targetLevel).toBe('advanced')
    expect(input.learningPreferences.methods).toEqual(['practice'])
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
