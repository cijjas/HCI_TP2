<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';



</script>
<!-- O.o -->
<template>
  <v-app class="basic">
  

  <NavBar></NavBar>
  <RouterView />
  </v-app>

</template>

<style scoped>
.basic{
  background-color: transparent !important;
  margin-left: 70px;
}


</style>
