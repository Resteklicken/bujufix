<template>
  <v-layout column>
    <v-flex xs6 >
      <panel title="Übersicht">
        <Students/>
        <br>
        <Stations/>
        <br>
        <Results/>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Stations from "./Stations";
import Students from "./Students";
import Results from "./Results";
export default {
  name: 'Home',
  components: {Stations, Students, Results},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
