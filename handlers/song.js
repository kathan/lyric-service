const init = require('../lib/init.js')

module.exports = {
    get: async (request, response) => {
        await init()
        
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