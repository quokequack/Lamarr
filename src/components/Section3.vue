<template>
  <section id="como-usar" class="section-3">
    <v-container>
      <p class="section-label">Como usar</p>
      <h2>Do objetivo à próxima sessão.</h2>
      <v-row class="steps">
        <v-col cols="12" md="4">
          <span class="step-number">01</span>
          <h3>Conte o que quer aprender</h3>
          <p>Seu objetivo é o ponto de partida da trilha.</p>
        </v-col>
        <v-col cols="12" md="4">
          <span class="step-number">02</span>
          <h3>Mostre como é sua rotina</h3>
          <p>Tempo, nível e preferências orientam o caminho.</p>
        </v-col>
        <v-col cols="12" md="4">
          <span class="step-number">03</span>
          <h3>Estude um passo por vez</h3>
          <p>Materiais e atividades formam uma sequência possível.</p>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.section-3 {
  background: rgb(var(--v-theme-surface));
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

h2 {
  font-size: clamp(2.5rem, 6vw, 6rem);
  letter-spacing: -0.08em;
  line-height: 0.9;
  margin: 0 0 5rem;
  max-width: 8ch;
}

.steps {
  border-top: 1px solid rgba(23, 22, 21, 0.3);
}

.steps > div {
  border-bottom: 1px solid rgba(23, 22, 21, 0.3);
  min-height: 16rem;
  padding: 1.5rem 1.5rem 1.5rem 0;
}

.step-number {
  color: rgb(var(--v-theme-secondary));
  font-size: 0.8rem;
}

h3 {
  font-size: 1.5rem;
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin: 4rem 0 1rem;
  max-width: 12rem;
}

.steps p {
  color: rgb(var(--v-theme-secondary));
  line-height: 1.5;
  max-width: 16rem;
}
</style>
