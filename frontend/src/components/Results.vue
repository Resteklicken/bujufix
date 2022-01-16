<template>
  <v-data-table
      dense
      :headers="headers"
      :items="results"
      hide-default-footer
      sort-by="Student"
      class="elevation-1 datatable"
      items-per-page="3"
  >
    <template v-slot:top>
      <v-toolbar
          color="green lighten-4"
      >
        <v-toolbar-title>Ergebnisse</v-toolbar-title>
        <v-spacer></v-spacer>

      </v-toolbar>
    </template>
    <template v-slot:footer>
      <v-btn
          color="green lighten-4"
          flat
          class="ma-1"
          :to="{
            name: 'results'
          }">
        Mehr anzeigen...
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import ResultService from "../services/ResultService";
import StudentService from "../services/StudentService";
import StationService from "../services/StationService";

export default {
  name: 'ResultShort',
  data: () => ({
    headers: [
    { text: 'Schüler', value: 'name' },
    { text: 'Station', value: 'station' },
    { text: 'Ergebnis', value: 'score' },
    ],
    results: [],
  }),
  created () {
    this.initialize()
  },
  methods: {
    async initialize() {
      try {
        let tempresults = (await ResultService.show(0)).data
        for (const entry of tempresults) {
          entry.name = (await StudentService.find(entry.StudentId)).data.student.name
          entry.station = (await StationService.find(entry.StationId)).data.station.name
        }
        this.results = tempresults
      } catch (error) {
        console.log(error.response.data)
      }
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
