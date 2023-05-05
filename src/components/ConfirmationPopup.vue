<template>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-btn icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Confirmation</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-row align="center">
            <v-col>
              <v-card-text prepend-icon="mdi-message-alert-outline">Are you sure you want to {{ message }}</v-card-text>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col class="pl-3" align="center">
              <v-btn color="gris" class="pl-10 pr-10 mr-5">Yes</v-btn>  
            <!-- </v-col>
            <v-col class="pl-3" align="end"> -->
                
              <v-btn color="primary" class="pl-10 pr-10" @click="save">Cancel</v-btn>  
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    confirmation: {
      type: String,
      required: true,
    },
  });
  
  const emits = defineEmits(['save', 'close']);
  
  const message = ref(props.confirmation);
  
  const save = () => {
    emits.save(); // Emit the 'save' event
  };
  
  const close = () => {
    emits.close(); // Emit the 'close' event
  };
  </script>
  

