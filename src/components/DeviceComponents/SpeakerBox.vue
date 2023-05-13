<script setup>
  import { ref, computed, watch, defineProps } from 'vue';
  import { useAppStore } from '@/store/app';
  // import { resolveDirective } from 'vue';
  import { onMounted } from '@vue/runtime-core';

  const store = useAppStore();
   onMounted(async () => {             // cuando se monta la pagina pido los datos
    try {
      await store.getPlaylistAPI(props.componentId);
    } catch (error) {
    console.error(error);
    }
  });

  const props = defineProps({
  componentName: {
    type: String,
    required: true
  },
  componentId: {
    type: String,
    required: true
  },
  componentRoom: {
    type: String,
    required: true
  }
})
  // const props = defineProps(['roomName', 'devicesCount']);
  const componentId = ref(props.componentId);
  const componentRoom = ref(props.componentRoom);
  const isDialogOpen = ref(false);
  const isDeleteDialogOpen = ref(false);
  const volumeLevel = ref(store.getDeviceState(props.componentId).volume);

  //real values
  const deviceName = ref(props.componentName);

  //temp values
  const tempDeviceName = ref(deviceName.value);

  const rules = {
    minLength: value => value.length >= 3 || 'Min 3 characters',
    maxLength: value => value.length <= 15 || 'Max 15 characters',
    acceptableVolumeLevel: value => value >= 0 && value <= 10 || 'Min 0, Max 100',
    required : value => !!value || 'required',
    unique : value => !store.getADeviceByName(value) || 'Name already in use.',
    alphanumeric : value => isAlphanumeric(value) || 'Only alphanumeric characters'
  };
  const isAlphanumeric = (value) => {
    return /^[a-zA-Z0-9\s]+$/.test(value);
  };
  const deleteDevice = () => {
    store.deleteADeviceByName(deviceName.value);
    openDeleteDialog();
    cancelSettings();
    router.push('/');
};
const deviceNameRepeated = () =>{
    return store.getADeviceByName(tempDeviceName.value) ? true : false;
  }
const openDeleteDialog = () => {
  isDeleteDialogOpen.value = !isDeleteDialogOpen.value;
};
const openSpeakerSettings = () => {
  isDialogOpen.value = true;
};
const deviceNameIsValid= () =>{
    return tempDeviceName.value.length >= 3 && tempDeviceName.value.length <= 15 && !deviceNameRepeated() && isAlphanumeric(tempDeviceName.value);
  }

const timePlaying = ref(50);

const playing = ref(false);
const tempVolumeLevel = ref(volumeLevel.value);

const isPlaylistDialogOpen = ref(false);
const openPlaylistDialog = () => {
  isPlaylistDialogOpen.value = true;
};
const isFormValid = computed(() => {
  return (
    tempDeviceName.value.length >= 3 &&
    tempDeviceName.value.length <= 15
  );
});



const cancelSettings = () => {
  isDialogOpen.value = false;
  tempVolumeLevel.value = volumeLevel.value;
  tempDeviceName.value = deviceName.value;
};
const saveSettings = () => {
  if(!deviceNameIsValid()) {
        return;
    }
  isDialogOpen.value = false;
  volumeLevel.value = tempVolumeLevel.value;
  deviceName.value = tempDeviceName.value;
};
function playButtonIcon(){
  if(playButtonIcon.value == 'mdi-play'){
    playButtonIcon.value = 'mdi-pause';
  }else{
    playButtonIcon.value = 'mdi-play';
  }
}

const saveButtonDisabled = computed(() => {
  return !isFormValid.value;
});



//setVolume[num], play[], stop[], pause[], resume[], nextSong[], previousSong[],
//setGenre[classical/country/dance/latina/pop/rock],
//getPlaylist[],

/* -------------------------------------- REFACTORING -------------------------------------- */


// const songTitle = ref(store.getDeviceState(props.componentId).song.title);
// const songArtist = ref(store.getDeviceState(props.componentId).song.artist);
// const songAlbum = ref(store.getDeviceState(props.componentId).song.album);
// const songDuration = ref(store.getDeviceState(props.componentId).song.duration);


function calculateProgress(songProgress, songDuration) {
  const timeArray1 = songProgress.split(':').map(Number);
  const timeSeconds1 = timeArray1[0] * 60 + timeArray1[1];
  const timeArray2 = songDuration.split(':').map(Number);
  const timeSeconds2 = timeArray2[0] * 60 + timeArray2[1];
  const progress = (timeSeconds1 / timeSeconds2) * 100;
  const integer = Math.round(progress);
  return integer
}
const progress = computed( ()=>{
  return calculateProgress(deviceState.value.song.progress, deviceState.value.song.duration)
})

const deviceState = ref( store.getDeviceState(props.componentId));           // estas variables inicialmente son correctas ya que vienen del MOUNT
const status = computed(()=> {return store.getDeviceState(props.componentId).status});
const genre = computed(()=>{return store.getDeviceState(props.componentId).genre});
const genres = ref(['clasical','country','pop','rock','dance','latina']);



const isPlaying = computed( ()=>{
  return status.value == 'playing'
})

// boton de play tiene tres funciones: play, resume, pause
async function playButton(){

  switch(status.value) {    // dummy value
    case 'paused':
      status.value = "playing";
      store.updateADeviceState(props.componentId, "resume", []);
        // polling para el tiempo de avance de la cancion
      var intervalId = setInterval(async () => {
        const deviceStateRT = await store.getDeviceStateAPI(props.componentId);
        deviceState.value = deviceStateRT;
        console.log(deviceStateRT)

        console.log(deviceState.value.song.progress)
        console.log(progress.value)
        if (deviceStateRT.status !== 'playing') {
          clearInterval(intervalId);
        }
      }, 1000);
      break;

    case 'stopped':
      status.value = "playing";
      store.updateADeviceState(props.componentId, "play", []);
        // polling para el tiempo de avance de la cancion
      var intervalId = setInterval(async () => {
        const deviceStateRT = await store.getDeviceStateAPI(props.componentId);
        deviceState.value = deviceStateRT;
        // console.log(deviceStateRT);
        if (deviceStateRT.status !== 'playing') {
          clearInterval(intervalId);
        }
      }, 1000);
      break;

    case 'playing':
      status.value = "paused";
      store.updateADeviceState(props.componentId, "pause", []);
      break;
    default:
      console.log("que ha pasao");
      break;
  }

}

async function stop(){
  status.value = "stopped"
  await store.updateADeviceState(props.componentId, "stop", []);
}


async function nextSong(){
  await store.updateADeviceState(props.componentId, "nextSong", []);
}
async function previousSong(){
  await store.updateADeviceState(props.componentId, "previousSong", []);
}


async function updateGenre(selection){
  await store.updateADeviceState(props.componentId, "setGenre", [selection]);
  //nuevo genero -> nueva playlist
  await store.getPlaylistAPI(props.componentId);
}

// async function getPlaylist() {
//   var res = await store.updateADeviceState(props.componentId, "getPlaylist", []);
//   return res;
// }

/* const playlist = ref(store.updateADeviceState(props.componentId, "getPlaylist", []));
console.log(playlist.value); */

// const playlist = computed( ()=> {
//   return store.updateADeviceState(props.componentId, "getPlaylist", []);
// })

// console.log(playlist[0].title);
// console.log(playlist[1].title);
// console.log(playlist[2].title);

function setVolume() {
  store.updateADeviceState(props.componentId, "setVolume", [volumeLevel.value]);
}
function decreaseVolume() {
  store.updateADeviceState(props.componentId, "setVolume", [volumeLevel.value - 1]);
  volumeLevel.value -= 1
}
function increaseVolume() {
  store.updateADeviceState(props.componentId, "setVolume", [volumeLevel.value + 1]);
  volumeLevel.value += 1
}

</script>

<template>
  <v-card class="toggle-card">
    <!-- <v-card-text>{{   songTitle }}</v-card-text> -->
  {{ deviceState.song.title }} - {{ deviceState.song.artist }}

    <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
      <v-row >
        <v-col cols="9">
          <v-btn @click="openSpeakerSettings" text color="transparent">
            <v-card-title class="font-weight-bold text-h4 mb-0  card-title">{{ deviceName }}</v-card-title>
            <v-tooltip
                  activator="parent"
                  location="right"
                >Edit</v-tooltip>
          </v-btn>
        </v-col>
        <v-spacer> </v-spacer>
        <v-col class="text-center" cols="3" >
          <v-btn icon @click="stop" color="primary">
            <v-icon>mdi-stop</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>

    <v-card-text>

      <v-row  justify="center">
        <v-col class="text-center" cols="4">
          <!-- row de volumen -->
          <v-text-field
          v-model="volumeLevel"
          type="number"
          label="Volume"
          :rules="[rules.acceptableVolumeLevel]"
          :min="0"
          :max="10"
          class="rounded-input "
          bg-color='transparent'
          variant="solo"
          flat/>
        </v-col>
        <v-col cols="2">
          <v-btn icon  @click="setVolume" style="background-color:#f4e6bf; color: #1ed760"  flat>
            <v-icon>mdi-check-circle-outline</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="4">
            <v-select
            variant="solo"
            @update:modelValue = "updateGenre($event)"
            :items="genres"
            label="Genre"
            class="rounded-input"
            bg-color='transparent' flat/>


          </v-col>
        <v-col cols="2">
          <v-btn icon @click="openPlaylistDialog" style="background-color: transparent; color:#204516;" flat>
            <v-icon>mdi-playlist-play</v-icon>
            <v-tooltip
                  activator="parent"
                  location="right"
                >See Playlist</v-tooltip>
          </v-btn>
        </v-col>

      </v-row>
    </v-card-text>

    <v-card-actions class="actions-style " style="height: 120px;">
      <v-row justify="center">
        <v-col cols="3">
          <v-btn icon @click="decreaseVolume"  style="background-color: #0000000b; color:#f1edcd; margin-left: 30px; margin-top: 10px;"  flat>
            <v-icon>mdi-volume-minus</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="6">

          <!-- row de play -->
          <v-row  justify="center">
            <v-col class="text-center" cols="12">
              <v-btn icon @click="previousSong" style="background-color: transparent;" color="common">
                <v-icon>mdi-skip-previous</v-icon>
              </v-btn>
              <v-btn icon @click="playButton" style="background-color: #f1edcd;" color="black">
                <v-icon>{{ isPlaying ? 'mdi-pause' :'mdi-play' }}</v-icon>
              </v-btn>
              <v-btn icon @click="nextSong" style="background-color: transparent;" color="common">
                <v-icon>mdi-skip-next</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <!-- mostrador de tiempo de cancion -->

          <v-row >
            <v-col cols="2">
            </v-col>
            <v-col cols="8">
              <v-progress-linear
              v-model="progress"
              :min="0"
              :max="100"
              color="common2"
              ></v-progress-linear>
            </v-col>
            <v-col cols="2">
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-btn icon @click="increaseVolume" style="background-color: #0000000b; color:#f1edcd; margin-top: 10px;" flat>
            <v-icon>mdi-volume-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>


    <!-- dialog de cambiar nombre (settings) -->
    <v-dialog v-model="isDialogOpen" width="700px" >
      <v-card class="toggle-card-popup">
        <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
          <v-card-title class="font-weight-bold text-h5 card-title">{{ deviceName }} Settings</v-card-title>
        </v-toolbar>
        <v-form v-model="isFormValid" @submit.prevent="saveSettings">
          <v-card-text>
            <v-row>
              <v-text-field
              variant="outlined"
              solo
              :counter="15"
              label="Device Name"
              v-model.string="tempDeviceName"
              type="string"
              :rules="[rules.maxLength, rules.minLength, rules.unique, rules.alphanumeric]"
            ></v-text-field>

            </v-row>
          </v-card-text>
          <v-card-actions class="actions-style">
            <v-spacer></v-spacer>
            <v-btn color="common2" text @click="cancelSettings">Cancel</v-btn>
            <v-btn
              :disabled="!isFormValid"
              type="submit"
              style="background-color: #f1edcd;margin: 10px"
              color="primary"
              text
              >Save</v-btn>
          </v-card-actions>

        </v-form>
      </v-card>
    </v-dialog>


    <!-- dialog de playlist -->
    <v-dialog v-model="isPlaylistDialogOpen" width="700px">
      <v-card class="toggle-card-popup">
        <v-card-title>
          <v-toolbar :rounded="true" class="rounded-toolbar" transparent>
            <v-card-title class="font-weight-bold text-h5 card-title">
              Songs in {{ genre }}
            </v-card-title>
          </v-toolbar>
        </v-card-title>
        <v-card-text class="mt-n10">
          <v-list>
            <v-list-item v-for="song in store.playlist">
              <v-list-item-title> {{ song.title }} -- {{ song.artist }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions class="actions-style" style="height: 50px;">
          <v-spacer></v-spacer>
          <v-btn
          style="background-color: #f1edcd;margin: 10px"
          color="primary"
          text
          @click="isPlaylistDialogOpen= false"
          >Close</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

  </v-card>
</template>



<style scoped>
.toggle-card {
  cursor: pointer;
  padding: 16px;
  border-radius: 20px;
  background-color: #f4e6bf;
  transition: all .2s ease-in-out;
  height: 300px;
  width: 400px;
  color: #1C4035; /* Change the color to your desired value */

}
.toggle-card-popup {
  padding: 30px;
  border-radius: 15px !important;
  background-color: #f4e8c6ae;
  backdrop-filter: blur(8px);
  height: 400px
}
.toggle-card-popup::before {
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 1;
}
.rounded-input {
  border-radius: 10px;
  box-shadow: inset 3px 1px 2px rgba(0, 0, 0, 0.2),
              inset 0 -1px 3px rgba(240, 222, 162, 0.5);
  background-color: transparent;
  height: 60px;
  width: 100px;
  color: #3861557e; /* Change the color to your desired value */
}
.actions-style {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color:#1ed760;
  }
.delete-button {
  width: 200px;
  height: 40px;
  border-radius: 10px;
  background-color: #d82602;
  box-shadow: 0 2px 4px rgba(24, 15, 15, 0.589);
}

.green-color {
  color: #1C4035; /* Change the color to your desired value */
}



.card-title{
  color: #1C4035; /* Change the color to your desired value */
  white-space: nowrap;
  overflow: hidden;
}
.v-btn:hover .card-title {
    color: #19642d;
}

.small-button-save {
  width: 240px;
  height: 40px;
  border-radius: 10px;
  background-color: #1C4035;
  box-shadow: 0 2px 4px rgba(24, 15, 15, 0.589);
}
.rounded-toolbar {
  border-radius: 20px;
  background-color: transparent;
}
.on-button:active {
  color: #631414;
}
.off-button:active {
  color: #1f8a3c;
}
.on-button{
  color: #1f8a3c;

}
.on-button:hover{
  color: #631414;
}

</style>

