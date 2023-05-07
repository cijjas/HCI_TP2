// HomeView

<script setup>
import VacuumBox from '../components/DeviceComponents/VacuumBox.vue';
import CurtainBox from '@/components/DeviceComponents/CurtainBox.vue';
import TapBox from '@/components/DeviceComponents/TapBox.vue';
import FridgeBox from '@/components/DeviceComponents/FridgeBox.vue';
import OvenBox from '@/components/DeviceComponents/OvenBox.vue';

import { onMounted } from '@vue/runtime-core';

import { reactive } from 'vue';
import { ref, computed, defineProps, defineEmits } from 'vue'
import { useAppStore } from '@/store/app';

const store = useAppStore();

onMounted(async () => {             // cuando se monta la pagina pido los datos
    try {
    // pido el update de los datos
    await store.getAllRoomsAPI();
    } catch (error) {
    console.error(error);
    }
});

</script>

<template>
  <main>
    <div class="canvas">
      <v-container>
        <v-layout justify-center>
          <v-flex v-for="c in store.getComponents()" :key="c.id" xs12 sm6 md3>
            <v-card class="grid-item" width="400" height="200">
              <component :is="c"></component>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.v-layout {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

</style>
