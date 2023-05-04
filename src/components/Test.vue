<script setup>
import { reactive } from 'vue';
import { ref, computed, defineProps, defineEmits } from 'vue'
import { useAppStore } from '@/store/app';

const store = useAppStore();

const tempRoomName = ref("");
const tempRoutineName = ref("");
const tempDeviceName = ref("");
const tempDeviceType = ref("");
const tempDeviceRoom = ref("");


</script>

<template>
    <main>

        <!-- ROOMS -->
        <v-btn @click="store.startDummy">START DUMMY</v-btn>
        <v-card>
            <v-card-title>Add a Room!</v-card-title>
            <v-card-text>Current Rooms {{ store.getRooms }}</v-card-text>
            <v-text-field label="Room Name" v-model="tempRoomName"></v-text-field>
            <v-btn @click="store.addRoom(`${tempRoomName}`)">Add</v-btn>
        </v-card>
        <v-divider></v-divider>

        <!-- ROUTINES -->
        <v-card>
            <v-card-title>Add a Routine!</v-card-title>
            <v-card-text>Current Routines {{ store.getRoutines }}</v-card-text>
            <v-text-field label="Routine Name" v-model="tempRoutineName"></v-text-field>
            <v-btn @click="store.addRoutine(`${tempRoutineName}`)">Add</v-btn>
        </v-card>
        <v-divider></v-divider>

        <!-- DEVICES -->
        <v-card>
            <v-card-title>Add a Device!</v-card-title>
            <v-card-text>Current Devices {{ store.devices }}</v-card-text>
            <v-text-field label="Device Name" v-model="tempDeviceName"></v-text-field>
            <v-list>
                <v-list-item>Supported Types : </v-list-item>
                <v-list-item v-for="deviceType in store.getSupportedDevices">
                    {{ deviceType }}
                </v-list-item>
            </v-list>
            <v-text-field label="Device Type" v-model="tempDeviceType"></v-text-field>
            <v-list>
                <v-list-item>Available Rooms : </v-list-item>
                <v-list-item v-for="room in store.getRooms">
                    {{ room.name }}
                </v-list-item>
            </v-list>
            <v-text-field label="Device Room" v-model="tempDeviceRoom"></v-text-field>
            <v-btn @click="store.addDevice(`${tempDeviceName}`,`${tempDeviceType}`,`${tempDeviceRoom}`)">Add</v-btn>
            <v-select
            label="Devices"
            :items="store.getDevices"
            ></v-select>

        </v-card>
        <v-divider></v-divider>


    </main>
</template>

<style scoped>
main{
    padding: 5%;
}
</style>
