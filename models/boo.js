module.exports = {
    get: async (request, response) => {
        console.log('get fired...')
        response.statusCode = 401
    }
}