import type {
  Duration,
  ExpectedOutcome,
  ObjectiveQuestionnaire,
  PreferenceQuestionnaire,
  SkillLevel,
  TrailGenerationInput,
} from './learning'

export type QuestionnaireField = string
export type QuestionnaireErrors = Partial<Record<QuestionnaireField, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const skillLevelForOutcome: Record<ExpectedOutcome, SkillLevel> = {
  beginner: 'beginner',
  deepen: 'intermediate',
  specialize: 'advanced',
  fun: 'beginner',
  undecided: 'beginner',
}

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const date = new Date(`${value}T00:00:00`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

function getDateWithOffset(date: Date, duration: Duration): Date {
  const result = new Date(date)

  if (duration.unit === 'days') {
    result.setDate(result.getDate() + duration.amount)
  }

  if (duration.unit === 'weeks') {
    result.setDate(result.getDate() + duration.amount * 7)
  }

  if (duration.unit === 'months') {
    const originalDay = result.getDate()
    result.setDate(1)
    result.setMonth(result.getMonth() + duration.amount)
    const lastDayOfTargetMonth = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate()
    result.setDate(Math.min(originalDay, lastDayOfTargetMonth))
  }

  return result
}

function getDurationInDays(startDate: string, duration: Duration): number {
  const start = new Date(`${startDate}T00:00:00`)
  const end = getDateWithOffset(start, duration)
  const millisecondsPerDay = 24 * 60 * 60 * 1000

  return Math.max(1, Math.round((end.getTime() - start.getTime()) / millisecondsPerDay))
}

export function calculateEndDate(startDate: string, duration: Duration): string {
  if (!isValidDate(startDate)) {
    return ''
  }

  return getDateWithOffset(new Date(`${startDate}T00:00:00`), duration)
    .toISOString()
    .slice(0, 10)
}

export function calculateTotalStudyHours(
  startDate: string,
  duration: Duration,
  dailyStudyHours: number,
  studyDaysPerWeek: number,
): number {
  const durationInDays = getDurationInDays(startDate, duration)
  const totalHours = (durationInDays / 7) * studyDaysPerWeek * dailyStudyHours

  return Math.round(totalHours * 10) / 10
}

export function validateObjectiveAnswers(
  answers: Partial<ObjectiveQuestionnaire>,
  today = new Date().toISOString().slice(0, 10),
): QuestionnaireErrors {
  const errors: QuestionnaireErrors = {}

  if (!answers.name?.trim()) {
    errors.name = 'Informe seu nome.'
  }

  if (!answers.email?.trim()) {
    errors.email = 'Informe seu email.'
  } else if (!EMAIL_PATTERN.test(answers.email.trim())) {
    errors.email = 'Digite um email válido.'
  }

  if (!answers.objective?.topic.trim()) {
    errors.topic = 'Informe o assunto que você quer aprender.'
  }

  if (!answers.currentLevel) {
    errors.currentLevel = 'Selecione seu nível atual.'
  }

  if (!answers.expectedOutcome) {
    errors.expectedOutcome = 'Selecione o objetivo esperado.'
  }

  if (!answers.duration?.amount || answers.duration.amount < 1) {
    errors.duration = 'O prazo deve ser de pelo menos 1 unidade.'
  }

  if (!answers.duration?.unit) {
    errors.durationUnit = 'Selecione a unidade do prazo.'
  }

  if (!answers.startDate) {
    errors.startDate = 'Informe a data de início.'
  } else if (!isValidDate(answers.startDate)) {
    errors.startDate = 'Informe uma data de início válida.'
  } else if (answers.startDate < today) {
    errors.startDate = 'A data de início não pode estar no passado.'
  }

  const hasInvalidStudyDays =
    !answers.studyDaysPerWeek || answers.studyDaysPerWeek < 1 || answers.studyDaysPerWeek > 7
  if (hasInvalidStudyDays) {
    errors.studyDaysPerWeek = 'Escolha entre 1 e 7 dias de estudo por semana.'
  }

  const hasInvalidDailyStudyHours =
    !answers.dailyStudyHours || answers.dailyStudyHours < 0.5 || answers.dailyStudyHours > 12
  if (hasInvalidDailyStudyHours) {
    errors.dailyStudyHours = 'Informe entre 0,5 e 12 horas por dia.'
  }

  if (!answers.availableResources?.length) {
    errors.availableResources = 'Selecione pelo menos um recurso disponível.'
  }

  if (!answers.preferences?.format) {
    errors.format = 'Escolha o equilíbrio entre prática e teoria.'
  }

  if (!answers.preferences?.budget) {
    errors.budget = 'Escolha entre recursos gratuitos, pagos ou ambos.'
  }

  if (typeof answers.previousAttempts !== 'boolean') {
    errors.previousAttempts = 'Responda se já tentou aprender esse assunto.'
  }

  return errors
}

export function validatePreferenceAnswers(
  answers: Partial<PreferenceQuestionnaire>,
): QuestionnaireErrors {
  const errors: QuestionnaireErrors = {}

  if (!answers.organizationMethod?.trim()) {
    errors.organizationMethod = 'Escolha como você organiza suas ideias.'
  }

  if (answers.organizationMethod === 'other' && !answers.organizationOther?.trim()) {
    errors.organizationMethod = 'Descreva como você organiza suas ideias.'
  }

  if (typeof answers.listensToMusic !== 'boolean') {
    errors.listensToMusic = 'Responda se você escuta música ao estudar.'
  }

  if (answers.listensToMusic && !answers.musicType?.trim()) {
    errors.musicType = 'Informe o tipo de música que você prefere.'
  }

  if (!answers.methods?.length) {
    errors.methods = 'Selecione pelo menos um método de aprendizado.'
  }

  if (answers.methods?.includes('other') && !answers.methodOther?.trim()) {
    errors.methods = 'Descreva seu outro método de aprendizado.'
  }

  if (!answers.preferredPeriod) {
    errors.preferredPeriod = 'Escolha seu melhor horário para estudar.'
  }

  if (!answers.projectPreference?.trim()) {
    errors.projectPreference = 'Escolha o tipo de projeto que combina com você.'
  }

  if (answers.projectPreference === 'other' && !answers.projectOther?.trim()) {
    errors.projectPreference = 'Descreva o outro tipo de projeto.'
  }

  return errors
}

export function hasQuestionnaireErrors(errors: QuestionnaireErrors): boolean {
  return Object.keys(errors).length > 0
}

export function mapQuestionnaireToGenerationInput(
  objective: ObjectiveQuestionnaire,
  preferences: PreferenceQuestionnaire,
): TrailGenerationInput {
  const endDate = calculateEndDate(objective.startDate, objective.duration)

  return {
    learner: {
      name: objective.name.trim(),
      email: objective.email.trim(),
    },
    objective: {
      ...objective.objective,
      topic: objective.objective.topic.trim(),
      targetLevel: skillLevelForOutcome[objective.expectedOutcome],
    },
    currentLevel: objective.currentLevel,
    expectedOutcome: objective.expectedOutcome,
    duration: objective.duration,
    availability: {
      startDate: objective.startDate,
      endDate,
      studyDaysPerWeek: objective.studyDaysPerWeek,
      dailyStudyHours: objective.dailyStudyHours,
      totalStudyHours: calculateTotalStudyHours(
        objective.startDate,
        objective.duration,
        objective.dailyStudyHours,
        objective.studyDaysPerWeek,
      ),
    },
    availableResources: objective.availableResources,
    learningPreferences: {
      ...objective.preferences,
      ...preferences,
    },
    previousAttempts: objective.previousAttempts,
  }
}
