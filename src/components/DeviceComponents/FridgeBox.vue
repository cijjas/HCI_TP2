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
  }
})
  // const props = defineProps(['roomName', 'devicesCount']);
  const componentId = ref(props.componentId);

  const isDialogOpen = ref(false);
  const isDeleteDialogOpen = ref(false);


  //real values
  const deviceName = ref(props.componentName);
  const fridgeMode = ref(0);
  const location = ref(0);
  const fridgeTemperature = ref(2);
  const freezerTemperature = ref(-8);

  //temp values
  const tempDeviceName = ref(deviceName.value);
  const tempFridgeMode = ref(fridgeMode.value);
  const tempLocation = ref(location.value);
  const tempFridgeTemperature = ref(fridgeTemperature.value);
  const tempFreezerTemperature = ref(freezerTemperature.value);

  const rules = {
    minLength: value => value.length >= 1 || 'Min 1 characters',
    maxLength: value => value.length <= 15 || 'Max 15 characters',
  };
  const openFridgeDialog = () => {
    isDialogOpen.value = true;
  };
  const closeFridgeDialog = () => {
    isDialogOpen.value = false;
  };
  
 

  const saveSettings = () => {
    if(tempDeviceName.value.length < 1 || tempDeviceName.value.length > 15) {
      return;
    }
    deviceName.value = tempDeviceName.value;
    fridgeMode.value = tempFridgeMode.value;
    fridgeTemperature.value = tempFridgeTemperature.value;
    freezerTemperature.value = tempFreezerTemperature.value;
    location.value = tempLocation.value;
    closeFridgeDialog();
  };
  const cancelSettings = () => {
    tempDeviceName.value = deviceName.value;
    tempFridgeMode.value = fridgeMode.value;
    tempFridgeTemperature.value = fridgeTemperature.value;
    tempFreezerTemperature.value = freezerTemperature.value;
    tempLocation.value = location.value;
    closeFridgeDialog();
  };
  
  const toggleCard = () => {
    /* IR A ASPIRADORA */ 
  };

  const returnToBase = () => {
    // Code to execute when button is clicked
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
            <v-subheader class="ml-4">Ubicación</v-subheader>
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

              <v-btn :color="!fridgeMode ? 'primary' : 'offcolor'" 
              @click.stop="fridgeMode = 0" 
              class="secondary text-right small-button-left"
                >Normal
              </v-btn>
            
              <v-btn 
                :color="fridgeMode ===1 ? 'primary' : 'offcolor'"
                @click.stop="fridgeMode = 1" 
                class="text-right small-button-center"
                >fiesta
              </v-btn>
              <v-btn 
                :color="fridgeMode===2 ? 'primary' : 'offcolor'"
                @click.stop="fridgeMode = 2" 
                class="text-right small-button-right"
                >Vacaciones
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
              :rules="[rules.maxLength, rules.minLength]"
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
                <v-btn :color="!tempFridgeMode ? 'primary' : 'offcolor'" 
                @click.stop="tempFridgeMode = 0" 
                class="secondary text-right temp-small-button-left"
                  >Normal
                </v-btn>
                <v-btn 
                  :color="tempFridgeMode ===1 ? 'primary' : 'offcolor'"
                  @click.stop="tempFridgeMode = 1" 
                  class="text-right temp-small-button-center"
                  >fiesta
                </v-btn>
                <v-btn 
                  :color="tempFridgeMode===2 ? 'primary' : 'offcolor'"
                  @click.stop="tempFridgeMode = 2" 
                  class="text-right temp-small-button-right"
                  >Vacaciones
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
