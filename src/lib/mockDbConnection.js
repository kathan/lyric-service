const Sequelize = require('sequelize')
const db_url = 'postgres://postgres:postgres@noserver:5432/postgres'
const sequelize = new Sequelize(db_url)
const models = require('./models.js')

const init = () => {
    models.forEach(model => {
        let newModel = sequelize.define(model.name, model.attributes, model.options)
        if(typeof sequelize.models !== 'object'){
            console.log('init models')
            sequelize.models = {}
        }
        sequelize.models[model.name] = newModel
    })
}

init()
module.exports = sequelize