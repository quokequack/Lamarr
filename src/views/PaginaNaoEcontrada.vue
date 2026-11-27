<template>
  <v-container class="not-found">
    <p class="section-label">Erro 404</p>
    <h1>Página não encontrada.</h1>
    <p>O endereço que você acessou não faz parte do caminho do Lamarr.</p>
    <v-btn color="primary" to="/"> Voltar para o início </v-btn>
  </v-container>
</template>

<style scoped>
.not-found {
  padding-block: 8rem;
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

.not-found p:not(.section-label) {
  color: rgb(var(--v-theme-secondary));
  margin-bottom: 2rem;
}
</style>
