<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { LearningMethod, PreferenceQuestionnaire, StudyPeriod } from '../../domain/learning'
import { hasQuestionnaireErrors, validatePreferenceAnswers } from '../../domain/questionnaire'
import type { QuestionnaireErrors } from '../../domain/questionnaire'
import { useQuestionnaireStore } from '../../stores/questionnaire'

const emit = defineEmits<{ back: []; next: [] }>()
const questionnaire = useQuestionnaireStore()
const stored = questionnaire.preferenceAnswers

const draft = reactive({
  organizationMethod: stored.organizationMethod ?? '',
  organizationOther: stored.organizationOther ?? '',
  listensToMusic: stored.listensToMusic as boolean | undefined,
  musicType: stored.musicType ?? '',
  methods: [...(stored.methods ?? [])] as LearningMethod[],
  methodOther: stored.methodOther ?? '',
  preferredPeriod: stored.preferredPeriod as StudyPeriod | undefined,
  projectPreference: stored.projectPreference ?? '',
  projectOther: stored.projectOther ?? '',
})
const errors = ref<QuestionnaireErrors>({})

const organizationOptions = [
  { title: 'Anotações simples', value: 'simple-notes' },
  { title: 'Mapas mentais', value: 'mind-maps' },
  { title: 'Flashcards', value: 'flashcards' },
  { title: 'Softwares de organização (Notion, Obsidian, Notepad)', value: 'organization-software' },
  { title: 'Listas', value: 'lists' },
  { title: 'Outro jeito', value: 'other' },
]
const methodOptions = [
  { title: 'Lendo', value: 'reading' },
  { title: 'Ouvindo', value: 'listening' },
  { title: 'Assistindo alguém fazer', value: 'watching' },
  { title: 'Fazendo', value: 'practice' },
  { title: 'Escrevendo', value: 'writing' },
  { title: 'Outro método', value: 'other' },
]
const periodOptions = [
  { title: 'Manhã', value: 'morning' },
  { title: 'Tarde', value: 'afternoon' },
  { title: 'Noite', value: 'evening' },
  { title: 'Madrugada', value: 'night' },
]
const projectOptions = [
  { title: 'Lógica e análise de dados', value: 'logic-and-data' },
  { title: 'Criatividade e pensar fora da caixa', value: 'creativity' },
  { title: 'Ação rápida e resultados práticos', value: 'quick-results' },
  { title: 'Outro tipo de projeto', value: 'other' },
]

function getAnswers(): Partial<PreferenceQuestionnaire> {
  return {
    organizationMethod: draft.organizationMethod,
    organizationOther: draft.organizationOther,
    listensToMusic: draft.listensToMusic,
    musicType: draft.musicType,
    methods: draft.methods,
    methodOther: draft.methodOther,
    preferredPeriod: draft.preferredPeriod,
    projectPreference: draft.projectPreference,
    projectOther: draft.projectOther,
  }
}

watch(draft, () => questionnaire.savePreferenceAnswers(getAnswers()), { deep: true })

function errorFor(field: string) {
  return errors.value[field] ? [errors.value[field]] : []
}

function validateAndContinue() {
  const nextErrors = validatePreferenceAnswers(getAnswers())

  errors.value = nextErrors

  if (hasQuestionnaireErrors(nextErrors)) {
    return
  }

  questionnaire.savePreferenceAnswers(getAnswers())
  emit('next')
}
</script>

<template>
  <v-form class="questionnaire-form" @submit.prevent="validateAndContinue">
    <v-select
      v-model="draft.organizationMethod"
      label="Como você costuma organizar suas ideias?"
      aria-label="Como você costuma organizar suas ideias?"
      :items="organizationOptions"
      :menu-props="{
        eager: true,
        activatorProps: { 'aria-label': 'Como você costuma organizar suas ideias?' },
      }"
      item-title="title"
      item-value="value"
      :error-messages="errorFor('organizationMethod')"
      required
    />
    <v-text-field
      v-if="draft.organizationMethod === 'other'"
      v-model="draft.organizationOther"
      label="Descreva como você organiza suas ideias"
      aria-label="Descreva como você organiza suas ideias"
      :error-messages="errorFor('organizationMethod')"
    />

    <v-radio-group
      v-model="draft.listensToMusic"
      label="Você escuta música enquanto estuda?"
      :error-messages="errorFor('listensToMusic')"
    >
      <v-radio label="Sim" :value="true" />
      <v-radio label="Não" :value="false" />
    </v-radio-group>

    <v-text-field
      v-if="draft.listensToMusic"
      v-model="draft.musicType"
      label="Que tipo de música você escuta?"
      aria-label="Que tipo de música você escuta?"
      hint="Essa resposta é opcional quando você não estuda com música."
      persistent-hint
      :error-messages="errorFor('musicType')"
    />

    <fieldset
      class="questionnaire-fieldset"
      :aria-describedby="errors.methods ? 'method-errors' : undefined"
    >
      <legend>Qual é o seu melhor método de aprendizado?</legend>
      <v-checkbox
        v-for="option in methodOptions"
        :key="option.value"
        v-model="draft.methods"
        :label="option.title"
        :value="option.value"
        :aria-describedby="errors.methods ? 'method-errors' : undefined"
        hide-details
      />
      <v-text-field
        v-if="draft.methods.includes('other')"
        v-model="draft.methodOther"
        label="Descreva seu outro método"
        aria-label="Descreva seu outro método"
        :error-messages="errorFor('methods')"
      />
      <p v-if="errors.methods" id="method-errors" class="field-error" role="alert">
        {{ errors.methods }}
      </p>
    </fieldset>

    <v-radio-group
      v-model="draft.preferredPeriod"
      label="Qual é o melhor horário para estudar?"
      :error-messages="errorFor('preferredPeriod')"
    >
      <v-radio
        v-for="option in periodOptions"
        :key="option.value"
        :label="option.title"
        :value="option.value"
      />
    </v-radio-group>
    <v-radio-group
      v-model="draft.projectPreference"
      label="Que tipo de projeto você gosta de fazer?"
      :error-messages="errorFor('projectPreference')"
    >
      <v-radio
        v-for="option in projectOptions"
        :key="option.value"
        :label="option.title"
        :value="option.value"
      />
    </v-radio-group>
    <v-text-field
      v-if="draft.projectPreference === 'other'"
      v-model="draft.projectOther"
      label="Descreva o outro tipo de projeto"
      aria-label="Descreva o outro tipo de projeto"
      :error-messages="errorFor('projectPreference')"
    />

    <v-alert
      v-if="hasQuestionnaireErrors(errors)"
      class="questionnaire-errors"
      type="error"
      variant="tonal"
      role="alert"
    >
      Revise os campos destacados antes de avançar.
    </v-alert>

    <div class="questionnaire-actions">
      <v-btn type="button" variant="outlined" @click="emit('back')"> Voltar </v-btn>
      <v-btn color="primary" type="submit"> Revisar respostas </v-btn>
    </div>
  </v-form>
</template>

<style scoped>
.questionnaire-form {
  display: grid;
  gap: 1.25rem;
}

.questionnaire-fieldset {
  border: 1px solid rgba(23, 22, 21, 0.18);
  border-radius: 0.5rem;
  padding: 1rem;
}

.questionnaire-fieldset legend {
  font-weight: 700;
  padding-inline: 0.35rem;
}

.field-error {
  color: rgb(var(--v-theme-error));
  font-size: 0.75rem;
  margin: 0.5rem 0 0;
}

.questionnaire-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: space-between;
}
</style>
