<template>
  <v-card :class="{'bg-on': isOn, 'bg-off': !isOn}" class="toggle-card" style="width: 400px;" >
    <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
      <v-btn @click="openOvenPopUp" text color="transparent">
        <v-toolbar-title class="font-weight-bold text-h4 card-title">Oven</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="isOn = !isOn" :class="{'primary': isOn}" >
        <v-icon>{{ isOn ? 'mdi-power' : 'mdi-power-standby' }}</v-icon>
      </v-btn>
    </v-toolbar>

    <v-row no-gutters align="center" style="padding-bottom: 30px">
      <v-col cols="12">
        <v-subheader class="ml-4">Ubicación</v-subheader>
      </v-col>
    </v-row>

  </v-card>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'OvenBox',
    
  setup() {
    const isOn = ref(false);

    const togglePower = () => {
      isOn.value = !isOn.value;
    }

    

    const returnToBase = () => {
      // handle return to base action
    }

    const openVacuumPopUp = () => {
      // handle opening vacuum popup
    }

    return {
      isOn,
      togglePower,
      returnToBase,
      openVacuumPopUp,
    };
  },
};
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

.card-title {
  transition: color 0.3s;
}
</style>
