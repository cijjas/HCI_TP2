<template>
  <v-card class="toggle-card">
    <v-row align="center">
      <v-col>
        <v-card-title class="d-flex align-center">
          <span class="mr-2">Grifo</span>
          <v-switch v-model="toggleValue" aria-label="Toggle" color="primary" />
        </v-card-title>
      </v-col>
    </v-row>
    <v-card-text>
      <v-row align="center">
        <v-col>
          <v-text-field v-model="numericValue" type="number" label="Cantidad" />
        </v-col>
        <v-col>
          <v-select v-model="selectedItem" :items="dropdownItems" label="Unidad" />
        </v-col>
        <v-col>
          <v-btn color="primary" @click="handleButtonClick">Dispensar</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'GrifoBox',
  data() {
    return {
      toggleValue: false,
      numericValue: 0,
      selectedItem: null,
      dropdownItems: ['ml', 'cl', 'dl','l'],
    };
  },
  methods: {
    handleButtonClick() {
      // handle button click event here
    },
  },
};
</script>

<style scoped>
.toggle-card {
  cursor: pointer;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #EECC66;
  transition: all .2s ease-in-out;
  max-height: 200px;
  max-width: 400px;
}

.toggle-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
}
</style>
