import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/Home";
import StationsDetails from "../components/StationsDetails";
import StudentsDetails from "../components/StudentsDetails";
import ResultsDetails from "../components/ResultsDetails";
import Winners from "../components/Winners";

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
            component: ResultsDetails
        },
        {
            path: '/students',
            name: 'students',
            component: StudentsDetails
        },
        {
            path: '/stations',
            name: 'stations',
            component: StationsDetails
        },
        {
            path: '/winners',
            name: 'winners',
            component: Winners
        },
    ]
})