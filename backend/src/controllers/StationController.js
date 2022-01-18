const {Station, Student} = require('../models')

module.exports = {
    async newStation (req, res) {
        try {
            const station = await Station.create(req.body)
                res.send(200, "Die Station wurde erfolgreich erstellt")
        } catch (err) {
            res.send(500, 'Beim Erstellen der Station trat ein Fehler auf.')
        }
    },
    async showList (req, res) {
        try {
            let number = parseInt(req.params.number)
            let stations = null;
            if (number > 0) {
                stations = await Station.findAll({
                    limit: number,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                })
            } else {
                stations = await Station.findAll(
                    { attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                })
            }
            res.send(stations)
        } catch (err) {
            res.send(500, 'Beim Abrufen der Station trat ein Fehler auf.')
        }
    },
    async edit (req, res) {
        try {
            await Station.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.send(200, "Die Station wurde erfolgreich bearbeitet.")
        } catch (err) {
            res.send(500, 'Beim Ändern der Station trat ein Fehler auf.')
        }
    },

    async find (req, res) {
        try {
            const stationID = req.params.id
            const station = await Station.findOne({
                where: {
                    id: stationID,
                },
                attributes: ['id', 'name']
            })

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
                return res.send(403, 'Die zu löschende Station konnte nicht gefunden werden.')
            }
            await station.destroy()
            res.send(station)
        } catch (err) {
            res.send(500, 'Beim Löschen der Station trat ein Fehler auf.')
        }
    }
}


