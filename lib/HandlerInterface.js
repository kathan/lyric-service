class HandlerInterface{

    async get (request, response){
        response.statusCode = 405
    }

    async put (request, response){
        response.statusCode = 405
    }

    async post (request, response){
        response.statusCode = 405
    }

    async patch (request, response){
        response.statusCode = 405
    }

    async delete (request, response){
        response.statusCode = 405
    }

    async before (request, response, {}){
    }

    async after (request, response, {}){
    }
}

module.exports = HandlerInterface