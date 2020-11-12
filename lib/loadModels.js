const { DataTypes, QueryInterface } = require('sequelize')
const models = require('./models.js')

module.exports = async function(sequelize){
    models.forEach(model => {
        console.log(`Defining ${model.name}`)
        sequelize.define(model.name, model.attributes, model.options)
    })
}