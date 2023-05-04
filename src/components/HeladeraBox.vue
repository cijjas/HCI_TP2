// HeladeraBox

<template>
    <v-card :class="{'bg-on': toggleValue, 'bg-off': !toggleValue}" class="toggle-card" @click="showPopup = true">
      <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
        <v-toolbar-title class="text--white font-weight-bold text-h4 mb-0">Heladera</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row align="center">
          <v-col>
            <span class="font-weight-bold text-h5 mb-0">{{ slider1Value }}°C</span>
            <p>Temperatura Freezer</p>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <span class="font-weight-bold text-h5 mb-0">{{ slider2Value }}°C</span>
            <p>Temperatura Heladera</p>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <span class="font-weight-bold text-h5 mb-0">{{ selectedItem }}</span>
            <p>Unidad</p>
          </v-col>
        </v-row>
      </v-card-text>
      <EditValuesPopup :slider1Value="slider1Value" :slider2Value="slider2Value" :selectedItem="selectedItem" :dropdownItems="dropdownItems" v-model="showPopup" @save="handleSave" />
    </v-card>
  </template>
  
  <script>
  import EditValuesPopup from './EditValuesPopup.vue'
  
  export default {
    name: 'HeladeraBox',
    components: {
      EditValuesPopup,
    },
    data() {
      return {
        toggleValue: true,
        slider1Value: 0,
        slider2Value: 0,
        selectedItem: null,
        dropdownItems: ['normal', 'fiesta', 'vacaciones'],
        showPopup: false,
      }
    },
    methods: {
      handleSave(values) {
        this.slider1Value = values.slider1Value;
        this.slider2Value = values.slider2Value;
        this.selectedItem = values.selectedItem;
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

.bg-off {
  background-color: #8C783A;
}

/* Pop-up Menu styles */
.popup {
  position: absolute;
  z-index: 10;
  padding: 16px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
}

.popup__overlay {
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
}

.popup__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
