<script setup>
    import ProfileBox from '../components/ProfileBox.vue';
    import SettingsBox from '../components/SettingsBox.vue';
</script>

<template>
    <!-- <cComponent> -->
    <main>
        <div class="canvas">
            <v-card class="vcard elevation-0" color="transparent">
                <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-secondary">Settings</v-card-title>
                <v-divider color="gris"></v-divider>
                
                <v-row justify-end>
                    <v-col cols="3">
                        <ProfileBox class="grid-item"></ProfileBox>
                    </v-col>
                    
                    <v-col cols="8">
                        <SettingsBox class="grid-item"></SettingsBox>
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
  /* background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%), rgba(233, 247, 242, 0.03); */
  border-radius: 38px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap:  2%;
  padding: 2.5%;
}

.vcard {
    border-radius: 8px;
    /* background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%), rgba(233, 247, 242, 0.03); */
}

</style>
