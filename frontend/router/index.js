import Vue from 'vue'
import Router from 'vue-router'
import ShowPug from "../src/components/ShowPug";
import Home from "../src/components/Home";
import ResultOverview from "../src/components/ResultOverview";
import StudentOverview from "../src/components/StudentOverview";
import StationOverview from "../src/components/StationOverview";
import EditEntry from "../src/components/EditEntry";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/pug',
            name: 'showPug',
            component: ShowPug
        },
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/results',
            name: 'results',
            component: ResultOverview
        },
        {
            path: '/students',
            name: 'students',
            component: StudentOverview
        },
        {
            path: '/stations',
            name: 'stations',
            component: StationOverview
        },
        {
            path: '/edit',
            name: 'edit',
            component: EditEntry
        },
    ]
})