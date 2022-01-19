<template>
  <v-container fluid>
    <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
            light
            color="yellow darken-1"
            class="mb-1"
        >
          <v-toolbar-title>Beste Ergebnisse nach Station</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
              v-model="search"
              clearable
              solo
              color="black"
              background-color="yellow"
              flat
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Suchen"
              class="md-6"
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
              v-for="item in props.items"
              :key="item[0].Station"
              cols="12"
              sm="6"
              md="4"
              lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold yellow accent-5">
                {{ item[0].Station }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list v-for="(entry, pos) in item" :key="entry.Schüler">
                <v-list-item
                    v-for="(key, index) in filteredKeys"
                    :key="index"
                >
                  <v-list-item-content :class="{ 'blue--text': sortBy === key }" class="font-weight-medium">
                    {{ key }}:
                  </v-list-item-content>
                  <v-spacer></v-spacer>
                  <v-list-item-content
                      class="align-end font-weight-black"
                      :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ entry[key] }}
                  </v-list-item-content>
                </v-list-item>
                <v-divider v-if="pos < item.length - 1"></v-divider>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row
            class="mt-2"
            align="center"
            justify="center"
        >
          <span class="grey--text">Einträge pro Seite</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  dark
                  text
                  color="black"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
              class="mr-4
            grey--text"
          >
            Seite {{ page }} von {{ numberOfPages }}
          </span>
          <v-btn
              fab
              light
              color="yellow"
              class="mr-1"
              @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
              fab
              light
              color="yellow"
              class="ml-1"
              @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>

import ResultService from "../services/ResultService";
import StudentService from "../services/StudentService";
import StationService from "../services/StationService";

export default {
  name: "Winners",
  data () {
    return {
      itemsPerPageArray: [1, 2, 4, 8],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'name',
      keys: [
        'Station',
        'Schüler',
        'Ergebnis',
      ],
      items: [
      ],
      results: [],
      students: [],
      stations:[],
    }
  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== 'Station')
    },
    bestScores () {
      let bestScores = []
      for (const entry of this.stations) {
        let relevantResults = this.results.filter(obj => {
          return entry.id === obj.StationId
        })
        if (relevantResults.length > 0) {
          let maxScore = relevantResults.reduce((a,b)=> parseInt(a.score)>parseInt(b.score)?a:b).score
          if (maxScore) {
            let newEntries = this.results.filter(obj => (entry.id === obj.StationId) && (obj.score === maxScore))
            if (newEntries.length > 0) {
              bestScores = [...bestScores, newEntries]
            }
          }
        }
      }
      return bestScores
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      try {
        this.results = (await ResultService.show(0)).data
        this.students = (await StudentService.show(0)).data
        this.stations = (await StationService.show(0)).data
        for (const entry of this.results) {
          entry.Schüler = this.students.find(obj => {
            return obj.id === entry.StudentId
          }).name
          entry.Station = this.stations.find(obj => {
            return obj.id === entry.StationId
          }).name
          entry.Ergebnis = entry.score
        }
        this.items = this.bestScores;
        console.log(this.items)
      } catch(error) {
        if (error.response) {
          console.log(error.response.data)
        } else {
          console.log(error)
        }
      }
    },
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },
  },
}
</script>

<style scoped>

</style>