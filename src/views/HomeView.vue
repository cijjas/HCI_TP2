// HomeView

<script setup>

import { onMounted } from '@vue/runtime-core';

import { reactive } from 'vue';
import { ref, computed, defineProps, defineEmits } from 'vue'
import { useAppStore } from '@/store/app';

const store = useAppStore();

onMounted(async () => {             // cuando se monta la pagina pido los datos
    try {
    // pido el update de los datos
      await store.getAllRoomsAPI();
      await store.getAllDevicesAPI();
    } catch (error) {
      console.error(error);
    }
});

</script>

<template>
  <main>

    <div class="canvas">
        <v-card class="vcard elevation-0" color="transparent">
        <v-row style="margin-top: 20px;">
          <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-secondary">Home</v-card-title>
          <v-divider color="gris"></v-divider>
        </v-row>
        
        <v-row justify-end>
          <v-layout justify-start>
            <v-flex v-for="c in store.getComponents()" :key="c.id" xs12 sm6 md4 lg3>
              <v-card class="grid-item">
                <component :is="c.component" :componentName="c.name" :componentId="c.id"></component>
              </v-card>
            </v-flex>
          </v-layout>
        </v-row>

        </v-card>

    </div>
  </main>
</template>

<style scoped>
.grid-item {
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin: 1rem;
  padding: 0;
  transition: box-shadow 0.2s ease;
  background-color: transparent;
}


.grid-item:hover {
  transition: transform 0.3s ease-out;
  transform: scale(1.01);
}

.v-layout {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

</style>
