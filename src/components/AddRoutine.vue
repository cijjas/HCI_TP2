<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import { useAppStore } from '@/store/app';

const store = useAppStore();
const tempRoutineName = ref("");
const selectedDeviceName = ref("");
const selectedDevice = computed(()=>{
    return  store.devices.length > 0 ? store.devices.find( (device)=> device.name==selectedDeviceName.value) : "";
})

const getDevicesNames = computed(() => {
    return store.getDevices.map(device => device.name);
});


</script>

<template>
    <main>
        <!-- ROUTINE -->
        <v-card class="pa-8 pt-4" color="gris">
            <v-card-title class="ml-n3 mb-3 mt-3 text-h4 font-weight-bold text-uppercase text-medium-emphasis">Routines</v-card-title>
            <v-divider></v-divider>
            <v-card-title v-if="store.getRoutines.length !=0" class="ml-n3 mt-3 mb-3 text-h5 font-weight-bold ">Your Routines :</v-card-title>
            <v-card v-if="store.getRoutines.length !=0">
                <v-list rounded>
                <v-list-item v-for="routine in store.getRoutines">
                    {{ routine.name }}
                    <v-divider></v-divider>
                </v-list-item>
            </v-list>
            </v-card>
            <v-spacer></v-spacer>
            <v-card-title  class="ml-n3 mb-3 mt-6  text-h5 font-weight-bold">Add a Routine : </v-card-title>
            <v-text-field prepend-icon="mdi-list-status" label="Routine Name" v-model="tempRoutineName"></v-text-field>
            <v-spacer></v-spacer>
            <v-divider></v-divider>
            <v-card-title  class="ml-n3 text-h5 font-weight-bold">Actions : </v-card-title>
            <v-select
            label="Select A Device"
            :items="getDevicesNames"
            v-model="selectedDeviceName"
            ></v-select>
            <v-card-text>|{{ selectedDeviceName }}|</v-card-text>
            <v-card-text>|{{ selectedDevice }}|</v-card-text>




            <v-btn append-icon="mdi-plus" class="pl-10 pr-10 mb-3" @click="store.addRoutine(`${tempRoutineName}`)">Add Action</v-btn>
            <v-spacer></v-spacer>
            <v-divider></v-divider>
            <v-btn append-icon="mdi-plus" class="pl-10 pr-10 mt-10" @click="store.addRoutine(`${tempRoutineName}`)">Add</v-btn>


        </v-card>
        <v-btn @click="store.startDummy">START DUMMY</v-btn>
    </main>
</template>

<style scoped>
main{
    padding-top: 5%;
    padding-right: 13%;
    padding-left: 13%;
}
</style>
