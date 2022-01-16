const Student = require('./Student')
const Station = require('./Station')

module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'Result',
        {studentid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: 'compkey',
                references: {
                    model: Student,
                    key: 'id'
                }
            },
        stationid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'compkey',
            references: {
                model: Station,
                key: 'id'
            }
        },
        score: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
        })
