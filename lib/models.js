const schema = "lyrics"
const { DataTypes } = require('sequelize');
  
module.exports = [
    {
        name: 'Song',
        attributes: {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1,
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
                defaultValue: DataTypes.UUIDV1,
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