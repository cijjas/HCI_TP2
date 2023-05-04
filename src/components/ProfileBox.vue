<template>
    <v-col cols="12">
      <div class="profile-container">
        <v-card class="profile-card" color="secondary">
          <v-card-text class="profile-info">
            <v-avatar size="175">
              <img src="https://media.npr.org/assets/img/2013/05/13/honeycomb-2_wide-49ae2c6ec87d4b4092881baf81e2de967926cba5-s1400-c100.jpg" alt="Profile Picture" />
            </v-avatar>
            <div class="profile-name">Gabor</div>
            <div class="profile-subtitle">Chris' Home</div>
          </v-card-text>
        </v-card>
        <v-card-actions>
          <v-btn color="gris" text>Edit Profile</v-btn>
          <v-btn color="gris" text>Manage Account</v-btn>
        </v-card-actions>
      </div>
    </v-col>
  </template>

  
  <script>
  </script>
  
  <style scoped>
  .profile-card {
  text-align: center;
}
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-info {
  margin-bottom: 16px;
  margin-left: 40px;
  margin-right: 40px;
}

.profile-name {
  margin-top: 20px;
  font-size: 30px;
  font-weight: bold;
}

.profile-subtitle {
  margin-top: 10px;
  font-size: 16px;
  color: grey;
}
  </style>
  