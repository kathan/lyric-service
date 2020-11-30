const models = require('./models');

module.exports = function(sequelize){
    models.forEach(model => {
        console.log(`Defining ${model.name}`);
        model.options.freezeTableName = true;
        sequelize.define(model.name, model.attributes, model.options);
    });
};