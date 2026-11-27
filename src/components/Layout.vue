<script setup lang="ts">
import Header from './Header.vue'
</script>

<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
    <v-footer class="site-footer" border="t">
      <v-container class="site-footer__content">
        <div>
          <strong>Lamarr</strong>
          <p>Trilhas de aprendizado que cabem na sua rotina.</p>
        </div>
        <nav aria-label="Navegação do rodapé" class="site-footer__navigation">
          <a href="/#porque-usar">Por que usar?</a>
          <a href="/#como-usar">Como funciona</a>
          <a href="/#sobre">Sobre</a>
          <a href="/#top">Voltar ao topo</a>
        </nav>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style scoped>
.site-footer {
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-surface));
}

.site-footer__content {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 1.5rem;
}

.site-footer strong {
  font-size: 1.2rem;
}

.site-footer p {
  color: var(--lamarr-muted-dark);
  margin: 0.5rem 0 0;
}

.site-footer__navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  justify-content: flex-end;
}

.site-footer__navigation a {
  color: rgb(var(--v-theme-surface));
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
}

.site-footer__navigation a:hover,
.site-footer__navigation a:focus-visible {
  text-decoration: underline;
  text-underline-offset: 0.25rem;
}

@media (max-width: 600px) {
  .site-footer__content {
    align-items: flex-start;
    flex-direction: column;
  }

  .site-footer__navigation {
    justify-content: flex-start;
  }
}
</style>
