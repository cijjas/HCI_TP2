
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
  const isDeleteDialogOpen = ref(false);
  const disabledFields = ref(false);

  const deviceName = ref(props.componentName);
  const amountValue = ref(0);
  const selectedUnit = ref(null);
  const unit = ref(['litres', 'gallons', 'mililitres', 'ounces']);

  const tempDeviceName = ref(deviceName.value);
  const tempAmountValue = ref(amountValue.value);
  const tempSelectedUnit = ref(selectedUnit.value);
  const rules = {
    minLength: value => value.length >= 1 || 'Min 1 characters',
    maxLength: value => value.length <= 15 || 'Max 15 characters',
  };

  const toggleCard = () => {
    disabledFields.value = !disabledFields.value;
  }

  const handleButtonClick = () => {
    console.log(`Dispensing ${amountValue.value} ${selectedUnit.value}...`);
    resetValues();
  }

  const resetValues = () => {
    amountValue.value = 0;
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
  const saveSettings = () => {
    if(tempDeviceName.value.length < 1 || tempDeviceName.value.length > 15) {
      return;
    }
    deviceName.value = tempDeviceName.value;
    isDialogOpen.value = false;
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
    @click="toggleCard">

      <v-toolbar :rounded="true" class="rounded-toolbar" @click:outside="cancelSettings">
        <v-btn @click="openTapDialog" text color="transparent">
          <v-toolbar-title class="text--white font-weight-bold text-h4 mb-0">{{deviceName}}</v-toolbar-title>
          <v-tooltip
                activator="parent"
                location="right"
              >Edit</v-tooltip>
        </v-btn>
        
        <v-spacer></v-spacer>
        <v-btn 
              icon 
              @click="isOn = !isOn; if(!isOn) resetValues();" 
              :class="{'on-button': isOn, 'off-button': !isOn}"
              >
              <v-icon>{{ isOn ? 'mdi-power' : 'mdi-power-standby' }}</v-icon>
        </v-btn>
        
      </v-toolbar>

      <v-row no-gutters  >
        <v-col cols="12">
          <v-subheader class="ml-4">Ubicación</v-subheader>
        </v-col>
      </v-row>

      <v-card-action class="actions-style" style="height: 90px; margin: 20px ">
        <v-card-text>
          <v-row >
            <v-col>
                <v-text-field 
                    v-model="amountValue" 
                    type="number" 
                    label="Amount" 
                    variant="solo" 
                    :disabled="!isOn" 
                    :min="0"
                    :max="100"  
                    class="rounded-input green-text" 
                    bg-color='transparent' flat/>
            </v-col>
            <v-col >
              <v-select 
                  v-model="selectedUnit" 
                  :disabled="!isOn" 
                  :items="unit" 
                  label="Unit" 
                  variant="solo" 
                  class="rounded-select green-text"   
                  bg-color='transparent' flat />
            </v-col>
            <v-col >
              <v-btn 
                :disabled="!isOn" 
                color="primary" 
                @click="handleButtonClick();" 
                class="small-button"
                >Dispense</v-btn>
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
                :rules="[rules.maxLength, rules.minLength]"
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
.actions-style {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
.toggle-card-on {
  cursor: pointer;
  padding: 16px;  
  border-radius: 10px;
  background-color: #a3c1d6;
  background-image: url('./DeviceAssets/tap-wave.png');
  background-size: cover;
  transition: all .2s ease-in-out;
  height: 300px;
  width: 400px;
}
.toggle-card-off {
  cursor: pointer;
  padding: 16px;  
  border-radius: 10px;
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
  background-color: #ff2a00;
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
