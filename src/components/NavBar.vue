

<script >

export default {
  data() {
    return {
      drawer: true
    }
  }
}
</script>

<template>
  <nav>
    <v-app-bar app   height="100"  style="background-image: url('https://i.imgur.com/Q96xVwS.png'); background-size: cover; color: whitesmoke">
      <v-row justify="space-between">
        <v-col cols="6">
          <v-btn to="/" size="x-large" text color="transparent" style="padding-left: 40px;">
            <h1 class="font-weight-bold text-h4 nav-title">HomeHive</h1>
          </v-btn>
  
  
          <v-btn to="/Rooms" variant="text" class="nav-btn">Rooms</v-btn>
          <v-btn to="/Routines" variant="text" class="nav-btn">Routines</v-btn>
          <v-btn to="/About" variant="text" class="nav-btn">About</v-btn>
          <!-- Aca falta un for que recorra las habitaciones vivas -->

        </v-col>
        <v-col cols="4">
          <v-btn to="/AddRoom" class="nav-btn">Add Room</v-btn>
          <v-btn to="/AddRoutine" class="nav-btn">Add Routine</v-btn>
          <v-btn to="/AddDevice" class="nav-btn">Add Device</v-btn>

        </v-col>
      </v-row>

    </v-app-bar>

    <!-- image="https://i.imgur.com/Sa2BNdR.png"  -->
    <v-navigation-drawer 
      v-model="drawer" 
      app class="normal" 
      expand-on-hover
      rail 
      image='./ComponentsAssets/nav.png'

      >
      
      <v-list>
        <v-list-item
            prepend-avatar="https://www.paperflodesigns.com/wp-content/uploads/2020/01/How-to-Draw-a-Bee-step-6.png"
            title="Gabor"
            subtitle="Chris' Home"
          ></v-list-item>
        </v-list>
        <v-list nav color="primary">
              <v-list-item to="/" class="side-btn">
                <template v-slot:prepend>
                  <v-icon class="green-text" size="24">mdi-home</v-icon>
                </template>
                <span>Home</span>
              </v-list-item>
              <v-list-item to="/Rooms" class="side-btn">
                <template v-slot:prepend>
                  <v-icon class="green-text" size="24">mdi-sofa</v-icon>
                </template>
                <span>Rooms</span>
              </v-list-item>
              <v-list-item to="/Routines" class="side-btn">
                <template v-slot:prepend>
                  <v-icon class="green-text" size="24">mdi-list-box-outline</v-icon>
                </template>
                <span>Routines</span>
              </v-list-item>
              <v-list-item to="/Settings" class="side-btn">
                <template v-slot:prepend>
                  <v-icon class="green-text" size="24">mdi-cog</v-icon>
                </template>
                <span>Settings</span>
              </v-list-item>
              <v-list-item to="/Contact" class="side-btn">
                <template v-slot:prepend>
                  <v-icon class="green-text" size="24">mdi-account-box-outline</v-icon>
                </template>
                <span>Contact</span>
              </v-list-item>
              <v-list-item to="/About" class="side-btn">
                <template v-slot:prepend>
                  <v-icon class="green-text" size="24">mdi-help-circle-outline</v-icon>
                </template>
                <span>About</span>
              </v-list-item>
              <v-list-item to="/Test" class="side-btn">
                <template v-slot:prepend>
                  <v-icon class="green-text" size="24">mdi-account-cowboy-hat-outline</v-icon>
                </template>
                <span>Test</span>
              </v-list-item>
              <v-list-item to="/CreationView" class="side-btn">
                <template v-slot:prepend>
                  <v-icon class="green-text" size="24">mdi-close</v-icon>
                </template>
                <span>Test</span>
              </v-list-item>
        </v-list>
      
      </v-navigation-drawer>
      <!-- <v-main style="height: 250px"></v-main> -->
      
    </nav>
</template>

<style >

.nav-btn {
  margin: 10px;
  transition: all .2s ease-in-out;

}
.nav-btn:hover {
  transition: transform 0.3s ease-out;
  transform: scale(1.1);
  color: #F4CF6D;
}

.nav-btn:focus {
  transition: transform 0.3s ease-out;
  transform: scale(1.1);
  color: #F4CF6D !important;
  background-color: transparent;
  outline: none;
}

.side-btn {
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: all .2s ease-in-out;
  color: black; /* default color */
}

.side-btn:hover {
  transition: transform 0.3s ease-out;
  transform: scale(1.01);
  color: #054619; /* new color on hover */
}
.side-btn:focus {
  transition: transform 0.3s ease-out;
  transform: scale(1.1);
  color: #054619; /* new color on hover */
  background-color: transparent;
  outline: none;
}
.yellow-text {
  color: #F4CF6D;
}
.green-text {
  color: #054619;
}

.nav-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  color: #F4CF6D;
}

nav a {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 0.25rem;
}


</style>