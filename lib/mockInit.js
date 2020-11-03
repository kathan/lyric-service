const SequelizeMock = require('sequelize-mock');
const sequelize = new SequelizeMock()
const models = require('./models.js')

module.exports = function(){
    models.forEach(model => {
        let newModel = sequelize.define(model.name, model.attributes, model.options)
        if(typeof sequelize.models !== 'object'){
            console.log('init models')
            sequelize.models = {}
        }
        sequelize.models[model.name] = newModel
    })

    // sequelize.authenticate()
    return sequelize
}