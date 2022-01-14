import Api from '/services/Api'

export default {
    showPug(message) {
        return Api().post('showPug', message)
    }
}
