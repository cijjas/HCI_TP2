<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, computed, defineProps, defineEmits } from 'vue'

import NavBar from './components/NavBar.vue';
import { onMounted } from '@vue/runtime-core';
onMounted(async () => {             // cuando se monta la pagina pido los datos
    try {
      const conectionLoop = setInterval(() =>{ offline.value = !navigator.onLine}, 3000)
    } catch (error) {
      console.error(error);
    }
});
const offline = ref(false);

</script>
<!-- O.o -->
<template>
  <v-app class="app elevation-0" >
    <NavBar></NavBar>
    <v-dialog
      persistent
      width="auto"
      v-model="offline">
      <v-card>
        <v-container>
          <v-card-title class="text-h5 text-center font-weight-bold">
            <v-icon class>mdi-wifi-alert</v-icon>
          </v-card-title>
          <v-card-text class="text-center">
                <p class="text-h3 font-weight-medium">No internet conection found, please check your network</p>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
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
