<template>
  <section id="porque-usar" class="porque-usar">
    <v-container>
      <p class="section-label">Por que usar?</p>
      <div class="porque-usar__heading">
        <h2>Para quem quer aprender sem perder o fio.</h2>
        <p>O Lamarr tira a pesquisa do caminho para você voltar a se concentrar no estudo.</p>
      </div>

      <v-row class="porque-usar__reasons">
        <v-col cols="12" md="6" class="reason">
          <v-icon icon="mdi-weather-lightning" size="44" />
          <span>Você tem pouco tempo para organizar o que estudar.</span>
        </v-col>
        <v-col cols="12" md="6" class="reason">
          <v-icon icon="mdi-magnify-remove-outline" size="44" />
          <span>Você quer encontrar boas fontes sem começar do zero.</span>
        </v-col>
      </v-row>

      <div class="porque-usar__promise">
        <v-icon
          aria-hidden="true"
          class="porque-usar__arrow porque-usar__arrow--left"
          icon="mdi-arrow-u-up-right"
          size="50"
        />
        <h2>O Lamarr é feito para você começar.</h2>
        <v-icon
          aria-hidden="true"
          class="porque-usar__arrow porque-usar__arrow--right"
          icon="mdi-arrow-u-down-left"
          size="50"
        />
      </div>

      <v-row class="porque-usar__reasons">
        <v-col cols="12" md="6" class="reason">
          <v-icon icon="mdi-alarm" size="44" />
          <span>Você precisa de uma rotina que respeite o seu dia.</span>
        </v-col>
        <v-col cols="12" md="6" class="reason">
          <v-icon icon="mdi-file-document-remove-outline" size="44" />
          <span>Você já tentou estudar e quer um próximo passo claro.</span>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.porque-usar {
  background: rgb(var(--v-theme-accent));
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

.porque-usar__heading {
  align-items: end;
  display: grid;
  gap: 2rem;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 0.45fr);
  margin-bottom: 5rem;
}

h2 {
  font-size: clamp(2rem, 5vw, 4.5rem);
  letter-spacing: -0.07em;
  line-height: 0.95;
  margin: 0;
  max-width: 10ch;
}

.porque-usar__heading p {
  color: rgb(var(--v-theme-secondary));
  line-height: 1.6;
  margin: 0;
  max-width: 28rem;
}

.porque-usar__reasons {
  border-top: 1px solid rgba(23, 22, 21, 0.3);
  margin: 0;
}

.reason {
  align-items: flex-start;
  border-bottom: 1px solid rgba(23, 22, 21, 0.3);
  display: flex;
  gap: 1rem;
  min-height: 10rem;
  padding: 2rem 1rem 2rem 0;
}

.reason span {
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  line-height: 1.35;
  max-width: 18rem;
}

.porque-usar__promise {
  margin: 6rem auto;
  max-width: 680px;
  position: relative;
  text-align: center;
}

.porque-usar__promise h2 {
  margin: 0 auto;
  max-width: 10ch;
}

.porque-usar__arrow {
  color: rgb(var(--v-theme-surface));
  position: absolute;
}

.porque-usar__arrow--left {
  left: -10%;
  top: 70%;
}

.porque-usar__arrow--right {
  right: -10%;
  top: -15%;
}

@media (max-width: 700px) {
  .porque-usar__heading {
    display: block;
  }

  .porque-usar__heading p {
    margin-top: 1.5rem;
  }

  .porque-usar__promise {
    margin-block: 4rem;
  }

  .porque-usar__arrow {
    display: none;
  }
}
</style>
