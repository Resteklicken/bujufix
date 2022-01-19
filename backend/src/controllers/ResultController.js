const {Result, Student, Station, Sequelize} = require('../models')


module.exports = {
    async newResult (req, res) {
        try {
            const result = await Result.create(req.body)
            res.send(200, "Das Ergebnis wurde erfolgreich erstellt")
        } catch (err) {
            res.send(500, 'Beim Erstellen des Ergebnisses trat ein Fehler auf.')
        }
    },

    async showList (req, res) {
        try {
            let number = parseInt(req.params.number)
            let results = null;
            if (number > 0) {
                results = await Result.findAll({
                    limit: number,
                    attributes: ['StudentId', 'StationId', 'score'],
                })
            } else {
                results = await Result.findAll({
                    attributes: ['StudentId', 'StationId', 'score'],
                })
            }
            res.send(results)
        } catch (err) {
            res.send(500, 'Beim Abrufen des Ergebnisses trat ein Fehler auf.')
        }
    },
    async edit (req, res) {
        try {
            await Result.update(req.body, {
                where: {
                    StudentId: req.params.studentid,
                    StationId: req.params.stationid
                }
            })
            res.send(req.body)
        } catch (err) {
            res.send(500, 'Beim Ändern des Ergebnisses trat ein Fehler auf.')
        }
    },

    async findMax (req, res) {
        try {
            const result = await Result.findAll({
                attributes: ['StudentId', 'StationId', 'score'],
            })
            if (!result) {
                res.send(403, 'Das zu löschende Ergebnis konnte nicht gefunden werden.')
            }
            res.send(result)
        } catch (err) {
            res.send(500, 'Beim Löschen des Ergebnisses trat ein Fehler auf.' + err)
        }
    },

    async delete (req, res) {
        try {
            const stationId = req.params.stationid
            const studentId = req.params.studentid
            const result = await Result.findOne({
                where: {
                    StudentId: studentId,
                    StationId: stationId
                }
            })
            if (!result) {
                res.send(403, 'Das zu löschende Ergebnis konnte nicht gefunden werden.')
            }
            await result.destroy()
            res.send(result)
        } catch (err) {
            res.send(500, 'Beim Löschen des Ergebnisses trat ein Fehler auf.')
        }
    }
}


