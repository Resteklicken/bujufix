module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define(
        'Student',
        {id: {
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

    Student.associate = function (models) {
        Student.belongsToMany(models.Station, { through: models.Result });
    }

    return Student
}

