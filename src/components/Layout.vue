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
        <span>Lamarr</span>
        <span>Trilhas de aprendizado que cabem na sua rotina.</span>
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

@media (max-width: 600px) {
  .site-footer__content {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
