
<script setup>
  import { ref, computed, watch, defineProps } from 'vue';
  import { useAppStore } from '@/store/app';
  const store = useAppStore();

  const props = defineProps({
  componentName: {
    type: String,
    required: true
  },
  componentId: {
    type: String,
    required: true
  },
  componentRoom: {
    type: String,
    required: true
  }
})

  const idOfInterval = ref("");
  // const props = defineProps(['roomName', 'devicesCount']);
  const componentId = ref(props.componentId);
  const componentRoom = ref(props.componentRoom);
  // const isOn = ref(false);
  const isDialogOpen = ref(false);
  const isDeleteDialogOpen = ref(false);
  const disabledFields = ref(false);

  const deviceName = ref(props.componentName);
  const amountValue = ref(1);
  const selectedUnit = ref(null);
  const unit = ref(['litres', 'gallons', 'mililitres', 'ounces']);

  const tempDeviceName = ref(deviceName.value);
  const tempAmountValue = ref(amountValue.value);
  const tempSelectedUnit = ref(selectedUnit.value);
  const rules = {
    minLength: value => value.length >= 3 || 'Min 3 characters',
    maxLength: value => value.length <= 15 || 'Max 15 characters',
    required : value => !!value || 'required',
    unique : value => !deviceNameRepeated(value) || 'Name already in use.',
    alphanumeric : value => isAlphanumeric(value) || 'Only alphanumeric characters',
    validAmount : value => value >= 1 && value <= 100 || 'Min 1 max 100'
  };

  const isAlphanumeric = (value) => {
    return /^[a-zA-Z0-9\s]+$/.test(value);
  };
  const toggleCard = () => {
    disabledFields.value = !disabledFields.value;
  }
  const deviceNameRepeated = () =>{
    if(tempDeviceName.value == deviceName.value){
      return false
    }
    return store.getADeviceByName(tempDeviceName.value) ? true : false;
  }
  const deviceNameIsValid= () =>{
    return tempDeviceName.value.length >= 3 && tempDeviceName.value.length <= 15 && !deviceNameRepeated() && isAlphanumeric(tempDeviceName.value);
  }
  const handleButtonClick = () => {
    resetValues();
  }

  const resetValues = () => {
    amountValue.value = 1;
    selectedUnit.value = null;
    disabledFields.value = false;
  }

  const openTapDialog = () => {
    isDialogOpen.value = true;
  };
  const cancelSettings = () => {
    isDialogOpen.value = false;
    tempDeviceName.value = deviceName.value;
  };
  const saveSettings = async() => {
    if(!deviceNameIsValid()) {
        return;
    }
    deviceName.value = tempDeviceName.value;
    await store.updateADevice(componentId.value, deviceName.value);
    isDialogOpen.value = false;
  };
  const deleteDevice = () => {
    close(); //cierro canilla 
    status.value = "closed";
    clearInterval(idOfInterval.value); //corto el polling
    store.deleteADeviceByName(deviceName.value); //borro de la api
    openDeleteDialog();
    cancelSettings();
};

const openDeleteDialog = () => {
        isDeleteDialogOpen.value = !isDeleteDialogOpen.value;
};

/* -------------------------------------- REFACTORING -------------------------------------- */
const deviceState = ref(store.getDeviceState(props.componentId));           // estas variables inicialmente son correctas ya que vienen del MOUNT
const status = ref(store.getDeviceState(props.componentId).status)
const isOn = computed( ()=>{
  return status.value == 'opened'
})

function changeStatus(){
  //faucet solo tiene 2 estados: opened o closed
  switch ( status.value ){
    case 'closed':
      status.value = "opened";
      open();
      break;
    case 'opened':
      status.value = "closed";
      close();
      break;
    default :
    console.log("switch error")
  }
}

async function open() {
  await store.updateADeviceState(props.componentId, "open", []);        // le avisa la api que abra, local storage "opened"
}

async function close() {
  await store.updateADeviceState(props.componentId, "close", []);
}
const isDispensing = computed( ()=>{
  return status.value == 'opened'
})

async function dispense() {
  if(amountValue.value < 1 || amountValue.value > 100 || selectedUnit.value == null ) {
    //mal la cantidad
    return;
  }
  
  status.value = "opened";
  await store.updateADeviceState(props.componentId, "dispense", [amountValue.value, selectedUnit.value]);        // le avisa la api que arranque a abrir, local storage "opened"

  //polling para chequear estado -> 
  const intervalId = setInterval(async () => {
    idOfInterval.value = intervalId;
    const deviceStateRT = await store.getDeviceStateAPI(props.componentId);
    deviceState.value = deviceStateRT;

    //cuando se dispensó todo, el state es 'closed' -> termino el polling
    if (deviceStateRT.status == 'closed') {
      store.getADevice(componentId.value).meta.intervalId = intervalId;
      clearInterval(intervalId);
      status.value = "closed";
    }
  }, 1000);
}
const isUnitSelected = ref(false);

</script>


<template>
    <v-card
    :class="{'toggle-card-on': isOn, 'toggle-card-off': !isOn}"
    @click="toggleCard">

      <v-toolbar :rounded="true" class="rounded-toolbar" @click:outside="cancelSettings">
        <v-btn @click="openTapDialog" text color="transparent">
          <v-toolbar-title class="text--white font-weight-bold text-h4 ">{{deviceName}}</v-toolbar-title>
          <v-tooltip
                activator="parent"
                location="right"
              >Edit</v-tooltip>
        </v-btn>
        
        <v-spacer></v-spacer>
        <v-btn 
              icon 
              @click="isOn = !isOn; changeStatus(); if(!isOn) resetValues();" 
              :class="{'on-button': isOn, 'off-button': !isOn}"
              >
              <v-icon>{{ !isOn ? 'mdi-water-pump-off' : 'mdi-water-pump' }}</v-icon>
              <v-tooltip 
                activator="parent"
                location="right"
              >{{isOn ? 'Turn Off' : 'Turn On'}}</v-tooltip>
            </v-btn>
        
      </v-toolbar>

      <v-row no-gutters  >
        <v-col cols="12">
          <v-subheader class="ml-4">{{componentRoom}}</v-subheader>
        </v-col>
      </v-row>

      <v-card-action class="actions-style" style="height: 90px; margin: 20px ">
        <v-card-text>
          <v-row >
            <v-col cols="4">
                <v-text-field v-if="!isDispensing"
                    v-model="amountValue" 
                    type="number" 
                    label="Amount" 
                    variant="solo" 
                    :disabled="isOn" 
                    :min="0"
                    :max="100"  
                    class="rounded-input green-text" 
                    :rules="[rules.validAmount, rules.required]"
                    bg-color='transparent' flat/>
            </v-col>
            <v-col cols="4">
              <v-select v-if="!isDispensing"
                  v-model="selectedUnit" 
                  :disabled="isOn" 
                  :items="unit" 
                  label="Unit" 
                  variant="solo" 
                  class="rounded-select green-text"  
                  bg-color='transparent' flat 
                  @update:model-value="isUnitSelected=true"
                  />
            </v-col>
            <v-col cols="4">
              <v-btn v-if="!isDispensing"
                :disabled="isOn || !isUnitSelected || amountValue < 1 || amountValue > 100" 
                color="primary" 
                @click="dispense(); isUnitSelected=false" 
                class="small-button ml-2"
                >Dispense</v-btn>
                <v-chip v-if="isDispensing"
                  class="dispensing-chip"
                  style="width: 300px; height: 40px;"
                  color="green"
                  text-color="white"
                >
                  Dispensing 
                </v-chip>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card-action>
      <v-dialog v-model="isDialogOpen" width="700" persistent>
      <v-card class="toggle-card-popup">

        <v-card-title class="font-weight-bold text-h5 card-title">Faucet Settings</v-card-title>
        
              <v-text-field
                variant="outlined"
                clearable
                :clear-icon="!tempDeviceName ? '' : 'mdi-close-circle-outline'"
                style="padding-top: 50px;"  
                label="Device Name"
                v-model.string="tempDeviceName"
                type="string"
                :rules="[rules.maxLength, rules.minLength, rules.unique, rules.alphanumeric]"
          ></v-text-field>

        <v-card-actions>
          <v-btn class="delete-button" color="white" @click="openDeleteDialog()"> Delete device</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="cancelSettings">Cancel</v-btn>
          <v-btn class="small-button-save" color="white" @click="saveSettings">Save</v-btn>
        </v-card-actions>

        <v-dialog v-model="isDeleteDialogOpen" width="1024" persistent>
            <v-card class="toggle-card-popup">
                <v-card-title class="headline">Are you sure you want to delete {{ deviceName }}?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="routinedarkred" variant="plain" @click="deleteDevice();">Delete</v-btn>
                    <v-btn color="primary" @click="openDeleteDialog">Cancel</v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>

      </v-card>
    </v-dialog>

  </v-card>
</template>

<style scoped>
.dispensing-chip {
  animation: grow-shrink 2s infinite ease-in-out;
  transform-origin: center;
}

@keyframes grow-shrink {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.actions-style {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
.toggle-card-on {
  cursor: pointer;
  padding: 16px;  
  border-radius: 20px;
  background-color: #a3c1d6;
  background-image: url('./DeviceAssets/tap-wave.png');
  background-size: cover;
  transition: all .2s ease-in-out;
  height: 300px;
  width: 400px;
  transition: all .5s ease-in-out;
}
.toggle-card-on:hover{
     transform: scale3d(1.01, 1.01, 1.01);
}
.toggle-card-off {
  cursor: pointer;
  padding: 16px;  
  border-radius: 20px;
  background-color: #a3c1d6;
  background-image: url('./DeviceAssets/tap-wave.png');
  background-size: cover;
  transition: all .2s ease-in-out;
  height: 300px;
  width: 400px;
}
.toggle-card-off::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.5; /* Change this value to adjust opacity */
  background-color: black; /* Change this value to adjust color */
}
.delete-button {
  width: 200px;
  height: 40px;
  border-radius: 10px;
  background-color: #d82602;
  box-shadow: 0 2px 4px rgba(24, 15, 15, 0.589);
}
.card-title{
  color: #1C4035; /* Change the color to your desired value */
  white-space: nowrap;
  overflow: hidden;
  margin-left: -10px;
}
.toggle-card-popup {
  padding: 30px;
  border-radius: 15px !important;
  background-color: #f4e8c6ae;
  backdrop-filter: blur(7px);
  background-image: url('./DeviceAssets/tap-wave.png');
  background-size: cover;
  backdrop-filter: blur(7px);
}

.small-button-save {
  width: 240px;
  height: 40px;
  border-radius: 10px;
  background-color: #1C4035;
}

.rounded-input {
  border-radius: 10px;
  box-shadow: inset 3px 1px 2px rgba(0, 0, 0, 0.2), 
              inset 0 -1px 3px rgba(240, 222, 162, 0.5);
  background-color: transparent;
  height: 60px;
}
.green-text {
  color: #1C4035; /* Change the color to your desired value */
}
.rounded-select {
  border-radius: 10px;
  box-shadow: inset 3px 1px 2px rgba(0, 0, 0, 0.2), 
              inset 0 -1px 3px rgba(240, 222, 162, 0.5);
  background-color: transparent;
  height: 60px;

}
.shaded-background {
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
}

  
.toggle-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
}

.rounded-toolbar {
  border-radius: 20px;
  background-color: transparent;

}
.bg-on {
  background-color: #F4CF6D;
}
.small-button {
  font-size: 12px;
  width: 100px;
  border-radius: 10px;

}
/* background color when turned off */
.bg-off {
  background-color: #8C783A;
}

.rounded-toolbar .text--white {
  color: #1C4035;
}



.on-button:active {
  /* color: #631414; */
  color: black;
}
.off-button:active {
  /* color: #1f8a3c; */
  color: black;
}
.on-button{
  color: #1f8a3c;

}
.on-button:hover{
  color: #631414;
}

</style>
