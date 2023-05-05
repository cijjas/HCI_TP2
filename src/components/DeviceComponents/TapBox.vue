
<script>
import { ref } from 'vue';

export default {
  name: 'TapBox',
  setup() {
    const isOn = ref(false);
    const numericValue = ref(0);
    const selectedItem = ref(null);
    const dropdownItems = ref(['litros', 'galones', 'mililitros', 'onces']);
    const disabledFields = ref(false);

    const toggleCard = () => {
      disabledFields.value = !disabledFields.value;
    }

    const handleButtonClick = () => {
      console.log(`Dispensing ${numericValue.value} ${selectedItem.value}...`);
      resetValues();
    }

    const resetValues = () => {
      numericValue.value = 0;
      selectedItem.value = null;
      disabledFields.value = false;
    }

    return {
      isOn,
      numericValue,
      selectedItem,
      dropdownItems,
      disabledFields,
      toggleCard,
      handleButtonClick,
      resetValues
    };
  }
}
</script>


<template>
    <v-card
    :class="{'bg-on': isOn, 'bg-off': !isOn}"
    :style="{ width: '400px' }"
    class="toggle-card"
    @click="toggleCard"
  >
    <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
      <v-toolbar-title class="text--white font-weight-bold text-h4 mb-0">Tap</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="isOn = !isOn; if (!isOn) resetValues()" 
          :class="{'primary': isOn}">
        <v-icon>{{ isOn ? 'mdi-power' : 'mdi-power-standby' }}</v-icon>
      </v-btn>
    </v-toolbar>

    <v-row no-gutters align="center" >
      <v-col cols="12">
        <v-subheader class="ml-4">Ubicación</v-subheader>
      </v-col>
    </v-row>

    <v-card-text>
      <v-row align="center" justify="space-between" class="align-top">
        <v-col>
          <v-row>
            <v-text-field v-model="numericValue" type="number" label="Amount" variant="solo" :disabled="!isOn" :min="0"  class="rounded-input" bg-color='transparent' flat/>
          </v-row>
        </v-col>
        <v-col>
          <v-select v-model="selectedItem" :disabled="!isOn" :items="dropdownItems" label="Unit" variant="solo" class="rounded-select"   bg-color='transparent' flat />
        
        </v-col>
        <v-col class="d-flex justify-end align-end ">
          <v-btn :disabled="!isOn" color="primary" @click="handleButtonClick();" class="small-button">Dispense</v-btn>
        </v-col>
      </v-row>
    </v-card-text>

  </v-card>
</template>

<style scoped>
.rounded-input {
  border-radius: 20px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2), 
              inset 0 -1px 3px rgba(240, 222, 162, 0.5);
  background-color: transparent;
  padding: 10px;
}
.rounded-select {
  border-radius: 20px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2), 
              inset 0 -1px 3px rgba(240, 222, 162, 0.5);
  background-color: transparent;
  padding: 10px;
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
  max-height: 200px;
  max-width: 450px;
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
  padding: 5px 8px;
  font-size: 12px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;

}
/* background color when turned off */
.bg-off {
  background-color: #8C783A;
}

.rounded-toolbar .text--white {
  color: #1C4035;
}



</style>
