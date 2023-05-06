<script setup>
import { onMounted } from '@vue/runtime-core';
import { useAppStore } from '@/store/app';
import { RoomApi } from '@/API/room.js';
import { ref, computed, defineProps, defineEmits, reactive } from 'vue'
const store = useAppStore();


const loading = ref(true);

const selectedDeviceName = ref("");
const selectedDeviceName2 = ref("");
const selectedDeviceRoom = ref("");
const selectedDeviceType = ref("");
const newDeviceName = ref("");
const creationDeviceName = ref("");


function clearVar(){
    selectedDeviceName.value = "";
    selectedDeviceType.value = "";
}

onMounted(async () => {             // cuando se monta la pagina pido los datos
    try {
    // pido el update de los dato
    await store.getAllRoomsAPI();
    await store.getAllDevicesAPI();
    loading.value = false;          // una vez updateados los uso
    } catch (error) {
    console.error(error);
    }
});

</script>

<template>
    <main>
        <v-card class="pa-8">

            <v-card  v-if="loading.value">
                <v-card-title>
                    <v-card-text>Loading...</v-card-text>
                </v-card-title>
            </v-card>

            <v-card v-else flat>

                <!-- DEVICES -->
                <v-card class="mb-4 pr-8" color="lightersecondary"  elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h4 font-weight-bold text-uppercase ">Devices </v-card-text>
                    </v-card-title>
                    <v-card class="ml-10" v-if="store.devices.length !=0" flat>
                    <v-list rounded  bg-color="secondary" >
                        <v-list-item  v-for="deviceName in store.getDevicesNames" >
                            {{ deviceName }}
                            <v-divider></v-divider>
                        </v-list-item>
                    </v-list>
                    </v-card>
                        <v-card-text>{{ store.devices }}</v-card-text>
                </v-card>

                <!-- CREATE A DEVICE -->
                <v-card class="mb-4" color="lightersecondary" elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h5 font-weight-bold ">Create a Device </v-card-text>
                    </v-card-title>
                    <v-select
                    class="pl-8 pt-8 pr-8"
                    label="Select the Device's Room"
                    :items="store.getRoomNames"
                    v-model="selectedDeviceRoom"
                    ></v-select>
                    <v-select
                    class="pl-8 pt-8 pr-8"
                    label="Select the Device Type"
                    :items="store.getSupportedDevicesNames"
                    v-model="selectedDeviceType"
                    ></v-select>
                    <v-text-field class="pa-8" label="Device Name" v-model="creationDeviceName"></v-text-field>
                    <v-btn elevation="0" color="secondary" class="ml-8 mb-8" @click="store.createADevice(selectedDeviceRoom, creationDeviceName, selectedDeviceType)"> CONFIRM </v-btn>
                </v-card>

                <!-- UPDATE A DEVICE -->
                <v-card class="mb-4" color="lightersecondary" elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h5 font-weight-bold">Update a Device :</v-card-text>
                    </v-card-title>
                    <v-select
                    class="pl-8 pt-8 pr-8"
                    label="Select the Device"
                    :items="store.getDevicesNames"
                    v-model="selectedDeviceName"
                    ></v-select>
                    <v-text-field class="pa-8" label="New Name" v-model="newDeviceName"></v-text-field>
                    <v-btn elevation="0" color="secondary" class="ml-8 mb-8"  @click="() => { store.updateADeviceByName(selectedDeviceName, newDeviceName); clearVar(); }" > CONFIRM </v-btn>
                </v-card>

                <!-- DELETE A DEVICE -->
                <v-card class="mb-4" color="lightersecondary" elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h5 font-weight-bold">Delete a Device :</v-card-text>
                    </v-card-title>
                    <v-select
                    class="pl-8 pt-8 pr-8"
                    label="Select the Device"
                    :items="store.getDevicesNames"
                    v-model="selectedDeviceName2"
                    ></v-select>
                    <v-btn elevation="0" color="secondary" class="ml-8 mb-8"  @click="() => { store.deleteADeviceByName(selectedDeviceName2); clearVar(); }" > CONFIRM </v-btn>
                </v-card>

            </v-card>
        </v-card>
    </main>
</template>


<style scoped>
main{
    padding: 5%;
}
</style>
