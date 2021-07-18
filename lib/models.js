const schema = "lyrics";
const { DataTypes, Sequelize, Deferrable } = require('sequelize');
// const db = require('./dbConnection');
  
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
            title: {
                type: DataTypes.STRING,
            },
            artist: {
                type: DataTypes.STRING,
            },
            lyrics: {
                type: DataTypes.TEXT
            },
            time: {
                type: DataTypes.TIME
            }
        },
        options: {
            schema: schema
        }
    },
    {
        name: 'Setlist',
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
        name: 'SetlistSong',
        attributes: {
            songId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                /*references: {
                    model: 'Song',
                    key: 'id',
                    deferrable: Deferrable.INITIALLY_IMMEDIATE
                }*/
            },
            setlistId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                /*references: {
                    model: 'Setlist',
                    key: 'id',
                    deferrable: Deferrable.INITIALLY_IMMEDIATE
                }*/
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
    {
        name: 'UserSetlist',
        attributes: {
            userId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            setlistId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            }
        },
        options: {
            schema: schema
        }
    }
];