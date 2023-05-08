<script setup>
import { onMounted } from '@vue/runtime-core';
import { useAppStore } from '@/store/app';
import { ref } from 'vue';
const store = useAppStore();


const isCreateDialogOpen = ref(false);

const selectedDeviceRoom = ref("");
const selectedDeviceType = ref("");
const selectedDeviceName = ref("");

const openCreateDialog = () => {
  isCreateDialogOpen.value = true;
  setTimeout(() => {
    isCreateDialogOpen.value = false;
  }, 2000);
  clearVar();
};
const rules = {
    minLength: value => value.length >= 3 || 'Min 3 characters',
    maxLength: value => value.length <= 15 || 'Max 15 characters',
    required: value => !!value || 'Required.',
}; 
function clearVar(){
    selectedDeviceName.value = "";
    selectedDeviceType.value = "";
    selectedDeviceRoom.value = "";
}


onMounted(async () => {             // cuando se monta la pagina pido los datos
    try {
    // pido el update de los dato
    await store.getDeviceActionsAPI();
    await store.getAllRoomsAPI();
    await store.getAllDevicesAPI();
    loading.value = false;          // una vez updateados los uso
    } catch (error) {
    console.error(error);
    }
});

const submitAddDevice = () =>{
    if(selectedDeviceName.value  && selectedDeviceRoom.value  && selectedDeviceType.value ){
        store.createADevice(selectedDeviceRoom.value, selectedDeviceName.value, selectedDeviceType.value);
        openCreateDialog();
    }
    else{
    }
}
</script>

<template>
    <v-card width="500" class="mx-auto card-style">
      <v-toolbar color="transparent" dense dark style="height: 120px;">
        <v-col cols="12" >
            <v-row >
                <v-toolbar-title class="font-weight-bold text-h4 title-style mt-16 ml-8">Add Device</v-toolbar-title>
            </v-row>
        </v-col>
      </v-toolbar>

        <v-form @submit.prevent="submitAddDevice">
                <v-select
                    variant="outlined"
                    class="pl-8 pt-8 pr-8"
                    label="Select the Device's Room"
                    :items="store.getRoomNames"
                    v-model="selectedDeviceRoom"

                    base-color="primary"
                    color="verdatim"
                    validate-on="submit"


                    :rules="[rules.required]"
                ></v-select>
                <v-select
                    variant="outlined"
                    class="pl-8 pt-8 pr-8"
                    label="Select the Device Type"
                    :items="store.getSupportedDevicesNames"
                    v-model="selectedDeviceType"
                    :rules="[rules.required]"
                    base-color="primary"
                    color="verdatim"
                    validate-on="submit"
                    ></v-select>
                <v-text-field 
                    clearable="true"
                    :rules="[rules.required,rules.maxLength, rules.minLength]" 
                    variant="outlined" 
                    class="pa-8" 
                    label="Device Name" 
                    base-color="primary"
                    color="verdatim"
                    clear-icon="mdi-close-circle-outline"  
                    v-model="selectedDeviceName"></v-text-field>
                    
                <v-card-actions class="actions-style" style="height: 100px; ">
                  <v-spacer></v-spacer>
                  <v-btn 
                  class="small-button-add mr-12"
                  type="submit" 
                  text 
                  color="white"
                  >ADD</v-btn>
                </v-card-actions>

                <v-dialog v-model="isCreateDialogOpen" width="500" color="gris" >
                    <v-card class="toggle-card-popup">
                        <div class="text-center">
                            <v-icon icon="mdi-check-circle-outline" class="check-icon"></v-icon>
                            <v-card-title prepend-icon="mdi-check-circle-outline" class="font-weight-bold text-h5 card-title">Device Created</v-card-title>
                            <v-card-text>Routine successfully created</v-card-text>
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
    background-color:  #D69923;
  }
  .actions-style {
    background-color:  #F4CF6D;
  }
  .title-style {
    color:#1C4035;
  }
  .card-style {
    border-radius: 30px;
    background-image: url('https://i.imgur.com/TN3egpF.png');
    background-size: cover;
    background-position: 0px -70px
  }
  .v-card__title {
    padding: 0;
  }
  </style>
  