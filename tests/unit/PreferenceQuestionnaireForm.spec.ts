import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import PreferenceQuestionnaireForm from '../../src/components/questionnaire/PreferenceQuestionnaireForm.vue'
import { useQuestionnaireStore } from '../../src/stores/questionnaire'

const vuetify = createVuetify({ components, directives })

beforeEach(() => {
  window.sessionStorage.clear()
  setActivePinia(createPinia())
})

it('requires descriptions for other preferences before continuing', async () => {
  useQuestionnaireStore().savePreferenceAnswers({
    organizationMethod: 'other',
    listensToMusic: false,
    methods: ['other'],
    preferredPeriod: 'evening',
    projectPreference: 'other',
  })
  const wrapper = mount(PreferenceQuestionnaireForm, { global: { plugins: [vuetify] } })

  await wrapper.get('form').trigger('submit')
  await flushPromises()

  expect(wrapper.emitted('next')).toBeUndefined()
  expect(wrapper.text()).toContain('Descreva como você organiza suas ideias.')
  expect(wrapper.text()).toContain('Descreva seu outro método de aprendizado.')
  expect(wrapper.text()).toContain('Descreva o outro tipo de projeto.')

  const descriptions = wrapper.findAllComponents(components.VTextField)
  await descriptions
    .find((field) => field.props('label') === 'Descreva como você organiza suas ideias')!
    .get('input')
    .setValue('Quadro de tarefas')
  await descriptions
    .find((field) => field.props('label') === 'Descreva seu outro método')!
    .get('input')
    .setValue('Ensinar outras pessoas')
  await descriptions
    .find((field) => field.props('label') === 'Descreva o outro tipo de projeto')!
    .get('input')
    .setValue('Projetos em grupo')
  await wrapper.get('form').trigger('submit')
  await flushPromises()

  expect(useQuestionnaireStore().preferenceAnswers).toMatchObject({
    organizationOther: 'Quadro de tarefas',
    methodOther: 'Ensinar outras pessoas',
    projectOther: 'Projetos em grupo',
  })
  expect(wrapper.emitted('next')).toHaveLength(1)
})
