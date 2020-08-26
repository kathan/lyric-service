module.exports = {
    get: async (request, response) => {
        response.statusCode = 123
        response.body = JSON.stringify(
            {
                input: request,
            },
            null,
            2
        )
    }
}