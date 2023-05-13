// HomeView

<script setup>
import AddDeviceCard from '@/components/CreationComponents/AddDeviceCard.vue';
import AddRoomCard from '@/components/CreationComponents/AddRoomCard.vue';
import AddRoutineCard from '@/components/CreationComponents/AddRoutineCard.vue';
</script>

<template>
  <main>
    <div >
        <v-card class="vcard elevation-0" color="transparent" style="padding: 20px;">
          
          <v-row style="margin-top: 20px; ">
            <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-secondary">Creation View</v-card-title>
            <v-divider color="gris"></v-divider>
          </v-row>
          <v-row>
            <AddDeviceCard class="mt-6"></AddDeviceCard>
            <AddRoomCard class="mt-6"></AddRoomCard>
            <AddRoutineCard class="mt-6"></AddRoutineCard>

          </v-row>
        </v-card>
    </div>
  </main>
</template>

<style scoped>


</style>
