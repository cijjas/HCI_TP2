<template>
    <v-card :class="{'bg-on': toggleValue, 'bg-off': !toggleValue}" class="toggle-card">    
        <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
            <v-btn text color="transparent">
                <v-toolbar-title class="text--white font-weight-bold text-h4 mb-0">
                  {{ actionName }}
                </v-toolbar-title>
            </v-btn>
        </v-toolbar>
        <v-card-text>
            <!-- <v-row align="center">
              <v-col>
                <v-subheader class="ml-1">Devices in Room: </v-subheader>
                <span class="font-weight-bold text-body mb-0">{{ roomId }}</span>
              </v-col>
            </v-row> -->
            <v-row class="justify-center">
                <v-btn color="primary" class="mr-5 pl-5 pr-5" @click="openEditDialog">Edit Action</v-btn>
              <!-- <router-link :to="{ name: 'room', params: { roomName: roomName } }">
                <v-btn color="primary" class="mr-5 pl-5 pr-5 mt-3">View Devices</v-btn>
              </router-link> -->
            </v-row>
        </v-card-text>
    
        <v-dialog v-model="isDialogOpen" width="1024" persistent>
            <v-card class="toggle-card-popup">
                <v-card-title class="headline">Edit Action</v-card-title>
                <v-card-text>
                    <v-text-field label="New Room Name" v-model="tempActionName" :placeholder="actionName"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="delete-button" color="white" @click="openDeleteDialog"> Delete Room</v-btn>
                    <!-- <v-btn color="primary" @click="openDeleteDialog" variant="outlined">Delete Room</v-btn> -->
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="openEditDialog">Cancel</v-btn>
                    <v-btn color="primary" variant="flat" @click="saveName">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    
        <v-dialog v-model="isDeleteDialogOpen" width="1024" persistent>
            <v-card class="toggle-card-popup">
                <v-card-title class="headline">Are you sure you want to delete {{ deviceName }}?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" variant="plain" @click="deleteRoom();" >Delete</v-btn>
                    <v-btn color="primary" @click="openDeleteDialog">Cancel</v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
    
        <v-dialog v-model="isConfirmationDialogOpen" width="500" color="gris" persistent>
            <v-card class="toggle-card-popup">
                <div class="text-center">
                    <v-icon icon="mdi-check-circle-outline" class="check-icon"></v-icon>
                    <v-card-title prepend-icon="mdi-check-circle-outline" class="font-weight-bold text-h5 card-title">Room Deleted</v-card-title>
                    <v-card-text>Room '{{ creationDeviceName }}' successfully deleted</v-card-text>
                </div>
            </v-card>
        </v-dialog>
    </v-card>
</template>
      
<script setup>
    import { ref, defineProps } from 'vue'
    import { useAppStore } from '@/store/app';
    const store = useAppStore();
    
    //QUE TIPO DE DATO ES UN DEVICE???
    const props = defineProps({
      device: {
        type: String,
        required: true
      },
      actionName: {
        type: String,
        required: true
      },
      params: {
        type: Array,
        required: true
      },
      routineId: {
        type: String,
        required: true
      }
    })
      
      const device = ref(props.device);
      const deviceName = device.value.name; //ej: sony speaker, etc.
      const deviceTypeId = device.value.type.id;
      const deviceTypeName = device.value.type.name; //ej: refrigerator, oven, etc.
      const actionName = ref(props.actionName);
      const params = ref(props.params);
      const routineId = ref(props.routineId);
      const routineName = store.getARoutine(routineId.value).name;
      
      const tempActionName = ref('');
      const isDialogOpen = ref(false);
      const isDeleteDialogOpen = ref(false);
      const toggleValue = ref(true);
      const isConfirmationDialogOpen = ref(false);
    
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
    
      const deleteRoom = () => {

        // DELETE AN ACTION !!!!
        // store.deleteARoom(roomId.value);
        openDeleteDialog();
        openEditDialog();
      };
    
      function clearVar(){
        tempActionName.value = "";
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
      background-color: whitesmoke;
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
      padding: 16px;
      margin-top: 30px;
      margin-left: 30px;
      margin-right: 30px;
      border-radius: 10px;
      background-color: #EECC66;
      transition: all .2s ease-in-out;
      max-height: 400px;
      max-width: 400px;
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
    .rounded-toolbar .text--white {
      color: #1C4035;
    }
</style>
    