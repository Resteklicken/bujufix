module.exports = (sequelize, DataTypes) => {
    const Result = sequelize.define(
        'Result',
        {score: {
                type: DataTypes.DECIMAL,
                allowNull: false
            }
        })
    Result.associate = function (models) {
    }

    return Result
}
