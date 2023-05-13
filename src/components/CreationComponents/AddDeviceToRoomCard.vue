<script setup>
  import { onMounted } from '@vue/runtime-core';
  import { useAppStore } from '@/store/app';
  import { useField, useForm } from 'vee-validate';
  import { ref, defineProps } from 'vue';
import { computed } from 'vue';

  const store = useAppStore();

  const props = defineProps({
    deviceRoom: {
      type: String,
      required: true
    },
  })
    // const props = defineProps(['roomName', 'devicesCount']);
  const localDeviceRoom = computed(()=> {return props.deviceRoom});

  const isCreateDialogOpen = ref(false);

  onMounted(async () => {             // cuando se monta la pagina pido los datos
      try {
      // pido el update de los dato
        await store.getDeviceActionsAPI();
        await store.getAllDevicesAPI();
      } catch (error) {
        console.error(error);
      }
  });


  const openCreateDialog = () => {
    isCreateDialogOpen.value = true;
    setTimeout(() => {
      isCreateDialogOpen.value = false;
    }, 1250);
  };



  const {handleSubmit, handleReset} = useForm(
    {
      validationSchema: {
        type(value){
          if(value) return true
          return 'Select a device type.'
        },
        name(value){
          const repeated = store.getADeviceByName(value) ? true : false;
          if(repeated) {
            return 'Device name already in use.'
          }
          const tooLong = value?.length > 15 ? true : false;
          const tooShort = value?.length < 3 ? true : false;
          if(tooLong || tooShort) { 
            return 'Name must be between 3 and 15 characters long.'
          }
          const isAlphanumeric = /^[a-zA-Z0-9\s]+$/.test(value);
          if(!isAlphanumeric) return 'Only alphanumeric characters' 
          return true
        } 
      },
    }    
  )
  const name= useField('name');
  const type= useField('type');

  const submit = handleSubmit(values => {
          store.createADevice(localDeviceRoom.value, values.name, values.type);
          handleReset();
          openCreateDialog();
  })
</script>

<template>
    <v-card width="400" class="mx-auto card-style">
      <v-toolbar color="transparent" dense dark style="height: 120px;">
        <v-col cols="12" >
            <v-row >
                <v-toolbar-title class="font-weight-bold text-h4 title-style mt-16 ml-8">Add Device</v-toolbar-title>
            </v-row>
        </v-col>
      </v-toolbar>

        <v-form @submit.prevent="submit">
                <v-select
                    v-model="type.value.value"
                    :error-messages="type.errorMessage.value"
                    :items="store.getSupportedDevicesNames"
                    label="Device Type"
                    variant="outlined"
                    class="pl-8 pt-8 pr-8"
                    base-color="primary"
                    color="verdatim"
                    ></v-select>
                <v-text-field 
                    v-model="name.value.value"
                    :error-messages="name.errorMessage.value"
                    :counter="15"
                    label="Device Name" 
                    variant="outlined" 
                    class="pa-8" 
                    base-color="primary"
                    color="verdatim"
                    clearable="true"
                    clear-icon="mdi-close-circle-outline"  

                    ></v-text-field>
                    
                <v-card-actions class="actions-style" style="height: 100px; ">
                  <v-btn @click="handleReset" class="ml-8">Clear</v-btn>
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
                            <v-card-title prepend-icon="mdi-check-circle-outline" class="font-weight-bold text-h5 card-title">Device Created</v-card-title>
                            <v-card-text>Device successfully created</v-card-text>
                        </div>
                    </v-card>
                </v-dialog>
          </v-form>
                
    </v-card>
  </template>

<style scoped>
  
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
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color:  #F4CF6D;
  }
  .title-style {
    color:#1C4035;
  }
  .card-style {
    border-radius: 30px;
    background-image: url('https://i.imgur.com/TN3egpF.png');
    background-size: cover;
    background-position: 0px -70px;
    height: 646px;
    transition:  transform .3s ease-in-out;
  }
  .card-style:hover{
     transform: scale3d(1.01, 1.01, 1.01);
    
  }
  .v-card__title {
    padding: 0;
  }
  </style>
  