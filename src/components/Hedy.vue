<template>
  <section id="sobre" class="hedy" aria-labelledby="hedy-title">
    <v-container class="hedy__content">
      <div class="hedy__copy">
        <p class="section-label section-label--dark section-label--spaced">Sobre o Lamarr</p>
        <h2 id="hedy-title">Quem foi Hedy Lamarr?</h2>
        <p class="hedy__subtitle">Atriz, inventora e uma mente à frente do seu tempo.</p>
        <p>
          Hedy Lamarr foi uma atriz de Hollywood, mas também inventora. Durante a Segunda Guerra
          Mundial, ela ajudou a criar um sistema de comunicação que mudava de frequência para evitar
          interceptações.
        </p>
        <p>
          Essa ideia ajudou a formar a base de tecnologias de comunicação que usamos hoje. O nome
          Lamarr lembra que curiosidade e criação podem caminhar juntas.
        </p>
      </div>

      <figure class="hedy__portrait">
        <v-img
          class="hedy__image"
          src="/imgs/hedy.png"
          alt="Retrato em preto e branco de Hedy Lamarr"
          eager
        />
        <figcaption>Hedy Lamarr, inspiração para aprender e inventar.</figcaption>
      </figure>
    </v-container>
  </section>
</template>

<style scoped>
.hedy {
  background: rgb(var(--v-theme-primary));
  border-top: 1px solid rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-surface));
  padding-block: clamp(4rem, 10vw, 8rem);
}

.hedy__content {
  align-items: center;
  display: grid;
  gap: clamp(3rem, 9vw, 9rem);
  grid-template-columns: minmax(0, 1fr) minmax(250px, 0.7fr);
}

h2 {
  font-size: clamp(2.5rem, 6vw, 6rem);
  letter-spacing: -0.08em;
  line-height: 0.92;
  margin: 0;
  max-width: 9ch;
}

.hedy__subtitle {
  color: rgb(var(--v-theme-surface));
  font-size: clamp(1.2rem, 2.3vw, 1.7rem);
  font-weight: 700;
  line-height: 1.25;
  margin: 2rem 0;
  max-width: 22rem;
}

.hedy__copy > p:not(.section-label):not(.hedy__subtitle) {
  color: var(--lamarr-muted-dark);
  line-height: 1.7;
  max-width: 42rem;
}

.hedy__portrait {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin: 0;
}

.hedy__image {
  max-height: 34rem;
  width: 100%;
}

:deep(.hedy__image .v-img__img) {
  filter: grayscale(1);
  object-fit: contain;
  object-position: bottom;
}

figcaption {
  border-top: 1px solid rgba(255, 255, 255, 0.35);
  color: var(--lamarr-muted-dark);
  font-size: 0.8rem;
  padding-top: 0.8rem;
}

@media (max-width: 700px) {
  .hedy__content {
    display: flex;
    flex-direction: column;
  }

  .hedy__portrait {
    width: min(100%, 22rem);
  }
}
</style>
