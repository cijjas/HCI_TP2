<script setup>
import { onMounted } from '@vue/runtime-core';
import { useAppStore } from '@/store/app';
import { RoomApi } from '@/API/room.js';
import { ref, computed, defineProps, defineEmits, reactive } from 'vue'
const store = useAppStore();


const loading = ref(true);

const selectedRoomName = ref("");
const newRoomName = ref("");
const creationRoutineName = ref("");
const actions = ref([]);
const defaultAction = ref([{
        device : {
            id : "4551cd84667ff8e1"
        },
        actionName : "turnOff",
        params : [],
        meta : {},
    }]);


function clearVar(){
    selectedRoomName.value = "";
}

onMounted(async () => {             // cuando se monta la pagina pido los datos
    try {
    // pido el update de los datos
    await store.getAllRoutinesAPI();
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

                <!-- ROUTINES -->
                <v-card class="mb-4 pr-8" color="lightersecondary"  elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h4 font-weight-bold text-uppercase ">Routines </v-card-text>
                    </v-card-title>
                    <v-card class="ml-10" v-if="store.routines.length !=0" flat>
                    <v-list rounded  bg-color="secondary" >
                        <v-list-item  v-for="routineName in store.getRoutinesNames" >
                            {{ routineName }}
                            <v-divider></v-divider>
                        </v-list-item>
                    </v-list>
                    </v-card>
                        <v-card-text>{{ store.routines }}</v-card-text>
                </v-card>

                <!-- CREATE A ROUTINES -->
                <v-card class="mb-4" color="lightersecondary" elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h5 font-weight-bold ">Create a Routine </v-card-text>
                    </v-card-title>
                    <v-text-field class="pa-8" label="Room Name" v-model="creationRoutineName"></v-text-field>
                    <v-btn elevation="0" color="secondary" class="ml-8 mb-8" @click="store.createARoutine(creationRoutineName, defaultAction)"> CONFIRM </v-btn>
                </v-card>

                <!-- UPDATE A ROUTINES -->
                <v-card class="mb-4" color="lightersecondary" elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h5 font-weight-bold">Update a Routine :</v-card-text>
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

                <!-- DELETE A ROUTINES -->
                <v-card class="mb-4" color="lightersecondary" elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h5 font-weight-bold">Delete a Room :</v-card-text>
                    </v-card-title>
                    <v-select
                    class="pl-8 pt-8 pr-8"
                    label="Select the Room"
                    :items="store.getRoomNames"
                    v-model="selectedRoomName"
                    ></v-select>
                    <v-btn elevation="0" color="secondary" class="ml-8 mb-8"  @click="() => { store.deleteARoomByName(selectedRoomName); clearVar(); }" > CONFIRM </v-btn>
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
