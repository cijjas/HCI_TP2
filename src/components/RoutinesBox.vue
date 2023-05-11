<template>
    <v-card :class="bg-on" class="toggle-card" style="width: 400px;" @click="toggleCard" >
    
      <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
        <v-toolbar-title class="text--white font-weight-bold text-h4 mb-0">
            {{ nameRoutine }}
        </v-toolbar-title>
        <v-btn variant="flat" color="routinedarkred" @click="isOn = !isOn" :class="{'primary': isOn}">
            RUN
          </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row >
          <v-col>
            <v-text class="text--white" >Actions in Routine: </v-text>
            <span class="text--white font-weight-bold text-body mb-0"> {{ actions.length }}</span>
          </v-col>
        </v-row>
        <v-row >
          <v-btn variant="text" color="brown" class="mr-10 pl-6 pr-6" @click="openEditDialog">Edit Routine</v-btn>
          <router-link :to="{ name: 'routineview', params: { routineName: nameRoutine } }">
            <v-btn color="lightersecondary">View Actions</v-btn>
          </router-link>
        </v-row>
      </v-card-text>

      <v-dialog v-model="isDialogOpen" width="1024" persistent>
        <v-card class="toggle-card-popup">
          <v-card-title class="headline">Edit '{{ nameRoutine }}'</v-card-title>
          <v-card-text>
            <v-text-field label="New Routine Name" v-model="tempRoutineName" :placeholder="nameRoutine"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn class="delete-button" color="white" @click="openDeleteDialog"> Delete Routine</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="openEditDialog">Cancel</v-btn>
            <v-btn color="primary" variant="flat" @click="saveName">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="isDeleteDialogOpen" width="1024" persistent>
        <v-card class="toggle-card-popup">
          <v-card-title class="headline">Are you sure you want to delete '{{ nameRoutine }}'?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="plain" @click="deleteRoutine" >Delete</v-btn>
            <v-btn color="primary" @click="openDeleteDialog">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


    </v-card>
  </template>
  
  <script setup>
  import { ref, defineProps } from 'vue';
  import { onMounted } from '@vue/runtime-core';
  import { useAppStore } from '@/store/app';
  const store = useAppStore();
  
  const props = defineProps(['routineName', 'routineId', 'actionsCount']);
  
  const routineId = ref(props.routineId);
  const actionsCount = ref(props.actionCount);
  const actions = store.getARoutine(routineId.value).actions;

  const tempRoutineName = ref('');
  const nameRoutine = ref(props.routineName);
  const isDialogOpen = ref(false);
  const isDeleteDialogOpen = ref(false);

  onMounted(async () => {             // cuando se monta la pagina pido los datos
    try {
    // pido el update de los datos
    await store.getAllRoomsAPI();
    await store.getAllDevicesAPI();
    await store.getAllRoutinesAPI();
    } catch (error) {
    console.error(error);
    }
    }); 
  
  const saveName = () => {
    if (tempRoutineName.value !== '') {
        nameRoutine.value = tempRoutineName.value; // Update the routineName variable with the new value
        store.updateARoutineName(routineId.value, nameRoutine.value);
    }
    isDialogOpen.value = !isDialogOpen.value;
    clearVar();
  };
  const openEditDialog = () => {
    isDialogOpen.value = !isDialogOpen.value;
  };

  const openDeleteDialog = () => {
    isDeleteDialogOpen.value = !isDeleteDialogOpen.value;
  };
  const deleteRoutine = () => {
    // BORRAR LA RUTINA
    store.deleteARoutine(routineId.value);
    isDeleteDialogOpen.value = !isDeleteDialogOpen.value;
    isDialogOpen.value = !isDialogOpen.value;
  };

  function clearVar(){
    tempRoutineName.value = "";
}
  </script>
  
  <style scoped>
.delete-button {
  width: 150px;
  height: 40px;
  border-radius: 10px;
  background-color: #d82602;
  box-shadow: 0 2px 4px rgba(24, 15, 15, 0.589);
}
.toggle-card {
  cursor: pointer;
  padding: 16px;
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
  border-radius: 10px;
  background-color: #795454;
  transition: all .2s ease-in-out;
  max-height: 400px;
  max-width: 450px;
}

.toggle-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
}

.rounded-toolbar {
  border-radius: 20px;
  background-color: transparent;
}



.text--white {
  color: #f8dfc2;
}

.toggle-card-popup {
  padding: 30px;
  border-radius: 15px !important;
  background-image: url("./DeviceAssets/fuego.png");
  background-position-x: 50%;
  background-position-y: -100px ;
  background-size: 1200px;
  background-color: #f4e8c6ae;
  backdrop-filter: blur(8px);
}

</style>
