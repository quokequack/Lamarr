import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import NovaTrilha from '../../src/views/NovaTrilha.vue'
import { useQuestionnaireStore } from '../../src/stores/questionnaire'

const vuetify = createVuetify({ components, directives })

beforeEach(() => {
  window.sessionStorage.clear()
  setActivePinia(createPinia())
})

describe('NovaTrilha', () => {
  it.each([['Outro: Laboratório'], ['computer', 'Outro: Laboratório']])(
    'preserves custom resources when returning to objectives: %s',
    async (...availableResources) => {
      const questionnaire = useQuestionnaireStore()
      questionnaire.saveObjectiveAnswers({
        name: 'Olive',
        email: 'olive@example.com',
        objective: { topic: 'TypeScript', outcome: 'deepen', targetLevel: 'beginner' },
        currentLevel: 'beginner',
        expectedOutcome: 'deepen',
        availableResources,
        preferences: { format: 'balanced', budget: 'free' },
        previousAttempts: false,
      })
      const wrapper = mount(NovaTrilha, { global: { plugins: [vuetify] } })

      expect(wrapper.get('input[value="other"]').element).toHaveProperty('checked', true)
      const description = wrapper
        .findAll('input')
        .find((input) => input.element.value === 'Laboratório')
      expect(description).toBeDefined()
      await wrapper.get('form').trigger('submit')
      const backButton = wrapper.findAll('button').find((button) => button.text() === 'Voltar')
      await backButton!.trigger('click')

      expect(wrapper.get('input[value="other"]').element).toHaveProperty('checked', true)
      await wrapper.get('input[autocomplete="name"]').setValue('Olive revisado')
      expect(questionnaire.objectiveAnswers.availableResources).toEqual(availableResources)
    },
  )

  it('blocks the first step until the required answers are complete', async () => {
    const wrapper = mount(NovaTrilha, {
      global: {
        plugins: [vuetify],
      },
    })

    await wrapper.get('form').trigger('submit')

    expect(wrapper.text()).toContain('Revise os campos destacados antes de avançar.')
    expect(wrapper.text()).not.toContain('Preferências de estudo')
  })

  it('keeps the objective answers when moving to preferences', async () => {
    const wrapper = mount(NovaTrilha, {
      global: {
        plugins: [vuetify],
      },
    })

    const textInputs = wrapper.findAll('input[type="text"]')
    await textInputs[0].setValue('Olive')
    await wrapper.get('input[type="email"]').setValue('olive@example.com')
    await textInputs[1].setValue('TypeScript')
    await wrapper.get('input[value="never"]').setValue(true)
    await wrapper.findAll('input[value="beginner"]')[1].setValue(true)
    await wrapper.get('input[value="books"]').setValue(true)
    await wrapper.get('input[value="balanced"]').setValue(true)
    await wrapper.get('input[value="false"]').setValue(true)
    await wrapper.get('input[value="free"]').setValue(true)
    await wrapper.get('form').trigger('submit')

    const questionnaire = useQuestionnaireStore()
    expect(questionnaire.objectiveAnswers.name).toBe('Olive')
    expect(questionnaire.objectiveAnswers.objective?.topic).toBe('TypeScript')
    expect(wrapper.text()).toContain('Preferências de estudo')
  })
})
