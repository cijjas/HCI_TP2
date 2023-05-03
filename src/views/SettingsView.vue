<script setup>
    import ProfileBox from '../components/ProfileBox.vue';
</script>

<template>
    <!-- <cComponent> -->
    <v-card>

        <v-row justify-end>

        <v-col cols="3">
            <ProfileBox class="grid-item"></ProfileBox>
            <!-- <v-list>
                <v-list-item
                    prepend-avatar="https://www.paperflodesigns.com/wp-content/uploads/2020/01/How-to-Draw-a-Bee-step-6.png"
                    title="Gabor"
                    subtitle="Chris' Home"
                ></v-list-item>
                <v-list-item title="EditProfile"></v-list-item>
                <v-list-item title="ManageAccount"></v-list-item>

            </v-list> -->
        </v-col>

        <v-col cols="6">
            <v-list>

                <v-list-item title="EditProfile"></v-list-item>
                <v-list-item title="ManageAccount"></v-list-item>
                <v-list-item title="ManageAccount"></v-list-item>
                <v-list-item title="ManageAccount"></v-list-item>
                <v-list-item title="ManageAccount"></v-list-item>
                <v-list-item title="ManageAccount"></v-list-item>


            </v-list>
        </v-col>

    </v-row>
    </v-card>



</template>

<style scoped>

</style>
