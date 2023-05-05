// HomeView

<script setup>
import VacuumBox from '../components/DeviceComponents/VacuumBox.vue';
import CurtainBox from '@/components/DeviceComponents/CurtainBox.vue';
import TapBox from '@/components/DeviceComponents/TapBox.vue';
import FridgeBox from '@/components/DeviceComponents/FridgeBox.vue';
import OvenBox from '@/components/DeviceComponents/OvenBox.vue';
</script>

<template>
  <main>

    <div class="canvas">
      <v-container class="my-5">
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3>
            <VacuumBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <CurtainBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <FridgeBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <TapBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <OvenBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <TapBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <TapBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <VacuumBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <FridgeBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <FridgeBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <FridgeBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <CurtainBox class="grid-item" />
          </v-flex>
        </v-layout>
      </v-container>
    </div>

  </main>
</template>

<style scoped>
.grid-item {
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin: 1rem;
  padding: 1rem;
  transition: box-shadow 0.2s ease;
}

.grid-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.v-layout {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

</style>
