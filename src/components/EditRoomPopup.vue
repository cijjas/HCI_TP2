<template>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-btn icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Edit {{ nameRoom }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-row align="center">
            <v-col>
              <v-text-field label="New Room Name" v-model="tempRoomName" :placeholder="nameRoom"></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col class="pl-3" align="start">
              <v-btn variant="outlined" color="primary" @click="showPopup = true">Delete room</v-btn>
            </v-col>
            <v-col class="pl-3" align="end">
              <v-btn color="secondary" @click="save">Save changes</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <ConfirmationPopup :confirmation="`delete ${roomName}?`" v-model="showPopup" @save="handleSave" @close="handlePopupClose" />
      </v-card>
    </v-dialog>
  </template>
  
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  import ConfirmationPopup from './ConfirmationPopup.vue';
  
  const props = defineProps({
    roomName: {
      type: String,
      required: true,
    },
  });
  
  const emits = defineEmits(['save', 'close']);
  
  const nameRoom = ref(props.roomName);
  const tempRoomName = ref('');
  const showPopup = ref(false); // Initialize the showPopup variable
  
  const save = () => {
    if (tempRoomName.value !== '') {
        nameRoom.value = tempRoomName.value; // Update the roomName variable with the new value
    }
    emits.save(); // Emit the 'save' event
  };
  
  const close = () => {
    tempRoomName.value = ''; // Clear the tempRoomName input
    emits.close(); // Emit the 'close' event
  };
  
  const handleSave = () => {
    // Handle the save event
  };
  
  const handlePopupClose = () => {
    showPopup.value = false; // Close the popup
  };
  
  </script>
  
  
  