import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { ObjectiveQuestionnaire, PreferenceQuestionnaire } from '../domain/learning'

export const useQuestionnaireStore = defineStore('questionnaire', () => {
  const objectiveAnswers = ref<Partial<ObjectiveQuestionnaire>>({})
  const preferenceAnswers = ref<Partial<PreferenceQuestionnaire>>({})

  const hasObjectiveAnswers = computed(() => Object.keys(objectiveAnswers.value).length > 0)
  const hasPreferenceAnswers = computed(() => Object.keys(preferenceAnswers.value).length > 0)

  function saveObjectiveAnswers(answers: Partial<ObjectiveQuestionnaire>) {
    objectiveAnswers.value = { ...objectiveAnswers.value, ...answers }
  }

  function savePreferenceAnswers(answers: Partial<PreferenceQuestionnaire>) {
    preferenceAnswers.value = { ...preferenceAnswers.value, ...answers }
  }

  function reset() {
    objectiveAnswers.value = {}
    preferenceAnswers.value = {}
  }

  return {
    objectiveAnswers,
    preferenceAnswers,
    hasObjectiveAnswers,
    hasPreferenceAnswers,
    saveObjectiveAnswers,
    savePreferenceAnswers,
    reset,
  }
})
