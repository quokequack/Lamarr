<template>
  <section id="como-usar" class="section-3" aria-labelledby="how-title">
    <v-container>
      <p class="section-label section-label--spaced">Como usar</p>
      <h2 id="how-title">Do objetivo à próxima sessão.</h2>
      <v-row class="steps">
        <v-col cols="12" md="4">
          <span class="step-number">01</span>
          <h3>Conte o que quer aprender</h3>
          <p>Seu objetivo é o ponto de partida para o questionário.</p>
        </v-col>
        <v-col cols="12" md="4">
          <span class="step-number">02</span>
          <h3>Mostre como é sua rotina</h3>
          <p>Tempo, nível e preferências ajudam a dar contexto ao caminho.</p>
        </v-col>
        <v-col cols="12" md="4">
          <span class="step-number">03</span>
          <h3>Estude um passo por vez</h3>
          <p>Suas respostas organizam uma sequência de estudo possível.</p>
        </v-col>
      </v-row>
      <div class="steps__action">
        <v-btn color="primary" size="large" to="/trilhas/nova">
          Começar agora
          <v-icon end icon="mdi-arrow-up-right" />
        </v-btn>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.section-3 {
  background: rgb(var(--v-theme-surface));
  color: var(--lamarr-ink);
  padding-block: clamp(4rem, 10vw, 8rem);
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
  color: var(--lamarr-muted-light);
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
  color: var(--lamarr-muted-light);
  line-height: 1.5;
  max-width: 16rem;
}

.steps__action {
  display: flex;
  justify-content: center;
  padding-top: 3rem;
}
</style>
