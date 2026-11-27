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
  setActivePinia(createPinia())
})

describe('NovaTrilha', () => {
  it('saves the objective when the public form is submitted', async () => {
    const wrapper = mount(NovaTrilha, {
      global: {
        plugins: [vuetify],
      },
    })

    await wrapper.get('input').setValue('TypeScript')
    await wrapper.get('form').trigger('submit')

    const questionnaire = useQuestionnaireStore()
    expect(questionnaire.objectiveAnswers.objective).toEqual({
      topic: 'TypeScript',
      outcome: 'Construir uma base de estudo possível para minha rotina.',
      targetLevel: 'beginner',
    })
    expect(wrapper.text()).toContain('Objetivo salvo nesta sessão.')
  })
})
