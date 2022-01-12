<template>
  <div id="app">
    <ShowPug msg="Welcome to Your BuJu App"/>
  </div>
</template>

<script>
import ShowPug from './components/ShowPug.vue'


export default {
  name: 'app',
  components: {
    ShowPug
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
