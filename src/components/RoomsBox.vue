
<script setup>
import { ref, computed, defineProps } from 'vue'
import { useAppStore } from '@/store/app';

const store = useAppStore();

const props = defineProps({
roomName: {
  type: String,
  required: true
},
roomId: {
  type: String,
  required: true
}
})
// const props = defineProps(['roomName', 'devicesCount']);
const roomId = computed( ()=>{
  return props.roomId
});
const nameRoom = computed(()=> {
  return props.roomName});
const tempRoomName = ref('');
const isDialogOpen = ref(false);
const isDeleteDialogOpen = ref(false);
const toggleValue = ref(true);
const isConfirmationDialogOpen = ref(false);
const roomDevices = computed(() => store.getRoomDevices(roomId.value));


const openCreateDialog = () => {
  isConfirmationDialogOpen.value = true;
  setTimeout(() => {
    isConfirmationDialogOpen.value = false;
  }, 2000);
};

const saveName = () => {
  if (tempRoomName.value !== '') {
      nameRoom.value = tempRoomName.value; // Update the roomName variable with the new value
      store.updateARoom(roomId.value, nameRoom.value);
  }
  openEditDialog();
  // isDialogOpen.value = !isDialogOpen.value;
  clearVar();
};

const openEditDialog = () => {
  isDialogOpen.value = !isDialogOpen.value;
};

const openDeleteDialog = () => {
  isDeleteDialogOpen.value = !isDeleteDialogOpen.value;
};

const deleteRoom = async () => {
  // BORRAR EL CUARTO
  await store.deleteARoom(roomId.value);
  openDeleteDialog();
  openEditDialog();
};

function clearVar(){
  tempRoomName.value = "";
}

const rules = {
  minLength: value => value.length >= 3 || 'Min 3 characters',
  maxLength: value => value.length <= 15 || 'Max 15 characters',
  notRepeated: (v) => !store.getARoomByName(v) || 'Room already exists',
}

const isValidName= ref(false);
const submitName = () =>{
  saveName();
}


</script>

<template>

<v-card  class="toggle-card">

      <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
        <v-btn text color="transparent">
          <v-toolbar-title class="text--white font-weight-bold text-h4 mb-0" @click="openEditDialog">
              {{ nameRoom }}
          </v-toolbar-title>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-row >
        <v-col>
          <v-text class="text--white" >Devices in Room: </v-text>
          <span class="text--white font-weight-bold text-body mb-0"> {{ roomDevices.length }}</span>
        </v-col>
      </v-row>
      </v-card-text>

      <v-card-actions class="actions-style" style="height:100px">
        <v-row class="justify-center ml-3"  >
          <v-btn color="primary"  @click="openEditDialog">Edit Room</v-btn>
          <v-spacer></v-spacer>
          <!-- acceso a la pagina de ese cuarto especifico, donde estaran sus devices -->
          <router-link :to="{ name: 'roomview', params: { roomName: nameRoom } }">
            <v-btn style="background-color: #1C4035;" color="lightersecondary" class="mr-5">View Devices</v-btn>
          </router-link>
        </v-row>
      </v-card-actions>

      <v-dialog v-model="isDialogOpen" width="500" >
        <v-card class="toggle-card-popup">
          <v-card-title class="headline">Edit '{{ nameRoom }}'</v-card-title>
          <v-form v-model="isValidName">

            <v-card-text>
              <v-text-field
              label="New Room Name"
              v-model="tempRoomName"
              :placeholder="nameRoom"
              :rules="[rules.notRepeated, rules.minLength, rules.maxLength]"
              variant="outlined"
              solo
              bg-color='transparent'
              ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn class="delete-button" color="white" @click="openDeleteDialog"> Delete Room</v-btn>
            <!-- <v-btn color="primary" @click="openDeleteDialog" variant="outlined">Delete Room</v-btn> -->
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="openEditDialog">Cancel</v-btn>
            <v-btn
              color="primary"
              variant="flat"
              :disabled="!isValidName"
              @click="submitName"
               >Save</v-btn>
          </v-card-actions>
        </v-form>
        </v-card>
      </v-dialog>

      <v-dialog v-model="isDeleteDialogOpen" width="700" >
        <v-card class="toggle-card-popup">
          <v-card-title class="headline">Are you sure you want to delete {{ nameRoom }}?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" variant="plain" @click="deleteRoom();" >Delete</v-btn>
            <v-btn color="primary" @click="openDeleteDialog">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="isConfirmationDialogOpen" width="500" color="gris" >
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


<style scoped>
.delete-button {
  width: 150px;
  height: 40px;
  border-radius: 10px;
  background-color: #d82602;
  box-shadow: 0 2px 4px rgba(24, 15, 15, 0.589);
}

.actions-style {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color:#98B891;
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
  padding: 30px;
  border-radius: 15px !important;
  background-color: #f4e8c6ae;
  backdrop-filter: blur(7px);
  background-size: cover;
  backdrop-filter: blur(7px);
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
  padding: 16px;
  border-radius: 20px;
  transition: all .2s ease-in-out;
  background-color: #ebe3c1;
  height: 300px;
  width: 400px;
}

.toggle-card:hover {
  transform: scale3d(1.01, 1.01, 1.01);

}

.rounded-toolbar {
  border-radius: 20px;
  background-color: transparent;
}

.rounded-toolbar .text--white {
  color: #1C4035;
}

</style>
