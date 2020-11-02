const schema = "lyrics"
const { DataTypes, Sequelize } = require('sequelize');
  
module.exports = [
    {
        name: 'Song',
        attributes: {
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
        options: {
            schema: schema
        }
    },
    {
        name: 'User',
        attributes: {
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
        options: {
            schema: schema
        }
    },
]