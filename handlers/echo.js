const HandlerInterface = require("../lib/HandlerInterface")

class Echo extends HandlerInterface{
    async get(request, response){
        response.statusCode = 200
        response.body = {
            input: request,
        }
    }
}

module.exports = Echo