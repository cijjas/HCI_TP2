<script setup>
import { onMounted } from '@vue/runtime-core';
import { useAppStore } from '@/store/app';
import { RoomApi } from '@/API/room.js';
import { ref, computed, defineProps, defineEmits, reactive } from 'vue'
const store = useAppStore();


const loading = ref(true);

const selectedRoomName = ref("");
const newRoomName = ref("");
const creationRoomName = ref("");
const deletionDeviceName = ref("");
const isCreateDialogOpen = ref(false);
deletionDeviceName

function clearVar(){
    selectedRoomName.value = "";
    deletionDeviceName.value = "";
}

onMounted(async () => {             // cuando se monta la pagina pido los datos
    try {
    // pido el update de los datos
    await store.getAllRoomsAPI();
    loading.value = false;          // una vez updateados los uso
    } catch (error) {
    console.error(error);
    }
});

const openCreateDialog = () => {
    isCreateDialogOpen.value = true;
    setTimeout(() => {
        isCreateDialogOpen.value = false;
    }, 1250);
};

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

                <!-- ROOMS -->
                <v-card class="mb-4 pr-8" color="lightersecondary"  elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h4 font-weight-bold ">Existing Rooms </v-card-text>
                    </v-card-title>
                    <v-card class="ml-10" v-if="store.rooms.length !=0" flat>
                    <v-list rounded  bg-color="secondary" >
                        <v-list-item  v-for="roomName in store.getRoomNames" >
                            {{ roomName }}
                            <v-divider></v-divider>
                        </v-list-item>
                    </v-list>
                    </v-card>
                </v-card>

                <!-- CREATE A ROOM -->
                <v-card class="mb-4" color="lightersecondary" elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h5 font-weight-bold ">Create a Room </v-card-text>
                    </v-card-title>
                    <v-text-field class="pa-8" label="Room Name" v-model="creationRoomName"></v-text-field>
                    <!-- <v-btn elevation="0" color="secondary" class="ml-8 mb-8" @click="store.createARoom(creationRoomName)"> CONFIRM </v-btn> -->
                    <v-btn elevation="0" color="secondary" class="ml-8 mb-8" @click="store.createARoom(creationRoomName); openCreateDialog()"> CONFIRM </v-btn>

                    <v-dialog v-model="isCreateDialogOpen" width="500" color="gris" >
                        <v-card class="toggle-card-popup">
                            <div class="text-center">
                                <v-icon icon="mdi-check-circle-outline" class="check-icon"></v-icon>
                                <v-card-title prepend-icon="mdi-check-circle-outline" class="font-weight-bold text-h5 card-title">Room Created</v-card-title>
                                <v-card-text>Room '{{ creationRoomName }}' successfully created</v-card-text>

                            </div>
                            <!-- <v-row justify="center">
                                <v-card-actions>
                                    <v-btn class="ok-button" color="primary" style="background-color: #60d75a; width: 150px;" variant="tonal" @click="openCreateDialog">OK</v-btn>
                                </v-card-actions>
                            </v-row> -->
                        </v-card>
                    </v-dialog>
                </v-card>

                <!-- UPDATE A ROOM -->
                <v-card class="mb-4" color="lightersecondary" elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h5 font-weight-bold">Update a Room :</v-card-text>
                    </v-card-title>
                    <v-select
                    class="pl-8 pt-8 pr-8"
                    label="Select the Room"
                    :items="store.getRoomNames"
                    v-model="selectedRoomName"
                    ></v-select>
                    <v-text-field class="pa-8" label="New Name" v-model="newRoomName"></v-text-field>
                    <v-btn elevation="0" color="secondary" class="ml-8 mb-8"  @click="() => { store.updateARoomByName(selectedRoomName, newRoomName); clearVar(); }" > CONFIRM </v-btn>
                </v-card>

                <!-- DELETE A ROOM -->
                <v-card class="mb-4" color="lightersecondary" elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h5 font-weight-bold">Delete a Room :</v-card-text>
                    </v-card-title>
                    <v-select
                    class="pl-8 pt-8 pr-8"
                    label="Select the Room"
                    :items="store.getRoomNames"
                    v-model="deletionDeviceName"
                    ></v-select>
                    <v-btn elevation="0" color="secondary" class="ml-8 mb-8"  @click="() => { store.deleteARoomByName(deletionDeviceName); clearVar(); }" > CONFIRM </v-btn>
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
    color: primary;
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
