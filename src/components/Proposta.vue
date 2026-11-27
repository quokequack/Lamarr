<template>
  <section class="proposal" aria-labelledby="proposal-title">
    <v-container class="proposal__content">
      <div class="proposal__intro">
        <p class="section-label section-label--dark section-label--spaced">A proposta</p>
        <h2 id="proposal-title">Você conta o contexto. O estudo ganha direção.</h2>
      </div>

      <div class="proposal__details">
        <p>
          O Lamarr começa pelo que você já sabe, pelo que quer alcançar e pelo tempo que tem para
          estudar.
        </p>
        <ul>
          <li>
            <v-icon aria-hidden="true" icon="mdi-arrow-right" size="16" />
            <span>Comece gratuitamente e sem criar uma conta.</span>
          </li>
          <li>
            <v-icon aria-hidden="true" icon="mdi-arrow-right" size="16" />
            <span>Responda ao primeiro passo do questionário no seu ritmo.</span>
          </li>
          <li>
            <v-icon aria-hidden="true" icon="mdi-arrow-right" size="16" />
            <span>Continue a jornada a partir das respostas guardadas nesta sessão.</span>
          </li>
        </ul>
        <v-btn class="proposal__action" color="surface" size="large" to="/trilhas/nova">
          Começar
          <v-icon end icon="mdi-arrow-up-right" />
        </v-btn>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.proposal {
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-surface));
  padding-block: clamp(4rem, 10vw, 8rem);
}

.proposal__content {
  display: grid;
  gap: clamp(3rem, 9vw, 9rem);
  grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.65fr);
}

h2 {
  font-size: clamp(2.5rem, 6vw, 6rem);
  letter-spacing: -0.08em;
  line-height: 0.92;
  margin: 0;
  max-width: 9ch;
}

.proposal__details {
  align-self: end;
  border-top: 1px solid rgba(255, 255, 255, 0.35);
  padding-top: 1.5rem;
}

.proposal__details > p,
.proposal__details li {
  color: var(--lamarr-muted-dark);
  line-height: 1.6;
}

.proposal__details > p {
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  margin: 0 0 1.5rem;
}

.proposal__details ul {
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  list-style: none;
  margin: 0;
  padding: 0 0 1.5rem;
}

.proposal__details li {
  align-items: flex-start;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  gap: 0.75rem;
  padding: 0.9rem 0;
}

.proposal__details li .v-icon {
  color: rgb(var(--v-theme-surface));
  flex: 0 0 auto;
  margin-top: 0.3rem;
}

.proposal__action {
  color: rgb(var(--v-theme-primary)) !important;
  font-weight: 700;
  margin-top: 2rem;
  text-transform: none;
}

@media (max-width: 700px) {
  .proposal__content {
    display: block;
  }

  .proposal__details {
    margin-top: 3rem;
  }
}
</style>
