<script setup>
import { onMounted } from '@vue/runtime-core';
import { useAppStore } from '@/store/app';
import { RoomApi } from '@/API/room.js';
import { getIdByName} from '@/Lib/lib'
import { ref, computed, defineProps, defineEmits, reactive } from 'vue'
const store = useAppStore();


const loading = ref(true);


const deviceObj = ref({});
const deviceId = ref("");


const selectedRoomName = ref("");
const deviceName = ref("");
const action = ref("");
const unit = ref("");
const quantity = ref("");

async function updater(){
    try {
    // pido el update de los datos
    await store.getAllDevicesAPI();
    loading.value = false;          // una vez updateados los uso
    } catch (error) {
    console.error(error);
    }
}


function onoff(){
    deviceObj.value = store.getADeviceByName(deviceName.value)
    store.updateADeviceState(deviceObj.value.id, action.value, []);
}

function dispense(){
    console.log("entering")
    deviceObj.value = store.getADeviceByName(deviceName.value)
    store.updateADeviceState(deviceObj.value.id, action.value, [unit,quantity]);
}

function logger(){
    console.log(deviceObj.value)
    console.log(deviceName.value)
    console.log(action.value)
    console.log(quantity.value)
    console.log(unit.value)

}

function executioner(){
    // con el name que elige el user, obtener el objeto del dispositivo, dentro esta el id y etc
    deviceObj.value = store.getADeviceByName(deviceName.value)
    store.updateADeviceState(deviceObj.value.id, action.value, [unit,quantity]);

    //store.updateADeviceState(deviceName.value, action.value);
}

onMounted(async () => {             // cuando se monta la pagina pido los datos
    try {
    // pido el update de los datos
    await store.getAllDevicesAPI();
    await store.getDeviceActionsAPI();
    await store.getAllRoomsAPI();
    loading.value = false;          // una vez updateados los uso
    } catch (error) {
    console.error(error);
    }
});

</script>

<template>
    <main>

        <v-card class="pa-8" >
            <v-text class="text-h3" > Devices </v-text>
            <br>
            <v-text>{{ store.devices }}</v-text>
            <br>
            <v-text class="text-h3" > Rooms </v-text>
            <br>
            <v-text>{{ store.rooms }}</v-text>
            <br>
            <v-text class="text-h3" > Device Actions </v-text>
            <br>
            <v-text>{{ store.deviceActions }}</v-text>
            <br>


            <v-select
            class="pl-8 pt-8 pr-8"
            label="Select the Device"
            :items="store.getDevicesNames"
            v-model="deviceName"
            ></v-select>
            <v-card-title>On/Off</v-card-title>
            <v-select
            class="pl-8 pt-8 pr-8"
            label="Select the Action"
            :items="['open','close','dispense']"
            v-model="action"
            ></v-select>
            <v-btn @click="onoff">confirm (onoff)!</v-btn>



            <v-card v-if="action == 'dispense'">
                    <v-card-title>Dispense</v-card-title>
                <v-select
                class="pl-8 pt-8 pr-8"
                label="Select the Unit"
                :items="['ml','cl','dl','l','dal','hl','kl']"
                v-model="unit"
                ></v-select>

                <v-text-field class="pa-8" label="Quantity" v-model="quantity"></v-text-field>
                <v-btn @click="dispense">confirm (dispense)</v-btn>

            </v-card>
            <v-btn @click="updater">Sincronizar</v-btn>
            <v-btn @click="logger">Log!</v-btn>


        </v-card>

    </main>
</template>


<style scoped>
main{
    padding: 5%;
}
</style>
