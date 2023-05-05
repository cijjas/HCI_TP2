<template>
  <v-dialog v-model="dialog" max-width="500" @click:outside="close">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Edit Values</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="save">Save</v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row align="center">
          <v-col>
            <v-slider v-model="sliderFreezer" label="Temperatura Freezer (°C)" thumb-label :max="-8" :min="-20" />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <v-slider v-model="sliderFridge" label="Temperatura Fridge (°C)" thumb-label :max="8" :min="2" />
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

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EditValuesPopup',
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
      this.$emit('save', {
        valueFreezer: this.sliderFreezer,
        valueFridge: this.sliderFridge,
        selectedMode: this.selectedMode,
      });
      this.dialog = false;
    },
  },
});
</script>
