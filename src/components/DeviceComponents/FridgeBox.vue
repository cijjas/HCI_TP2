  // Fridge
  <script setup>
    import { ref, computed } from 'vue';
    import FridgePopup from './DevicePopups/FridgePopup'

    const temperatureFreezer = ref(-15);
    const temperatureFridge = ref(4);
    const selectedMode = ref(0);
    const showPopup = ref(false);
    const deviceName = ref('Fridge');

    const handleSave = (updatedValues) => {
      temperatureFreezer.value = updatedValues.valueFreezer;
      temperatureFridge.value = updatedValues.valueFridge;
      selectedMode.value = updatedValues.selectedMode;
      deviceName.value = updatedValues.deviceName;
    };
    
    const toggleModeNormal = () => {
      selectedMode.value = 0;
    };
    const toggleModeFiesta = () => {
      selectedMode.value = 1;
    };
    const toggleModeVacation = () => {
      selectedMode.value = 2;
    };
    
    const getMode = computed(() => selectedMode.value);
</script>

<template>
  <v-card
  :class="{'bg-on': isOn, 'bg-off': !isOn}"
  class="toggle-card"
  @click="toggleCard"
  >

    <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
      <v-btn @click="showPopup = true" text color="transparent">
        <v-toolbar-title   class="text--white font-weight-bold text-h4 mb-0 card-title">{{ deviceName }}</v-toolbar-title>
      </v-btn>
      
    </v-toolbar>
    <v-card-text>
    
      <v-row align="center">
        <v-col>
            <v-subheader class="ml-1">Freezer</v-subheader>
          <br />
          <span class="font-weight-bold text-body mb-0">{{ temperatureFreezer.toFixed(2)  }}°C</span>
        </v-col>

        <v-col>
            <v-subheader class="ml-1">Fridge</v-subheader>
          <br />
          <span class="font-weight-bold text-body mb-0">{{ temperatureFridge.toFixed(2) }}°C</span>
        </v-col>
      </v-row>

      <v-row no-gutters class="button-row">
        <v-col cols="auto" class="ml-auto">
          <v-row no-gutters>
              <v-col cols="auto" style="padding-top: 10px">
                <v-btn :color="(getMode==0 ? 'primary' : 'offcolor')" dark 
                  :block="true" @click.stop="toggleModeNormal" class="secondary text-right small-button-normal"
                  >normal
                </v-btn>
              </v-col>
              <v-col cols="auto" style="padding-top: 10px">
                <v-btn :color="(getMode==1 ? 'primary' : 'offcolor')" dark 
                  :block="true" @click.stop="toggleModeFiesta" class="text-right small-button-fiesta"
                  >fiesta
                </v-btn>
              </v-col>
              <v-col cols="auto" style="padding-top: 10px">
                <v-btn :color="(getMode==2 ? 'primary' : 'offcolor')" dark 
                  :block="true" @click.stop="toggleModeVacation" class="text-right small-button-vacation"
                  >vacation
                </v-btn>
              </v-col>
          </v-row>
        </v-col>
      </v-row>

    </v-card-text>

    <FridgePopup 
    :temperatureFreezer="temperatureFreezer" 
    :temperatureFridge="temperatureFridge" 
    :deviceName="deviceName" 
    v-model="showPopup" 
    @save="handleSave" />

  </v-card>
</template>

    
<style scoped>
  .toggle-card {
    cursor: pointer;
    padding: 16px;
    border-radius: 10px;
    background-color: #EECC66;
    transition: all .2s ease-in-out;
    height: 200px;
    width: 400px;
  }

  .toggle-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("./DeviceAssets/del-snow-flake.png");
    background-size: 70%;
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

  .v-btn:hover .card-title {
    color: #19642d;
  }


  .rounded-toolbar .text--white {
    color: #1C4035;
  }
  .small-button-normal{
    font-size: 12px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;

  }
  .small-button-fiesta{
    padding: 5px 8px;
    font-size: 12px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }

  .small-button-vacation{
    padding: 5px 8px;
    font-size: 12px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;

  }
  </style>
