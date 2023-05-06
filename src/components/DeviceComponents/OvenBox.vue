<script setup>
  import { ref, computed, watch } from 'vue';

  const isOn = ref(false);
  const id = ref(0);
  const sliderValue = ref(90);
  const isDialogOpen = ref(false);
  const temperature = ref(0);

  const rules = {
    required: value => !!value || 'This field is required',
    min: value => value >= 90 || 'Temperature must be at least 90 degrees',
  };
  const computedBackgroundColor = computed(() => {
    const color1 = isOn.value ? [238, 204, 102] : [140, 120, 58]; // RGB values for #EECC66 and #8C783A
    const color2 = [236, 94, 63]; // RGB values for #EC5E3F
    const ratio = (sliderValue.value-90) / 100;
    const color = color1.map((c1, i) => Math.round(c1 + ratio * (color2[i] - c1)));
    return `rgb(${color.join(',')})`;
  });

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

  const openOvenDialog = () => {
    isDialogOpen.value = !isDialogOpen.value;
  };
</script>


<template>
  <v-card
    :class="{'bg-on': isOn, 'bg-off': !isOn}"
    :style="{ backgroundColor: computedBackgroundColor}"
    class="toggle-card"
    @click="toggleCard"
  >
    <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
      <v-row align="center">
        <v-col>
          <v-btn @click="openOvenDialog" text color="transparent">
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
    <!-- Aca empieza el popup -->
    <v-dialog v-model="isDialogOpen" width="1024" persistent>
      <v-card class="toggle-card-popup">

        <v-card-title class="headline">Oven Settings</v-card-title>
        <v-card-text>
          <v-text-field
            label="Temperature"
            v-model.number="temperature"
            type="number"
            :rules="[rules.required, rules.min]"
            :disabled="!isOn"
          ></v-text-field>
          
          <v-row no-gutters class="button-row">
            <v-col cols="auto" class="ml-auto " >
              <v-row no-gutters>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(getMode==0 ? 'primary' : 'offcolor')" dark 
                      :block="true" @click.stop="toggleGrillModeOff" class="secondary text-right small-button-left"
                      >Off
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(getMode==1 ? 'primary' : 'offcolor')" dark 
                      :block="true" @click.stop="toggleGrillModeEconomic" class="text-right small-button-center"
                      >Economic
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(getMode==2 ? 'primary' : 'offcolor')" dark 
                      :block="true" @click.stop="toggleGrillModeComplete" class="text-right small-button-right"
                      >Complete
                    </v-btn>
                  </v-col>
              </v-row>
              <v-row no-gutters>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(getMode==3 ? 'primary' : 'offcolor')" dark 
                      :block="true" @click.stop="toggleConvectionModeOff" class="text-right small-button-left"
                      >Off
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(getMode==4 ? 'primary' : 'offcolor')" dark 
                      :block="true" @click.stop="toggleConvectionModeEconomic" class="text-right small-button-center"
                      >Economic
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(getMode==5 ? 'primary' : 'offcolor')" dark 
                      :block="true" @click.stop="toggleConvectionModeConventional" class="text-right small-button-right"
                      >Conventional
                    </v-btn>
                  </v-col>
              </v-row>
              <v-row no-gutters>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(getMode==3 ? 'primary' : 'offcolor')" dark 
                      :block="true" @click.stop="toggleSourceModeConventional" class="text-right small-button-left"
                      >Conventional
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(getMode==4 ? 'primary' : 'offcolor')" dark 
                      :block="true" @click.stop="toggleSourceModeAbove" class="text-right small-button-center"
                      >Above
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" style="padding-top: 10px">
                    <v-btn :color="(getMode==5 ? 'primary' : 'offcolor')" dark 
                      :block="true" @click.stop="toggleSourceModeBelow" class="text-right small-button-right"
                      >Below
                    </v-btn>
                  </v-col>
              </v-row>
            </v-col>
          </v-row>

        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="openOvenDialog">Cancel</v-btn>
          <v-btn color="primary" @click="saveSettings">Save</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

  </v-card>
</template>


<style scoped>
.small-button-left {
  width: 200px;
  height: 40px;
  border-radius: 10px 0px 0px 10px;
  margin-right: 10px;
}
.small-button-center {
  width: 200px;
  height: 40px;
  border-radius: 0px;
  margin-right: 10px;
}
.small-button-right {
  width: 200px;
  height: 40px;
  border-radius: 0px 10px 10px 0px;
  margin-right: 10px;
}

.toggle-card-popup {
  cursor: pointer;
  padding: 16px;
  border-radius: 10px;
  background-color: #EECC66;
  transition: all .2s ease-in-out;

}

.toggle-card-popup::before {
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
