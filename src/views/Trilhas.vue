<script setup lang="ts">
import { useTrailsStore } from '../stores/trails'

const trails = useTrailsStore()
</script>

<template>
  <v-container class="trails-page">
    <div class="trails-page__header">
      <div>
        <p class="section-label">Área autenticada</p>
        <h1>Suas trilhas</h1>
      </div>
      <v-btn color="primary" to="/trilhas/nova"> Nova trilha </v-btn>
    </div>

    <v-card v-if="!trails.hasTrails" class="empty-state" variant="outlined">
      <v-icon icon="mdi-map-marker-path" size="48" />
      <h2>Você ainda não tem trilhas salvas.</h2>
      <p>Comece contando o que quer aprender.</p>
      <v-btn color="primary" to="/trilhas/nova"> Criar primeira trilha </v-btn>
    </v-card>

    <v-list v-else lines="two">
      <v-list-item v-for="trail in trails.readyTrails" :key="trail.id" :title="trail.title">
        <template #subtitle>
          {{ trail.summary }}
        </template>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<style scoped>
.trails-page {
  min-height: 70vh;
  padding-block: clamp(4rem, 10vw, 8rem);
}

.trails-page__header {
  align-items: end;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 4rem;
}

.section-label {
  color: rgb(var(--v-theme-secondary));
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin: 0;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(3rem, 8vw, 7rem);
  letter-spacing: -0.08em;
  line-height: 0.9;
  margin: 2rem 0 0;
}

.empty-state {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: clamp(2rem, 6vw, 5rem);
}

.empty-state h2,
.empty-state p {
  margin: 0;
}

.empty-state p {
  color: rgb(var(--v-theme-secondary));
}

@media (max-width: 600px) {
  .trails-page__header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
