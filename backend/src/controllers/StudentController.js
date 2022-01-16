const {Student} = require('../models')

module.exports = {
    async newStudent (req, res) {
        try {
            const student = await Student.create(req.body)
            const studentJson = student.toJSON()
            res.send({
                student: studentJson,
            })
        } catch (err) {
            res.status(400).send({
                error: 'Beim Erstellen des Schülers trat ein Fehler auf.'
            })
        }
    },
    async showList (req, res) {
        try {
            let number = parseInt(req.params.number)
            let students = null;
            if (number > 0) {
                students = await Student.findAll({
                    limit: number
                })
            } else {
                students = await Student.findAll({})
            }
            res.send(students)
        } catch (err) {
            res.status(500).send({
                error: 'Beim Abrufen der Schüler trat ein Fehler auf.'
            })
        }
    },
    async edit (req, res) {
        try {
            await Student.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Beim Ändern des Schülers trat ein Fehler auf.'
            })
        }
    },

    async delete (req, res) {
        try {
            const studentID = req.params.id
            const student = await Student.findByPk(studentID)

            if (!student) {
                return res.status(403).send({
                    error: 'Der zu löschende Schüler konnte nicht gefunden werden.' + studentID
                })
            }
            await student.destroy()
            res.send(student)
        } catch (err) {
            res.status(500).send({
                error: 'Beim Löschen des Schülers trat ein Fehler auf.' + err

            })
        }
    }
}


