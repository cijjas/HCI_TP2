<script setup>
    import RoomsBox from '../components/RoomsBox.vue';
    import { onMounted } from '@vue/runtime-core';
    import { RoomApi } from '@/API/room.js';
    import { reactive } from 'vue';
    import { ref, computed, defineProps, defineEmits } from 'vue'
    import { useAppStore } from '@/store/app';
    import AddRoomsCard from '@/components/CreationComponents/AddRoomCard.vue'
    const store = useAppStore();

    onMounted(async () => {             // cuando se monta la pagina pido los datos
    try {
    // pido el update de los datos
    await store.getAllRoomsAPI();
    setTimeout(() => {
        transition.value = true;
      }, 500);
    } catch (error) {
    console.error(error);
    }
});
const transition = ref(false);
</script>

<template>
    <main>
      <div class="canvas">
        <v-card class="vcard elevation-0" color="transparent">
          <v-row style="margin-top: 20px;">
            <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-secondary">Rooms</v-card-title>
            <v-divider color="gris"></v-divider>
          </v-row>

          <v-row>
            <v-col md="3" class="mt-5">
              <AddRoomsCard></AddRoomsCard>
            </v-col>


            <v-col md="9">
              <v-row>
                <template v-for="(room, index) in store.getAllRooms()" :key="room">
                  <template v-if="index < 6">
                    <v-col xs="12" sm="12" md="6" lg="4" class="mt-5">
                      <v-fade-transition>
                        <RoomsBox v-if="transition" :roomName="room.name" :roomId="room.id"></RoomsBox>
                      </v-fade-transition>
                    </v-col>
                  </template>
                </template>
              </v-row>
            </v-col>

            <v-col>
              <v-row>
                <template v-for="(room, index) in store.getAllRooms()" :key="room">
                  <template v-if="index >= 6">
                    <v-col xs="12" sm="6" md="4" lg="3" class="mt-5">
                      <v-fade-transition>
                        <RoomsBox v-if="transition" :roomName="room.name" :roomId="room.id"></RoomsBox>
                      </v-fade-transition>
                    </v-col>
                  </template>
                </template>
              </v-row>
            </v-col>

          </v-row>
        </v-card>
      </div>
    </main>
</template>

<style scoped>
.v-layout {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

</style>
