<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Übersicht">
        <form
            name="tab-tracker-form"
            autocomplete="off">
          <v-text-field
              label="Email"
          ></v-text-field>
          <br>
          <v-text-field
              label="Password"
              type="password"
              autocomplete="new-password"
          ></v-text-field>
        </form>
        <br>
        <StudentOverview/>
        <StationOverview/>
        <ResultOverview/>
        <div class="danger-alert"/>
        <br>
        <v-btn
            dark
            class="cyan">
          Register
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import ResultOverview from "./ResultOverview";
import StudentOverview from "./StudentOverview";
import StationOverview from "./StationOverview";
export default {
  name: 'Home',
  components: {StationOverview, StudentOverview, ResultOverview},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
