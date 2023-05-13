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
                  <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-bold text-secondary">Contact</v-card-title>
                  <v-divider color="gris"></v-divider>
                </v-row>
                <div class="text-center">
                <v-card-title class="text-h1 text-md-h1 text-lg-h3 font-weight-bold text-secondary mt-10 mb-10">Get in Touch with the Team!</v-card-title>
                
                <v-card class="mb-4 mt-30 ml-5 mr-5 text-white font-weight-bold " color="transparent" elevation="0">
                  <v-card-text>
                    Our E-Mails : <br><br>
                    
                 
                            <h3>jgirod@itba.edu.ar</h3> <br>
                      
                            <h3>flopezmenardi@itba.edu.ar</h3> <br>
                       
                            <h3>cijjas@itba.edu.ar</h3><br>
                        
                            <h3>ibengolea@itba.edu.ar</h3><br>
                    
                  </v-card-text>
                  <v-card-text>
                    We are always available, 24/7, so don't hesitate to get in contact with us in case you find ANY bug!
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
h3{
    color : #f4cf6d
}

</style>
