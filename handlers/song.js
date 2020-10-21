const init = require('../lib/init.js')

module.exports = {
    get: async (request, response) => {
        try {
            await init()
        }catch(error){
            response.statusCode = 500
            response.body = error;
        }
        
        response.statusCode = 200
        response.body = JSON.stringify(
            {
                input: request,
            },
            null,
            2
        )
    },
    patch: async (request, response) => {
        response.statusCode = 405
    },
    post: async (request, response) =>{
        response.statusCode = 405
    },
    put: async (request, response) =>{
        response.statusCode = 405
    }
}