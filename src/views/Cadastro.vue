<script setup lang="ts">
import AuthPageLayout from '../components/AuthPageLayout.vue'
</script>

<template>
  <AuthPageLayout
    eyebrow="Cadastro"
    title="Comece guardando seu próximo passo."
    description="A criação da conta será habilitada junto com o adapter de autenticação do backend escolhido."
  >
    <template #actions>
      <v-btn variant="outlined" to="/login"> Já tenho cadastro </v-btn>
      <v-btn variant="text" to="/"> Voltar para o início </v-btn>
    </template>
  </AuthPageLayout>
</template>
