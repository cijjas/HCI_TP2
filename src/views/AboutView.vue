// About page

<script setup>
    import { reactive } from 'vue';
    import { ref, computed, defineProps, defineEmits } from 'vue'
    import { useAppStore } from '@/store/app';

    const store = useAppStore();

</script>

<template>
    <!-- <cComponent> -->
    <main>
        <div class="canvas">
            <v-card class="vcard elevation-0" color="transparent">
                <v-row style="margin-top: 20px;">
                  <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-secondary">About Us</v-card-title>
                  <v-divider color="gris"></v-divider>
                </v-row>
                <div class="text-center">
                <v-card-title class="text-h1 text-md-h1 text-lg-h3 font-weight-bold text-secondary mt-10 mb-10">Welcome to HomeHive,</v-card-title>
                
                <v-card class="mb-4 mt-30 ml-5 mr-5 text-white font-weight-bold " color="transparent" elevation="0">
                  <v-card-text>
                    the centralized platform for managing your smart home. Our website is designed to 
                    simplify the management of your smart devices, so you can control everything from one 
                    convenient location. With HomeHive, you can easily create rooms, automate routines, 
                    and control your smart devices with ease. Whether you're at home or on the go, 
                    HomeHive makes managing your smart home effortless.
                  </v-card-text>
                  <v-card-text>
                    If you have any questions or concerns, please don't hesitate to get in touch with us. 
                    Our customer support team is here to help you with anything you need. You can 
                    contact us via email at:
                  </v-card-text>
                    <v-card-text class="text-secondary">
                      support@homehive.com
                    </v-card-text>
                    <v-card-text>
                      {{store.rooms}}<br><br>
                      {{ store.devices}}
                    </v-card-text>
                  
                </v-card>

                <v-card-title class="text-h1 text-md-h1 text-lg-h4 font-weight-bold text-secondary mt-10 mb-10">Thank you for choosing HomeHive!</v-card-title>

              </div>
            </v-card>
        </div>
    </main>
</template>


<style scoped>


.vcard {
    border-radius: 8px;

    /* background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%), rgba(233, 247, 242, 0.03); */
}

</style>
