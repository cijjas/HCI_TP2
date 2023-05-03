<template>
  <v-card :class="{'bg-on': isOn, 'bg-off': !isOn}" class="toggle-card" @click="toggleCard">
    <v-toolbar  :rounded="true" class="rounded-toolbar" transparent>

      <v-row align="center">
        <v-col>
          <v-toolbar-title class="text--white font-weight-bold text-h4 mb-0">Cortina</v-toolbar-title>
        </v-col>
        <v-col>
          <v-card-text class="text--white font-weight-bold text-h4 mb-0" >{{ sliderValue }}</v-card-text>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>

      <v-btn @click="isOn = !isOn" :class="{'primary': isOn}">
        {{ isOn ? 'CLOSE' : 'OPEN' }}
      </v-btn>

    </v-toolbar>

    <v-col cols="12">
      <v-subheader>Ubicación</v-subheader>
    </v-col>

    <v-row no-gutters class="button-row">
      <v-col>
        <v-slider :color="isOn ? 'primary' : 'offcolor'"
          v-model="sliderValue"
          :ticks="true"
          :max="100"
          :min="0"
          :step="1"
          :disabled="!isOn"
          thumb-label
        >
          <template v-slot:thumb-label>
            <span class="slider-value">{{ sliderValue }}</span>
          </template>
        </v-slider>
        <v-card-text class="text-center">{{ sliderPercentage }}%</v-card-text>
      </v-col>
      <v-card-text class="text-center">{{ sliderValue }}%</v-card-text>
    </v-row>

  </v-card>
</template>

<script>
export default {
  data() {
    return {
      isOn: false,
      sliderValue: 50,
    }
  },
  computed: {
    sliderPercentage() {
      return Math.round(this.sliderValue);
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

</style>
