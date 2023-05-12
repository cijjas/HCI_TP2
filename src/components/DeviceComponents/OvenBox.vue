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

  const id = ref(0);
  const isDialogOpen = ref(false);
  const isDeleteDialogOpen = ref(false);

  // Real values
  const deviceName = ref(props.componentName);
  // const grillMode = ref(0);
  // const heatMode = ref(0);
  // const convectionMode = ref(0);
  // const temperatureValue = ref(90);
  const state = ref(store.getDeviceState(props.componentId).state);
  // const isOn = (state.value === 'on') ? ref(true) : ref(false);
  const temperatureValue = ref(store.getDeviceState(props.componentId).temperature);
  const heatMode = ref(store.getDeviceState(props.componentId).heat);
  const grillMode = ref(store.getDeviceState(props.componentId).grill);
  const convectionMode = ref(store.getDeviceState(props.componentId).convection);
  
  // Temporary values (popup)
  const tempDeviceName = ref(deviceName.value);
  const tempGrillMode = ref(grillMode.value);
  const tempheatMode = ref(heatMode.value);
  const tempConvectionMode = ref(convectionMode.value);
  const tempTemperatureValue = ref(temperatureValue.value);
  
  const computedShadow = computed(() => {
    if (tempTemperatureValue.value ==90) { // if value is not defined
      return 'inset -5px 40px 90px rgba(0, 0, 0, 0), inset -10px -40px 40px rgba(0, 0, 0, 0)'; // return transparent shadow
    }
    const color1 = (state.value === 'on') ? [244, 172, 109] : [140, 120, 58] ; 
    const color2 = [236, 94, 63]; // RGB values for #EC5E3F
    const ratio = (tempTemperatureValue.value-90) / 50; // multiply ratio by 2 for more rapid increase
    const color = color1.map((c1, i) => Math.round(c1 + ratio * (color2[i] - c1)));
    return `inset -5px 40px 90px rgba(${color.join(',')},1), inset -10px -40px 40px rgba(${color.join(',')}, 1)`;
  });

  const computedShadow2 = computed(() => {
    const color1 =  [115, 110, 94] ; 
    const color2 = [236, 94, 63]; 
    const ratio = (tempTemperatureValue.value-90) / 100;
    const color = color1.map((c1, i) => Math.round(c1 + ratio * (color2[i] - c1)));
    return `inset 0px 2px 30px rgba(${color.join(',')},1), inset 0px 3px 2px rgba(${color.join(',')}, 1)`;
  });
  
  const rules = {
    minLength: value => value.length >= 3 || 'Min 1 characters',
    maxLength: value => value.length <= 15 || 'Max 15 characters',
  };

  function isOn() {
    return (state.value === 'on');
  }
  
  watch(
    () => isOn,
    (newValue) => {
      if (newValue) {
        temperatureValue.value = 90;

      } else {
        tempTemperatureValue.value = 90;
      }
    }
  );
    
  const cancelSettings = () => {
    isDialogOpen.value = false;
    tempDeviceName.value = deviceName.value;
    tempGrillMode.value = grillMode.value;
    tempheatMode.value = heatMode.value;
    tempConvectionMode.value = convectionMode.value;
    tempTemperatureValue.value = temperatureValue.value;
  };

  const saveSettings = () => {
    if(tempDeviceName.value.length < 3 || tempDeviceName.value.length > 15) {
      return;
      //idealmente pop up de error
    }
    if(tempTemperatureValue.value < 90 || tempTemperatureValue.value > 230) {
      return;
      //idealmente pop up de error
    }
    isDialogOpen.value = false;
    deviceName.value = tempDeviceName.value;
    grillMode.value = tempGrillMode.value;
    heatMode.value = tempheatMode.value;
    convectionMode.value = tempConvectionMode.value;
    temperatureValue.value = tempTemperatureValue.value;
    // isOn.value = true;
    state.value = 'on';
    changeState();
  };

  const assign = () => {
    temperatureValue.value = tempTemperatureValue.value;
  };

  const toggleCard = () => {
    /* IR A ASPIRADORA */
  };

  const openOvenDialog = () => {
    isDialogOpen.value = !isDialogOpen.value;
  };
  const grow = () => {
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
// const deviceState = ref(store.getDeviceState(props.componentId));           // estas variables inicialmente son correctas ya que vienen del MOUNT


async function changeState() {
  console.log("Changing state");
  console.log("new state: state: " + state.value + " temp: " + temperatureValue.value + " heat: " + heatMode.value+ " grill: " + grillMode.value + "convec: " + convectionMode.value);

  //cuando me cambian datos dentro del popup y apretan save, se prende el horno
  await turnOn();

  console.log("setting grill: " + grillMode.value);
  await store.updateADeviceState(componentId.value, "setGrill", [grillMode.value]);

  console.log("setting grill: " + heatMode.value);
  await store.updateADeviceState(componentId.value, "setHeat", [heatMode.value]);

  console.log("setting grill: " + convectionMode.value);
  await store.updateADeviceState(componentId.value, "setConvection", [convectionMode.value]);

  console.log("setting grill: " + temperatureValue.value);
  await store.updateADeviceState(componentId.value, "setTemperature", [temperatureValue.value]);
  
}

async function turnOn() {
  await store.updateADeviceState(componentId.value, "turnOn", []);
}
async function turnOff() {
  await store.updateADeviceState(componentId.value, "turnOff", []);
}

function flipState() {
  if(isOn()) {
    state.value = 'off';
    turnOff();
  }
  else {
    state.value = 'on';
    turnOn();
  }
}

</script>


<template>
  <v-card
    :class="{'toggle-card-on': isOn(), 'toggle-card-off': !isOn()}"
    :style="{ boxShadow: computedShadow}"
    @mousover="grow"
    @mouseout="shrink"
    @click="toggleCard"
  >
    <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
      <v-row >
        <v-col>
          <v-btn @click="openOvenDialog" text color="transparent">
            <v-toolbar-title class="font-weight-bold text-h4 card-title"
              >{{deviceName}}</v-toolbar-title
            >
            <v-tooltip
                activator="parent"
                location="right"
              >Edit</v-tooltip>
          </v-btn>
        </v-col>

        
      </v-row>

      <v-spacer></v-spacer>
      <v-btn 
        icon 
        @click="flipState()" 
        :class="{'on-button': !isOn(), 'off-button': isOn()}"
        >
        <v-icon>{{ isOn() ? 'mdi-power' : 'mdi-power-standby' }}</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- locations for-->
    <v-row no-gutters  style="padding-bottom: 15px">
      <v-col cols="6">
        <v-subheader class="ml-1">Location</v-subheader>
      </v-col>
    </v-row>
    
    
    <v-row >
      <v-spacer> </v-spacer>
      <v-col cols="6" >
        
        <v-row >
          <v-text  class=" font-weight-bold text-h2 mb-0 green-text"> {{ tempTemperatureValue }}°C </v-text>
              </v-row>
        </v-col>
    </v-row>

    <v-row no-gutters class="mr-5 ml-5" style="margin-top: 40px">
      <v-slider
        color="primary"
        v-model="tempTemperatureValue"
        :ticks="true"
        :max="230"
        :min="90"
        :step="1"
        :disabled="!isOn()"
        @mouseup="assign"
      ></v-slider>
    </v-row>
    <!-- Aca empieza el popup -->


    <v-dialog v-model="isDialogOpen" width="1024" @click:outside="cancelSettings">
      <v-card class="toggle-card-popup">

        <v-card-title class="font-weight-bold text-h5 card-title">Oven Settings</v-card-title>
        <v-card-text>
          
          <v-row >
            <v-text-field
              variant="outlined"
              clearable
              :clear-icon="!tempDeviceName ? '' : 'mdi-close-circle-outline'"
              label="Device Name"
              v-model.string="tempDeviceName"
              :rules="[rules.maxLength, rules.minLength]"
            ></v-text-field>

            
          </v-row>
          <v-col>
            <v-col cols="12" >
              <v-col cols="12" class="temperature-box" :style="{ boxShadow: computedShadow2}" >
                <v-row>
                  <v-card-text class="text--white font-weight-bold text-h5 mb-0 green-text" >
                    <v-row>
                      <v-col cols="auto" >
                        <v-text >Temperature </v-text>
                      </v-col>
                    </v-row>  
                  </v-card-text>
                  <v-col cols="auto" class="temperature-box-small">
                    <v-text  class="text--white font-weight-bold text-h6 mb-0 green-text"> {{ tempTemperatureValue}} °C </v-text>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <v-btn
                      size="x-large"
                      density="compact"
                      icon="mdi-minus"
                      color="primary"
                      @click="if(tempTemperatureValue > 90) {
                                tempTemperatureValue-= 1
                              };
                              "
                    ></v-btn>
                  </v-col> 
                  <v-col cols="8" style="margin-left: -70px;">
                    <v-slider
                      color="primary"
                      v-model="tempTemperatureValue"
                      :max="230"
                      :min="90"
                      :step="1"
                    ></v-slider>
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                      size="x-large"
                      density="compact"
                      icon="mdi-plus"
                      color="primary"
                      @click="if(tempTemperatureValue < 230 ) {
                                tempTemperatureValue+=1
                              };"
                    ></v-btn>
                  </v-col> 
                </v-row>
              </v-col>
            </v-col>
          </v-col>
          <!-- mode buttons -->
          <v-row no-gutters class="button-row">
            <v-col cols="auto" class="ml-auto " >
              <v-row no-gutters>
                  <v-col  style="padding-top: 5px">
                    <v-card-text class="text--white font-weight-bold text-h5 mb-0 green-text" >
                      <v-text> Grill Mode </v-text>
                    </v-card-text>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(tempGrillMode=='off' ? 'primary' : 'offcolor')" dark 
                      :block="true" @click="tempGrillMode='off'" class="secondary text-right small-button-left"
                      >Off
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(tempGrillMode=='eco' ? 'primary' : 'offcolor')" dark 
                      :block="true" @click="tempGrillMode='eco'" class="text-right small-button-center"
                      >Economic
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(tempGrillMode=='large' ? 'primary' : 'offcolor')" dark 
                      :block="true" @click="tempGrillMode='large'" class="text-right small-button-right"
                      >Complete
                    </v-btn>
                  </v-col>
              </v-row>
              <v-row no-gutters>
                  <v-col  style="padding-top: 5px">
                    <v-card-text class="text--white font-weight-bold text-h5 mb-0 green-text" >
                      <v-text> Convection Mode </v-text>
                    </v-card-text>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(tempConvectionMode=='off' ? 'primary' : 'offcolor')" dark 
                      :block="true" @click="tempConvectionMode='off'" class="text-right small-button-left"
                      >Off
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(tempConvectionMode=='eco' ? 'primary' : 'offcolor')" dark 
                      :block="true" @click="tempConvectionMode='eco'" class="text-right small-button-center"
                      >Economic
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(tempConvectionMode=='normal' ? 'primary' : 'offcolor')" dark 
                      :block="true" @click="tempConvectionMode='normal'" class="text-right small-button-right"
                      >Conventional
                    </v-btn>
                  </v-col>
              </v-row>
              <v-row no-gutters>
                  <v-col  >
                    <v-card-text class="text--white font-weight-bold text-h5 mb-0 green-text" >
                      <v-text> Heat Source </v-text>
                    </v-card-text>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(tempheatMode=='conventional' ? 'primary' : 'offcolor')" dark 
                      :block="true" @click="tempheatMode='conventional'" class="text-right small-button-left"
                      >Conventional
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(tempheatMode=='top' ? 'primary' : 'offcolor')" dark 
                      :block="true" @click="tempheatMode='top'" class="text-right small-button-center"
                      >Above
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(tempheatMode=='bottom' ? 'primary' : 'offcolor')" dark 
                      :block="true" @click="tempheatMode='bottom'" class="text-right small-button-right"
                      >Below
                    </v-btn>
                  </v-col>
              </v-row>
            </v-col>
          </v-row>

        </v-card-text>
        
        <v-card-actions>
          <v-btn class="delete-button" color="white" @click="openDeleteDialog();"> Delete Device </v-btn>
          <v-spacer></v-spacer>
          <v-btn   @click="cancelSettings">Cancel</v-btn>
          <v-btn class="small-button-save" color="white" @click="saveSettings">
            {{ isOn() ? 'Save' : 'Save And Start' }}
          </v-btn>
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
.toggle-card-on {
  cursor: pointer;
  padding: 16px;
  border-radius: 10px;
  background-color: #F4CF6D;
  background-image:url('./DeviceAssets/fuego.png');
  background-size: cover;
  background-position: center;
  transition: all .2s ease-in-out;
  height: 300px;
  width: 400px;
  
}
.toggle-card-off {
  position: relative;
  cursor: pointer;
  padding: 16px;
  border-radius: 10px;
  background-color: #F4CF6D;
  background-image: url('./DeviceAssets/fuego.png');
  background-size: cover;
  background-position: center;
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


.temperature-box-small {
  font-size: 20px;
  margin: 10px;
  padding: 20px;
  width: 120px;
  background-color: #f3b373d8;
  box-shadow: inset 0 1px 7px rgba(0, 0, 0, 0.3), 
              inset 0 -4px 5px rgba(240, 222, 162, 0.5);
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;
}

.temperature-box {
  padding: 30px;
  box-shadow: inset 0 1px 7px rgba(0, 0, 0, 0.2), 
              inset 0 -1px 3px rgba(240, 222, 162, 0.5);
  background-color: transparent;
  border-radius: 10px;
}
.v-btn:hover .card-title { 
    color: #19642d;
  }
.small-button-save {
  width: 240px;
  height: 40px;
  border-radius: 10px;
  background-color: #1C4035;
}
.small-button-left {
  width: 230px;
  height: 40px;
  border-radius: 10px 0px 0px 10px;
}
.small-button-center {
  width: 230px;
  height: 40px;
  border-radius: 0px;
}
.small-button-right {
  width: 230px;
  height: 40px;
  border-radius: 0px 10px 10px 0px;
}

.toggle-card-popup {
  padding: 30px;
  border-radius: 15px !important;
  background-image: url("./DeviceAssets/fuego.png");
  background-position-x: 50%;
  background-position-y: -100px ;
  background-size: 1200px;
  background-color: #f4e8c6ae;
  backdrop-filter: blur(8px);
}

.rounded-toolbar {
  border-radius: 20px;
  background-color: transparent;
}

.green-text {
  color: #1C4035; /* Change the color to your desired value */
}
.card-title{
  color: #1C4035; /* Change the color to your desired value */
}
.card-title{
  color: #1C4035; /* Change the color to your desired value */
  white-space: nowrap;
  overflow: hidden;
  margin-left: -10px;
}

.on-button:active {
  color: #631414;
}
.off-button:active {
  color: #1f8a3c;
}
.on-button{
  color: #1f8a3c;

}
.on-button:hover{
  color: #631414;
}

</style>
