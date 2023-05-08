<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';



</script>
<!-- O.o -->
<template>
  <v-app class="app elevation-0" >
    <NavBar></NavBar>
    <RouterView />

  </v-app>

</template>

<style scoped>
.v-application {
  background-color: transparent !important;
  margin-left: 50px;
  width: 1780px;

}

</style>
