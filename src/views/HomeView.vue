<script setup>

import { onMounted } from '@vue/runtime-core';

import { reactive } from 'vue';
import { ref, computed, defineProps, defineEmits } from 'vue'
import { useAppStore } from '@/store/app';
import AddDeviceCard from '@/components/CreationComponents/AddDeviceCard.vue'
const store = useAppStore();

onMounted(async () => {             // cuando se monta la pagina pido los datos
    try {
    // pido el update de los datos
      await store.getAllRoomsAPI();
      await store.getAllDevicesAPI();
      // polling infinito
      /* const intervalId = setInterval(async () => {
        for ( let i = 0; i < store.devices.length; i++ ){
          if ( store.devices[i].type.name == 'speaker' || store.devices[i].type.name == 'blinds'){ //es un elemento polleable
            console.log(await store.getDeviceStateAPI(store.devices[i].id))
          }
        }
        console.log("Updating pollings...");
      }, 1000); */
      setTimeout(() => {
        transition.value = true;
      }, 500);
    } catch (error) {
      console.error(error);
    }
});

const transition = ref(false)
import { defineAsyncComponent } from 'vue';

function getComponent(file) {
  return defineAsyncComponent(() => import(/* @vite-ignore */file));    // require hecho a mano, porque no esta globalmente incluido
}

</script>

<template>
  <main>
    <div class="canvas">
      <v-card class="vcard elevation-0" color="transparent">
        <v-row style="margin-top: 20px;">
          <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-secondary">Home</v-card-title>
          <v-divider color="gris"></v-divider>
        </v-row>

        <v-row>
          <v-col md="3" class="mt-5">
            <AddDeviceCard></AddDeviceCard>
          </v-col>


          <v-col md="9">
            <v-row>
              <template v-for="(device, index) in store.devices" :key="device.id">
                <template v-if="index < 6">
                  <v-col class="mt-5" xs="12" sm="12" md="6" lg="4">
                    <v-fade-transition>
                      <component  :is="getComponent(device.meta.component.__file)" :componentName="device.name" :componentId="device.id" :componentRoom="store.getDevicesRoom(device.id)"></component>
                    </v-fade-transition>
                  </v-col>
                </template>
              </template>
            </v-row>
          </v-col>

          <v-col>
            <v-row>
              <template v-for="(device, index) in store.devices" :key="device.id">
                <template v-if="index >= 6">
                  <v-col class="mt-5" xs="12" sm="6" md="4" lg="3">
                    <v-fade-transition >
                      <component :is="getComponent(device.meta.component.__file)" :componentName="device.name" :componentId="device.id" :componentRoom="store.getDevicesRoom(device.id)"></component>
                    </v-fade-transition>  
                  </v-col>
                </template>
              </template>
            </v-row>
          </v-col>

        </v-row>
      </v-card>
    </div>
  </main>
</template>

<style scoped>

.v-layout {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

</style>