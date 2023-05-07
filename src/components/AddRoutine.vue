<script setup>
import { onMounted } from '@vue/runtime-core';
import { useAppStore } from '@/store/app';
import { RoomApi } from '@/API/room.js';
import { ref, computed, defineProps, defineEmits, reactive } from 'vue'
const store = useAppStore();


const loading = ref(true);

const selectedRoutineName = ref("");
const newRoutineName = ref("");
const creationRoutineName = ref("");
const isCreateDialogOpen = ref(false);
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
    selectedRoutineName.value = "";
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

const openCreateDialog = () => {
  isCreateDialogOpen.value = true;
  setTimeout(() => {
    isCreateDialogOpen.value = false;
  }, 2000);
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

                <!-- ROUTINES -->
                <v-card class="mb-4 pr-8" color="lightersecondary"  elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h4 font-weight-bold text-uppercase ">Routines </v-card-text>
                    </v-card-title>
                    <v-card class="ml-10" v-if="store.routines.length !=0" flat>
                    <v-list rounded  bg-color="secondary" >
                        <v-list-item  v-for="routineName in store.getAllRoutines" >
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
                    <v-text-field class="pa-8" label="Routine Name" v-model="creationRoutineName"></v-text-field>
                    <v-btn elevation="0" color="secondary" class="ml-8 mb-8" @click="store.createARoutine(creationRoutineName, defaultAction); openCreateDialog()"> CONFIRM </v-btn>

                    <v-dialog v-model="isCreateDialogOpen" width="500" color="gris" persistent>
                    <v-card class="toggle-card-popup">
                        <div class="text-center">
                        <v-icon icon="mdi-check-circle-outline" class="check-icon"></v-icon>
                        <v-card-title prepend-icon="mdi-check-circle-outline" class="font-weight-bold text-h5 card-title">Routine Created</v-card-title>
                        <v-card-text>Routine '{{ creationRoutineName }}' successfully created</v-card-text>
                        </div>
                        <!-- <v-row justify="center">
                        <v-card-actions>
                            <v-btn class="ok-button" color="primary" style="background-color: #60d75a; width: 150px;" variant="tonal" @click="openCreateDialog">OK</v-btn>
                        </v-card-actions>
                        </v-row> -->
                    </v-card>
                    </v-dialog>

                </v-card>

                <!-- UPDATE A ROUTINES -->
                <v-card class="mb-4" color="lightersecondary" elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h5 font-weight-bold">Update a Routine :</v-card-text>
                    </v-card-title>
                    <v-select
                    class="pl-8 pt-8 pr-8"
                    label="Select the Routine"
                    :items="store.getRoutineNames"
                    v-model="selectedRoutineName"
                    ></v-select>
                    <v-text-field class="pa-8" label="New Name" v-model="newRoutineName"></v-text-field>
                    <v-btn elevation="0" color="secondary" class="ml-8 mb-8"  @click="() => { store.updateARoutineByName(selectedRoutineName, newRoutineName); clearVar(); }" > CONFIRM </v-btn>
                </v-card>

                <!-- DELETE A ROUTINES -->
                <v-card class="mb-4" color="lightersecondary" elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h5 font-weight-bold">Delete a Routine :</v-card-text>
                    </v-card-title>
                    <v-select
                    class="pl-8 pt-8 pr-8"
                    label="Select the Routine"
                    :items="store.getRoutineNames"
                    v-model="selectedRoutineName"
                    ></v-select>
                    <v-btn elevation="0" color="secondary" class="ml-8 mb-8"  @click="() => { store.deleteARoutineByName(selectedRoutineName); clearVar(); }" > CONFIRM </v-btn>
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
