<template>
  <div>
  <v-app-bar app class="cyan" dark dense>
    <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" @click="drawer = true">
    </v-app-bar-nav-icon>
    <v-app-bar-title class="mr-4" v-if="$vuetify.breakpoint.mdAndUp || $vuetify.breakpoint.smAndDown">
      <router-link
          class="home"
          tag="span"
          :to="{
          name: 'home'
        }">
        Bujufix
      </router-link>
    </v-app-bar-title>

    <v-toolbar-items v-if="$vuetify.breakpoint.smAndUp">
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
        }"
        v-if="$vuetify.breakpoint.smAndUp">
      <div id="auswertung" v-if="$vuetify.breakpoint.mdAndUp">Auswertung</div>
      <v-icon
          class="trophyIcon ml-md-3"
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
  <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
  >
    <v-list
        nav
        dense
    >
      <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
      >
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Account</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
    </div>
</template>


<script>
export default {
  name: "Header",
  data: () => ({
    drawer: false,
    group: null,
  }),
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
}
</style>