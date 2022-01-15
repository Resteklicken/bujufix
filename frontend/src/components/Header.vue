<template>
  <v-app-bar app class="cyan" dark dense>
    <v-app-bar-title class="mr-4">
      <router-link
          class="home"
          tag="span"
          :to="{
          name: 'home'
        }">
        Bujufix
      </router-link>
    </v-app-bar-title>

    <v-toolbar-items>
      <v-btn
          text
          dark
          :to="{name: 'students'}">
        Schüler
      </v-btn>
      <v-btn
          text
          dark
          :to="{
          name: 'stations'
        }">
        Stationen
      </v-btn>

      <v-btn
          text
          dark
          :to="{
          name: 'results'
        }">
        Ergebnisse
      </v-btn>
    </v-toolbar-items>
    <v-btn
        class="winners"
        text
        dark
        :to="{
          name: 'winners'
        }">
      Endergebnisse
      <v-icon
          class="trophyIcon"
      >
        mdi-trophy-outline
      </v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
          color="orange lighten-2"
          light
          onclick="window.location = 'http://localhost:8000/admin';">
        Admin
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>


<script>
export default {
  name: "Header"
}
</script>

<style scoped>

.home {
  cursor: pointer;
}
.home:hover {
  color: #E9E;
}
.winners {
  margin-left: 30px;
  padding: 7px;
  font-weight: bold;
  border-width: 2px;
  border-style: solid;
  border-radius: 5px;
  background-color: gold !important;
  color: black !important;
}

.trophyIcon {
  color: black !important;
  margin-left: 10px;
}
</style>