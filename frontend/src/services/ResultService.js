import Api from './Api'

export default {

    show(number) {
        return Api().get(`results/show/${number}`, number)
    },

    newResult (result) {
        return Api().post('results/new', result)
    },

    editResult (result) {
        return Api().post(`results/edit/${result.id}`, result)
    },

    deleteResult (result) {
        return Api().delete(`results/delete/${result.id}`, result)
    }
}