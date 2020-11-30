const HandlerInterface = require("../lib/HandlerInterface");
const db = require('../lib/dbConnection');
const loadModels = require('../lib/loadModels');

class Init extends HandlerInterface{
    async before(request, response){
        loadModels(db);
    }
}

module.exports = Init;