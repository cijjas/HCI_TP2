// GrifoBox

<template>
  <v-card :class="{'bg-on': toggleValue, 'bg-off': !toggleValue}" class="toggle-card" @click="toggleCard">
    <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
      <v-toolbar-title class="text--white font-weight-bold text-h4 mb-0">Grifo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleValue = !toggleValue; if (!toggleValue) resetValues()" 
          :class="{'primary': toggleValue}">
        <v-icon>{{ toggleValue ? 'mdi-power' : 'mdi-power-standby' }}</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-row align="center">
        <v-col>
          <v-text-field v-model="numericValue" type="number" label="Cantidad" :disabled="!toggleValue" :min="0" />
        </v-col>
        <v-col>
          <v-select v-model="selectedItem" :disabled="!toggleValue" :items="dropdownItems" label="Unidad"  />
        </v-col>
        <v-col>
          <v-btn :disabled="!toggleValue" color="primary" @click="handleButtonClick();">Dispensar</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'GrifoBox',
  data() {
    return {
      toggleValue: false,
      numericValue: 0,
      selectedItem: null,
      dropdownItems: ['litros', 'galones', 'mililitros', 'onces'],
      disabledFields: false
    }
  },
  methods: {
    toggleCard() {
      this.disabledFields = !this.disabledFields;
    },
    handleButtonClick() {
      console.log(`Dispensing ${this.numericValue} ${this.selectedItem}...`);
      resetValues();
    },
    resetValues() {
      this.numericValue = 0;
      this.selectedItem = null;
      this.disabledFields = false;
    }
  }
}
</script>

<style scoped>
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

/* background color when turned off */
.bg-off {
  background-color: #8C783A;
}

.rounded-toolbar .text--white {
  color: #1C4035;
}
</style>
