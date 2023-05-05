<template>
    <v-card :class="{'bg-on': toggleValue, 'bg-off': !toggleValue}" class="toggle-card" >
    
      <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
        <v-toolbar-title class="text--white font-weight-bold text-h4 mb-0">
            {{ roomName }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row align="center">
          <v-col>
            <v-subheader class="ml-1">Devices in Room: </v-subheader>
            <span class="font-weight-bold text-body mb-0">{{ devicesCount }}</span>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <!-- <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer> -->
          <v-btn color="primary" class="mr-10 pl-10 pr-10" @click="showPopup = true">Edit Room</v-btn>
          
          <v-btn color="primary" class="pl-10 pr-10">Add Device</v-btn>
          <span class="font-weight-bold text-body mb-0">{{ selectedItem }}</span>
        </v-row>
      </v-card-text>
      <EditRoomPopup :roomName="roomName" v-model="showPopup" @save="handleSave" @close="showPopup = false" />
    </v-card>
  </template>
  
  <script setup>
  import { ref, defineProps } from 'vue';
  import EditRoomPopup from './EditRoomPopup.vue';
  
  const props = defineProps(['roomName', 'devicesCount']);
  
  const toggleValue = ref(true);
  const selectedItem = ref(null);
  const showPopup = ref(false);
  
  const handleSave = (values) => {
      // Handle save logic here
  };
  </script>
  
  <style scoped>
.toggle-card {
  cursor: pointer;
  padding: 16px;
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
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

.bg-off {
  background-color: #8C783A;
}

/* Pop-up Menu styles */
.popup {
  position: absolute;
  z-index: 10;
  padding: 16px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
}

.popup__overlay {
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
}

.popup__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rounded-toolbar .text--white {
  color: #1C4035;
}

</style>
