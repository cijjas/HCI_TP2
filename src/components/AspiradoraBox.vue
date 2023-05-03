<template>
  <v-card class="toggle-card" @click="toggleCard">
    <v-toolbar :elevation="8" title="Aspiradora" color="primary" dark rounded>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-row justify-end>

      <v-col cols="6">
        <v-btn :color="buttonColor" dark :block="true" @click.stop="toggleFeature" color="primary" class="text-right">{{ buttonText }}</v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn :color="switchValue ? 'offcolor' : 'primary'" dark :block="true" @click.stop="toggleSwitch" color="primary" class="text-right">{{ switchText }}</v-btn>
      </v-col>

    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      switchValue: false,
      switchLabel: 'Aspirar/Trapear',
      buttonColor: 'primary',
      titleColor: 'secondary',
      buttonText: 'Feature is Off',
      switchText: 'Switch Off'
    }
  },
  methods: {
    toggleCard() {
      /* IR A ASPIRADORA */
    },
    toggleFeature() {
      this.buttonColor = this.buttonColor === 'primary' ? 'offcolor' : 'primary';
      this.buttonText = this.buttonColor === 'primary' ? 'Aspiradora Off' : 'Aspiradora On';
      this.switchValue = !this.switchValue; // toggle switch value
      this.switchText = this.switchValue ? 'Trapear Off' : 'Switch On'; // update switch text
    },
    toggleSwitch() {
      this.switchValue = !this.switchValue; // toggle switch value
      this.switchText = this.switchValue ? 'Trapear On' : 'Trapear Off'; // update switch text
      this.buttonColor = this.switchValue ? 'primary' : 'offcolor'; // update button color
      this.buttonText = this.switchValue ? 'Aspiradora Off' : 'Aspiradora On'; // update button text
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
  max-width: 400px;
}

.toggle-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
}
</style>
