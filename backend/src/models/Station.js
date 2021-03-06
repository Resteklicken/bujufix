// noinspection JSVoidFunctionReturnValueUsed

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
                allowNull: false,
                unique: true
            }
        })

    Station.associate = function (models) {
        Station.belongsToMany(models.Student, { through: models.Result , as: 'Student'});
    }

    return Station

}


