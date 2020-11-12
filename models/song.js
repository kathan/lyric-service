const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../lib/dbConnection')
const schema = "lyrics"

module.exports = sequelize.define('Song', 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v1()'),
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    {
        schema: schema
    }
)