<script setup lang="ts">
import { computed } from 'vue'
import { useQuestionnaireStore } from '../../stores/questionnaire'

const emit = defineEmits<{
  editObjectives: []
  editPreferences: []
  restart: []
}>()
const questionnaire = useQuestionnaireStore()
const generationInput = computed(() => questionnaire.generationInput)

const currentLevelLabels = {
  never: 'Nunca tive contato',
  exposed: 'Já vi algo, mas não sei muito',
  beginner: 'Tenho noção, mas sou iniciante',
  frequent: 'Já estudo com frequência',
}
const formatLabels = {
  practical: 'Mais prática',
  theoretical: 'Mais teoria',
  balanced: 'Equilibrada',
}
const budgetLabels = {
  free: 'Gratuitos',
  paid: 'Pagos',
  both: 'Gratuitos e pagos',
}
const periodLabels = {
  morning: 'Manhã',
  afternoon: 'Tarde',
  evening: 'Noite',
  night: 'Madrugada',
}
const outcomeLabels = {
  beginner: 'Começar do zero',
  deepen: 'Aprofundar meus conhecimentos',
  specialize: 'Especializar-me',
  fun: 'Aprender por diversão',
  undecided: 'Ainda não sei',
}

const formattedDates = computed(() => {
  const availability = generationInput.value?.availability
  if (!availability) {
    return null
  }

  const format = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' })
  return {
    start: format.format(new Date(`${availability.startDate}T00:00:00`)),
    end: format.format(new Date(`${availability.endDate}T00:00:00`)),
  }
})

function confirmReview() {
  questionnaire.confirmReview()
}

function resourceLabel(resource: string) {
  return resource.replace(/^Outro: /, '')
}

function organizationLabel(organizationMethod: string, organizationOther?: string) {
  return organizationMethod === 'other' ? organizationOther : organizationMethod
}

function methodsLabel(methods: string[], methodOther?: string) {
  return methods
    .map((method) => (method === 'other' ? methodOther : method))
    .filter(Boolean)
    .join(', ')
}

function projectLabel(projectPreference: string, projectOther?: string) {
  return projectPreference === 'other' ? projectOther : projectPreference
}
</script>

<template>
  <section aria-labelledby="review-title" class="review">
    <h2 id="review-title">Revise suas respostas</h2>
    <p class="review__intro">
      Confira os dados que serão preparados para a geração da sua trilha. Você ainda pode voltar e
      editar qualquer etapa.
    </p>

    <v-alert v-if="!generationInput" type="error" variant="tonal" role="alert">
      Ainda há respostas inválidas. Volte às etapas anteriores para corrigir os campos destacados.
    </v-alert>

    <template v-else>
      <div class="review-grid">
        <section class="review-card" aria-labelledby="review-objective-title">
          <div class="review-card__header">
            <h3 id="review-objective-title">Objetivos</h3>
            <v-btn variant="text" size="small" @click="emit('editObjectives')">
              Editar objetivos
            </v-btn>
          </div>
          <dl>
            <div>
              <dt>Nome</dt>
              <dd>{{ generationInput.learner.name }}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{{ generationInput.learner.email }}</dd>
            </div>
            <div>
              <dt>Assunto</dt>
              <dd>{{ generationInput.objective.topic }}</dd>
            </div>
            <div>
              <dt>Nível atual</dt>
              <dd>{{ currentLevelLabels[generationInput.currentLevel] }}</dd>
            </div>
            <div>
              <dt>Objetivo esperado</dt>
              <dd>{{ outcomeLabels[generationInput.expectedOutcome] }}</dd>
            </div>
            <div>
              <dt>Prazo</dt>
              <dd>{{ generationInput.duration.amount }} {{ generationInput.duration.unit }}</dd>
            </div>
            <div>
              <dt>Recursos</dt>
              <dd>{{ generationInput.availableResources.map(resourceLabel).join(', ') }}</dd>
            </div>
            <div>
              <dt>Trilha</dt>
              <dd>{{ formatLabels[generationInput.learningPreferences.format] }}</dd>
            </div>
            <div>
              <dt>Recursos sugeridos</dt>
              <dd>{{ budgetLabels[generationInput.learningPreferences.budget] }}</dd>
            </div>
            <div>
              <dt>Tentativas anteriores</dt>
              <dd>{{ generationInput.previousAttempts ? 'Sim' : 'Não' }}</dd>
            </div>
          </dl>
        </section>

        <section class="review-card" aria-labelledby="review-availability-title">
          <div class="review-card__header">
            <h3 id="review-availability-title">Disponibilidade</h3>
            <v-btn variant="text" size="small" @click="emit('editObjectives')">
              Editar objetivos
            </v-btn>
          </div>
          <dl>
            <div>
              <dt>Início</dt>
              <dd>{{ formattedDates?.start }}</dd>
            </div>
            <div>
              <dt>Fim estimado</dt>
              <dd>{{ formattedDates?.end }}</dd>
            </div>
            <div>
              <dt>Dias por semana</dt>
              <dd>{{ generationInput.availability.studyDaysPerWeek }}</dd>
            </div>
            <div>
              <dt>Horas por dia</dt>
              <dd>{{ generationInput.availability.dailyStudyHours }}</dd>
            </div>
            <div>
              <dt>Carga disponível estimada</dt>
              <dd>{{ generationInput.availability.totalStudyHours }} horas</dd>
            </div>
          </dl>
        </section>

        <section class="review-card" aria-labelledby="review-preferences-title">
          <div class="review-card__header">
            <h3 id="review-preferences-title">Preferências</h3>
            <v-btn variant="text" size="small" @click="emit('editPreferences')">
              Editar preferências
            </v-btn>
          </div>
          <dl>
            <div>
              <dt>Organização</dt>
              <dd>
                {{
                  organizationLabel(
                    generationInput.learningPreferences.organizationMethod,
                    generationInput.learningPreferences.organizationOther,
                  )
                }}
              </dd>
            </div>
            <div>
              <dt>Música</dt>
              <dd>
                {{
                  generationInput.learningPreferences.listensToMusic
                    ? `Sim — ${generationInput.learningPreferences.musicType}`
                    : 'Não'
                }}
              </dd>
            </div>
            <div>
              <dt>Métodos</dt>
              <dd>
                {{
                  methodsLabel(
                    generationInput.learningPreferences.methods,
                    generationInput.learningPreferences.methodOther,
                  )
                }}
              </dd>
            </div>
            <div>
              <dt>Horário</dt>
              <dd>{{ periodLabels[generationInput.learningPreferences.preferredPeriod] }}</dd>
            </div>
            <div>
              <dt>Projetos</dt>
              <dd>
                {{
                  projectLabel(
                    generationInput.learningPreferences.projectPreference,
                    generationInput.learningPreferences.projectOther,
                  )
                }}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <v-alert
        v-if="questionnaire.reviewConfirmed"
        color="#256b2a"
        type="success"
        variant="tonal"
        role="status"
      >
        Respostas confirmadas e prontas para a geração da trilha.
      </v-alert>

      <div class="review-actions">
        <v-btn type="button" variant="outlined" @click="emit('editPreferences')">
          Voltar e editar
        </v-btn>
        <v-btn color="primary" type="button" @click="confirmReview">
          Confirmar e preparar geração
        </v-btn>
      </div>
    </template>

    <v-btn type="button" variant="text" @click="emit('restart')">Recomeçar questionário</v-btn>
  </section>
</template>

<style scoped>
.review {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: minmax(0, 1fr);
}

.review h2 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  margin: 0;
}

.review__intro {
  color: var(--lamarr-muted-light);
  line-height: 1.6;
  margin: 0;
}

.review-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(0, 1fr);
}

.review-card {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(23, 22, 21, 0.12);
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.review-card__header {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
}

.review-card h3 {
  margin: 0;
}

dl {
  display: grid;
  gap: 0.75rem;
  margin: 1.25rem 0 0;
}

dl div {
  display: grid;
  gap: 0.25rem;
  grid-template-columns: minmax(10rem, 0.6fr) 1fr;
}

dt {
  color: var(--lamarr-muted-light);
  font-size: 0.85rem;
}

dd {
  margin: 0;
  overflow-wrap: anywhere;
}

.review-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: space-between;
}

@media (max-width: 600px) {
  dl div {
    grid-template-columns: 1fr;
  }
}
</style>
