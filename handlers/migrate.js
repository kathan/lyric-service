const HandlerInterface = require("../lib/HandlerInterface")
const db = require('../lib/dbConnection.js')
let current = false

class Migrate extends HandlerInterface{
    async post(request, response){
        await db.sync({alter: true})
        response.statusCode = 200
        current = true
    }

    async get(request, response){
        response.body.current = current
        response.statusCode = 200
    }
}

module.exports = Migrate