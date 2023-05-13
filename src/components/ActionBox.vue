<template>
    <v-card :class="{'bg-on': toggleValue, 'bg-off': !toggleValue}" class="toggle-card">
        <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
                <v-toolbar-title class="text--white font-weight-bold text-h4 mb-0">
                  {{ props.action.actionName }}
                </v-toolbar-title>
                <v-btn class="delete-button" variant="text" color="lightersecondary" @click="openDeleteDialog">
                  delete
                </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-row class="row-style mt-1">
            <v-col>
              <v-text class="text--white">Device: </v-text>
              <span class="text--white font-weight-bold text-body mb-0">{{ device.name }}</span>
            </v-col>
          </v-row>

          <v-row class="row-style mt-1">
            <v-col>
              <v-text v-if="props.action.params.length > 0" class="text--white">Settings: </v-text>
              <template v-for="param in props.action.params" :key="device.id">
                <span class="text--white font-weight-bold text-body mb-0">{{ param }}</span>
              </template>
            </v-col>
          </v-row>


        <v-card-actions class="actions-style" style="height: 100px;">
          <v-col>

            <!-- <v-row class="row-style-settings">
              <v-col class="justify-end">

              </v-col>
              <v-col>
                <v-card-text>Settings: </v-card-text>
              </v-col>
            </v-row> -->

          </v-col>
        </v-card-actions>

        </v-card-text>

        <v-dialog v-model="isDialogOpen" width="1024" persistent>
            <v-card class="toggle-card-popup">
                <v-card-title class="headline">Edit Action</v-card-title>
                <v-card-text>
                    <v-text-field label="New Action Name" v-model="tempActionName" :placeholder="actionName"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="delete-button" color="white" @click="openDeleteDialog"> Delete Action</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="openEditDialog">Cancel</v-btn>
                    <v-btn color="primary" variant="flat" @click="saveName">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="isDeleteDialogOpen" width="1024" persistent>
            <v-card class="toggle-card-popup">
                <v-card-title class="headline">Are you sure you want to delete {{ actionName }}?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="routinedarkred" variant="plain" @click="deleteAction();" >Delete</v-btn>
                    <v-btn color="primary" @click="openDeleteDialog">Cancel</v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="isConfirmationDialogOpen" width="500" color="gris" persistent>
            <v-card class="toggle-card-popup">
                <div class="text-center">
                    <v-icon icon="mdi-check-circle-outline" class="check-icon"></v-icon>
                    <v-card-title prepend-icon="mdi-check-circle-outline" class="font-weight-bold text-h5 card-title">Action Deleted</v-card-title>
                    <v-card-text>Action '{{ actionName }}' successfully deleted</v-card-text>
                </div>
            </v-card>
        </v-dialog>
        <v-dialog v-model="isErrorDialogOpen" width="500" color="gris" >
          <v-card class="toggle-card-popup">
            <div class="text-center">
              <v-icon icon="mdi-alert-circle-outline" class="error-icon"></v-icon>
              <v-card-title prepend-icon="mdi-check-circle-outline" class="font-weight-bold text-h5 card-title">Error Deleting Action</v-card-title>
              <v-card-text>Routine cannot have 0 actions</v-card-text>
              <v-card-text>If you wish, you can delete the routine</v-card-text>
            </div>
          </v-card>
        </v-dialog>
    </v-card>
</template>

<script setup>
    import { ref, defineProps, computed } from 'vue'
    import { onMounted } from '@vue/runtime-core';
    import { useAppStore } from '@/store/app';
    import { useRouter } from 'vue-router'

    const store = useAppStore();

    const isErrorDialogOpen = ref(false);

    onMounted(async () => {             // cuando se monta la pagina pido los datos
      try {
      // pido el update de los datos
      await store.getAllRoomsAPI();
      await store.getAllDevicesAPI();
      await store.getAllRoutinesAPI();
      await store.getDeviceActionsAPI();
      } catch (error) {
      console.error(error);
      }
    });

    const props = defineProps({
      action: {
        type: String,
        required: true
      },
      routineId: {
        type: String,
        required: true
      }
    })

    const params = computed(()=>{
      return props.action.params
    })

    const device = computed(()=>{
      return store.getADevice(props.action.device.id)
    })

    const routineActionsLength = computed(()=>{
      console.log("number of actions: " + store.getARoutine(props.routineId).actions.length)
      return store.getARoutine(props.routineId).actions.length;
    })

    const openErrorDialog = () => {
        isErrorDialogOpen.value = true;
        setTimeout(() => {
          isErrorDialogOpen.value = false;
        }, 2000);
      };
   /*  const actionName = computed(()=>{
      return props.actionName
    })

    const routineId = computed(()=>{
      routine.value = store.getARoutine(props.routineId)
      return props.routineId;
      })


    const routineName = computed(()=>{
      return routine.value.name;
    })
    const actions = computed(()=>{
      return routine.value.actions;
    }) */
      /* const routine = store.getARoutine(routineId.value);
      const routineName = routine.name;
      const actions = routine.actions; */

/*       const device = computed( ()=> {
        return store.getADevice(deviceId.value)
      });
      const deviceName = computed( ()=> {
        return device.name;
      }) //ej: sony speaker, etc.
      const deviceTypeId = device.type.id;
      const deviceTypeName = computed( ()=> {
        if (!device){
          return device.type.name; //ej: refrigerator, oven, etc.
        }
        return ""
      }) */
      //const routineName = store.getARoutine(routineId.value).name;

      const tempActionName = ref('');
      const isDialogOpen = ref(false);
      const isDeleteDialogOpen = ref(false);
      const toggleValue = ref(true);
      const isConfirmationDialogOpen = ref(false);

      const router = useRouter()

      const openCreateDialog = () => {
        isConfirmationDialogOpen.value = true;
        setTimeout(() => {
          isConfirmationDialogOpen.value = false;
        }, 2000);
      };

      const saveName = () => {
        if (tempActionName.value !== '') {
            actionName.value = tempActionName.value; // Update the roomName variable with the new value

            //UPDATE AN ACTION !!!
            //borro action, uso los datos que se mantienen igual y creo una nueva accion (createAction). Pusheo a rutina
            deleteActionFromAPI();
            store.createAction(deviceId.value, actionName.value, params.value);
        }
        openEditDialog();
        clearVar();
      };

      const openEditDialog = () => {
        isDialogOpen.value = !isDialogOpen.value;
      };

      const openDeleteDialog = () => {
        isDeleteDialogOpen.value = !isDeleteDialogOpen.value;
      };

      const deleteActionFromAPI = () => {
        //buscar en array de acciones de la rutina la accion que quiero borrar, la borro, hago updateARoutine con ese nuevo array
        var index = store.getARoutine(props.routineId).actions.findIndex(action => action.actionName === props.action.actionName);
        if (index !== -1) {
          store.getARoutine(props.routineId).actions.splice(index, 1);
        }
        store.updateARoutine(props.routineId, store.getARoutine(props.routineId).name,store.getARoutine(props.routineId).actions);
      }

      const deleteAction = () => {
        // DELETE AN ACTION !!!!
        if(routineActionsLength.value == 1) {
          //si solo queda una accion en la rutina, borramos rutina entera
          store.deleteARoutine(props.routineId);
          router.push('/routines');
          // openErrorDialog();
          return;
        }
        deleteActionFromAPI();
        openDeleteDialog();
        // openEditDialog();
      };

      function clearVar(){
        tempActionName.value = "";
    }

</script>


<style scoped>
.error-icon {
  font-size: 3rem;
  color: #ec0000;
}  
.row-style {
  margin-bottom: -5px;
  margin-top: -40px;
}

.row-style-settings {
  margin-bottom: -15px;
  margin-top: -45px;
}
.delete-button {
      width: 70px;
      height: 40px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(24, 15, 15, 0.589);
      background-color: #778da9;
}

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
      cursor: pointer;
      padding: 16px;
      border-radius: 15px;
      background-color: #f4e8c6ae;
      backdrop-filter: blur(8px);
      transition: all .2s ease-in-out;

    }

    .toggle-card-popup::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.05;
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

    .bg-on {
      background-color: #EFE5C5;
    }

    .bg-off {
      background-color: #8C783A;
    }
    .rounded-toolbar .text--white {
      color: #1C4035;
    }

    .actions-style {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #778da9 ;
  }
</style>
