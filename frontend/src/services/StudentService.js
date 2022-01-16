import Api from './Api'

export default {

    show(number) {
        return Api().get(`students/show/${number}`, number)
    },

    newStudent (student) {
        return Api().post('students/new', student)
    },

    find (studentId) {
        return Api().get(`students/find/${studentId}`, studentId)
    },

    editStudent (student) {
        return Api().post(`students/edit/${student.id}`, student)
    },

    deleteStudent (student) {
        return Api().delete(`students/delete/${student.id}`, student)
    }
}