<script setup>
import { ref, computed, watch } from 'vue';

const isOn = ref(false);
const sliderValue = ref(90);


const computedBackgroundColor = computed(() => {
  const color1 = isOn.value ? [238, 204, 102] : [140, 120, 58]; // RGB values for #EECC66 and #8C783A
  const color2 = [236, 94, 63]; // RGB values for #EC5E3F
  const ratio = (sliderValue.value-90) / 100;
  const color = color1.map((c1, i) => Math.round(c1 + ratio * (color2[i] - c1)));
  return `rgb(${color.join(',')})`;
});

watch(
  () => sliderValue.value,
  (newValue) => {
    if (newValue <= 90) {
      isOn.value = false;
    } else {
      isOn.value = true;
    }
  }
);

const toggleOnOff = () => {
  isOn.value = !isOn.value;
};

watch(
  () => isOn.value,
  (newValue) => {
    if (newValue) {
      sliderValue.value = 90;
    } else {
      sliderValue.value = 90;
    }
  }
);

const toggleCard = () => {
  /* IR A ASPIRADORA */
};

const openOvenPopup = () => {
  /* Abrir ventana emergente de cortina */
};
</script>


<template>
  <v-card
    :class="{'bg-on': isOn, 'bg-off': !isOn}"
    :style="{ backgroundColor: computedBackgroundColor}"
    class="toggle-card"
    @click="toggleCard">


    <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
      <v-row align="center">
        <v-col>
          <v-btn @click="openOvenPopup" text color="transparent">
            <v-toolbar-title class="font-weight-bold text-h4 card-title"
              >Oven</v-toolbar-title
            >
          </v-btn>
        </v-col>

        <v-col>
          <v-card-text class="text--white font-weight-bold text-h4 mb-0 slider-value">
            {{ sliderValue }}
          </v-card-text>
        </v-col>
      </v-row>

      <v-spacer></v-spacer>
      <v-btn icon @click="isOn = !isOn" :class="{'primary': isOn}">
            <v-icon>{{ isOn ? 'mdi-power' : 'mdi-power-standby' }}</v-icon>
          </v-btn>
      
    </v-toolbar>

    <!-- locations for-->
    <v-row no-gutters align="center" style="padding-bottom: 40px">
      <v-col cols="12">
        <v-subheader class="ml-1">Ubicación</v-subheader>
      </v-col>
    </v-row>

    <v-row no-gutters class="button-row">
      <v-slider
        color="primary"
        v-model="sliderValue"
        :ticks="true"
        :max="230"
        :min="90"
        :step="1"
        :disabled="!isOn"
        thumb-label
      ></v-slider>
    </v-row>
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
  background-image: url("./DeviceAssets/del-fire.png");
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
.v-btn:hover .card-title {
  color: #19642d;
}
</style>
