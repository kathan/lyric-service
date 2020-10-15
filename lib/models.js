const schema = "songs"
  
module.exports = [
    {
        name: 'Song',
        attributes: {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
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
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
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