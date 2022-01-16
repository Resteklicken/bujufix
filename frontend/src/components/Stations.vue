<template>
  <v-data-table
      dense
      :headers="headers"
      :items="stations"
      hide-default-footer
      sort-by="name"
      class="elevation-1 datatable"
      items-per-page="3"
  >
    <template v-slot:top>
      <v-toolbar
          color="blue lighten-4"
      >
        <v-toolbar-title>Stationen</v-toolbar-title>
        <v-spacer></v-spacer>

      </v-toolbar>
    </template>
    <template v-slot:footer>
      <v-btn
          color="blue lighten-4"
          flat
          class="ma-1"
          :to="{
            name: 'stations'
          }">
        Mehr anzeigen...
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import StationService from "../services/StationService";

export default {
  name: 'StationShort',
  data: () => ({
    headers: [{ text: 'Name', value: 'name' }
    ],
    stations: [],
  }),
  created () {
    this.initialize()
  },
  methods: {
    async initialize() {
      this.stations = (await StationService.show(3)).data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.datatable {
  border-style: solid;
  border-width: 1px;
  border-color: #b2abab;
}
</style>
