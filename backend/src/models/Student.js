module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        'Student',
        {id: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
        })


