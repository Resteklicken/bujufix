import Vue from 'vue';
import App from './App.vue'
import router from "./router"
import Vuetify from "vuetify"
import Panel from "./components/Panel.vue"
import '../node_modules/vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'


Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.component('panel', Panel)

/*
Vue({
  render: h => h(App),
}).$mount('#app')*/

/*
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
*/

new Vue({
  el: '#app',
  router,
  vuetify: new Vuetify({icons: {
      iconfont: 'mdi',
    },}),
  render: h => h(App)
})
