<script setup>
import { onMounted } from '@vue/runtime-core';
import { useAppStore } from '@/store/app';
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue';

const store = useAppStore();
const isCreateDialogOpen= ref(false)

onMounted(async () => {             // cuando se monta la pagina pido los datos
    try {
      await store.getAllRoomsAPI();
    } catch (error) {
      console.error(error);
    }
});

const openCreateDialog = () => {
    isCreateDialogOpen.value = true;
    setTimeout(() => {
      isCreateDialogOpen.value = false;
    }, 2000);
};
  

const {handleSubmit, handleReset} = useForm({
  validationSchema:{
    roomName(value){
      if(value?.length >= 3 && value?.length <= 20) return true
      return 'Name must be between 3 and 20 characters long.'
    }
  },
})

const roomName = useField('roomName');

const submit = handleSubmit(values => {
    store.createARoom(values.roomName);
    openCreateDialog();
    handleReset();
  
})

</script>

<template>
    <v-card width="400" class="mx-auto card-style">
      <v-toolbar color="transparent" dense dark style="height: 120px;">
        <v-col cols="12" >
            <v-row >
                <v-toolbar-title class="font-weight-bold text-h4 title-style mt-16 ml-8">Add Room</v-toolbar-title>
            </v-row>
        </v-col>
      </v-toolbar>

        <v-form @submit.prevent="submit">
                <v-text-field 
                v-model="roomName.value.value"
                :error-messages="roomName.errorMessage.value"
                :counter="20"
                label="Select a Room Name" 
                variant="outlined" 
                clearable="true"
                clear-icon="mdi-close-circle-outline"  
                class="pa-8" 
                color="verdatim"
                base-color="primary"
                ></v-text-field>
                 
                <v-card-actions class="actions-style" style="height: 100px;  "  >
                  <v-btn color="white" @click="handleReset" class="ml-8">Clear</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn 
                  class="small-button-add mr-12"
                  type="submit" 
                  color="white"
                  >ADD</v-btn>
                </v-card-actions>

                <v-dialog v-model="isCreateDialogOpen" width="500" color="gris" >
                    <v-card class="toggle-card-popup">
                        <div class="text-center">
                            <v-icon icon="mdi-check-circle-outline" class="check-icon"></v-icon>
                            <v-card-title prepend-icon="mdi-check-circle-outline" class="font-weight-bold text-h5 card-title">Room Created</v-card-title>
                            <v-card-text>Room successfully created</v-card-text>
                        </div>
                    </v-card>
                </v-dialog>
        </v-form>
                
    </v-card>
  </template>
  
<style scoped>
  .ok-button {
    width: 80px;
    color: #60d75a;
  } 
  .check-icon {
    font-size: 3rem;
    color: #60d75a;
  }
  .card-title{
    color: primary; /* Change the color to your desired value */
    white-space: nowrap;
    overflow: hidden;
    margin-left: -10px;
  }
  .toggle-card-popup {
    padding: 20px;
    border-radius: 15px !important;
    background: whitesmoke;
    backdrop-filter: blur(7px);
}
  .small-button-add {
    width: 100px;
    height: 40px;
    border-radius: 10px;
    background-color: #1C4035 ;
  }
  .actions-style {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #98B891 ;
  }
  .title-style {
    color:#1C4035;
  }
  .card-style {
    border-radius: 30px;
    background-image: url('https://i.imgur.com/TN3egpF.png');
    background-size: cover;
    background-position: 0px -70px;
    height: 654px;
  }
  .v-card__title {
    padding: 0;
  }
</style>
  