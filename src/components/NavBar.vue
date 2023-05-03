

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

      <v-card color="gris">
        <v-list>
          <v-list-item
            prepend-avatar="https://www.paperflodesigns.com/wp-content/uploads/2020/01/How-to-Draw-a-Bee-step-6.png"
            title="Gabor"
            subtitle="Chris' Home"
          ></v-list-item>
        </v-list>
        <v-list density="compact" nav>
              <v-list-item to="/" prepend-icon="mdi-home" title="Home" value="myfiles"></v-list-item>
              <v-list-item to="/Rooms" prepend-icon="mdi-sofa-outlines" title="Rooms" value="shared"></v-list-item>
              <v-list-item to="/Routines" prepend-icon="mdi-list-box-outline" title="Routines" value="starred"></v-list-item>
              <v-list-item to="/Settings" prepend-icon="mdi-cog" title="Settings" value="starred"></v-list-item>
              <v-list-item to="/Contact" prepend-icon="mdi-account-box-outline" title="Contact" value="starred"></v-list-item>
              <v-list-item to="/Help" prepend-icon="mdi-help-circle-outline" title="Help" value="starred"></v-list-item>

            </v-list>
      </v-card>
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


