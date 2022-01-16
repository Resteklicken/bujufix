<template>
  <v-data-table
      dense
      :headers="headers"
      :items="students"
      hide-default-footer
      sort-by="name"
      class="elevation-1 datatable"
      items-per-page="3"
  >
    <template v-slot:top>
      <v-toolbar
          color="orange lighten-4"
      >
        <v-toolbar-title>Studenten</v-toolbar-title>
        <v-spacer></v-spacer>

      </v-toolbar>
    </template>
    <template v-slot:footer>
      <v-btn
          color="orange lighten-4"
          flat
          class="ma-1"
          :to="{
            name: 'students'
          }">
        Mehr anzeigen...
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import StudentService from "../services/StudentService";

export default {
  name: 'StudentShort',
  data: () => ({
    headers: [{ text: 'Name', value: 'name' }
    ],
    students: [],
  }),
  created () {
    this.initialize()
  },
  methods: {
    async initialize() {
      this.students = (await StudentService.show(3)).data
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
