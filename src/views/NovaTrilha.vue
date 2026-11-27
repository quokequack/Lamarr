<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SkillLevel } from '../domain/learning'
import { useQuestionnaireStore } from '../stores/questionnaire'

const questionnaire = useQuestionnaireStore()
const topic = ref('')
const level = ref<SkillLevel>('beginner')
const saved = ref(false)

const levelOptions: { title: string; value: SkillLevel }[] = [
  { title: 'Iniciante', value: 'beginner' },
  { title: 'Intermediário', value: 'intermediate' },
  { title: 'Avançado', value: 'advanced' },
]

const canSave = computed(() => topic.value.trim().length > 0)

function saveObjective() {
  if (!canSave.value) {
    return
  }

  questionnaire.saveObjectiveAnswers({
    objective: {
      topic: topic.value.trim(),
      outcome: 'Construir uma base de estudo possível para minha rotina.',
      targetLevel: level.value,
    },
  })
  saved.value = true
}
</script>

<template>
  <v-container class="new-trail-page">
    <p class="section-label">Nova trilha</p>
    <h1>Qual é o seu próximo objetivo?</h1>
    <p class="new-trail-page__intro">
      Esta primeira etapa guarda o objetivo para que o questionário completo possa continuar depois.
    </p>

    <v-form class="objective-form" @submit.prevent="saveObjective">
      <v-text-field v-model="topic" label="O que você quer aprender?" required />
      <v-select v-model="level" :items="levelOptions" label="Qual é o seu nível?" />
      <v-btn color="primary" type="submit" :disabled="!canSave"> Salvar objetivo </v-btn>
      <v-alert v-if="saved" type="success" variant="tonal">
        Objetivo salvo nesta sessão. O próximo passo será definir suas preferências.
      </v-alert>
    </v-form>
  </v-container>
</template>

<style scoped>
.new-trail-page {
  min-height: 70vh;
  padding-block: clamp(4rem, 10vw, 8rem);
}

.section-label {
  color: rgb(var(--v-theme-secondary));
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(3rem, 8vw, 7rem);
  letter-spacing: -0.08em;
  line-height: 0.9;
  margin: 2rem 0;
  max-width: 8ch;
}

.new-trail-page__intro {
  color: rgb(var(--v-theme-secondary));
  line-height: 1.6;
  max-width: 36rem;
}

.objective-form {
  display: grid;
  gap: 1rem;
  margin-top: 3rem;
  max-width: 36rem;
}
</style>
