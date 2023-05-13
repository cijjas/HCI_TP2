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
  const componentRoom = ref(props.componentRoom);
  // const props = defineProps(['roomName', 'devicesCount']);
  const componentId = ref(props.componentId);

  const isDialogOpen = ref(false);
  const isDeleteDialogOpen = ref(false);

  const freezerTemperature = ref(store.getDeviceState(props.componentId).freezerTemperature);
  const fridgeTemperature = ref(store.getDeviceState(props.componentId).temperature);
  const fridgeMode = ref(store.getDeviceState(props.componentId).mode);


  //real values
  const deviceName = ref(props.componentName);
  // const fridgeMode = ref('default');
  const location = ref(0);
  // const fridgeTemperature = ref(2);
  // const freezerTemperature = ref(-8);

  //temp values
  const tempDeviceName = ref(deviceName.value);
  // const tempFridgeMode = ref(fridgeMode.value);
  const auxMode = ref("");
  const tempLocation = ref(location.value);
  const tempFridgeTemperature = ref(fridgeTemperature.value);
  const tempFreezerTemperature = ref(freezerTemperature.value);

  const rules = {
    minLength: value => value.length >= 3 || 'Min 3 characters',
    maxLength: value => value.length <= 15 || 'Max 15 characters',
    required : value => !!value || 'required',
    unique : value => !deviceNameRepeated(value) || 'Name already in use.',
    alphanumeric : value => isAlphanumeric(value) || 'Only alphanumeric characters'
  };
  const openFridgeDialog = () => {
    //me guardo el valor anterior por si apretan cancel
    auxMode.value = ref(fridgeMode.value); 
    isDialogOpen.value = true;
  };
  const closeFridgeDialog = () => {
    isDialogOpen.value = false;
  };
  const isAlphanumeric = (value) => {
    return /^[a-zA-Z0-9\s]+$/.test(value);
  };
  const deviceNameRepeated = () =>{
    if(tempDeviceName.value == deviceName.value){
      return false
    }
    return store.getADeviceByName(tempDeviceName.value) ? true : false;
  }
  const deviceNameIsValid= () =>{
    return tempDeviceName.value.length >= 3 && tempDeviceName.value.length <= 15 && !deviceNameRepeated() && isAlphanumeric(tempDeviceName.value);
  }
  const saveSettings = () => {
    if(!deviceNameIsValid()) {
        return;
    }
    deviceName.value = tempDeviceName.value;
    // fridgeMode.value = tempFridgeMode.value;
    fridgeTemperature.value = tempFridgeTemperature.value;
    freezerTemperature.value = tempFreezerTemperature.value;
    location.value = tempLocation.value;
    console.log("about to update temp: ");
    console.log(fridgeMode.value);
    // store.updateADeviceState(componentId.value, "setMode", ['default']);
    changeState();
    closeFridgeDialog();
  };
  const cancelSettings = () => {
    fridgeMode.value = auxMode.value;
    tempDeviceName.value = deviceName.value;
    // tempFridgeMode.value = fridgeMode.value;
    tempFridgeTemperature.value = fridgeTemperature.value;
    tempFreezerTemperature.value = freezerTemperature.value;
    tempLocation.value = location.value;
    closeFridgeDialog();
  };
  
  const toggleCard = () => {
    /* IR A ASPIRADORA */ 
  };


  const deleteDevice = () => {
    store.deleteADeviceByName(deviceName.value);
    openDeleteDialog();
    cancelSettings();
    router.push('/');
};

const openDeleteDialog = () => {
        isDeleteDialogOpen.value = !isDeleteDialogOpen.value;
};




/* -------------------------------------- REFACTORING -------------------------------------- */
const deviceState = ref(store.getDeviceState(props.componentId));           // estas variables inicialmente son correctas ya que vienen del MOUNT
// const freezerTemperature = ref(store.getDeviceState(props.componentId).freezerTemperature);
// const fridgeTemperature = ref(store.getDeviceState(props.componentId).temperature);
// const fridgeMode = ref(store.getDeviceState(props.componentId).mode);

async function changeState() {
  console.log("Changing state");
  console.log("incoming state: freeztemp: " + freezerTemperature.value + " temp: " + fridgeTemperature.value + " mode: |" + fridgeMode._value+"|");

  await store.updateADeviceState(componentId.value, "setFreezerTemperature", [freezerTemperature.value]);
  
  await store.updateADeviceState(componentId.value, "setTemperature", [fridgeTemperature.value]);

  //no cambian con el tiempo, es un valor como on/off -> puedo hacer el chequeo directamente aca
  switch(fridgeMode.value) {
    case 'default': 
      console.log('entre a default'); 
      await store.updateADeviceState(componentId.value, "setMode", ['default']); 
      break;
    case 'party': 
      console.log('entre a party'); 
      await store.updateADeviceState(componentId.value, "setMode", ['party']); 
      break;
    case 'vacation': 
      console.log('entre a vacation'); 
      await store.updateADeviceState(componentId.value, "setMode", ['vacation']); 
      break;
    default: console.log("fridge error switch var: " + fridgeMode.value);
  }
  // await store.updateADeviceState(componentId.value, "setMode", [fridgeMode._value]);
  console.log("auxmode: " + auxMode.value + "  selectedfridgeMode: " + fridgeMode.value)  

  console.log("se mando este value de mode: " + fridgeMode.value);
  
  
}

  
</script>


<template>
  <v-card :class="{'bg-on': isOn}" class="toggle-card"  @click="toggleCard">
    
    <v-row>
      <v-col cols="12">
        <v-toolbar  :rounded="true" class="rounded-toolbar" transparent>
          
          <v-btn @click="openFridgeDialog" text color="transparent">
            <v-toolbar-title class="font-weight-bold text-h4 card-title">{{deviceName}}</v-toolbar-title>
            <v-tooltip
              activator="parent"
              location="right"
            >Edit</v-tooltip>
          </v-btn>
          <v-spacer></v-spacer>
          
        </v-toolbar>

        <v-row no-gutters style="padding-bottom: 0px">
          <v-col cols="6">
            <v-subheader class="ml-4">{{componentRoom}}</v-subheader>
          </v-col>
        </v-row>
      </v-col>

      
    </v-row>
    
    <v-row style="margin-top: -10px;">

      <v-spacer> </v-spacer>
      <v-col cols="6" >
              <v-row >
                <v-text  class=" font-weight-bold text-h5 mb-0 icier-text"> {{ tempFreezerTemperature }}°C </v-text>
              </v-row>
              <v-row style="margin-top: -20px">
                <v-text  class="font-weight-bold  mb-0 ice-text " style="font-size:70px;">{{ tempFridgeTemperature }}°C </v-text>
              </v-row>
        </v-col>
    </v-row>


    <v-row no-gutters class="button-row" style="padding-bottom:10px ;">
      <v-col cols="auto" class="ml-auto">
          <v-col cols="auto" >

              <v-btn :color="fridgeMode === 'default' ? 'primary' : 'offcolor'" 
              @click="fridgeMode = 'default'; store.updateADeviceState(componentId, 'setMode', ['default']);" 
              class="secondary text-right small-button-left"
                >Default
              </v-btn>
            
              <v-btn 
                :color="fridgeMode === 'party' ? 'primary' : 'offcolor'"
                @click="fridgeMode = 'party'; store.updateADeviceState(componentId, 'setMode', ['party']);" 
                class="text-right small-button-center"
                >Party
              </v-btn>
              <v-btn 
                :color="fridgeMode ==='vacation' ? 'primary' : 'offcolor'"
                @click="fridgeMode = 'vacation'; store.updateADeviceState(componentId, 'setMode', ['vacation']);" 
                class="text-right small-button-right"
                >Vacation
              </v-btn>
          </v-col>
      </v-col>

    </v-row>

    <v-dialog v-model="isDialogOpen" width="1024" @click:outside="cancelSettings">
          <v-card class="toggle-card-popup">
        <v-card-title class="font-weight-bold text-h5 card-title">Fridge Settings</v-card-title>
        <v-card-text>
          <v-row >
            <v-text-field 
              variant="outlined"
              clearable
              :clear-icon="!tempDeviceName ? '' : 'mdi-close-circle-outline'"
              solo
              label="Device Name"
              v-model.string="tempDeviceName"
              type="string"
              :rules="[rules.maxLength, rules.minLength, rules.unique, rules.alphanumeric]"
            ></v-text-field>        
          </v-row>
          <!-- modo -->
          <v-col cols="auto" style="padding-top: 10px; padding-bottom: 30px;">
            <v-row>
              <v-col cols="3" style="padding-top: 10px">
                  <v-card-text class="text--white font-weight-bold text-h5 mb-0 green-text" >
                    <v-text> Cooling Mode </v-text>
                  </v-card-text>
              </v-col>
              <v-col>
                <v-btn :color="fridgeMode === 'default' ? 'primary' : 'offcolor'" 
                @click="fridgeMode = 'default'" 
                class="secondary text-right temp-small-button-left"
                  >Default
                </v-btn>
                <v-btn 
                  :color="fridgeMode === 'party' ? 'primary' : 'offcolor'"
                  @click="fridgeMode = 'party'" 
                  class="text-right temp-small-button-center"
                  >Party
                </v-btn>
                <v-btn 
                  :color="fridgeMode === 'vacation' ? 'primary' : 'offcolor'"
                  @click="fridgeMode = 'vacation'" 
                  class="text-right temp-small-button-right"
                  >Vacation
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <!-- temperatura No recomiendo mirar-->
          <v-row >
            
            <v-col cols="6" >
              <v-col cols="12" class="temperature-box" >
                <v-row>
                  <v-card-text class="text--white font-weight-bold text-h5 mb-0 green-text" >
                    <v-row>
                      <v-col cols="auto" >
                        <v-text > Fridge Temperature </v-text>
                      </v-col>
                    </v-row>  
                  </v-card-text>
                  <v-col cols="auto" class="temperature-box-small">
                    <v-text  class="text--white font-weight-bold text-h6 mb-0 green-text"> {{ tempFridgeTemperature }} °C </v-text>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <v-btn
                      size="x-large"
                      density="compact"
                      icon="mdi-minus"
                      color="primary"
                      @click="if(tempFridgeTemperature > 2) {
                                tempFridgeTemperature-=0.5
                              };
                              "
                    ></v-btn>
                  </v-col> 
                  <v-col cols="8">
                    <v-slider 
                      color="primary"
                      v-model="tempFridgeTemperature"
                      :max="8"
                      :min="2"
                      :step="0.5"
                    ></v-slider>
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                      size="x-large"
                      density="compact"
                      icon="mdi-plus"
                      color="primary"
                      @click="if(tempFridgeTemperature <8 ) {
                                tempFridgeTemperature+=0.5
                              };"
                    ></v-btn>
                  </v-col> 
                </v-row>
              </v-col>
            </v-col>

            <v-col cols="6" >
              <v-col cols="12" class="temperature-box" >
              <v-row>
                <v-card-text class="text--white font-weight-bold text-h5 mb-0 green-text" >
                  <v-row>
                    <v-col cols="auto" >
                      <v-text > Freezer Temperature </v-text>
                    </v-col>
                  </v-row>  
                </v-card-text>
                <v-col cols="auto" class="temperature-box-small">
                  <v-text  class="text--white font-weight-bold text-h6 mb-0 green-text"> {{ tempFreezerTemperature }} °C </v-text>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2">
                  <v-btn
                      size="x-large"
                      density="compact"
                      icon="mdi-minus"
                      color="primary"
                      @click="if(tempFreezerTemperature > -20) {
                              tempFreezerTemperature-=0.5
                            };
                            "
                  ></v-btn>
                </v-col> 
                <v-col cols="8">
                  <v-slider
                    color="primary"
                    v-model="tempFreezerTemperature"
                    :max="-8"
                    :min="-20"
                    :step="0.5"
                  ></v-slider>
                </v-col>
                <v-col cols="2">
                  <v-btn
                    size="x-large"
                    density="compact"
                    icon="mdi-plus"
                    color="primary"
                    @click="if(tempFreezerTemperature <-8 ) {
                              tempFreezerTemperature+=0.5
                            };"
                  ></v-btn>
                </v-col> 
              </v-row>
            </v-col>
          </v-col>

          </v-row>
        </v-card-text>      
        <v-card-actions style="padding-top: 30px;">
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
.button-row {
  position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}
.toggle-card {
  cursor: pointer;
  padding: 16px;  
  border-radius: 20px;
  background-image: url("./DeviceAssets/de-ice.png");
  transition: all .2s ease-in-out;
  height: 300px;
  width: 400px;

}

.toggle-card::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 0px;
    bottom: 300;
    width: 100%;
    height: 100%;
    background-image: url("./DeviceAssets/de-ice.png");
    background-size: 50%;
    background-position: calc(100% - 0px) top;
    background-repeat: no-repeat;
    opacity: 0.05;
}
.delete-button {
  width: 200px;
  height: 40px;
  border-radius: 10px;
  background-color: #d82602;
  box-shadow: 0 2px 4px rgba(24, 15, 15, 0.589);
}
.temperature-box-small {
  font-size: 20px;
  margin: 10px;
  padding: 20px;
  width: 120px;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.2), 
               0 -1px 3px rgba(240, 222, 162, 0.5);
  background-color: transparent;
  border-radius: 10px;
  background-color:  #ffffff36;

  box-sizing: border-box;
  overflow: hidden;
  
}



.temperature-box {
  
  padding: 30px;
  box-shadow: inset 0px -5px 7px rgba(0, 0, 0, 0.2), 
              inset 0px -1px 3px rgba(9, 8, 4, 0.5);
  /* transparent */
  border-radius: 30px;
}

.small-button-left {
  font-size: 12px;
  width: 120px;
  height: 35px;
  border-radius: 10px 0px 0px 10px;
}

.small-button-center {
  font-size: 12px;
  width: 120px;
  height: 35px;
  border-radius: 0px 0px 0px 0px;
}
.small-button-right {
  font-size: 12px;
  width: 120px;
  height: 35px;
  border-radius: 0px 10px 10px 0px;
}

.icier-text {
  color: #0e9bd7;
}
.ice-text{
  color: #04629dfb;
}
.green-text {
  color: #1C4035; 
}
.yellow-text {
  color: #F4CF6D;
}
.toggle-card-popup {
  padding: 30px;
  border-radius: 15px !important;
  background-image: url("./DeviceAssets/de-ice.png");
  backdrop-filter: blur(50px);
}



.temp-small-button-left {
  width: 200px;
  height: 40px;
  border-radius: 10px 0px 0px 10px;
}
.temp-small-button-center {
  width: 200px;
  height: 40px;
  border-radius: 0px 0px 0px 0px;
}
.temp-small-button-right {
  width: 200px;
  height: 40px;
  border-radius: 0px 10px 10px 0px;
}


.toggle-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
}
.v-btn:hover .card-title {
    color: #19642d;
}
.rounded-toolbar {
  border-radius: 20px;
  background-color: transparent;

}
.bg-on {
  background-color: #F4CF6D;
}

.card-title{
  color: #1C4035; 
  white-space: nowrap;
  overflow: hidden;
  margin-left: -10px;

}

.small-button-save {
  width: 240px;
  height: 40px;
  border-radius: 10px;
  background-color: #1C4035;
}




</style>
