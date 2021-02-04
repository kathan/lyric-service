class HandlerInterface{

    async get (request, response){
        console.error(`No GET method implemented in ${this.constructor.name}`);
        response.statusCode = 405;
    }

    async put (request, response){
        console.error(`No PUT method implemented in ${this.constructor.name}`);
        response.statusCode = 405;
    }

    async post (request, response){
        console.error(`No POST method implemented in ${this.constructor.name}`);
        response.statusCode = 405;
    }

    async patch (request, response){
        console.error(`No PATCH method implemented in ${this.constructor.name}`);
        response.statusCode = 405;
    }

    async delete (request, response){
        console.error(`No DELETE method implemented in ${this.constructor.name}`);
        response.statusCode = 405;
    }

    async before (request, response){
    }

    async after (request, response){
    }
}

module.exports = HandlerInterface;