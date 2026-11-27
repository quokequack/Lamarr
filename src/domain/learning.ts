export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export type CurrentSkillLevel = 'never' | 'exposed' | 'beginner' | 'frequent'

export type ExpectedOutcome = 'beginner' | 'deepen' | 'specialize' | 'fun' | 'undecided'

export type DurationUnit = 'days' | 'weeks' | 'months'

export interface Duration {
  amount: number
  unit: DurationUnit
}

export type LearningFormat = 'practical' | 'theoretical' | 'balanced'

export type LearningMethod = 'reading' | 'listening' | 'watching' | 'practice' | 'writing' | 'other'

export type StudyPeriod = 'morning' | 'afternoon' | 'evening' | 'night'

export type MaterialType = 'book' | 'video' | 'article' | 'podcast' | 'file' | 'other'

export interface Material {
  id: string
  title: string
  type: MaterialType
  url?: string
  author?: string
  isFree?: boolean
}

export interface LearningObjective {
  topic: string
  outcome: string
  targetLevel: SkillLevel
}

export interface LearningPreferences {
  dailyStudyHours: number
  format: LearningFormat
  methods: LearningMethod[]
  preferredPeriod: StudyPeriod
  availableResources: string[]
  budget: 'free' | 'paid' | 'both'
}

export interface LearningActivity {
  id: string
  title: string
  description: string
  duration: Duration
  materials: Material[]
  completed: boolean
}

export interface LearningModule {
  id: string
  title: string
  description: string
  level: SkillLevel
  activities: LearningActivity[]
}

export type TrailStatus = 'draft' | 'ready' | 'archived'

export interface LearningTrail {
  id: string
  title: string
  summary: string
  objective: LearningObjective
  preferences: LearningPreferences
  duration: Duration
  modules: LearningModule[]
  status: TrailStatus
  createdAt: string
  updatedAt: string
}

export type GenerationState = 'idle' | 'generating' | 'ready' | 'error'

export interface TrailGeneration {
  state: GenerationState
  errorMessage?: string
  trailId?: string
}

export interface ObjectiveQuestionnaire {
  name: string
  email: string
  objective: LearningObjective
  currentLevel: CurrentSkillLevel
  expectedOutcome: ExpectedOutcome
  duration: Duration
  startDate: string
  studyDaysPerWeek: number
  dailyStudyHours: number
  availableResources: string[]
  preferences: Pick<LearningPreferences, 'format' | 'budget'>
  previousAttempts: boolean
}

export interface PreferenceQuestionnaire {
  organizationMethod: string
  organizationOther?: string
  listensToMusic: boolean
  musicType?: string
  methods: LearningMethod[]
  methodOther?: string
  preferredPeriod: StudyPeriod
  projectPreference: string
  projectOther?: string
}

export interface StudyAvailability {
  startDate: string
  endDate: string
  studyDaysPerWeek: number
  dailyStudyHours: number
  totalStudyHours: number
}

export interface TrailGenerationInput {
  learner: Pick<ObjectiveQuestionnaire, 'name' | 'email'>
  objective: LearningObjective
  currentLevel: CurrentSkillLevel
  expectedOutcome: ExpectedOutcome
  duration: Duration
  availability: StudyAvailability
  availableResources: string[]
  learningPreferences: Pick<LearningPreferences, 'format' | 'budget'> & PreferenceQuestionnaire
  previousAttempts: boolean
}
