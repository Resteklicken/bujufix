import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/Home";
import ResultOverview from "../components/ResultOverview";
import StudentOverview from "../components/StudentOverview";
import StationOverview from "../components/StationOverview";
import EditEntry from "../components/EditEntry";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: "home"
        },
        {
            path: '/home',
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