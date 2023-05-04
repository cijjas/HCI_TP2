<template>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-btn icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Edit {{ nameRoom }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-btn color="secondary" @click="save">Save</v-btn> -->
        </v-toolbar>
        <v-card-text>
          <v-row align="center">
            <v-col>
              <v-text-field label="New Room Name" v-model="tempRoomName" :placeholder="nameRoom"></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col class="pl-3" align="start">
              <v-btn variant="outlined" color="primary">Delete room</v-btn>  
            </v-col>
            <v-col class="pl-3" align="end">
              <v-btn color="secondary" @click="save">Save changes</v-btn>  
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    roomName: {
      type: String,
      required: true,
    },
  });
  
  const emits = defineEmits(['save', 'close']);
  
  const nameRoom = ref(props.roomName);
  const tempRoomName = ref('');
  
  const save = () => {
    nameRoom.value = tempRoomName.value; // Update the roomName variable with the new value
    emits.save(); // Emit the 'save' event
  };
  
  const close = () => {
    tempRoomName.value = ''; // Clear the tempRoomName input
    emits.close(); // Emit the 'close' event
  };
  </script>
  