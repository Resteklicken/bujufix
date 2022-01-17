<template>
  <v-data-table
      :headers="headers"
      :items="students"
      sort-by="id"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
          color="orange lighten-3"
      >
        <v-toolbar-title>Schüler</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="orange darken-3"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon class="addIcon">mdi-plus</v-icon>
              Schüler hinzufügen
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-form v-model="isValid">
                      <v-text-field
                          label="Name"
                          v-model="editedItem.name"
                          :rules="[v => !!v || 'Erforderlich']"
                          required
                      ></v-text-field>
                    </v-form>
                  </v-col>
                </v-row>
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
import StudentService from "../services/StudentService";

export default {
  name: 'StudentOverview',
  data: () => ({
  dialog: false,
  dialogDelete: false,
  headers: [
    { text: 'Name', value: 'name' },
    { text: 'Aktionen', value: 'actions', sortable: false },

  ],
  students: [],
  isValid: true,
  editedIndex: -1,
  editedItem: {
    id: '',
    name: '',
  },
  defaultItem: {
      id: '',
      name: '',
    },
  }),
  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Neuer Schüler' : 'Schüler bearbeiten'
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
      this.students = (await StudentService.show(0)).data
    },
    editItem (item) {
      this.editedIndex = this.students.indexOf(item)
      item.id = this.students[this.editedIndex].id
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.students.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      //this.students.splice(this.editedIndex, 1)
      StudentService.deleteStudent(this.students[this.editedIndex])
        .then(() => {
          this.initialize()
          this.closeDelete()}
      ).catch((error) => {
        alert(error.response.data)
      })
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) {
        StudentService.editStudent(this.editedItem)
          .then(() => {
            this.initialize()
          }).catch((error) => {
          alert(error.response.data)
        })
      } else {
        StudentService.newStudent(this.editedItem)
          .then(() => {
            this.initialize()
            this.close()
          }).catch((error) => {
            alert(error.response.data)
        })
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addIcon {
  padding-right: 10px;
}
.löschen {
  word-break: normal; /* maybe !important  */
}
</style>
