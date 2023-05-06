// pagina para editar perfil

<script setup>
    import EditProfileBox from '../components/EditProfileBox.vue';
    import { reactive } from 'vue';
    import { ref, computed, defineProps, defineEmits } from 'vue'
    import { useAppStore } from '@/store/app';

    const store = useAppStore();

</script>

<template>
    <!-- <cComponent> -->
    <main>
        <div class="canvas">
            <v-card class="vcard">
                <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-secondary">Profile</v-card-title>
                <v-divider color="gris"></v-divider>
                <div class="text-center">
                <v-avatar size="175" class="mt-10">
                        <img src="https://media.npr.org/assets/img/2013/05/13/honeycomb-2_wide-49ae2c6ec87d4b4092881baf81e2de967926cba5-s1400-c100.jpg" alt="Profile Picture" />
                </v-avatar>
                <v-card-title class="text-h4 text-md-h5 text-lg-h4 font-weight-bold text-secondary mt-3">Gabor</v-card-title>
                <v-card-title class="text-h4 text-md-h5 text-sm font-weight-semi text-white">Chris' Home</v-card-title>
                </div>
                <v-card class="mb-4 mt-10 ml-5 mr-5" color="lightersecondary" elevation="0">
                    <v-card-text> 
                        <v-text-field label="Change User Name" v-model="tempRoomName" :placeholder="nameRoom"></v-text-field> 
                        <v-text-field label="Change House Name" v-model="tempRoomName" :placeholder="nameRoom"></v-text-field>
                        <div class="text-end">
                            <v-btn color="primary">Save Changes</v-btn>
                        </div>
                        
                    </v-card-text>
                </v-card>
                <div class="text-center">
                    <v-btn append-icon="mdi-camera" class="mb-5" color="secondary">Change Profile Picture</v-btn>
                </div>
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
