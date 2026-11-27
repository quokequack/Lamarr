<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type {
  CurrentSkillLevel,
  ExpectedOutcome,
  LearningFormat,
  ObjectiveQuestionnaire,
} from '../../domain/learning'
import { hasQuestionnaireErrors, validateObjectiveAnswers } from '../../domain/questionnaire'
import type { QuestionnaireErrors } from '../../domain/questionnaire'
import { useQuestionnaireStore } from '../../stores/questionnaire'

const emit = defineEmits<{ next: [] }>()
const questionnaire = useQuestionnaireStore()

const currentDate = new Date().toISOString().slice(0, 10)
const stored = questionnaire.objectiveAnswers
const storedResources = stored.availableResources ?? []

const draft = reactive({
  name: stored.name ?? '',
  email: stored.email ?? '',
  topic: stored.objective?.topic ?? '',
  currentLevel: stored.currentLevel as CurrentSkillLevel | undefined,
  expectedOutcome: stored.expectedOutcome as ExpectedOutcome | undefined,
  durationAmount: stored.duration?.amount ?? 4,
  durationUnit: stored.duration?.unit ?? 'weeks',
  startDate: stored.startDate ?? currentDate,
  studyDaysPerWeek: stored.studyDaysPerWeek ?? 3,
  dailyStudyHours: stored.dailyStudyHours ?? 1,
  resources: storedResources.map((resource) => {
    if (resource.startsWith('Outro:')) {
      return 'other'
    }

    return resource
  }),
  otherResource:
    storedResources
      .find((resource) => resource.startsWith('Outro:'))
      ?.slice(6)
      .trim() ?? '',
  format: stored.preferences?.format as LearningFormat | undefined,
  budget: stored.preferences?.budget as ObjectiveQuestionnaire['preferences']['budget'] | undefined,
  previousAttempts: stored.previousAttempts as boolean | undefined,
})
const errors = ref<QuestionnaireErrors>({})

const levelOptions = [
  { title: 'Nunca tive contato', value: 'never' },
  { title: 'Já vi algo, mas não sei muito', value: 'exposed' },
  { title: 'Tenho noção, mas sou iniciante', value: 'beginner' },
  { title: 'Já estudo com frequência', value: 'frequent' },
]
const outcomeOptions = [
  { title: 'Começar do zero', value: 'beginner' },
  { title: 'Aprofundar meus conhecimentos', value: 'deepen' },
  { title: 'Especializar-me', value: 'specialize' },
  { title: 'Aprender por diversão', value: 'fun' },
  { title: 'Ainda não sei', value: 'undecided' },
]
const durationUnits = [
  { title: 'dias', value: 'days' },
  { title: 'semanas', value: 'weeks' },
  { title: 'meses', value: 'months' },
]
const resourceOptions = [
  { title: 'Livros', value: 'books' },
  { title: 'Celular', value: 'phone' },
  { title: 'Computador', value: 'computer' },
  { title: 'Tablet', value: 'tablet' },
  { title: 'Outro recurso', value: 'other' },
]
const formatOptions = [
  { title: 'Mais prática', value: 'practical' },
  { title: 'Mais teoria', value: 'theoretical' },
  { title: 'Equilibrada', value: 'balanced' },
]
const budgetOptions = [
  { title: 'Gratuitos', value: 'free' },
  { title: 'Pagos', value: 'paid' },
  { title: 'Gratuitos e pagos', value: 'both' },
]

function getAvailableResources() {
  return draft.resources.map((resource) => {
    if (resource !== 'other') {
      return resource
    }

    return `Outro: ${draft.otherResource.trim()}`
  })
}

function getAnswers(): Partial<ObjectiveQuestionnaire> {
  return {
    name: draft.name,
    email: draft.email,
    objective: {
      topic: draft.topic,
      outcome: draft.expectedOutcome ?? '',
      targetLevel: 'beginner',
    },
    currentLevel: draft.currentLevel,
    expectedOutcome: draft.expectedOutcome,
    duration: {
      amount: Number(draft.durationAmount),
      unit: draft.durationUnit,
    },
    startDate: draft.startDate,
    studyDaysPerWeek: Number(draft.studyDaysPerWeek),
    dailyStudyHours: Number(draft.dailyStudyHours),
    availableResources: getAvailableResources(),
    preferences: {
      format: draft.format,
      budget: draft.budget,
    } as ObjectiveQuestionnaire['preferences'],
    previousAttempts: draft.previousAttempts,
  }
}

watch(draft, () => questionnaire.saveObjectiveAnswers(getAnswers()), { deep: true })

function errorFor(field: string) {
  return errors.value[field] ? [errors.value[field]] : []
}

function validateAndContinue() {
  const nextErrors = validateObjectiveAnswers(getAnswers(), currentDate)

  if (draft.resources.includes('other') && !draft.otherResource.trim()) {
    nextErrors.availableResources = 'Descreva o outro recurso disponível.'
  }

  errors.value = nextErrors
  if (hasQuestionnaireErrors(nextErrors)) {
    return
  }

  questionnaire.saveObjectiveAnswers(getAnswers())
  emit('next')
}
</script>

<template>
  <v-form class="questionnaire-form" @submit.prevent="validateAndContinue">
    <div class="form-grid form-grid--two-columns">
      <v-text-field
        v-model="draft.name"
        label="Seu nome"
        aria-label="Seu nome"
        autocomplete="name"
        :error-messages="errorFor('name')"
        required
      />
      <v-text-field
        v-model="draft.email"
        label="Seu email"
        aria-label="Seu email"
        type="email"
        autocomplete="email"
        :error-messages="errorFor('email')"
        required
      />
    </div>

    <v-text-field
      v-model="draft.topic"
      label="O que você quer aprender?"
      aria-label="O que você quer aprender?"
      hint="Pode ser uma matéria, habilidade ou assunto."
      persistent-hint
      :error-messages="errorFor('topic')"
      required
    />

    <v-radio-group
      v-model="draft.currentLevel"
      label="Qual é o seu nível atual nesse assunto?"
      :error-messages="errorFor('currentLevel')"
    >
      <v-radio
        v-for="option in levelOptions"
        :key="option.value"
        :label="option.title"
        :value="option.value"
      />
    </v-radio-group>

    <v-radio-group
      v-model="draft.expectedOutcome"
      label="O que você espera alcançar?"
      :error-messages="errorFor('expectedOutcome')"
    >
      <v-radio
        v-for="option in outcomeOptions"
        :key="option.value"
        :label="option.title"
        :value="option.value"
      />
    </v-radio-group>

    <div class="form-grid form-grid--three-columns">
      <v-text-field
        v-model.number="draft.durationAmount"
        label="Prazo"
        aria-label="Prazo"
        type="number"
        min="1"
        step="1"
        :error-messages="errorFor('duration')"
        required
      />
      <v-select
        v-model="draft.durationUnit"
        label="Unidade do prazo"
        aria-label="Unidade do prazo"
        :items="durationUnits"
        :menu-props="{ eager: true, activatorProps: { 'aria-label': 'Unidade do prazo' } }"
        item-title="title"
        item-value="value"
        :error-messages="errorFor('durationUnit')"
        required
      />
      <v-text-field
        v-model="draft.startDate"
        label="Data de início"
        aria-label="Data de início"
        type="date"
        :min="currentDate"
        :error-messages="errorFor('startDate')"
        required
      />
    </div>

    <div class="form-grid form-grid--two-columns">
      <v-text-field
        v-model.number="draft.studyDaysPerWeek"
        label="Dias de estudo por semana"
        aria-label="Dias de estudo por semana"
        type="number"
        min="1"
        max="7"
        step="1"
        hint="Usamos isso para calcular sua carga disponível."
        persistent-hint
        :error-messages="errorFor('studyDaysPerWeek')"
        required
      />
      <v-text-field
        v-model.number="draft.dailyStudyHours"
        label="Horas por dia"
        aria-label="Horas por dia"
        type="number"
        min="0.5"
        max="12"
        step="0.5"
        :error-messages="errorFor('dailyStudyHours')"
        required
      />
    </div>

    <fieldset
      class="questionnaire-fieldset"
      :aria-describedby="errors.availableResources ? 'resource-errors' : undefined"
    >
      <legend>Quais recursos você tem disponíveis?</legend>
      <v-checkbox
        v-for="option in resourceOptions"
        :key="option.value"
        v-model="draft.resources"
        :label="option.title"
        :value="option.value"
        :aria-describedby="errors.availableResources ? 'resource-errors' : undefined"
        hide-details
      />
      <v-text-field
        v-if="draft.resources.includes('other')"
        v-model="draft.otherResource"
        label="Descreva o outro recurso"
        aria-label="Descreva o outro recurso"
        :error-messages="errorFor('availableResources')"
      />
      <p v-if="errors.availableResources" id="resource-errors" class="field-error" role="alert">
        {{ errors.availableResources }}
      </p>
    </fieldset>

    <v-radio-group
      v-model="draft.format"
      label="Você prefere uma trilha mais prática ou teórica?"
      :error-messages="errorFor('format')"
    >
      <v-radio
        v-for="option in formatOptions"
        :key="option.value"
        :label="option.title"
        :value="option.value"
      />
    </v-radio-group>

    <v-radio-group
      v-model="draft.previousAttempts"
      label="Você já tentou aprender esse assunto antes?"
      :error-messages="errorFor('previousAttempts')"
    >
      <v-radio label="Sim" :value="true" />
      <v-radio label="Não" :value="false" />
    </v-radio-group>

    <v-radio-group
      v-model="draft.budget"
      label="Você prefere recursos gratuitos ou pagos?"
      :error-messages="errorFor('budget')"
    >
      <v-radio
        v-for="option in budgetOptions"
        :key="option.value"
        :label="option.title"
        :value="option.value"
      />
    </v-radio-group>

    <v-alert
      v-if="hasQuestionnaireErrors(errors)"
      id="objective-errors"
      class="questionnaire-errors"
      type="error"
      variant="tonal"
      role="alert"
    >
      Revise os campos destacados antes de avançar.
    </v-alert>

    <v-btn color="primary" type="submit"> Avançar para preferências </v-btn>
  </v-form>
</template>

<style scoped>
.questionnaire-form {
  display: grid;
  gap: 1.25rem;
}

.form-grid {
  display: grid;
  gap: 1rem;
}

.form-grid--two-columns {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.form-grid--three-columns {
  grid-template-columns: 1fr 1fr 1.3fr;
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

.questionnaire-errors {
  margin-top: 0.25rem;
}

@media (max-width: 700px) {
  .form-grid--two-columns,
  .form-grid--three-columns {
    grid-template-columns: 1fr;
  }
}
</style>
