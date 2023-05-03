

<script>

export default {
  data() {
    return {
      drawer: false
    }
  }
}
</script>

<template>
  <nav>
    <v-app-bar app clipped-left color="primary">
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"><img src="../../public/hamburgerMenu.png" alt=""></v-app-bar-nav-icon>
      <v-btn to="/">HomeHive</v-btn>
      <v-spacer></v-spacer>

      <v-btn to="/Routines">Routines</v-btn>
      <v-btn to="/Scenes">Scenes</v-btn>
      <v-btn to="/About">About</v-btn>
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

    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="primary" color="gris">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Pepe </v-list-item-title>
          <v-list-item-subtitle> Marta's Home</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list dense nav>

        <v-list-item-content>
          <v-icon icon="mdi-home" color="white"></v-icon>
          <v-icon icon="mdi-heart"></v-icon>
          <v-list-item-title> Home </v-list-item-title>
          <v-list-item-title> Rooms </v-list-item-title>
        </v-list-item-content>



        <!--
          <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        -->


      </v-list>

      <span>LAALA</span>
    </v-navigation-drawer>
  </nav>


</template>


<style>

nav a {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

</style>


