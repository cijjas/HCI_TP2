

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
    <v-app-bar app clipped-left color="primary" height="100">


      <v-btn to="/" size="x-large" text color="transparent" style="padding-left: 40px;">
        <h1 class="font-weight-bold text-h4 nav-title">HomeHive</h1>
      </v-btn>


      <v-btn to="/Routines" variant="text">Routines</v-btn>
      <v-btn to="/Rooms" variant="text">Rooms</v-btn>
      <v-btn to="/About" variant="text">About</v-btn>
      <!-- Aca falta un for que recorra las habitaciones vivas -->

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn to="/AddRoom">Add Room</v-btn>
      <v-btn to="/AddRoutine">Add Routine</v-btn>
      <v-btn to="/AddDevice">Add Device</v-btn>


    </v-app-bar>


    <v-navigation-drawer 
      v-model="drawer" 
      app class="gradient-background" 
      expand-on-hover
        rail 
      image="https://i.imgur.com/Sa2BNdR.png"
      >
      
      <v-list>
        <v-list-item
            prepend-avatar="https://www.paperflodesigns.com/wp-content/uploads/2020/01/How-to-Draw-a-Bee-step-6.png"
            title="Gabor"
            subtitle="Chris' Home"
          ></v-list-item>
        </v-list>
        <v-list nav color="primary">
              <v-list-item to="/" prepend-icon="mdi-home" title="Home" value="myfiles" class='secondary'></v-list-item>
              <v-list-item to="/Rooms" prepend-icon="mdi-sofa" title="Rooms" value="shared"></v-list-item>
              <v-list-item to="/Routines" prepend-icon="mdi-list-box-outline" title="Routines" value="starred"></v-list-item>
              <v-list-item to="/Settings" prepend-icon="mdi-cog" title="Settings" value="starred"></v-list-item>
              <v-list-item to="/Contact" prepend-icon="mdi-account-box-outline" title="Contact" value="starred"></v-list-item>
              <v-list-item to="/About" prepend-icon="mdi-help-circle-outline" title="About" value="starred"></v-list-item>
              <v-list-item to="/Test" prepend-icon="mdi-account-cowboy-hat-outline" title="Test" value="test"></v-list-item>
        </v-list>
      
      </v-navigation-drawer>
      <!-- <v-main style="height: 250px"></v-main> -->
      
    </nav>
</template>

<style >
.blur-image {
    filter: blur(20px); /* Change the value as needed */
  }
.yellow-text {
  color: #EECC66;
}
.gradient-background {
  backdrop-filter: blur(80px);
  background: radial-gradient(at 20% 50%, rgb(16, 222, 123, 0.1), rgba(237, 217, 140, 0.1)),
    radial-gradient(at 80% 50%, rgba(25, 217, 130, 0.4), rgba(249, 201, 11, 0.1)),
    linear-gradient(to bottom, rgba(252, 235, 47, 0.2), rgba(26, 235, 214, 0.098));
  
  background-blend-mode: screen;
}


.nav-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  color: #EECC66;
}

nav a {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

/* New class for the v-app-bar element */
.app-bar-background {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
}
</style>