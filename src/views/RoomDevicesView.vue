// pagina de un room especifico (muestra sus dispositivos)
<script setup>
    import VacuumBox from '../components/DeviceComponents/VacuumBox.vue';
    import CurtainBox from '@/components/DeviceComponents/CurtainBox.vue';
    import TapBox from '@/components/DeviceComponents/TapBox.vue';
    import FridgeBox from '@/components/DeviceComponents/FridgeBox.vue';
    import OvenBox from '@/components/DeviceComponents/OvenBox.vue';

    import { reactive } from 'vue';
    import { ref, computed, defineProps, defineEmits } from 'vue'
    import { useAppStore } from '@/store/app';

    const store = useAppStore();
    const props = defineProps({
    roomId: {
      type: String,
      required: true,
    }
  });

    const roomId = ref(props.roomId);
    const devices = store.getRoomDevices(roomId.value);
    
</script>

<template>
    <!-- <cComponent> -->
    <main>
        <div class="canvas">
            <v-card class="vcard">
                <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-secondary">{{room.Name}}</v-card-title>
                <v-divider color="gris"></v-divider>
                
                <v-row justify-end>
                        <!-- iterar sobre array de devices de un cuarto -->
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
