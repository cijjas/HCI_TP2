<template>
  <v-card :class="{'bg-on': isOn, 'bg-off': !isOn}" class="toggle-card" @click="toggleCard">
    <v-toolbar  :rounded="true" class="rounded-toolbar" transparent>

      
      <v-toolbar-title class="text--white font-weight-bold text-h4 mb-0 card-title">Aspiradora</v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <v-btn icon @click="isOn = !isOn" 
          :class="{'primary': isOn}"
          >
        <v-icon>{{ isOn ? 'mdi-power' : 'mdi-power-standby' }}</v-icon>
      </v-btn>

    </v-toolbar>
    <v-row no-gutters align="center" style="padding-bottom: 30px">
      <v-col cols="12">
        <v-subheader class="ml-4">Ubicación</v-subheader>
      </v-col>
    </v-row>
        
    <v-row no-gutters class="button-row">
  <v-col cols="auto">
    <v-card-actions>
      <v-btn color="primary" block @click="returnToBase">Return to Base</v-btn>
    </v-card-actions>
  </v-col>
  <v-col cols="auto" class="ml-auto">
    <v-row no-gutters>
      <v-col cols="auto" style="padding-top: 10px">

        <v-btn :color="isOn ? (switchValue ? 'primary' : 'offcolor') : 'offcolor'" dark 
          :block="true" @click.stop="toggleAspiradora" class="text-right small-button"
          :disabled="!isOn"
          >{{ aspiradoraText }}
        </v-btn>
      
      </v-col>
      <v-col cols="auto" style="padding-top: 10px">

        <v-btn :color="isOn ? (switchValue ? 'offcolor' : 'primary') : 'offcolor'" dark 
          :block="true" @click.stop="toggleTrapeadora" class="text-right small-button small-right-button"
          :disabled="!isOn"
          >{{ trapeadoraText }}
        </v-btn>

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
      aspiradoraText: 'Vacuum',
      trapeadoraText: 'Mop',
    }
  },
  methods: {
    toggleCard() {
      /* IR A ASPIRADORA */ 
    },
    returnToBase() {
      // Code to execute when button is clicked
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


.card-title{
  color: #1C4035; /* Change the color to your desired value */
  white-space: nowrap;
  overflow: hidden;
  animation: marquee 5s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
