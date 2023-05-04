<template>
    <v-col cols="4">
      <div class="custom-card-section">
        <v-card-subtitle class="text-h9 text-md-h5 text-lg-h8 font-weight-bold text-secondary">Preferences</v-card-subtitle>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="gris" text>Notifications</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn color="gris" text>Wi-Fi</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn color="gris" text>Language</v-btn>
        </v-card-actions>

        <v-card-subtitle class="text-h9 text-md-h5 text-lg-h8 font-weight-bold text-secondary">Privacy</v-card-subtitle>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="gris" text>Location Services</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn color="gris" text>Permissions</v-btn>
        </v-card-actions>
        <v-btn class="small-button" color="gris" text>Log Out</v-btn> 
      </div>
    </v-col>



  </template>

  
  <script>
  
  </script>
  
  <style scoped>
  .profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
    .custom-card-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
}

.custom-card-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  margin-left: 20px; /* Adjust this value as needed */
}


.text-primary {
    color: secondary;
}

.text-secondary {
    color: gris;
    margin-top: 20px;
}

.small-button {
  padding: 5px 8px;
  margin-top: 30px;
  margin-left: 17px;
  font-size: 12px;
  border-radius: 4px;
}
  </style>
  