<script setup>
import { onMounted } from '@vue/runtime-core';
import { useAppStore } from '@/store/app';
import { ref, computed } from 'vue';

const store = useAppStore();
const isCreateDialogOpen = ref(false);

onMounted(async () => {
  try {
    await store.getAllDevicesAPI();
    await store.getDeviceActionsAPI();
    await store.getAllRoutinesAPI();
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

const rules = {
    required: value => !!value || 'Required.',
    min: (value) => value.length >= 1 || 'Min 1 characters',
    max: (value) => value.length <= 15 || 'Max 15 characters',
    notRepeated: (value) => !store.getRoutinesNames.includes(value) || 'Routine already exists',
    isNumber: (value) => !isNaN(value) || 'Must be a number',
    isAcceptableNumber: (value, minValue, maxValue) => ((!isNaN(value) && value >= minValue && value <= maxValue)) || `Must be a number between ${minValue} and ${maxValue}`,
    alphanumeric : value => /^[a-zA-Z0-9\s]+$/.test(value) || 'Only alphanumeric characters'
};
function updateActions(selection){
  change();
    selectedDevice.value = selection;
    deviceObj2.value = store.getADeviceByName(selectedDevice.value)
    actionsArr.value = store.getTypeActionsNames(deviceObj2.value.type.name)
}
function updateParams(selection){
  selectedParams.value = [];
  selectedAction.value = selection;
  paramsArr.value = store.getActionParameters(deviceObj2.value.type.name,selectedAction.value);
}
function updateParamValue(selection, index){
    selectedParams.value[index] = selection
}
function addAction(){
    routineActions.value.push(store.createAction(deviceObj2.value.id, selectedAction.value, selectedParams.value))
}
const submitRoutine = () => {
  if(routineName.value && routineActions.value.length > 0){
    store.createARoutine(routineName.value, routineActions.value);
    routineName.value = ""
    routineActions.value = []
    openCreateDialog();
  }
}
const submitAction = () => { 
  if(selectedDevice.value && selectedAction.value ){
    console.log(selectedDevice.value)
    console.log(selectedAction.value)
    console.log(selectedParams.value)
    addAction();
    actionsArr.value = []
    paramsArr.value = []
    selectedDevice.value = ""
    selectedAction.value = ""
    selectedParams.value = []

  }
}
const isFormValid = ref(false);

const submitButtonDisabled = computed(() => {
  if(!selectedDevice.value){
    return true;
  }
  return !isFormValid.value;
});
function parseParams(params) {
  if (!params || params.length === 0) {
    return '';
  }
  if (params.length === 1) {
    return params[0];
  }
  return params[0] + params[1];
}

function parseAction(action) {
  switch (action) {
    case "open":
    case "close":
    case "dispense":
    case "play":
    case "stop":
    case "pause":
    case "resume":
    case "getPlaylist":
      return action;

    case "setLevel":
      return "set level to";

    case "turnOn":
      return "turn on";

    case "turnOff":
      return "turn off";

    case "setTemperature":
    case "setFreezerTemperature":
      return "set temperature to";

    case "setHeat":
    case "setGrill":
    case "setConvection":
      return "set heat mode to";

    case "setVolume":
      return "set volume to";

    case "nextSong":
      return "play next song";

    case "previousSong":
      return "play previous song";

    case "setGenre":
      return "set genre to";

    default:
      return action;
  }
}

function handleReset(){
  console.log("reset")
  selectedDevice.value = ""
  selectedAction.value = ""
  selectedParams.value = []
  actionsArr.value = []
  paramsArr.value = []
  routineActions.value = []
  routineName.value=''
}
function change(){
  console.log("change")
  selectedDevice.value = ''
  selectedAction.value = ""
  selectedParams.value = []
  paramsArr.value = []
}

const isRoutineValid = ref(false);
const submitRoutineDisabled = computed(() => {
  if(store.getRoutinesNames.includes(routineName.value)){
   return true; 
  }
  return !isRoutineValid.value;
});


</script>


<template>
    <v-card width="850" class="mx-auto card-style">
      <v-toolbar color="transparent" dense dark style="height: 120px;">
        <v-col cols="12" >
            <v-row >
                <v-toolbar-title class="font-weight-bold text-h4 title-style mt-16 ml-8">Build Routine</v-toolbar-title>

                <v-toolbar-title class="font-weight-bold text-h6 title-style mt-16 ml-16">
                  Actions
                  <v-icon class="ml-2">mdi-menu-down</v-icon>
                </v-toolbar-title>
                <v-btn icon class="mt-16 mr-10">
                  <v-icon color="primary">mdi-information-outline</v-icon>
                  <v-tooltip
                    activator="parent"
                    location="right"
                  > To create a routine, there has to be at <br>
                    least one action added to the routine. <br>
                    You can add actions by selecting a <br> 
                    device and an action from the dropdowns <br>
                    below. 
                </v-tooltip>
                </v-btn>
            </v-row>
        </v-col>
      </v-toolbar>
      <!-- lado izquierdo DE LA CARD -->

      <v-row>
        <v-col cols="6">
          <v-form  @submit.prevent="submitAction" v-model="isFormValid">

            <v-select
              validate-on='blur'
              v-model="selectedDevice"
              @update:modelValue = "updateActions"
              :items="store.getDevicesNames"
              :rules="[rules.required]"
              label="Select A Device to Perform an Action"
              variant="outlined"
              class="pl-8  pr-8"
              base-color="primary"
              color="verdatim"
            ></v-select>

            <v-select v-if="selectedDevice != ''"
            validate-on='input'
                v-model="selectedAction"
                @update:modelValue = "updateParams($event, index)"
                label="Select the Action to Perform"
                :rules="[rules.required]"
                :items="actionsArr"
                variant="outlined"
                class="pl-8  pr-8"
                base-color="primary"
                color="verdatim"
            ></v-select>


              <v-card-text v-for="(param, index) in paramsArr" >

                    <v-select v-if="param.type == 'string' && param.name != 'roomId'"
                      v-model="selectedParams[index]"
                      @update:modelValue="updateParamValue($event, index)"
                      label="Select An Option"
                      :rules="[rules.required]"
                      :items="param.supportedValues"
                      variant="outlined"
                      class="pl-8 pr-8"
                      base-color="primary"
                      color="verdatim"
                    ></v-select>

                    <v-select v-if="param.type == 'string' && param.name == 'roomId'"
                      @update:modelValue="updateParamValue($event, index)"
                      label="Select An Option (Room)"
                      :rules="[rules.required]"
                      :items="store.getRoomNames"
                      variant="outlined"
                      class="pl-8 pr-8"
                      base-color="primary"
                      color="verdatim"
                    ></v-select>


                  <v-text-field v-if="param.type == 'number'"
                    @update:modelValue="updateParamValue($event, index)"
                    :label="`${param.name }`"
                    type="number"
                    :rules="[rules.required, (value) => rules.isAcceptableNumber(value, param.minValue, param.maxValue)]"
                    :min="param.minValue"
                    :max="param.maxValue"
                    variant="outlined"
                    class="pl-8  pr-8"
                    base-color="primary"
                    color="verdatim"
                  ></v-text-field>


                </v-card-text>
                <v-row class="pr-10">
                  <v-spacer></v-spacer>
                  <v-btn
                  type="submit"
                  color="m1"
                  class="ml-8"
                  :disabled="submitButtonDisabled"
                  >
                  Add Action
                  <v-icon>mdi-arrow-right</v-icon>
                  </v-btn>

                </v-row>
          </v-form>
        </v-col>
        <!-- lado derecho -->
        <v-col cols="6" style="padding-right: 30px;">
          <v-card v-if="routineActions.length == 0" color="transparent" >
            <v-card-text >No Actions Added</v-card-text>
          </v-card>
          <v-card v-if="routineActions.length != 0"  color="transparent" >
            <v-list rounded style="max-height: 420px; overflow-y: auto;">
              <v-list-item v-for="(routineAction, index) in routineActions" :key="index" :class="index % 2 === 0 ? 'bg-color-1' : 'bg-color-2'" >
                <span style="color: rgb(148, 133, 73);">{{ routineAction.meta.name }} will {{ parseAction(routineAction.actionName) }} {{ parseParams(routineAction.params) }}</span>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>


      </v-row> 

      <v-form @submit.prevent="submitRoutine" v-model="isRoutineValid">
        <v-card-actions class="actions-style" style="height: 120px;  "  >
            <v-btn color="white" @click="handleReset" class="ml-8">Clear</v-btn>
            
            <v-spacer></v-spacer>
                <v-text-field
                  validate-on="input"
                  placeholder="Routine's Name"
                  :rules="[rules.required, rules.notRepeated, rules.alphanumeric, rules.min, rules.max]"
                  v-model="routineName"
                  label="Routine's Name"
                  class="pl-8 mt-6 pr-8 form-input"
                  base-color="primary"
                  color="primary"
                  bg-color="g1"
                  clearable="true"
                  clear-icon="mdi-close-circle-outline"/>
                
                <v-btn
                  type="submit"
                  class="small-button-add mr-12"
                  color="white"
                  :disabled="submitRoutineDisabled">
                  <v-icon>mdi-plus</v-icon>  
                  Add Routine
                  
                </v-btn>
                
        </v-card-actions>
      </v-form>

      <v-dialog v-model="isCreateDialogOpen" width="500" color="gris" >
          <v-card class="toggle-card-popup">
              <div class="text-center">
                  <v-icon icon="mdi-check-circle-outline" class="check-icon"></v-icon>
                  <v-card-title prepend-icon="mdi-check-circle-outline" class="font-weight-bold text-h5 card-title">Routine Created</v-card-title>
                  <v-card-text>Routine successfully created</v-card-text>
              </div>
          </v-card>
      </v-dialog>

    </v-card>
</template>

<style scoped>


.bg-color-1 {
    background-color: #DBD0AF; /* light gray */
    margin-top: -10px;
    margin-bottom: -10px;
  }
  .bg-color-2 {
    background-color: #EFE5C5; /* white */
    margin-top: -10px;
    margin-bottom: -10px;
  }
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
  .small-button-add {
    width: 200px;
    height: 40px;
    border-radius: 10px;
    background-color: #5C3B3B;
  }
  .actions-style {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color:#795454;
  }

  .title-style {
    color:#1C4035;
  }
  .card-style {
    border-radius: 30px;
    background-image: url('../ComponentsAssets/background-long.png');
    background-size: cover;
    background-position-x: -50px;
    background-position-y: -50px;
    height: 646px;
    transition:  transform .3s ease-in-out;
  }
  
</style>
