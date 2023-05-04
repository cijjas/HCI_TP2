// EditValuesPopup

<template>
    <v-dialog v-model="dialog" max-width="500">
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
              <v-slider v-model="slider1Value" label="Temperatura Freezer (°C)" :max="-8" :min="-20" />
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col>
              <v-slider v-model="slider2Value" label="Temperatura Heladera (°C)" :max="8" :min="2" />
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col>
              <v-select v-model="selectedItem" :items="dropdownItems" label="Modo" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: 'EditValuesPopup',
    props: {
      initialValue1: {
        type: Number,
        required: true,
      },
      initialValue2: {
        type: Number,
        required: true,
      },
      initialSelectedItem: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        dialog: false,
        slider1Value: -20,
        slider2Value: 2,
        selectedItem: null,
        dropdownItems: ['Normal', 'Fiesta', 'Vacaciones'],
      };
    },
    created() {
      this.slider1Value = this.initialValue1;
      this.slider2Value = this.initialValue2;
      this.selectedItem = this.initialSelectedItem;
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
          value1: this.slider1Value,
          value2: this.slider2Value,
          selectedItem: this.selectedItem,
        });
        this.dialog = false;
      },
    },
  };
  </script>
  