const schema = "lyrics"
const { DataTypes } = require('sequelize');
  
console.log("DataTypes.UUID:", DataTypes.UUID)
console.log("DataTypes.UUIDV1:", DataTypes.UUIDV1)

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
            tableName: 'song',
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
            tableName: 'user',
            schema: schema
        }
    },
]