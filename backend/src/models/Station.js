module.exports = (sequelize, DataTypes) => {
    const Station = sequelize.define(
        'Station', {
            id: {
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

    Station.associate = function (models) {
        Station.belongsToMany(models.Student, { through: models.Result });
    }

    return Station
}

