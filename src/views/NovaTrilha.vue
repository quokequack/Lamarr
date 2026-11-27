<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import ObjectiveQuestionnaireForm from '../components/questionnaire/ObjectiveQuestionnaireForm.vue'
import PreferenceQuestionnaireForm from '../components/questionnaire/PreferenceQuestionnaireForm.vue'
import QuestionnaireReview from '../components/questionnaire/QuestionnaireReview.vue'
import { useQuestionnaireStore } from '../stores/questionnaire'

const questionnaire = useQuestionnaireStore()
const currentStep = ref(1)
const steps = ['Objetivos e disponibilidade', 'Preferências de estudo', 'Revisão']
const progress = computed(() => (currentStep.value / steps.length) * 100)
const stepHeading = ref<HTMLHeadingElement | null>(null)

watch(currentStep, async () => {
  await nextTick()
  stepHeading.value?.focus()
})

function goToNextStep() {
  currentStep.value = Math.min(steps.length, currentStep.value + 1)
}

function goToPreviousStep() {
  currentStep.value = Math.max(1, currentStep.value - 1)
}

function restartQuestionnaire() {
  questionnaire.reset()
  currentStep.value = 1
}
</script>

<template>
  <main class="new-trail-page">
    <v-container>
      <p class="section-label">Nova trilha</p>
      <h1 id="questionnaire-title">Qual é o seu próximo objetivo?</h1>
      <p class="new-trail-page__intro">
        Responda no seu ritmo. O rascunho fica salvo durante esta sessão e pode ser revisado antes
        de preparar a geração da sua trilha.
      </p>

      <section class="questionnaire-shell" aria-labelledby="questionnaire-title">
        <div class="questionnaire-progress" aria-live="polite">
          <div class="questionnaire-progress__heading">
            <span>Etapa {{ currentStep }} de {{ steps.length }}</span>
            <h2 ref="stepHeading" class="questionnaire-step-title" tabindex="-1">
              {{ steps[currentStep - 1] }}
            </h2>
          </div>
          <v-progress-linear
            :model-value="progress"
            color="primary"
            height="8"
            rounded
            aria-label="Progresso do questionário"
          />
        </div>

        <ObjectiveQuestionnaireForm v-if="currentStep === 1" @next="goToNextStep" />
        <PreferenceQuestionnaireForm
          v-else-if="currentStep === 2"
          @back="goToPreviousStep"
          @next="goToNextStep"
        />
        <QuestionnaireReview
          v-else
          @edit-objectives="currentStep = 1"
          @edit-preferences="currentStep = 2"
          @restart="restartQuestionnaire"
        />
      </section>
    </v-container>
  </main>
</template>

<style scoped>
.new-trail-page {
  min-height: 70vh;
  padding-block: clamp(4rem, 10vw, 8rem);
}

h1 {
  font-size: clamp(3rem, 8vw, 7rem);
  letter-spacing: -0.08em;
  line-height: 0.9;
  margin: 2rem 0;
  max-width: 8ch;
}

.new-trail-page__intro {
  color: var(--lamarr-muted-light);
  line-height: 1.6;
  max-width: 36rem;
}

.questionnaire-shell {
  background: rgba(255, 255, 255, 0.58);
  border: 1px solid rgba(23, 22, 21, 0.12);
  border-radius: 1rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: minmax(0, 1fr);
  margin-top: 3rem;
  max-width: 54rem;
  padding: clamp(1rem, 4vw, 2rem);
}

.questionnaire-shell :deep(.v-input),
.questionnaire-shell :deep(.v-field) {
  --v-medium-emphasis-opacity: 0.85;
}

.questionnaire-shell :deep(.v-field:has(input:focus-visible)) {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}

.questionnaire-shell :deep(.v-btn) {
  height: auto;
  max-width: 100%;
  min-height: var(--v-btn-height);
  padding-block: 0.5rem;
}

.questionnaire-shell :deep(.v-btn__content) {
  white-space: normal;
}

.questionnaire-progress {
  display: grid;
  gap: 0.75rem;
}

.questionnaire-progress__heading {
  display: flex;
  flex-wrap: wrap;
  font-size: 0.85rem;
  font-weight: 700;
  gap: 0.5rem 1rem;
  justify-content: space-between;
}

.questionnaire-step-title {
  color: var(--lamarr-muted-light);
  font: inherit;
  margin: 0;
}
</style>
