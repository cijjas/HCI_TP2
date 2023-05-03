<script setup>
import Box from '../components/Box.vue';
import AspiradoraBox from '../components/AspiradoraBox.vue';
import CortinaBox from '@/components/CortinaBox.vue';
import GrifoBox from '@/components/GrifoBox.vue';


</script>

<template>
  <main>
    <div class="canvas">
      <AspiradoraBox class="grid-item"></AspiradoraBox>
      <CortinaBox class="grid-item"></CortinaBox>
      <GrifoBox class="grid-item"></GrifoBox>
    </div>
  </main>
</template>

<style scoped>

.canvas {
  width: 95%;
  margin-top: 3%;
  height: 2632px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%), rgba(233, 247, 242, 0.03);
  border-radius: 38px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap:  2%;
  padding: 2.5%;
}





</style>
