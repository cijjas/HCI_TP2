<script setup>
import Box from '../components/Box.vue';
import AspiradoraBox from '../components/AspiradoraBox.vue';
import CortinaBox from '@/components/CortinaBox.vue';


</script>

<template>
  <main>
    <div class="canvas">
      <AspiradoraBox class="grid-item"></AspiradoraBox>
      <CortinaBox class="grid-item"></CortinaBox>

    </div>
  </main>
</template>

<style scoped>


.canvas{
  width: 95%;
  margin-top: 3%;
  height: 2632px; /* debe dejar de ser fijo esto */
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%), rgba(233, 247, 242, 0.03);
  border-radius: 38px;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto ;
  padding: 2.5%;

}



</style>
