<script setup>
  import { ref, computed, watch } from 'vue';

  const isOn = ref(false);
  const sliderValue = ref(10);
  const isDialogOpen = ref(false);
  const deviceName = ref('Blinds');

  const tempDeviceName = ref(deviceName.value);
  const rules = {
    minLength: value => value.length >= 1 || 'Min 1 characters',
    maxLength: value => value.length <= 15 || 'Max 15 characters',
  };


  const computedBackgroundColor = computed(() => {
    const color1 = [140, 120, 58]; // RGB values for #8C783A
    const color2 = [238, 204, 102]; // RGB values for #EECC66
    const ratio = sliderValue.value / 100;
    const color = color1.map((c1, i) => Math.round(c1 + ratio * (color2[i] - c1)));
    return `rgb(${color.join(',')})`;
  });

  watch(
    () => sliderValue.value,
    (newValue) => {
      if (newValue <= 0) {
        isOn.value = false;
      } else {
        isOn.value = true;
      }
    }
  );

  watch(
    () => isOn.value,
    (newValue) => {
      if (newValue) {
        sliderValue.value = 100;
      } else {
        sliderValue.value = 0;
      }
    }
  );

  const toggleCard = () => {
    /* IR A ASPIRADORA */
  };

  const openCurtainPopUp = () => {
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
</script>

<template>
  <v-card
    :class="{'bg-on': isOn, 'bg-off': !isOn}"
    :style="{ backgroundColor: computedBackgroundColor }"
    class="toggle-card"
    @click="toggleCard"
  >
    <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
      <v-row>
        <v-col>
          <v-btn @click="openCurtainPopUp" text color="transparent">
            <v-toolbar-title class="font-weight-bold text-h4 card-title"
              >{{ deviceName }}</v-toolbar-title
            >
            <v-tooltip
                activator="parent"
                location="right"
              >Edit</v-tooltip>
          </v-btn>
        </v-col>

       
      </v-row>

      <v-spacer></v-spacer>

      <v-btn @click="isOn = !isOn" 
            :class="{'on-button': isOn, 'off-button': !isOn}">
            {{ isOn ? 'CLOSE' : 'OPEN' }}
      </v-btn>
    </v-toolbar>

    <!-- locations for-->
    <v-row style="margin-bottom: 20px">
      <v-col cols="8">
        <v-subheader class="ml-1">Ubicación</v-subheader>
      </v-col>
      <v-col cols="4">
        <v-card-text class="text--white font-weight-bold text-h4 mb-0 slider-value">
          {{ sliderValue }}
        </v-card-text>
      </v-col>
    </v-row>

    <v-row no-gutters class="button-row" style="margin-top: -20px">
      <v-slider
        color="primary"
        v-model="sliderValue"
        :ticks="true"
        :max="100"
        :min="0"
        :step="1"
      ></v-slider>
    </v-row>


    <v-dialog v-model="isDialogOpen" width="1024" persistent>
      <v-card class="toggle-card-popup">

        <v-card-title class="font-weight-bold text-h5 card-title">Faucet Settings</v-card-title>
        
              <v-text-field
                style="padding-top: 50px;"  
                label="Device Name"
                v-model.string="tempDeviceName"
                type="string"
                :rules="[rules.maxLength, rules.minLength]"
          ></v-text-field>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="cancelSettings">Cancel</v-btn>
          <v-btn class="small-button-save" color="secondary" @click="saveSettings">Save</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

  </v-card>

</template>



<style scoped>

.card-title{
  color: #1C4035; /* Change the color to your desired value */
  white-space: nowrap;
  overflow: hidden;
  margin-left: -10px;
}
.toggle-card-popup {
  padding: 30px;
  border-radius: 30px;
  background: radial-gradient(at 80% 50%, rgba(129, 213, 98, 0.767), rgba(238, 204, 102, 0.9));
  backdrop-filter: blur(7px);
}
.toggle-card-popup::before {
  content: "";
  position: absolute;
  top: 0px;
  left: -400px;
  width: 100%;
  height: 100%;
  background-image: url("./DeviceAssets/del-tap.png");
  background-size: 70%;
  background-position: calc(100% - 0px) top;
  background-repeat: no-repeat;
  opacity: 0.05;
}
.small-button-save {
  width: 240px;
  height: 40px;
  border-radius: 10px;
  background-color: #1C4035;
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
    top: -10px;
    left: 10px;
    bottom: 300;
    width: 100%;
    height: 100%;
    background-image: url("./DeviceAssets/del-curtain.png");
    background-size: 80%;
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

/* background color when turned off */
.bg-off {
  background-color: #8C783A;
}


.slider-value {
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
