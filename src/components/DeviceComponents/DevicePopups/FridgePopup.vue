<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FridgePopup",
  props: {
    initialValueFreezer: {
      type: Number,
      required: true,
    },
    initialValueHeladera: {
      type: Number,
      required: true,
    },
    initialSelectedMode: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      sliderFreezer: -20,
      sliderFridge: 2,
      selectedMode: 0,
      modes: [0, 1, 2],
      deviceName: "Fridge",
    };
  },
  created() {
    this.sliderFreezer = this.initialValueFreezer;
    this.sliderFridge = this.initialValueHeladera;
    this.selectedMode = this.initialSelectedMode;
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    save() {
      if(this.deviceName == "" || this.deviceName == null) {
        this.deviceName = "Fridge";
      }
      if(this.selectedMode == "" || this.selectedMode == null) {
        this.selectedMode = 0;
      }
      if(this.sliderFreezer == "" || this.sliderFreezer == null) {
        this.sliderFreezer = -20;
      }
      if(this.sliderFridge == "" || this.sliderFridge == null) {
        this.sliderFridge = 2;
      }
      this.$emit("save", {
        deviceName: this.deviceName,
        valueFreezer: this.sliderFreezer,
        valueFridge: this.sliderFridge,
        selectedMode: this.selectedMode,
      });
      this.dialog = false;
    },
  },
});
</script>


<template>
  <v-dialog v-model="dialog" max-width="700" >
    <v-card rounde>

      <v-toolbar color="primary" dark>
        
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-text-field class="text--white font-weight-bold text-h1 mb-0" v-model="deviceName" type="string" variant="solo" bg-color="transparent" flat style="height: 50px;" />

        
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="save">Save</v-btn>
      </v-toolbar>

      <v-card-text>
        <v-row align="center">
          <v-col>
            <v-slider v-model="sliderFreezer" label="Freezer Temperature  (°C)" thumb-label :max="-8" :min="-20" />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <v-slider v-model="sliderFridge" label="Fridge Temperature  (°C)" thumb-label :max="8" :min="2" />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <v-select v-model="selectedMode" :items="modes" label="Modo" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
