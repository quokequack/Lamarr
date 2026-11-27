import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { LearningTrail, TrailGeneration } from '../domain/learning'

export const useTrailsStore = defineStore('trails', () => {
  const trails = ref<LearningTrail[]>([])
  const generation = ref<TrailGeneration>({ state: 'idle' })

  const hasTrails = computed(() => trails.value.length > 0)
  const readyTrails = computed(() => trails.value.filter((trail) => trail.status === 'ready'))

  function addTrail(trail: LearningTrail) {
    trails.value = [trail, ...trails.value.filter((item) => item.id !== trail.id)]
    generation.value = { state: 'ready', trailId: trail.id }
  }

  function startGeneration() {
    generation.value = { state: 'generating' }
  }

  function failGeneration(errorMessage: string) {
    generation.value = { state: 'error', errorMessage }
  }

  function clear() {
    trails.value = []
    generation.value = { state: 'idle' }
  }

  return {
    trails,
    generation,
    hasTrails,
    readyTrails,
    addTrail,
    startGeneration,
    failGeneration,
    clear,
  }
})
