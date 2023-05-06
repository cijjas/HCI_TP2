
<script setup>
  import { ref } from 'vue';

  const isOn = ref(false);
  const isDialogOpen = ref(false);
  const disabledFields = ref(false);

  const deviceName = ref('Tap');
  const amountValue = ref(0);
  const selectedUnit = ref(null);
  const unit = ref(['litres', 'gallons', 'mililitres', 'ounces']);

  const tempDeviceName = ref(deviceName.value);
  const tempAmountValue = ref(amountValue.value);
  const tempSelectedUnit = ref(selectedUnit.value);
    

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
  };
</script>


<template>
    <v-card
    :class="{'bg-on': isOn, 'bg-off': !isOn}"
    class="toggle-card"
    @click="toggleCard">

      <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
        <v-btn @click="openTapDialog" text color="transparent">
          <v-toolbar-title class="text--white font-weight-bold text-h4 mb-0">Tap</v-toolbar-title>
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
  </v-card>
</template>

<style scoped>
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

.toggle-card {
  cursor: pointer;
  padding: 16px;  
  border-radius: 10px;
  background-color: #EECC66;
  transition: all .2s ease-in-out;
  height: 200px;
  width: 400px;
}
.toggle-card:hover {
  transition: transform 0.3s ease-out;
  transform: scale(1.01);
}
.toggle-card::before {
    content: "";
    position: absolute;
    top: 5px;
    left: 30px;
    bottom: 300;
    width: 100%;
    height: 100%;
    background-image: url("./DeviceAssets/del-tap.png");
    background-size: 50%;
    background-position: calc(100% - 0px) top;
    background-repeat: no-repeat;
    opacity: 0.05;
}
.toggle-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
}

.rounded-toolbar {
  border-radius: 20px;
  background-color: transparent;

}
.bg-on {
  background-color: #EECC66;
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
