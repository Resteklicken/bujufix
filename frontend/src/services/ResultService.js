import Api from './Api'

export default {

    show(number) {
        return Api().get(`results/show/${number}`, number)
    },

    newResult (result) {
        return Api().post('results/new', result)
    },

    editResult (result) {
        return Api().post(`results/edit/${result.StudentId}&${result.StationId}`, result)
    },

    deleteResult (result) {
        return Api().delete(`results/delete/${result.StudentId}&${result.StationId}`, result)
    },

    findMax () {
        return Api().get('/winners/')
    },
}