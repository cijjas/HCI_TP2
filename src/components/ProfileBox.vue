<template>
    <v-col cols="12">
      <v-card class="profile-card">
        <v-card-text class="profile-info">
          <v-avatar size="100">
            <img src="https://www.paperflodesigns.com/wp-content/uploads/2020/01/How-to-Draw-a-Bee-step-6.png" alt="Profile Picture" />
          </v-avatar>
          <div class="profile-name">Gabor</div>
          <div class="profile-subtitle">Chris' Home</div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text>Edit Profile</v-btn>
          <v-btn color="primary" text>Manage Account</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </template>


<!-- <template>

    <v-col cols="12">
        <v-card :class="{'bg-on': isOn, 'bg-off': !isOn}" class="toggle-card" @click="toggleCard">
            <v-list>
            <v-list-item
                prepend-avatar="https://www.paperflodesigns.com/wp-content/uploads/2020/01/How-to-Draw-a-Bee-step-6.png"
                title="Gabor"
                subtitle="Chris' Home"
            ></v-list-item>
            </v-list>
            
            <div> Edit Profile </div>

        </v-card>
        
    </v-col> 
  </template> -->
  
  <script>
  export default {
    data() {
      return {
        isOn: false,
        switchValue: true,
        buttonColor: 'primary',
        titleColor: 'secondary',
        aspiradoraText: 'Aspiradora',
        trapeadoraText: 'Trapear',
      }
    },
    methods: {
      toggleCard() {
        /* IR A ASPIRADORA */ 
      },
    }
  }
  </script>
  
  <style scoped>
  .profile-card {
  text-align: center;
}

.profile-info {
  margin-bottom: 16px;
}

.profile-name {
  font-size: 24px;
  font-weight: bold;
}

.profile-subtitle {
  font-size: 16px;
  color: grey;
}
  </style>
  