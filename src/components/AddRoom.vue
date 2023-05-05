<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import { useAppStore } from '@/store/app';
const store = useAppStore();
const tempRoomName = ref("");
</script>

<template>
    <main>
        <!-- ROOMS -->
        <v-card elevation="5" class="pa-8 pt-4" color="gris">
            <v-card-title class="ml-n3 mb-3 mt-3 text-h4 font-weight-bold text-uppercase text-medium-emphasis">Rooms</v-card-title>
            <v-divider></v-divider>
            <v-card-title v-if="store.getRooms.length !=0" class="ml-n3 mt-3 mb-3 text-h5 font-weight-bold">Your Rooms :</v-card-title>
            <v-card v-if="store.getRooms.length !=0">
                <v-list rounded>
                <v-list-item v-for="room in store.getRooms">
                    {{ room.name }}
                    <v-divider></v-divider>
                </v-list-item>
            </v-list>
            </v-card>
            <v-spacer></v-spacer>
            <v-card-title  class="ml-n3 mt-3 mb-3 text-h5 font-weight-bold">Add a Room : </v-card-title>
            <v-text-field prepend-icon="mdi-home-plus" label="Room Name" v-model="tempRoomName"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn append-icon="mdi-plus" class="pl-10 pr-10" @click="store.addRoom(`${tempRoomName}`)">Add</v-btn>
        </v-card>
        <v-divider></v-divider>
        <v-btn @click="store.startDummy">START DUMMY</v-btn>
    </main>
</template>

<style scoped>
main{
    padding-top: 5%;
    padding-right: 13%;
    padding-left: 13%;
}
</style>
