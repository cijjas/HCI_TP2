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

  const isOn = ref(false);
  const id = ref(0);
  const isDialogOpen = ref(false);
  const isDeleteDialogOpen = ref(false);

  // Real values
  const deviceName = ref(props.componentName);
  const grillMode = ref(0);
  const sourceMode = ref(0);
  const convectionMode = ref(0);
  const temperatureValue = ref(90);
  
  // Temporary values (popup)
  const tempDeviceName = ref(deviceName.value);
  const tempGrillMode = ref(grillMode.value);
  const tempSourceMode = ref(sourceMode.value);
  const tempConvectionMode = ref(convectionMode.value);
  const tempTemperatureValue = ref(temperatureValue.value);
  
  const computedShadow = computed(() => {
    if (tempTemperatureValue.value ==90) { // if value is not defined
      return 'inset -5px 40px 90px rgba(0, 0, 0, 0), inset -10px -40px 40px rgba(0, 0, 0, 0)'; // return transparent shadow
    }
    const color1 = isOn.value ? [244, 172, 109] : [140, 120, 58] ; 
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
  
  watch(
    () => isOn.value,
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
    tempSourceMode.value = sourceMode.value;
    tempConvectionMode.value = convectionMode.value;
    tempTemperatureValue.value = temperatureValue.value;
  };

  const saveSettings = () => {
    if(tempDeviceName.value.length < 3 || tempDeviceName.value.length > 15) {
      return;
    }
    isDialogOpen.value = false;
    deviceName.value = tempDeviceName.value;
    grillMode.value = tempGrillMode.value;
    sourceMode.value = tempSourceMode.value;
    convectionMode.value = tempConvectionMode.value;
    temperatureValue.value = tempTemperatureValue.value;
    isOn.value = true;
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

</script>


<template>
  <v-card
    :class="{'toggle-card-on': isOn, 'toggle-card-off': !isOn}"
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
        @click="isOn = !isOn" 
        :class="{'on-button': isOn, 'off-button': !isOn}"
        >
        <v-icon>{{ isOn ? 'mdi-power' : 'mdi-power-standby' }}</v-icon>
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
        :disabled="!isOn"
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
                    <v-btn :color="(tempGrillMode==0 ? 'primary' : 'offcolor')" dark 
                      :block="true" @click="tempGrillMode=0" class="secondary text-right small-button-left"
                      >Off
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(tempGrillMode==1 ? 'primary' : 'offcolor')" dark 
                      :block="true" @click="tempGrillMode=1" class="text-right small-button-center"
                      >Economic
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(tempGrillMode==2 ? 'primary' : 'offcolor')" dark 
                      :block="true" @click="tempGrillMode=2" class="text-right small-button-right"
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
                    <v-btn :color="(tempConvectionMode==0 ? 'primary' : 'offcolor')" dark 
                      :block="true" @click="tempConvectionMode=0" class="text-right small-button-left"
                      >Off
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(tempConvectionMode==1 ? 'primary' : 'offcolor')" dark 
                      :block="true" @click="tempConvectionMode=1" class="text-right small-button-center"
                      >Economic
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(tempConvectionMode==2 ? 'primary' : 'offcolor')" dark 
                      :block="true" @click="tempConvectionMode=2" class="text-right small-button-right"
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
                    <v-btn :color="(tempSourceMode==0 ? 'primary' : 'offcolor')" dark 
                      :block="true" @click="tempSourceMode=0" class="text-right small-button-left"
                      >Conventional
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(tempSourceMode==1 ? 'primary' : 'offcolor')" dark 
                      :block="true" @click="tempSourceMode=1" class="text-right small-button-center"
                      >Above
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(tempSourceMode==2 ? 'primary' : 'offcolor')" dark 
                      :block="true" @click="tempSourceMode=2" class="text-right small-button-right"
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
            {{ isOn ? 'Save' : 'Save And Start' }}
          </v-btn>
        </v-card-actions>

        <v-dialog v-model="isDeleteDialogOpen" width="1024" persistent>
            <v-card class="toggle-card-popup">
                <v-card-title class="headline">Are you sure you want to delete {{ deviceName }}?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" variant="plain" @click="deleteDevice();">Delete</v-btn>
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
  background-color: #f4ac6d;
  background-image:url('./DeviceAssets/fuego.png');
  background-size: cover;
  transition: all .2s ease-in-out;
  height: 300px;
  width: 400px;
  
}
.toggle-card-off {
  position: relative;
  cursor: pointer;
  padding: 16px;
  border-radius: 10px;
  background-color: #f4ac6d;
  background-image: url('./DeviceAssets/fuego.png');
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
  background-color: #ff2a00;
  box-shadow: 0 2px 4px rgba(24, 15, 15, 0.589);
}


.temperature-box-small {
  font-size: 20px;
  margin: 10px;
  padding: 20px;
  width: 120px;
  box-shadow: inset 0 1px 7px rgba(0, 0, 0, 0.2), 
              inset 0 -1px 3px rgba(240, 222, 162, 0.5);
  background-color: #F4CF6Dd8;
  border-radius: 10px;
  box-sizing: border-box;
  overflow: hidden;
}
.red-text {
  color: #ff0000;
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
  background-color: #f4e8c6ae;
  backdrop-filter: blur(8px);
  background-size: cover;
  background-color: radial-gradient(at 80% 50%, rgba(240, 147, 65, 0.739), rgba(244, 207, 109, 0.99));
}



.toggle-card::before {
  content: "";
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 70%;
  background-position: calc(100% - 0px) top;
  background-repeat: no-repeat;
  opacity: 0.05;
}



.rounded-toolbar {
  border-radius: 20px;
  background-color: transparent;
}

.bg-on {
  background-color: #f4a86d;
}

/* background color when turned off */
.bg-off {
  background-color: #000000;
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
