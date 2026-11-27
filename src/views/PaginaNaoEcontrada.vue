<template>
  <main class="not-found">
    <v-container>
      <p class="section-label">Erro 404</p>
      <h1>Página não encontrada.</h1>
      <p>O endereço que você acessou não faz parte do caminho do Lamarr.</p>
      <div class="not-found__actions">
        <v-btn color="primary" to="/">Voltar para o início</v-btn>
        <v-btn variant="text" to="/trilhas/nova">Começar uma trilha</v-btn>
      </div>
    </v-container>
  </main>
</template>

<style scoped>
.not-found {
  min-height: 65vh;
  padding-block: 8rem;
}

h1 {
  font-size: clamp(3rem, 8vw, 7rem);
  letter-spacing: -0.08em;
  line-height: 0.9;
  margin: 2rem 0;
  max-width: 8ch;
}

.not-found p:not(.section-label) {
  color: var(--lamarr-muted-light);
  margin-bottom: 2rem;
}

.not-found__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
