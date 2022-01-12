import Vue from 'vue'
import Router from 'vue-router'
import ShowPug from "../src/components/ShowPug";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'showPug',
            component: ShowPug
        }
    ]
})