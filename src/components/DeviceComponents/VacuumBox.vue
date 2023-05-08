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
  const isDialogOpen = ref(false);
  //real values
  const deviceName = ref(props.componentName);
  const vacuumMode = ref(0);
  const chargingBaseLocation = ref(0);
  const returningToBase = ref(false);
  const location = ref(0);

  //temp values
  const tempDeviceName = ref(deviceName.value);
  const tempVacuumMode = ref(vacuumMode.value);
  const tempChargingBaseLocation = ref(chargingBaseLocation.value);
  const tempReturningToBase = ref(returningToBase.value);
  const tempLocation = ref(location.value);

  const rules = {
    minLength: value => value.length >= 1 || 'Min 1 characters',
    maxLength: value => value.length <= 15 || 'Max 15 characters',
  };
  const openVacuumDialog = () => {
    isDialogOpen.value = true;
  };
  const closeVacuumDialog = () => {
    isDialogOpen.value = false;
  };

  const saveSettings = () => {
    if(tempDeviceName.value.length < 1 || tempDeviceName.value.length > 15) {
      return;
    }
    deviceName.value = tempDeviceName.value;
    vacuumMode.value = tempVacuumMode.value;
    chargingBaseLocation.value = tempChargingBaseLocation.value;
    returningToBase.value = tempReturningToBase.value;
    location.value = tempLocation.value;
    closeVacuumDialog();
  };
  const cancelSettings = () => {
    tempDeviceName.value = deviceName.value;
    tempVacuumMode.value = vacuumMode.value;
    tempChargingBaseLocation.value = chargingBaseLocation.value;
    tempReturningToBase.value = returningToBase.value;
    tempLocation.value = location.value;
    closeVacuumDialog();
  };

  const toggleCard = () => {

  };

  const returnToBase = () => {
    // Code to execute when button is clicked
  };

  
</script>


<template>
  <v-card :class="{'bg-on': isOn, 'bg-off': !isOn}" class="toggle-card"  @click="toggleCard">
        <v-toolbar  :rounded="true" class="rounded-toolbar" transparent>

          
          <v-btn @click="openVacuumDialog" text color="transparent">
            <v-toolbar-title class="font-weight-bold text-h4 card-title">{{deviceName}}</v-toolbar-title>
            <v-tooltip
                activator="parent"
                location="right"
              >Edit</v-tooltip>
          </v-btn>
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
        <v-row no-gutters style="padding-bottom: 10px">
          <v-col cols="12">
            <v-btn icon class="primary">
              <v-icon>mdi-map-marker</v-icon>
            </v-btn>
            <v-subheader class="ml-4">Ubicación</v-subheader>
          </v-col>
        </v-row>
            
        <v-row no-gutters class="button-row">
          <v-col cols="auto">
            <v-card-actions>
              <v-btn color="primary" block @click="returnToBase">Return to Base</v-btn>
            </v-card-actions>
          </v-col>
          
          <v-col cols="auto" class="ml-auto">
            <v-row no-gutters>
                <v-col cols="auto" style="padding-top: 10px">

                  <v-btn :color="vacuumMode === 0 ? 'primary' : 'offcolor'" 
                  @click.stop="vacuumMode = 0" 
                  class="secondary text-right small-button-vacuum"
                  :disabled="!isOn" 
                    >Vacuum
                  </v-btn>
                
                </v-col>
                <v-col cols="auto" style="padding-top: 10px">

                  <v-btn 
                    :color="vacuumMode ? 'primary' : 'offcolor'"
                    @click.stop="vacuumMode = 1" 
                    class="text-right small-button-mop"
                    :disabled="!isOn"
                    >Mop
                  </v-btn>

              </v-col>
            </v-row>
          </v-col>

        </v-row>

    <v-dialog v-model="isDialogOpen" width="1024" @click:outside="cancelSettings">
      <v-card class="toggle-card-popup">

        <v-card-title class="font-weight-bold text-h5 card-title">Vacuum Settings</v-card-title>
        <v-card-text>
          
          <v-row >
            <v-text-field
              variant="outlined"
              clearable
              :clear-icon="!tempDeviceName ? '' : 'mdi-close-circle-outline'"
              style="padding-top: 50px;"  
              label="Device Name"
              v-model.string="tempDeviceName"
              type="string"
              :rules="[rules.maxLength, rules.minLength]"
            ></v-text-field>
            
          </v-row>
          <v-row>
            <v-text-field
              variant="outlined"
              clearable
              :clear-icon="!tempChargingBaseLocation ? '' : 'mdi-close-circle-outline'"
              style="padding-top: 50px;"  
              label="Charging Base Location"
              v-model.string="tempChargingBaseLocation"
              type="string"
              :rules="[rules.maxLength, rules.minLength]"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              variant="outlined"
              clearable
              :clear-icon="!tempReturningToBase ? '' : 'mdi-close-circle-outline'"
              style="padding-top: 50px;"  
              label="Returning to Base"
              v-model.string="tempReturningToBase"
              type="string"
              :rules="[rules.maxLength, rules.minLength]"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              variant="outlined"
              clearable
              :clear-icon="!tempChargingBaseLocation ? '' : 'mdi-close-circle-outline'"
              style="padding-top: 50px;"  
              label="Charging Vacuum Location"
              v-model.string="tempChargingBaseLocation"
              type="string"
              :rules="[rules.maxLength, rules.minLength]"
            ></v-text-field>
            <v-col>
              <v-row no-gutters>
                  <v-card-text class="text--white font-weight-bold text-h4 mb-0 slider-value" >
                        <v-text> Cleaning Mode </v-text>
                  </v-card-text>
                  <v-col cols="auto" >

                    <v-btn :color="tempVacuumMode === 0 ? 'primary' : 'offcolor'" 
                    @click.stop="tempVacuumMode = 0" 
                    class="secondary text-right temp-small-button-vacuum"
                      >Vacuum
                    </v-btn>
                  

                    <v-btn :color="tempVacuumMode === 1 ? 'primary' : 'offcolor'"
                      @click.stop="tempVacuumMode = 1" 
                      class="text-right temp-small-button-mop"
                      >Mop
                    </v-btn>

                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row no-gutters class="button-row">
            <v-col cols="auto" class="ml-auto " >
              
            </v-col>
          </v-row>

        </v-card-text>
        
        <v-card-actions>
          <v-btn class="delete-button" color="white" @click="deleteDevice"> Delete {{ deviceName }}</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="cancelSettings">Cancel</v-btn>
          <v-btn class="small-button-save" color="white" @click="saveSettings">Save</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

  </v-card>
</template>


<style scoped>
.delete-button {
  width: 200px;
  height: 40px;
  border-radius: 10px;
  background-color: #ff2a00;
  box-shadow: 0 2px 4px rgba(24, 15, 15, 0.589);
}
.toggle-card {
  cursor: pointer;
  padding: 16px;  
  border-radius: 10px;
  background-color: #F4CF6D;
  transition: all .2s ease-in-out;
  height: 200px;
  width: 400px;
  
}

.toggle-card::before {
    content: "";
    position: absolute;
    top: 1px;
    left: -210px;
    bottom: 300;
    width: 100%;
    height: 100%;
    background-image: url("./DeviceAssets/del-vacuum.png");
    background-size: 50%;
    background-position: calc(100% - 0px) top;
    background-repeat: no-repeat;
    opacity: 0.05;
}


.slider-value {
  color: #1C4035; /* Change the color to your desired value */
}
.toggle-card-popup {
  padding: 30px;
  border-radius: 15px !important;
  background: radial-gradient(at 80% 50%, rgba(243, 230, 111, 0.843), rgba(244, 207, 109, 0.99));
  backdrop-filter: blur(7px);
}
.toggle-card-popup::before {
  content: "";
  position: absolute;
  top: 0px;
  left: -400px;
  width: 100%;
  height: 100%;
  background-image: url("./DeviceAssets/del-vacuum.png");
  background-size: 70%;
  background-position: calc(100% - 0px) top;
  background-repeat: no-repeat;
  opacity: 0.05;
}

.temp-small-button-vacuum {
  width: 200px;
  height: 40px;
  border-radius: 10px 0px 0px 10px;
}
.temp-small-button-mop {
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

/* background color when turned off */
.bg-off {
  background-color: #8C783A;
}

.small-button-vacuum {
  border-radius: 10px 0px 0px 10px;
  font-size: 12px;
}


.small-button-mop {
  padding: 5px 8px;
  font-size: 12px;
  border-radius: 0px 10px 10px 0px;

}

.card-title{
  color: #1C4035; /* Change the color to your desired value */
  white-space: nowrap;
  overflow: hidden;
  margin-left: -10px;
}

.small-button-save {
  width: 240px;
  height: 40px;
  border-radius: 10px;
  background-color: #1C4035;
  box-shadow: 0 2px 4px rgba(24, 15, 15, 0.589);

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
