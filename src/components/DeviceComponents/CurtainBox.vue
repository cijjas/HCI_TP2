<script setup>
  import { ref, computed, watch, defineProps } from 'vue';
  import { useAppStore } from '@/store/app';
  const store = useAppStore();

const props = defineProps({
  componentName: {
    type: String,
    required: true
  },
  componentId: {
    type: String,
    required: true
  },
  componentRoom: {
    type: String,
    required: true
  }
})
  // const props = defineProps(['roomName', 'devicesCount']);
  const componentId = ref(props.componentId);
  const componentRoom = ref(props.componentRoom);

  const isOn = ref(false);
  const sliderValue = ref(10);
  const isDialogOpen = ref(false);
  const isDeleteDialogOpen = ref(false);
  const deviceName = ref(props.componentName);

  const tempDeviceName = ref(deviceName.value);
  const rules = {
    minLength: value => value.length >= 1 || 'Min 1 characters',
    maxLength: value => value.length <= 15 || 'Max 15 characters',
  };


  const computedBackgroundColor = computed(() => {
    const color1 = [140, 120, 58]; // RGB values for #8C783A
    const color2 = [244, 207, 109]; // RGB values for #EECC66
    const ratio = sliderValue.value / 100;
    const color = color1.map((c1, i) => Math.round(c1 + ratio * (color2[i] - c1)));
    return `rgb(${color.join(',')})`;
  });

  watch(
    () => sliderValue.value,
    (newValue) => {
      if (newValue <= 0) {
        isOn.value = false;
      } else {
        isOn.value = true;
      }
    }
  );

  watch(
    () => isOn.value,
    (newValue) => {
      if (newValue) {
        sliderValue.value = 100;
      } else {
        sliderValue.value = 0;
      }
    }
  );

  const toggleCard = () => {
    /* IR A ASPIRADORA */
  };

  const openCurtainPopUp = () => {
    isDialogOpen.value = true;
  };
  const cancelSettings = () => {
    isDialogOpen.value = false;
    tempDeviceName.value = deviceName.value;
  };
  const saveSettings = () => {
    if(tempDeviceName.value.length < 1 || tempDeviceName.value.length > 15) {
        return;
    }
    deviceName.value = tempDeviceName.value;
    isDialogOpen.value = false;
  };
  const deleteDevice = () => {
    store.deleteADeviceByName(deviceName.value);
    openDeleteDialog();
    cancelSettings();
    router.push('/');
};

const openDeleteDialog = () => {
        isDeleteDialogOpen.value = !isDeleteDialogOpen.value;
};
</script>

<template>
  <v-card
    :class="{'toggle-card-on': isOn, 'toggle-card-off': !isOn}"
    :style="{ backgroundColor: computedBackgroundColor , backgroundPositionX: isOn ? '40%' : '100%'}"
    class="toggle-card"
    @click="toggleCard"
  >
    <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
      <v-row>
        <v-col>
          <v-btn @click="openCurtainPopUp" text color="transparent">
            <v-toolbar-title class="font-weight-bold text-h4 card-title"
              >{{ deviceName }}</v-toolbar-title
            >
            <v-tooltip
                activator="parent"
                location="right"
              >Edit</v-tooltip>
          </v-btn>
        </v-col>

       
      </v-row>

      <v-spacer></v-spacer>

      <v-btn @click="isOn = !isOn" 
            :class="{'on-button': isOn, 'off-button': !isOn}">
            {{ isOn ? 'CLOSE' : 'OPEN' }}
      </v-btn>
    </v-toolbar>

    <!-- locations for-->
    <v-row style="margin-bottom: 20px">
      <v-col cols="8">
        <v-subheader class="ml-1">{{componentRoom}}</v-subheader>
      </v-col>
      
    </v-row>
    <v-row >
        <v-spacer>  </v-spacer>
        <v-card-text class="font-weight-bold text-h2 slider-value">
          {{ sliderValue }}
        </v-card-text>
     
    </v-row>

    <v-row no-gutters class="mr-5 ml-5" style="margin-top: 40px">
      <v-slider
        color="primary"
        v-model="sliderValue"
        :ticks="true"
        :max="100"
        :min="0"
        :step="1"
      ></v-slider>
    </v-row>


    <v-dialog v-model="isDialogOpen" width="700"  @click:outside="cancelSettings">
      <v-card class="toggle-card-popup">

        <v-card-title class="font-weight-bold text-h5 card-title">Blinds Settings</v-card-title>
        
              <v-text-field
                variant="outlined"
                clearable
                :clear-icon="!tempDeviceName ? '' : 'mdi-close-circle-outline'"
                style="padding-top: 50px;"  
                label="Device Name"
                v-model.string="tempDeviceName"
                type="string"
                :rules="[rules.maxLength, rules.minLength]"
          ></v-text-field>

        <v-card-actions>
          <v-btn class="delete-button" color="white" @click="openDeleteDialog()"> Delete device </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="cancelSettings">Cancel</v-btn>
          <v-btn class="small-button-save" color="white" @click="saveSettings">Save</v-btn>
        </v-card-actions>

        <v-dialog v-model="isDeleteDialogOpen" width="1024" >
            <v-card class="toggle-card-popup">
                <v-card-title class="headline">Are you sure you want to delete {{ deviceName }}?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="routinedarkred" variant="plain" @click="deleteDevice();">Delete</v-btn>
                    <v-btn color="primary" @click="openDeleteDialog">Cancel</v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>

      </v-card>
    </v-dialog>

  </v-card>
</template>



<style scoped>
.toggle-card-on {
  cursor: pointer;
  padding: 16px;
  border-radius: 20px;
  background-color: #F4CF6D;
  background-image: url("./DeviceAssets/del-cur-frame.png");

  background-size: cover;
  transition: all .5s ease-in-out;
  height: 300px;
  width: 400px;
}


.toggle-card-off{
  position: relative;
  padding: 16px;
  border-radius: 20px;
  
  background-image: url('./DeviceAssets/del-cur-frame.png');
  background-size: cover;
  background-position: top;
  height: 300px;
  width: 400px;
}
.toggle-card-off::before {
  content: "";
  position: absolute;
  background-image: url('./DeviceAssets/del-cur-frame.png');
  background-size: cover;
  background-position: top;
  transition: background-position 0.5s ease-in-out;
}



.toggle-card::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 10px;
    bottom: 300;
    width: 100%;
    height: 100%;
    background-size: 80%;
    background-position: calc(100% - 0px) top;
    background-repeat: no-repeat;
    opacity: 0.05;
}
.delete-button {
  width: 200px;
  height: 40px;
  border-radius: 10px;
  background-color: #d82602;
  box-shadow: 0 2px 4px rgba(24, 15, 15, 0.589);
}
.card-title{
  color: #1C4035; /* Change the color to your desired value */
  white-space: nowrap;
  overflow: hidden;
  margin-left: -10px;
}
.toggle-card-popup {
  padding: 30px;
  border-radius: 15px !important;
  background-color: #f4e8c6ae;
  backdrop-filter: blur(8px);
}
.toggle-card-popup::before {
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-image: url('./DeviceAssets/del-cur-frame.png');
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 1;
}
.small-button-save {
  width: 240px;
  height: 40px;
  border-radius: 10px;
  background-color: #1C4035;
}

.toggle-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
}

.rounded-toolbar {
  border-radius: 20px;
  background-color: transparent;
}



.slider-value {
  color: #1C4035; /* Change the color to your desired value */
}
.card-title{
  color: #1C4035; /* Change the color to your desired value */
}
.card-title{
  color: #1C4035; /* Change the color to your desired value */
  white-space: nowrap;
  overflow: hidden;
  margin-left: -10px;

}


.on-button:active {
  color: #631414;
}
.off-button:active {
  color: #1f8a3c;
}
.on-button{
  color: #1f8a3c;

}
.on-button:hover{
  color: #631414;
}

</style>
