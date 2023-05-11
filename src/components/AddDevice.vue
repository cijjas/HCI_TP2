<script setup>
import { onMounted } from '@vue/runtime-core';
import { useAppStore } from '@/store/app';
import { RoomApi } from '@/API/room.js';
import { getIdByName } from '@/Lib/lib'
import { ref, computed, defineProps, defineEmits, reactive } from 'vue'
const store = useAppStore();


const loading = ref(true);

const editDeviceName = ref("");
const selectedDeviceName = ref("");
const selectedDeviceName2 = ref("");
const selectedDeviceRoom = ref("");
const selectedDeviceType = ref("");
const newDeviceName = ref("");
const isCreateDialogOpen = ref(false);
const tempName = ref("");

const openCreateDialog = () => {
    console.log(selectedDeviceName.value);
  isCreateDialogOpen.value = true;
  console.log(selectedDeviceName.value);
  setTimeout(() => {
    isCreateDialogOpen.value = false;
  }, 1250);
  clearVar();
};

function clearVar(){
    selectedDeviceName.value = "";
    selectedDeviceType.value = "";
    selectedDeviceRoom.value = "";
}


onMounted(async () => {             // cuando se monta la pagina pido los datos
    try {
    // pido el update de los dato
    await store.getDeviceActionsAPI();
    await store.getAllRoomsAPI();
    await store.getAllDevicesAPI();
    loading.value = false;          // una vez updateados los uso
    } catch (error) {
    console.error(error);
    }
});

const rules = {
    minLength: value => value.length >= 3 || 'Min 3 characters',
    maxLength: value => value.length <= 15 || 'Max 15 characters',
    required: value => !!value || 'Required.',
};
const submitAddDevice = () =>{
    if(selectedDeviceName.value  && selectedDeviceRoom.value  && selectedDeviceType.value ){
        store.createADevice(selectedDeviceRoom.value, selectedDeviceName.value, selectedDeviceType.value);
        openCreateDialog();

    }
    else{
    }
}

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
                        <v-card-text>{{ store.deviceActions }}</v-card-text>

                </v-card>

                <!-- CREATE A DEVICE -->
                <v-card class="mb-4" color="lightersecondary" elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h5 font-weight-bold ">Create a Device </v-card-text>
                    </v-card-title>
                    <v-form @submit.prevent="submitAddDevice">
                        <v-select
                            variant="outlined"
                            class="pl-8 pt-8 pr-8"
                            label="Select the Device's Room"
                            :items="store.getRoomNames"
                            v-model="selectedDeviceRoom"
                            :rules="[rules.required]"
                        ></v-select>
                        <v-select
                            variant="outlined"
                            class="pl-8 pt-8 pr-8"
                            label="Select the Device Type"
                            :items="store.getSupportedDevicesNames"
                            v-model="selectedDeviceType"
                            :rules="[rules.required]"
                            ></v-select>
                        <v-text-field
                            clearable
                            :rules="[rules.required,rules.maxLength, rules.minLength]"
                            variant="outlined"
                            class="pa-8"
                            label="Device Name"
                            v-model="selectedDeviceName"></v-text-field>

                        <v-btn
                            type="submit"
                            block
                            color="secondary"
                            class="ml-8 mb-8"
                            > CONFIRM </v-btn>

                            <v-dialog v-model="isCreateDialogOpen" width="500" color="gris" persistent>
                                <v-card class="toggle-card-popup">
                                    <div class="text-center">
                                        <v-icon icon="mdi-check-circle-outline" class="check-icon"></v-icon>
                                        <v-card-title prepend-icon="mdi-check-circle-outline" class="font-weight-bold text-h5 card-title">Device Created</v-card-title>
                                        <v-card-text>Device successfully created</v-card-text>
                                    </div>
                                </v-card>
                            </v-dialog>

                    </v-form>
                </v-card>

                <!-- UPDATE A DEVICE -->
                <v-card class="mb-4" color="lightersecondary" elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h5 font-weight-bold">Update a Device :</v-card-text>
                    </v-card-title>
                    <v-select
                    variant="outlined"
                    class="pl-8 pt-8 pr-8"
                    label="Select the Device"
                    :items="store.getDevicesNames"
                    v-model="selectedDeviceName"
                    ></v-select>
                    <v-text-field
                        clearable
                        :rules="[rules.maxLength, rules.minLength]"
                        variant="outlined"
                        class="pa-8"
                        label="New Name"
                        v-model="editDeviceName"></v-text-field>
                    <v-btn elevation="0" color="secondary" class="ml-8 mb-8"  @click="() => { store.updateADeviceByName(selectedDeviceName, editDeviceName); clearVar(); }" > CONFIRM </v-btn>
                </v-card>

                <!-- DELETE A DEVICE -->
                <v-card class="mb-4" color="lightersecondary" elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h5 font-weight-bold">Delete a Device :</v-card-text>
                    </v-card-title>
                    <v-select
                    variant="outlined"
                    class="pl-8 pt-8 pr-8"
                    label="Select the Device"
                    :items="store.getDevicesNames"
                    v-model="deletionDeviceName"
                    ></v-select>
                    <v-btn elevation="0" color="secondary" class="ml-8 mb-8"  @click="() => { store.deleteADeviceByName(deletionDeviceName); clearVar(); }" > CONFIRM </v-btn>
                </v-card>

            </v-card>
        </v-card>
    </main>
</template>


<style scoped>
.ok-button {
    width: 80px;
    color: #60d75a;
}
.check-icon {
  font-size: 3rem;
  color: #60d75a;
}
.card-title{
  color: primary; /* Change the color to your desired value */
  white-space: nowrap;
  overflow: hidden;
  margin-left: -10px;
}
.toggle-card-popup {
  padding: 20px;
  border-radius: 15px !important;
  background: whitesmoke;
  backdrop-filter: blur(7px);
}
main{
    padding: 5%;
}
</style>
