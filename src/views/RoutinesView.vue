<script setup>
    import RoutinesBox from '../components/RoutinesBox.vue';
    import { reactive } from 'vue';
    import { onMounted } from '@vue/runtime-core';
    import { ref, computed, defineProps, defineEmits } from 'vue'
    import { useAppStore } from '@/store/app';

    const store = useAppStore();

    onMounted(async () => {             // cuando se monta la pagina pido los datos
    try {
    // pido el update de los datos
    await store.getAllRoomsAPI();
    } catch (error) {
    console.error(error);
    }
    }); 
</script>

<template>
    <main>
        <v-card class="vcard elevation-0" color="transparent">
            <v-row style="margin-top: 20px;">
                <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-secondary">Routines</v-card-title>
                <v-divider color="gris"></v-divider>
            </v-row>
            
            <v-row justify-end>
                <!-- <RoutinesBox class="grid-item" :routineName="routine.name" :actionsCount="routine.actions.length"></RoutinesBox> -->
                    <v-col cols="5" v-for="routine in store.getAllRoutines()">
                        <RoutinesBox class="grid-item" :routineName="routine.name" :routineId="routine.id"></RoutinesBox>
                    </v-col>
            </v-row>  
        </v-card>
    </main>
</template>


<style scoped>


.vcard {
    border-radius: 8px;
    /* background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%), rgba(233, 247, 242, 0.03); */
}

</style>
