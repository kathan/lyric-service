const { DataTypes, QueryInterface } = require('sequelize')
const models = require('./models.js')
const started = false

module.exports = async function(sequelize){
    if(!started){
        models.forEach(model => {
            sequelize.define(model.name, model.attributes, model.options)
        })

        sequelize.authenticate()
        await sequelize.sync({alter: true})
        started = true
    }
}