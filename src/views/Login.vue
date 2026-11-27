<script setup lang="ts">
import AuthPageLayout from '../components/AuthPageLayout.vue'
</script>

<template>
  <AuthPageLayout
    eyebrow="Entrar"
    title="Suas trilhas, no seu ritmo."
    description="A autenticação será conectada ao backend definido para a próxima etapa de persistência."
  >
    <template #actions>
      <v-btn color="primary" disabled> Entrar </v-btn>
      <v-btn variant="text" to="/cadastro"> Ainda não tenho cadastro </v-btn>
    </template>
  </AuthPageLayout>
</template>
