const HandlerInterface = require("../lib/HandlerInterface")
const db = require('../lib/dbConnection.js')

class Migrate extends HandlerInterface{
    async post(request, response){
        await db.sync({alter: true})
        response.statusCode = 200
    }
}

module.exports = Migrate