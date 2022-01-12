<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <img v-if="!isHidden" id="cutepug" src="../assets/pug.jpg" style="position: center"/>
    <br>
    <button @click="showPug">Do you want to see a pug?</button>
  </div>
</template>

<script>
import Pug from '/services/Pug'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => ({
    isHidden: true
  }),
  methods: {
    showPug() {
      this.isHidden = !this.isHidden
      console.log("Show me the cuties!")
      Pug.showPug("Hi there!")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
