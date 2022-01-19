<template>
  <v-data-table
      :headers="headers"
      :items="results"
      sort-by="id"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
          color="green lighten-3"
      >
        <v-toolbar-title>Ergebnisse</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="green darken-3"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon class="addIcon pr-sm-3">mdi-plus</v-icon>
              <div v-if="$vuetify.breakpoint.smAndUp">Ergebnis hinzufügen</div>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form v-model="isValid" ref="form">
                <v-row>
                  <v-col
                      class="d-flex"
                      cols="12"
                      sm="6"
                  >
                    <v-select
                        :items="students"
                        v-model="editedItem.name"
                        item-text="name"
                        label="Schüler"
                        :rules="[v => Boolean(Object.keys(v || {})[0]) || 'Erforderlich']"
                        dense
                        outlined
                        required
                    ></v-select>
                  </v-col>
                  <v-col
                      class="d-flex"
                      cols="12"
                      sm="6"
                  >
                    <v-select
                        :items="stations"
                        v-model="editedItem.station"
                        item-text="name"
                        label="Station"
                        :rules="[v => Boolean(Object.keys(v || {})[0]) || 'Erforderlich']"
                        dense
                        outlined
                        required
                    ></v-select>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        id="score-field"
                        v-model="editedItem.score"
                        label="Ergebnis"
                        :rules="[v => !!v || 'Erforderlich']"
                        required
                        clearable
                    ></v-text-field>
                  </v-col>
                </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Abbrechen
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                  :disabled="!isValid"
              >
                Speichern
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5 löschen">Wollen Sie diesen Eintrag wirklich löschen?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Abbrechen</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
          color="primary"
          @click="initialize"
      >
        Neu laden
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import ResultService from "../services/ResultService";
import StationService from "../services/StationService";
import StudentService from "../services/StudentService";

export default {
  name: 'ResultOverview',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Schüler', value: 'name' },
      { text: 'Station', value: 'station' },
      { text: 'Ergebnis', value: 'score' },
      { text: 'Aktionen', value: 'actions', sortable: false },

    ],
    results: [],
    students: [],
    stations:[],
    isValid: true,
    editedIndex: -1,
    editedItem: {
      score: '',
      StudentId: '',
      StationId:'',
      name: '',
      station: ''
    },
    defaultItem: {
      score: '',
      StudentId: '',
      StationId:'',
      name: '',
      station: ''
    },
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Neues Ergebnis' : 'Ergebnis bearbeiten'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  created () {
    this.initialize()
  },
  methods: {
    async initialize () {
      try {
        let tempresults = (await ResultService.show(0)).data
        console.log(tempresults)
        for (const entry of tempresults) {
          entry.name = (await StudentService.find(entry.StudentId)).data.student.name
          entry.station = (await StationService.find(entry.StationId)).data.station.name
        }
        this.students = (await StudentService.show(0)).data
        this.stations = (await StationService.show(0)).data
        this.results = tempresults
      } catch(error) {
            console.log(error.response.data)
      }
    },
    editItem (item) {
      this.editedIndex = this.results.indexOf(item)
      item.StudentId = this.results[this.editedIndex].StudentId
      item.StationId = this.results[this.editedIndex].StationId
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.results.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      ResultService.deleteResult(this.results[this.editedIndex])
          .then(() => {
            this.initialize()
            this.closeDelete()}
          ).catch((error) => {
            alert(error.response.data)
            this.initialize()
      })
    },
    close () {
      this.dialog = false
      this.$refs.form.reset()
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$refs.form.reset()
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      let newElement = this.editedItem
      newElement.StationId = this.stationIDfromName(newElement.station)
      newElement.StudentId = this.studentIDfromName(newElement.name)
      newElement.score = newElement.score.replace(/,/g, '.')
      delete newElement.name
      delete newElement.station
      console.log(newElement)
      if (this.editedIndex > -1) {
        ResultService.editResult(newElement)
            .then(() => {
              this.initialize()
            }).catch((error) => {
              alert(error.response.data)
            })
      } else {
        ResultService.newResult(newElement)
            .then(() => {
              this.initialize()
            }).catch((error) => {
              alert(error.response.data)
            })
      }
      this.close()
    },
    stationIDfromName (name) {
      let temp = this.stations.find(i => i.name === name)
      return temp.id
    },
    studentIDfromName (name) {
      let temp = this.students.find(i => i.name === name)
      return temp.id
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.löschen {
  word-break: normal; /* maybe !important  */
}
</style>
