// HomeView

<script setup>
import AddDeviceCard from '@/components/CreationComponents/AddDeviceCard.vue';

</script>

<template>
  <main>
    <div >
        <v-card class="vcard elevation-0" color="transparent" style="padding: 20px;">
          
          <v-row style="margin-top: 20px; ">
            <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-secondary">Creation View</v-card-title>
            <v-divider color="gris"></v-divider>
          </v-row>

        <AddDeviceCard></AddDeviceCard>
        </v-card>
    </div>
  </main>
</template>

<style scoped>


</style>
