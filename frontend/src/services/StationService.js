import Api from './Api'

export default {

    show(number) {
        return Api().get(`stations/show/${number}`, number)
    },

    newStation (station) {
        return Api().post('stations/new', station)
    },

    find (stationId) {
        return Api().get(`stations/find/${stationId}`, stationId)
    },

    editStation (station) {
        return Api().post(`stations/edit/${station.id}`, station)
    },

    deleteStation (station) {
        return Api().delete(`stations/delete/${station.id}`, station)
    }
}