// HomeView

<script setup>
import AspiradoraBox from '../components/AspiradoraBox.vue';
import CortinaBox from '@/components/CortinaBox.vue';
import GrifoBox from '@/components/GrifoBox.vue';
import HeladeraBox from '@/components/HeladeraBox.vue';
import HornoBox from '@/components/HornoBox.vue';
</script>

<template>
  <main>

    <div class="canvas">
      <v-container class="my-5">
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3>
            <AspiradoraBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <CortinaBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <HeladeraBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <GrifoBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <AspiradoraBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <GrifoBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <GrifoBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <AspiradoraBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <GrifoBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <GrifoBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <CortinaBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <CortinaBox class="grid-item" />
          </v-flex>
          <v-flex xs12 sm6 md4 lg3>
            <CortinaBox class="grid-item" />
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
