const {Result} = require('../models')

module.exports = {
    async newResult (req, res) {
        try {
            const result = await Result.create(req.body)
            const resultJson = result.toJSON()
            res.send({
                result: resultJson,
            })
        } catch (err) {
            res.status(400).send({
                error: 'Beim Erstellen des Ergebnisses trat ein Fehler auf.'
            })
        }
    },
    async showList (req, res) {
        try {
            let number = parseInt(req.params.number)
            let results = null;
            if (number > 0) {
                results = await Result.findAll({
                    limit: number
                })
            } else {
                results = await Result.findAll({})
            }
            res.send(results)
        } catch (err) {
            res.status(500).send({
                error: 'Beim Abrufen der Ergebnisse trat ein Fehler auf.'
            })
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
            res.status(500).send({
                error: 'Beim Ändern des Ergebnisses trat ein Fehler auf.'
            })
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
                return res.status(403).send({
                    error: 'Das zu löschende Ergebnis konnte nicht gefunden werden. ' + studentId + " " + stationId
                })
            }
            await result.destroy()
            res.send(result)
        } catch (err) {
            res.status(500).send({
                error: 'Beim Löschen des Ergebnisses trat ein Fehler auf.' + err
            })
        }
    }
}


