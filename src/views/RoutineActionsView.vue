// pagina de una rutina especifica (muestra sus acciones)
<script setup>
    import ActionBox from '../components/ActionBox.vue';
    import { onMounted } from '@vue/runtime-core';
    import { reactive } from 'vue';
    import { ref, computed, defineProps, defineEmits } from 'vue'
    import { useAppStore } from '@/store/app';
    import { useRoute } from 'vue-router'

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

    const store = useAppStore();
    const props = defineProps({
    routineId: {
        type: String,
        required: true,
    }
  });

   //uso el route para encontrar nombre de rutina -> uso nombre de rutina para conseguir ID y resto de los datos
  const route = useRoute();
  const routineName = route.params.routineName;

  const routine = computed(() => store.getARoutineByName(routineName));
  const actions = computed(() => store.getARoutineByName(routineName).actions)

</script>

<template>
    <main>
      <div class="canvas">
        <v-card class="vcard elevation-0" color="transparent">
          <v-row style="margin-top: 20px;">
            <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-secondary">{{routineName}}</v-card-title>
            <v-divider color="gris"></v-divider>
          </v-row>

          <v-row>
            <v-col>
              <v-row>
                <template v-for="action in actions">
                    <v-col xs="12" sm="6" md="4" lg="3" class="mt-5">
                        <ActionBox class="grid-item" :action="action" :routineId="routine.id"></ActionBox>
                    </v-col>
                </template>
              </v-row>
            </v-col>

          </v-row>
        </v-card>
      </div>
    </main>
</template>

<style scoped>
.vcard {
    border-radius: 8px;
}

</style>
