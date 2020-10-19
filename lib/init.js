const sequelize = require('./dbConnection.js')
const { DataTypes, QueryInterface } = require('sequelize')
const queryInterface = sequelize.getQueryInterface()
const models = require('./models.js')
const started = false

module.exports = async function(){
    if(!started){
        models.forEach(model => {
            // queryInterface.createTable(model.name, model.attributes, model.options)
            sequelize.define(model.name, model.attributes, model.options)
        })

        sequelize.authenticate()
        await sequelize.sync({alter: true})
        started = true
    }
}