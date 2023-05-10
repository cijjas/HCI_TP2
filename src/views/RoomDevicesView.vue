// pagina de un room especifico (muestra sus dispositivos)
<script setup>
    import { reactive } from 'vue';
    import { ref, computed, defineProps, defineEmits } from 'vue'
    import { useAppStore } from '@/store/app';
    import { onMounted } from '@vue/runtime-core';
    import { useRoute } from 'vue-router'

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
    const room = store.getARoomByName(roomName);
    const devices = room.devices;

    
</script>

<template>
    <!-- <cComponent> -->
    <main>
        <div class="canvas">
            <v-card class="vcard">
                <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-secondary">{{roomName}}</v-card-title>
                <v-divider color="gris"></v-divider>
                
                <v-row justify-end>
                        <!-- iñakis job: iterar sobre array de devices de un cuarto -->
                        <v-col cols="5" v-for="device in devices">
                            <!-- display componente generico de un device -->
                            <!-- <RoomsBox class="grid-item" :roomName="room.name" :devicesCount="room.devices.length"></RoomsBox> -->
                        </v-col>

                </v-row>  
            </v-card>
        </div>
    </main>
</template>

<style scoped>

.canvas {
  width: 95%;
  height: 2632px;
  background: primary;
  border-radius: 38px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap:  2%;
  padding: 2.5%;
}

.vcard {
    border-radius: 8px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%), rgba(233, 247, 242, 0.03);
}

</style>
