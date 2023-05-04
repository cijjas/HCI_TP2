  // HeladeraBox

  <template>
      <v-card :class="{'bg-on': toggleValue, 'bg-off': !toggleValue}" class="toggle-card" @click="showPopup = true">
        <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
          <v-toolbar-title class="text--white font-weight-bold text-h4 mb-0">Heladera</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          
          <v-row align="center">
          <v-col>
              <v-subheader class="ml-1">Temperatura Freezer</v-subheader>
            <br />
            <span class="font-weight-bold text-body mb-0">{{ temperatureFreezer.toFixed(2)  }}°C</span>
          </v-col>
          <v-col>
              <v-subheader class="ml-1">Temperatura Heladera</v-subheader>
            <br />
            <span class="font-weight-bold text-body mb-0">{{ temperatureHeladera.toFixed(2) }}°C</span>
          </v-col>
        </v-row>

          <v-row align="center">
              <v-subheader class="ml-1">Modo&nbsp:{{selectedMode}}</v-subheader>
              <span class="font-weight-bold text-body mb-0">{{ selectedItem }}</span>
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
          temperatureFreezer: -15,
          temperatureHeladera: 4,
          selectedMode: 'Normal',
          toggleValue: true,
          slider1Value: 0,
          slider2Value: 0,
          selectedItem: null,
          dropdownItems: ['normal', 'fiesta', 'vacaciones'],
          showPopup: false,
        }
      },
      methods: {
        handleSave(updatedValues) {
          this.temperatureFreezer = updatedValues.value1;
          this.temperatureHeladera = updatedValues.value2;
          this.selectedMode = updatedValues.selectedMode;
        },
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

  .rounded-toolbar .text--white {
    color: #1C4035;
  }

  </style>
