const {Student} = require('../models')

module.exports = {
    async newStudent (req, res) {
        try {
            await Student.create(req.body)
            res.send(200, 'Der Schüler wurde erfolgreich erstellt.')
        } catch (err) {
            res.send(500, 'Beim Erstellen des Schülers trat ein Fehler auf.')
        }
    },
    async showList (req, res) {
        try {
            let number = parseInt(req.params.number)
            let students = null;
            if (number > 0) {
                students = await Student.findAll({
                    limit: number,
                    attributes: ['id', 'name']
                })
            } else {
                students = await Student.findAll({
                    attributes: ['id', 'name']
                })
            }
            res.status(200).send(students)
        } catch (err) {
            res.send(500, 'Beim Abrufen der Schüler trat ein Fehler auf.')
        }
    },

    async find (req, res) {
        try {
            const studentID = req.params.id
            const student = await Student.findOne({
                where: {
                    id: studentID,
                },
                attributes: ['id', 'name']
            })

            if (!student) {
                res.send(403, 'Der Schüler konnte nicht gefunden werden.')
            }

            res.status(200).send({
                student
            })
        } catch (err) {
            res.send(500, 'Beim Finden des Schülers trat ein Fehler auf.')
        }
    },

    async edit (req, res) {
        try {
            await Student.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.send(200, 'Schüler erfolgreich bearbeitet.')
        } catch (err) {
            res.send(500, 'Beim Bearbeiten des Schülers trat ein Fehler auf.')
        }
    },

    async delete (req, res) {
        try {
            const studentID = req.params.id
            const student = await Student.findByPk(studentID)

            if (!student) {
                res.send(403, 'Der zu löschende Schüler konnte nicht gefunden werden.')
            }
            await student.destroy()
            res.send(200, 'Schüler erfolgreich gelöscht.')
        } catch (err) {
            res.send(500, 'Beim Löschen des Schülers trat ein Fehler auf.')
        }
    }
}


