module.exports = {
    get: async (request, response) => {
        console.log('get fired...')
        response.statusCode = 401
        response.body = JSON.stringify(
            {
                input: request,
            },
            null,
            2
        )
    }
}