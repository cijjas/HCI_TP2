<!-- <template>
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
</template> -->

<!-- <script>
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
</script> -->

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
*/

<template>
  <v-card :class="{'bg-on': isOn, 'bg-off': !isOn}" class="toggle-card" @click="toggleCard">
    <v-toolbar  :rounded="true" class="rounded-toolbar" transparent>

      
      <v-toolbar-title class="text--white font-weight-bold text-h4 mb-0">Aspiradora</v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <v-btn icon @click="isOn = !isOn" :class="{'primary': isOn}">
        <v-icon>{{ isOn ? 'mdi-power' : 'mdi-power-standby' }}</v-icon>
      </v-btn>

    </v-toolbar>

    <v-col cols="12">
        <v-subheader>Ubicación</v-subheader>
    </v-col>
      
    <v-row no-gutters class="button-row">
  <v-col cols="auto">
    <v-btn icon class="back-button" @click="goBack">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
  </v-col>
  <v-col cols="auto" class="ml-auto">
    <v-row no-gutters>
      <v-col cols="auto">
        <v-btn :color="isOn ? (switchValue ? 'primary' : 'offcolor') : 'offcolor'" dark :block="true" @click.stop="toggleAspiradora" class="text-right small-button">{{ aspiradoraText }}</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn :color="isOn ? (switchValue ? 'offcolor' : 'primary') : 'offcolor'" dark :block="true" @click.stop="toggleTrapeadora" class="text-right small-button small-right-button">{{ trapeadoraText }}</v-btn>
      </v-col>
    </v-row>
  </v-col>
</v-row>


  </v-card>
</template>

<script>
export default {
  data() {
    return {
      isOn: false,
      switchValue: true,
      buttonColor: 'primary',
      titleColor: 'secondary',
      aspiradoraText: 'Grifo',
      trapeadoraText: 'Trapear',
    }
  },
  methods: {
    toggleCard() {
      /* IR A ASPIRADORA */ 
    },
    toggleAspiradora() {
      if(this.isOn){// si esta prendida la aspiradora
        this.trapearIsOn = !this.trapearIsOn;
        if(this.buttonColor !== 'primary'){
          this.buttonColor = this.buttonColor === 'primary' ? 'offcolor' : 'primary';
          this.switchValue = !this.switchValue; // toggle switch value
        }
      }
    },
    toggleTrapeadora() {
      if (this.isOn) {// si esta prendida la aspiradora
        if(this.buttonColor !== 'offcolor'){ 
          this.switchValue = !this.switchValue; // toggle switch value
          this.buttonColor = this.switchValue ? 'primary' : 'offcolor'; // update button color
        }
      }
    }
  }
}
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
  max-width: 450px;
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

.small-button {
  padding: 5px 8px;
  font-size: 12px;
  border-radius: 4px;
}
.v-subheader {
  margin-top: -34px;
}
</style>

