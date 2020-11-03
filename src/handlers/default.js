const HandlerInterface = require("../lib/HandlerInterface")

class Default extends HandlerInterface{
    async get(request, response){
        response.statusCode = 200
        response.body = JSON.stringify(
            {
                input: request,
            },
            null,
            2
        )
    }
}

module.exports = Default