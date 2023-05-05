<template>
  <v-card :class="{'bg-on': isOn, 'bg-off': !isOn}" class="toggle-card" style="width: 400px;" @click="toggleCard">
        <v-toolbar  :rounded="true" class="rounded-toolbar" transparent>

          
          <v-btn @click="openVacuumPopUp" text color="transparent">
            <v-toolbar-title class="font-weight-bold text-h4 card-title">Vacuum Cleaner</v-toolbar-title>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="isOn = !isOn" :class="{'primary': isOn}">
            <v-icon>{{ isOn ? 'mdi-power' : 'mdi-power-standby' }}</v-icon>
          </v-btn>
          

        </v-toolbar>

        <!-- locations for-->
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

                  <v-btn :disabled="!isOn" :color="isOn ? (switchValue ? 'primary' : 'offcolor') : 'offcolor'" dark 
                    :block="true" @click.stop="toggleVacuum" class="secondary text-right small-button-vacuum"
                    >Vacuum
                  </v-btn>
                
                </v-col>
                <v-col cols="auto" style="padding-top: 10px">

                  <v-btn :color="isOn ? (switchValue ? 'offcolor' : 'primary') : 'offcolor'" dark 
                    :block="true" @click.stop="toggleMop" class="text-right small-button-mop"
                    :disabled="!isOn"
                    >Mop
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
    }
  },
  methods: {
    toggleCard() {
      /* IR A ASPIRADORA */ 
    },
    returnToBase() {
      // Code to execute when button is clicked
    },
    toggleVacuum() {
      if(this.isOn){// si esta prendida la aspiradora
        this.mopIsOn = !this.mopIsOn;
        if(this.buttonColor !== 'primary'){
          this.buttonColor = this.buttonColor === 'primary' ? 'offcolor' : 'primary';
          this.switchValue = !this.switchValue; // toggle switch value
        }
      }
    },
    toggleMop() {
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

.small-button-vacuum {
  font-size: 12px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;

}


.small-button-mop {
  padding: 5px 8px;
  font-size: 12px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;

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
