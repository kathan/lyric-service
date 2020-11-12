const HandlerInterface = require("../lib/HandlerInterface");
const db = require('../lib/dbConnection.js')
const loadModels = require('../lib/loadModels')

class Init extends HandlerInterface{
    async before(request, response){
        await loadModels(db)
    }
}

module.exports = Init