<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';



</script>
<!-- O.o -->
<template>
  <v-app>
    <!-- <div class="app">
    <Sidebar />
      <div :style="{ 'margin-left': sidebarWidth }">
        <router-view />
      </div>
    </div> -->

  <NavBar></NavBar>
  <RouterView />
  </v-app>

</template>

<style scoped>



</style>
