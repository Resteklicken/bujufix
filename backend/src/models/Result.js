// noinspection JSVoidFunctionReturnValueUsed

module.exports = (sequelize, DataTypes) => {
    const Result = sequelize.define(
        'Result',
        {
            score: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            StudentId: {
                type: DataTypes.INTEGER,
                references: {
                    model: sequelize.models.Student,
                    key: 'id'
                }
            },
            StationId: {
                type: DataTypes.INTEGER,
                    references: {
                    model: sequelize.models.Station, // 'Actors' would also work
                        key: 'id'
                }
            }
        }
    )

    Result.associate = function (models) {
    }

    return Result
}

