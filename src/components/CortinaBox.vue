<template>
    <v-card :class="{'bg-on': isOn, 'bg-off': !isOn}" :style="{ backgroundColor: computedBackgroundColor, width: '400px' }" class="toggle-card" @click="toggleCard">

    <v-toolbar  :rounded="true" class="rounded-toolbar" transparent>

      <v-row align="center">
        <v-col>
          <v-btn @click="openCortinaPopUp" text color="transparent">
            <v-toolbar-title class="font-weight-bold text-h4 card-title">Cortina</v-toolbar-title>
          </v-btn>
        </v-col>
        
        <v-col>
          <v-card-text  class="text--white font-weight-bold text-h4 mb-0 slider-value" >{{ sliderValue }}</v-card-text>
        </v-col>
      </v-row>

      <v-spacer></v-spacer>

      <v-btn @click="isOn = !isOn" :class="{'primary': isOn}">
        {{ isOn ? 'CLOSE' : 'OPEN' }}
      </v-btn>

    </v-toolbar>
    
      <!-- locations for-->
    <v-row no-gutters align="center" style="padding-bottom: 40px">
      <v-col cols="12">
        <v-subheader class="ml-1">Ubicación</v-subheader>
      </v-col>
    </v-row>

    <v-row no-gutters class="button-row">
        <v-slider color="primary"
          v-model="sliderValue"
          :ticks="true"
          :max="100"
          :min="0"
          :step="1"
          thumb-label
        >
        </v-slider>
    </v-row>

  </v-card>
</template>

<script>
export default {
  data() {
    return {
      isOn: false,
      sliderValue: 10,
    }
  },
  computed: {
    sliderPercentage() {
      return Math.round(this.sliderValue);
    },
    computedBackgroundColor() {
      const color1 = [140, 120, 58]; // RGB values for #8C783A
      const color2 = [238, 204, 102]; // RGB values for #EECC66
      const ratio = this.sliderValue / 100;
      const color = color1.map((c1, i) => Math.round(c1 + ratio * (color2[i] - c1)));
      return `rgb(${color.join(',')})`;
    },
  },
  watch: {
    sliderValue(value) {
      if (value <= 0) {
        this.isOn = false;
      } else {
        this.isOn = true;
      }
    },
    isOn(value) {
      if(value){
        this.sliderValue = 100;
      }
      if (!value) {
        this.sliderValue = 0;
      }
    }
  },
  methods: {
    toggleCard() {
      /* IR A ASPIRADORA */
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
  max-width: 500px;
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
