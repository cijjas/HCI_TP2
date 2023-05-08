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
            id : "1230f46474ee97f1"
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
    await store.getAllDevicesAPI();
    await store.getDeviceActionsAPI();
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

/* ------------------- CREAR RUTINA ------------------ */
const deviceObj2 = ref({});

/* se establecen segun lo seleccionado por el usuario */
const routineName = ref("");
const selectedDevice = ref("");
const selectedAction = ref("");
const selectedParams = ref([])

/* varian segun las selecciones */
const actionsArr = ref([]);
const paramsArr = ref([]);

/* se define cuando se confirma una rutina */
const routineActions = ref([]);


function updateActions(selection){
    selectedDevice.value = selection;
    deviceObj2.value = store.getADeviceByName(selectedDevice.value)
    actionsArr.value = store.getTypeActionsNames(deviceObj2.value.type.name)
}
function updateParams(selection){
    selectedAction.value = selection;
    paramsArr.value = store.getActionParameters(deviceObj2.value.type.name,selectedAction.value);
}
function updateParamValue(selection, index){
    selectedParams.value[index] = selection
}

function addAction(){
    routineActions.value.push(store.createAction(deviceObj2.value.id, selectedAction.value, selectedParams.value))
    actionsArr.value = []
    paramsArr.value = []
    selectedDevice.value = ""
    selectedAction.value = ""
    selectedParams.value = []
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

                <!-- ROUTINES -->
                <v-card class="mb-4 pr-8" color="lightersecondary"  elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h4 font-weight-bold text-uppercase ">Routines </v-card-text>
                    </v-card-title>
                    <v-card class="ml-10" v-if="store.routines.length !=0" flat>
                    <v-list rounded  bg-color="secondary" >
                        <v-list-item  v-for="routine in store.routines" >
                            {{ routine.name }}
                            <v-divider></v-divider>
                        </v-list-item>
                    </v-list>
                    </v-card>
                        <v-card-text>{{ store.routines }}</v-card-text>
                </v-card>

                <!-- CREATE A ROUTINES -->
                <v-card color ="gris">
                <v-card-title >Routines Testing</v-card-title>
                <v-card-title>Routine Name</v-card-title>
                <v-text-field label="Enter a Routine Name" v-model="routineName"></v-text-field>

                <v-card class="mb-4 pr-8" color="lightersecondary"  elevation="0">
                    <v-card-title>
                        <v-card-text class="text-h4 font-weight-bold ">Actions: </v-card-text>
                    </v-card-title>
                    <v-card class="ml-10" v-if="routineActions.length !=0" flat>
                    <v-list rounded  bg-color="secondary" >
                        <v-list-item  v-for="routineAction in routineActions" >
                            {{ routineAction.actionName }} {{ routineAction.params }}
                            <v-divider></v-divider>
                        </v-list-item>
                    </v-list>
                    <v-text>{{routineActions}}</v-text>
                    </v-card>
                </v-card>
                <v-card-title>Add An Action</v-card-title>   <!-- esto abre un arbol de opciones para cada dispositivo -->

                <!-- se seleccion una dispostivo -> se muestran las acciones -->
                <v-select
                    @update:modelValue = "updateActions"
                    variant="outlined"
                    class="pl-8 pt-8 pr-8"
                    label="Select the Device"
                    :items="store.getDevicesNames"
                ></v-select>
                <!-- se selecciona una accion -> se muestran los posibles valores  -->
                <v-select v-if="selectedDevice !== ''"
                    @update:modelValue = "updateParams($event, index)"
                    variant="outlined"
                    class="pl-8 pt-8 pr-8"
                    label="Select An Action"
                    :items="actionsArr"
                ></v-select>
                <!-- se selecciona un parametro -> se muestra el boton de creacion  -->
                <v-card-text v-for="(param,index) in paramsArr">
                    <v-select v-if="param.type == 'string' && param.name != 'roomId'"
                    @update:modelValue = "updateParamValue($event, index)"
                    variant="outlined"
                    class="pl-8 pt-8 pr-8"
                    label="Select An Option"
                    :items="param.supportedValues"
                    >
                    </v-select>
                    <v-select v-if="param.type == 'string' && param.name == 'roomId'"
                    @update:modelValue = "updateParamValue($event, index)"
                    variant="outlined"
                    class="pl-8 pt-8 pr-8"
                    label="Select An Option"
                    :items="store.getRoomNames"
                    >
                    </v-select>
                <v-text-field v-if="param.type == 'number'"
                @update:modelValue = "updateParamValue($event, index)"
                type="number"
                class="pl-8 pt-8 pr-8"
                variant="solo"
                :min="param.minValue"
                :max="param.maxValue"
                :label="`${param.name}`"></v-text-field>
                </v-card-text>

                <v-btn @click="addAction" elevation="0" color="secondary" class="ml-8 mb-8">Add Action to Routine</v-btn><br> <!-- añade al array de acciones en la rutina, storage en componente -->
                <v-btn @click="store.createARoutine(routineName, routineActions)" elevation="0" color="secondary" class="ml-8 mb-8">Create Routine</v-btn> <!-- Crea la rutina con el nombre y el array de acciones que se construyo -->
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
