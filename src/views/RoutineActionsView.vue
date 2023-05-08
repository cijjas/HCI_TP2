// pagina de una rutina especifica (muestra sus acciones)
<script setup>
    import { reactive } from 'vue';
    import { ref, computed, defineProps, defineEmits } from 'vue'
    import { useAppStore } from '@/store/app';

    const store = useAppStore();
    const props = defineProps({
    routineId: {
        type: String,
        required: true,
    }
  });

    //usando el ID de la rutina, accedo al array de sus acciones
    const routineId = ref(props.routineId);
    const routineName = store.getARoutine(routineId.value).name;
    const actions = store.getARoutine(routineId.value).actions;

    
</script>

<template>
    <!-- <cComponent> -->
    <main>
        <div class="canvas">
            <v-card class="vcard">
                <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-secondary">{{routineName}}</v-card-title>
                <v-divider color="gris"></v-divider>
                
                <v-row justify-end>
                        <!-- iterar sobre array de actions de un cuarto -->
                        <v-col cols="5" v-for="action in actions">
                            <ActionBox class="grid-item" :device="action.device" :actionName="action.actionName" :params="action.params" :routineId="routineId"></ActionBox>
                        </v-col>

                </v-row>  
            </v-card>
        </div>
    </main>
</template>

<style scoped>

.canvas {
  width: 95%;
  height: 2632px;
  background: primary;
  border-radius: 38px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap:  2%;
  padding: 2.5%;
}

.vcard {
    border-radius: 8px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%), rgba(233, 247, 242, 0.03);
}

</style>
