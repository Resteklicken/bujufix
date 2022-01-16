const {Station, Student} = require('../models')

module.exports = {
    async newStation (req, res) {
        try {
            const station = await Station.create(req.body)
            const stationJson = station.toJSON()
            res.send({
                station: stationJson,
            })
        } catch (err) {
            res.status(400).send({
                error: 'Beim Erstellen der Station trat ein Fehler auf.'
            })
        }
    },
    async showList (req, res) {
        try {
            let number = parseInt(req.params.number)
            let stations = null;
            if (number > 0) {
                stations = await Station.findAll({
                    limit: number
                })
            } else {
                stations = await Station.findAll({})
            }
            res.send(stations)
        } catch (err) {
            res.status(500).send({
                error: 'Beim Abrufen der Stationen trat ein Fehler auf.'
            })
        }
    },
    async edit (req, res) {
        try {
            await Station.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Beim Ändern der Station trat ein Fehler auf.'
            })
        }
    },

    async find (req, res) {
        try {
            const stationID = req.params.id
            const station = await Station.findByPk(stationID)

            if (!station) {
                res.send(403, 'Die Station konnte nicht gefunden werden.')
            }

            res.status(200).send({
                station
            })
        } catch (err) {
            res.send(500, 'Beim Finden der Station trat ein Fehler auf.')
        }
    },

    async delete (req, res) {
        try {
            const stationID = req.params.id
            const station = await Station.findByPk(stationID)

            if (!station) {
                return res.status(403).send({
                    error: 'Die zu löschende Station konnte nicht gefunden werden.' + stationID
                })
            }
            await station.destroy()
            res.send(station)
        } catch (err) {
            res.status(500).send({
                error: 'Beim Löschen der Station trat ein Fehler auf.' + err
            })
        }
    }
}


