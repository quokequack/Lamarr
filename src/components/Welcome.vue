<template>
  <section class="welcome">
    <v-container class="welcome__content">
      <div class="welcome__copy">
        <p class="welcome__eyebrow">Aprender, com direção</p>
        <h1>Uma trilha feita para o seu tempo.</h1>
        <p class="welcome__summary">
          O Lamarr organiza o que estudar e transforma seu objetivo em próximos passos claros.
        </p>
        <v-btn class="welcome__action" color="surface" size="large" to="/trilhas/nova">
          COMEÇAR UMA TRILHA
          <v-icon end icon="mdi-arrow-up-right" />
        </v-btn>
      </div>

      <div class="welcome__route" aria-hidden="true">
        <span class="welcome__route-dot welcome__route-dot--first" />
        <span class="welcome__route-line" />
        <span class="welcome__route-dot welcome__route-dot--last" />
        <span class="welcome__route-label">objetivo → prática</span>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.welcome {
  align-items: center;
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-surface));
  display: flex;
  min-height: min(640px, 72vh);
}

.welcome__content {
  align-items: center;
  display: grid;
  gap: clamp(2rem, 8vw, 8rem);
  grid-template-columns: minmax(0, 1fr) minmax(200px, 0.65fr);
  padding-block: 5rem;
}

.welcome__copy {
  max-width: 700px;
}

.welcome__eyebrow {
  color: rgb(var(--v-theme-secondary));
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin: 0 0 1.5rem;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(3.25rem, 8vw, 7.5rem);
  letter-spacing: -0.08em;
  line-height: 0.92;
  margin: 0;
  max-width: 7ch;
}

.welcome__summary {
  color: rgb(var(--v-theme-accent));
  font-size: clamp(1rem, 1.8vw, 1.25rem);
  line-height: 1.5;
  margin: 2rem 0;
  max-width: 32rem;
}

.welcome__action {
  color: rgb(var(--v-theme-primary)) !important;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.welcome__route {
  min-height: 300px;
  position: relative;
}

.welcome__route-line {
  border-top: 1px solid rgb(var(--v-theme-secondary));
  display: block;
  position: absolute;
  right: 0;
  top: 50%;
  transform: rotate(-28deg);
  transform-origin: right;
  width: 100%;
}

.welcome__route-dot {
  border: 1px solid rgb(var(--v-theme-secondary));
  border-radius: 50%;
  height: 1rem;
  position: absolute;
  width: 1rem;
}

.welcome__route-dot--first {
  left: 8%;
  top: 76%;
}

.welcome__route-dot--last {
  right: 2%;
  top: 10%;
}

.welcome__route-label {
  bottom: 8%;
  color: rgb(var(--v-theme-secondary));
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  position: absolute;
  right: 0;
  text-transform: uppercase;
}

@media (max-width: 700px) {
  .welcome__content {
    display: block;
    padding-block: 4rem;
  }

  .welcome__route {
    min-height: 150px;
  }

  h1 {
    font-size: clamp(3rem, 16vw, 5rem);
  }
}
</style>
