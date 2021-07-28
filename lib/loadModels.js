const models = require('./models');
const associations = require('./associations');

module.exports = function(sequelize){
    models.forEach(model => {
        console.log(`Defining ${model.name}`);
        model.options.freezeTableName = true;
        sequelize.define(model.name, model.attributes, model.options);
    });
    console.log('sequelize.models', sequelize.models);

    associations.forEach(association => {
        switch(association.type){
            case 'belongsToMany':
                const sourceModel = sequelize.models[association.source];
                if(!sourceModel){
                    console.error(`association.source ${association.source} was not found`);
                    return;
                }

                const targetModel = sequelize.models[association.target];
                if(!targetModel){
                    console.error(`association.target ${association.target} was not found`);
                    return;
                }
                const through = sequelize.models[association.through];
                if(!through){
                    console.error(`association.through ${association.through} was not found`)
                    return;
                }
                console.log(`Associating ${association.type} ${association.source} to ${association.target} through ${association.through} on ${association.foreignKey}`);
                sourceModel.belongsToMany(targetModel,
                    {
                        through,
                        foreignKey: association.foreignKey
                    }
                );
                break;
        }
    })
};