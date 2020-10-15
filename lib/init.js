const sequelize = require('./dbConnection.js')
const { Sequelize, DataTypes } = require('sequelize')
const models = require('./models.js')

models.forEach(model => {
    sequelize.define(model.name, model.attributes, model.options)
})

sequelize.authenticate()
sequelize.sync({alter: true})