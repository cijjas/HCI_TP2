


<template>
  <v-card :class="bg-on" class="toggle-card"  @click="toggleCard" >
    <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
      <v-toolbar-title @click="isDialogOpen=true" class="text--white font-weight-bold text-h4 mb-0">
          {{ nameRoutine }}
      </v-toolbar-title>
      
      <v-btn 
    icon 
    :disabled="moving || !isValidLevel" 
    type="submit"
    :disable-background-color="true"
    style="color:rgb(19, 168, 71); background-color: transparent;"
    flat
>
    <v-icon>{{check ? 'mdi-check-circle': 'mdi-check-circle-outline'}}</v-icon>
</v-btn>

      <v-btn  class="run-btn" @click="run();" @mouseenter="check=false" color="lightersecondary">
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

      <v-card-actions class="actions-style " style="height: 100px;">
        <v-row >
          <v-btn variant="text" color="brown" class=" ml-10" @click="openEditDialog">Edit Routine</v-btn>
          <v-spacer></v-spacer>
          <router-link :to="{ name: 'routineview', params: { routineName: nameRoutine } }">
            <v-btn class="view-actions-btn mr-10" color="primary">View Actions</v-btn>
          </router-link>
        </v-row>
      </v-card-actions>

    </v-card-text>

    <v-dialog v-model="isDialogOpen" width="1024" persistent>
      <v-card class="toggle-card-popup">
        <v-card-title class="headline">Edit '{{ nameRoutine }}'</v-card-title>
        <v-card-text>
          <v-text-field 
          :rules="[rules.required, rules.notRepeated, rules.alphanumeric, rules.min, rules.max]" 
          label="New Routine Name" 
          v-model="tempRoutineName" 
          :placeholder="nameRoutine"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn class="delete-button" color="white" @click="openDeleteDialog"> Delete Routine</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="openEditDialog">Cancel</v-btn>
          <v-btn 
          color="primary" 
          variant="flat" 
          @click="saveName">Save</v-btn>
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
import { ref, defineProps, computed } from 'vue';
import { onMounted } from '@vue/runtime-core';
import { useAppStore } from '@/store/app';
const store = useAppStore();

const props = defineProps(['routineName', 'routineId', 'actionsCount']);

const routineId = computed(()=> {
  return props.routineId
});
const actionsCount = computed( () => {
  return props.actionCount
});
const actions = computed( () => {
  return store.getARoutine(routineId.value).actions;
});
const tempRoutineName = ref('');
const nameRoutine = computed(()=> {
  return props.routineName
});;
const isDialogOpen = ref(false);
const isDeleteDialogOpen = ref(false);
onMounted(async () => {             // cuando se monta la pagina pido los datos
  try {
  // pido el update de los datos
  await store.getAllRoomsAPI();
  await store.getAllDevicesAPI();
  await store.getAllRoutinesAPI();
  routineId.value = props.routineId
  } catch (error) {
  console.error(error);
  }
  });
  const rules = {
    required: value => !!value || 'Required.',
    min: (value) => value.length >= 3 || 'Min 3 characters',
    max: (value) => value.length <= 15 || 'Max 15 characters',
    notRepeated: (value) => !store.getRoutinesNames.includes(value) || 'Routine already exists',
    alphanumeric : value => /^[a-zA-Z0-9\s]+$/.test(value) || 'Only alphanumeric characters'
};
async function saveName()  {
  if(tempRoutineName.value.length < 3 || tempRoutineName.value.length > 15){
      return;
  }
  if(store.getRoutinesNames.includes(tempRoutineName.value)){
      return;
  }
  if(!/^[a-zA-Z0-9\s]+$/.test(tempRoutineName.value)){
      return;
  }
  if (tempRoutineName.value !== '') {
      nameRoutine.value = tempRoutineName.value; // Update the routineName variable with the new value
      await store.updateARoutineName(routineId.value, tempRoutineName.value);
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

const check= ref(false);

function run(){
  store.executeARoutine(routineId.value);
  check.value =!check.value;
}

</script>

<style scoped>
.run-btn{
width: 50px;
height: 40px;
border-radius: 10px;
box-shadow: 0 2px 4px rgba(24, 15, 15, 0.589);
background-color: #795454;
}
.view-actions-btn{
background-color: #EFE5C5;
width: 150px;
height: 40px;
border-radius: 10px;
box-shadow: 0 2px 4px rgba(24, 15, 15, 0.589);
}
.actions-style {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color:#795454;
}
.delete-button {
width: 150px;
height: 40px;
border-radius: 10px;
background-color: #d82602;
box-shadow: 0 2px 4px rgba(24, 15, 15, 0.589);
}
.toggle-card {
cursor: pointer;
padding: 20px;
border-radius: 20px;
background-color: #EFE5C5;
transition: all .2s ease-in-out;
height: 300px;
width: 400px;
}
.toggle-card:hover {
box-shadow: 0 4px 10px rgba(0, 0, 0, .2);
}
.rounded-toolbar {
border-radius: 20px;
background-color: transparent;
}
.text--white {
color: #2c432e;
}
.toggle-card-popup {
padding: 30px;
border-radius: 15px !important;
background-position-x: 50%;
background-position-y: -100px ;
background-size: 1200px;
background-color: #f4e8c6ae;
backdrop-filter: blur(8px);
}
</style>
