<script setup>
import { onMounted } from '@vue/runtime-core';
import { useAppStore } from '@/store/app';
import { RoomApi } from '@/API/room.js';
import { getIdByName} from '@/Lib/lib'
import { ref, computed, defineProps, defineEmits, reactive } from 'vue'
const store = useAppStore();



onMounted(async () => {             // cuando se monta la pagina pido los datos
    try {
    // pido el update de los datos
    await store.getAllDevicesAPI();
    await store.getAllRoomsAPI();
    await store.getAllRoutinesAPI();
    await store.getDeviceActionsAPI();


    loading.value = false;          // una vez updateados los uso
    } catch (error) {
    console.error(error);
    }
});

/* ------------------------------------- DEVICE STATE ---------------------------- */

const loading = ref(true);

const deviceObj = ref({});
const deviceName = ref("");
const action = ref("");
const unit = ref("");
const quantity = ref("");

// BOTON DE SINCRONIZACION
async function updater(){
    try {
    // pido el update de los datos
        await store.getAllDevicesAPI();
    loading.value = false;          // una vez updateados los uso
    } catch (error) {
        console.error(error);
    }
}

// FUNCION PARA PRENDER/APAGAR LA CANILLA
function onoff(){
    deviceObj.value = store.getADeviceByName(deviceName.value)
    store.updateADeviceState(deviceObj.value.id, action.value, []);
}

// FUNCION PARA TIRAR AGUA
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

/* ------------------------------------- ROUTINES ---------------------------- */

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
function executioner2(){
    console.log(store.getDeviceActionsNames("7a355fdb5b954ff5"))

}
// Crea una rutina totalmente hardcodeado
function executioner(){
    console.log(store.executeARoutine("4af2c75e7a1aa09e"));
}


/* ----------------------- shower-------------------- */

const expand = ref(false)
function shower(){
    show.value = true
}

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
            <v-text class="text-h3" > Routines </v-text>
            <br>
            <v-text>{{ store.routines }}</v-text>
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


            <br>
            <br>
            <br>
            <br>
            <v-btn @click="executioner">execute ROUTINE HARDCODEADa</v-btn>
            <v-btn @click="executioner2">Print pls</v-btn>

            <br>
            <br>
            <br>
            <br>
            <!----------------------- ADD ROUTINE ---------------------------->
            <v-card color ="gris">
                <v-card-title >Routines Testing</v-card-title>
                <v-card-title>Routine Name</v-card-title>
                <v-text-field label="Enter a Routine Name" v-model="routineName"></v-text-field>
                <v-card-title>Add An Action</v-card-title>   <!-- esto abre un arbol de opciones para cada dispositivo -->

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
        </v-card>

        <v-col class="shrink">
      <v-btn
        class="ma-2"
        color="primary"
        @click="expand = !expand"
      >
        Expand Transition
      </v-btn>

      <v-expand-transition>
        <v-card
          v-show="expand"
          height="100"
          width="100"
          class="mx-auto bg-secondary"
        ></v-card>
      </v-expand-transition>
    </v-col>

    </main>
</template>


<style scoped>
main{
    padding: 5%;
}
</style>
