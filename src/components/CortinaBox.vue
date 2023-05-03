<template>
    <v-card class="toggle-card" max-width="400">
    <v-toolbar :elevation="8" title="Cortina" color="primary" dark rounded>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-subheader >Ubicación</v-subheader>
      </v-card-text>

      <v-card-actions>
        <div class="ui buttons big">
            <button
                class="ui button toggle"
                @click="toggle"
                :class="[isVacuumMode ? 'active' : '']"
            >Credit Card</button>
            <button
                class="ui button toggle"
                @click="toggle"
                :class="[!isVacuumMode ? 'active' : '']"
            >Paypal</button>
        </div>
        <!-- <v-switch class="ml-auto" v-model="isVacuumMode">
          <template v-slot:label>
            {{ isVacuumMode ? 'Aspirar' : 'Trapear' }}
          </template>
        </v-switch> -->
        <!-- <v-btn icon @click="togglePower">
          <v-icon>{{ isPowerOn ? 'mdi-power' : 'mdi-power-off' }}</v-icon>
        </v-btn> -->
      </v-card-actions>
    </v-card>
  </template>

  <script>
  export default {
    data() {
      return {
        isVacuumMode: true,
        isPowerOn: false,
      };
    },

    methods: {
      togglePower() {
        this.isPowerOn = !this.isPowerOn;
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
