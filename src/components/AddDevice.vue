<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import { useAppStore } from '@/store/app';
const store = useAppStore();
const tempDeviceName = ref("");
const tempDeviceType = ref("Click Me");
const tempDeviceRoom = ref("Click Me");

const getRoomNames = computed(() => {
    return store.getRooms.map(room => room.name);
});
</script>

<template>
    <main>
        <!-- DEVICES -->
        <v-card elevation="5" class="pa-8 pt-4 pr-15 pl-11" color="secondary">
            <v-card-title class="ml-n3 mb-3 mt-3 text-h4 font-weight-bold text-uppercase text-medium-emphasis">Devices</v-card-title>
            <v-divider></v-divider>
            <v-card-title v-if="store.getDevices.length !=0" class="ml-n3 mt-3 mb-3 text-h5 font-weight-bold">Your Devices </v-card-title>

            <v-card class="ml-10" v-if="store.devices.length !=0">
                <v-list rounded  >
                <v-list-item  v-for="device in store.getDevices" >
                    <v-row>
                    <v-col cols="11">
                        <v-icon :icon="device.icon" class="mr-3 mb-1"></v-icon>
                        {{ device.name }}
                    </v-col>
                    <v-col>

                        <v-btn class="right" flat rounded align="end"> <v-icon class="pb-1" size="x-large" icon="mdi-trash-can"></v-icon> </v-btn>

                    </v-col>

                    </v-row>
                    <v-divider></v-divider>
                </v-list-item>
            </v-list>
            </v-card>
            <v-spacer></v-spacer>


            <v-card-title  class="ml-n3 mt-3 mb-3 text-h5 font-weight-bold">Choose A Name </v-card-title>
            <v-text-field bg-color="#FFFFFF" prepend-icon="mdi-home-plus" label="Device Name" v-model="tempDeviceName"></v-text-field>
            <v-spacer></v-spacer>
            <v-divider></v-divider>


            <v-card-title  class="ml-n3 mt-3 mb-3 text-h5 font-weight-bold">Which Type? </v-card-title>
            <v-select
            bg-color="#FFFFFF"
            prepend-icon="mdi-devices"
            label="Select the Type of Device"
            :items="store.getSupportedDevices"
            v-model="tempDeviceType"
            ></v-select>
            <v-spacer></v-spacer>

            <v-card-title  class="ml-n3 mt-3 mb-3 text-h5 font-weight-bold">Where is it? </v-card-title>
            <v-select
            bg-color="#FFFFFF"
            prepend-icon="mdi-map-marker"
            label="Select the Room"
            :items="getRoomNames"
            v-model="tempDeviceRoom"
            ></v-select>
            <v-spacer></v-spacer>


            <v-btn color="primary" append-icon="mdi-plus" class="pl-15 pr-15 mt-10 ml-10" @click="store.addDevice(`${tempDeviceName}`,`${tempDeviceType}`,`${tempDeviceRoom}`)">Add</v-btn>
        </v-card>
        <v-divider></v-divider>
        <v-btn  @click="store.startDummy">START DUMMY</v-btn>
    </main>
</template>

<style scoped>
main{
    padding-top: 5%;
    padding-right: 13%;
    padding-left: 13%;
}
</style>
