<script setup lang="ts" xmlns:div="http://www.w3.org/1999/html">

</script>

<template>
  <v-container fluid class="porque-usar">
    <div class="box">
      <p> Você...</p>
      <v-row>
        <v-col cols="12" md="6" class="motivos">
          <v-icon icon="mdi-weather-lightning" size="50"></v-icon>
          <span> é uma pessoa desorganizada? </span>
        </v-col>
        <v-col cols="12" md="6" class="motivos">
          <v-icon icon="mdi-magnify-remove-outline" size="60"></v-icon>
          <span> não sabe pesquisar boas fontes de estudos? </span>
        </v-col>
      </v-row>
      <div class="container texto">
        <v-icon
          aria-hidden="true"
          class="porque-usar__arrow porque-usar__arrow--left"
          icon="mdi-arrow-u-up-right"
          size="50"
        />
        <h1> O LAMARR É PERFEITO PARA VOCÊ</h1>
        <v-icon
          aria-hidden="true"
          class="porque-usar__arrow porque-usar__arrow--right"
          icon="mdi-arrow-u-down-left"
          size="50"
        />
      </div>
      <v-row>
        <v-col cols="12" md="6" class="motivos">
          <v-icon icon="mdi-alarm" size="50"></v-icon>
          <span> trabalha e estuda e não tem tempo de nada? </span>
        </v-col>
        <v-col cols="12" md="6" class="motivos">
          <v-icon icon="mdi-file-document-remove-outline" size="50"></v-icon>
          <span> já tentou e tentou mas não sabe como se organizar para estudar? </span>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
.porque-usar{
  height: auto;
  width: 100%;
  display: flex;
  justify-content:center;
  align-items: center;
  background-color:#d9d9d9;
  padding:0;
  margin:0;
}

.box{
  width: 100%;
  padding:0;
  margin:0;
}

p{
  font-size: 2em;
  font-weight: bolder;
  color: #898481;
  margin-top:1%;
}

.motivos {
  display: flex;
  flex-direction: column;
  align-items: center;

}

.texto {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.porque-usar__arrow {
  position: absolute;
  color: #fff;
}

.porque-usar__arrow--left {
  left: -10%;
  top: 85%;
}

.porque-usar__arrow--right {
  right: -10%;
  top: -10%;
}

.texto h1{
  font-weight: bolder;
}

span{
  color: #898481;
  font-size:1.3em;
  width: 30%;
  text-align: center;
}

.v-row {
  margin:0;
}

@media (max-width: 768px) {
  .texto {
    width: 90%;
    margin-top: 10%;
    margin-bottom: 10%;
  }

  .porque-usar__arrow {
    display: none;
  }

  .texto h1 {
    font-size: 2.3em;
    text-align: center;

  }

  span {
    width: 50%;
    font-size: 1.1em;
  }
}


</style>
