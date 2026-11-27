import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  hasQuestionnaireErrors,
  mapQuestionnaireToGenerationInput,
  validateObjectiveAnswers,
  validatePreferenceAnswers,
} from '../domain/questionnaire'
import type {
  ObjectiveQuestionnaire,
  PreferenceQuestionnaire,
  TrailGenerationInput,
} from '../domain/learning'

const STORAGE_KEY = 'lamarr:questionnaire-draft'

interface QuestionnaireStorage {
  objectiveAnswers: Partial<ObjectiveQuestionnaire>
  preferenceAnswers: Partial<PreferenceQuestionnaire>
  reviewConfirmed: boolean
}

function readStoredQuestionnaire(): QuestionnaireStorage | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as QuestionnaireStorage) : null
  } catch {
    return null
  }
}

function writeStoredQuestionnaire(data: QuestionnaireStorage) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // A storage quota or privacy restriction should not interrupt the questionnaire.
  }
}

export const useQuestionnaireStore = defineStore('questionnaire', () => {
  const storedQuestionnaire = readStoredQuestionnaire()
  const objectiveAnswers = ref<Partial<ObjectiveQuestionnaire>>(
    storedQuestionnaire?.objectiveAnswers ?? {},
  )
  const preferenceAnswers = ref<Partial<PreferenceQuestionnaire>>(
    storedQuestionnaire?.preferenceAnswers ?? {},
  )
  const reviewConfirmed = ref(storedQuestionnaire?.reviewConfirmed ?? false)

  const hasObjectiveAnswers = computed(() => Object.keys(objectiveAnswers.value).length > 0)
  const hasPreferenceAnswers = computed(() => Object.keys(preferenceAnswers.value).length > 0)
  const generationInput = computed<TrailGenerationInput | null>(() => {
    const objectiveErrors = validateObjectiveAnswers(objectiveAnswers.value)
    const preferenceErrors = validatePreferenceAnswers(preferenceAnswers.value)

    if (hasQuestionnaireErrors(objectiveErrors) || hasQuestionnaireErrors(preferenceErrors)) {
      return null
    }

    return mapQuestionnaireToGenerationInput(
      objectiveAnswers.value as ObjectiveQuestionnaire,
      preferenceAnswers.value as PreferenceQuestionnaire,
    )
  })

  function persist() {
    writeStoredQuestionnaire({
      objectiveAnswers: objectiveAnswers.value,
      preferenceAnswers: preferenceAnswers.value,
      reviewConfirmed: reviewConfirmed.value,
    })
  }

  function saveObjectiveAnswers(answers: Partial<ObjectiveQuestionnaire>) {
    objectiveAnswers.value = { ...objectiveAnswers.value, ...answers }
    reviewConfirmed.value = false
    persist()
  }

  function savePreferenceAnswers(answers: Partial<PreferenceQuestionnaire>) {
    preferenceAnswers.value = { ...preferenceAnswers.value, ...answers }
    reviewConfirmed.value = false
    persist()
  }

  function confirmReview() {
    if (!generationInput.value) {
      return false
    }

    reviewConfirmed.value = true
    persist()
    return true
  }

  function reset() {
    objectiveAnswers.value = {}
    preferenceAnswers.value = {}
    reviewConfirmed.value = false

    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(STORAGE_KEY)
    }
  }

  return {
    objectiveAnswers,
    preferenceAnswers,
    hasObjectiveAnswers,
    hasPreferenceAnswers,
    generationInput,
    reviewConfirmed,
    saveObjectiveAnswers,
    savePreferenceAnswers,
    confirmReview,
    reset,
  }
})
