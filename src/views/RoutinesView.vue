<script setup>
    import RoutinesBox from '../components/RoutinesBox.vue';
    import { reactive } from 'vue';
    import { onMounted } from '@vue/runtime-core';
    import { ref, computed, defineProps, defineEmits } from 'vue'
    import { useAppStore } from '@/store/app';
    import AddRoutineCard from '@/components/CreationComponents/AddRoutineCard.vue'

    const store = useAppStore();

    onMounted(async () => {             // cuando se monta la pagina pido los datos
    try {
    // pido el update de los datos
        await store.getAllRoomsAPI();
        await store.getAllDevicesAPI();
        await store.getAllRoutinesAPI();
    } catch (error) {
    console.error(error);
    }
    }); 
</script>

<template>
    <main>
      <div class="canvas">
        <v-card class="vcard elevation-0" color="transparent">
          <v-row style="margin-top: 20px;">
            <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-secondary">Routines</v-card-title>
            <v-divider color="gris"></v-divider>
          </v-row>
        
          <v-row>
            <v-col md="6" class="mt-5">
              <AddRoutineCard></AddRoutineCard>
            </v-col>
  
            
            <v-col md="6">
              <v-row>
                <template v-for="(routine, index) in store.getAllRoutines()">
                  <template v-if="index < 4">
                    <v-col xs="12" sm="12" md="6" lg="6" class="mt-5">
                        <RoutinesBox :routineName="routine.name" :routineId="routine.id" :actionsCount="routine.actions.length"></RoutinesBox>
                    </v-col>
                  </template>
                </template>
              </v-row>
            </v-col>
  
            <v-col>
              <v-row>
                <template v-for="(routine, index) in store.getAllRoutines()">
                  <template v-if="index >= 4">
                    <v-col xs="12" sm="6" md="4" lg="3" class="mt-5">
                        <RoutinesBox :routineName="routine.name" :routineId="routine.id" :actionsCount="routine.actions.length"></RoutinesBox>
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
