// pagina de un room especifico (muestra sus dispositivos)
<script setup>
    import { reactive } from 'vue';
    import { ref, computed, defineProps, defineEmits } from 'vue'
    import { useAppStore } from '@/store/app';
    import { onMounted } from '@vue/runtime-core';
    import { useRoute } from 'vue-router'

    import AddDeviceToRoomCard from '@/components/CreationComponents/AddDeviceToRoomCard.vue'

    import { getIdByName } from '@/Lib/lib.js'

    const store = useAppStore();

    onMounted(async () => {             // cuando se monta la pagina pido los datos
    try {
    // pido el update de los datos
    await store.getAllRoomsAPI();
    await store.getAllDevicesAPI();
    await store.getAllRoutinesAPI();
    } catch (error) {
    console.error(error);
    }
    }); 

    const route = useRoute();
    const roomName = route.params.roomName;
    const roomId = store.getRoomId(roomName);
    const roomDevices = store.getRoomDevices(roomId);

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
            <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-secondary">{{roomName}}</v-card-title>
            <v-divider color="gris"></v-divider>
          </v-row>
        
          <v-row>
            <v-col md="3" class="add-card-column">
              <AddDeviceToRoomCard :roomName="roomName"></AddDeviceToRoomCard>
            </v-col>
  
            
            <v-col md="9">
              <v-row>
                <template v-for="(device, index) in roomDevices" :key="device.id">
                  <template v-if="index < 6">
                    <v-col xs="12" sm="12" md="6" lg="4">
                      <v-card class="grid-item" width="400">
                        <component :is="getComponent(device.meta.component.__file)" :componentName="device.name" :componentId="device.id"></component>
                      </v-card>
                    </v-col>
                  </template>
                </template>
              </v-row>
            </v-col>
  
            <v-col>
              <v-row>
                <template v-for="(device, index) in roomDevices" :key="device.id">
                  <template v-if="index >= 6">
                    <v-col xs="12" sm="6" md="4" lg="3">
                      <v-card class="grid-item" width="400">
                        <component :is="getComponent(device.meta.component.__file)" :componentName="device.name" :componentId="device.id"></component>
                      </v-card>
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
  
  .add-card-column {
    padding-top: 28px; /* Adjust the value as per your preference */
  }
  
  </style>