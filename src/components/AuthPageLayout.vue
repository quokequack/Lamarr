<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
}>()
</script>

<template>
  <v-container class="auth-page">
    <div class="auth-page__copy">
      <p class="section-label">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p class="auth-page__description">{{ description }}</p>
      <div class="auth-page__actions">
        <slot name="actions" />
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.auth-page {
  min-height: 70vh;
  padding-block: clamp(5rem, 12vw, 10rem);
}

.auth-page__copy {
  max-width: 680px;
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

.auth-page__description {
  color: rgb(var(--v-theme-secondary));
  line-height: 1.6;
  max-width: 34rem;
}

.auth-page__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}
</style>
