const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')

const db = {}

const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    config.db.options
)


fs
    .readdirSync(__dirname)
    .filter((file) =>
        file !== 'index.js'
    )
    .forEach((file) => {
        const modelFile = path.join(__dirname, file);
        const model = sequelize['import'](modelFile)
        db[model.name] = model;
    })

    /*.forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model
    })*/

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db