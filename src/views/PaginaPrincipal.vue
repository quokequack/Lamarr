<script setup lang="ts">
import PorqueUsar from '../components/PorqueUsar.vue'
import Section3 from '../components/Section3.vue'
import Welcome from '../components/Welcome.vue'
</script>

<template>
  <Welcome />
  <PorqueUsar />
  <Section3 />
  <section id="sobre" class="about">
    <v-container>
      <p class="section-label">Sobre o Lamarr</p>
      <p class="about__copy">
        Uma experiência para transformar vontade de aprender em uma rotina possível.
      </p>
    </v-container>
  </section>
</template>

<style scoped>
.about {
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-surface));
  padding-block: clamp(4rem, 10vw, 8rem);
}

.section-label {
  color: rgb(var(--v-theme-secondary));
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin: 0 0 2rem;
  text-transform: uppercase;
}

.about__copy {
  font-size: clamp(2rem, 5vw, 4.5rem);
  letter-spacing: -0.07em;
  line-height: 0.95;
  margin: 0;
  max-width: 12ch;
}
</style>
