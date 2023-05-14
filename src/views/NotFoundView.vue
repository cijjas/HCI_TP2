<script setup>

</script>

<template>
    <main>
        <v-card class="err" >

            <v-card-title class="mt-16 ml-8 font-weight-bold text-h2 card-title">404</v-card-title>
            <v-card-text class=" ml-8">Page not found</v-card-text>
            <v-card-actions class="actions-style" style="height: 150px">
                <v-btn color="primary" text to="/">Back To Home</v-btn>
            </v-card-actions>

        </v-card>
    </main>
</template> 

<style scoped>
.err{
    background-image: url('@/components/ComponentsAssets/background-long.png'); 
    background-position-y: -100px;
    background-position-x: -100px;
    height: 500px; 
    width: 500px; 
    margin: 100px; 
    margin-left: 600px; 
    border-radius: 30px
}
.actions-style {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color:#ee6161;
    
  }
</style>
