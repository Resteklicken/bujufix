<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <router-link
          class="home"
          tag="span"
          :to="{
          name: 'songs'
        }">
        TabTracker
      </router-link>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn
          text
          dark
          :to="{
          name: 'stations'
        }">
        Stationen
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
          text
          dark
          onclick="window.location = 'http://localhost:8000/admin';">
        Admin
      </v-btn>

      <v-btn
          text
          dark
          :to="{
          name: 'results'
        }">
        Results
      </v-btn>

      <v-btn
          text
          dark
          :to="{name: 'students'}">
        Schüler
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
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
</style>